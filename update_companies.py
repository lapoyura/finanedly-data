#!/usr/bin/env python3
"""
finanedly · еженедельное обновление базы компаний.

Источники:
  • Wikidata (CC0) — компании с биржевым листингом: страна, отрасль, год основания,
    биржа и тикер, основатели, CEO, штаб-квартира, названия, известность.
  • SEC EDGAR (бесплатно, без ключа) — выручка и прибыль компаний из США.
    Включается, если задана переменная окружения SEC_CONTACT (ваш e-mail).
  • data/overrides.json — ручные правки автора (статус ok/no и верные значения).

Результат:
  data/companies.json — полная база
  data/game.json      — облегчённая база для игр
  data/review.json    — компании, которые не прошли проверку (на ручной разбор)
  data/changes.md     — что изменилось с прошлого запуска

Только стандартная библиотека Python 3.9+, ничего устанавливать не нужно.
"""
import json, os, re, sys, time, datetime, urllib.request, urllib.parse
from collections import defaultdict

# ---------------- Настройки ----------------
MIN_SITELINKS = int(os.environ.get("MIN_SITELINKS", "10"))  # минимум статей в Википедиях
BATCH = 250                                                   # компаний в одном запросе
WIKIDATA_URL = "https://query.wikidata.org/sparql"
USER_AGENT = "finanedly-data/1.0 (https://finanedly.com; " + os.environ.get("SEC_CONTACT", "contact not set") + ")"
SEC_CONTACT = os.environ.get("SEC_CONTACT", "").strip()
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
YEAR_SPREAD_OK = 5   # если годы основания в Wikidata расходятся не больше чем на столько лет — берём ранний

# Уровни сложности по числу языковых версий статьи в Википедии
LEVELS = [(80, "лёгкий"), (40, "средний"), (20, "сложный"), (0, "эксперт")]

