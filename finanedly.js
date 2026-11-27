/* finanedly · все игры · v5. Подключение в Tilda (блок T123):
   <div id="finanedly-app"></div>
   <script src="https://lapoyura.github.io/finanedly-data/finanedly.js"></script>
   Устройство файла:
   1) НАСТРОЙКИ — дата запуска и ссылка на донаты (меняются здесь, в одном месте);
   2) FND_CSS — общие стили всех игр. #G — все игры, #G15 — только игры 1 и 5 (раскрывается при загрузке в #fg1, #fg5);
   3) разметка — общий каркас (шапка, подвал, окна) + своя часть у каждой игры;
   4) FND — общий код: база компаний, расписание загадок, поиск, статистика, «Поделиться», окна, конфетти;
   5) код каждой игры отдельным блоком (#fg1 Компании, #fg3 Ключевые слова, #fg4 Цитата, #fg5 Классика);
   6) в конце — запуск, переключение вкладок, смена дня в полночь и панель тестировщика (#test). */

/* ---------- НАСТРОЙКИ ---------- */
var FND_START=new Date(2026,10,1); /* День 1 — 1 ноября 2026. Перед запуском поставить дату запуска. Месяцы считаются с нуля: 10 = ноябрь */
var FND_DONATE=''; /* Ссылка «Поддержать проект ☕». Пока пусто — кнопка скрыта */

var FND_CSS=`
#G{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c; --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13); font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}
#G *{box-sizing:border-box;margin:0;padding:0}
#G button{font:inherit;cursor:pointer;color:inherit}
#G .t-wrap{max-width:1140px;margin:0 auto}
#G .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}
#G .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}
#G .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}
#G .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}
#G .t-nav::-webkit-scrollbar{display:none}
#G .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}
#G .t-nav a:hover{color:var(--ink);background:var(--soft)}
#G .t-nav a.t-on{background:var(--ink);color:#111}
#G135 .t-icons{display:flex;gap:4px;justify-self:end}
#G4 .t-icons{display:flex;gap:4px;justify-self:end;align-items:center}
#G .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}
#G .t-icon:hover{background:var(--panel);color:#fff}
#G .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}
#G .t-icon:hover .t-tip{opacity:1;transform:none}
#G .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}
#G .t-card{background:var(--panel);border-radius:24px;padding:20px}
#G5 .t-game{max-width:980px}
#G5 .t-tr .t-chip{font-size:12.5px;padding:4px 9px}
#G34 .t-words{list-style:none;display:flex;flex-direction:column;gap:8px}
#G5 .t-intro{font-size:15px;color:#cfcfcf;margin:2px 4px 0}
#G34 .t-word{display:flex;align-items:center;gap:14px;background:var(--card);border-radius:16px;padding:14px 16px;font-size:16px;min-height:54px}
#G5 .t-giveup{border:0;background:var(--card);color:#bbb;border-radius:999px;padding:8px 14px;font-size:13px}
#G34 .t-word b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--soft);font-size:12px;font-weight:600;color:#aaa;display:flex;align-items:center;justify-content:center}
#G5 .t-giveup:hover{color:#fff;background:var(--soft)}
#G34 .t-word.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555;font-size:13px}
#G5 .t-tr.t-new .t-chip{animation:tFlip .45s ease both}
#G34 .t-word.t-lock svg{width:16px;height:16px}
#G5 .t-tr.t-new .t-chip:nth-of-type(2){animation-delay:.08s}
#G34 .t-word.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}
#G5 .t-tr.t-new .t-chip:nth-of-type(3){animation-delay:.16s}
#G34 .t-src{padding:14px 22px 0;font-size:13px;color:var(--muted)}
#G5 .t-tr.t-new .t-chip:nth-of-type(4){animation-delay:.24s}
#G34 .t-src a{color:#ff8a5c;text-decoration:none}
#G34 .t-src a:hover{text-decoration:underline}
#G .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
#G .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}
#G .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}
#G .t-tile.t-lock svg{width:22px;height:22px}
#G .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}
#G .t-form{display:flex;gap:10px;position:relative;margin-top:16px}
#G .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}
#G .t-input::placeholder{color:#777}
#G .t-input:focus{border-color:#555}
#G .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}
#G .t-btn:hover{background:#fff}
#G .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}
#G .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}
#G .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}
#G .t-list li small{color:var(--muted)}
#G .t-list li:hover,#G .t-list li.t-act{background:var(--soft)}
#G .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}
#G .t-msg:empty{display:none}
#G .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}
#G134 .t-steps{flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
#G5 .t-steps{flex:1;display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
#G .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}
#G .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}
#G .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}
#G .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}
#G .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}
#G .t-stxt b{color:var(--ink);font-weight:600}
#G .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}
#G .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}
#G .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}
#G .t-ahead small{font-size:13px;opacity:.9}
#G .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}
#G .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}
#G15 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:18px 22px 20px}
#G34 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:16px 22px 20px}
#G .t-arow span{font-size:13px;color:var(--muted)}
#G .t-note{font-size:13px;color:var(--muted);line-height:1.55}
#G .t-c-ok{color:var(--ok)}
#G .t-c-near{color:var(--near)}
#G .t-c-miss{color:var(--miss)}
#G .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
#G .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}
#G5 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px}
#G5 .t-table>.t-tr:last-child{border-radius:0 0 18px 18px}
#G5 .t-hd{position:relative;cursor:help;text-decoration:underline dotted;text-underline-offset:3px;outline:none}
#G5 .t-hd-tip{position:absolute;top:calc(100% + 10px);left:-12px;width:280px;background:#2a2a2a;color:var(--ink);font-size:12.5px;line-height:1.5;padding:12px 14px;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.45);opacity:0;visibility:hidden;transform:translateY(-4px);transition:.15s;z-index:20;text-decoration:none;cursor:default}
#G134 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px;overflow:hidden}
#G5 .t-hd:hover .t-hd-tip,#G5 .t-hd:focus .t-hd-tip{opacity:1;visibility:visible;transform:none}
#G5 .t-hd-tip b{display:block;font-weight:500;color:var(--muted);margin-bottom:6px}
#G134 .t-tr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1.4fr) minmax(0,.8fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}
#G5 .t-hd-tip div{padding:3px 0;border-top:1px solid rgba(255,255,255,.06)}
#G134 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px}
#G5 .t-hd-tip em{font-style:normal;color:var(--muted)}
#G5 .t-mlists{display:none;margin-top:10px;gap:8px;flex-wrap:wrap}
#G5 .t-mlists details{font-size:13px;color:var(--muted);width:100%}
#G5 .t-mlists summary{cursor:pointer;color:var(--ink);text-decoration:underline dotted;text-underline-offset:3px}
#G5 .t-mlists .t-ml{margin-top:8px;background:#232323;border-radius:12px;padding:10px 12px;line-height:1.5}
#G5 .t-mlists .t-ml b{display:block;font-weight:500;margin-bottom:4px}
#G5 .t-mlists .t-ml em{font-style:normal}
#G5 .t-tr{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr) minmax(0,1.15fr) minmax(0,.95fr) minmax(0,1.1fr) minmax(0,.95fr) minmax(0,.72fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}
#G5 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px;border-radius:18px 18px 0 0}
#G .t-tr.t-win{background:rgba(74,222,128,.07)}
#G .t-n{color:var(--muted)}
#G .t-co{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#G .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}
#G .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}
#G .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}
#G .t-chip.ok{background:var(--okbg);color:var(--ok)}
#G .t-chip.near{background:var(--nearbg);color:var(--near)}
#G .t-chip.miss{background:var(--missbg);color:var(--miss)}
#G .t-chip.none{background:var(--soft);color:var(--muted)}
#G .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}
#G .t-dot:before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
#G .t-dot.ok{color:var(--ok)}
#G .t-dot.near{color:var(--near)}
#G .t-dot.miss{color:var(--miss)}
#G .t-dot span{color:var(--ink)}
#G .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}
#G .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}
#G .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}
#G .t-donate:hover{color:#fff;background:var(--soft)}
#G .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}
#G .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}
#G .t-toast.t-show{opacity:1}
#G .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}
#G .t-modal.t-show{display:flex}
#G .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}
#G .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}
#G .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}
#G .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}
#G .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}
#G .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}
#G .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}
#G .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}
#G .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}
#G .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}
#G .t-tabs button.t-on{background:var(--ink);color:#111}
#G .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
#G .t-num{background:var(--card);border-radius:14px;padding:12px}
#G .t-num b{display:block;font-size:22px;font-weight:500}
#G .t-num span{font-size:11px;color:var(--muted)}
#G .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}
#G .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}
#G134 .t-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}
#G5 .t-bars{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}
#G .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}
#G .t-col em{font-style:normal;font-size:11px;color:var(--muted)}
#G .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}
#G .t-col div.t-today{background:var(--ink)}
#G134 .t-xs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}
#G5 .t-xs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}
#G .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}
#G .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}
#G4 .t-quote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(20px,3.2vw,26px);line-height:1.4;padding:24px 24px 22px;background:var(--card);border-radius:18px;position:relative}
#G4 .t-quote:before{content:"“";position:absolute;top:-4px;left:12px;font-size:60px;line-height:1;color:var(--or1);opacity:.55}
#G4 .t-hints{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}
#G4 .t-hint{background:var(--card);border-radius:14px;padding:10px 12px;min-height:52px;display:flex;align-items:center;justify-content:center;text-align:center}
#G4 .t-hint span{font-size:16px;font-weight:500}
#G4 .t-hint.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px)}
#G4 .t-hint.t-lock span{color:#555;display:flex}
#G4 .t-hint.t-lock svg{width:16px;height:16px}
#G4 .t-hint.t-emo span{font-size:26px;line-height:1}
#G4 .t-hint.t-txt span{font-size:13px;line-height:1.25}
#G4 .t-hint.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}
#G4 .t-orig{padding:16px 22px 0;font-size:14px;color:#d9d9d9;font-style:italic;line-height:1.5}
#G .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}
#G .t-list li b{font-weight:700;color:#fff}
#G .t-list li small{flex:none;margin-left:12px}
#G .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
#G .t-rbtns .t-btn{margin:0}
#G .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}
#G .t-skip:hover{color:var(--ink);border-color:#444}
#G .t-bar{display:flex;align-items:center;justify-content:center;gap:12px}
#G .t-bar .t-nav{min-width:0}
@media (max-width:760px){
  #G .t-game{margin-top:24px}
}
@media (max-width:600px){
  #G4 .t-quote{padding:22px 18px 18px}
  #G{padding:14px 10px 24px}
  #G .t-card{padding:14px;border-radius:20px}
  #G .t-emojis{gap:6px}
  #G .t-tile{border-radius:14px}
  #G .t-form{flex-direction:column}
  #G5 .t-tr{grid-template-columns:20px 1fr auto;row-gap:8px;padding:12px 14px}
  #G134 .t-tr{grid-template-columns:1fr auto;row-gap:8px;padding:12px 14px}
  #G .t-th{display:none}
  #G .t-hide-m{display:none}
  #G5 .t-tr>.t-n{grid-column:1;grid-row:1}
  #G5 .t-tr>.t-co{grid-column:2;grid-row:1}
  #G5 .t-tr{grid-template-columns:1fr 1fr !important}
  #G5 .t-tr>.t-co{grid-column:1 / 3;grid-row:1}
  #G5 .t-tr>.c0{grid-column:1;grid-row:2}
  #G5 .t-tr>.c1{grid-column:2;grid-row:2}
  #G5 .t-tr>.c2{grid-column:1;grid-row:3}
  #G5 .t-tr>.c3{grid-column:2;grid-row:3}
  #G134 .t-tr>.t-co{grid-column:1;grid-row:1}
  #G5 .t-tr>.c4{grid-column:1;grid-row:4}
  #G134 .t-tr>.t-cty{grid-column:1;grid-row:2}
  #G5 .t-tr>.c5{grid-column:2;grid-row:4}
  #G134 .t-tr>.t-yr{grid-column:2;grid-row:1 / 3;justify-self:end;align-self:center}
  #G5 .t-mlists{display:flex}
  #G .t-nums{grid-template-columns:repeat(2,1fr)}
}
@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}
@keyframes tFlip{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}
`;

