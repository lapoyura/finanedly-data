#!/usr/bin/env python3
"""
finanedly · еженедельное обновление базы компаний.

Источники:
  • Wikidata (CC0) — компании с биржевым листингом: страна, отрасль, год основания,
    биржа и тикер, основатели, CEO, штаб-квартира, названия, известность.
  • SEC EDGAR (бесплатно, без ключа) — выручка и прибыль компаний из США.
    Включается, если задана переменная окружения SEC_CONTACT (ваш e-mail).

Результат:
  data/companies.json — база для игр
  data/review.json    — компании, которые не прошли проверку (на ручной разбор)
  data/changes.md     — что изменилось с прошлого запуска

Только стандартная библиотека Python 3.9+, ничего устанавливать не нужно.
"""
import json, os, sys, time, datetime, urllib.request, urllib.parse
from collections import defaultdict

# ---------------- Настройки ----------------
MIN_SITELINKS = int(os.environ.get("MIN_SITELINKS", "10"))  # минимум статей в Википедиях
BATCH = 250                                                   # компаний в одном запросе
WIKIDATA_URL = "https://query.wikidata.org/sparql"
USER_AGENT = "finanedly-data/1.0 (https://finanedly.com; " + os.environ.get("SEC_CONTACT", "contact not set") + ")"
SEC_CONTACT = os.environ.get("SEC_CONTACT", "").strip()
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

# Уровни сложности по числу языковых версий статьи в Википедии
LEVELS = [(80, "лёгкий"), (40, "средний"), (20, "сложный"), (0, "эксперт")]

# Биржи: английское название в Wikidata → как показываем в игре
EXCHANGES = {
    "new york stock exchange": "NYSE", "nasdaq": "NASDAQ", "nasdaq stock market": "NASDAQ",
    "tokyo stock exchange": "Токио", "frankfurt stock exchange": "Франкфурт",
    "london stock exchange": "Лондон", "euronext paris": "Париж", "euronext amsterdam": "Амстердам",
    "euronext brussels": "Брюссель", "hong kong stock exchange": "Гонконг", "korea exchange": "Сеул",
    "six swiss exchange": "Цюрих", "moscow exchange": "Мосбиржа", "toronto stock exchange": "Торонто",
    "shanghai stock exchange": "Шанхай", "shenzhen stock exchange": "Шэньчжэнь",
    "borsa italiana": "Милан", "bolsa de madrid": "Мадрид", "nasdaq stockholm": "Стокгольм",
    "australian securities exchange": "Сидней", "national stock exchange of india": "Мумбаи (NSE)",
    "bombay stock exchange": "Мумбаи (BSE)", "taiwan stock exchange": "Тайбэй", "b3": "Сан-Паулу",
    "nasdaq copenhagen": "Копенгаген", "oslo stock exchange": "Осло", "nasdaq helsinki": "Хельсинки",
    "singapore exchange": "Сингапур", "johannesburg stock exchange": "Йоханнесбург",
}
# Если компания торгуется на нескольких биржах — какую считать основной
EXCHANGE_PRIORITY = ["NYSE", "NASDAQ", "Токио", "Лондон", "Франкфурт", "Париж", "Гонконг", "Шанхай",
                     "Шэньчжэнь", "Сеул", "Цюрих", "Амстердам", "Торонто", "Мосбиржа"]
US_EXCHANGES = {"NYSE", "NASDAQ"}

# Отрасли Wikidata (английские названия) → наши секторы. Порядок важен: первое совпадение.
SECTOR_RULES = [
    (["semiconductor", "integrated circuit", "microchip"], "Полупроводники"),
    (["automotive", "automobile", "car manufactur", "motor vehicle", "electric vehicle"], "Автомобили"),
    (["pharmaceutical", "biotechnolog", "biopharm", "drug", "vaccine", "health care", "healthcare", "medical"], "Фармацевтика и здоровье"),
    (["e-commerce", "online shopping", "electronic commerce", "online retail"], "Электронная торговля"),
    (["video game", "film", "entertainment", "media", "broadcast", "television", "publishing", "music", "streaming"], "Медиа и развлечения"),
    (["consumer electronics", "electronics", "home appliance"], "Электроника"),
    (["software", "internet", "information technology", "computer", "cloud", "technology", "artificial intelligence"], "Технологии"),
    (["bank", "financial", "finance", "insurance", "payment", "investment", "asset management", "credit card", "stock exchange"], "Финансы"),
    (["telecommunication", "telecom", "mobile network", "wireless"], "Телеком"),
    (["petroleum", "oil", "natural gas", "energy", "electric utility", "electricity", "utility", "renewable", "coal"], "Энергетика"),
    (["mining", "steel", "metal", "aluminium", "aluminum", "gold", "copper"], "Металлы и добыча"),
    (["airline", "shipping", "logistics", "railway", "rail transport", "transport", "courier", "freight"], "Транспорт"),
    (["aerospace", "defense", "defence", "machinery", "industrial", "engineering", "construction", "conglomerate", "manufacturing"], "Промышленность"),
    (["beverage", "food", "drink", "brewing", "brewery", "confectionery", "dairy", "tobacco", "alcoholic"], "Напитки и продукты"),
    (["restaurant", "fast food", "coffee", "catering"], "Рестораны"),
    (["clothing", "apparel", "footwear", "fashion", "textile", "luxury", "sportswear", "jewel"], "Одежда и роскошь"),
    (["retail", "supermarket", "hypermarket", "department store", "wholesale"], "Ритейл"),
    (["cosmetic", "personal care", "household", "consumer goods", "fast-moving"], "Потребительские товары"),
    (["chemical", "fertilizer", "plastic"], "Химия"),
    (["real estate", "property"], "Недвижимость"),
    (["hotel", "travel", "tourism", "cruise"], "Туризм"),
]