# ---------------- Биржи ----------------
# Английское название в Wikidata → как показываем в игре
EXCHANGES = {
    "new york stock exchange": "NYSE", "nyse american": "NYSE", "nyse arca": "NYSE",
    "nasdaq": "NASDAQ", "nasdaq stock market": "NASDAQ", "nasdaq global select market": "NASDAQ",
    "nasdaq global market": "NASDAQ", "nasdaq capital market": "NASDAQ",
    "tokyo stock exchange": "Токио", "frankfurt stock exchange": "Франкфурт", "xetra": "Франкфурт",
    "boerse frankfurt": "Франкфурт", "börse frankfurt": "Франкфурт",
    "london stock exchange": "Лондон", "euronext paris": "Париж", "euronext amsterdam": "Амстердам",
    "euronext brussels": "Брюссель", "euronext lisbon": "Лиссабон", "euronext dublin": "Дублин",
    "irish stock exchange": "Дублин", "euronext milan": "Милан", "borsa italiana": "Милан",
    "hong kong stock exchange": "Гонконг", "stock exchange of hong kong": "Гонконг",
    "korea exchange": "Сеул", "six swiss exchange": "Цюрих", "moscow exchange": "Мосбиржа",
    "toronto stock exchange": "Торонто", "shanghai stock exchange": "Шанхай", "shenzhen stock exchange": "Шэньчжэнь",
    "bolsa de madrid": "Мадрид", "madrid stock exchange": "Мадрид", "nasdaq stockholm": "Стокгольм",
    "australian securities exchange": "Сидней", "national stock exchange of india": "Мумбаи (NSE)",
    "bombay stock exchange": "Мумбаи (BSE)", "taiwan stock exchange": "Тайбэй", "b3": "Сан-Паулу",
    "nasdaq copenhagen": "Копенгаген", "oslo stock exchange": "Осло", "oslo børs": "Осло",
    "nasdaq helsinki": "Хельсинки", "singapore exchange": "Сингапур", "johannesburg stock exchange": "Йоханнесбург",
    "warsaw stock exchange": "Варшава", "vienna stock exchange": "Вена", "wiener börse": "Вена",
    "borsa istanbul": "Стамбул", "tel aviv stock exchange": "Тель-Авив", "mexican stock exchange": "Мехико",
    "bolsa mexicana de valores": "Мехико", "saudi exchange": "Эр-Рияд", "tadawul": "Эр-Рияд",
    "stock exchange of thailand": "Бангкок", "indonesia stock exchange": "Джакарта",
    "bursa malaysia": "Куала-Лумпур", "new zealand exchange": "Окленд",
}
# Страна каждой биржи (Q-id Wikidata) — чтобы основной считалась биржа родной страны компании,
# а не депозитарные расписки в США (иначе Toyota попадает на NYSE, Samsung — в Лондон).
EXCHANGE_COUNTRY = {
    "NYSE": "Q30", "NASDAQ": "Q30", "Токио": "Q17", "Франкфурт": "Q183", "Лондон": "Q145", "Париж": "Q142",
    "Амстердам": "Q55", "Брюссель": "Q31", "Лиссабон": "Q45", "Дублин": "Q27", "Милан": "Q38",
    "Гонконг": "Q148", "Шанхай": "Q148", "Шэньчжэнь": "Q148", "Сеул": "Q884", "Цюрих": "Q39",
    "Мосбиржа": "Q159", "Торонто": "Q16", "Мадрид": "Q29", "Стокгольм": "Q34", "Сидней": "Q408",
    "Мумбаи (NSE)": "Q668", "Мумбаи (BSE)": "Q668", "Тайбэй": "Q865", "Сан-Паулу": "Q155",
    "Копенгаген": "Q35", "Осло": "Q20", "Хельсинки": "Q33", "Сингапур": "Q334", "Йоханнесбург": "Q258",
    "Варшава": "Q36", "Вена": "Q40", "Стамбул": "Q43", "Тель-Авив": "Q801", "Мехико": "Q96",
    "Эр-Рияд": "Q851", "Бангкок": "Q869", "Джакарта": "Q252", "Куала-Лумпур": "Q833", "Окленд": "Q664",
}
# Если родной биржи нет (или их несколько) — какую считать основной
EXCHANGE_PRIORITY = ["NYSE", "NASDAQ", "Токио", "Лондон", "Франкфурт", "Париж", "Гонконг", "Шанхай",
                     "Шэньчжэнь", "Сеул", "Цюрих", "Амстердам", "Торонто", "Мосбиржа"]
US_EXCHANGES = {"NYSE", "NASDAQ"}

# ---------------- Секторы (утверждены 27.11) ----------------
# (сектор, короткое название для плашек «Классики», группа — одна группа даёт жёлтый)
SECTORS = [
    ("Программы и облачные сервисы", "Софт и облака", "Технологии"),
    ("Интернет-сервисы", "Интернет", "Технологии"),
    ("Полупроводники", "Чипы", "Технологии"),
    ("Электроника и компьютеры", "Электроника", "Технологии"),
    ("Телеком", "Телеком", "Связь и медиа"),
    ("Медиа и стриминг", "Медиа", "Связь и медиа"),
    ("Видеоигры", "Видеоигры", "Связь и медиа"),
    ("Электронная торговля", "E-commerce", "Торговля"),
    ("Розничные сети", "Розница", "Торговля"),
    ("Рестораны", "Рестораны", "Торговля"),
    ("Напитки", "Напитки", "Потребительские товары"),
    ("Продукты питания", "Продукты", "Потребительские товары"),
    ("Табак", "Табак", "Потребительские товары"),
    ("Бытовая химия и косметика", "Бытовая химия", "Потребительские товары"),
    ("Одежда и обувь", "Одежда", "Потребительские товары"),
    ("Роскошь", "Роскошь", "Потребительские товары"),
    ("Автомобили и автодетали", "Авто", "Транспорт"),
    ("Перевозки и логистика", "Логистика", "Транспорт"),
    ("Туризм и отели", "Туризм", "Транспорт"),
    ("Авиация, космос и оборона", "Авиакосмос", "Промышленность"),
    ("Промышленное оборудование", "Оборудование", "Промышленность"),
    ("Строительство и материалы", "Строительство", "Промышленность"),
    ("Нефть и газ", "Нефть и газ", "Энергетика и сырьё"),
    ("Электроэнергетика", "Электроэнергия", "Энергетика и сырьё"),
    ("Металлы и добыча", "Металлы", "Энергетика и сырьё"),
    ("Химия и удобрения", "Химия", "Энергетика и сырьё"),
    ("Банки", "Банки", "Финансы"),
    ("Платежи и финтех", "Платежи", "Финансы"),
    ("Страхование", "Страхование", "Финансы"),
    ("Инвестиции и биржи", "Инвестиции", "Финансы"),
    ("Недвижимость", "Недвижимость", "Финансы"),
    ("Фармацевтика", "Фарма", "Здоровье"),
    ("Биотехнологии", "Биотех", "Здоровье"),
    ("Медтехника и клиники", "Медтехника", "Здоровье"),
]
SECTOR_INFO = {s: {"short": sh, "group": g} for s, sh, g in SECTORS}