/* ---------- Разметка ---------- */
var FND_MARKUP=(function(){
  var X='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var CHIPS='<span class="t-chip ok">совпадает</span><span class="t-chip near">близко</span><span class="t-chip miss">не совпадает</span>';
  var LEGEND_CO='<div class="t-legend">'+CHIPS+'<span class="t-chip miss">1998 ↑ — основана позже</span></div>';
  var NOTE_CO='<span class="t-c-ok">Зелёный</span> — совпадает с загаданной компанией, <span class="t-c-near">жёлтый</span> — близко (тот же регион или разница до 10 лет), <span class="t-c-miss">красный</span> — не совпадает. Стрелка у года подсказывает, основана загаданная компания позже (↑) или раньше (↓).';
  var R5='<li><b>5</b><span>Новая загадка появляется каждый день в полночь.</span></li>';
  function form(ph){
    return '<div data-t="play"><div class="t-form"><input class="t-input" data-t="input" type="text" placeholder="'+ph+'" autocomplete="off" aria-label="Ваш ответ"><button class="t-btn" type="button" data-t="submit">Ответить</button><ul class="t-list" data-t="list" role="listbox"></ul></div><div class="t-msg" data-t="msg"></div></div>';
  }
  function game(o){
    var xs=''; for(var i=1;i<=o.max;i++) xs+='<span>'+i+'</span>'; xs+='<span>✕</span>';
    return '<div id="'+o.id+'" class="fnd-game" data-game="'+o.game+'" lang="ru" style="display:none"><div class="t-wrap">'+
      '<div class="t-top"><a class="t-logo" href="/" aria-label="На главную">finan<span>edly</span></a><div class="t-icons">'+
        '<button class="t-icon" type="button" data-t="rulesBtn" aria-label="Как играть"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01" stroke-linecap="round"/></svg><span class="t-tip">Как играть</span></button>'+
        '<button class="t-icon" type="button" data-t="statsBtn" aria-label="Статистика"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg><span class="t-tip">Статистика</span></button>'+
      '</div></div>'+
      '<main class="t-game"><div class="t-bar"><nav class="t-nav" data-t="nav"></nav></div>'+
        '<section class="t-card">'+o.top+form(o.ph||'Название компании или тикер')+'<div class="t-status"><div class="t-steps" data-t="steps"></div><div class="t-stxt" data-t="stxt"></div></div></section>'+
        '<section class="t-answer" data-t="end" hidden></section>'+
        '<section class="t-card"><p class="t-note" data-t="note">'+(o.note||NOTE_CO)+'</p>'+(o.afterNote||'')+'<div class="t-table" data-t="table"></div></section>'+
      '</main>'+
      '<div class="t-foot"><div class="t-dwrap" data-t="donate" hidden><a class="t-donate" href="#" target="_blank" rel="noopener">Поддержать проект ☕</a></div>Названия компаний принадлежат их владельцам. Игра не связана с этими компаниями и не является индивидуальной инвестиционной рекомендацией.<div data-t="testSlot"></div></div>'+
    '</div>'+
    '<div class="t-modal" data-t="rulesModal"><div class="t-box"><button class="t-close" type="button" data-close aria-label="Закрыть">'+X+'</button>'+
      '<h3>Как играть в «'+o.rulesTitle+'»</h3><div class="t-sub">'+o.rulesSub+'</div>'+
      '<ul class="t-rules">'+o.rules.map(function(r,i){ return '<li><b>'+(i+1)+'</b><span>'+r+'</span></li>'; }).join('')+'</ul>'+
      (o.legend||LEGEND_CO)+'<ul class="t-rules">'+(o.r5||R5)+'</ul>'+
      '<div class="t-rbtns"><button class="t-btn" type="button" data-close>Понятно</button><button class="t-skip" type="button" data-t="rulesSkip">Пропустить все правила</button></div>'+
    '</div></div>'+
    '<div class="t-modal" data-t="statsModal"><div class="t-box"><button class="t-close" type="button" data-close aria-label="Закрыть">'+X+'</button>'+
      '<h3>Статистика</h3><div class="t-sub" data-t="statsSub">Режим «'+o.title+'»</div>'+
      '<div class="t-tabs"><button type="button" class="t-on" data-tab="me">Мои результаты</button><button type="button" data-tab="all">Все игроки</button></div>'+
      '<div data-pane="me"><div class="t-nums" data-t="nums"></div><div class="t-chart"><div>С какой попытки вы угадываете</div><div class="t-bars" data-t="bars"></div><div class="t-xs">'+xs+'</div></div></div>'+
      '<div data-pane="all" hidden><div class="t-soon"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div></div>'+
    '</div></div>'+
    '<div class="t-toast" data-t="toast"></div></div>';
  }
  return [
    game({id:'fg1',game:'companies',title:'Компании',max:5,rulesTitle:'Компании',
      top:'<div class="t-emojis" data-t="emojis"></div>',
      rulesSub:'Угадайте публичную компанию, зашифрованную пятью эмодзи.',
      rules:['Каждый день загадана одна компания — одна для всех игроков.',
        'Сначала виден только 1 эмодзи из 5. Начните вводить название или тикер, выберите вариант и нажмите «Ответить».',
        'У вас 5 попыток. Каждая ошибка открывает ещё один эмодзи — от загадочных к очевидным. Последняя попытка — со всеми пятью.',
        'Под каждой ошибкой видно, насколько вы близки: страна, сектор и год основания.']}),
    game({id:'fg3',game:'keywords',title:'Ключевые слова',max:5,rulesTitle:'Ключевые слова',
      top:'<ol class="t-words" data-t="words"></ol>',
      rulesSub:'Угадайте публичную компанию по ключевым словам о ней.',
      rules:['Каждый день загадана одна компания — одна для всех игроков.',
        'Сначала видно только одно слово или фраза из пяти. Начните вводить название или тикер, выберите вариант и нажмите «Ответить».',
        'У вас 5 попыток. Каждая ошибка открывает следующее слово — от неочевидных к очевидным. Последняя попытка — со всеми пятью.',
        'Под каждой ошибкой видно, насколько вы близки: страна, сектор и год основания.'],
      r5:'<li><b>5</b><span>Новая загадка — каждый день в полночь.</span></li>'}),
    game({id:'fg4',game:'quote',title:'Цитата',max:5,rulesTitle:'Цитату',ph:'Имя автора',
      top:'<blockquote class="t-quote" data-t="quote"></blockquote><div class="t-hints" data-t="hints"></div>',
      rulesSub:'Чья это фраза? Угадайте автора — основателя или руководителя компании.',
      rules:['Каждый день загадана одна цитата — одна для всех игроков.',
        'Цитата видна целиком сразу. Начните вводить имя автора, выберите человека из списка и нажмите «Ответить». Рядом с именем в скобках указана его компания.',
        'У вас 5 попыток. Каждая ошибка открывает подсказку под цитатой: сначала год, когда прозвучала цитата, затем два эмодзи о компании. С предпоследней попытки можно назвать не только автора, но и его компанию — это тоже засчитается как верный ответ. Перед последней попыткой откроются инициалы автора.',
        'Под каждой ошибкой видно, насколько вы близки: та же ли компания, страна и сектор.'],
      legend:'<div class="t-legend">'+CHIPS+'</div>',
      r5:'<li><b>5</b><span>Оригинал цитаты появится после раунда. Новая загадка — каждый день в полночь.</span></li>',
      note:'<span class="t-c-ok">Зелёный</span> — совпадает с компанией автора, <span class="t-c-near">жёлтый</span> — близко (тот же регион), <span class="t-c-miss">красный</span> — не совпадает. С 4-й попытки можно назвать и компанию.'}),
    game({id:'fg5',game:'classic',title:'Классика',max:7,rulesTitle:'Классику',
      top:'<div class="t-intro">Загадана публичная компания. Называйте любые компании — таблица покажет, что совпало.</div>',
      rulesSub:'Угадайте публичную компанию, сравнивая её с другими.',
      rules:['Каждый день загадана одна компания — одна для всех игроков.',
        'Подсказок нет. Назовите любую компанию — введите название или тикер, выберите вариант и нажмите «Ответить».',
        'Таблица покажет, что у неё общего с загаданной: страна, сектор, биржа, год основания, капитализация и число сотрудников. У вас 7 попыток.',
        'Жёлтый: тот же регион, смежный сектор (например, «Технологии» и «Полупроводники»), биржа той же страны, разница в годе основания до 10 лет, капитализация или число сотрудников отличаются не больше чем вдвое. Стрелки показывают, у загаданной компании значение больше (↑) или меньше (↓).'],
      note:'<span class="t-c-ok">Зелёный</span> — совпадает с загаданной компанией, <span class="t-c-near">жёлтый</span> — близко (тот же регион, смежный сектор, биржа той же страны, разница до 10 лет, капитализация или число сотрудников отличаются не больше чем вдвое), <span class="t-c-miss">красный</span> — не совпадает. Стрелки: у загаданной компании значение больше (↑) или меньше (↓). Капитализация — на <span data-t="capdate"></span>, сотрудники — по последним годовым отчётам; у части компаний этих данных пока нет.<span class="t-hide-m"> Наведите на «Сектор» или «Биржа», чтобы увидеть все варианты.</span>',
      afterNote:'<div class="t-mlists"><details><summary>Все секторы</summary><div class="t-ml" data-t="mlSector"></div></details><details><summary>Все биржи</summary><div class="t-ml" data-t="mlExchange"></div></details></div>'})
  ].join('');
})();

