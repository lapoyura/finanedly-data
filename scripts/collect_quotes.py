#!/usr/bin/env python3
"""
finanedly · еженедельный сбор кандидатов в цитаты.

Как работает:
  1. Берёт компании из data/companies.json.
  2. В Wikidata ищет их основателей и CEO, у которых есть страница в англоязычном Wikiquote.
  3. С каждой страницы забирает цитаты только из разделов с подтверждёнными цитатами.
     Разделы «Disputed», «Misattributed», «Attributed», «Quotes about …» пропускаются.
  4. Оставляет цитаты с указанным источником и подходящей длиной, помечает те,
     где упомянута сама компания (такая цитата выдаёт ответ).
  5. Добавляет новые цитаты в data/quotes.json со статусом "new". Ваши правки
     (статус, перевод, заметки) при следующих запусках не трогает.

Цитаты НЕ попадают в игру автоматически. В игре — только записи со статусом "ok":
источник проверен, перевод на русский добавлен.

Wikiquote распространяется по лицензии CC BY-SA; сами цитаты принадлежат их авторам.
Ссылка на страницу Wikiquote и на первоисточник хранится в каждой записи.
"""
import json, os, re, sys, time, hashlib, datetime, urllib.request, urllib.parse

DATA = os.path.join(os.path.dirname(__file__), "..", "data")
USER_AGENT = "finanedly-data/1.0 (https://finanedly.com; " + os.environ.get("SEC_CONTACT", "contact not set") + ")"
WIKIDATA_URL = "https://query.wikidata.org/sparql"
WIKIQUOTE_API = "https://en.wikiquote.org/w/api.php"
MIN_LEN, MAX_LEN = 30, 240          # длина цитаты в символах
MAX_PER_PERSON = 15                 # не больше стольких новых кандидатов с одного человека за запуск
SKIP_SECTIONS = re.compile(r"disputed|misattributed|attributed|quotes about|about .*|see also|external links|"
                           r"references|sources|notes|further reading|interviews? about", re.I)

def http_json(url, data=None):
    req = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT,
                                 "Accept": "application/json"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return json.load(r)
        except Exception as e:
            print(f"  ! {e}, повтор", file=sys.stderr); time.sleep(10 * (attempt + 1))
    raise RuntimeError("сервер не отвечает: " + url)

def people_with_wikiquote(company_ids):
    """(компания, человек, роль, название страницы Wikiquote)"""
    out = []
    for i in range(0, len(company_ids), 200):
        chunk = " ".join("wd:" + c for c in company_ids[i:i + 200])
        q = f"""SELECT ?company ?person ?personLabel ?role ?article WHERE {{
          VALUES ?company {{ {chunk} }}
          {{ ?company wdt:P112 ?person . BIND("основатель" AS ?role) }}
          UNION {{ ?company wdt:P169 ?person . BIND("CEO" AS ?role) }}
          ?article schema:about ?person ; schema:isPartOf <https://en.wikiquote.org/> .
          SERVICE wikibase:label {{ bd:serviceParam wikibase:language "ru,en". }} }}"""
        res = http_json(WIKIDATA_URL, urllib.parse.urlencode({"query": q, "format": "json"}).encode())
        for b in res["results"]["bindings"]:
            title = urllib.parse.unquote(b["article"]["value"].rsplit("/wiki/", 1)[-1]).replace("_", " ")
            out.append((b["company"]["value"].rsplit("/", 1)[-1], b["person"]["value"].rsplit("/", 1)[-1],
                        b["personLabel"]["value"], b["role"]["value"], title))
        time.sleep(1)
    return out

def wikitext(title):
    q = urllib.parse.urlencode({"action": "parse", "page": title, "prop": "wikitext",
                                "format": "json", "formatversion": "2", "redirects": "1"})
    res = http_json(WIKIQUOTE_API + "?" + q)
    return res.get("parse", {}).get("wikitext", "")