# Отрасли Wikidata (английские названия) → наши секторы.
# Ищем целые слова: «oil» не найдётся внутри «toiletries». Слово со * на конце — начало слова
# («biotechnolog*» найдёт biotechnology). Порядок важен: каждая отрасль голосует за первое совпадение,
# поэтому узкие правила стоят выше общих, а самые общие слова — в конце, с наименьшим приоритетом.
SECTOR_RULES = [
    ("Табак", ["tobacco", "cigarette", "cigar"]),
    ("Видеоигры", ["video game", "video game developer", "video game publisher", "esports", "game console"]),
    ("Рестораны", ["restaurant", "fast food", "fast-food", "coffeehouse", "coffee shop", "catering", "foodservice", "pizza"]),
    ("Напитки", ["beverage", "soft drink", "drink", "brewing", "brewery", "beer", "wine", "winery", "spirits",
                 "distill*", "alcoholic beverage", "bottled water", "juice"]),
    ("Продукты питания", ["food", "food processing", "confectionery", "dairy", "meat", "snack", "agribusiness",
                          "agriculture", "sugar", "chocolate", "bakery", "cereal", "pet food", "seafood"]),
    ("Полупроводники", ["semiconductor", "integrated circuit", "microchip", "microprocessor", "chip", "foundry"]),
    ("Электроника и компьютеры", ["consumer electronics", "electronics", "home appliance", "computer hardware",
                                  "personal computer", "mobile phone", "smartphone", "telecommunications equipment",
                                  "networking hardware", "camera", "optics"]),
    ("Платежи и финтех", ["payment", "financial technology", "fintech", "credit card", "payment card", "money transfer",
                          "payment processor", "digital payment"]),
    ("Медтехника и клиники", ["medical device", "medical equipment", "medical technology", "hospital",
                              "health insurance", "managed care", "diagnostic*", "medical imaging"]),
    ("Биотехнологии", ["biotechnolog*", "biopharm*", "genetic*", "genomic*", "life science"]),
    ("Фармацевтика", ["pharmaceutical", "pharmaceutics", "drug", "medicine", "vaccine", "generic drug"]),
    ("Электронная торговля", ["e-commerce", "ecommerce", "online shopping", "electronic commerce", "online retail*",
                              "online marketplace"]),
    ("Интернет-сервисы", ["internet", "search engine", "social media", "social network*", "online service",
                          "web portal", "online advertising", "ride-sharing", "ridesharing", "online platform", "web service"]),
    ("Программы и облачные сервисы", ["software", "cloud computing", "cloud", "information technology", "it service",
                                      "it consulting", "computer security", "cybersecurity", "artificial intelligence",
                                      "enterprise software", "software as a service", "data"]),
    ("Медиа и стриминг", ["film", "mass media", "media", "broadcasting", "television", "publishing", "music",
                          "streaming", "entertainment", "newspaper", "radio", "advertising", "cinema", "movie theater"]),
    ("Телеком", ["telecommunication", "telecom", "mobile network", "wireless", "internet service provider",
                 "cable television", "mobile telephony"]),
    ("Страхование", ["insurance", "reinsurance"]),
    ("Банки", ["bank", "banking", "commercial bank", "investment banking"]),
    ("Инвестиции и биржи", ["investment", "asset management", "stock exchange", "private equity", "brokerage",
                            "venture capital", "wealth management", "hedge fund"]),
    ("Недвижимость", ["real estate", "property", "real estate investment trust", "reit"]),
    ("Нефть и газ", ["petroleum", "oil", "natural gas", "gas industry", "oil and gas", "oil refinery", "refining",
                     "coal", "pipeline transport", "liquefied natural gas"]),
    ("Электроэнергетика", ["electric utility", "electricity", "electric power", "utility", "public utility",
                           "renewable energy", "power generation", "nuclear power", "water utility", "solar energy",
                           "wind power", "hydroelectricity"]),
    ("Химия и удобрения", ["chemical", "chemistry", "fertilizer", "fertiliser", "plastic", "potash", "agrochemical",
                           "paint", "industrial gas"]),
    ("Металлы и добыча", ["mining", "steel", "metal", "metallurgy", "aluminium", "aluminum", "gold", "copper",
                          "iron", "nickel", "diamond", "iron ore"]),
    ("Авиация, космос и оборона", ["aerospace", "aircraft", "aircraft manufactur*", "defense", "defence",
                                   "arms industry", "military", "spaceflight", "weapon"]),
    ("Автомобили и автодетали", ["automotive", "automobile", "car manufactur*", "motor vehicle", "electric vehicle",
                                 "auto parts", "automotive parts", "tire", "tyre", "truck", "motorcycle"]),
    ("Туризм и отели", ["hotel", "travel", "tourism", "cruise", "cruise line", "casino", "gambling", "hospitality",
                        "resort", "online travel"]),
    ("Перевозки и логистика", ["airline", "shipping", "logistics", "railway", "rail transport", "transport",
                               "courier", "freight", "delivery", "port", "maritime", "container shipping"]),
    ("Строительство и материалы", ["construction", "building material", "cement", "civil engineering", "glass",
                                   "homebuilding", "infrastructure", "construction industry"]),
    ("Роскошь", ["luxury", "luxury goods", "jewel*", "watch", "watchmaking", "haute couture"]),
    ("Одежда и обувь", ["clothing", "apparel", "footwear", "fashion", "textile", "sportswear", "shoe"]),
    ("Бытовая химия и косметика", ["cosmetic*", "personal care", "household", "toiletries", "beauty", "hygiene",
                                   "consumer goods", "fast-moving consumer goods"]),
    ("Розничные сети", ["retail", "supermarket", "hypermarket", "department store", "wholesale", "convenience store",
                        "discount store", "grocery", "variety store"]),
    # --- самые общие слова: голосуют, но проигрывают любому узкому правилу при равенстве ---
    ("Банки", ["financial services", "finance", "financial"]),
    ("Нефть и газ", ["energy", "energy industry"]),
    ("Программы и облачные сервисы", ["technology", "computer", "high tech*"]),
    ("Медтехника и клиники", ["health care", "healthcare", "medical", "health"]),
    ("Промышленное оборудование", ["machinery", "industrial", "industry", "engineering", "conglomerate",
                                   "manufacturing", "electrical equipment", "heavy equipment", "robotics",
                                   "automation", "industrial machinery"]),
]