/* ---------- Загрузчик: шрифт, стили, разметка ---------- */
(function(){
  /* #G .x → #fg1 .x,#fg3 .x,#fg4 .x,#fg5 .x;  #G15 .x → #fg1 .x,#fg5 .x */
  function expand(css){
    return css.replace(/(^|[{}])([^{}@]+)\{/g,function(m,pre,sel){
      return pre+sel.split(',').map(function(s){
        s=s.trim(); var g=s.match(/^#G(\d*)/); if(!g) return s;
        return (g[1]||'1345').split('').map(function(d){ return '#fg'+d+s.slice(g[0].length); }).join(',');
      }).join(',')+'{';
    });
  }
  var cs=document.currentScript, mount=document.getElementById('finanedly-app');
  if(!mount){ mount=document.createElement('div'); mount.id='finanedly-app'; if(cs&&cs.parentNode) cs.parentNode.insertBefore(mount,cs); else document.body.appendChild(mount); }
  if(mount.getAttribute('data-ok')) return; mount.setAttribute('data-ok','1');
  if(!document.querySelector('link[href*="family=Inter"]')){
    [['preconnect','https://fonts.googleapis.com'],['preconnect','https://fonts.gstatic.com'],['stylesheet','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap']].forEach(function(l){
      var e=document.createElement('link'); e.rel=l[0]; e.href=l[1]; if(l[1].indexOf('gstatic')>0) e.crossOrigin=''; document.head.appendChild(e); });
  }
  var st=document.createElement('style'); st.textContent=expand(FND_CSS); document.head.appendChild(st);
  mount.innerHTML=FND_MARKUP;
})();

/* ---------- FND — общий код всех игр ---------- */
var FND=(function(){
  var F={}, DAY=86400000;
  F.DAY=DAY;
  F.TEST=/test/.test(location.hash);
  F.GAMES=[['companies','Компании'],['keywords','Ключевые слова'],['quote','Цитата'],['classic','Классика']];
  F.LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';
  F.esc=function(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); };
  F.norm=function(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); };

  /* Дни */
  function dkey(d){ return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  F.todayKey=function(){ return dkey(new Date()); };
  F.yesterdayKey=function(){ var y=new Date(); y.setDate(y.getDate()-1); return dkey(y); };
  F.dayNumber=function(){ var d=new Date(); d.setHours(0,0,0,0); return Math.round((d-FND_START)/DAY)+1; };
  F.dateOf=function(dayNo){ var d=new Date(FND_START); d.setDate(d.getDate()+dayNo-1); return d; };
  /* Перемешивание с seed — порядок одинаковый у всех игроков */
  F.shuffle=function(n,seed){ var a=[],i; for(i=0;i<n;i++) a.push(i); var s=seed; for(i=n-1;i>0;i--){ s=(s*1103515245+12345)%2147483648; var j=s%(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; };

  /* ==================== Общая база компаний ====================
     Основа — база с GitHub (game.json, ID из Wikidata). Встроенные списки игр — запасные:
     дополняют базу компаниями, которых в ней нет, и работают, если GitHub недоступен.
     Одна компания = один объект, даже если в разных списках у неё разные ID или чуть разные названия. */
  F.DATA_URL='https://lapoyura.github.io/finanedly-data/data/game.json';
  var COMP={}, LIST=[], BYNAME={};
  F.LIST=LIST;
  F.get=function(id){ return COMP[id]; };
  function addAliases(o,list){ (list||[]).forEach(function(a){ if(a&&a!==o.name&&o.aliases.indexOf(a)<0) o.aliases.push(a); }); }
  /* Встроенные данные. ids — все ID, под которыми игры ссылаются на компанию (Wikidata, короткое имя) */
  F.addLocal=function(ids,o){
    var ex=null; ids.forEach(function(id){ ex=ex||COMP[id]; }); ex=ex||BYNAME[F.norm(o.name)];
    if(ex){ addAliases(ex,[o.name].concat(o.aliases||[])); ['country','region','sector','founded','exchange'].forEach(function(f){ if(ex[f]==null&&o[f]!=null) ex[f]=o[f]; }); }
    else{ ex={id:ids[0],name:o.name,aliases:(o.aliases||[]).slice(),country:o.country,region:o.region,sector:o.sector,founded:o.founded,exchange:o.exchange}; LIST.push(ex); BYNAME[F.norm(o.name)]=ex; }
    ids.forEach(function(id){ COMP[id]=ex; });
    return ex;
  };
  /* Компания из базы GitHub: её данные главнее встроенных */
  function addBase(o){
    var ex=COMP[o.id], byName=BYNAME[F.norm(o.name)];
    if(!ex&&byName&&!byName.base) ex=byName;
    if(ex){
      var old=ex.name;
      ['name','country','region','sector','founded','exchange'].forEach(function(f){ if(o[f]!=null&&o[f]!=='') ex[f]=o[f]; });
      addAliases(ex,[old].concat(o.aliases)); ex.base=true; COMP[o.id]=ex;
    } else { o.base=true; LIST.push(o); COMP[o.id]=o; ex=o; }
    if(!BYNAME[F.norm(ex.name)]) BYNAME[F.norm(ex.name)]=ex;
  }
  var REGION={'США':'Северная Америка','Канада':'Северная Америка','Германия':'Европа','Швеция':'Европа','Швейцария':'Европа','Великобритания':'Европа','Франция':'Европа','Чехия':'Европа','Россия':'Европа','Япония':'Азия','Китай':'Азия','Республика Корея':'Азия'};
  function finish(){
    LIST.forEach(function(c){ if(c.base&&c.country&&c.region) REGION[c.country]=c.region; });
    LIST.forEach(function(c){ if(!c.region) c.region=REGION[c.country]; });
  }
  function fromDB(j){
    var ix={}; j.fields.forEach(function(f,i){ ix[f]=i; });
    j.companies.forEach(function(r){ if(!r[ix.name]||!r[ix.country]||!r[ix.sector]||!r[ix.founded]) return;
      addBase({id:r[ix.id],name:r[ix.name],aliases:r[ix.aliases]||[],country:r[ix.country],region:r[ix.region],sector:r[ix.sector],founded:r[ix.founded],exchange:r[ix.exchange]}); });
  }
  /* Встроенный список на 42 компании: [ID Wikidata, короткое имя, название, другие названия, страна, сектор, год основания, биржа].
     Нужен для «Ключевых слов», «Цитаты» и «Классики» (капитализация и сотрудники — только у них). */
  [
    ["Q478214", "tesla", "Tesla", ["TSLA", "тесла"], "США", "Автомобили", 2003, "NASDAQ"],
    ["Q53268", "toyota", "Toyota", ["TM", "7203", "тойота"], "Япония", "Автомобили", 1937, "Токио"],
    ["Q156578", "vw", "Volkswagen", ["VOW3", "фольксваген", "vw"], "Германия", "Автомобили", 1937, "Франкфурт"],
    ["Q26678", "bmw", "BMW", ["BMW", "бмв"], "Германия", "Автомобили", 1916, "Франкфурт"],
    ["Q27530", "mercedes", "Mercedes-Benz Group", ["MBG", "мерседес", "daimler"], "Германия", "Автомобили", 1926, "Франкфурт"],
    ["Q9584", "honda", "Honda", ["HMC", "7267", "хонда"], "Япония", "Автомобили", 1948, "Токио"],
    ["Q55931", "hyundai", "Hyundai Motor", ["005380", "хендай", "хёндэ"], "Республика Корея", "Автомобили", 1967, "Сеул"],
    ["Q44294", "ford", "Ford", ["F", "форд"], "США", "Автомобили", 1903, "NYSE"],
    ["Q81965", "gm", "General Motors", ["GM", "дженерал моторс"], "США", "Автомобили", 1908, "NYSE"],
    ["Q312", "apple", "Apple", ["AAPL", "эппл", "эпл"], "США", "Технологии", 1976, "NASDAQ"],
    ["Q2283", "microsoft", "Microsoft", ["MSFT", "майкрософт"], "США", "Технологии", 1975, "NASDAQ"],
    ["Q20800404", "alphabet", "Alphabet (Google)", ["GOOGL", "GOOG", "google", "гугл"], "США", "Технологии", 1998, "NASDAQ"],
    ["Q380", "meta", "Meta", ["META", "facebook", "фейсбук", "мета"], "США", "Технологии", 2004, "NASDAQ"],
    ["Q860580", "tencent", "Tencent", ["0700", "TCEHY", "тенсент"], "Китай", "Технологии", 1998, "Гонконг"],
    ["Q780442", "uber", "Uber", ["UBER", "убер"], "США", "Технологии", 2009, "NYSE"],
    ["Q63327", "airbnb", "Airbnb", ["ABNB", "эйрбиэнби"], "США", "Технологии", 2008, "NASDAQ"],
    ["Q7501150", "shopify", "Shopify", ["SHOP", "шопифай"], "Канада", "Технологии", 2006, "NYSE"],
    ["Q20718", "samsung", "Samsung Electronics", ["005930", "самсунг"], "Республика Корея", "Электроника", 1969, "Сеул"],
    ["Q41187", "sony", "Sony", ["SONY", "6758", "сони"], "Япония", "Электроника", 1946, "Токио"],
    ["Q182477", "nvidia", "Nvidia", ["NVDA", "нвидиа", "нвидия"], "США", "Полупроводники", 1993, "NASDAQ"],
    ["Q248", "intel", "Intel", ["INTC", "интел"], "США", "Полупроводники", 1968, "NASDAQ"],
    ["Q128896", "amd", "AMD", ["AMD", "амд"], "США", "Полупроводники", 1969, "NASDAQ"],
    ["Q3884", "amazon", "Amazon", ["AMZN", "амазон"], "США", "Электронная торговля", 1994, "NASDAQ"],
    ["Q1359568", "alibaba", "Alibaba", ["BABA", "алибаба"], "Китай", "Электронная торговля", 1999, "NYSE"],
    ["Q907311", "netflix", "Netflix", ["NFLX", "нетфликс"], "США", "Медиа и развлечения", 1997, "NASDAQ"],
    ["Q689141", "spotify", "Spotify", ["SPOT", "спотифай"], "Швеция", "Медиа и развлечения", 2006, "NYSE"],
    ["Q7414", "disney", "Walt Disney", ["DIS", "дисней"], "США", "Медиа и развлечения", 1923, "NYSE"],
    ["Q8093", "nintendo", "Nintendo", ["NTDOY", "7974", "нинтендо"], "Япония", "Медиа и развлечения", 1889, "Токио"],
    ["Q3295867", "coca", "Coca-Cola", ["KO", "кока-кола", "кока кола"], "США", "Напитки и продукты", 1892, "NYSE"],
    ["Q334800", "pepsico", "PepsiCo", ["PEP", "пепси"], "США", "Напитки и продукты", 1965, "NASDAQ"],
    ["Q160746", "nestle", "Nestlé", ["NESN", "nestle", "нестле"], "Швейцария", "Напитки и продукты", 1866, "Цюрих (SIX)"],
    ["Q157062", "unilever", "Unilever", ["ULVR", "UL", "юнилевер"], "Великобритания", "Потребительские товары", 1929, "Лондон"],
    ["Q37158", "starbucks", "Starbucks", ["SBUX", "старбакс"], "США", "Рестораны", 1971, "NASDAQ"],
    ["Q483915", "nike", "Nike", ["NKE", "найк"], "США", "Одежда и роскошь", 1964, "NYSE"],
    ["Q3895", "adidas", "Adidas", ["ADS", "адидас"], "Германия", "Одежда и роскошь", 1949, "Франкфурт"],
    ["Q157064", "puma", "Puma", ["PUM", "пума"], "Германия", "Одежда и роскошь", 1948, "Франкфурт"],
    ["Q328840", "visa", "Visa", ["V", "виза"], "США", "Финансы", 1958, "NYSE"],
    ["Q489921", "mastercard", "Mastercard", ["MA", "мастеркард"], "США", "Финансы", 1966, "NYSE"],
    ["Q483959", "paypal", "PayPal", ["PYPL", "пейпал"], "США", "Финансы", 1998, "NASDAQ"],
    ["Q206921", "pfizer", "Pfizer", ["PFE", "пфайзер"], "США", "Фармацевтика и здоровье", 1849, "NYSE"],
    ["Q333718", "jnj", "Johnson & Johnson", ["JNJ", "джонсон"], "США", "Фармацевтика и здоровье", 1886, "NYSE"],
    ["Q30715381", "moderna", "Moderna", ["MRNA", "модерна"], "США", "Фармацевтика и здоровье", 2010, "NASDAQ"]
  ].forEach(function(r){ F.addLocal([r[0],r[1]],{name:r[2],aliases:r[3],country:r[4],sector:r[5],founded:r[6],exchange:r[7]}); });

  /* ==================== Расписание загадок ====================
     Каждый день у каждой игры своя компания. Правила по важности:
     1) в один день компании во всех играх разные;
     2) за 7 дней компания не повторяется ни в одной игре;
     3) внутри одной игры компания не повторяется 2 года (730 дней);
     4) из оставшихся — та, что дольше всех не загадывалась в этой игре.
     Если загадок мало и правила выполнить нельзя, правило с бо́льшим номером нарушается первым.
     Расписание считается заново от дня 1, поэтому при добавлении загадок оно меняется.
     Перед запуском его нужно «заморозить» в файл на GitHub (задача в документе 01). */
  F.games=[];
  F.register=function(g){ F.games.push(g); };
  F.WEEK=7; F.NOREPEAT=730;
  F.schedule=function(upTo){
    var G=F.games.slice().sort(function(a,b){ return a.pool.length-b.pool.length || F.GAMES.map(function(x){return x[0];}).indexOf(a.key)-F.GAMES.map(function(x){return x[0];}).indexOf(b.key); });
    var lastG={}, lastP={}, lastAny={}, days=[];
    G.forEach(function(g){ lastG[g.key]={}; lastP[g.key]={}; g.order=F.shuffle(g.pool.length,g.seed); });
    for(var d=1; d<=Math.max(1,upTo); d++){
      var today={}, pick={};
      G.forEach(function(g){
        var best=-1, bs=null;
        g.order.forEach(function(pi,rank){
          var c=g.company(g.pool[pi]), lg=lastG[g.key][c], la=lastAny[c], lp=lastP[g.key][pi];
          var s=[today[c]?1:0, (la!=null&&d-la<F.WEEK)?1:0, (lg!=null&&d-lg<F.NOREPEAT)?1:0, lg==null?-1e9:lg, lp==null?-1e9:lp, rank];
          if(!bs||less(s,bs)){ bs=s; best=pi; }
        });
        if(best<0) return;
        var c=g.company(g.pool[best]); today[c]=1; lastG[g.key][c]=d; lastAny[c]=d; lastP[g.key][best]=d; pick[g.key]=best;
      });
      days[d]=pick;
    }
    return days;
  };
  function less(a,b){ for(var i=0;i<a.length;i++){ if(a[i]!==b[i]) return a[i]<b[i]; } return false; }

  /* Запуск: ждём базу с GitHub (до 7 секунд), затем считаем расписание и запускаем игры */
  F.start=function(){
    var done=false;
    function go(j){
      if(done) return; done=true;
      if(j){ try{ fromDB(j); }catch(e){} }
      finish();
      var day=F.dayNumber(), pick=F.schedule(day)[Math.max(1,day)];
      F.games.forEach(function(g){ try{ g.boot(pick[g.key]); }catch(e){ if(window.console) console.error(e); } });
    }
    try{ fetch(F.DATA_URL,{cache:'no-cache'}).then(function(r){ return r.json(); }).then(go,function(){ go(null); }); }catch(e){ go(null); }
    setTimeout(function(){ go(null); },7000);
  };

  /* Хранение в браузере. suffix — для ключей state/stats */
  F.store=function(prefix,suffix){
    return function(k,v){ if(suffix&&(k==='state'||k==='stats')) k+='_'+suffix;
      try{ if(v===undefined){ var x=localStorage.getItem(prefix+k); return x?JSON.parse(x):null; } localStorage.setItem(prefix+k,JSON.stringify(v)); }catch(e){ return null; } };
  };

  /* Статистика: dist — по одной клетке на каждую попытку + «не угадано» */
  function zeros(n){ var a=[]; for(var i=0;i<n;i++) a.push(0); return a; }
  F.statsRender=function($,store,state,max,test){
    var n=max+1, st=store('stats')||{played:0,won:0,streak:0,best:0};
    var dist=(st.dist&&st.dist.length===n)?st.dist:zeros(n), mx=Math.max.apply(null,dist.concat([1]));
    var today=state&&state.done&&!test?(state.won?state.guesses.length-1:max):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML=!st.played?'<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>':
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  };
  F.statsUpdate=function(store,state,max){
    var n=max+1, st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    if(!st.dist||st.dist.length!==n) st.dist=zeros(n);
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===F.yesterdayKey())?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=F.todayKey(); }
    else{ st.dist[max]++; st.streak=0; st.last=null; }
    store('stats',st);
  };

  /* Строка статус-бара попыток */
  F.steps=function($,state,max){
    var used=state.guesses.length, sh='';
    for(var k=0;k<max;k++){ var cls=k<used?(state.won&&k===used-1?'t-win':'t-used'):(!state.done&&k===used?'t-cur':''); sh+='<i class="'+cls+'"></i>'; }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML=state.done?(state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились'):'Попытка <b>'+(used+1)+'</b> из '+max;
  };

  /* ---------- Поиск как в словаре ----------
     Сначала названия, начинающиеся с введённого текста (по алфавиту), затем — где с него начинается
     второе и следующие слова. Совпадения из середины слова не показываем.
     С одной латинской буквы — только по названию, со второй — по тикерам и другим названиям. */
  function words(s){ return String(s).toLowerCase().replace(/ё/g,'е').split(/[^a-zа-я0-9]+/).filter(Boolean); }
  function wscore(s,nq){
    var w=words(s); if(!w.length) return -1;
    if(w.join('').indexOf(nq)===0) return 0;
    for(var i=1;i<w.length;i++){ if(w.slice(i).join('').indexOf(nq)===0) return 1; }
    return -1;
  }
  function rankItem(name,alts,nq){
    var s=wscore(name,nq); if(s===0) return 0;
    var a=-1; for(var i=0;i<alts.length;i++){ var x=wscore(alts[i],nq); if(x===0){ a=0; break; } if(x===1) a=1; }
    if(a===0) return 1; if(s===1) return 2; if(a===1) return 3; return -1;
  }
  F.altOK=function(nq){ return nq.length>=2||/[а-я]/.test(nq); };
  /* o: items, q, nameOf, altsOf, skip, limit */
  F.rank=function(o){
    var nq=F.norm(o.q); if(!nq) return [];
    var out=[];
    o.items.forEach(function(it){ if(o.skip(it)) return; var r=rankItem(o.nameOf(it),F.altOK(nq)?o.altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || o.nameOf(a[1]).localeCompare(o.nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,o.limit||8).map(function(x){ return x[1]; });
  };
  /* Подсветка совпадения жирным */
  F.hl=function(s,nq){
    var str=String(s), n='', map=[], i, k, esc=F.esc;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  };
  /* Поле ввода с подсказками. Выбор из списка только подставляет, ответ — кнопкой или Enter.
     o: root, $, search(q) → варианты, label(item) → [текст в списке, другие названия, подпись справа], submit,
     fieldText(item) — что подставить в поле при выборе (по умолчанию название) */
  F.autocomplete=function(o){
    var $=o.$, input=$('input'), list=$('list'), active=-1, matches=[];
    function sug(item){
      var l=o.label(item), nq=F.norm(input.value), h=F.hl(l[0],nq), sub=F.esc(l[2]);
      if(h.indexOf('<b>')<0&&F.altOK(nq)){ for(var i=0;i<l[1].length;i++){ var ah=F.hl(l[1][i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
      return '<span>'+h+'</span><small>'+sub+'</small>';
    }
    function isOpen(){ return list.style.display==='block'; }
    function show(){
      matches=o.search(input.value); active=-1;
      if(!matches.length||(matches.length===1&&F.norm(val(matches[0]))===F.norm(input.value))){ hide(); return; }
      list.innerHTML=matches.map(function(it,i){ return '<li data-i="'+i+'">'+sug(it)+'</li>'; }).join('');
      list.style.display='block';
    }
    function hide(){ list.style.display='none'; active=-1; }
    function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
    function val(it){ return o.fieldText?o.fieldText(it):it.name; }
    function choose(i){ var it=matches[i]; if(!it) return; input.value=val(it); hide(); input.focus(); }
    input.addEventListener('input',function(){ $('msg').textContent=''; show(); });
    input.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'&&isOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
      else if(e.key==='ArrowUp'&&isOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
      else if(e.key==='Enter'){ e.preventDefault(); if(isOpen()&&active>=0) choose(active); else o.submit(); }
      else if(e.key==='Escape'){ hide(); }
    });
    list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
    document.addEventListener('click',function(e){ if(!o.root.contains(e.target)) hide(); });
    $('submit').addEventListener('click',function(){ o.submit(); });
    /* Пока грузится база — поле выключено */
    var PH=input.placeholder; input.disabled=true; input.placeholder='Загружаем базу компаний…';
    return {input:input,hide:hide,enable:function(){ input.disabled=false; input.placeholder=PH; }};
  };

  /* ---------- «Поделиться»: один текст за день по всем сыгранным играм ----------
     У каждой игры строка по квадрату на каждую возможную попытку:
     🟥 — попытки до угадывания, 🟩 — угаданная и все клетки правее. Не угадано — всё красное. */
  window.FND_SHARE=window.FND_SHARE||{};
  F.row=function(state,answerId,max){
    if(!state||!state.done) return null;
    var s='';
    for(var k=0;k<max;k++){ if(k<state.guesses.length) s+=state.guesses[k]===answerId?'🟩':'🟥'; else s+=state.won?'🟩':'🟥'; }
    return s;
  };
  F.shareText=function(){
    var G=window.FND_SHARE, d=new Date();
    var out=['finanedly · '+('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+d.getFullYear()];
    F.GAMES.forEach(function(g){ var k=g[0]; if(!G[k]) return; var r=null; try{ r=G[k].row(); }catch(e){} if(r) out.push(G[k].name+'\n'+r); });
    out.push('finanedly.com'); return out.join('\n');
  };

  /* ---------- Конфетти при победе ---------- */
  F.confetti=function(root){
    try{ if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return; }catch(e){}
    var g=root.querySelector('.t-game'); if(!g) return;
    var r=g.getBoundingClientRect(), cv=document.createElement('canvas'), dpr=window.devicePixelRatio||1, W=window.innerWidth, H=window.innerHeight;
    cv.width=W*dpr; cv.height=H*dpr; cv.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(cv); var ctx=cv.getContext('2d'); ctx.scale(dpr,dpr);
    var COLS=['#f0532b','#ff8a5c','#4ade80','#16a34a','#facc15','#f2f2f2'], P=[], N=W<600?18:28;
    var y0=Math.min(H*.45,Math.max(80,r.top+120));
    [[Math.max(8,r.left),1],[Math.min(W-8,r.right),-1]].forEach(function(s){
      for(var i=0;i<N;i++){ var a=(-60-Math.random()*50)*Math.PI/180, v=5+Math.random()*6;
        P.push({x:s[0],y:y0+Math.random()*40-20,vx:Math.cos(a)*v*s[1]*(.6+Math.random()*.6),vy:Math.sin(a)*v,rot:Math.random()*6,vr:(Math.random()-.5)*.4,w:5+Math.random()*5,h:3+Math.random()*4,c:COLS[i%COLS.length],sh:i%3}); }
    });
    var t0=null, D=1100;
    function fr(ts){
      if(!t0) t0=ts; var k=(ts-t0)/D; ctx.clearRect(0,0,W,H);
      if(k>=1){ cv.parentNode&&cv.parentNode.removeChild(cv); return; }
      ctx.globalAlpha=k<.6?1:1-(k-.6)/.4;
      P.forEach(function(p){ p.vy+=.25; p.vx*=.985; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.c;
        if(p.sh===0){ ctx.beginPath(); ctx.arc(0,0,p.h/1.6,0,6.283); ctx.fill(); } else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.sh===1?p.h:p.h/2);
        ctx.restore(); });
      requestAnimationFrame(fr);
    }
    requestAnimationFrame(fr);
  };

  /* ---------- Общая обвязка игры: окна, правила, статистика, меню, «Поделиться», таймер ----------
     o: key — метка игры, name — название для «Поделиться», max, store, render, stats, row, hide, onStats */
  F.game=function(root,o){
    function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
    function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
    function share(){
      var text=F.shareText();
      function done(){ toast('Результат скопирован'); }
      function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
      if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
    }
    function tick(){
      var el=$('countdown'); if(!el) return;
      var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
      var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
      el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
    }
    setInterval(tick,1000);
    window.FND_SHARE[o.key]={name:o.name,row:o.row};
    /* Окна */
    function openM(k){ $(k).className='t-modal t-show'; }
    Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
      m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
    $('rulesBtn').onclick=function(){ openM('rulesModal'); };
    function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!o.store('seenRules')){ openM('rulesModal'); o.store('seenRules',1); } }catch(e){} }
    root.addEventListener('fnd-show',function(){ autoRules(); try{ o.render(); }catch(e){} });
    $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
    $('statsBtn').onclick=function(){ if(o.onStats) o.onStats(); o.stats(); openM('statsModal'); };
    Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
      b.onclick=function(){
        Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
        Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
      };
    });
    /* Меню игр */
    $('nav').innerHTML=F.GAMES.map(function(g){ return '<a href="#'+g[0]+'"'+(g[0]===o.key?' class="t-on"':'')+'>'+g[1]+'</a>'; }).join('');
    (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
    /* Донаты */
    if(FND_DONATE){ $('donate').hidden=false; $('donate').firstChild.href=FND_DONATE; }
    /* Тестовый режим: кнопка «Другая загадка» внизу игры */
    function testButton(fn){ if(!F.TEST) return; $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>'; $('random').onclick=fn; }
    /* Финальная карточка: шапка + текст + «Поделиться» и таймер */
    function end(state,test,headHTML,extraHTML){
      var el=$('end');
      if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
      el.className='t-answer'+(state.won?' t-won':'');
      el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small>'+headHTML+'</div>'+(extraHTML||'')+
        '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(test?'':'<span data-t="countdown"></span>')+'</div>';
      el.hidden=false;
      $('share').onclick=share; tick();
    }
    /* После ответа: сохранить, перерисовать, конфетти, прокрутка */
    function after(state,test,input){
      if(state.done&&!test) F.statsUpdate(o.store,state,o.max);
      if(!test) o.store('state',state);
      input.value=''; o.hide(); o.render();
      if(state.done&&state.won) F.confetti(root);
      if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
    }
    /* Новое состояние дня или сохранённое, если оно про ту же загадку */
    function daily(answerId){
      var saved=o.store('state');
      return (saved&&saved.day===F.todayKey()&&saved.answer===answerId)?saved:{day:F.todayKey(),answer:answerId,guesses:[],done:false,won:false};
    }
    return {$:$,toast:toast,end:end,after:after,testButton:testButton,daily:daily};
  };
  return F;
})();

/* ==================== 1. Компании (#fg1) ==================== */
(function(){
  var root=document.getElementById('fg1');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var esc=FND.esc, norm=FND.norm, MAX=5;

  /* Загадки: [id в Wikidata, уровень (не используется), 5 эмодзи с пояснениями, запасные данные о компании на случай, если GitHub недоступен]
     Позже переедут в data/emoji.json на GitHub. */
  var P = [["Q478214", "e", [["🔋", "Аккумуляторы и домашние накопители энергии"], ["🤖", "Человекоподобный робот Optimus"], ["☀️", "Солнечные панели — после покупки SolarCity в 2016 году"], ["🔌", "Собственная сеть зарядных станций Supercharger"], ["🚗", "Электромобили"]], ["Tesla", ["TSLA", "Тесла"], "США", "Северная Америка", "Автомобили", 2003]], ["Q312", "e", [["🏠", "По легенде, всё начиналось в гараже"], ["⌚", "Умные часы"], ["🎧", "Беспроводные наушники"], ["💻", "Ноутбуки и компьютеры Mac"], ["📱", "iPhone"]], ["Apple", ["AAPL", "Эппл"], "США", "Северная Америка", "Технологии", 1976]], ["Q3295867", "e", [["🧪", "Рецепт напитка придумал фармацевт"], ["🎅", "Рекламный образ Санта-Клауса в 1930-х"], ["🔴", "Красный фирменный цвет"], ["🧊", "Подают со льдом"], ["🥤", "Самый известный безалкогольный напиток"]], ["Coca-Cola", ["KO", "Кока-Кола"], "США", "Северная Америка", "Напитки и продукты", 1892]], ["Q483915", "e", [["🧇", "Первую рифлёную подошву отлили в вафельнице"], ["🏛️", "Названа в честь греческой богини победы"], ["🏀", "Баскетбольные кроссовки, ставшие культовыми"], ["🏃", "Экипировка для бега"], ["👟", "Кроссовки"]], ["Nike", ["NKE", "Найк"], "США", "Северная Америка", "Одежда и роскошь", 1964]], ["Q3884", "e", [["🏞️", "Названа в честь самой полноводной реки мира"], ["📚", "Начиналась как интернет-магазин книг"], ["☁️", "Один из крупнейших облачных сервисов"], ["🚚", "Собственная служба доставки"], ["📦", "Посылки по всему миру"]], ["Amazon", ["AMZN", "Амазон"], "США", "Северная Америка", "Электронная торговля", 1994]], ["Q907311", "e", [["📮", "Начинала с проката DVD по почте"], ["🦑", "Корейский сериал-хит 2021 года"], ["💿", "DVD-диски"], ["🍿", "Вечер с фильмом"], ["📺", "Стриминг сериалов и фильмов"]], ["Netflix", ["NFLX", "Нетфликс"], "США", "Северная Америка", "Медиа и развлечения", 1997]], ["Q20718", "e", [["⭐", "Название переводится как «три звезды»"], ["🧊", "Холодильники и бытовая техника"], ["💾", "Один из крупнейших производителей чипов памяти"], ["📺", "Телевизоры"], ["📱", "Смартфоны"]], ["Samsung Electronics", ["Samsung", "Самсунг"], "Республика Корея", "Азия", "Электроника", 1969]], ["Q53268", "e", [["🧵", "Семейный бизнес начинался с ткацких станков"], ["🏭", "Знаменитая система бережливого производства"], ["🌿", "Первый массовый гибридный автомобиль"], ["🚕", "Частый выбор для такси"], ["🚗", "Один из крупнейших автопроизводителей мира"]], ["Toyota", ["TM", "Тойота"], "Япония", "Азия", "Автомобили", 1937]], ["Q182477", "e", [["⛏️", "Видеокарты были нарасхват у майнеров криптовалют"], ["🧠", "Чипы для обучения нейросетей"], ["🤖", "Платформы для роботов и беспилотников"], ["🎮", "Игровые видеокарты"], ["🖥️", "Графические процессоры"]], ["Nvidia", ["NVDA", "Нвидиа"], "США", "Северная Америка", "Полупроводники", 1993]], ["Q328840", "e", [["🌍", "Работает почти во всех странах"], ["✈️", "Платежи в путешествиях"], ["🔐", "Безопасность платежей"], ["🛒", "Оплата покупок"], ["💳", "Платёжные карты"]], ["Visa", ["V", "Виза"], "США", "Северная Америка", "Финансы", 1958]], ["Q156578", "e", [["💨", "Скандал с выбросами дизельных двигателей в 2015 году"], ["🏭", "Один из крупнейших автоконцернов мира"], ["🚐", "Легендарный микроавтобус"], ["🐞", "Модель, прозванная «Жуком»"], ["🚗", "Название значит «народный автомобиль»"]], ["Volkswagen", ["VOW", "Фольксваген"], "Германия", "Европа", "Автомобили", 1937]], ["Q2283", "e", [["📎", "Скрепка-помощник в офисных программах"], ["🎮", "Игровая консоль"], ["☁️", "Облачная платформа"], ["💼", "Офисный пакет программ"], ["🖥️", "Операционная система на большинстве компьютеров"]], ["Microsoft", ["MSFT", "Майкрософт"], "США", "Северная Америка", "Технологии", 1975]], ["Q689141", "e", [["📊", "Ежегодный персональный итог прослушиваний"], ["🎙️", "Подкасты"], ["📻", "Плейлисты вместо радио"], ["🎧", "Музыка в наушниках"], ["🎵", "Стриминг музыки"]], ["Spotify", ["SPOT", "Спотифай"], "Швеция", "Европа", "Медиа и развлечения", 2006]], ["Q160746", "e", [["🍼", "Компания выросла из производства детского питания"], ["🐾", "Корма для домашних животных"], ["💧", "Бутилированная вода"], ["🍫", "Шоколад и сладости"], ["☕", "Растворимый кофе"]], ["Nestlé", ["NESN", "Нестле"], "Швейцария", "Европа", "Напитки и продукты", 1866]], ["Q41187", "e", [["📼", "Видеоформат, проигравший «войну форматов» VHS"], ["📻", "Один из первых транзисторных радиоприёмников"], ["📷", "Фотокамеры и матрицы для смартфонов"], ["🎧", "Портативный кассетный плеер, изменивший музыку"], ["🎮", "Игровая приставка"]], ["Sony", ["SONY", "Сони"], "Япония", "Азия", "Медиа и развлечения", 1946]], ["Q3895", "e", [["👬", "Основатель поссорился с братом, и тот создал конкурента"], ["⚽", "Официальные мячи чемпионатов мира"], ["🎽", "Спортивная форма"], ["🏃", "Экипировка для бега"], ["👟", "Кроссовки"]], ["Adidas", ["ADS", "Адидас"], "Германия", "Европа", "Одежда и роскошь", 1949]], ["Q1359568", "e", [["☁️", "Крупнейший облачный сервис в своей стране"], ["🛍️", "11 ноября — крупнейший день онлайн-распродаж"], ["🏮", "Компания из Азии"], ["📦", "Электронная торговля"], ["🧞", "Названа в честь героя сказки «Тысяча и одна ночь»"]], ["Alibaba", ["BABA", "Алибаба"], "Китай", "Азия", "Электронная торговля", 1999]], ["Q206921", "e", [["⚗️", "Начинала как химическая компания"], ["🧪", "Лаборатории и исследования"], ["💊", "Лекарства"], ["🦠", "Вакцина от COVID-19, созданная вместе с BioNTech"], ["💉", "Вакцины"]], ["Pfizer", ["PFE", "Пфайзер"], "США", "Северная Америка", "Фармацевтика и здоровье", 1849]], ["Q465751", "h", [["🌯", "Главное блюдо — огромные буррито"], ["🌶️", "Названа в честь копчёного перца халапеньо"], ["🥑", "За гуакамоле нужно доплачивать"], ["🏔️", "Первый ресторан открылся в Денвере"], ["🐖", "Делает ставку на мясо животных свободного выгула"]], ["Chipotle Mexican Grill", ["CMG", "Чипотле"], "США", "Северная Америка", "Напитки и продукты", 1993]], ["Q427881", "h", [["🚢", "Строит одни из самых больших пассажирских судов в мире"], ["🧗", "На лайнерах есть скалодромы и серф-симуляторы"], ["🏝️", "Собственный частный остров на Багамах"], ["👑", "«Королевское» название"], ["🌴", "Название отсылает к тёплому морю, где всё начиналось"]], ["Royal Caribbean", ["RCL"], "США", "Северная Америка", "Туризм", 1997]], ["Q2365235", "h", [["📚", "Начинала как интернет-магазин книг"], ["📦", "Миллионы посылок в день"], ["🏪", "Тысячи пунктов выдачи заказов"], ["💳", "Собственный банк для покупателей и продавцов"], ["🔵", "Фирменный цвет — синий"]], ["Ozon", ["OZON", "Озон"], "Россия", "Европа", "Электронная торговля", 1998]], ["Q1112588", "h", [["🎩", "Семейный бизнес начинался с продажи шляп"], ["👵", "В рекламе снималась хозяйка компании — «крутая мамаша»"], ["🧥", "Куртки и одежда для активного отдыха"], ["🌲", "Штаб-квартира в Портленде, штат Орегон"], ["🏞️", "Названа в честь реки на северо-западе США"]], ["Columbia Sportswear", ["COLM", "Коламбия"], "США", "Северная Америка", "Одежда и роскошь", 1938]], ["Q28452620", "h", [["👨‍💻", "Основатель ушёл из Google, чтобы делать электронику"], ["🔋", "Пауэрбанки"], ["🔌", "Зарядки и кабели"], ["🛒", "Выросла на продажах через Amazon"], ["⚓", "Название переводится как «якорь»"]], ["Anker", ["Анкер"], "Китай", "Азия", "Электроника", 2011]], ["Q20732498", "h", [["🏪", "Магазины недорогих товаров для дома"], ["🎌", "Оформление в японском стиле, хотя компания китайская"], ["🧸", "Мягкие игрушки и коллаборации с мультфильмами"], ["💸", "Низкие цены"], ["🌍", "Тысячи магазинов в десятках стран"]], ["Miniso", ["MNSO", "Минисо"], "Китай", "Азия", "Ритейл", 2013]], ["Q2609162", "h", [["🎫", "Продаёт билеты"], ["🎤", "Концерты и туры звёзд"], ["💥", "Сайт не выдержал наплыва фанатов на тур Тейлор Свифт"], ["💸", "Игроков раздражают сервисные сборы"], ["🤝", "Объединилась с крупнейшим организатором концертов"]], ["Ticketmaster", ["Тикетмастер"], "США", "Северная Америка", "Медиа и развлечения", 1976]], ["Q864338", "h", [["🧬", "Одна из первых биотех-компаний"], ["🏅", "Среди основателей — нобелевские лауреаты"], ["🧠", "Лекарства от рассеянного склероза"], ["👴", "Спорное одобрение препарата от болезни Альцгеймера"], ["🎓", "Основана учёными из Гарварда и MIT"]], ["Biogen", ["BIIB", "Биоген"], "США", "Северная Америка", "Фармацевтика и здоровье", 1978]], ["Q2744099", "h", [["🧬", "Лекарства от генетической болезни — муковисцидоза"], ["✂️", "Первая одобренная терапия на основе CRISPR"], ["💉", "Лечение серповидноклеточной анемии"], ["📖", "О компании написана книга «Молекула на миллиард долларов»"], ["🧪", "Рациональный дизайн лекарств"]], ["Vertex Pharmaceuticals", ["VRTX", "Вертекс"], "США", "Северная Америка", "Фармацевтика и здоровье", 1989]], ["Q1453620", "h", [["🟠", "Один из крупнейших производителей меди"], ["🏔️", "Рудник Грасберг высоко в горах Индонезии"], ["🥇", "Там же — одно из крупнейших месторождений золота"], ["🔶", "Добывала серу в начале XX века"], ["🌵", "Карьеры в Аризоне"]], ["Freeport-McMoRan", ["FCX"], "США", "Северная Америка", "Металлы и добыча", 1912]], ["Q55118127", "h", [["🧊", "Основатель начинал с деталей для холодильников"], ["🇸🇪", "Купила шведскую автомарку"], ["🏎️", "Владеет британской маркой спорткаров"], ["🚗", "Китайские автомобили"], ["🌐", "Доля в немецком автоконцерне"]], ["Geely Auto", ["Geely", "Джили"], "Китай", "Азия", "Автомобили", 1986]], ["Q697311", "h", [["🔩", "Один из крупнейших поставщиков автодеталей"], ["🏭", "Собирает машины для других марок по контракту"], ["⛰️", "В Австрии собирает знаменитый внедорожник"], ["🇦🇹", "Основатель — эмигрант из Австрии"], ["🍁", "Штаб-квартира под Торонто"]], ["Magna International", ["MGA", "Магна"], "Канада", "Северная Америка", "Автомобили", 1957]], ["Q294721", "h", [["🍿", "Сеть кинотеатров"], ["🦍", "Мем-акция 2021 года, держатели называли себя «обезьянами»"], ["📈", "Акции взлетели в разы за несколько дней"], ["🛋️", "Раскладные кресла в залах"], ["🎬", "Одна из крупнейших сетей кинотеатров в мире"]], ["AMC Theatres", ["AMC"], "США", "Северная Америка", "Медиа и развлечения", 1920]], ["Q1389504", "h", [["⭐", "Звёздный рейтинг инвестиционных фондов"], ["📖", "Название взято из последней строки книги «Уолден»"], ["📊", "Аналитика для инвесторов"], ["🏙️", "Штаб-квартира в Чикаго"], ["🌅", "В названии — утро"]], ["Morningstar", ["MORN"], "США", "Северная Америка", "Финансы", 1984]], ["Q671267", "h", [["🚢", "Морские грузоперевозки"], ["✈️", "Авиагрузы"], ["📦", "Логистика по всему миру"], ["⚓", "Основана в портовом Бремене"], ["➕", "В названии — плюс"]], ["Kuehne + Nagel", ["KNIN"], "Швейцария", "Европа", "Транспорт", 1890]], ["Q904594", "h", [["🧂", "Добывает калийную соль"], ["🌾", "Сырьё для удобрений"], ["🕳️", "Провалы грунта над шахтами в Березниках"], ["⛰️", "Название указывает на горный регион"], ["⛏️", "Шахты на глубине сотен метров"]], ["Uralkali", ["URKA", "Уралкалий"], "Россия", "Европа", "Металлы и добыча", 1934]], ["Q256290", "h", [["🚆", "Тормоза для поездов"], ["🚛", "Тормозные системы для грузовиков"], ["🛑", "Название буквально про торможение"], ["🏙️", "Штаб-квартира в Мюнхене"], ["🚇", "Двери и системы для метро"]], ["Knorr-Bremse", ["KBX"], "Германия", "Европа", "Транспорт", 1905]], ["Q2266483", "h", [["🛡️", "Бесплатный антивирус"], ["🦠", "Защита от компьютерных вирусов"], ["🏰", "Компания из Брно"], ["🤝", "Купил другой чешский разработчик антивирусов"], ["💻", "Сотни миллионов установок"]], ["AVG Technologies", ["AVG"], "Чехия", "Европа", "Технологии", 1991]], ["Q1384984", "h", [["🐛", "Серия игр про воюющих червяков"], ["💣", "Святая граната и банановая бомба"], ["🍳", "Издатель кооперативной игры про хаос на кухне"], ["🕹️", "Начинали с игр для Amiga"], ["🔢", "В названии — число"]], ["Team17", ["TM17"], "Великобритания", "Европа", "Медиа и развлечения", 1990]], ["Q1576915", "h", [["⚔️", "Серия игр, где один воин раскидывает тысячи врагов"], ["🗡️", "Игры про ниндзя Рю Хаябусу"], ["🏯", "Стратегии по «Троецарствию»"], ["🏐", "Пляжный волейбол из файтинг-серии"], ["🤝", "Образована слиянием двух игровых студий"]], ["Koei Tecmo", ["Коэй Текмо"], "Япония", "Азия", "Медиа и развлечения", 2009]], ["Q592182", "h", [["🖥️", "Мониторы"], ["🎨", "Точная цветопередача для дизайнеров и фотографов"], ["🏥", "Медицинские дисплеи для рентгенологов"], ["✈️", "Дисплеи для авиадиспетчеров"], ["🗾", "Японская компания из префектуры Исикава"]], ["Eizo", ["Эйзо"], "Япония", "Азия", "Технологии", 1968]]];
  /* Данные о компании из загадки — запасные, если её нет в базе GitHub */
  P.forEach(function(p){ var f=p[3]; FND.addLocal([p[0]],{name:f[0],aliases:f[1],country:f[2],region:f[3],sector:f[4],founded:f[5]}); });

  /* ---------- Состояние ---------- */
  var store=FND.store('fnd_emoji4_','easy');
  var puzzle, answer, state, testMode=false, prevWrong=0;
  function setPuzzle(p){ puzzle=p; answer=FND.get(p[0]); }
  function wrong(){ return state.guesses.filter(function(g){return g!==answer.id;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(g.region&&g.region===answer.region?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }
  var U=FND.game(root,{key:'companies',name:'Компании',max:MAX,store:store,render:render,stats:stats,
    row:function(){ return answer?FND.row(state,answer.id,MAX):null; },hide:function(){ AC.hide(); }}), $=U.$;

  /* ---------- Отрисовка ---------- */
  function render(){
    if(!state) return;
    var w=wrong(), shown=state.done?5:Math.min(5,1+w), fresh=w>prevWrong&&!state.done, eh='';
    for(var i=0;i<5;i++){
      if(i<shown) eh+='<div class="t-tile'+(fresh&&i===shown-1?' t-fresh':'')+'">'+puzzle[2][i][0]+'</div>';
      else eh+='<div class="t-tile t-lock">'+FND.LOCK+'</div>';
    }
    $('emojis').innerHTML=eh;
    FND.steps($,state,MAX);
    var used=state.guesses.length;
    var th='<div class="t-tr t-th"><span>Компания</span><span>Страна</span><span>Сектор</span><span>Основана</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id){
      var g=FND.get(id);
      if(id===answer.id){
        th+='<div class="t-tr t-win"><span class="t-co">'+esc(g.name)+'</span><span class="t-chip t-cty ok">'+esc(g.country)+'</span><span class="t-chip ok t-hide-m">'+esc(g.sector)+'</span><span class="t-chip t-yr ok">'+g.founded+'</span></div>';
        return;
      }
      var r=compare(g);
      th+='<div class="t-tr"><span class="t-co">'+esc(g.name)+'</span>'+
        '<span class="t-chip t-cty '+r.country+'">'+esc(g.country)+'</span>'+
        '<span class="t-chip t-hide-m '+r.sector+'">'+esc(g.sector)+'</span>'+
        '<span class="t-chip t-yr '+r.year+'">'+g.founded+r.arrow+'</span></div>';
    });
    $('table').innerHTML=th;
    $('play').style.display=state.done?'none':'';
    U.end(state,testMode,'<h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+(answer.exchange?' · '+esc(answer.exchange):'')+'</p>');
    stats();
    prevWrong=w;
  }
  function stats(){ FND.statsRender($,store,state,MAX,testMode); }

  /* ---------- Ввод: любая компания из общей базы ---------- */
  var AC=FND.autocomplete({root:root,$:$,submit:submit,
    search:function(q){ return FND.rank({items:FND.LIST,q:q,nameOf:function(c){return c.name;},altsOf:function(c){return c.aliases;},skip:function(c){return state.guesses.indexOf(c.id)>=0;}}); },
    label:function(c){ return [c.name,c.aliases,c.aliases[0]||'']; }});
  var input=AC.input;
  function submit(){
    if(!state||state.done) return;
    var n=norm(input.value);
    var pick=FND.LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id);
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    U.after(state,testMode,input);
  }
  U.testButton(function(){ if(!state) return; var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur&&P.length>1);
    setPuzzle(p); testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false}; prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); });

  FND.register({key:'companies',pool:P,seed:20261101,
    company:function(p){ return FND.get(p[0]).id; }, label:function(p){ return FND.get(p[0]).name; },
    boot:function(i){ setPuzzle(P[i]); state=U.daily(answer.id); state.guesses=state.guesses.filter(function(id){ return FND.get(id); }); prevWrong=wrong(); AC.enable(); render(); }});
})();


/* ==================== 3. Ключевые слова (#fg3) ==================== */
(function(){
  var root=document.getElementById('fg3');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var esc=FND.esc, norm=FND.norm, MAX=5;

  /* ---------- Загадки: [компания, 5 слов с источником для проверки] ---------- */
  var W='https://en.wikipedia.org/wiki/';
  var P=[
    ['nvidia',[['Идея родилась за столиком придорожной закусочной',W+'Nvidia'],['Первый продукт, который продавали как «GPU» (1999)',W+'Nvidia'],['Платформа CUDA',W+'Nvidia'],['Оборудование для ИИ в дата-центрах',W+'Nvidia'],['Дженсен Хуанг',W+'Nvidia'],['Видеокарты GeForce',W+'Nvidia']]],
    ['apple',[['Основана 1 апреля',W+'Apple_Inc.'],['Один из основателей через 12 дней продал свою долю за $800',W+'Apple_Inc.'],['Основатель вернулся после покупки NeXT',W+'Apple_Inc.'],['Магазин приложений (2008)',W+'Apple_Inc.'],['Стив Джобс',W+'Apple_Inc.'],['iPhone',W+'Apple_Inc.']]],
    ['netflix',[['Скоттс-Вэлли, Калифорния',W+'Netflix'],['Qwikster',W+'Netflix'],['Начинала с проката DVD',W+'Netflix'],['«Карточный домик» (2013)',W+'Netflix'],['Рид Хастингс',W+'Netflix'],['Стриминг сериалов и фильмов',W+'Netflix']]],
    ['tesla',[['Названа в честь изобретателя',W+'Tesla,_Inc.'],['Основатели — Эберхард и Тарпеннинг',W+'Tesla,_Inc.'],['Первая модель — спорткар Roadster (2008)',W+'Tesla,_Inc.'],['Гигафабрики',W+'Tesla,_Inc.'],['Илон Маск',W+'Tesla,_Inc.'],['Электромобили',W+'Tesla,_Inc.']]],
    ['coca',[['Компанию основал Аса Кэндлер',W+'The_Coca-Cola_Company'],['Штаб-квартира в Атланте',W+'The_Coca-Cola_Company'],['Крупнейший акционер — Berkshire Hathaway',W+'The_Coca-Cola_Company'],['Рецепт — самый охраняемый секрет компании',W+'The_Coca-Cola_Company'],['Фармацевт Джон Пембертон',W+'The_Coca-Cola_Company'],['Газировка',W+'The_Coca-Cola_Company']]],
    ['amazon',[['Первое название — Cadabra',W+'Amazon_(company)'],['Бельвью, штат Вашингтон',W+'Amazon_(company)'],['Начинала с продажи книг',W+'Amazon_(company)'],['Облачная платформа AWS',W+'Amazon_(company)'],['Джефф Безос',W+'Amazon_(company)'],['Онлайн-маркетплейс',W+'Amazon_(company)']]],
    ['microsoft',[['Основана в Альбукерке',W+'Microsoft'],['Пол Аллен',W+'Microsoft'],['MS-DOS',W+'Microsoft'],['Игровая консоль (2001)',W+'Microsoft'],['Билл Гейтс',W+'Microsoft'],['Windows',W+'Microsoft']]],
    ['nike',[['Blue Ribbon Sports',W+'Nike,_Inc.'],['Вафельница жены сооснователя',W+'Nike,_Inc.'],['Just Do It (1988)',W+'Nike,_Inc.'],['Фил Найт',W+'Nike,_Inc.'],['Air Jordan',W+'Nike,_Inc.'],['Названа в честь греческой богини победы',W+'Nike,_Inc.']]]
  ];

  /* ---------- Состояние ---------- */
  var store=FND.store('fnd_kw4_','easy');
  var puzzle, answer, state, testMode=false, prevWrong=0;
  function setPuzzle(p){ puzzle=p; answer=FND.get(p[0]); }
  function wrong(){ return state.guesses.filter(function(g){return g!==answer.id;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(g.region&&g.region===answer.region?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }
  var U=FND.game(root,{key:'keywords',name:'Ключевые слова',max:MAX,store:store,render:render,stats:stats,
    row:function(){ return answer?FND.row(state,answer.id,MAX):null; },hide:function(){ AC.hide(); }}), $=U.$;

  /* ---------- Отрисовка ---------- */
  function render(){
    if(!state) return;
    var w=wrong(), shown=state.done?5:Math.min(5,1+w), fresh=w>prevWrong&&!state.done, eh='';
    for(var i=0;i<5;i++){
      if(i<shown) eh+='<li class="t-word'+(fresh&&i===shown-1?' t-fresh':'')+'"><b>'+(i+1)+'</b>'+esc(puzzle[1][i][0])+'</li>';
      else eh+='<li class="t-word t-lock"><b>'+FND.LOCK+'</b>откроется после '+i+'-й ошибки</li>';
    }
    $('words').innerHTML=eh;
    FND.steps($,state,MAX);
    var used=state.guesses.length;
    var th='<div class="t-tr t-th"><span>Компания</span><span>Страна</span><span>Сектор</span><span>Основана</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id){
      var g=FND.get(id);
      if(id===answer.id){
        th+='<div class="t-tr t-win"><span class="t-co">'+esc(g.name)+'</span><span class="t-chip t-cty ok">'+esc(g.country)+'</span><span class="t-chip ok t-hide-m">'+esc(g.sector)+'</span><span class="t-chip t-yr ok">'+g.founded+'</span></div>';
        return;
      }
      var r=compare(g);
      th+='<div class="t-tr"><span class="t-co">'+esc(g.name)+'</span>'+
        '<span class="t-chip t-cty '+r.country+'">'+esc(g.country)+'</span>'+
        '<span class="t-chip t-hide-m '+r.sector+'">'+esc(g.sector)+'</span>'+
        '<span class="t-chip t-yr '+r.year+'">'+g.founded+r.arrow+'</span></div>';
    });
    $('table').innerHTML=th;
    $('play').style.display=state.done?'none':'';
    U.end(state,testMode,'<h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+(answer.exchange?' · '+esc(answer.exchange):'')+'</p>');
    stats();
    prevWrong=w;
  }
  function stats(){ FND.statsRender($,store,state,MAX,testMode); }

  /* ---------- Ввод: любая компания из общей базы ---------- */
  var AC=FND.autocomplete({root:root,$:$,submit:submit,
    search:function(q){ return FND.rank({items:FND.LIST,q:q,nameOf:function(c){return c.name;},altsOf:function(c){return c.aliases;},skip:function(c){return state.guesses.indexOf(c.id)>=0;}}); },
    label:function(c){ return [c.name,c.aliases,c.aliases[0]||'']; }});
  var input=AC.input;
  function submit(){
    if(!state||state.done) return;
    var n=norm(input.value);
    var pick=FND.LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id);
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    U.after(state,testMode,input);
  }
  U.testButton(function(){ if(!state) return; var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur&&P.length>1);
    setPuzzle(p); testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false}; prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); });

  FND.register({key:'keywords',pool:P,seed:20261103,
    company:function(p){ return FND.get(p[0]).id; }, label:function(p){ return FND.get(p[0]).name; },
    boot:function(i){ setPuzzle(P[i]); state=U.daily(answer.id); prevWrong=wrong(); AC.enable(); render(); }});
})();


/* ==================== 4. Цитата (#fg4) ==================== */
/* Угадываем автора цитаты. В списке и в поле ввода — «Имя (Компания)».
   Попытки 1–3: засчитывается только автор. С 4-й (предпоследней) можно назвать и компанию автора — тоже победа.
   Подсказки после ошибок: 1) год цитаты, 2) два эмодзи о компании, 3) «можно назвать компанию», 4) инициалы автора.
   Ответ-компания хранится как 'co:'+ID компании. */
(function(){
  var root=document.getElementById('fg4');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var esc=FND.esc, norm=FND.norm, MAX=5;

  /* ---------- Люди: [имя, компания, другие написания]. Авторы цитат + известные основатели и CEO как ложные следы ---------- */
  var PPL=[
    ['Стив Джобс','apple',['Steve Jobs','Джобс']],['Тим Кук','apple',['Tim Cook','Кук']],['Стив Возняк','apple',['Steve Wozniak','Возняк']],
    ['Джефф Безос','amazon',['Jeff Bezos','Безос']],['Энди Джесси','amazon',['Andy Jassy','Джесси']],
    ['Марк Цукерберг','meta',['Mark Zuckerberg','Цукерберг']],['Шерил Сэндберг','meta',['Sheryl Sandberg','Сэндберг']],
    ['Рид Хастингс','netflix',['Reed Hastings','Хастингс']],['Тед Сарандос','netflix',['Ted Sarandos','Сарандос']],['Марк Рэндольф','netflix',['Marc Randolph','Рэндольф']],
    ['Дженсен Хуанг','nvidia',['Jensen Huang','Хуанг']],['Лиза Су','amd',['Lisa Su']],
    ['Сатья Наделла','microsoft',['Satya Nadella','Наделла']],['Билл Гейтс','microsoft',['Bill Gates','Гейтс']],['Пол Аллен','microsoft',['Paul Allen','Аллен']],['Стив Балмер','microsoft',['Steve Ballmer','Балмер']],
    ['Илон Маск','tesla',['Elon Musk','Маск']],
    ['Сундар Пичаи','alphabet',['Sundar Pichai','Пичаи']],['Ларри Пейдж','alphabet',['Larry Page','Пейдж']],['Сергей Брин','alphabet',['Sergey Brin','Брин']],
    ['Джек Ма','alibaba',['Jack Ma']],['Ма Хуатэн','tencent',['Pony Ma','Ma Huateng']],
    ['Даниэль Эк','spotify',['Daniel Ek','Эк']],['Брайан Чески','airbnb',['Brian Chesky','Чески']],['Трэвис Каланик','uber',['Travis Kalanick','Каланик']],
    ['Фил Найт','nike',['Phil Knight','Найт']],['Говард Шульц','starbucks',['Howard Schultz','Шульц']],
    ['Боб Айгер','disney',['Bob Iger','Айгер']],['Генри Форд','ford',['Henry Ford']],['Мэри Барра','gm',['Mary Barra','Барра']],
    ['Тоби Лютке','shopify',['Tobi Lütke','Tobi Lutke','Лютке']]
  ];
  var PEOPLE=[], PER={};
  PPL.forEach(function(r){ var o={id:r[0],name:r[0],company:r[1],aliases:r[2]}; PEOPLE.push(o); PER[o.id]=o; });

  /* ---------- Цитаты: [компания, перевод, оригинал, автор, инициалы, должность, год, где прозвучала, 2 эмодзи, источник для проверки] ---------- */
  var P=[
    ['apple','Оставайтесь голодными. Оставайтесь безрассудными.','Stay Hungry. Stay Foolish.','Стив Джобс','С. Д.','сооснователь и CEO',2005,'Речь перед выпускниками Стэнфорда','🎓📱','https://news.stanford.edu/2005/06/12/youve-got-find-love-jobs-says/'],
    ['amazon','День второй — это застой. Затем потеря актуальности. Затем мучительный упадок. Затем смерть. Поэтому у нас всегда день первый.','Day 2 is stasis. Followed by irrelevance. Followed by excruciating, painful decline. Followed by death. And that is why it is always Day 1.','Джефф Безос','Д. Б.','основатель и CEO',2017,'Письмо акционерам за 2016 год','📦☁️','https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders'],
    ['meta','Двигайся быстро и ломай. Если ты ничего не ломаешь, значит, движешься недостаточно быстро.','Move fast and break things. The idea is that if you never break anything, you’re probably not moving fast enough.','Марк Цукерберг','М. Ц.','основатель и CEO',2012,'Письмо инвесторам перед IPO','👍🥽','https://www.snopes.com/fact-check/move-fast-break-things-facebook-motto/'],
    ['netflix','Мы, по сути, конкурируем со сном.','We’re competing with sleep, on the margin.','Рид Хастингс','Р. Х.','сооснователь и CEO',2017,'Звонок с инвесторами по итогам квартала','🍿📺','https://www.cnbc.com/2017/04/17/amazon-hbo-netflix-thinks-its-real-competitor-is--sleep.html'],
    ['nvidia','Мы переживаем „момент iPhone“ для искусственного интеллекта.','We are at the iPhone moment of AI.','Дженсен Хуанг','Д. Х.','основатель и CEO',2023,'Ключевой доклад на конференции GTC','🎮🧠','https://blogs.nvidia.com/blog/gtc-keynote-spring-2023/'],
    ['microsoft','Наша отрасль не уважает традиции — она уважает только инновации.','Our industry does not respect tradition — it only respects innovation.','Сатья Наделла','С. Н.','CEO',2014,'Письмо сотрудникам в первый день на посту CEO','☁️💼','https://news.microsoft.com/source/2014/02/04/satya-nadella-email-to-employees-on-first-day-as-ceo/'],
    ['tesla','Построить спорткар. На эти деньги построить доступный автомобиль. На эти деньги построить ещё более доступный автомобиль.','Build sports car. Use that money to build an affordable car. Use that money to build an even more affordable car.','Илон Маск','И. М.','сооснователь и CEO',2006,'„Секретный генеральный план“ в блоге компании','🔋⚡','https://www.tesla.com/secret-master-plan'],
    ['microsoft','Контент — вот где, как я ожидаю, в интернете будут зарабатываться настоящие деньги, как это было в теле- и радиовещании.','Content is where I expect much of the real money will be made on the Internet, just as it was in broadcasting.','Билл Гейтс','Б. Г.','сооснователь и CEO',1996,'Эссе „Content is King“','💾🖥️','http://web.archive.org/web/20010126005200/http://www.microsoft.com/billgates/columns/1996essay/essay960103.asp']
  ];

  /* ---------- Состояние ---------- */
  var store=FND.store('fnd_quote7_',null); /* новый ключ: раньше угадывали компанию, сохранённые ответы не подходят */
  var puzzle, author, company, state, testMode=false, prevWrong=0;
  function co(p){ return FND.get(p.company); }
  function setPuzzle(p){ puzzle=p; author=PER[p[3]]; company=FND.get(p[0]); }
  var CO_AT=3; /* после стольких ответов можно называть компанию (то есть с 4-й попытки) */
  function coOpen(){ return state&&!state.done&&state.guesses.length>=CO_AT; }
  function isWin(g){ return g===author.id||g==='co:'+company.id; }
  function wrong(){ return state.guesses.filter(function(g){ return !isWin(g); }).length; }
  function compOf(g){ return g.indexOf('co:')===0?FND.get(g.slice(3)):co(PER[g]); }
  function personLabel(p){ return p.name+' ('+co(p).name+')'; }
  function compare(g){
    var c=compOf(g);
    return {company:c===company?'ok':'miss',
      country:c.country===company.country?'ok':(c.region&&c.region===company.region?'near':'miss'),
      sector:c.sector===company.sector?'ok':'miss'};
  }
  var U=FND.game(root,{key:'quote',name:'Цитата',max:MAX,store:store,render:render,stats:stats,
    row:function(){ return author&&state?FND.row(state,state.won?state.guesses[state.guesses.length-1]:author.id,MAX):null; },hide:function(){ AC.hide(); }}), $=U.$;

  /* ---------- Отрисовка ---------- */
  function render(){
    if(!state) return;
    var w=wrong(), nh=state.done?4:Math.min(4,w), fresh=w>prevWrong&&!state.done;
    $('quote').textContent=puzzle[1];
    var HV=[puzzle[6],puzzle[8],'Можно назвать компанию',puzzle[4]], hh='';
    for(var i=0;i<4;i++){
      if(i<nh) hh+='<div class="t-hint'+(fresh&&i===nh-1?' t-fresh':'')+(/^[^0-9a-zа-яё]+$/i.test(String(HV[i]))?' t-emo':'')+(i===2?' t-txt':'')+'"><span>'+esc(HV[i])+'</span></div>';
      else hh+='<div class="t-hint t-lock"><span>'+FND.LOCK+'</span></div>';
    }
    $('hints').innerHTML=hh;
    FND.steps($,state,MAX);
    var used=state.guesses.length;
    var th='<div class="t-tr t-th"><span>Автор</span><span>Компания</span><span>Страна</span><span>Сектор</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id){
      var isCo=id.indexOf('co:')===0, c=compOf(id), win=isWin(id), r=win?{company:'ok',country:'ok',sector:'ok'}:compare(id);
      th+='<div class="t-tr'+(win?' t-win':'')+'"><span class="t-co">'+(isCo?'—':esc(PER[id].name))+'</span>'+
        '<span class="t-chip t-yr '+r.company+'">'+esc(c.name)+'</span>'+
        '<span class="t-chip t-cty '+r.country+'">'+esc(c.country)+'</span>'+
        '<span class="t-chip t-hide-m '+r.sector+'">'+esc(c.sector)+'</span></div>';
    });
    $('table').innerHTML=th;
    $('play').style.display=state.done?'none':'';
    $('input').placeholder=coOpen()?'Имя автора или компания':'Имя автора';
    U.end(state,testMode,
      '<h2>'+esc(author.name)+'</h2><p>'+esc(puzzle[5])+', '+esc(company.name)+' · '+esc(company.country)+' · '+esc(company.sector)+'</p>',
      '<div class="t-orig">«'+esc(puzzle[2])+'»</div>'+
      '<div class="t-src">'+esc(puzzle[7])+', '+puzzle[6]+'</div>');
    stats();
    prevWrong=w;
  }
  function stats(){ FND.statsRender($,store,state,MAX,testMode); }

  /* ---------- Ввод ----------
     Попытки 1–3: только люди, поиск по имени. С 4-й: ещё и компании, а людей можно искать по компании.
     В списке и в поле — «Имя (Компания)»; у компании справа подпись «компания». */
  function isPerson(it){ return PER[it.id]===it; }
  function gid(it){ return isPerson(it)?it.id:'co:'+it.id; }
  var AC=FND.autocomplete({root:root,$:$,submit:submit,
    search:function(q){ var open=coOpen();
      return FND.rank({items:open?PEOPLE.concat(FND.LIST):PEOPLE,q:q,nameOf:function(it){ return it.name; },
        altsOf:function(it){ if(!isPerson(it)) return it.aliases; var c=co(it); return open?it.aliases.concat([c.name]).concat(c.aliases.slice(0,3)):it.aliases; },
        skip:function(it){ return state.guesses.indexOf(gid(it))>=0; }}); },
    label:function(it){ return isPerson(it)?[personLabel(it),it.aliases,it.aliases[0]||'']:[it.name,it.aliases,'компания']; },
    fieldText:function(it){ return isPerson(it)?personLabel(it):it.name; }});
  var input=AC.input;
  function findCompany(n){ return FND.LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0]; }
  function submit(){
    if(!state||state.done) return;
    var n=norm(input.value), id=null;
    var p=PEOPLE.filter(function(p){ return norm(p.name)===n||norm(personLabel(p))===n||p.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(p) id=p.id;
    else{ var c=findCompany(n);
      if(c&&!coOpen()){ $('msg').textContent='Компанию можно будет назвать с 4-й попытки. Пока — только имя автора'; return; }
      if(c) id='co:'+c.id; }
    if(!id){ $('msg').textContent=input.value?(coOpen()?'Такого человека или компании нет в списке — выберите из подсказок':'Такого человека нет в списке — выберите из подсказок'):'Введите имя автора'; return; }
    if(state.guesses.indexOf(id)>=0){ $('msg').textContent=id.indexOf('co:')===0?'Эту компанию вы уже называли':'Этого человека вы уже называли'; return; }
    state.guesses.push(id);
    if(isWin(id)){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    U.after(state,testMode,input);
  }
  U.testButton(function(){ if(!state) return; var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur&&P.length>1);
    setPuzzle(p); testMode=true; state={day:'test',answer:author.id,guesses:[],done:false,won:false}; prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',personLabel(author)); });

  FND.register({key:'quote',pool:P,seed:20261104,
    company:function(p){ return FND.get(p[0]).id; }, label:function(p){ return p[3]+' ('+FND.get(p[0]).name+')'; },
    boot:function(i){ setPuzzle(P[i]); state=U.daily(author.id); prevWrong=wrong(); AC.enable(); render(); }});
})();


/* ==================== 5. Классика (#fg5) ==================== */
(function(){
  var root=document.getElementById('fg5');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var esc=FND.esc, norm=FND.norm, MAX=7;

  /* «Смежные» секторы дают жёлтый. Секторы будут пересобраны в ветке «Данные» — тогда обновить и эти группы */
  var SECTOR_GROUP={'Технологии':'tech','Электроника':'tech','Полупроводники':'tech','Электронная торговля':'tech','Телеком':'tech',
    'Напитки и продукты':'cons','Потребительские товары':'cons','Рестораны':'cons','Одежда и роскошь':'cons','Ритейл':'cons',
    'Медиа и развлечения':'media','Туризм':'media',
    'Финансы':'fin','Недвижимость':'fin',
    'Фармацевтика и здоровье':'pharma','Химия':'pharma',
    'Автомобили':'auto','Транспорт':'auto',
    'Промышленность':'ind','Энергетика':'ind','Металлы и добыча':'ind'};
  /* Страна биржи: биржи одной страны дают жёлтый */
  var EXCHANGE_COUNTRY={'NYSE':'США','NASDAQ':'США','Токио':'Япония','Лондон':'Великобритания','Гонконг':'Китай','Шанхай':'Китай','Шэньчжэнь':'Китай',
    'Франкфурт':'Германия','Мосбиржа':'Россия','Мумбаи (NSE)':'Индия','Мумбаи (BSE)':'Индия','Париж':'Франция','Сидней':'Австралия',
    'Тайбэй':'Тайвань','Торонто':'Канада','Осло':'Норвегия','Брюссель':'Бельгия','Йоханнесбург':'ЮАР','Цюрих (SIX)':'Швейцария','Сеул':'Республика Корея'};
  var SHORT={'Электронная торговля':'E-commerce','Напитки и продукты':'Напитки, продукты','Потребительские товары':'Товары для дома','Медиа и развлечения':'Медиа','Фармацевтика и здоровье':'Фарма, здоровье','Великобритания':'Британия','Республика Корея':'Корея'};

  /* ---------- Колонки сравнения ---------- */
  var COLS=[
    {key:'country',title:'Страна',cmp:function(g,a){ return g.country===a.country?'ok':(g.region&&g.region===a.region?'near':'miss'); }},
    {key:'sector',title:'Сектор',info:true,cmp:function(g,a){ return g.sector===a.sector?'ok':(SECTOR_GROUP[g.sector]&&SECTOR_GROUP[g.sector]===SECTOR_GROUP[a.sector]?'near':'miss'); }},
    {key:'exchange',title:'Биржа',info:true,cmp:function(g,a){ return g.exchange===a.exchange?'ok':(EXCHANGE_COUNTRY[g.exchange]&&EXCHANGE_COUNTRY[g.exchange]===EXCHANGE_COUNTRY[a.exchange]?'near':'miss'); }},
    {key:'cap',title:'Капитализация',ratio:2,fmt:function(v){return fmtCap(v);}},
    {key:'emp',title:'Сотрудники',ratio:2,fmt:function(v){return fmtEmp(v);}},
    {key:'founded',title:'Основана',num:true,near:10}
  ];

  /* Капитализация, млрд $ — companiesmarketcap.com на 25.11.2026 (Puma — оценка на июль 2026). Обновлять скриптом. */
  var CAP_DATE='25 ноября 2026';
  var CAP={tesla:1520,toyota:246.42,vw:35.71,bmw:36.10,mercedes:39.01,honda:42.97,hyundai:52.78,ford:47.61,gm:68.72,apple:5145,microsoft:3684,alphabet:3400,meta:1507,tencent:394.10,uber:132.11,airbnb:103.82,shopify:170.21,samsung:829.39,sony:161.96,nvidia:3751,intel:291.26,amd:683.98,amazon:2728,alibaba:211.11,netflix:241.73,spotify:123.26,disney:209.25,nintendo:63.47,coca:419.95,pepsico:194.43,nestle:265.47,unilever:140.46,starbucks:121.28,nike:53.09,adidas:31.18,puma:4.31,visa:777.62,mastercard:564.03,paypal:46.62,pfizer:162.21,jnj:665.52,moderna:91.93};
  function fmtCap(b){ if(b>=1000) return '$'+(b/1000).toFixed(b>=10000?0:2).replace('.',',').replace(/,?0+$/,'')+' трлн'; if(b>=10) return '$'+Math.round(b)+' млрд'; return '$'+b.toFixed(1).replace('.',',')+' млрд'; }
  /* Сотрудники — последние годовые отчёты (companiesmarketcap.com, отчёты компаний, SEC), данные 2025–2026 */
  var EMP={tesla:134785,toyota:367990,vw:656134,bmw:159104,mercedes:163132,honda:195109,hyundai:63018,ford:169000,gm:156000,apple:150000,microsoft:223000,alphabet:198933,meta:75472,tencent:109414,uber:36600,airbnb:8200,shopify:7600,samsung:259149,sony:94900,nvidia:42000,intel:85100,amd:31000,amazon:1595000,alibaba:132165,netflix:16000,spotify:7287,disney:175560,nintendo:8666,coca:65900,pepsico:306000,nestle:270000,unilever:93731,starbucks:381000,nike:73000,adidas:46045,puma:18488,visa:34100,mastercard:39800,paypal:23800,pfizer:75000,jnj:138200,moderna:4700};
  function fmtEmp(n){ if(n>=1e6) return (n/1e6).toFixed(1).replace('.',',')+' млн'; if(n>=1e4) return Math.round(n/1000)+' тыс'; return (n/1000).toFixed(1).replace('.',',')+' тыс'; }
  /* Загадки — только компании, у которых есть капитализация и сотрудники */
  var P=Object.keys(CAP);
  P.forEach(function(slug){ var c=FND.get(slug); c.cap=CAP[slug]; c.emp=EMP[slug]; });

  /* Списки для подсказок в заголовках (считаются после загрузки базы) */
  var INFO={};
  function infoHTML(key){
    if(INFO[key]) return INFO[key];
    var s={}; FND.LIST.forEach(function(c){ if(c[key]) s[c[key]]=1; });
    var groups={}, order=[], map=key==='sector'?SECTOR_GROUP:EXCHANGE_COUNTRY;
    Object.keys(s).forEach(function(v){ var g=map[v]||v; if(!groups[g]){groups[g]=[];order.push(g);} groups[g].push(SHORT[v]||v); });
    var head=key==='sector'?'Секторы в игре. В одной строке — смежные, они подсвечиваются жёлтым.':'Биржи в игре. Биржи одной страны подсвечиваются жёлтым.';
    return INFO[key]='<b>'+head+'</b>'+order.map(function(g){ var vals=groups[g].sort(function(a,b){return a.localeCompare(b,'ru');}); return '<div>'+(key==='exchange'?'<em>'+esc(g)+':</em> ':'')+vals.map(esc).join(' · ')+'</div>'; }).join('');
  }

  /* ---------- Состояние ---------- */
  var store=FND.store('fnd_classic4_',null);
  var answer, state, testMode=false, justAdded=null;
  function cell(col,g){
    var A=answer[col.key], G=g[col.key];
    if(G==null||G===''||A==null) return {cls:'none',text:'нет данных'};
    if(col.ratio){ var r=Math.max(A,G)/Math.min(A,G); return {cls:A===G?'ok':(r<=col.ratio?'near':'miss'),text:col.fmt(G)+(A>G?' ↑':(A<G?' ↓':''))}; }
    if(col.num){ var d=A-G; return {cls:d===0?'ok':(Math.abs(d)<=col.near?'near':'miss'),text:G+(d>0?' ↑':(d<0?' ↓':''))}; }
    return {cls:col.cmp(g,answer),text:SHORT[G]||G};
  }
  var U=FND.game(root,{key:'classic',name:'Классика',max:MAX,store:store,render:render,stats:stats,
    row:function(){ return answer?FND.row(state,answer.id,MAX):null; },hide:function(){ AC.hide(); }}), $=U.$;

  /* ---------- Отрисовка ---------- */
  function render(){
    if(!state) return;
    FND.steps($,state,MAX);
    var used=state.guesses.length;
    var th='<div class="t-tr t-th"><span>Компания</span>'+COLS.map(function(c){ return c.info?'<span class="t-hd" tabindex="0">'+c.title+'<span class="t-hd-tip">'+infoHTML(c.key)+'</span></span>':'<span>'+c.title+'</span>'; }).join('')+'</div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id){
      var g=FND.get(id), win=id===answer.id;
      th+='<div class="t-tr'+(win?' t-win':'')+(id===justAdded?' t-new':'')+'"><span class="t-co">'+esc(g.name)+'</span>'+
        COLS.map(function(c,ci){ var r=cell(c,g); return '<span class="t-chip c'+ci+' '+r.cls+'">'+esc(r.text)+'</span>'; }).join('')+'</div>';
    });
    $('table').innerHTML=th; justAdded=null;
    $('play').style.display=state.done?'none':'';
    U.end(state,testMode,'<h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+(answer.exchange?' · '+esc(answer.exchange):'')+'</p>');
    stats();
  }
  function stats(){ FND.statsRender($,store,state,MAX,testMode); }

  /* ---------- Ввод: любая компания из общей базы ---------- */
  var AC=FND.autocomplete({root:root,$:$,submit:submit,
    search:function(q){ return FND.rank({items:FND.LIST,q:q,nameOf:function(c){return c.name;},altsOf:function(c){return c.aliases;},skip:function(c){return state.guesses.indexOf(c.id)>=0;}}); },
    label:function(c){ return [c.name,c.aliases,c.aliases[0]||'']; }});
  var input=AC.input;
  function submit(){
    if(!state||state.done) return;
    var n=norm(input.value);
    var pick=FND.LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id); justAdded=pick.id;
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    U.after(state,testMode,input);
  }
  U.testButton(function(){ if(!state) return; var cur=answer, c; do{ c=FND.get(P[Math.floor(Math.random()*P.length)]); }while(c===cur&&P.length>1);
    answer=c; testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false}; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); });
  $('capdate').textContent=CAP_DATE;

  FND.register({key:'classic',pool:P,seed:20261105,
    company:function(slug){ return FND.get(slug).id; }, label:function(slug){ return FND.get(slug).name; },
    boot:function(i){ answer=FND.get(P[i]); state=U.daily(answer.id); state.guesses=state.guesses.filter(function(id){ return FND.get(id); });
      $('mlSector').innerHTML=infoHTML('sector'); $('mlExchange').innerHTML=infoHTML('exchange'); AC.enable(); render(); }});
})();