# ---------- Разбор вики-разметки ----------
def clean(s):
    s = re.sub(r"<ref[^>]*/>", "", s)
    s = re.sub(r"<ref[^>]*>.*?</ref>", "", s, flags=re.S)
    for _ in range(3):
        s = re.sub(r"\{\{[^{}]*\}\}", "", s)
    s = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", s)        # [[ссылка|текст]] → текст
    s = re.sub(r"\[https?://\S+ ([^\]]+)\]", r"\1", s)              # [url текст] → текст
    s = re.sub(r"\[https?://\S+\]", "", s)
    s = re.sub(r"'{2,}", "", s)                                       # жирный/курсив
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", s).strip()

def parse_quotes(text):
    """[(раздел, цитата, источник)] из разрешённых разделов."""
    out, section, skip = [], "", False
    cur = None
    for line in text.splitlines():
        h = re.match(r"^(=+)\s*(.*?)\s*\1\s*$", line)
        if h:
            if cur: out.append(cur); cur = None
            level, section = len(h.group(1)), clean(h.group(2))
            if level <= 2:
                skip = bool(SKIP_SECTIONS.search(section))
            elif SKIP_SECTIONS.search(section):
                skip = True
            continue
        if skip: continue
        if re.match(r"^\*[^*:]", line):
            if cur: out.append(cur)
            cur = [section, clean(line[1:]), ""]
        elif re.match(r"^\*\*", line) and cur and not cur[2]:
            cur[2] = clean(line.lstrip("*:"))
    if cur: out.append(cur)
    return out

def year_in(s):
    m = re.findall(r"\b(1[89]\d\d|20\d\d)\b", s)
    return int(m[-1]) if m else None

def main():
    companies = json.load(open(os.path.join(DATA, "companies.json"), encoding="utf-8"))["companies"]
    by_id = {c["id"]: c for c in companies}
    path = os.path.join(DATA, "quotes.json")
    store = json.load(open(path, encoding="utf-8")) if os.path.exists(path) else {"quotes": []}
    known = {q["id"] for q in store["quotes"]}

    pairs = people_with_wikiquote(sorted(by_id))
    print(f"Людей со страницей в Wikiquote: {len({p[1] for p in pairs})}")
    pages = {}
    added = 0
    for company_id, person_id, person, role, title in pairs:
        if title not in pages:
            try: pages[title] = parse_quotes(wikitext(title))
            except Exception as e:
                print(f"  ! {title}: {e}", file=sys.stderr); pages[title] = []
            time.sleep(1)
        c = by_id[company_id]
        brand = [c["name"]] + [a for a in c.get("aliases", []) if len(a) > 3 and not a.isdigit()]
        n = 0
        for section, quote, source in pages[title]:
            if n >= MAX_PER_PERSON: break
            if not (MIN_LEN <= len(quote) <= MAX_LEN) or not source: continue
            qid = hashlib.sha1((person_id + company_id + quote).encode()).hexdigest()[:12]
            if qid in known: continue
            mentions = any(re.search(r"\b" + re.escape(b) + r"\b", quote, re.I) for b in brand)
            store["quotes"].append({
                "id": qid, "status": "new",           # new → ok / no (меняете вы)
                "company_id": company_id, "company": c["name"],
                "person": person, "person_id": person_id, "role": role,
                "quote_en": quote, "quote_ru": "",     # перевод добавляется при проверке
                "source_text": source, "year": year_in(source),
                "secondary_source": source.lower().startswith(("as quoted", "quoted in", "as cited")),
                "mentions_company": mentions,
                "wikiquote": "https://en.wikiquote.org/wiki/" + urllib.parse.quote(title.replace(" ", "_")),
                "primary_url": "", "notes": "",
                "level": c.get("level"), "found": datetime.date.today().isoformat(),
            })
            known.add(qid); added += 1; n += 1

    store["updated"] = datetime.date.today().isoformat()
    store["stats"] = {s: sum(1 for q in store["quotes"] if q["status"] == s) for s in ("new", "ok", "no")}
    json.dump(store, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"Новых кандидатов: {added}. Всего: {store['stats']}")

if __name__ == "__main__":
    main()