def _pattern(key):
    if key.endswith("*"):
        return r"\b" + re.escape(key[:-1])
    return r"\b" + re.escape(key) + r"(?:s|es)?\b"

SECTOR_RE = [(sector, re.compile("|".join(_pattern(k) for k in keys))) for sector, keys in SECTOR_RULES]
assert all(s in SECTOR_INFO for s, _ in SECTOR_RULES), "В SECTOR_RULES есть сектор, которого нет в SECTORS"

# ---------------- Фильтр «не компания» ----------------
# Если в Wikidata объект — электростанция, фонд, индекс и т. п., в базу он не попадает вовсе.
NOT_COMPANY = re.compile("|".join(_pattern(k) for k in [
    "power station", "power plant", "hydroelectric power station", "dam", "exchange-traded fund",
    "mutual fund", "investment fund", "closed-end fund", "index fund", "stock market index", "unit trust",
    "investment trust", "special-purpose acquisition company", "blank check company", "share class",
]))

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
def sector_votes(industry_labels):
    """Каждая отрасль компании голосует за первый подходящий сектор.
    Возвращает список (сектор, голосов) от победителя вниз; при равенстве выше тот, что выше в SECTOR_RULES."""
    votes = {}
    for l in (x.lower() for x in industry_labels if x):
        for rank, (sector, rx) in enumerate(SECTOR_RE):
            if rx.search(l):
                v = votes.setdefault(sector, [0, rank]); v[0] += 1
                if rank < v[1]: v[1] = rank
                break
    return [(s, v[0]) for s, v in sorted(votes.items(), key=lambda kv: (-kv[1][0], kv[1][1]))]