# ---------------- Wikidata ----------------
def sparql(query, retries=4):
    data = urllib.parse.urlencode({"query": query, "format": "json"}).encode()
    for attempt in range(retries):
        try:
            req = urllib.request.Request(WIKIDATA_URL, data=data, headers={
                "User-Agent": USER_AGENT, "Accept": "application/sparql-results+json",
                "Content-Type": "application/x-www-form-urlencoded"})
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)["results"]["bindings"]
        except Exception as e:
            wait = 10 * (attempt + 1)
            print(f"  ! ошибка запроса Wikidata ({e}), повтор через {wait} с", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError("Wikidata не отвечает")

def qid(uri): return uri.rsplit("/", 1)[-1]
def val(b, k): return b[k]["value"] if k in b else None

def fetch_listed():
    """Компании с действующим биржевым листингом и известностью от MIN_SITELINKS."""
    q = f"""
    SELECT ?item ?exchange ?exchangeLabel ?ticker ?links WHERE {{
      ?item p:P414 ?st . ?st ps:P414 ?exchange .
      FILTER NOT EXISTS {{ ?st pq:P582 ?ended . }}
      OPTIONAL {{ ?st pq:P249 ?ticker . }}
      ?item wikibase:sitelinks ?links . FILTER(?links >= {MIN_SITELINKS})
      SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}"""
    rows = sparql(q)
    items = defaultdict(lambda: {"listings": [], "links": 0})
    for b in rows:
        it = items[qid(val(b, "item"))]
        it["links"] = int(val(b, "links"))
        it["listings"].append({"exchange_en": (val(b, "exchangeLabel") or "").strip(),
                               "ticker": val(b, "ticker")})
    return items

def batch_values(ids): return " ".join("wd:" + i for i in ids)

def fetch_prop(ids, prop, lang="ru,en", literal=False):
    """item -> список (qid значения, подпись) для свойства prop."""
    out = defaultdict(list)
    for i in range(0, len(ids), BATCH):
        chunk = ids[i:i + BATCH]
        if literal:
            q = f"SELECT ?item ?val WHERE {{ VALUES ?item {{ {batch_values(chunk)} }} ?item wdt:{prop} ?val . }}"
        else:
            q = f"""SELECT ?item ?val ?valLabel WHERE {{ VALUES ?item {{ {batch_values(chunk)} }}
                    ?item wdt:{prop} ?val .
                    SERVICE wikibase:label {{ bd:serviceParam wikibase:language "{lang}". }} }}"""
        for b in sparql(q):
            v = val(b, "val")
            out[qid(val(b, "item"))].append(v if literal else (qid(v), val(b, "valLabel")))
        time.sleep(1)
    return out

def fetch_names(ids):
    """Названия и синонимы на русском и английском."""
    out = defaultdict(lambda: {"ru": None, "en": None, "alt": set()})
    for i in range(0, len(ids), BATCH):
        chunk = ids[i:i + BATCH]
        q = f"""SELECT ?item ?label ?alt WHERE {{ VALUES ?item {{ {batch_values(chunk)} }}
                {{ ?item rdfs:label ?label . FILTER(LANG(?label) IN ("ru","en")) }}
                UNION {{ ?item skos:altLabel ?alt . FILTER(LANG(?alt) IN ("ru","en")) }} }}"""
        for b in sparql(q):
            rec = out[qid(val(b, "item"))]
            if "label" in b: rec[b["label"].get("xml:lang")] = b["label"]["value"]
            if "alt" in b: rec["alt"].add(b["alt"]["value"])
        time.sleep(1)
    return out

# ---------------- Нормализация ----------------
def map_sector(industry_labels):
    labels = [l.lower() for l in industry_labels if l]
    for keys, sector in SECTOR_RULES:
        for l in labels:
            if any(k in l for k in keys):
                return sector
    return None

def map_exchange(listings):
    named = []
    for l in listings:
        short = EXCHANGES.get(l["exchange_en"].lower())
        named.append((short or l["exchange_en"], l["ticker"], short is not None))
    known = [n for n in named if n[2]]
    pool = known or named
    pool.sort(key=lambda n: EXCHANGE_PRIORITY.index(n[0]) if n[0] in EXCHANGE_PRIORITY else 99)
    return pool[0] if pool else (None, None, False)

LEGAL_SUFFIXES = [", Inc.", " Inc.", ", Inc", " Inc", " Incorporated", " Corporation", " Corp.", " Corp",
    " Company", " Co., Ltd.", " Co., Ltd", " Co. Ltd.", " Ltd.", " Ltd", " Limited", " plc", " PLC", " p.l.c.",
    " AG", " SE", " S.A.", " SA", " N.V.", " NV", " S.p.A.", " SpA", " GmbH", " Holdings", " Holding", " Group", " Co."]

def short_name(name):
    """Apple Inc. → Apple, Tesla, Inc. → Tesla. Полное название уходит в синонимы."""
    s = name.strip()
    changed = True
    while changed:
        changed = False
        for suf in LEGAL_SUFFIXES:
            if s.endswith(suf) and len(s) > len(suf) + 1:
                s = s[: -len(suf)].rstrip(" ,"); changed = True
    if s != name.strip() and s.startswith("The ") and len(s) > 6:
        s = s[4:]
    return s

def year_of(s):
    try: return int(s[:5].lstrip("+")) if s.startswith(("+", "-")) else int(s[:4])
    except Exception: return None

def level_of(links):
    for threshold, name in LEVELS:
        if links >= threshold: return name

# ---------------- SEC EDGAR ----------------
REVENUE_TAGS = ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax", "SalesRevenueNet"]

def sec_get(url):
    req = urllib.request.Request(url, headers={"User-Agent": f"finanedly-data {SEC_CONTACT}"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

def latest_annual(facts, tags):
    best = None
    for tag in tags:
        units = facts.get("facts", {}).get("us-gaap", {}).get(tag, {}).get("units", {}).get("USD", [])
        for u in units:
            if u.get("form") == "10-K" and u.get("fp") == "FY" and u.get("fy"):
                if best is None or (u["end"], u["fy"]) > (best["end"], best["fy"]):
                    best = u
    return best

def enrich_sec(companies):
    if not SEC_CONTACT:
        print("SEC_CONTACT не задан — пропускаю SEC EDGAR")
        return
    print("SEC EDGAR: загружаю список тикеров…")
    tickers = {v["ticker"].upper(): str(v["cik_str"]).zfill(10)
               for v in sec_get("https://www.sec.gov/files/company_tickers.json").values()}
    n = 0
    for c in companies:
        if c["exchange"] not in US_EXCHANGES or not c.get("ticker"): continue
        cik = tickers.get(c["ticker"].upper())
        if not cik: continue
        try:
            facts = sec_get(f"https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json")
        except Exception as e:
            print(f"  ! SEC {c['name']}: {e}", file=sys.stderr); continue
        rev = latest_annual(facts, REVENUE_TAGS)
        ni = latest_annual(facts, ["NetIncomeLoss"])
        c["sec"] = {"cik": cik,
                    "revenue_usd": rev and rev["val"], "net_income_usd": ni and ni["val"],
                    "fiscal_year": (rev or ni or {}).get("fy"),
                    "source": f"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={cik}"}
        n += 1
        time.sleep(0.15)  # ≈7 запросов в секунду, лимит SEC — 10
    print(f"SEC EDGAR: обогащено {n} компаний")

# ---------------- Сборка ----------------
def build():
    print(f"Wikidata: ищу компании с листингом и ≥{MIN_SITELINKS} статьями в Википедиях…")
    listed = fetch_listed()
    ids = sorted(listed)
    print(f"  найдено {len(ids)}")
    names = fetch_names(ids)
    country = fetch_prop(ids, "P17")
    industry = fetch_prop(ids, "P452", lang="en")
    inception = fetch_prop(ids, "P571", literal=True)
    founders = fetch_prop(ids, "P112")
    ceo = fetch_prop(ids, "P169")
    hq = fetch_prop(ids, "P159")
    country_ids = sorted({c[0] for v in country.values() for c in v})
    continent = fetch_prop(country_ids, "P30")

    companies, review = [], []
    for i in ids:
        nm = names[i]
        full = nm["en"] or nm["ru"]
        name = short_name(full) if full else None
        problems = []
        countries = list(dict.fromkeys(c[1] for c in country.get(i, [])))
        if not countries: problems.append("нет страны")
        elif len(countries) > 1: problems.append("несколько стран: " + ", ".join(countries))
        ind_labels = [x[1] for x in industry.get(i, [])]
        sector = map_sector(ind_labels)
        if not sector: problems.append("сектор не определён: " + (", ".join(ind_labels) or "отрасль не указана"))
        years = sorted({y for y in (year_of(s) for s in inception.get(i, [])) if y})
        if not years: problems.append("нет года основания")
        elif years[-1] - years[0] > 2: problems.append("разные годы основания: " + ", ".join(map(str, years)))
        exch, ticker, known = map_exchange(listed[i]["listings"])
        if not exch: problems.append("нет биржи")
        elif not known: problems.append("незнакомая биржа: " + exch)
        if not name: problems.append("нет названия")

        cid = countries[0] if countries else None
        c_qid = next((c[0] for c in country.get(i, []) if c[1] == cid), None)
        region = (continent.get(c_qid) or [(None, None)])[0][1] if c_qid else None
        aliases = sorted({a for a in ([nm["ru"], full] + list(nm["alt"]) + [l["ticker"] for l in listed[i]["listings"]]) if a and a != name})
        rec = {
            "id": i, "name": name, "name_ru": nm["ru"], "aliases": aliases,
            "country": cid, "region": region, "sector": sector, "industries": ind_labels,
            "founded": years[0] if years else None, "exchange": exch, "ticker": ticker,
            "founders": [x[1] for x in founders.get(i, [])], "ceo": [x[1] for x in ceo.get(i, [])],
            "hq": [x[1] for x in hq.get(i, [])],
            "popularity": listed[i]["links"], "level": level_of(listed[i]["links"]),
            "source": f"https://www.wikidata.org/wiki/{i}",
        }
        (review if problems else companies).append(dict(rec, problems=problems) if problems else rec)

    companies.sort(key=lambda c: -c["popularity"])
    review.sort(key=lambda c: -c["popularity"])
    enrich_sec(companies)
    return companies, review

# ---------------- Изменения ----------------
WATCH = ["name", "country", "sector", "founded", "exchange", "ticker", "ceo"]

def diff(old, new):
    o = {c["id"]: c for c in old}; n = {c["id"]: c for c in new}
    added = [n[k] for k in n if k not in o]
    removed = [o[k] for k in o if k not in n]
    changed = []
    for k in n:
        if k in o:
            d = [(f, o[k].get(f), n[k].get(f)) for f in WATCH if o[k].get(f) != n[k].get(f)]
            if d: changed.append((n[k], d))
    return added, removed, changed

def write_changes(path, added, removed, changed, total, review_count):
    today = datetime.date.today().isoformat()
    lines = [f"# Изменения базы компаний — {today}", "",
             f"В игре: **{total}** компаний. На ручной проверке: **{review_count}** (data/review.json).", ""]
    def block(title, rows):
        lines.append(f"## {title} ({len(rows)})"); lines.extend(rows or ["—"]); lines.append("")
    block("Добавлены", [f"- {c['name']} — {c['country']}, {c['sector']}, {c['exchange']}" for c in added[:200]])
    block("Убраны", [f"- {c['name']}" for c in removed[:200]])
    block("Изменились", [f"- {c['name']}: " + "; ".join(f"{f}: {a} → {b}" for f, a, b in d) for c, d in changed[:200]])
    open(path, "w", encoding="utf-8").write("\n".join(lines))

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, "companies.json")
    old = json.load(open(path, encoding="utf-8"))["companies"] if os.path.exists(path) else []
    companies, review = build()
    if len(companies) < 0.7 * len(old):
        sys.exit(f"Подозрительно мало компаний ({len(companies)} против {len(old)}) — файл не перезаписан")
    meta = {"updated": datetime.date.today().isoformat(), "count": len(companies),
            "sources": ["Wikidata (CC0)", "SEC EDGAR"] if SEC_CONTACT else ["Wikidata (CC0)"],
            "levels": {name: sum(1 for c in companies if c["level"] == name) for _, name in LEVELS}}
    json.dump(dict(meta, companies=companies), open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump({"updated": meta["updated"], "count": len(review), "companies": review},
              open(os.path.join(OUT_DIR, "review.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    write_changes(os.path.join(OUT_DIR, "changes.md"), *diff(old, companies), len(companies), len(review))
    print(f"Готово: {len(companies)} в игре, {len(review)} на проверке, уровни: {meta['levels']}")

if __name__ == "__main__":
    main()