/* ---------- Запуск, переключение игр, смена дня, панель тестировщика ----------
   Адрес вида #companies, #keywords, #quote, #classic.
   Тестовый режим: #test (для «Компаний») или #quote-test и т. п. */
(function(){
  FND.start();
  var KEYS=FND.GAMES.map(function(g){ return g[0]; });
  function show(){
    var k=(location.hash.replace('#','').split('-')[0])||'';
    if(KEYS.indexOf(k)<0) k='companies';
    KEYS.forEach(function(x){
      var el=document.querySelector('.fnd-game[data-game="'+x+'"]'); if(!el) return;
      var on=x===k, was=el.style.display!=='none';
      el.style.display=on?'':'none';
      if(on&&!was){ try{ el.dispatchEvent(new Event('fnd-show')); }catch(e){} }
    });
  }
  window.addEventListener('hashchange',function(){ show(); window.scrollTo(0,0); });
  show();

  /* Новый день: если страница открыта через полночь — перезагрузить, чтобы появилась новая загадка.
     Прогресс сохранён в браузере, игрок ничего не теряет. В тестовом режиме не перезагружаем. */
  var DAY0=FND.todayKey();
  function dayCheck(){ if(!FND.TEST&&FND.todayKey()!==DAY0) location.reload(); }
  setInterval(dayCheck,15000);
  document.addEventListener('visibilitychange',function(){ if(!document.hidden) dayCheck(); });

  /* Панель тестировщика: только если адрес открыт с -test (например #test или #quote-test) */
  if(FND.TEST){
    Array.prototype.forEach.call(document.querySelectorAll('.fnd-game .t-nav a[href^="#"]'),function(l){ l.setAttribute('href',l.getAttribute('href')+'-test'); });
    var bar=document.createElement('div');
    bar.style.cssText='position:fixed;left:12px;bottom:12px;z-index:9998;display:flex;gap:6px;flex-wrap:wrap;font:500 12px Inter,Arial,sans-serif;max-width:calc(100vw - 24px)';
    function btn(txt,fn){ var b=document.createElement('button'); b.type='button'; b.textContent=txt; b.style.cssText='border:0;border-radius:999px;padding:8px 12px;background:#2a2a2a;color:#f2f2f2;cursor:pointer;font:inherit;box-shadow:0 4px 14px rgba(0,0,0,.4)'; b.onclick=fn; bar.appendChild(b); return b; }
    btn('ТЕСТ · показать ответ',function(){ var g=document.querySelector('.fnd-game:not([style*="none"])'); alertBox('Ответ: '+(g?(g.getAttribute('data-test-answer')||'Сначала нажмите «Другая загадка (тест)» внизу игры'):'—'),4000); });
    /* Расписание на 14 дней вперёд: какая загадка в какой игре */
    btn('Расписание на 14 дней',function(){
      if(!FND.games.length||!FND.LIST.length) return;
      var d0=Math.max(1,FND.dayNumber()), days=FND.schedule(d0+13), G=FND.games, rows=[];
      for(var d=d0; d<=d0+13; d++){
        var dt=FND.dateOf(d);
        rows.push('<tr><td>'+('0'+dt.getDate()).slice(-2)+'.'+('0'+(dt.getMonth()+1)).slice(-2)+'</td>'+G.map(function(g){ var i=days[d][g.key]; return '<td>'+(i==null?'—':FND.esc(g.label(g.pool[i])))+'</td>'; }).join('')+'</tr>');
      }
      var names={}; FND.GAMES.forEach(function(x){ names[x[0]]=x[1]; });
      alertBox('<table style="border-collapse:collapse;color:#f2f2f2;font-size:12px"><tr style="color:#8c8c8c"><td>День</td>'+G.map(function(g){ return '<td>'+names[g.key]+'</td>'; }).join('')+'</tr>'+rows.join('')+'</table>',0,true);
    });
    btn('Сбросить весь прогресс',function(){ if(!window.confirm('Стереть прогресс, статистику и отметки о правилах во всех играх?')) return; try{ Object.keys(localStorage).filter(function(k){ return k.indexOf('fnd_')===0; }).forEach(function(k){ localStorage.removeItem(k); }); }catch(e){} location.reload(); });
    var tip=document.createElement('div'); tip.style.cssText='flex-basis:100%;display:none;background:#2a2a2a;color:#4ade80;border-radius:10px;padding:8px 12px;max-height:60vh;overflow:auto;cursor:pointer'; tip.title='Нажмите, чтобы закрыть'; tip.onclick=function(){ tip.style.display='none'; }; bar.appendChild(tip);
    function alertBox(s,ms,html){ if(html) tip.innerHTML=s.replace(/<td>/g,'<td style="padding:3px 10px 3px 0;white-space:nowrap">'); else tip.textContent=s; tip.style.display='block'; clearTimeout(tip._t); if(ms) tip._t=setTimeout(function(){ tip.style.display='none'; },ms); }
    document.body.appendChild(bar);
  }
})();