def map_sector(industry_labels):
    v = sector_votes(industry_labels)
    return v[0][0] if v else None

def map_exchange(listings, home_country=None):
    """Основная биржа: сначала биржа страны компании, потом по EXCHANGE_PRIORITY."""
    named = []
    for l in listings:
        short = EXCHANGES.get(l["exchange_en"].lower())
        named.append((short or l["exchange_en"], l["ticker"], short is not None))
    known = [n for n in named if n[2]]
    home = [n for n in known if home_country and EXCHANGE_COUNTRY.get(n[0]) == home_country]
    pool = home or known or named
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
    s = s.rstrip(" ,&")
    if s.endswith(" and"): s = s[:-4].rstrip(" ,")
    if s != name.strip() and s.startswith("The ") and len(s) > 6:
        s = s[4:]
    return s

def year_of(s):
    try: return int(s[:5].lstrip("+")) if s.startswith(("+", "-")) else int(s[:4])
    except Exception: return None

def level_of(links):
    for threshold, name in LEVELS:
        if links >= threshold: return name

# ---------------- Ручные правки (data/overrides.json) ----------------
# Формат: {"companies": {"Q312": {"check": "Apple", "status": "ok", "sector": "Электроника и компьютеры; Видеоигры",
#          "country": "США", "founded": 1976, "exchange": "NASDAQ", "name": "Apple", "comment": "…"}}}
#   status "no"  — компания убирается из базы;
#   status "ok"  — компания идёт в игру, даже если у неё были замечания;
#   остальные поля заменяют данные Wikidata. sector — один или два сектора через «;».
#   check — название, по которому сверяется ID: если не совпало, правка НЕ применяется (защита от опечатки в ID).
def load_overrides():
    path = os.path.join(OUT_DIR, "overrides.json")
    if not os.path.exists(path): return {}
    data = json.load(open(path, encoding="utf-8"))
    return {k: v for k, v in data.get("companies", {}).items() if not k.startswith("_")}

def split_sectors(v):
    items = v if isinstance(v, list) else re.split(r"\s*[;/]\s*", str(v))
    return [s.strip() for s in items if s and s.strip()][:2]

def check_matches(check, rec, nm):
    c = str(check).casefold()
    names = [rec.get("name"), nm.get("en"), nm.get("ru")] + list(nm.get("alt", []))
    return any(n and (c in n.casefold() or n.casefold() in c) for n in names)

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
    kind = fetch_prop(ids, "P31", lang="en")
    country = fetch_prop(ids, "P17")
    industry = fetch_prop(ids, "P452", lang="en")
    inception = fetch_prop(ids, "P571", literal=True)
    founders = fetch_prop(ids, "P112")
    ceo = fetch_prop(ids, "P169")
    hq = fetch_prop(ids, "P159")
    hq_ids = sorted({h[0] for v in hq.values() for h in v})
    hq_country = fetch_prop(hq_ids, "P17")
    country_ids = sorted({c[0] for v in list(country.values()) + list(hq_country.values()) for c in v})
    continent = fetch_prop(country_ids, "P30")
    # страна (подпись) → регион, чтобы правильно ставить регион при ручной правке страны
    region_of = {}
    for v in list(country.values()) + list(hq_country.values()):
        for cq, cl in v:
            if cl and continent.get(cq): region_of.setdefault(cl, continent[cq][0][1])

    overrides = load_overrides()
    report = {"not_company": [], "removed_by_author": [], "ov_applied": 0, "ov_mismatch": [], "ov_missing": [],
              "second_sector_candidates": []}
    seen_ov = set()
    companies, review = [], []
    for i in ids:
        nm = names[i]
        full = nm["en"] or nm["ru"]
        name = short_name(full) if full else None

        # Фильтр «не компания»
        kinds = [k[1] for k in kind.get(i, []) if k[1]]
        bad = [k for k in kinds if NOT_COMPANY.search(k.lower())]
        if bad:
            report["not_company"].append(f"{name or i} ({i}) — {', '.join(bad)}")
            continue

        problems, notes = [], []   # problems: (поле, текст)
        # Страна: по штаб-квартире (надёжнее), если её нет — по свойству «страна» компании
        hq_c = list(dict.fromkeys(c for h in hq.get(i, []) for c in hq_country.get(h[0], [])))
        own_c = list(dict.fromkeys(country.get(i, [])))
        pool = hq_c if len(hq_c) == 1 else own_c
        if len(pool) > 1 and hq_c:
            common = [c for c in own_c if c in hq_c]
            if len(common) == 1: pool = common
        countries = list(dict.fromkeys(c[1] for c in pool))
        if not countries: problems.append(("country", "нет страны"))
        elif len(countries) > 1: problems.append(("country", "несколько стран: " + ", ".join(countries)))
        elif hq_c and own_c and hq_c[0][0] not in [c[0] for c in own_c]:
            notes.append("страна компании (" + ", ".join(c[1] for c in own_c) + ") не совпадает со страной штаб-квартиры (" + hq_c[0][1] + ") — взята страна штаб-квартиры")
        cid = countries[0] if countries else None
        c_qid = next((c[0] for c in pool if c[1] == cid), None)
        region = (continent.get(c_qid) or [(None, None)])[0][1] if c_qid else None

        # Сектор
        ind_labels = [x[1] for x in industry.get(i, [])]
        votes = sector_votes(ind_labels)
        sectors = [votes[0][0]] if votes else []
        if not sectors: problems.append(("sector", "сектор не определён: " + (", ".join(ind_labels) or "отрасль не указана")))
        tie = (len(votes) > 1 and votes[1][1] == votes[0][1]
               and SECTOR_INFO[votes[1][0]]["group"] != SECTOR_INFO[votes[0][0]]["group"])

        # Год основания
        years = sorted({y for y in (year_of(s) for s in inception.get(i, [])) if y})
        if not years: problems.append(("founded", "нет года основания"))
        elif years[-1] - years[0] > YEAR_SPREAD_OK: problems.append(("founded", "разные годы основания: " + ", ".join(map(str, years))))
        elif len(years) > 1: notes.append("в Wikidata несколько годов основания (" + ", ".join(map(str, years)) + ") — взят ранний")

        # Биржа: сначала биржа родной страны
        exch, ticker, known = map_exchange(listed[i]["listings"], c_qid)
        if not exch: problems.append(("exchange", "нет биржи"))
        elif not known: problems.append(("exchange", "незнакомая биржа: " + exch))
        if not name: problems.append(("name", "нет названия"))
        elif len(name) < 2 or not (name[0].isupper() or name[0].isdigit()): problems.append(("name", "странное название: " + name))

        aliases = sorted({a for a in ([nm["ru"], full] + list(nm["alt"]) + [l["ticker"] for l in listed[i]["listings"]]) if a and a != name})
        rec = {
            "id": i, "name": name, "name_ru": nm["ru"], "aliases": aliases,
            "country": cid, "region": region, "sector": sectors[0] if sectors else None, "sectors": sectors,
            "industries": ind_labels, "founded": years[0] if years else None, "exchange": exch, "ticker": ticker,
            "founders": [x[1] for x in founders.get(i, [])], "ceo": [x[1] for x in ceo.get(i, [])],
            "hq": [x[1] for x in hq.get(i, [])],
            "popularity": listed[i]["links"], "level": level_of(listed[i]["links"]),
            "source": f"https://www.wikidata.org/wiki/{i}",
        }

        # Ручные правки автора
        ov = overrides.get(i)
        if ov:
            seen_ov.add(i)
            if ov.get("check") and not check_matches(ov["check"], rec, nm):
                report["ov_mismatch"].append(f"{i}: в правке «{ov['check']}», в Wikidata «{name}» — правка не применена")
                ov = None
        if ov:
            report["ov_applied"] += 1
            if str(ov.get("status", "")).strip().lower() == "no":
                report["removed_by_author"].append(f"{name} ({i})")
                continue
            if ov.get("name"):
                if rec["name"] and rec["name"] != ov["name"]: rec["aliases"] = sorted(set(rec["aliases"]) | {rec["name"]})
                rec["name"] = ov["name"]
            if ov.get("country"):
                rec["country"] = ov["country"]
                rec["region"] = region_of.get(ov["country"], rec["region"])
            if ov.get("sector"):
                ss = split_sectors(ov["sector"])
                unknown = [s for s in ss if s not in SECTOR_INFO]
                if unknown: problems.append(("sector", "в правке незнакомый сектор: " + ", ".join(unknown)))
                rec["sectors"] = ss; rec["sector"] = ss[0] if ss else None
            if ov.get("founded"):
                try: rec["founded"] = int(ov["founded"])
                except Exception: problems.append(("founded", "в правке неверный год: " + str(ov["founded"])))
            if ov.get("exchange"): rec["exchange"] = ov["exchange"]
            fixed = {f for f in ("name", "country", "sector", "founded", "exchange") if ov.get(f)}
            problems = [p for p in problems if p[0] not in fixed or p[1].startswith("в правке")]
            if str(ov.get("status", "")).strip().lower() == "ok":
                problems = [p for p in problems if p[1].startswith("в правке")]
            if ov.get("comment"): notes.append("комментарий автора: " + str(ov["comment"]))
            rec["edited"] = True

        if tie and not (ov and ov.get("sector")):
            notes.append("возможен второй сектор: " + votes[1][0])
            report["second_sector_candidates"].append(f"{rec['name']} ({i}) — {votes[0][0]} или {votes[1][0]}")
        rec["sector_group"] = SECTOR_INFO.get(rec["sector"], {}).get("group") if rec["sector"] else None
        if notes: rec["notes"] = notes
        if problems:
            review.append(dict(rec, problems=[p[1] for p in problems]))
        else:
            companies.append(rec)

    report["ov_missing"] = [f"{k} ({v.get('check', '')})" for k, v in overrides.items() if k not in seen_ov]
    companies.sort(key=lambda c: -c["popularity"])
    review.sort(key=lambda c: -c["popularity"])
    enrich_sec(companies)
    return companies, review, report

# ---------------- Изменения ----------------
WATCH = ["name", "country", "sector", "sectors", "founded", "exchange", "ticker", "ceo"]

def diff(old, new):
    o = {c["id"]: c for c in old}; n = {c["id"]: c for c in new}
    added = [n[k] for k in n if k not in o]
    removed = [o[k] for k in o if k not in n]
    changed = []
    for k in n:
        if k in o:
            d = [(f, o[k].get(f), n[k].get(f)) for f in WATCH if o[k].get(f) != n[k].get(f) and not (f == "sectors" and o[k].get(f) is None)]
            if d: changed.append((n[k], d))
    return added, removed, changed

def write_changes(path, added, removed, changed, total, review_count, report):
    today = datetime.date.today().isoformat()
    lines = [f"# Изменения базы компаний — {today}", "",
             f"В игре: **{total}** компаний. На ручной проверке: **{review_count}** (data/review.json).", ""]
    def block(title, rows):
        lines.append(f"## {title} ({len(rows)})"); lines.extend(rows[:200] or ["—"])
        if len(rows) > 200: lines.append(f"- … и ещё {len(rows) - 200}")
        lines.append("")
    sec = lambda c: " · ".join(c.get("sectors") or [c.get("sector") or "—"])
    block("Добавлены", [f"- {c['name']} — {c['country']}, {sec(c)}, {c['exchange']}" for c in added])
    block("Убраны", [f"- {c['name']}" for c in removed])
    block("Изменились", [f"- {c['name']}: " + "; ".join(f"{f}: {a} → {b}" for f, a, b in d) for c, d in changed])
    lines.append(f"## Ручные правки (overrides.json): применено {report['ov_applied']}"); lines.append("")
    block("Правки не применены: ID и название не совпали", ["- " + x for x in report["ov_mismatch"]])
    block("Правки для компаний, которых нет в Wikidata-выборке", ["- " + x for x in report["ov_missing"]])
    block("Убраны автором (статус no)", ["- " + x for x in report["removed_by_author"]])
    block("Отсеяны как «не компания»", ["- " + x for x in report["not_company"]])
    block("Кандидаты на второй сектор (решить в таблице)", ["- " + x for x in report["second_sector_candidates"]])
    open(path, "w", encoding="utf-8").write("\n".join(lines))

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, "companies.json")
    old = json.load(open(path, encoding="utf-8"))["companies"] if os.path.exists(path) else []
    companies, review, report = build()
    if len(companies) < 0.7 * len(old):
        sys.exit(f"Подозрительно мало компаний ({len(companies)} против {len(old)}) — файл не перезаписан")
    meta = {"updated": datetime.date.today().isoformat(), "count": len(companies),
            "sources": ["Wikidata (CC0)", "SEC EDGAR"] if SEC_CONTACT else ["Wikidata (CC0)"],
            "levels": {name: sum(1 for c in companies if c["level"] == name) for _, name in LEVELS}}
    sectors_meta = {s: SECTOR_INFO[s] for s, _, _ in SECTORS}
    json.dump(dict(meta, sectors=sectors_meta, companies=companies), open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump({"updated": meta["updated"], "count": len(review), "companies": review},
              open(os.path.join(OUT_DIR, "review.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    write_changes(os.path.join(OUT_DIR, "changes.md"), *diff(old, companies), len(companies), len(review), report)
    # Компактный файл для игр: только нужные поля, без отступов (грузится быстрее).
    # Новые поля добавляются только в конец списка fields — игры читают поля по имени, старый код не ломается.
    def short_aliases(c):
        seen, out = {c["name"].lower()}, []
        for x in sorted(c["aliases"], key=len):
            if x.lower() not in seen and len(x) <= 40:
                seen.add(x.lower()); out.append(x)
        return out[:10]
    game = {"updated": meta["updated"],
            "sectors": sectors_meta,
            "fields": ["id", "name", "aliases", "country", "region", "sector", "founded", "exchange", "ticker",
                       "popularity", "level", "sector2"],
            "companies": [[c["id"], c["name"], short_aliases(c), c["country"], c["region"], c["sector"], c["founded"],
                           c["exchange"], c["ticker"], c["popularity"], c["level"],
                           (c.get("sectors") or [None, None])[1] if len(c.get("sectors") or []) > 1 else None]
                          for c in companies]}
    json.dump(game, open(os.path.join(OUT_DIR, "game.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"Готово: {len(companies)} в игре, {len(review)} на проверке, отсеяно «не компаний»: {len(report['not_company'])}, "
          f"правок применено: {report['ov_applied']}")

if __name__ == "__main__":
    main()
