/* finanedly · все игры · v3. Подключение в Tilda (блок T123):
   <div id="finanedly-app"></div>
   <script src="https://lapoyura.github.io/finanedly-data/finanedly.js"></script> */
(function(){
  var cs=document.currentScript, mount=document.getElementById('finanedly-app');
  if(!mount){ mount=document.createElement('div'); mount.id='finanedly-app'; if(cs&&cs.parentNode) cs.parentNode.insertBefore(mount,cs); else document.body.appendChild(mount); }
  if(mount.getAttribute('data-ok')) return; mount.setAttribute('data-ok','1');
  if(!document.querySelector('link[href*="family=Inter"]')){
    [['preconnect','https://fonts.googleapis.com'],['preconnect','https://fonts.gstatic.com'],['stylesheet','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap']].forEach(function(l){
      var e=document.createElement('link'); e.rel=l[0]; e.href=l[1]; if(l[1].indexOf('gstatic')>0) e.crossOrigin=''; document.head.appendChild(e); });
  }
  var st=document.createElement('style'); st.textContent="\n#fg1{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c;\n  --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13);\n  font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}\n#fg1 *{box-sizing:border-box;margin:0;padding:0}\n#fg1 button{font:inherit;cursor:pointer;color:inherit}\n#fg1 .t-wrap{max-width:1140px;margin:0 auto}\n/* верхняя панель */\n#fg1 .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}\n#fg1 .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}\n#fg1 .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}\n#fg1 .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}\n#fg1 .t-nav::-webkit-scrollbar{display:none}\n#fg1 .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}\n#fg1 .t-nav a:hover{color:var(--ink);background:var(--soft)}\n#fg1 .t-nav a.t-on{background:var(--ink);color:#111}\n#fg1 .t-icons{display:flex;gap:4px;justify-self:end}\n#fg1 .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}\n#fg1 .t-icon:hover{background:var(--panel);color:#fff}\n#fg1 .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}\n#fg1 .t-icon:hover .t-tip{opacity:1;transform:none}\n/* игровая зона */\n#fg1 .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}\n#fg1 .t-card{background:var(--panel);border-radius:24px;padding:20px}\n#fg1 .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}\n#fg1 .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}\n#fg1 .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}\n#fg1 .t-tile.t-lock svg{width:22px;height:22px}\n#fg1 .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}\n#fg1 .t-form{display:flex;gap:10px;position:relative;margin-top:16px}\n#fg1 .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}\n#fg1 .t-input::placeholder{color:#777}\n#fg1 .t-input:focus{border-color:#555}\n#fg1 .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}\n#fg1 .t-btn:hover{background:#fff}\n#fg1 .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg1 .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}\n#fg1 .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}\n#fg1 .t-list li small{color:var(--muted)}\n#fg1 .t-list li:hover,#fg1 .t-list li.t-act{background:var(--soft)}\n#fg1 .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}\n#fg1 .t-msg:empty{display:none}\n/* статус-бар попыток */\n#fg1 .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}\n#fg1 .t-steps{flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n#fg1 .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}\n#fg1 .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}\n#fg1 .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}\n#fg1 .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}\n#fg1 .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}\n#fg1 .t-stxt b{color:var(--ink);font-weight:600}\n/* финал */\n#fg1 .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}\n#fg1 .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}\n#fg1 .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}\n#fg1 .t-ahead small{font-size:13px;opacity:.9}\n#fg1 .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}\n#fg1 .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}\n#fg1 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:18px 22px 20px}\n#fg1 .t-arow span{font-size:13px;color:var(--muted)}\n/* попытки */\n#fg1 .t-note{font-size:13px;color:var(--muted);line-height:1.55}\n#fg1 .t-c-ok{color:var(--ok)}#fg1 .t-c-near{color:var(--near)}#fg1 .t-c-miss{color:var(--miss)}\n#fg1 .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}\n#fg1 .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}\n#fg1 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px;overflow:hidden}\n#fg1 .t-tr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1.4fr) minmax(0,.8fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}\n#fg1 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px}\n#fg1 .t-tr.t-win{background:rgba(74,222,128,.07)}\n#fg1 .t-n{color:var(--muted)}\n#fg1 .t-co{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#fg1 .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}\n#fg1 .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg1 .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}\n#fg1 .t-chip.ok{background:var(--okbg);color:var(--ok)}\n#fg1 .t-chip.near{background:var(--nearbg);color:var(--near)}\n#fg1 .t-chip.miss{background:var(--missbg);color:var(--miss)}\n#fg1 .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}\n#fg1 .t-dot:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n#fg1 .t-dot.ok{color:var(--ok)}#fg1 .t-dot.near{color:var(--near)}#fg1 .t-dot.miss{color:var(--miss)}\n#fg1 .t-dot span{color:var(--ink)}\n#fg1 .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}\n#fg1 .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}\n#fg1 .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}\n#fg1 .t-donate:hover{color:#fff;background:var(--soft)}\n#fg1 .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}\n#fg1 .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}\n#fg1 .t-toast.t-show{opacity:1}\n/* всплывающие окна */\n#fg1 .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}\n#fg1 .t-modal.t-show{display:flex}\n#fg1 .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}\n#fg1 .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}\n#fg1 .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}\n#fg1 .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}\n#fg1 .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}\n#fg1 .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}\n#fg1 .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}\n#fg1 .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}\n#fg1 .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}\n#fg1 .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}\n#fg1 .t-tabs button.t-on{background:var(--ink);color:#111}\n#fg1 .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n#fg1 .t-num{background:var(--card);border-radius:14px;padding:12px}\n#fg1 .t-num b{display:block;font-size:22px;font-weight:500}\n#fg1 .t-num span{font-size:11px;color:var(--muted)}\n#fg1 .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}\n#fg1 .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}\n#fg1 .t-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}\n#fg1 .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}\n#fg1 .t-col em{font-style:normal;font-size:11px;color:var(--muted)}\n#fg1 .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}\n#fg1 .t-col div.t-today{background:var(--ink)}\n#fg1 .t-xs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}\n#fg1 .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}\n#fg1 .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}\n/* адаптив */\n#fg1 .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}\n#fg1 .t-list li b{font-weight:700;color:#fff}\n#fg1 .t-list li small{flex:none;margin-left:12px}\n#fg1 .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}\n#fg1 .t-rbtns .t-btn{margin:0}\n#fg1 .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}\n#fg1 .t-skip:hover{color:var(--ink);border-color:#444}\n#fg1 .t-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#fg1 .t-bar .t-nav{min-width:0}\n#fg1 .t-mode{flex:none;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;letter-spacing:.01em;transition:filter .15s}\n#fg1 .t-mode:hover{filter:brightness(1.08)}\n#fg1 .t-mode i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);flex:none}\n#fg1 .t-mode.t-easy{background:linear-gradient(135deg,#16a34a,#4ade80)}\n#fg1 .t-mode.t-hard{background:linear-gradient(135deg,#dc2626,#f87171)}\n@media (max-width:760px){\n  #fg1 .t-game{margin-top:24px}\n}\n@media (max-width:600px){\n  #fg1{padding:14px 10px 24px}\n  #fg1 .t-card{padding:14px;border-radius:20px}\n  #fg1 .t-emojis{gap:6px}\n  #fg1 .t-tile{border-radius:14px}\n  #fg1 .t-form{flex-direction:column}\n  #fg1 .t-tr{grid-template-columns:1fr auto;row-gap:8px;padding:12px 14px}\n  #fg1 .t-th{display:none}\n  #fg1 .t-hide-m{display:none}\n  #fg1 .t-tr>.t-co{grid-column:1;grid-row:1}\n  #fg1 .t-tr>.t-cty{grid-column:1;grid-row:2}\n  #fg1 .t-tr>.t-yr{grid-column:2;grid-row:1 / 3;justify-self:end;align-self:center}\n  #fg1 .t-nums{grid-template-columns:repeat(2,1fr)}\n}\n\n\n#fg2{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c;\n  --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13);\n  font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}\n#fg2 *{box-sizing:border-box;margin:0;padding:0}\n#fg2 button{font:inherit;cursor:pointer;color:inherit}\n#fg2 .t-wrap{max-width:1140px;margin:0 auto}\n/* верхняя панель */\n#fg2 .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}\n#fg2 .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}\n#fg2 .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}\n#fg2 .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}\n#fg2 .t-nav::-webkit-scrollbar{display:none}\n#fg2 .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}\n#fg2 .t-nav a:hover{color:var(--ink);background:var(--soft)}\n#fg2 .t-nav a.t-on{background:var(--ink);color:#111}\n#fg2 .t-icons{display:flex;gap:4px;justify-self:end}\n#fg2 .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}\n#fg2 .t-icon:hover{background:var(--panel);color:#fff}\n#fg2 .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}\n#fg2 .t-icon:hover .t-tip{opacity:1;transform:none}\n/* игровая зона */\n#fg2 .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}\n#fg2 .t-card{background:var(--panel);border-radius:24px;padding:20px}\n#fg2 .t-chartbox{background:var(--card);border-radius:18px;padding:12px 8px 4px}\n#fg2 .t-chartbox svg{display:block;width:100%;height:auto}\n#fg2 .t-range{font-size:12px;color:var(--muted);margin:8px 4px 0}\n#fg2 .t-range b{color:var(--ink);font-weight:500}\n#fg2 .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}\n#fg2 .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}\n#fg2 .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}\n#fg2 .t-tile.t-lock svg{width:22px;height:22px}\n#fg2 .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}\n#fg2 .t-form{display:flex;gap:10px;position:relative;margin-top:16px}\n#fg2 .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}\n#fg2 .t-input::placeholder{color:#777}\n#fg2 .t-input:focus{border-color:#555}\n#fg2 .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}\n#fg2 .t-btn:hover{background:#fff}\n#fg2 .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg2 .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}\n#fg2 .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}\n#fg2 .t-list li small{color:var(--muted)}\n#fg2 .t-list li:hover,#fg2 .t-list li.t-act{background:var(--soft)}\n#fg2 .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}\n#fg2 .t-msg:empty{display:none}\n/* статус-бар попыток */\n#fg2 .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}\n#fg2 .t-steps{flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n#fg2 .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}\n#fg2 .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}\n#fg2 .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}\n#fg2 .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}\n#fg2 .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}\n#fg2 .t-stxt b{color:var(--ink);font-weight:600}\n/* финал */\n#fg2 .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}\n#fg2 .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}\n#fg2 .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}\n#fg2 .t-ahead small{font-size:13px;opacity:.9}\n#fg2 .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}\n#fg2 .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}\n#fg2 .t-about{padding:18px 22px 0;font-size:14px;line-height:1.55;color:#d9d9d9}\n#fg2 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:18px 22px 20px}\n#fg2 .t-arow span{font-size:13px;color:var(--muted)}\n/* попытки */\n#fg2 .t-note{font-size:13px;color:var(--muted);line-height:1.55}\n#fg2 .t-c-ok{color:var(--ok)}#fg2 .t-c-near{color:var(--near)}#fg2 .t-c-miss{color:var(--miss)}\n#fg2 .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}\n#fg2 .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}\n#fg2 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px;overflow:hidden}\n#fg2 .t-tr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1.4fr) minmax(0,.8fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}\n#fg2 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px}\n#fg2 .t-tr.t-win{background:rgba(74,222,128,.07)}\n#fg2 .t-n{color:var(--muted)}\n#fg2 .t-co{font-weight:500;min-width:0;line-height:1.3}\n#fg2 .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}\n#fg2 .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg2 .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}\n#fg2 .t-chip.ok{background:var(--okbg);color:var(--ok)}\n#fg2 .t-chip.near{background:var(--nearbg);color:var(--near)}\n#fg2 .t-chip.miss{background:var(--missbg);color:var(--miss)}\n#fg2 .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}\n#fg2 .t-dot:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n#fg2 .t-dot.ok{color:var(--ok)}#fg2 .t-dot.near{color:var(--near)}#fg2 .t-dot.miss{color:var(--miss)}\n#fg2 .t-dot span{color:var(--ink)}\n#fg2 .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}\n#fg2 .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}\n#fg2 .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}\n#fg2 .t-donate:hover{color:#fff;background:var(--soft)}\n#fg2 .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}\n#fg2 .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}\n#fg2 .t-toast.t-show{opacity:1}\n/* всплывающие окна */\n#fg2 .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}\n#fg2 .t-modal.t-show{display:flex}\n#fg2 .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}\n#fg2 .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}\n#fg2 .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}\n#fg2 .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}\n#fg2 .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}\n#fg2 .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}\n#fg2 .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}\n#fg2 .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}\n#fg2 .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}\n#fg2 .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}\n#fg2 .t-tabs button.t-on{background:var(--ink);color:#111}\n#fg2 .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n#fg2 .t-num{background:var(--card);border-radius:14px;padding:12px}\n#fg2 .t-num b{display:block;font-size:22px;font-weight:500}\n#fg2 .t-num span{font-size:11px;color:var(--muted)}\n#fg2 .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}\n#fg2 .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}\n#fg2 .t-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}\n#fg2 .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}\n#fg2 .t-col em{font-style:normal;font-size:11px;color:var(--muted)}\n#fg2 .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}\n#fg2 .t-col div.t-today{background:var(--ink)}\n#fg2 .t-xs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}\n#fg2 .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}\n#fg2 .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}\n/* адаптив */\n#fg2 .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}\n#fg2 .t-list li b{font-weight:700;color:#fff}\n#fg2 .t-list li small{flex:none;margin-left:12px}\n#fg2 .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}\n#fg2 .t-rbtns .t-btn{margin:0}\n#fg2 .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}\n#fg2 .t-skip:hover{color:var(--ink);border-color:#444}\n#fg2 .t-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#fg2 .t-bar .t-nav{min-width:0}\n#fg2 .t-mode{flex:none;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;letter-spacing:.01em;transition:filter .15s}\n#fg2 .t-mode:hover{filter:brightness(1.08)}\n#fg2 .t-mode i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);flex:none}\n#fg2 .t-mode.t-easy{background:linear-gradient(135deg,#16a34a,#4ade80)}\n#fg2 .t-mode.t-hard{background:linear-gradient(135deg,#dc2626,#f87171)}\n@media (max-width:760px){\n  #fg2 .t-game{margin-top:24px}\n}\n@media (max-width:600px){\n  #fg2{padding:14px 10px 24px}\n  #fg2 .t-card{padding:14px;border-radius:20px}\n  #fg2 .t-chartbox{background:var(--card);border-radius:18px;padding:12px 8px 4px}\n#fg2 .t-chartbox svg{display:block;width:100%;height:auto}\n#fg2 .t-range{font-size:12px;color:var(--muted);margin:8px 4px 0}\n#fg2 .t-range b{color:var(--ink);font-weight:500}\n#fg2 .t-emojis{gap:6px}\n  #fg2 .t-tile{border-radius:14px}\n  #fg2 .t-form{flex-direction:column}\n  #fg2 .t-tr{grid-template-columns:1fr auto;row-gap:8px;padding:12px 14px}\n  #fg2 .t-th{display:none}\n  #fg2 .t-hide-m{display:none}\n  #fg2 .t-tr>.t-co{grid-column:1;grid-row:1}\n  #fg2 .t-tr>.t-cty{grid-column:1;grid-row:2}\n  #fg2 .t-tr>.t-yr{grid-column:2;grid-row:1 / 3;justify-self:end;align-self:center}\n  #fg2 .t-nums{grid-template-columns:repeat(2,1fr)}\n}\n\n\n#fg3{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c;\n  --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13);\n  font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}\n#fg3 *{box-sizing:border-box;margin:0;padding:0}\n#fg3 button{font:inherit;cursor:pointer;color:inherit}\n#fg3 .t-wrap{max-width:1140px;margin:0 auto}\n/* верхняя панель */\n#fg3 .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}\n#fg3 .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}\n#fg3 .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}\n#fg3 .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}\n#fg3 .t-nav::-webkit-scrollbar{display:none}\n#fg3 .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}\n#fg3 .t-nav a:hover{color:var(--ink);background:var(--soft)}\n#fg3 .t-nav a.t-on{background:var(--ink);color:#111}\n#fg3 .t-icons{display:flex;gap:4px;justify-self:end}\n#fg3 .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}\n#fg3 .t-icon:hover{background:var(--panel);color:#fff}\n#fg3 .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}\n#fg3 .t-icon:hover .t-tip{opacity:1;transform:none}\n/* игровая зона */\n#fg3 .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}\n#fg3 .t-card{background:var(--panel);border-radius:24px;padding:20px}\n#fg3 .t-words{list-style:none;display:flex;flex-direction:column;gap:8px}\n#fg3 .t-word{display:flex;align-items:center;gap:14px;background:var(--card);border-radius:16px;padding:14px 16px;font-size:16px;min-height:54px}\n#fg3 .t-word b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--soft);font-size:12px;font-weight:600;color:#aaa;display:flex;align-items:center;justify-content:center}\n#fg3 .t-word.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555;font-size:13px}\n#fg3 .t-word.t-lock svg{width:16px;height:16px}\n#fg3 .t-word.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n#fg3 .t-src{padding:14px 22px 0;font-size:13px;color:var(--muted)}\n#fg3 .t-src a{color:#ff8a5c;text-decoration:none}\n#fg3 .t-src a:hover{text-decoration:underline}\n#fg3 .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}\n#fg3 .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}\n#fg3 .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}\n#fg3 .t-tile.t-lock svg{width:22px;height:22px}\n#fg3 .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}\n#fg3 .t-form{display:flex;gap:10px;position:relative;margin-top:16px}\n#fg3 .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}\n#fg3 .t-input::placeholder{color:#777}\n#fg3 .t-input:focus{border-color:#555}\n#fg3 .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}\n#fg3 .t-btn:hover{background:#fff}\n#fg3 .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg3 .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}\n#fg3 .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}\n#fg3 .t-list li small{color:var(--muted)}\n#fg3 .t-list li:hover,#fg3 .t-list li.t-act{background:var(--soft)}\n#fg3 .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}\n#fg3 .t-msg:empty{display:none}\n/* статус-бар попыток */\n#fg3 .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}\n#fg3 .t-steps{flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n#fg3 .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}\n#fg3 .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}\n#fg3 .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}\n#fg3 .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}\n#fg3 .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}\n#fg3 .t-stxt b{color:var(--ink);font-weight:600}\n/* финал */\n#fg3 .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}\n#fg3 .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}\n#fg3 .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}\n#fg3 .t-ahead small{font-size:13px;opacity:.9}\n#fg3 .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}\n#fg3 .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}\n#fg3 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:16px 22px 20px}\n#fg3 .t-arow span{font-size:13px;color:var(--muted)}\n/* попытки */\n#fg3 .t-note{font-size:13px;color:var(--muted);line-height:1.55}\n#fg3 .t-c-ok{color:var(--ok)}#fg3 .t-c-near{color:var(--near)}#fg3 .t-c-miss{color:var(--miss)}\n#fg3 .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}\n#fg3 .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}\n#fg3 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px;overflow:hidden}\n#fg3 .t-tr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1.4fr) minmax(0,.8fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}\n#fg3 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px}\n#fg3 .t-tr.t-win{background:rgba(74,222,128,.07)}\n#fg3 .t-n{color:var(--muted)}\n#fg3 .t-co{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#fg3 .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}\n#fg3 .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg3 .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}\n#fg3 .t-chip.ok{background:var(--okbg);color:var(--ok)}\n#fg3 .t-chip.near{background:var(--nearbg);color:var(--near)}\n#fg3 .t-chip.miss{background:var(--missbg);color:var(--miss)}\n#fg3 .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}\n#fg3 .t-dot:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n#fg3 .t-dot.ok{color:var(--ok)}#fg3 .t-dot.near{color:var(--near)}#fg3 .t-dot.miss{color:var(--miss)}\n#fg3 .t-dot span{color:var(--ink)}\n#fg3 .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}\n#fg3 .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}\n#fg3 .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}\n#fg3 .t-donate:hover{color:#fff;background:var(--soft)}\n#fg3 .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}\n#fg3 .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}\n#fg3 .t-toast.t-show{opacity:1}\n/* всплывающие окна */\n#fg3 .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}\n#fg3 .t-modal.t-show{display:flex}\n#fg3 .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}\n#fg3 .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}\n#fg3 .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}\n#fg3 .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}\n#fg3 .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}\n#fg3 .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}\n#fg3 .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}\n#fg3 .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}\n#fg3 .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}\n#fg3 .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}\n#fg3 .t-tabs button.t-on{background:var(--ink);color:#111}\n#fg3 .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n#fg3 .t-num{background:var(--card);border-radius:14px;padding:12px}\n#fg3 .t-num b{display:block;font-size:22px;font-weight:500}\n#fg3 .t-num span{font-size:11px;color:var(--muted)}\n#fg3 .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}\n#fg3 .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}\n#fg3 .t-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}\n#fg3 .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}\n#fg3 .t-col em{font-style:normal;font-size:11px;color:var(--muted)}\n#fg3 .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}\n#fg3 .t-col div.t-today{background:var(--ink)}\n#fg3 .t-xs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}\n#fg3 .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}\n#fg3 .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}\n/* адаптив */\n#fg3 .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}\n#fg3 .t-list li b{font-weight:700;color:#fff}\n#fg3 .t-list li small{flex:none;margin-left:12px}\n#fg3 .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}\n#fg3 .t-rbtns .t-btn{margin:0}\n#fg3 .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}\n#fg3 .t-skip:hover{color:var(--ink);border-color:#444}\n#fg3 .t-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#fg3 .t-bar .t-nav{min-width:0}\n#fg3 .t-mode{flex:none;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;letter-spacing:.01em;transition:filter .15s}\n#fg3 .t-mode:hover{filter:brightness(1.08)}\n#fg3 .t-mode i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);flex:none}\n#fg3 .t-mode.t-easy{background:linear-gradient(135deg,#16a34a,#4ade80)}\n#fg3 .t-mode.t-hard{background:linear-gradient(135deg,#dc2626,#f87171)}\n@media (max-width:760px){\n  #fg3 .t-game{margin-top:24px}\n}\n@media (max-width:600px){\n  #fg3{padding:14px 10px 24px}\n  #fg3 .t-card{padding:14px;border-radius:20px}\n  #fg3 .t-words{list-style:none;display:flex;flex-direction:column;gap:8px}\n#fg3 .t-word{display:flex;align-items:center;gap:14px;background:var(--card);border-radius:16px;padding:14px 16px;font-size:16px;min-height:54px}\n#fg3 .t-word b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--soft);font-size:12px;font-weight:600;color:#aaa;display:flex;align-items:center;justify-content:center}\n#fg3 .t-word.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555;font-size:13px}\n#fg3 .t-word.t-lock svg{width:16px;height:16px}\n#fg3 .t-word.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n#fg3 .t-src{padding:14px 22px 0;font-size:13px;color:var(--muted)}\n#fg3 .t-src a{color:#ff8a5c;text-decoration:none}\n#fg3 .t-src a:hover{text-decoration:underline}\n#fg3 .t-emojis{gap:6px}\n  #fg3 .t-tile{border-radius:14px}\n  #fg3 .t-form{flex-direction:column}\n  #fg3 .t-tr{grid-template-columns:1fr auto;row-gap:8px;padding:12px 14px}\n  #fg3 .t-th{display:none}\n  #fg3 .t-hide-m{display:none}\n  #fg3 .t-tr>.t-co{grid-column:1;grid-row:1}\n  #fg3 .t-tr>.t-cty{grid-column:1;grid-row:2}\n  #fg3 .t-tr>.t-yr{grid-column:2;grid-row:1 / 3;justify-self:end;align-self:center}\n  #fg3 .t-nums{grid-template-columns:repeat(2,1fr)}\n}\n\n\n#fg4{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c;\n  --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13);\n  font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}\n#fg4 *{box-sizing:border-box;margin:0;padding:0}\n#fg4 button{font:inherit;cursor:pointer;color:inherit}\n#fg4 .t-wrap{max-width:1140px;margin:0 auto}\n/* верхняя панель */\n#fg4 .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}\n#fg4 .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}\n#fg4 .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}\n#fg4 .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}\n#fg4 .t-nav::-webkit-scrollbar{display:none}\n#fg4 .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}\n#fg4 .t-nav a:hover{color:var(--ink);background:var(--soft)}\n#fg4 .t-nav a.t-on{background:var(--ink);color:#111}\n#fg4 .t-icons{display:flex;gap:4px;justify-self:end;align-items:center}\n#fg4 .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}\n#fg4 .t-icon:hover{background:var(--panel);color:#fff}\n#fg4 .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}\n#fg4 .t-icon:hover .t-tip{opacity:1;transform:none}\n/* игровая зона */\n#fg4 .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}\n#fg4 .t-card{background:var(--panel);border-radius:24px;padding:20px}\n#fg4 .t-words{list-style:none;display:flex;flex-direction:column;gap:8px}\n#fg4 .t-word{display:flex;align-items:center;gap:14px;background:var(--card);border-radius:16px;padding:14px 16px;font-size:16px;min-height:54px}\n#fg4 .t-word b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--soft);font-size:12px;font-weight:600;color:#aaa;display:flex;align-items:center;justify-content:center}\n#fg4 .t-word.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555;font-size:13px}\n#fg4 .t-word.t-lock svg{width:16px;height:16px}\n#fg4 .t-word.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n#fg4 .t-src{padding:14px 22px 0;font-size:13px;color:var(--muted)}\n#fg4 .t-src a{color:#ff8a5c;text-decoration:none}\n#fg4 .t-src a:hover{text-decoration:underline}\n#fg4 .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}\n#fg4 .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}\n#fg4 .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}\n#fg4 .t-tile.t-lock svg{width:22px;height:22px}\n#fg4 .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}\n#fg4 .t-form{display:flex;gap:10px;position:relative;margin-top:16px}\n#fg4 .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}\n#fg4 .t-input::placeholder{color:#777}\n#fg4 .t-input:focus{border-color:#555}\n#fg4 .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}\n#fg4 .t-btn:hover{background:#fff}\n#fg4 .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg4 .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}\n#fg4 .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}\n#fg4 .t-list li small{color:var(--muted)}\n#fg4 .t-list li:hover,#fg4 .t-list li.t-act{background:var(--soft)}\n#fg4 .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}\n#fg4 .t-msg:empty{display:none}\n/* статус-бар попыток */\n#fg4 .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}\n#fg4 .t-steps{flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n#fg4 .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}\n#fg4 .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}\n#fg4 .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}\n#fg4 .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}\n#fg4 .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}\n#fg4 .t-stxt b{color:var(--ink);font-weight:600}\n/* финал */\n#fg4 .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}\n#fg4 .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}\n#fg4 .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}\n#fg4 .t-ahead small{font-size:13px;opacity:.9}\n#fg4 .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}\n#fg4 .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}\n#fg4 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:16px 22px 20px}\n#fg4 .t-arow span{font-size:13px;color:var(--muted)}\n/* попытки */\n#fg4 .t-note{font-size:13px;color:var(--muted);line-height:1.55}\n#fg4 .t-c-ok{color:var(--ok)}#fg4 .t-c-near{color:var(--near)}#fg4 .t-c-miss{color:var(--miss)}\n#fg4 .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}\n#fg4 .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}\n#fg4 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px;overflow:hidden}\n#fg4 .t-tr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1.4fr) minmax(0,.8fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}\n#fg4 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px}\n#fg4 .t-tr.t-win{background:rgba(74,222,128,.07)}\n#fg4 .t-n{color:var(--muted)}\n#fg4 .t-co{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#fg4 .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}\n#fg4 .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg4 .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}\n#fg4 .t-chip.ok{background:var(--okbg);color:var(--ok)}\n#fg4 .t-chip.near{background:var(--nearbg);color:var(--near)}\n#fg4 .t-chip.miss{background:var(--missbg);color:var(--miss)}\n#fg4 .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}\n#fg4 .t-dot:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n#fg4 .t-dot.ok{color:var(--ok)}#fg4 .t-dot.near{color:var(--near)}#fg4 .t-dot.miss{color:var(--miss)}\n#fg4 .t-dot span{color:var(--ink)}\n#fg4 .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}\n#fg4 .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}\n#fg4 .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}\n#fg4 .t-donate:hover{color:#fff;background:var(--soft)}\n#fg4 .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}\n#fg4 .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}\n#fg4 .t-toast.t-show{opacity:1}\n/* всплывающие окна */\n#fg4 .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}\n#fg4 .t-modal.t-show{display:flex}\n#fg4 .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}\n#fg4 .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}\n#fg4 .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}\n#fg4 .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}\n#fg4 .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}\n#fg4 .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}\n#fg4 .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}\n#fg4 .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}\n#fg4 .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}\n#fg4 .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}\n#fg4 .t-tabs button.t-on{background:var(--ink);color:#111}\n#fg4 .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n#fg4 .t-num{background:var(--card);border-radius:14px;padding:12px}\n#fg4 .t-num b{display:block;font-size:22px;font-weight:500}\n#fg4 .t-num span{font-size:11px;color:var(--muted)}\n#fg4 .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}\n#fg4 .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}\n#fg4 .t-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}\n#fg4 .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}\n#fg4 .t-col em{font-style:normal;font-size:11px;color:var(--muted)}\n#fg4 .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}\n#fg4 .t-col div.t-today{background:var(--ink)}\n#fg4 .t-xs{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}\n#fg4 .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}\n#fg4 .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}\n/* адаптив */\n#fg4 .t-diff{display:inline-flex;gap:2px;background:var(--panel);border-radius:999px;padding:4px;margin-right:6px;align-self:center}\n#fg4 .t-diff button{border:0;background:transparent;border-radius:999px;padding:7px 14px;font-size:13px;color:#aaa}\n#fg4 .t-diff button.t-on{background:var(--ink);color:#111}\n#fg4 .t-quote{font-family:Georgia,\"Times New Roman\",serif;font-size:clamp(20px,3.2vw,26px);line-height:1.4;padding:24px 24px 22px;background:var(--card);border-radius:18px;position:relative}\n#fg4 .t-quote:before{content:\"“\";position:absolute;top:-4px;left:12px;font-size:60px;line-height:1;color:var(--or1);opacity:.55}\n#fg4 .t-hints{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}\n#fg4 .t-hint{background:var(--card);border-radius:14px;padding:10px 12px;min-height:52px;display:flex;align-items:center;justify-content:center;text-align:center}\n#fg4 .t-hint span{font-size:16px;font-weight:500}\n#fg4 .t-hint.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px)}\n#fg4 .t-hint.t-lock span{color:#555;display:flex}\n#fg4 .t-hint.t-lock svg{width:16px;height:16px}\n#fg4 .t-hint.t-emo span{font-size:26px;line-height:1}\n#fg4 .t-hint.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n#fg4 .t-orig{padding:16px 22px 0;font-size:14px;color:#d9d9d9;font-style:italic;line-height:1.5}\n#fg4 .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}\n#fg4 .t-list li b{font-weight:700;color:#fff}\n#fg4 .t-list li small{flex:none;margin-left:12px}\n#fg4 .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}\n#fg4 .t-rbtns .t-btn{margin:0}\n#fg4 .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}\n#fg4 .t-skip:hover{color:var(--ink);border-color:#444}\n#fg4 .t-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#fg4 .t-bar .t-nav{min-width:0}\n#fg4 .t-mode{flex:none;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;letter-spacing:.01em;transition:filter .15s}\n#fg4 .t-mode:hover{filter:brightness(1.08)}\n#fg4 .t-mode i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);flex:none}\n#fg4 .t-mode.t-easy{background:linear-gradient(135deg,#16a34a,#4ade80)}\n#fg4 .t-mode.t-hard{background:linear-gradient(135deg,#dc2626,#f87171)}\n@media (max-width:760px){\n  #fg4 .t-game{margin-top:24px}\n}\n@media (max-width:600px){\n  #fg4 .t-quote{padding:22px 18px 18px}\n  #fg4{padding:14px 10px 24px}\n  #fg4 .t-card{padding:14px;border-radius:20px}\n#fg4 .t-words{list-style:none;display:flex;flex-direction:column;gap:8px}\n#fg4 .t-word{display:flex;align-items:center;gap:14px;background:var(--card);border-radius:16px;padding:14px 16px;font-size:16px;min-height:54px}\n#fg4 .t-word b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--soft);font-size:12px;font-weight:600;color:#aaa;display:flex;align-items:center;justify-content:center}\n#fg4 .t-word.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555;font-size:13px}\n#fg4 .t-word.t-lock svg{width:16px;height:16px}\n#fg4 .t-word.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n#fg4 .t-src{padding:14px 22px 0;font-size:13px;color:var(--muted)}\n#fg4 .t-src a{color:#ff8a5c;text-decoration:none}\n#fg4 .t-src a:hover{text-decoration:underline}\n#fg4 .t-emojis{gap:6px}\n  #fg4 .t-tile{border-radius:14px}\n  #fg4 .t-form{flex-direction:column}\n  #fg4 .t-tr{grid-template-columns:1fr auto;row-gap:8px;padding:12px 14px}\n  #fg4 .t-th{display:none}\n  #fg4 .t-hide-m{display:none}\n  #fg4 .t-tr>.t-co{grid-column:1;grid-row:1}\n  #fg4 .t-tr>.t-cty{grid-column:1;grid-row:2}\n  #fg4 .t-tr>.t-yr{grid-column:2;grid-row:1 / 3;justify-self:end;align-self:center}\n  #fg4 .t-nums{grid-template-columns:repeat(2,1fr)}\n}\n\n\n#fg5{--bg:#111111;--panel:#191919;--card:#1f1f1f;--soft:#262626;--line:#2c2c2c;--ink:#f2f2f2;--muted:#8c8c8c;\n  --or1:#f0532b;--or2:#ff8a5c;--gr1:#16a34a;--gr2:#4ade80;--ok:#4ade80;--okbg:rgba(74,222,128,.13);--near:#facc15;--nearbg:rgba(250,204,21,.13);--miss:#f87171;--missbg:rgba(248,113,113,.13);\n  font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);padding:24px 16px 32px;text-align:left;-webkit-font-smoothing:antialiased;min-height:100vh}\n#fg5 *{box-sizing:border-box;margin:0;padding:0}\n#fg5 button{font:inherit;cursor:pointer;color:inherit}\n#fg5 .t-wrap{max-width:1140px;margin:0 auto}\n/* верхняя панель */\n#fg5 .t-top{display:flex;justify-content:space-between;align-items:center;gap:12px}\n#fg5 .t-logo{text-decoration:none;color:var(--ink);font-weight:700;font-size:20px;letter-spacing:-.02em}\n#fg5 .t-logo span{background:linear-gradient(135deg,var(--or1),var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}\n#fg5 .t-nav{display:flex;gap:4px;background:var(--panel);border-radius:999px;padding:6px;overflow-x:auto;scrollbar-width:none}\n#fg5 .t-nav::-webkit-scrollbar{display:none}\n#fg5 .t-nav a{white-space:nowrap;text-decoration:none;color:#a8a8a8;font-size:14px;padding:9px 16px;border-radius:999px;transition:background .15s,color .15s}\n#fg5 .t-nav a:hover{color:var(--ink);background:var(--soft)}\n#fg5 .t-nav a.t-on{background:var(--ink);color:#111}\n#fg5 .t-icons{display:flex;gap:4px;justify-self:end}\n#fg5 .t-icon{position:relative;width:40px;height:40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;color:#cfcfcf;transition:background .15s}\n#fg5 .t-icon:hover{background:var(--panel);color:#fff}\n#fg5 .t-icon .t-tip{position:absolute;top:calc(100% + 8px);right:0;background:var(--ink);color:#111;font-size:12px;font-weight:500;white-space:nowrap;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);transition:.15s;pointer-events:none;z-index:5}\n#fg5 .t-icon:hover .t-tip{opacity:1;transform:none}\n/* игровая зона */\n#fg5 .t-game{max-width:720px;margin:40px auto 0;display:flex;flex-direction:column;gap:14px}\n#fg5 .t-card{background:var(--panel);border-radius:24px;padding:20px}\n#fg5 .t-game{max-width:980px}\n#fg5 .t-tr .t-chip{font-size:12.5px;padding:4px 9px}\n#fg5 .t-intro{font-size:15px;color:#cfcfcf;margin:2px 4px 0}\n#fg5 .t-giveup{border:0;background:var(--card);color:#bbb;border-radius:999px;padding:8px 14px;font-size:13px}\n#fg5 .t-giveup:hover{color:#fff;background:var(--soft)}\n#fg5 .t-tr.t-new .t-chip{animation:tFlip .45s ease both}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(2){animation-delay:.08s}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(3){animation-delay:.16s}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(4){animation-delay:.24s}\n@keyframes tFlip{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}\n#fg5 .t-emojis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}\n#fg5 .t-tile{aspect-ratio:1;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:clamp(30px,7vw,54px)}\n#fg5 .t-tile.t-lock{background:repeating-linear-gradient(135deg,#1d1d1d 0 5px,#232323 5px 10px);color:#555}\n#fg5 .t-tile.t-lock svg{width:22px;height:22px}\n#fg5 .t-tile.t-fresh{box-shadow:inset 0 0 0 2px var(--or1);animation:tPop .4s ease}\n@keyframes tPop{0%{transform:scale(.7);opacity:0}100%{transform:none;opacity:1}}\n#fg5 .t-form{display:flex;gap:10px;position:relative;margin-top:16px}\n#fg5 .t-input{flex:1;min-width:0;font:inherit;font-size:15px;padding:14px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);outline:none;color:var(--ink)}\n#fg5 .t-input::placeholder{color:#777}\n#fg5 .t-input:focus{border-color:#555}\n#fg5 .t-btn{border:0;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:500;background:var(--ink);color:#111;white-space:nowrap}\n#fg5 .t-btn:hover{background:#fff}\n#fg5 .t-btn.t-orange{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg5 .t-list{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);list-style:none;z-index:30;padding:6px;display:none;max-height:280px;overflow:auto}\n#fg5 .t-list li{padding:10px 14px;border-radius:12px;font-size:14px;display:flex;justify-content:space-between;cursor:pointer}\n#fg5 .t-list li small{color:var(--muted)}\n#fg5 .t-list li:hover,#fg5 .t-list li.t-act{background:var(--soft)}\n#fg5 .t-msg{font-size:13px;color:var(--miss);min-height:0;margin:8px 0 0 20px}\n#fg5 .t-msg:empty{display:none}\n/* статус-бар попыток */\n#fg5 .t-status{display:flex;align-items:center;gap:14px;margin-top:16px}\n#fg5 .t-steps{flex:1;display:grid;grid-template-columns:repeat(7,1fr);gap:5px}\n#fg5 .t-steps i{height:10px;border-radius:999px;background:repeating-linear-gradient(135deg,#232323 0 4px,#2b2b2b 4px 8px)}\n#fg5 .t-steps i.t-used{background:linear-gradient(90deg,var(--or1),var(--or2))}\n#fg5 .t-steps i.t-win{background:linear-gradient(90deg,var(--gr1),var(--gr2))}\n#fg5 .t-steps i.t-cur{box-shadow:inset 0 0 0 1.5px #666}\n#fg5 .t-stxt{font-size:13px;color:var(--muted);white-space:nowrap}\n#fg5 .t-stxt b{color:var(--ink);font-weight:600}\n/* финал */\n#fg5 .t-answer{border-radius:24px;overflow:hidden;background:var(--panel)}\n#fg5 .t-ahead{background:linear-gradient(135deg,var(--or1),var(--or2));padding:20px 22px;color:#fff}\n#fg5 .t-answer.t-won .t-ahead{background:linear-gradient(135deg,var(--gr1),var(--gr2))}\n#fg5 .t-ahead small{font-size:13px;opacity:.9}\n#fg5 .t-ahead h2{font-size:clamp(26px,4vw,36px);font-weight:500;letter-spacing:-.02em;margin-top:4px;line-height:1.1}\n#fg5 .t-ahead p{font-size:13px;opacity:.9;margin-top:6px}\n#fg5 .t-arow{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:18px 22px 20px}\n#fg5 .t-arow span{font-size:13px;color:var(--muted)}\n/* попытки */\n#fg5 .t-note{font-size:13px;color:var(--muted);line-height:1.55}\n#fg5 .t-c-ok{color:var(--ok)}#fg5 .t-c-near{color:var(--near)}#fg5 .t-c-miss{color:var(--miss)}\n#fg5 .t-h2{font-size:18px;font-weight:500;letter-spacing:-.01em;display:flex;justify-content:space-between;align-items:baseline;gap:10px}\n#fg5 .t-h2 small{font-size:12px;color:var(--muted);font-weight:400}\n#fg5 .t-table{margin-top:14px;border:1px solid var(--line);border-radius:18px}\n#fg5 .t-table>.t-tr:last-child{border-radius:0 0 18px 18px}\n#fg5 .t-hd{position:relative;cursor:help;text-decoration:underline dotted;text-underline-offset:3px;outline:none}\n#fg5 .t-hd-tip{position:absolute;top:calc(100% + 10px);left:-12px;width:280px;background:#2a2a2a;color:var(--ink);font-size:12.5px;line-height:1.5;padding:12px 14px;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.45);opacity:0;visibility:hidden;transform:translateY(-4px);transition:.15s;z-index:20;text-decoration:none;cursor:default}\n#fg5 .t-hd:hover .t-hd-tip,#fg5 .t-hd:focus .t-hd-tip{opacity:1;visibility:visible;transform:none}\n#fg5 .t-hd-tip b{display:block;font-weight:500;color:var(--muted);margin-bottom:6px}\n#fg5 .t-hd-tip div{padding:3px 0;border-top:1px solid rgba(255,255,255,.06)}\n#fg5 .t-hd-tip em{font-style:normal;color:var(--muted)}\n#fg5 .t-mlists{display:none;margin-top:10px;gap:8px;flex-wrap:wrap}\n#fg5 .t-mlists details{font-size:13px;color:var(--muted);width:100%}\n#fg5 .t-mlists summary{cursor:pointer;color:var(--ink);text-decoration:underline dotted;text-underline-offset:3px}\n#fg5 .t-mlists .t-ml{margin-top:8px;background:#232323;border-radius:12px;padding:10px 12px;line-height:1.5}\n#fg5 .t-mlists .t-ml b{display:block;font-weight:500;margin-bottom:4px}#fg5 .t-mlists .t-ml em{font-style:normal}\n#fg5 .t-tr{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr) minmax(0,1.15fr) minmax(0,.95fr) minmax(0,1.1fr) minmax(0,.95fr) minmax(0,.72fr);gap:8px;align-items:center;padding:12px 16px;border-top:1px solid var(--line);font-size:14px}\n#fg5 .t-th{background:var(--card);border-top:0;font-size:12px;color:var(--muted);padding:11px 16px;border-radius:18px 18px 0 0}\n#fg5 .t-tr.t-win{background:rgba(74,222,128,.07)}\n#fg5 .t-n{color:var(--muted)}\n#fg5 .t-co{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#fg5 .t-co i{width:28px;height:28px;border-radius:9px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:600;color:#bbb;flex:none}\n#fg5 .t-tr.t-win .t-co i{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff}\n#fg5 .t-chip{font-size:13px;border-radius:999px;padding:4px 10px;width:max-content;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}\n#fg5 .t-chip.ok{background:var(--okbg);color:var(--ok)}\n#fg5 .t-chip.near{background:var(--nearbg);color:var(--near)}\n#fg5 .t-chip.miss{background:var(--missbg);color:var(--miss)}\n#fg5 .t-dot{display:inline-flex;align-items:center;gap:6px;font-size:13px}\n#fg5 .t-dot:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}\n#fg5 .t-dot.ok{color:var(--ok)}#fg5 .t-dot.near{color:var(--near)}#fg5 .t-dot.miss{color:var(--miss)}\n#fg5 .t-dot span{color:var(--ink)}\n#fg5 .t-empty{padding:26px 16px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}\n#fg5 .t-foot{max-width:720px;margin:28px auto 0;font-size:11px;color:#666;text-align:center;line-height:1.5}\n#fg5 .t-donate{display:inline-block;color:#cfcfcf;font-size:13px;text-decoration:none;background:var(--panel);border-radius:999px;padding:9px 16px;margin-bottom:14px}\n#fg5 .t-donate:hover{color:#fff;background:var(--soft)}\n#fg5 .t-foot button{background:none;border:0;color:#888;text-decoration:underline;font-size:11px;margin-top:6px}\n#fg5 .t-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#111;padding:12px 18px;border-radius:999px;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none;z-index:80}\n#fg5 .t-toast.t-show{opacity:1}\n/* всплывающие окна */\n#fg5 .t-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:70;padding:16px}\n#fg5 .t-modal.t-show{display:flex}\n#fg5 .t-box{background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;max-width:480px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}\n#fg5 .t-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:0;background:var(--soft);display:flex;align-items:center;justify-content:center}\n#fg5 .t-box h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px}\n#fg5 .t-box .t-sub{font-size:13px;color:var(--muted);margin-bottom:16px}\n#fg5 .t-rules{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}\n#fg5 .t-rules li{display:flex;gap:12px;font-size:14px;line-height:1.5;color:#d9d9d9}\n#fg5 .t-rules li b{flex:none;width:24px;height:24px;border-radius:50%;background:var(--soft);font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}\n#fg5 .t-legend{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 18px 36px}\n#fg5 .t-tabs{display:flex;gap:4px;background:var(--card);border-radius:999px;padding:4px;margin-bottom:16px}\n#fg5 .t-tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:8px;font-size:13px;color:#aaa}\n#fg5 .t-tabs button.t-on{background:var(--ink);color:#111}\n#fg5 .t-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n#fg5 .t-num{background:var(--card);border-radius:14px;padding:12px}\n#fg5 .t-num b{display:block;font-size:22px;font-weight:500}\n#fg5 .t-num span{font-size:11px;color:var(--muted)}\n#fg5 .t-chart{background:var(--card);border-radius:18px;padding:14px 14px 10px;margin-top:10px}\n#fg5 .t-chart>div:first-child{font-size:12px;color:#bbb;margin-bottom:10px}\n#fg5 .t-bars{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;height:130px;align-items:end;border-bottom:1px dashed #333}\n#fg5 .t-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}\n#fg5 .t-col em{font-style:normal;font-size:11px;color:var(--muted)}\n#fg5 .t-col div{width:100%;max-width:26px;border-radius:7px;min-height:3px;background:repeating-linear-gradient(135deg,var(--or1) 0 3px,#f78a65 3px 6px)}\n#fg5 .t-col div.t-today{background:var(--ink)}\n#fg5 .t-xs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;font-size:11px;color:var(--muted);text-align:center;margin-top:6px}\n#fg5 .t-soon{background:var(--card);border-radius:18px;padding:22px;text-align:center;font-size:14px;color:var(--muted);line-height:1.5}\n#fg5 .t-soon b{display:block;color:var(--ink);font-weight:500;margin-bottom:4px}\n/* адаптив */\n#fg5 .t-list li>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6d6d6}\n#fg5 .t-list li b{font-weight:700;color:#fff}\n#fg5 .t-list li small{flex:none;margin-left:12px}\n#fg5 .t-rbtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}\n#fg5 .t-rbtns .t-btn{margin:0}\n#fg5 .t-skip{border:1px solid var(--line);background:none;color:var(--muted);border-radius:999px;padding:14px 22px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit}\n#fg5 .t-skip:hover{color:var(--ink);border-color:#444}\n#fg5 .t-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#fg5 .t-bar .t-nav{min-width:0}\n#fg5 .t-mode{flex:none;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;letter-spacing:.01em;transition:filter .15s}\n#fg5 .t-mode:hover{filter:brightness(1.08)}\n#fg5 .t-mode i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);flex:none}\n#fg5 .t-mode.t-easy{background:linear-gradient(135deg,#16a34a,#4ade80)}\n#fg5 .t-mode.t-hard{background:linear-gradient(135deg,#dc2626,#f87171)}\n@media (max-width:760px){\n  #fg5 .t-game{margin-top:24px}\n}\n@media (max-width:600px){\n  #fg5{padding:14px 10px 24px}\n  #fg5 .t-card{padding:14px;border-radius:20px}\n  #fg5 .t-intro{font-size:15px;color:#cfcfcf;margin:2px 4px 0}\n#fg5 .t-giveup{border:0;background:var(--card);color:#bbb;border-radius:999px;padding:8px 14px;font-size:13px}\n#fg5 .t-giveup:hover{color:#fff;background:var(--soft)}\n#fg5 .t-tr.t-new .t-chip{animation:tFlip .45s ease both}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(2){animation-delay:.08s}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(3){animation-delay:.16s}\n#fg5 .t-tr.t-new .t-chip:nth-of-type(4){animation-delay:.24s}\n@keyframes tFlip{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}\n#fg5 .t-emojis{gap:6px}\n  #fg5 .t-tile{border-radius:14px}\n  #fg5 .t-form{flex-direction:column}\n  #fg5 .t-tr{grid-template-columns:20px 1fr auto;row-gap:8px;padding:12px 14px}\n  #fg5 .t-th{display:none}\n  #fg5 .t-hide-m{display:none}\n  #fg5 .t-tr>.t-n{grid-column:1;grid-row:1}\n  #fg5 .t-tr>.t-co{grid-column:2;grid-row:1}\n  #fg5 .t-tr{grid-template-columns:1fr 1fr !important}\n  #fg5 .t-tr>.t-co{grid-column:1 / 3;grid-row:1}\n  #fg5 .t-tr>.c0{grid-column:1;grid-row:2}#fg5 .t-tr>.c1{grid-column:2;grid-row:2}\n  #fg5 .t-tr>.c2{grid-column:1;grid-row:3}#fg5 .t-tr>.c3{grid-column:2;grid-row:3}\n  #fg5 .t-tr>.c4{grid-column:1;grid-row:4}#fg5 .t-tr>.c5{grid-column:2;grid-row:4}\n  #fg5 .t-mlists{display:flex}\n  #fg5 .t-nums{grid-template-columns:repeat(2,1fr)}\n}\n"; document.head.appendChild(st);
  mount.innerHTML="<div id=\"fg1\" class=\"fnd-game\" data-game=\"companies\" lang=\"ru\" style=\"display:none\">\n  <div class=\"t-wrap\">\n    <div class=\"t-top\">\n      <a class=\"t-logo\" href=\"/\" aria-label=\"На главную\">finan<span>edly</span></a>\n      <div class=\"t-icons\">\n        <button class=\"t-icon\" type=\"button\" data-t=\"rulesBtn\" aria-label=\"Как играть\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\" stroke-linecap=\"round\"/></svg><span class=\"t-tip\">Как играть</span></button>\n        <button class=\"t-icon\" type=\"button\" data-t=\"statsBtn\" aria-label=\"Статистика\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M5 20V10M12 20V4M19 20v-7\"/></svg><span class=\"t-tip\">Статистика</span></button>\n      </div>\n    </div>\n\n    <main class=\"t-game\">\n      <div class=\"t-bar\"><nav class=\"t-nav\" data-t=\"nav\"></nav><button class=\"t-mode\" type=\"button\" data-t=\"modeBtn\"></button></div>\n      <section class=\"t-card\">\n        <div class=\"t-emojis\" data-t=\"emojis\"></div>\n        <div data-t=\"play\">\n          <div class=\"t-form\">\n            <input class=\"t-input\" data-t=\"input\" type=\"text\" placeholder=\"Название компании или тикер\" autocomplete=\"off\" aria-label=\"Ваш ответ\">\n            <button class=\"t-btn\" type=\"button\" data-t=\"submit\">Ответить</button>\n            <ul class=\"t-list\" data-t=\"list\" role=\"listbox\"></ul>\n          </div>\n          <div class=\"t-msg\" data-t=\"msg\"></div>\n        </div>\n        <div class=\"t-status\"><div class=\"t-steps\" data-t=\"steps\"></div><div class=\"t-stxt\" data-t=\"stxt\"></div></div>\n      </section>\n\n      <section class=\"t-answer\" data-t=\"end\" hidden></section>\n\n      <section class=\"t-card\">\n        <p class=\"t-note\"><span class=\"t-c-ok\">Зелёный</span> — совпадает с загаданной компанией, <span class=\"t-c-near\">жёлтый</span> — близко (тот же регион или разница до 10 лет), <span class=\"t-c-miss\">красный</span> — не совпадает. Стрелка у года подсказывает, основана загаданная компания позже (↑) или раньше (↓).</p>\n        <div class=\"t-table\" data-t=\"table\"></div>\n      </section>\n    </main>\n\n    <div class=\"t-foot\"><a class=\"t-donate\" href=\"#\" target=\"_blank\" rel=\"noopener\">Поддержать проект ☕</a><br>Названия компаний принадлежат их владельцам. Игра не связана с этими компаниями и не является инвестиционной рекомендацией.<div data-t=\"testSlot\"></div></div>\n  </div>\n\n  <!-- Как играть -->\n  <div class=\"t-modal\" data-t=\"rulesModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Как играть в «Компании»</h3>\n    <div class=\"t-sub\">Угадайте публичную компанию, зашифрованную пятью эмодзи.</div>\n    <ul class=\"t-rules\">\n      <li><b>1</b><span>Каждый день загадана одна компания — одна для всех игроков.</span></li>\n      <li><b>2</b><span>Сначала виден только 1 эмодзи из 5. Начните вводить название или тикер, выберите вариант и нажмите «Ответить».</span></li>\n      <li><b>3</b><span>У вас 5 попыток. Каждая ошибка открывает ещё один эмодзи — от загадочных к очевидным. Последняя попытка — со всеми пятью.</span></li>\n      <li><b>4</b><span>Под каждой ошибкой видно, насколько вы близки: страна, сектор и год основания.</span></li>\n    </ul>\n    <div class=\"t-legend\"><span class=\"t-chip ok\">совпадает</span><span class=\"t-chip near\">близко</span><span class=\"t-chip miss\">не совпадает</span><span class=\"t-chip miss\">1998 ↑ — основана позже</span></div>\n    <ul class=\"t-rules\"><li><b>5</b><span>Новая загадка появляется каждый день в полночь.</span></li></ul>\n    <div class=\"t-rbtns\"><button class=\"t-btn\" type=\"button\" data-close>Понятно</button><button class=\"t-skip\" type=\"button\" data-t=\"rulesSkip\">Пропустить все правила</button></div>\n  </div></div>\n\n  <!-- Статистика -->\n  <div class=\"t-modal\" data-t=\"statsModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Статистика</h3>\n    <div class=\"t-sub\">Режим «Компании»</div>\n    <div class=\"t-tabs\"><button type=\"button\" class=\"t-on\" data-tab=\"me\">Мои результаты</button><button type=\"button\" data-tab=\"all\">Все игроки</button></div>\n    <div data-pane=\"me\">\n      <div class=\"t-nums\" data-t=\"nums\"></div>\n      <div class=\"t-chart\"><div>С какой попытки вы угадываете</div><div class=\"t-bars\" data-t=\"bars\"></div><div class=\"t-xs\"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>✕</span></div></div>\n    </div>\n    <div data-pane=\"all\" hidden>\n      <div class=\"t-soon\"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div>\n    </div>\n  </div></div>\n  <div class=\"t-toast\" data-t=\"toast\"></div>\n</div>\n<div id=\"fg2\" class=\"fnd-game\" data-game=\"chart\" lang=\"ru\" style=\"display:none\">\n  <div class=\"t-wrap\">\n    <div class=\"t-top\">\n      <a class=\"t-logo\" href=\"/\" aria-label=\"На главную\">finan<span>edly</span></a>\n      <div class=\"t-icons\">\n        <button class=\"t-icon\" type=\"button\" data-t=\"rulesBtn\" aria-label=\"Как играть\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\" stroke-linecap=\"round\"/></svg><span class=\"t-tip\">Как играть</span></button>\n        <button class=\"t-icon\" type=\"button\" data-t=\"statsBtn\" aria-label=\"Статистика\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M5 20V10M12 20V4M19 20v-7\"/></svg><span class=\"t-tip\">Статистика</span></button>\n      </div>\n    </div>\n\n    <main class=\"t-game\">\n      <div class=\"t-bar\"><nav class=\"t-nav\" data-t=\"nav\"></nav><button class=\"t-mode\" type=\"button\" data-t=\"modeBtn\"></button></div>\n      <section class=\"t-card\">\n        <div class=\"t-chartbox\" data-t=\"chart\"></div>\n        <div class=\"t-range\" data-t=\"range\"></div>\n        <div data-t=\"play\">\n          <div class=\"t-form\">\n            <input class=\"t-input\" data-t=\"input\" type=\"text\" placeholder=\"Событие, страна или валюта\" autocomplete=\"off\" aria-label=\"Ваш ответ\">\n            <button class=\"t-btn\" type=\"button\" data-t=\"submit\">Ответить</button>\n            <ul class=\"t-list\" data-t=\"list\" role=\"listbox\"></ul>\n          </div>\n          <div class=\"t-msg\" data-t=\"msg\"></div>\n        </div>\n        <div class=\"t-status\"><div class=\"t-steps\" data-t=\"steps\"></div><div class=\"t-stxt\" data-t=\"stxt\"></div></div>\n      </section>\n\n      <section class=\"t-answer\" data-t=\"end\" hidden></section>\n\n      <section class=\"t-card\">\n        <p class=\"t-note\"><span class=\"t-c-ok\">Зелёный</span> — совпадает с загаданным событием, <span class=\"t-c-near\">жёлтый</span> — близко (тот же регион или разница до 2 лет), <span class=\"t-c-miss\">красный</span> — не совпадает. Стрелка у года подсказывает, было загаданное событие позже (↑) или раньше (↓).</p>\n        <div class=\"t-table\" data-t=\"table\"></div>\n      </section>\n    </main>\n\n    <div class=\"t-foot\"><a class=\"t-donate\" href=\"#\" target=\"_blank\" rel=\"noopener\">Поддержать проект ☕</a><br>Игра не является инвестиционной рекомендацией. Графики курсов в прототипе условные.<div data-t=\"testSlot\"></div></div>\n  </div>\n\n  <!-- Как играть -->\n  <div class=\"t-modal\" data-t=\"rulesModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Как играть в «График»</h3>\n    <div class=\"t-sub\">Угадайте финансовое событие по графику курса валюты.</div>\n    <ul class=\"t-rules\">\n      <li><b>1</b><span>Каждый день загадано одно событие — одно для всех игроков: девальвация, дефолт, кризис, отказ от привязки курса.</span></li>\n      <li><b>2</b><span>Сначала виден курс валюты за 2 месяца вокруг события — момент события отмечен точкой. Внизу — время, справа — сколько местной валюты дают за доллар, в процентах от начала показанного периода: начало = 100. Например, 150 — доллар стоит в 1,5 раза больше, то есть валюта подешевела на треть. Линия вверх — валюта дешевеет, вниз — дорожает.</span></li>\n      <li><b>3</b><span>У вас 5 попыток. Каждая ошибка расширяет период вокруг события. Даты на шкале иногда скрыты — после второй ошибки они видны всегда. Искать событие можно по названию, стране или валюте.</span></li>\n      <li><b>4</b><span>Под каждой ошибкой видно, насколько вы близки: страна, тип события и год.</span></li>\n    </ul>\n    <div class=\"t-legend\"><span class=\"t-chip ok\">совпадает</span><span class=\"t-chip near\">близко</span><span class=\"t-chip miss\">не совпадает</span><span class=\"t-chip miss\">1998 ↑ — событие позже</span></div>\n    <ul class=\"t-rules\"><li><b>5</b><span>Новая загадка появляется каждый день в полночь.</span></li></ul>\n    <div class=\"t-rbtns\"><button class=\"t-btn\" type=\"button\" data-close>Понятно</button><button class=\"t-skip\" type=\"button\" data-t=\"rulesSkip\">Пропустить все правила</button></div>\n  </div></div>\n\n  <!-- Статистика -->\n  <div class=\"t-modal\" data-t=\"statsModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Статистика</h3>\n    <div class=\"t-sub\">Режим «График»</div>\n    <div class=\"t-tabs\"><button type=\"button\" class=\"t-on\" data-tab=\"me\">Мои результаты</button><button type=\"button\" data-tab=\"all\">Все игроки</button></div>\n    <div data-pane=\"me\">\n      <div class=\"t-nums\" data-t=\"nums\"></div>\n      <div class=\"t-chart\"><div>С какой попытки вы угадываете</div><div class=\"t-bars\" data-t=\"bars\"></div><div class=\"t-xs\"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>✕</span></div></div>\n    </div>\n    <div data-pane=\"all\" hidden>\n      <div class=\"t-soon\"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div>\n    </div>\n  </div></div>\n  <div class=\"t-toast\" data-t=\"toast\"></div>\n</div>\n<div id=\"fg3\" class=\"fnd-game\" data-game=\"keywords\" lang=\"ru\" style=\"display:none\">\n  <div class=\"t-wrap\">\n    <div class=\"t-top\">\n      <a class=\"t-logo\" href=\"/\" aria-label=\"На главную\">finan<span>edly</span></a>\n      <div class=\"t-icons\">\n        <button class=\"t-icon\" type=\"button\" data-t=\"rulesBtn\" aria-label=\"Как играть\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\" stroke-linecap=\"round\"/></svg><span class=\"t-tip\">Как играть</span></button>\n        <button class=\"t-icon\" type=\"button\" data-t=\"statsBtn\" aria-label=\"Статистика\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M5 20V10M12 20V4M19 20v-7\"/></svg><span class=\"t-tip\">Статистика</span></button>\n      </div>\n    </div>\n\n    <main class=\"t-game\">\n      <div class=\"t-bar\"><nav class=\"t-nav\" data-t=\"nav\"></nav><button class=\"t-mode\" type=\"button\" data-t=\"modeBtn\"></button></div>\n      <section class=\"t-card\">\n        <ol class=\"t-words\" data-t=\"words\"></ol>\n        <div data-t=\"play\">\n          <div class=\"t-form\">\n            <input class=\"t-input\" data-t=\"input\" type=\"text\" placeholder=\"Название компании или тикер\" autocomplete=\"off\" aria-label=\"Ваш ответ\">\n            <button class=\"t-btn\" type=\"button\" data-t=\"submit\">Ответить</button>\n            <ul class=\"t-list\" data-t=\"list\" role=\"listbox\"></ul>\n          </div>\n          <div class=\"t-msg\" data-t=\"msg\"></div>\n        </div>\n        <div class=\"t-status\"><div class=\"t-steps\" data-t=\"steps\"></div><div class=\"t-stxt\" data-t=\"stxt\"></div></div>\n      </section>\n\n      <section class=\"t-answer\" data-t=\"end\" hidden></section>\n\n      <section class=\"t-card\">\n        <p class=\"t-note\"><span class=\"t-c-ok\">Зелёный</span> — совпадает с загаданной компанией, <span class=\"t-c-near\">жёлтый</span> — близко (тот же регион или разница до 10 лет), <span class=\"t-c-miss\">красный</span> — не совпадает. Стрелка у года подсказывает, основана загаданная компания позже (↑) или раньше (↓).</p>\n        <div class=\"t-table\" data-t=\"table\"></div>\n      </section>\n    </main>\n\n    <div class=\"t-foot\"><a class=\"t-donate\" href=\"#\" target=\"_blank\" rel=\"noopener\">Поддержать проект ☕</a><br>Названия компаний принадлежат их владельцам. Игра не связана с этими компаниями и не является инвестиционной рекомендацией.<div data-t=\"testSlot\"></div></div>\n  </div>\n\n  <!-- Как играть -->\n  <div class=\"t-modal\" data-t=\"rulesModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Как играть в «Ключевые слова»</h3>\n    <div class=\"t-sub\">Угадайте публичную компанию по ключевым словам о ней.</div>\n    <ul class=\"t-rules\">\n      <li><b>1</b><span>Каждый день загадана одна компания — одна для всех игроков.</span></li>\n      <li><b>2</b><span>Сначала видно только одно слово или фраза из пяти. Начните вводить название или тикер, выберите вариант и нажмите «Ответить».</span></li>\n      <li><b>3</b><span>У вас 5 попыток. Каждая ошибка открывает следующее слово — от неочевидных к очевидным. Последняя попытка — со всеми пятью.</span></li>\n      <li><b>4</b><span>Под каждой ошибкой видно, насколько вы близки: страна, сектор и год основания.</span></li>\n    </ul>\n    <div class=\"t-legend\"><span class=\"t-chip ok\">совпадает</span><span class=\"t-chip near\">близко</span><span class=\"t-chip miss\">не совпадает</span><span class=\"t-chip miss\">1998 ↑ — основана позже</span></div>\n    <ul class=\"t-rules\"><li><b>5</b><span>Новая загадка — каждый день в полночь.</span></li></ul>\n    <div class=\"t-rbtns\"><button class=\"t-btn\" type=\"button\" data-close>Понятно</button><button class=\"t-skip\" type=\"button\" data-t=\"rulesSkip\">Пропустить все правила</button></div>\n  </div></div>\n\n  <!-- Статистика -->\n  <div class=\"t-modal\" data-t=\"statsModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Статистика</h3>\n    <div class=\"t-sub\">Режим «Ключевые слова»</div>\n    <div class=\"t-tabs\"><button type=\"button\" class=\"t-on\" data-tab=\"me\">Мои результаты</button><button type=\"button\" data-tab=\"all\">Все игроки</button></div>\n    <div data-pane=\"me\">\n      <div class=\"t-nums\" data-t=\"nums\"></div>\n      <div class=\"t-chart\"><div>С какой попытки вы угадываете</div><div class=\"t-bars\" data-t=\"bars\"></div><div class=\"t-xs\"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>✕</span></div></div>\n    </div>\n    <div data-pane=\"all\" hidden>\n      <div class=\"t-soon\"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div>\n    </div>\n  </div></div>\n  <div class=\"t-toast\" data-t=\"toast\"></div>\n</div>\n<div id=\"fg4\" class=\"fnd-game\" data-game=\"quote\" lang=\"ru\" style=\"display:none\">\n  <div class=\"t-wrap\">\n    <div class=\"t-top\">\n      <a class=\"t-logo\" href=\"/\" aria-label=\"На главную\">finan<span>edly</span></a>\n      <div class=\"t-icons\">\n        \n        <button class=\"t-icon\" type=\"button\" data-t=\"rulesBtn\" aria-label=\"Как играть\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\" stroke-linecap=\"round\"/></svg><span class=\"t-tip\">Как играть</span></button>\n        <button class=\"t-icon\" type=\"button\" data-t=\"statsBtn\" aria-label=\"Статистика\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M5 20V10M12 20V4M19 20v-7\"/></svg><span class=\"t-tip\">Статистика</span></button>\n      </div>\n    </div>\n\n    <main class=\"t-game\">\n      <div class=\"t-bar\"><nav class=\"t-nav\" data-t=\"nav\"></nav><button class=\"t-mode\" type=\"button\" data-t=\"modeBtn\"></button></div>\n      <section class=\"t-card\">\n        <blockquote class=\"t-quote\" data-t=\"quote\"></blockquote>\n        <div class=\"t-hints\" data-t=\"hints\"></div>\n        <div data-t=\"play\">\n          <div class=\"t-form\">\n            <input class=\"t-input\" data-t=\"input\" type=\"text\" placeholder=\"Название компании или тикер\" autocomplete=\"off\" aria-label=\"Ваш ответ\">\n            <button class=\"t-btn\" type=\"button\" data-t=\"submit\">Ответить</button>\n            <ul class=\"t-list\" data-t=\"list\" role=\"listbox\"></ul>\n          </div>\n          <div class=\"t-msg\" data-t=\"msg\"></div>\n        </div>\n        <div class=\"t-status\"><div class=\"t-steps\" data-t=\"steps\"></div><div class=\"t-stxt\" data-t=\"stxt\"></div></div>\n      </section>\n\n      <section class=\"t-answer\" data-t=\"end\" hidden></section>\n\n      <section class=\"t-card\">\n        <p class=\"t-note\" data-t=\"note\"><span class=\"t-c-ok\">Зелёный</span> — совпадает с загаданной компанией, <span class=\"t-c-near\">жёлтый</span> — близко (тот же регион или разница до 10 лет), <span class=\"t-c-miss\">красный</span> — не совпадает. Стрелка у года подсказывает, основана загаданная компания позже (↑) или раньше (↓).</p>\n        <div class=\"t-table\" data-t=\"table\"></div>\n      </section>\n    </main>\n\n    <div class=\"t-foot\"><a class=\"t-donate\" href=\"#\" target=\"_blank\" rel=\"noopener\">Поддержать проект ☕</a><br>Названия компаний принадлежат их владельцам. Игра не связана с этими компаниями и не является инвестиционной рекомендацией.<div data-t=\"testSlot\"></div></div>\n  </div>\n\n  <!-- Как играть -->\n  <div class=\"t-modal\" data-t=\"rulesModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Как играть в «Цитату»</h3>\n    <div class=\"t-sub\">Чья это фраза? В режиме Easy угадайте компанию, с которой связан автор цитаты, в режиме Hard — самого автора.</div>\n    <ul class=\"t-rules\">\n      <li><b>1</b><span>Каждый день загадана одна компания — одна для всех игроков.</span></li>\n      <li><b>2</b><span>Цитата видна целиком сразу. Начните вводить название компании (или имя автора — в режиме Hard), выберите вариант из списка и нажмите «Ответить».</span></li>\n      <li><b>3</b><span>У вас 5 попыток. Каждая ошибка открывает подсказку под цитатой. Первая подсказка — год, когда прозвучала цитата, вторая — страна компании, третья и четвёртая зависят от режима.</span></li>\n      <li><b>4</b><span><b style=\"display:inline;background:none;width:auto;height:auto\">Easy:</b> угадываем компанию; третья подсказка — два эмодзи о компании, четвёртая — инициалы автора. <b style=\"display:inline;background:none;width:auto;height:auto\">Hard:</b> угадываем автора; третья и четвёртая подсказки — по одному эмодзи.</span></li>\n      <li><b>5</b><span>Под каждой ошибкой видно, насколько вы близки: страна, сектор и год основания (Easy) или компания автора, страна и сектор (Hard).</span></li>\n    </ul>\n    <div class=\"t-legend\"><span class=\"t-chip ok\">совпадает</span><span class=\"t-chip near\">близко</span><span class=\"t-chip miss\">не совпадает</span><span class=\"t-chip miss\">1998 ↑ — основана позже</span></div>\n    <ul class=\"t-rules\"><li><b>6</b><span>Режимы считаются отдельно: можно сыграть оба. Оригинал цитаты появится после раунда. Новая загадка — каждый день в полночь.</span></li></ul>\n    <div class=\"t-rbtns\"><button class=\"t-btn\" type=\"button\" data-close>Понятно</button><button class=\"t-skip\" type=\"button\" data-t=\"rulesSkip\">Пропустить все правила</button></div>\n  </div></div>\n\n  <!-- Статистика -->\n  <div class=\"t-modal\" data-t=\"statsModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Статистика</h3>\n    <div class=\"t-sub\" data-t=\"statsSub\">Режим «Цитата»</div>\n    <div class=\"t-tabs\"><button type=\"button\" class=\"t-on\" data-tab=\"me\">Мои результаты</button><button type=\"button\" data-tab=\"all\">Все игроки</button></div>\n    <div data-pane=\"me\">\n      <div class=\"t-nums\" data-t=\"nums\"></div>\n      <div class=\"t-chart\"><div>С какой попытки вы угадываете</div><div class=\"t-bars\" data-t=\"bars\"></div><div class=\"t-xs\"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>✕</span></div></div>\n    </div>\n    <div data-pane=\"all\" hidden>\n      <div class=\"t-soon\"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div>\n    </div>\n  </div></div>\n  <div class=\"t-toast\" data-t=\"toast\"></div>\n</div>\n<div id=\"fg5\" class=\"fnd-game\" data-game=\"classic\" lang=\"ru\" style=\"display:none\">\n  <div class=\"t-wrap\">\n    <div class=\"t-top\">\n      <a class=\"t-logo\" href=\"/\" aria-label=\"На главную\">finan<span>edly</span></a>\n      <div class=\"t-icons\">\n        <button class=\"t-icon\" type=\"button\" data-t=\"rulesBtn\" aria-label=\"Как играть\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\" stroke-linecap=\"round\"/></svg><span class=\"t-tip\">Как играть</span></button>\n        <button class=\"t-icon\" type=\"button\" data-t=\"statsBtn\" aria-label=\"Статистика\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M5 20V10M12 20V4M19 20v-7\"/></svg><span class=\"t-tip\">Статистика</span></button>\n      </div>\n    </div>\n\n    <main class=\"t-game\">\n      <div class=\"t-bar\"><nav class=\"t-nav\" data-t=\"nav\"></nav><button class=\"t-mode\" type=\"button\" data-t=\"modeBtn\"></button></div>\n      <section class=\"t-card\">\n        <div class=\"t-intro\">Загадана публичная компания. Называйте любые компании — таблица покажет, что совпало.</div>\n        <div data-t=\"play\">\n          <div class=\"t-form\">\n            <input class=\"t-input\" data-t=\"input\" type=\"text\" placeholder=\"Название компании или тикер\" autocomplete=\"off\" aria-label=\"Ваш ответ\">\n            <button class=\"t-btn\" type=\"button\" data-t=\"submit\">Ответить</button>\n            <ul class=\"t-list\" data-t=\"list\" role=\"listbox\"></ul>\n          </div>\n          <div class=\"t-msg\" data-t=\"msg\"></div>\n        </div>\n        <div class=\"t-status\"><div class=\"t-steps\" data-t=\"steps\"></div><div class=\"t-stxt\" data-t=\"stxt\"></div></div>\n      </section>\n\n      <section class=\"t-answer\" data-t=\"end\" hidden></section>\n\n      <section class=\"t-card\">\n        <p class=\"t-note\"><span class=\"t-c-ok\">Зелёный</span> — совпадает с загаданной компанией, <span class=\"t-c-near\">жёлтый</span> — близко (тот же регион, смежный сектор, биржа той же страны, разница до 10 лет, капитализация или число сотрудников отличаются не больше чем вдвое), <span class=\"t-c-miss\">красный</span> — не совпадает. Стрелки: у загаданной компании значение больше (↑) или меньше (↓). Капитализация — на <span data-t=\"capdate\"></span>, сотрудники — по последним годовым отчётам.<span class=\"t-hide-m\"> Наведите на «Сектор» или «Биржа», чтобы увидеть все варианты.</span></p>\n        <div class=\"t-mlists\"><details><summary>Все секторы</summary><div class=\"t-ml\" data-t=\"mlSector\"></div></details><details><summary>Все биржи</summary><div class=\"t-ml\" data-t=\"mlExchange\"></div></details></div>\n        <div class=\"t-table\" data-t=\"table\"></div>\n      </section>\n    </main>\n\n    <div class=\"t-foot\"><a class=\"t-donate\" href=\"#\" target=\"_blank\" rel=\"noopener\">Поддержать проект ☕</a><br>Названия компаний принадлежат их владельцам. Игра не связана с этими компаниями и не является инвестиционной рекомендацией.<div data-t=\"testSlot\"></div></div>\n  </div>\n\n  <!-- Как играть -->\n  <div class=\"t-modal\" data-t=\"rulesModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Как играть в «Классику»</h3>\n    <div class=\"t-sub\">Угадайте публичную компанию, сравнивая её с другими.</div>\n    <ul class=\"t-rules\">\n      <li><b>1</b><span>Каждый день загадана одна компания — одна для всех игроков.</span></li>\n      <li><b>2</b><span>Подсказок нет. Назовите любую компанию — введите название или тикер, выберите вариант и нажмите «Ответить».</span></li>\n      <li><b>3</b><span>Таблица покажет, что у неё общего с загаданной: страна, сектор, биржа, год основания, капитализация и число сотрудников. У вас 7 попыток.</span></li>\n      <li><b>4</b><span>Жёлтый: тот же регион, смежный сектор (например, «Технологии» и «Полупроводники»), биржа той же страны, разница в годе основания до 10 лет, капитализация или число сотрудников отличаются не больше чем вдвое. Стрелки показывают, у загаданной компании значение больше (↑) или меньше (↓).</span></li>\n    </ul>\n    <div class=\"t-legend\"><span class=\"t-chip ok\">совпадает</span><span class=\"t-chip near\">близко</span><span class=\"t-chip miss\">не совпадает</span><span class=\"t-chip miss\">1998 ↑ — основана позже</span></div>\n    <ul class=\"t-rules\"><li><b>5</b><span>Новая загадка появляется каждый день в полночь.</span></li></ul>\n    <div class=\"t-rbtns\"><button class=\"t-btn\" type=\"button\" data-close>Понятно</button><button class=\"t-skip\" type=\"button\" data-t=\"rulesSkip\">Пропустить все правила</button></div>\n  </div></div>\n\n  <!-- Статистика -->\n  <div class=\"t-modal\" data-t=\"statsModal\"><div class=\"t-box\">\n    <button class=\"t-close\" type=\"button\" data-close aria-label=\"Закрыть\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button>\n    <h3>Статистика</h3>\n    <div class=\"t-sub\">Режим «Классика»</div>\n    <div class=\"t-tabs\"><button type=\"button\" class=\"t-on\" data-tab=\"me\">Мои результаты</button><button type=\"button\" data-tab=\"all\">Все игроки</button></div>\n    <div data-pane=\"me\">\n      <div class=\"t-nums\" data-t=\"nums\"></div>\n      <div class=\"t-chart\"><div>С какой попытки вы угадываете</div><div class=\"t-bars\" data-t=\"bars\"></div><div class=\"t-xs\"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>✕</span></div></div>\n    </div>\n    <div data-pane=\"all\" hidden>\n      <div class=\"t-soon\"><b>Скоро</b>Здесь будет статистика всех игроков: сколько человек угадали сегодняшнюю загадку и с какой попытки.</div>\n    </div>\n  </div></div>\n  <div class=\"t-toast\" data-t=\"toast\"></div>\n</div>";
})();

(function(){
  var root=document.getElementById('fg1');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var MODE='easy'; try{ if(localStorage.getItem('fnd_mode')==='hard') MODE='hard'; }catch(e){}

  /* Ссылки на страницы режимов в Tilda — заменить на свои */
  var MODES=[['Компании','#companies',true],['График','#chart'],['Ключевые слова','#keywords'],['Цитата','#quote'],['Классика','#classic']];

  /* ---------- Данные (прототип: проверить перед запуском) ---------- */
  /* База компаний с GitHub (обновляется раз в неделю). Если не загрузилась — игра работает на запасных данных из загадок. */
  var DATA_URL='https://lapoyura.github.io/finanedly-data/data/game.json';
  var COMP={}, LIST=[];
  function addComp(o){ if(o.id&&!COMP[o.id]){ COMP[o.id]=o; LIST.push(o); } }
  function fromDB(j){
    var ix={}; j.fields.forEach(function(f,i){ ix[f]=i; });
    j.companies.forEach(function(r){ if(!r[ix.name]||!r[ix.country]||!r[ix.sector]||!r[ix.founded]) return;
      addComp({id:r[ix.id],name:r[ix.name],aliases:r[ix.aliases]||[],country:r[ix.country],region:r[ix.region],sector:r[ix.sector],founded:r[ix.founded],exchange:r[ix.exchange],level:r[ix.level]}); });
  }
  function fromPuzzles(){ P.forEach(function(p){ var f=p[3]; addComp({id:p[0],name:f[0],aliases:f[1],country:f[2],region:f[3],sector:f[4],founded:f[5]}); }); }
  /* Загадки: [id в Wikidata, уровень e/h, 5 эмодзи с пояснениями, запасные данные о компании на случай, если GitHub недоступен]
     Позже переедут в data/emoji.json на GitHub. */
  var P = [["Q478214", "e", [["🔋", "Аккумуляторы и домашние накопители энергии"], ["🤖", "Человекоподобный робот Optimus"], ["☀️", "Солнечные панели — после покупки SolarCity в 2016 году"], ["🔌", "Собственная сеть зарядных станций Supercharger"], ["🚗", "Электромобили"]], ["Tesla", ["TSLA", "Тесла"], "США", "Северная Америка", "Автомобили", 2003]], ["Q312", "e", [["🏠", "По легенде, всё начиналось в гараже"], ["⌚", "Умные часы"], ["🎧", "Беспроводные наушники"], ["💻", "Ноутбуки и компьютеры Mac"], ["📱", "iPhone"]], ["Apple", ["AAPL", "Эппл"], "США", "Северная Америка", "Технологии", 1976]], ["Q3295867", "e", [["🧪", "Рецепт напитка придумал фармацевт"], ["🎅", "Рекламный образ Санта-Клауса в 1930-х"], ["🫧", "Газировка"], ["🧊", "Подают со льдом"], ["🥤", "Самый известный безалкогольный напиток"]], ["Coca-Cola", ["KO", "Кока-Кола"], "США", "Северная Америка", "Напитки и продукты", 1886]], ["Q483915", "e", [["🧇", "Первую рифлёную подошву отлили в вафельнице"], ["🏛️", "Названа в честь греческой богини победы"], ["🏀", "Баскетбольные кроссовки, ставшие культовыми"], ["🏃", "Экипировка для бега"], ["👟", "Кроссовки"]], ["Nike", ["NKE", "Найк"], "США", "Северная Америка", "Одежда и роскошь", 1964]], ["Q3884", "e", [["🏞️", "Названа в честь самой полноводной реки мира"], ["📚", "Начиналась как интернет-магазин книг"], ["☁️", "Один из крупнейших облачных сервисов"], ["🚚", "Собственная служба доставки"], ["📦", "Посылки по всему миру"]], ["Amazon", ["AMZN", "Амазон"], "США", "Северная Америка", "Электронная торговля", 1994]], ["Q907311", "e", [["📮", "Начинала с проката DVD по почте"], ["🦑", "Корейский сериал-хит 2021 года"], ["💿", "DVD-диски"], ["🍿", "Вечер с фильмом"], ["📺", "Стриминг сериалов и фильмов"]], ["Netflix", ["NFLX", "Нетфликс"], "США", "Северная Америка", "Медиа и развлечения", 1997]], ["Q20718", "e", [["⭐", "Название переводится как «три звезды»"], ["🧊", "Холодильники и бытовая техника"], ["💾", "Один из крупнейших производителей чипов памяти"], ["📺", "Телевизоры"], ["📱", "Смартфоны"]], ["Samsung Electronics", ["Samsung", "Самсунг"], "Республика Корея", "Азия", "Электроника", 1969]], ["Q53268", "e", [["🧵", "Семейный бизнес начинался с ткацких станков"], ["🏭", "Знаменитая система бережливого производства"], ["🌿", "Первый массовый гибридный автомобиль"], ["🚕", "Частый выбор для такси"], ["🚗", "Один из крупнейших автопроизводителей мира"]], ["Toyota", ["TM", "Тойота"], "Япония", "Азия", "Автомобили", 1937]], ["Q182477", "e", [["⛏️", "Видеокарты были нарасхват у майнеров криптовалют"], ["🧠", "Чипы для обучения нейросетей"], ["🤖", "Платформы для роботов и беспилотников"], ["🎮", "Игровые видеокарты"], ["🖥️", "Графические процессоры"]], ["Nvidia", ["NVDA", "Нвидиа"], "США", "Северная Америка", "Полупроводники", 1993]], ["Q328840", "e", [["🌍", "Работает почти во всех странах"], ["✈️", "Платежи в путешествиях"], ["🔐", "Безопасность платежей"], ["🛒", "Оплата покупок"], ["💳", "Платёжные карты"]], ["Visa", ["V", "Виза"], "США", "Северная Америка", "Финансы", 1958]], ["Q156578", "e", [["💨", "Скандал с выбросами дизельных двигателей в 2015 году"], ["🏭", "Один из крупнейших автоконцернов мира"], ["🚐", "Легендарный микроавтобус"], ["🐞", "Модель, прозванная «Жуком»"], ["🚗", "Название значит «народный автомобиль»"]], ["Volkswagen", ["VOW", "Фольксваген"], "Германия", "Европа", "Автомобили", 1937]], ["Q2283", "e", [["📎", "Скрепка-помощник в офисных программах"], ["🎮", "Игровая консоль"], ["☁️", "Облачная платформа"], ["💼", "Офисный пакет программ"], ["🪟", "Операционная система с «окнами» в названии"]], ["Microsoft", ["MSFT", "Майкрософт"], "США", "Северная Америка", "Технологии", 1975]], ["Q689141", "e", [["📊", "Ежегодный персональный итог прослушиваний"], ["🎙️", "Подкасты"], ["📻", "Плейлисты вместо радио"], ["🎧", "Музыка в наушниках"], ["🎵", "Стриминг музыки"]], ["Spotify", ["SPOT", "Спотифай"], "Швеция", "Европа", "Медиа и развлечения", 2006]], ["Q160746", "e", [["🍼", "Компания выросла из производства детского питания"], ["🐾", "Корма для домашних животных"], ["💧", "Бутилированная вода"], ["🍫", "Шоколад и сладости"], ["☕", "Растворимый кофе"]], ["Nestlé", ["NESN", "Нестле"], "Швейцария", "Европа", "Напитки и продукты", 1866]], ["Q41187", "e", [["📼", "Видеоформат, проигравший «войну форматов» VHS"], ["📻", "Один из первых транзисторных радиоприёмников"], ["📷", "Фотокамеры и матрицы для смартфонов"], ["🎧", "Портативный кассетный плеер, изменивший музыку"], ["🎮", "Игровая приставка"]], ["Sony", ["SONY", "Сони"], "Япония", "Азия", "Медиа и развлечения", 1946]], ["Q3895", "e", [["👬", "Основатель поссорился с братом, и тот создал конкурента"], ["⚽", "Официальные мячи чемпионатов мира"], ["🎽", "Спортивная форма"], ["🏃", "Экипировка для бега"], ["👟", "Кроссовки"]], ["Adidas", ["ADS", "Адидас"], "Германия", "Европа", "Одежда и роскошь", 1949]], ["Q1359568", "e", [["☁️", "Крупнейший облачный сервис в своей стране"], ["🛍️", "11 ноября — крупнейший день онлайн-распродаж"], ["🏮", "Компания из Азии"], ["📦", "Электронная торговля"], ["🧞", "Названа в честь героя сказки «Тысяча и одна ночь»"]], ["Alibaba", ["BABA", "Алибаба"], "Китай", "Азия", "Электронная торговля", 1999]], ["Q206921", "e", [["⚗️", "Начинала как химическая компания"], ["🧪", "Лаборатории и исследования"], ["💊", "Лекарства"], ["🦠", "Вакцина от COVID-19, созданная вместе с BioNTech"], ["💉", "Вакцины"]], ["Pfizer", ["PFE", "Пфайзер"], "США", "Северная Америка", "Фармацевтика и здоровье", 1849]], ["Q465751", "h", [["🌯", "Главное блюдо — огромные буррито"], ["🌶️", "Названа в честь копчёного перца халапеньо"], ["🥑", "За гуакамоле нужно доплачивать"], ["🏔️", "Первый ресторан открылся в Денвере"], ["🐖", "Делает ставку на мясо животных свободного выгула"]], ["Chipotle Mexican Grill", ["CMG", "Чипотле"], "США", "Северная Америка", "Напитки и продукты", 1993]], ["Q427881", "h", [["🚢", "Строит одни из самых больших пассажирских судов в мире"], ["🧗", "На лайнерах есть скалодромы и серф-симуляторы"], ["🏝️", "Собственный частный остров на Багамах"], ["👑", "«Королевское» название"], ["🌴", "Название отсылает к тёплому морю, где всё начиналось"]], ["Royal Caribbean", ["RCL"], "США", "Северная Америка", "Туризм", 1997]], ["Q2365235", "h", [["📚", "Начинала как интернет-магазин книг"], ["📦", "Миллионы посылок в день"], ["🏪", "Тысячи пунктов выдачи заказов"], ["💳", "Собственный банк для покупателей и продавцов"], ["🔵", "Фирменный цвет — синий"]], ["Ozon", ["OZON", "Озон"], "Россия", "Европа", "Электронная торговля", 1998]], ["Q1112588", "h", [["🎩", "Семейный бизнес начинался с продажи шляп"], ["👵", "В рекламе снималась хозяйка компании — «крутая мамаша»"], ["🧥", "Куртки и одежда для активного отдыха"], ["🌲", "Штаб-квартира в Портленде, штат Орегон"], ["🏞️", "Названа в честь реки на северо-западе США"]], ["Columbia Sportswear", ["COLM", "Коламбия"], "США", "Северная Америка", "Одежда и роскошь", 1938]], ["Q28452620", "h", [["👨‍💻", "Основатель ушёл из Google, чтобы делать электронику"], ["🔋", "Пауэрбанки"], ["🔌", "Зарядки и кабели"], ["🛒", "Выросла на продажах через Amazon"], ["⚓", "Название переводится как «якорь»"]], ["Anker", ["Анкер"], "Китай", "Азия", "Электроника", 2011]], ["Q20732498", "h", [["🏪", "Магазины недорогих товаров для дома"], ["🎌", "Оформление в японском стиле, хотя компания китайская"], ["🧸", "Мягкие игрушки и коллаборации с мультфильмами"], ["💸", "Низкие цены"], ["🌍", "Тысячи магазинов в десятках стран"]], ["Miniso", ["MNSO", "Минисо"], "Китай", "Азия", "Ритейл", 2013]], ["Q2609162", "h", [["🎫", "Продаёт билеты"], ["🎤", "Концерты и туры звёзд"], ["💥", "Сайт не выдержал наплыва фанатов на тур Тейлор Свифт"], ["💸", "Игроков раздражают сервисные сборы"], ["🤝", "Объединилась с крупнейшим организатором концертов"]], ["Ticketmaster", ["Тикетмастер"], "США", "Северная Америка", "Медиа и развлечения", 1976]], ["Q864338", "h", [["🧬", "Одна из первых биотех-компаний"], ["🏅", "Среди основателей — нобелевские лауреаты"], ["🧠", "Лекарства от рассеянного склероза"], ["👴", "Спорное одобрение препарата от болезни Альцгеймера"], ["🎓", "Основана учёными из Гарварда и MIT"]], ["Biogen", ["BIIB", "Биоген"], "США", "Северная Америка", "Фармацевтика и здоровье", 1978]], ["Q2744099", "h", [["🫁", "Лекарства от муковисцидоза"], ["✂️", "Первая одобренная терапия на основе CRISPR"], ["🩸", "Лечение серповидноклеточной анемии"], ["📖", "О компании написана книга «Молекула на миллиард долларов»"], ["🧪", "Рациональный дизайн лекарств"]], ["Vertex Pharmaceuticals", ["VRTX", "Вертекс"], "США", "Северная Америка", "Фармацевтика и здоровье", 1989]], ["Q1453620", "h", [["🟠", "Один из крупнейших производителей меди"], ["🏔️", "Рудник Грасберг высоко в горах Индонезии"], ["🥇", "Там же — одно из крупнейших месторождений золота"], ["🔶", "Добывала серу в начале XX века"], ["🌵", "Карьеры в Аризоне"]], ["Freeport-McMoRan", ["FCX"], "США", "Северная Америка", "Металлы и добыча", 1912]], ["Q55118127", "h", [["🧊", "Основатель начинал с деталей для холодильников"], ["🇸🇪", "Купила шведскую автомарку"], ["🏎️", "Владеет британской маркой спорткаров"], ["🚗", "Китайские автомобили"], ["🌐", "Доля в немецком автоконцерне"]], ["Geely Auto", ["Geely", "Джили"], "Китай", "Азия", "Автомобили", 1986]], ["Q697311", "h", [["🔩", "Один из крупнейших поставщиков автодеталей"], ["🏭", "Собирает машины для других марок по контракту"], ["⛰️", "В Австрии собирает знаменитый внедорожник"], ["🇦🇹", "Основатель — эмигрант из Австрии"], ["🍁", "Штаб-квартира под Торонто"]], ["Magna International", ["MGA", "Магна"], "Канада", "Северная Америка", "Автомобили", 1957]], ["Q294721", "h", [["🍿", "Сеть кинотеатров"], ["🦍", "Мем-акция 2021 года, держатели называли себя «обезьянами»"], ["📈", "Акции взлетели в разы за несколько дней"], ["🛋️", "Раскладные кресла в залах"], ["🎬", "Одна из крупнейших сетей кинотеатров в мире"]], ["AMC Theatres", ["AMC"], "США", "Северная Америка", "Медиа и развлечения", 1920]], ["Q1389504", "h", [["⭐", "Звёздный рейтинг инвестиционных фондов"], ["📖", "Название взято из последней строки книги «Уолден»"], ["📊", "Аналитика для инвесторов"], ["🏙️", "Штаб-квартира в Чикаго"], ["🌅", "В названии — утро"]], ["Morningstar", ["MORN"], "США", "Северная Америка", "Финансы", 1984]], ["Q671267", "h", [["🚢", "Морские грузоперевозки"], ["✈️", "Авиагрузы"], ["📦", "Логистика по всему миру"], ["⚓", "Основана в портовом Бремене"], ["➕", "В названии — плюс"]], ["Kuehne + Nagel", ["KNIN"], "Швейцария", "Европа", "Транспорт", 1890]], ["Q904594", "h", [["🧂", "Добывает калийную соль"], ["🌾", "Сырьё для удобрений"], ["🕳️", "Провалы грунта над шахтами в Березниках"], ["⛰️", "Название указывает на горный регион"], ["⛏️", "Шахты на глубине сотен метров"]], ["Uralkali", ["URKA", "Уралкалий"], "Россия", "Европа", "Металлы и добыча", 1934]], ["Q256290", "h", [["🚆", "Тормоза для поездов"], ["🚛", "Тормозные системы для грузовиков"], ["🛑", "Название буквально про торможение"], ["🏙️", "Штаб-квартира в Мюнхене"], ["🚇", "Двери и системы для метро"]], ["Knorr-Bremse", ["KBX"], "Германия", "Европа", "Транспорт", 1905]], ["Q2266483", "h", [["🛡️", "Бесплатный антивирус"], ["🦠", "Защита от компьютерных вирусов"], ["🏰", "Компания из Брно"], ["🤝", "Купил другой чешский разработчик антивирусов"], ["💻", "Сотни миллионов установок"]], ["AVG Technologies", ["AVG"], "Чехия", "Европа", "Технологии", 1991]], ["Q1384984", "h", [["🪱", "Серия игр про воюющих червяков"], ["💣", "Святая граната и банановая бомба"], ["🍳", "Издатель кооперативной игры про хаос на кухне"], ["🕹️", "Начинали с игр для Amiga"], ["🔢", "В названии — число"]], ["Team17", ["TM17"], "Великобритания", "Европа", "Медиа и развлечения", 1990]], ["Q1576915", "h", [["⚔️", "Серия игр, где один воин раскидывает тысячи врагов"], ["🥷", "Игры про ниндзя Рю Хаябусу"], ["🏯", "Стратегии по «Троецарствию»"], ["🏐", "Пляжный волейбол из файтинг-серии"], ["🤝", "Образована слиянием двух игровых студий"]], ["Koei Tecmo", ["Коэй Текмо"], "Япония", "Азия", "Медиа и развлечения", 2009]], ["Q592182", "h", [["🖥️", "Мониторы"], ["🎨", "Точная цветопередача для дизайнеров и фотографов"], ["🩻", "Медицинские дисплеи для рентгенологов"], ["✈️", "Дисплеи для авиадиспетчеров"], ["🗾", "Японская компания из префектуры Исикава"]], ["Eizo", ["Эйзо"], "Япония", "Азия", "Технологии", 1968]]];

  var PP=[];
  function pool(){ var lv=MODE==='hard'?'h':'e'; PP=P.filter(function(p){ return p[1]===lv; }); }
  var MAX=5;

  /* ---------- Утилиты ---------- */
  function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function norm(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); }
  function store(k,v){ if(k==='state'||k==='stats') k+='_'+MODE; try{ if(v===undefined){ var x=localStorage.getItem('fnd_emoji4_'+k); return x?JSON.parse(x):null; } localStorage.setItem('fnd_emoji4_'+k,JSON.stringify(v)); }catch(e){ return null; } }
  function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  var START=new Date(2026,10,1);
  function dayNumber(){ var d=new Date(); d.setHours(0,0,0,0); return Math.floor((d-START)/86400000)+1; }
  function order(){ var a=PP.map(function(_,i){return i;}), s=20261101+(MODE==='hard'?7777:0); for(var i=a.length-1;i>0;i--){ s=(s*1103515245+12345)%2147483648; var j=s%(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var ORDER=[], booted=false;
  var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

  /* ---------- Состояние ---------- */
  var puzzle, answer, state, testMode=false, dayNo=dayNumber(), prevWrong=0;
  function loadDaily(){
    puzzle=PP[ORDER[((dayNo-1)%PP.length+PP.length)%PP.length]]; answer=COMP[puzzle[0]];
    var saved=store('state');
    state=(saved&&saved.day===todayKey()&&saved.answer===answer.id)?saved:{day:todayKey(),answer:answer.id,guesses:[],done:false,won:false};
    state.guesses=state.guesses.filter(function(id){ return COMP[id]; });
  }
  function loadRandom(){
    var cur=puzzle, p; do{ p=PP[Math.floor(Math.random()*PP.length)]; }while(p===cur&&PP.length>1);
    puzzle=p; answer=COMP[p[0]]; testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false};
  }
  function save(){ if(!testMode) store('state',state); }
  function wrong(){ return state.guesses.filter(function(g){return g!==answer.id;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(g.region&&g.region===answer.region?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }

  /* ---------- Отрисовка ---------- */
  function render(){
    var w=wrong(), shown=state.done?5:Math.min(5,1+w), fresh=w>prevWrong&&!state.done;
    var eh='';
    for(var i=0;i<5;i++){
      if(i<shown) eh+='<div class="t-tile'+(fresh&&i===shown-1?' t-fresh':'')+'">'+puzzle[2][i][0]+'</div>';
      else eh+='<div class="t-tile t-lock">'+LOCK+'</div>';
    }
    $('emojis').innerHTML=eh;
    // статус-бар
    var used=state.guesses.length, sh='';
    for(var k=0;k<MAX;k++){
      var cls = k<used ? (state.won&&k===used-1?'t-win':'t-used') : (!state.done&&k===used?'t-cur':'');
      sh+='<i class="'+cls+'"></i>';
    }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML = state.done ? (state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились') : 'Попытка <b>'+(used+1)+'</b> из '+MAX;
    // таблица
    var th='<div class="t-tr t-th"><span>Компания</span><span>Страна</span><span>Сектор</span><span>Основана</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id,k){
      var g=COMP[id], n=used-k;
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
    renderEnd(); renderStats();
    prevWrong=w;
  }
  function renderEnd(){
    var el=$('end');
    if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
    el.className='t-answer'+(state.won?' t-won':'');
    el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small><h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+(answer.exchange?' · '+esc(answer.exchange):'')+'</p></div>'+
      '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(testMode?'':'<span data-t="countdown"></span>')+'</div>';
    el.hidden=false;
    $('share').onclick=share; tick();
  }
  function renderStats(){
    var st=store('stats')||{played:0,won:0,streak:0,best:0,dist:[0,0,0,0,0,0]};
    var dist=st.dist||[0,0,0,0,0,0], mx=Math.max.apply(null,dist.concat([1]));
    var today=state.done&&!testMode?(state.won?state.guesses.length-1:5):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML = !st.played ? '<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>' :
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  }
  function updateStats(){
    if(testMode) return;
    var st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    st.dist=st.dist||[0,0,0,0,0,0];
    var y=new Date(); y.setDate(y.getDate()-1); var yKey=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===yKey)?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=todayKey(); }
    else{ st.dist[5]++; st.streak=0; st.last=null; }
    store('stats',st);
  }

  /* ---------- Ввод: выбор из списка только подставляет, ответ — кнопкой ---------- */
  /* Поиск как в словаре: сначала названия, начинающиеся с введённого текста (по алфавиту),
     затем — где с него начинается второе и следующие слова. Совпадения из середины слова не показываем. */
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
  function rankList(items,q,nameOf,altsOf,skip,limit){
    var nq=norm(q); if(!nq) return [];
    var out=[];
    items.forEach(function(it){ if(skip(it)) return; var r=rankItem(nameOf(it),altOK(nq)?altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || nameOf(a[1]).localeCompare(nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,limit||8).map(function(x){ return x[1]; });
  }
  var input=$('input'), list=$('list'), active=-1, matches=[];
  function search(q){
    return rankList(LIST,q,function(c){return c.name;},function(c){return c.aliases;},function(c){return state.guesses.indexOf(c.id)>=0;});
  }
  /* Подсветка совпадения жирным в подсказках */
  function hl(s,nq){
    var str=String(s), n='', map=[], i, k;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  }
  function altOK(nq){ return nq.length>=2||/[а-я]/.test(nq); }
  function sugHTML(name,alts,def){
    var nq=norm(input.value), h=hl(name,nq), sub=esc(def);
    if(h.indexOf('<b>')<0&&altOK(nq)){ for(var i=0;i<alts.length;i++){ var ah=hl(alts[i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
    return '<span>'+h+'</span><small>'+sub+'</small>';
  }
  function listOpen(){ return list.style.display==='block'; }
  function showList(){
    matches=search(input.value); active=-1;
    if(!matches.length||(matches.length===1&&norm(matches[0].name)===norm(input.value))){ hideList(); return; }
    list.innerHTML=matches.map(function(c,i){ return '<li data-i="'+i+'">'+sugHTML(c.name,c.aliases,c.aliases[0]||'')+'</li>'; }).join('');
    list.style.display='block';
  }
  function hideList(){ list.style.display='none'; active=-1; }
  function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
  function choose(i){ var c=matches[i]; if(!c) return; input.value=c.name; hideList(); input.focus(); }
  input.addEventListener('input',function(){ $('msg').textContent=''; showList(); });
  input.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'&&listOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
    else if(e.key==='ArrowUp'&&listOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
    else if(e.key==='Enter'){ e.preventDefault(); if(listOpen()&&active>=0) choose(active); else submit(); }
    else if(e.key==='Escape'){ hideList(); }
  });
  list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
  document.addEventListener('click',function(e){ if(!root.contains(e.target)) hideList(); });
  $('submit').addEventListener('click',submit);
  function submit(){
    if(state.done) return;
    var n=norm(input.value);
    var pick=LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id);
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    if(state.done) updateStats();
    save(); input.value=''; hideList(); render();
    if(state.done&&state.won) confetti();
    if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
  }

  /* ---------- Поделиться, таймер ---------- */
  var SQ={ok:'🟩',near:'🟨',miss:'🟥'};
  function share(){
    var lines=state.guesses.map(function(id){ if(id===answer.id) return '🎯'; var r=compare(COMP[id]); return SQ[r.country]+SQ[r.sector]+SQ[r.year]; });
    var text='finanedly · Компании · '+(MODE==='hard'?'Hard':'Easy')+' '+(testMode?'(тест)':'№'+dayNo)+'\n'+(state.won?state.guesses.length:'X')+'/'+MAX+'\n'+lines.join('\n')+'\nfinanedly.com';
    function done(){ toast('Результат скопирован'); }
    function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
  }
  function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
  function tick(){
    var el=$('countdown'); if(!el) return;
    var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
    var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
    el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  setInterval(tick,1000);

  /* ---------- Конфетти при победе ---------- */
  function confetti(){
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
  }
  /* ---------- Окна ---------- */
  function openM(k){ $(k).className='t-modal t-show'; }
  Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
  $('rulesBtn').onclick=function(){ openM('rulesModal'); };
  function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!store('seenRules')){ openM('rulesModal'); store('seenRules',1); } }catch(e){} }
  root.addEventListener('fnd-show',function(){ autoRules(); try{ render(); }catch(e){} });
  $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
  $('statsBtn').onclick=function(){ renderStats(); openM('statsModal'); };
  Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
    b.onclick=function(){
      Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
    };
  });
  $('nav').innerHTML=MODES.map(function(m){ return '<a href="'+m[1]+'"'+(m[2]?' class="t-on"':'')+'>'+m[0]+'</a>'; }).join('');
  (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
  function onMode(){ if(!booted) return; pool(); ORDER=order(); if(testMode){ loadRandom(); root.setAttribute('data-test-answer',answer.name); } else loadDaily(); prevWrong=wrong(); input.value=''; if($('msg')) $('msg').textContent=''; hideList(); render(); }
  /* ---------- Режим Easy / Hard (общий для всех игр) ---------- */
  function paintMode(){ var b=$('modeBtn'); b.className='t-mode t-'+MODE; b.innerHTML='<i></i>'+(MODE==='hard'?'Hard':'Easy'); b.title=MODE==='hard'?'Сложный режим. Нажмите, чтобы переключить на Easy':'Простой режим. Нажмите, чтобы переключить на Hard'; }
  $('modeBtn').onclick=function(){ MODE=MODE==='hard'?'easy':'hard'; try{ localStorage.setItem('fnd_mode',MODE); }catch(e){} paintMode(); onMode(); try{ window.dispatchEvent(new CustomEvent('fnd-mode',{detail:{mode:MODE,from:root.id}})); }catch(e){} };
  window.addEventListener('fnd-mode',function(e){ if(!e.detail||e.detail.from===root.id||e.detail.mode===MODE) return; MODE=e.detail.mode; paintMode(); onMode(true); });
  paintMode();

  /* Тестовый режим: адрес страницы с #test */
  if(/test/.test(location.hash)){
    $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>';
    $('random').onclick=function(){ if(!booted) return; loadRandom(); prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); };
  }
  function boot(j){
    if(booted) return; booted=true;
    if(j){ try{ fromDB(j); }catch(e){} }
    fromPuzzles(); pool(); ORDER=order(); loadDaily(); prevWrong=wrong();
    input.disabled=false; input.placeholder=PH; render();
  }
  var PH=input.placeholder; input.disabled=true; input.placeholder='Загружаем базу компаний…';
  try{ fetch(DATA_URL,{cache:'no-cache'}).then(function(r){ return r.json(); }).then(boot,function(){ boot(null); }); }catch(e){ boot(null); }
  setTimeout(function(){ boot(null); },7000);
})();


(function(){
  var root=document.getElementById('fg2');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var MODE='easy'; try{ if(localStorage.getItem('fnd_mode')==='hard') MODE='hard'; }catch(e){}

  /* Ссылки на страницы режимов в Tilda — заменить на свои */
  var MODES=[['Компании','#companies'],['График','#chart',true],['Ключевые слова','#keywords'],['Цитата','#quote'],['Классика','#classic']];

  /* ---------- События ----------
     Все события доступны как варианты ответа. Загадываются только те, у которых есть график (поле s).
     Поля: id, название, страна, валюта, дата события, тип, короткое описание, [опорные точки курса].
     Курс — сколько единиц местной валюты стоит 1 доллар (у «base»:"EUR» — 1 евро),
     поэтому рост линии = валюта дешевеет.
     ПРОТОТИП: опорные точки примерные, по памяти. Перед запуском заменить реальными курсами ЦБ. */
  var TYPES=['Девальвация','Валютный кризис','Дефолт','Отказ от привязки курса','Политика','Банковский кризис','Внешний шок','Обвал рынка','Смена валюты'];
  var E=[
    {id:'ru1998',name:'Дефолт и девальвация рубля',country:'Россия',cur:'рубль',date:'1998-08-17',type:'Дефолт',
     about:'Правительство объявило технический дефолт по госдолгу и отказалось удерживать курс — рубль за месяц подешевел втрое.',
     s:[['1995-08-01',4.5],['1996-08-01',5.2],['1997-08-01',5.8],['1998-01-15',6.0],['1998-08-14',6.3],['1998-09-08',20.8],['1998-09-28',16.0],['1998-12-30',20.7],['1999-03-15',23.0],['1999-07-15',24.2],['2000-01-15',28.0],['2000-08-01',27.8]]},
    {id:'ar2002',name:'Конец «доллар = песо» в Аргентине',country:'Аргентина',cur:'песо',date:'2002-01-06',type:'Отказ от привязки курса',
     about:'После десяти лет жёсткой привязки 1 песо = 1 доллар страна отказалась от неё на фоне дефолта — песо подешевел почти вчетверо за полгода.',
     s:[['1999-01-15',1.0],['2000-01-15',1.0],['2001-01-15',1.0],['2001-12-28',1.0],['2002-01-14',1.65],['2002-03-25',3.0],['2002-06-25',3.85],['2002-09-15',3.7],['2002-12-30',3.4],['2003-06-15',2.8],['2003-12-30',2.95]]},
    {id:'ch2015',name:'Швейцария отменяет минимальный курс франка',country:'Швейцария',cur:'франк',date:'2015-01-15',type:'Отказ от привязки курса',base:'EUR',
     about:'Нацбанк Швейцарии три года не давал евро упасть ниже 1,20 франка, а потом без предупреждения отменил порог — франк подорожал на 15–20% за минуты.',
     s:[['2011-07-15',1.16],['2011-08-10',1.10],['2011-09-06',1.20],['2012-06-15',1.201],['2013-06-15',1.23],['2014-06-15',1.215],['2015-01-14',1.201],['2015-01-16',1.01],['2015-02-15',1.06],['2015-07-15',1.04],['2016-01-15',1.10],['2016-07-15',1.08],['2017-01-15',1.07]]},
    {id:'uk2016',name:'Референдум о выходе Британии из ЕС',country:'Великобритания',cur:'фунт',date:'2016-06-23',type:'Политика',
     about:'Британцы проголосовали за выход из Евросоюза — фунт упал к доллару до минимумов за 30 лет.',
     s:[['2014-07-15',0.585],['2015-01-15',0.66],['2015-07-15',0.64],['2016-01-15',0.70],['2016-06-23',0.67],['2016-06-27',0.75],['2016-07-15',0.76],['2016-10-07',0.82],['2017-01-15',0.81],['2017-07-15',0.77],['2018-01-15',0.72],['2018-07-15',0.76]]},
    {id:'th1997',name:'Девальвация бата и Азиатский кризис',country:'Таиланд',cur:'бат',date:'1997-07-02',type:'Валютный кризис',
     about:'Таиланд отказался защищать курс бата — с этого начался Азиатский финансовый кризис, бат подешевел вдвое.',
     s:[['1995-01-15',25.1],['1996-01-15',25.2],['1997-01-15',25.7],['1997-07-01',25.8],['1997-07-03',29.5],['1997-08-15',32.0],['1997-10-15',38.0],['1998-01-12',54.0],['1998-03-15',41.0],['1998-07-15',41.5],['1998-12-15',36.5],['1999-07-15',37.5]]},
    {id:'tr2018',name:'Валютный кризис в Турции',country:'Турция',cur:'лира',date:'2018-08-10',type:'Валютный кризис',
     about:'Санкции США, высокая инфляция и долги в валюте обрушили лиру — за несколько дней она потеряла около трети стоимости.',
     s:[['2016-01-15',2.95],['2016-07-15',3.0],['2017-01-15',3.75],['2017-07-15',3.55],['2018-01-15',3.78],['2018-05-23',4.6],['2018-07-31',4.95],['2018-08-13',6.9],['2018-09-15',6.4],['2018-10-15',5.7],['2018-12-15',5.3],['2019-05-15',6.1],['2019-12-15',5.95]]},
    {id:'uk1992',name:'«Чёрная среда» — фунт выходит из ERM',country:'Великобритания',cur:'фунт',date:'1992-09-16',type:'Валютный кризис',
     about:'Британия не смогла удержать фунт в европейском механизме курсов и вышла из него — спекулянты, ставившие на падение, заработали миллиарды.',
     s:[['1990-01-15',0.61],['1990-07-15',0.55],['1991-01-15',0.52],['1991-07-15',0.61],['1992-01-15',0.55],['1992-08-31',0.50],['1992-09-17',0.56],['1992-10-15',0.62],['1992-12-15',0.65],['1993-02-15',0.70],['1993-07-15',0.66],['1994-01-15',0.67],['1994-07-15',0.65]]},
    {id:'ru2014',name:'«Чёрный вторник» рубля',country:'Россия',cur:'рубль',date:'2014-12-16',type:'Валютный кризис',
     about:'Падение нефти и санкции обвалили рубль; ночное повышение ставки до 17% не помогло — за один день курс доллара взлетел почти на 20%.',
     s:[['2012-01-15',31.5],['2012-07-15',32.5],['2013-01-15',30.2],['2013-07-15',32.8],['2014-01-15',33.5],['2014-03-15',36.0],['2014-07-15',34.5],['2014-10-15',41.0],['2014-11-28',50.0],['2014-12-16',70.0],['2014-12-30',56.0],['2015-01-30',69.0],['2015-05-15',50.0],['2015-08-24',70.0],['2016-01-21',80.0],['2016-07-15',64.0],['2016-12-15',61.0]]},
    {id:'mx1994',name:'«Текиловый кризис» в Мексике',country:'Мексика',cur:'песо',date:'1994-12-20',type:'Валютный кризис',
     about:'Мексика внезапно девальвировала песо, капитал побежал из страны — понадобился экстренный пакет помощи от США и МВФ.',
     s:[['1992-01-15',3.06],['1993-01-15',3.1],['1994-01-15',3.1],['1994-03-15',3.35],['1994-12-19',3.47],['1994-12-23',4.7],['1995-01-15',5.5],['1995-03-15',6.8],['1995-06-15',6.2],['1995-11-15',7.7],['1996-06-15',7.5],['1996-12-15',7.85]]},
    {id:'cn2015',name:'Неожиданная девальвация юаня',country:'Китай',cur:'юань',date:'2015-08-11',type:'Девальвация',
     about:'Народный банк Китая за три дня ослабил юань почти на 3% — по меркам юаня это огромный шаг, мировые рынки пошатнуло.',
     s:[['2013-01-15',6.23],['2013-07-15',6.13],['2014-01-15',6.05],['2014-07-15',6.19],['2015-01-15',6.21],['2015-08-10',6.21],['2015-08-13',6.40],['2015-12-15',6.48],['2016-01-15',6.57],['2016-07-15',6.67],['2016-12-15',6.95],['2017-07-15',6.75]]},
    {id:'is2008',name:'Крах банков Исландии',country:'Исландия',cur:'крона',date:'2008-10-06',type:'Банковский кризис',base:'EUR',
     about:'Три крупнейших банка страны, чьи активы в разы превышали ВВП, рухнули за неделю — крона обвалилась, ввели контроль за движением капитала.',
     s:[['2005-07-15',79],['2006-01-15',75],['2006-07-15',92],['2007-01-15',92],['2007-07-15',83],['2008-01-15',92],['2008-03-15',120],['2008-07-15',125],['2008-09-30',150],['2008-10-15',170],['2008-12-15',175],['2009-03-15',160],['2009-07-15',180],['2010-01-15',178],['2010-07-15',156]]},
    {id:'ua2014',name:'Девальвация гривны 2014–2015',country:'Украина',cur:'гривна',date:'2014-02-07',type:'Девальвация',
     about:'Нацбанк перестал удерживать курс около 8 гривен за доллар — за год гривна подешевела втрое.',
     s:[['2012-01-15',8.0],['2013-01-15',8.0],['2013-12-15',8.2],['2014-02-06',8.4],['2014-02-21',9.3],['2014-03-15',10.5],['2014-04-15',12.5],['2014-07-15',11.8],['2014-09-15',13.0],['2014-12-15',15.8],['2015-02-26',30.0],['2015-03-15',23.0],['2015-07-15',21.5],['2016-01-15',24.5]]},
    {id:'eg2016',name:'Египет отпускает фунт в свободное плавание',country:'Египет',cur:'фунт',date:'2016-11-03',type:'Отказ от привязки курса',
     about:'Ради кредита МВФ центробанк отказался от фиксированного курса — египетский фунт за пару недель подешевел вдвое.',
     s:[['2014-01-15',6.96],['2015-01-15',7.15],['2015-07-15',7.63],['2016-03-15',8.85],['2016-11-02',8.88],['2016-11-04',13.0],['2016-11-15',17.0],['2016-12-15',18.5],['2017-01-15',19.0],['2017-07-15',17.9],['2018-01-15',17.7],['2018-07-15',17.9]]},
    {id:'kz2015',name:'Тенге уходит в свободное плавание',country:'Казахстан',cur:'тенге',date:'2015-08-20',type:'Отказ от привязки курса',
     about:'Казахстан перешёл к плавающему курсу — тенге за один день подешевел почти на 30%, а к началу 2016 года вдвое.',
     s:[['2013-01-15',150],['2014-01-15',155],['2014-02-12',184],['2014-07-15',184],['2015-01-15',184],['2015-08-19',188],['2015-08-21',255],['2015-10-15',275],['2015-12-15',340],['2016-01-20',383],['2016-07-15',340],['2017-01-15',333]]},
    {id:'in2013',name:'«Истерика» из-за сворачивания QE',country:'Индия',cur:'рупия',date:'2013-05-22',type:'Внешний шок',
     about:'ФРС намекнула, что скоро начнёт сворачивать покупку облигаций, — инвесторы побежали с развивающихся рынков, рупия упала до рекорда.',
     s:[['2011-07-15',44.4],['2012-01-15',50.0],['2012-07-15',55.5],['2013-01-15',54.0],['2013-05-21',55.5],['2013-06-20',59.5],['2013-08-28',68.8],['2013-10-15',61.5],['2014-01-15',62.5],['2014-07-15',60.3],['2015-01-15',62.2]]},
    {id:'ru2022',name:'Санкции против России, 2022',country:'Россия',cur:'рубль',date:'2022-02-24',type:'Внешний шок',
     about:'После введения масштабных санкций рубль резко упал, но уже к лету из-за ограничений на вывод капитала стал крепче, чем до кризиса.',
     s:[['2020-01-15',61.5],['2020-04-15',75.0],['2020-07-15',71.5],['2021-01-15',74.0],['2021-07-15',73.5],['2022-01-15',76.0],['2022-02-24',84.0],['2022-03-10',120.0],['2022-04-15',80.0],['2022-06-29',52.0],['2022-09-15',60.0],['2022-12-15',70.0],['2023-07-15',90.0],['2023-08-14',100.0]]},
    {id:'eu1999',name:'Запуск евро',country:'Еврозона',cur:'евро',date:'1999-01-04',type:'Смена валюты',
     about:'Евро появился как безналичная валюта 11 стран — и следующие почти два года дешевел к доллару.',
     s:[['1999-01-04',0.85],['1999-07-15',0.97],['2000-01-15',0.98],['2000-05-15',1.10],['2000-10-26',1.21],['2001-07-15',1.17],['2002-01-15',1.13],['2002-07-15',1.01],['2003-01-15',0.94],['2003-07-15',0.88]]},
    // Варианты ответа без графика (ложные следы)
    {id:'us2008',name:'Крах Lehman Brothers',country:'США',cur:'доллар',date:'2008-09-15',type:'Банковский кризис'},
    {id:'us1987',name:'«Чёрный понедельник»',country:'США',cur:'доллар',date:'1987-10-19',type:'Обвал рынка'},
    {id:'us1971',name:'«Никсоновский шок» — конец золотого стандарта',country:'США',cur:'доллар',date:'1971-08-15',type:'Отказ от привязки курса'},
    {id:'us2000',name:'Крах доткомов',country:'США',cur:'доллар',date:'2000-03-10',type:'Обвал рынка'},
    {id:'jp1985',name:'Соглашение «Плаза»',country:'Япония',cur:'иена',date:'1985-09-22',type:'Политика'},
    {id:'gr2015',name:'Долговой кризис и референдум в Греции',country:'Греция',cur:'евро',date:'2015-07-05',type:'Дефолт'},
    {id:'cy2013',name:'Банковский кризис на Кипре',country:'Кипр',cur:'евро',date:'2013-03-16',type:'Банковский кризис'},
    {id:'id1997',name:'Обвал индонезийской рупии',country:'Индонезия',cur:'рупия',date:'1997-08-14',type:'Валютный кризис'},
    {id:'kr1997',name:'Кризис в Южной Корее и помощь МВФ',country:'Южная Корея',cur:'вона',date:'1997-12-03',type:'Валютный кризис'},
    {id:'br1999',name:'Девальвация бразильского реала',country:'Бразилия',cur:'реал',date:'1999-01-13',type:'Девальвация'},
    {id:'kz2014',name:'Девальвация тенге 2014',country:'Казахстан',cur:'тенге',date:'2014-02-11',type:'Девальвация'},
    {id:'ar2018',name:'Кризис песо и кредит МВФ',country:'Аргентина',cur:'песо',date:'2018-05-08',type:'Валютный кризис'},
    {id:'tr2021',name:'Обвал лиры после снижения ставок',country:'Турция',cur:'лира',date:'2021-11-23',type:'Валютный кризис'},
    {id:'uk2022',name:'«Мини-бюджет» Лиз Трасс',country:'Великобритания',cur:'фунт',date:'2022-09-23',type:'Политика'},
    {id:'cn1994',name:'Унификация курса юаня',country:'Китай',cur:'юань',date:'1994-01-01',type:'Девальвация'},
    {id:'ww2020',name:'Пандемия COVID-19 на рынках',country:'Весь мир',cur:'—',date:'2020-03-16',type:'Внешний шок'},
    {id:'ve2018',name:'Деноминация боливара',country:'Венесуэла',cur:'боливар',date:'2018-08-20',type:'Смена валюты'},
    {id:'ru1998b',name:'Деноминация рубля',country:'Россия',cur:'рубль',date:'1998-01-01',type:'Смена валюты'}
  ];
  var REGION={'Россия':'Европа','Великобритания':'Европа','Швейцария':'Европа','Исландия':'Европа','Украина':'Европа','Еврозона':'Европа','Греция':'Европа','Кипр':'Европа','Турция':'Ближний Восток','Египет':'Ближний Восток',
    'Аргентина':'Латинская Америка','Мексика':'Латинская Америка','Бразилия':'Латинская Америка','Венесуэла':'Латинская Америка',
    'Таиланд':'Азия','Китай':'Азия','Индия':'Азия','Япония':'Азия','Индонезия':'Азия','Южная Корея':'Азия','Казахстан':'Азия','США':'Северная Америка','Весь мир':'—'};

  var BY={}; E.forEach(function(e){ e.year=+e.date.slice(0,4); BY[e.id]=e; });
  var PUZ=E.filter(function(e){ return e.s; });
  var MAX=5, DAY=86400000;
  // Окно вокруг события: [дней до, дней после]
  var WINDOWS=[[60,60],[180,180],[365,365],[730,540],[1500,900]];
  var WNAMES=['±2 месяца вокруг события','±6 месяцев','±1 год','2 года до и 1,5 после','вся история'];
  var MONTHS=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];

  /* ---------- Утилиты ---------- */
  function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function norm(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); }
  function store(k,v){ if(k==='state'||k==='stats') k+='_'+MODE; try{ if(v===undefined){ var x=localStorage.getItem('fnd_events_'+k); return x?JSON.parse(x):null; } localStorage.setItem('fnd_events_'+k,JSON.stringify(v)); }catch(e){ return null; } }
  function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  var START=new Date(2026,10,1);
  function dayNumber(){ var d=new Date(); d.setHours(0,0,0,0); return Math.floor((d-START)/DAY)+1; }
  function rng(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }
  function hash(str){ var h=2166136261; for(var i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
  function order(){ var a=PUZ.map(function(_,i){return i;}), r=rng(20261102+(MODE==='hard'?7777:0)); for(var i=a.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var ORDER=order();
  function ts(d){ return Date.parse(d+'T00:00:00Z'); }
  function fmtDate(t){ var d=new Date(t); return d.getUTCDate()+' '+MONTHS[d.getUTCMonth()]+' '+d.getUTCFullYear(); }

  // Дневной ряд по опорным точкам: мост в лог-пространстве с небольшим шумом (условные данные прототипа)
  function buildSeries(ev){
    var r=rng(hash(ev.id)), out=[];
    function gauss(){ var u=r()||1e-9, w=r(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*w); }
    var pts=ev.s.map(function(p){ return [ts(p[0]),p[1]]; });
    out.push({t:pts[0][0],v:pts[0][1]});
    for(var k=1;k<pts.length;k++){
      var a=Math.log(pts[k-1][1]), b=Math.log(pts[k][1]), days=Math.max(1,Math.round((pts[k][0]-pts[k-1][0])/DAY));
      var flat=Math.abs(b-a)<.005, vol=flat?.0006:.004, Wn=[0];
      for(var i=1;i<=days;i++) Wn.push(Wn[i-1]+gauss()*vol);
      for(var j=1;j<=days;j++){ var tt=j/days; out.push({t:pts[k-1][0]+j*DAY, v:Math.exp(a+tt*(b-a)+Wn[j]-tt*Wn[days])}); }
    }
    return out;
  }

  /* ---------- Состояние ---------- */
  var ev, series, state, testMode=false, dayNo=dayNumber();
  function setEvent(e){ ev=e; series=buildSeries(e); }
  function loadDaily(){
    setEvent(PUZ[ORDER[((dayNo-1)%PUZ.length+PUZ.length)%PUZ.length]]);
    var saved=store('state');
    state=(saved&&saved.day===todayKey()&&saved.answer===ev.id)?saved:{day:todayKey(),answer:ev.id,guesses:[],done:false,won:false,dates:rng(hash(ev.id+todayKey()))()<.5};
  }
  function loadRandom(){
    var cur=ev, p; do{ p=PUZ[Math.floor(Math.random()*PUZ.length)]; }while(p===cur);
    setEvent(p); testMode=true; state={day:'test',answer:ev.id,guesses:[],done:false,won:false,dates:Math.random()<.5};
    root.setAttribute('data-test-answer',ev.name);
  }
  function save(){ if(!testMode) store('state',state); }
  function wrong(){ return state.guesses.filter(function(g){return g!==ev.id;}).length; }
  function compare(g){
    var c=g.country===ev.country?'ok':(REGION[g.country]&&REGION[g.country]===REGION[ev.country]?'near':'miss');
    var d=ev.year-g.year;
    return {country:c,year:d===0?'ok':(Math.abs(d)<=2?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':''),type:g.type===ev.type?'ok':'miss'};
  }

  /* ---------- График ---------- */
  var lastStep=0, lastDates=false;
  function fmt(v){ return v>=10000?Math.round(v/1000)+' тыс':String(Math.round(v)); }
  function drawChart(step, showDates){
    lastStep=step; lastDates=showDates;
    var et=ts(ev.date), w=WINDOWS[step], from=et-w[0]*DAY, to=et+w[1]*DAY;
    var data=series.filter(function(p){ return p.t>=from&&p.t<=to; });
    if(data.length<2) data=series;
    var full=data[0].t<=series[0].t&&data[data.length-1].t>=series[series.length-1].t;
    var stepN=Math.max(1,Math.floor(data.length/320)), pts=data.filter(function(_,i){ return i%stepN===0||i===data.length-1; });
    var bw=$('chart').clientWidth||600, W=Math.max(330,Math.min(600,bw-16)), H=Math.round(W*.47), L=6,R=W<450?40:46,T=14,B=28, iw=W-L-R, ih=H-T-B;
    var t0=pts[0].t, t1=pts[pts.length-1].t, base=pts[0].v;
    var vals=pts.map(function(p){ return p.v/base*100; });
    var mn=Math.min.apply(null,vals), mx=Math.max.apply(null,vals), pad=(mx-mn)*.1||5; mn=Math.max(0,mn-pad); mx+=pad;
    function x(t){ return L+iw*(t-t0)/(t1-t0); }
    function y(v){ return T+ih*(1-(v-mn)/(mx-mn)); }
    var path=pts.map(function(p,i){ return (i?'L':'M')+x(p.t).toFixed(1)+' '+y(vals[i]).toFixed(1); }).join('');
    var area=path+'L'+x(t1).toFixed(1)+' '+(T+ih)+'L'+L+' '+(T+ih)+'Z';
    var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="График курса валюты"><defs><linearGradient id="t3l" x1="0" x2="1"><stop offset="0" stop-color="#f0532b"/><stop offset="1" stop-color="#ff8a5c"/></linearGradient><linearGradient id="t3a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0532b" stop-opacity=".28"/><stop offset="1" stop-color="#f0532b" stop-opacity="0"/></linearGradient></defs>';
    for(var g=0;g<=4;g++){ var gv=mn+(mx-mn)*g/4, gy=y(gv); s+='<line x1="'+L+'" x2="'+(L+iw)+'" y1="'+gy.toFixed(1)+'" y2="'+gy.toFixed(1)+'" stroke="#2c2c2c"/><text x="'+(W-4)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="13" fill="#8c8c8c">'+fmt(gv)+'</text>'; }
    if(100>mn&&100<mx) s+='<line x1="'+L+'" x2="'+(L+iw)+'" y1="'+y(100).toFixed(1)+'" y2="'+y(100).toFixed(1)+'" stroke="#f2f2f2" stroke-opacity=".3" stroke-dasharray="3 4"/>';
    // подписи времени
    var spanD=(t1-t0)/DAY, lastRight=-1e9, d=new Date(t0); d=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1));
    var everyM = spanD<=150?1:(spanD<=400?2:(spanD<=800?6:12));
    for(;d.getTime()<=t1;d=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1))){
      if(d.getUTCMonth()%everyM!==0) continue;
      var tx=x(d.getTime());
      s+='<line x1="'+tx.toFixed(1)+'" x2="'+tx.toFixed(1)+'" y1="'+(T+ih)+'" y2="'+(T+ih+4)+'" stroke="#3a3a3a"/>';
      if(!showDates||tx>L+iw-16) continue;
      var lab=everyM>=12||d.getUTCMonth()===0?String(d.getUTCFullYear()):MONTHS[d.getUTCMonth()];
      var anchor=tx<L+22?'start':'middle', lw=lab.length*7.4, left=anchor==='start'?tx:tx-lw/2;
      if(left<lastRight+8) continue; lastRight=left+lw;
      s+='<text x="'+tx.toFixed(1)+'" y="'+(H-6)+'" text-anchor="'+anchor+'" font-size="13" fill="#8c8c8c">'+lab+'</text>';
    }
    s+='<path d="'+area+'" fill="url(#t3a)"/><path d="'+path+'" fill="none" stroke="url(#t3l)" stroke-width="2.2" stroke-linejoin="round"/>';
    // отметка события
    if(et>=t0&&et<=t1){
      var ex=x(et), near=pts.reduce(function(b,p,i){ return Math.abs(p.t-et)<Math.abs(pts[b].t-et)?i:b; },0);
      s+='<line x1="'+ex.toFixed(1)+'" x2="'+ex.toFixed(1)+'" y1="'+T+'" y2="'+(T+ih)+'" stroke="#f2f2f2" stroke-opacity=".45" stroke-dasharray="2 4"/>';
      s+='<circle cx="'+ex.toFixed(1)+'" cy="'+y(vals[near]).toFixed(1)+'" r="5" fill="#111" stroke="#ff8a5c" stroke-width="2.5"/>';
    }
    s+='</svg>';
    $('chart').innerHTML=s;
    $('range').innerHTML='Период: <b>'+(full&&step>0?WNAMES[4]:WNAMES[step])+'</b> · справа — цена доллара в местной валюте, начало периода = 100 · линия вверх = валюта дешевеет'+(showDates?'':' · даты скрыты');
  }
  var rT; window.addEventListener('resize',function(){ clearTimeout(rT); rT=setTimeout(function(){ if(series) drawChart(lastStep,lastDates); },150); });

  /* ---------- Отрисовка ---------- */
  function render(){
    var w=wrong();
    drawChart(state.done?4:Math.min(4,w), state.done||state.dates||w>=2);
    var used=state.guesses.length, sh='';
    for(var k=0;k<MAX;k++){
      var cls=k<used?(state.won&&k===used-1?'t-win':'t-used'):(!state.done&&k===used?'t-cur':'');
      sh+='<i class="'+cls+'"></i>';
    }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML=state.done?(state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились'):'Попытка <b>'+(used+1)+'</b> из '+MAX;
    var th='<div class="t-tr t-th"><span>Событие</span><span>Страна</span><span>Тип</span><span>Год</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id,k){
      var g=BY[id], n=used-k;
      if(id===ev.id){
        th+='<div class="t-tr t-win"><span class="t-co">'+esc(g.name)+'</span><span class="t-chip t-cty ok">'+esc(g.country)+'</span><span class="t-chip ok t-hide-m">'+esc(g.type)+'</span><span class="t-chip t-yr ok">'+g.year+'</span></div>';
        return;
      }
      var r=compare(g);
      th+='<div class="t-tr"><span class="t-co">'+esc(g.name)+'</span>'+
        '<span class="t-chip t-cty '+r.country+'">'+esc(g.country)+'</span>'+
        '<span class="t-chip t-hide-m '+r.type+'">'+esc(g.type)+'</span>'+
        '<span class="t-chip t-yr '+r.year+'">'+g.year+r.arrow+'</span></div>';
    });
    $('table').innerHTML=th;
    $('play').style.display=state.done?'none':'';
    renderEnd(); renderStats();
  }
  function renderEnd(){
    var el=$('end');
    if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
    el.className='t-answer'+(state.won?' t-won':'');
    el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small><h2>'+esc(ev.name)+'</h2><p>'+esc(ev.country)+' · '+esc(ev.cur)+' · '+fmtDate(ts(ev.date))+' · '+esc(ev.type)+'</p></div>'+
      '<p class="t-about">'+esc(ev.about)+'</p>'+
      '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(testMode?'':'<span data-t="countdown"></span>')+'</div>';
    el.hidden=false;
    $('share').onclick=share; tick();
  }
  function renderStats(){
    var st=store('stats')||{played:0,won:0,streak:0,best:0,dist:[0,0,0,0,0,0]};
    var dist=st.dist||[0,0,0,0,0,0], mx=Math.max.apply(null,dist.concat([1]));
    var today=state.done&&!testMode?(state.won?state.guesses.length-1:5):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML=!st.played?'<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>':
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  }
  function updateStats(){
    if(testMode) return;
    var st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    st.dist=st.dist||[0,0,0,0,0,0];
    var y=new Date(); y.setDate(y.getDate()-1); var yKey=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===yKey)?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=todayKey(); }
    else{ st.dist[5]++; st.streak=0; st.last=null; }
    store('stats',st);
  }

  /* ---------- Ввод: поиск по названию, стране, валюте; выбор только подставляет ---------- */
  /* Поиск как в словаре: сначала названия, начинающиеся с введённого текста (по алфавиту),
     затем — где с него начинается второе и следующие слова. Совпадения из середины слова не показываем. */
  function words(s){ return String(s).toLowerCase().replace(/ё/g,'е').split(/[^a-zа-я0-9]+/).filter(Boolean); }
  function wscore(s,nq){
    var w=words(s); if(!w.length) return -1;
    if(w.join('').indexOf(nq)===0) return 0;
    for(var i=1;i<w.length;i++){ if(w.slice(i).join('').indexOf(nq)===0) return 1; }
    return -1;
  }
  function rankItem(name,alts,nq){
    var s=wscore(name,nq); if(s===0) return 0; if(s===1) return 1;
    var a=-1; for(var i=0;i<alts.length;i++){ var x=wscore(alts[i],nq); if(x===0){ a=0; break; } if(x===1) a=1; }
    if(a===0) return 2; if(a===1) return 3; return -1;
  }
  function rankList(items,q,nameOf,altsOf,skip,limit){
    var nq=norm(q); if(!nq) return [];
    var out=[];
    items.forEach(function(it){ if(skip(it)) return; var r=rankItem(nameOf(it),altOK(nq)?altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || nameOf(a[1]).localeCompare(nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,limit||8).map(function(x){ return x[1]; });
  }
  var input=$('input'), list=$('list'), active=-1, matches=[];
  function search(q){
    return rankList(E,q,function(e){return e.name.replace(/[«»„“"]/g,'');},function(e){return [e.country,e.cur];},function(e){return state.guesses.indexOf(e.id)>=0;},10);
  }
  /* Подсветка совпадения жирным в подсказках */
  function hl(s,nq){
    var str=String(s), n='', map=[], i, k;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  }
  function altOK(nq){ return nq.length>=2||/[а-я]/.test(nq); }
  function sugHTML(name,alts,def){
    var nq=norm(input.value), h=hl(name,nq), sub=esc(def);
    if(h.indexOf('<b>')<0&&altOK(nq)){ for(var i=0;i<alts.length;i++){ var ah=hl(alts[i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
    return '<span>'+h+'</span><small>'+sub+'</small>';
  }
  function listOpen(){ return list.style.display==='block'; }
  function showList(){
    matches=search(input.value); active=-1;
    if(!matches.length||(matches.length===1&&norm(matches[0].name)===norm(input.value))){ hideList(); return; }
    list.innerHTML=matches.map(function(e,i){ return '<li data-i="'+i+'">'+sugHTML(e.name,[e.country,e.cur],e.country)+'</li>'; }).join('');
    list.style.display='block';
  }
  function hideList(){ list.style.display='none'; active=-1; }
  function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
  function choose(i){ var e=matches[i]; if(!e) return; input.value=e.name; hideList(); input.focus(); }
  input.addEventListener('input',function(){ $('msg').textContent=''; showList(); });
  input.addEventListener('focus',function(){ if(input.value) showList(); });
  input.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'&&listOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
    else if(e.key==='ArrowUp'&&listOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
    else if(e.key==='Enter'){ e.preventDefault(); if(listOpen()&&active>=0) choose(active); else submit(); }
    else if(e.key==='Escape'){ hideList(); }
  });
  list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
  document.addEventListener('click',function(e){ if(!root.contains(e.target)) hideList(); });
  $('submit').addEventListener('click',submit);
  function submit(){
    if(state.done) return;
    var n=norm(input.value);
    var pick=E.filter(function(e){ return norm(e.name)===n; })[0];
    if(!pick){ $('msg').textContent=input.value?'Выберите событие из списка — можно искать по стране или валюте':'Введите событие, страну или валюту'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Это событие вы уже называли'; return; }
    state.guesses.push(pick.id);
    if(pick.id===ev.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    if(state.done) updateStats();
    save(); input.value=''; hideList(); render();
    if(state.done&&state.won) confetti();
    if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
  }

  /* ---------- Поделиться, таймер ---------- */
  var SQ={ok:'🟩',near:'🟨',miss:'🟥'};
  function share(){
    var lines=state.guesses.map(function(id){ if(id===ev.id) return '🎯'; var r=compare(BY[id]); return SQ[r.country]+SQ[r.type]+SQ[r.year]; });
    var text='finanedly · График · '+(MODE==='hard'?'Hard':'Easy')+' '+(testMode?'(тест)':'№'+dayNo)+'\n'+(state.won?state.guesses.length:'X')+'/'+MAX+'\n'+lines.join('\n')+'\nfinanedly.com';
    function done(){ toast('Результат скопирован'); }
    function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
  }
  function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
  function tick(){
    var el=$('countdown'); if(!el) return;
    var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
    var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
    el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  setInterval(tick,1000);

  /* ---------- Конфетти при победе ---------- */
  function confetti(){
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
  }
  /* ---------- Окна ---------- */
  function openM(k){ $(k).className='t-modal t-show'; }
  Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
  $('rulesBtn').onclick=function(){ openM('rulesModal'); };
  function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!store('seenRules')){ openM('rulesModal'); store('seenRules',1); } }catch(e){} }
  root.addEventListener('fnd-show',function(){ autoRules(); try{ render(); }catch(e){} });
  $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
  $('statsBtn').onclick=function(){ renderStats(); openM('statsModal'); };
  Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
    b.onclick=function(){
      Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
    };
  });
  $('nav').innerHTML=MODES.map(function(m){ return '<a href="'+m[1]+'"'+(m[2]?' class="t-on"':'')+'>'+m[0]+'</a>'; }).join('');
  (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
  function onMode(){ ORDER=order(); if(testMode){ loadRandom(); root.setAttribute('data-test-answer',ev.name); } else loadDaily(); input.value=''; if($('msg')) $('msg').textContent=''; hideList(); render(); }
  /* ---------- Режим Easy / Hard (общий для всех игр) ---------- */
  function paintMode(){ var b=$('modeBtn'); b.className='t-mode t-'+MODE; b.innerHTML='<i></i>'+(MODE==='hard'?'Hard':'Easy'); b.title=MODE==='hard'?'Сложный режим. Нажмите, чтобы переключить на Easy':'Простой режим. Нажмите, чтобы переключить на Hard'; }
  $('modeBtn').onclick=function(){ MODE=MODE==='hard'?'easy':'hard'; try{ localStorage.setItem('fnd_mode',MODE); }catch(e){} paintMode(); onMode(); try{ window.dispatchEvent(new CustomEvent('fnd-mode',{detail:{mode:MODE,from:root.id}})); }catch(e){} };
  window.addEventListener('fnd-mode',function(e){ if(!e.detail||e.detail.from===root.id||e.detail.mode===MODE) return; MODE=e.detail.mode; paintMode(); onMode(true); });
  paintMode();
  if(/test/.test(location.hash)){
    $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>';
    $('random').onclick=function(){ loadRandom(); render(); input.focus(); };
  }
  loadDaily(); render();
})();


(function(){
  var root=document.getElementById('fg3');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var MODE='easy'; try{ if(localStorage.getItem('fnd_mode')==='hard') MODE='hard'; }catch(e){}

  /* Ссылки на страницы режимов в Tilda — заменить на свои */
  var MODES=[['Компании','#companies'],['График','#chart'],['Ключевые слова','#keywords',true],['Цитата','#quote'],['Классика','#classic']];

  /* ---------- Данные (прототип: проверить перед запуском) ---------- */
  var C = [
    ['tesla','Tesla',['TSLA','тесла'],'США','Автомобили',2003,'NASDAQ'],
    ['toyota','Toyota',['TM','7203','тойота'],'Япония','Автомобили',1937,'Токийская биржа'],
    ['vw','Volkswagen',['VOW3','фольксваген','vw'],'Германия','Автомобили',1937,'Франкфуртская биржа'],
    ['bmw','BMW',['BMW','бмв'],'Германия','Автомобили',1916,'Франкфуртская биржа'],
    ['mercedes','Mercedes-Benz Group',['MBG','мерседес','daimler'],'Германия','Автомобили',1926,'Франкфуртская биржа'],
    ['honda','Honda',['HMC','7267','хонда'],'Япония','Автомобили',1948,'Токийская биржа'],
    ['hyundai','Hyundai Motor',['005380','хендай','хёндэ'],'Южная Корея','Автомобили',1967,'Корейская биржа'],
    ['ford','Ford',['F','форд'],'США','Автомобили',1903,'NYSE'],
    ['gm','General Motors',['GM','дженерал моторс'],'США','Автомобили',1908,'NYSE'],
    ['apple','Apple',['AAPL','эппл','эпл'],'США','Технологии',1976,'NASDAQ'],
    ['microsoft','Microsoft',['MSFT','майкрософт'],'США','Технологии',1975,'NASDAQ'],
    ['alphabet','Alphabet (Google)',['GOOGL','GOOG','google','гугл'],'США','Технологии',1998,'NASDAQ'],
    ['meta','Meta',['META','facebook','фейсбук','мета'],'США','Технологии',2004,'NASDAQ'],
    ['tencent','Tencent',['0700','TCEHY','тенсент'],'Китай','Технологии',1998,'Гонконгская биржа'],
    ['uber','Uber',['UBER','убер'],'США','Технологии',2009,'NYSE'],
    ['airbnb','Airbnb',['ABNB','эйрбиэнби'],'США','Технологии',2008,'NASDAQ'],
    ['shopify','Shopify',['SHOP','шопифай'],'Канада','Технологии',2006,'NYSE'],
    ['samsung','Samsung Electronics',['005930','самсунг'],'Южная Корея','Электроника',1969,'Корейская биржа'],
    ['sony','Sony',['SONY','6758','сони'],'Япония','Электроника',1946,'Токийская биржа'],
    ['nvidia','Nvidia',['NVDA','нвидиа','нвидия'],'США','Полупроводники',1993,'NASDAQ'],
    ['intel','Intel',['INTC','интел'],'США','Полупроводники',1968,'NASDAQ'],
    ['amd','AMD',['AMD','амд'],'США','Полупроводники',1969,'NASDAQ'],
    ['amazon','Amazon',['AMZN','амазон'],'США','Электронная торговля',1994,'NASDAQ'],
    ['alibaba','Alibaba',['BABA','алибаба'],'Китай','Электронная торговля',1999,'NYSE'],
    ['netflix','Netflix',['NFLX','нетфликс'],'США','Медиа и развлечения',1997,'NASDAQ'],
    ['spotify','Spotify',['SPOT','спотифай'],'Швеция','Медиа и развлечения',2006,'NYSE'],
    ['disney','Walt Disney',['DIS','дисней'],'США','Медиа и развлечения',1923,'NYSE'],
    ['nintendo','Nintendo',['NTDOY','7974','нинтендо'],'Япония','Медиа и развлечения',1889,'Токийская биржа'],
    ['coca','Coca-Cola',['KO','кока-кола','кока кола'],'США','Напитки и продукты',1892,'NYSE'],
    ['pepsico','PepsiCo',['PEP','пепси'],'США','Напитки и продукты',1965,'NASDAQ'],
    ['nestle','Nestlé',['NESN','nestle','нестле'],'Швейцария','Напитки и продукты',1866,'Швейцарская биржа'],
    ['unilever','Unilever',['ULVR','UL','юнилевер'],'Великобритания','Потребительские товары',1929,'Лондонская биржа'],
    ['starbucks','Starbucks',['SBUX','старбакс'],'США','Рестораны',1971,'NASDAQ'],
    ['nike','Nike',['NKE','найк'],'США','Одежда и обувь',1964,'NYSE'],
    ['adidas','Adidas',['ADS','адидас'],'Германия','Одежда и обувь',1949,'Франкфуртская биржа'],
    ['puma','Puma',['PUM','пума'],'Германия','Одежда и обувь',1948,'Франкфуртская биржа'],
    ['visa','Visa',['V','виза'],'США','Финансы и платежи',1958,'NYSE'],
    ['mastercard','Mastercard',['MA','мастеркард'],'США','Финансы и платежи',1966,'NYSE'],
    ['paypal','PayPal',['PYPL','пейпал'],'США','Финансы и платежи',1998,'NASDAQ'],
    ['pfizer','Pfizer',['PFE','пфайзер'],'США','Фармацевтика',1849,'NYSE'],
    ['jnj','Johnson & Johnson',['JNJ','джонсон'],'США','Фармацевтика',1886,'NYSE'],
    ['moderna','Moderna',['MRNA','модерна'],'США','Фармацевтика',2010,'NASDAQ']
  ];
  var COMP={}, LIST=[];
  C.forEach(function(r){ var o={id:r[0],name:r[1],aliases:r[2],country:r[3],sector:r[4],founded:r[5],exchange:r[6]}; COMP[o.id]=o; LIST.push(o); });
  var REGION={'США':'Северная Америка','Канада':'Северная Америка','Германия':'Европа','Швеция':'Европа','Швейцария':'Европа','Великобритания':'Европа','Франция':'Европа','Япония':'Азия','Китай':'Азия','Южная Корея':'Азия'};
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
  var MAX=5;

  /* ---------- Утилиты ---------- */
  function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function norm(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); }
  function store(k,v){ if(k==='state'||k==='stats') k+='_'+MODE; try{ if(v===undefined){ var x=localStorage.getItem('fnd_kw4_'+k); return x?JSON.parse(x):null; } localStorage.setItem('fnd_kw4_'+k,JSON.stringify(v)); }catch(e){ return null; } }
  function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  var START=new Date(2026,10,1);
  function dayNumber(){ var d=new Date(); d.setHours(0,0,0,0); return Math.floor((d-START)/86400000)+1; }
  function order(){ var a=P.map(function(_,i){return i;}), s=20261103+(MODE==='hard'?7777:0); for(var i=a.length-1;i>0;i--){ s=(s*1103515245+12345)%2147483648; var j=s%(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var ORDER=order();
  var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

  /* ---------- Состояние ---------- */
  var puzzle, answer, state, testMode=false, dayNo=dayNumber(), prevWrong=0;
  function loadDaily(){
    puzzle=P[ORDER[((dayNo-1)%P.length+P.length)%P.length]]; answer=COMP[puzzle[0]];
    var saved=store('state');
    state=(saved&&saved.day===todayKey()&&saved.answer===answer.id)?saved:{day:todayKey(),answer:answer.id,guesses:[],done:false,won:false};
  }
  function loadRandom(){
    var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur);
    puzzle=p; answer=COMP[p[0]]; testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false};
  }
  function save(){ if(!testMode) store('state',state); }
  function wrong(){ return state.guesses.filter(function(g){return g!==answer.id;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(REGION[g.country]===REGION[answer.country]?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }

  /* ---------- Отрисовка ---------- */
  function render(){
    var w=wrong(), shown=state.done?5:Math.min(5,1+w), fresh=w>prevWrong&&!state.done;
    var eh='';
    for(var i=0;i<5;i++){
      if(i<shown) eh+='<li class="t-word'+(fresh&&i===shown-1?' t-fresh':'')+'"><b>'+(i+1)+'</b>'+esc(puzzle[1][i][0])+'</li>';
      else eh+='<li class="t-word t-lock"><b>'+LOCK+'</b>откроется после '+i+'-й ошибки</li>';
    }
    $('words').innerHTML=eh;
    // статус-бар
    var used=state.guesses.length, sh='';
    for(var k=0;k<MAX;k++){
      var cls = k<used ? (state.won&&k===used-1?'t-win':'t-used') : (!state.done&&k===used?'t-cur':'');
      sh+='<i class="'+cls+'"></i>';
    }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML = state.done ? (state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились') : 'Попытка <b>'+(used+1)+'</b> из '+MAX;
    // таблица
    var th='<div class="t-tr t-th"><span>Компания</span><span>Страна</span><span>Сектор</span><span>Основана</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id,k){
      var g=COMP[id], n=used-k;
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
    renderEnd(); renderStats();
    prevWrong=w;
  }
  function renderEnd(){
    var el=$('end');
    if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
    el.className='t-answer'+(state.won?' t-won':'');
    el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small><h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+' · '+esc(answer.exchange)+'</p></div>'+
      '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(testMode?'':'<span data-t="countdown"></span>')+'</div>';
    el.hidden=false;
    $('share').onclick=share; tick();
  }
  function renderStats(){
    var st=store('stats')||{played:0,won:0,streak:0,best:0,dist:[0,0,0,0,0,0]};
    var dist=st.dist||[0,0,0,0,0,0], mx=Math.max.apply(null,dist.concat([1]));
    var today=state.done&&!testMode?(state.won?state.guesses.length-1:5):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML = !st.played ? '<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>' :
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  }
  function updateStats(){
    if(testMode) return;
    var st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    st.dist=st.dist||[0,0,0,0,0,0];
    var y=new Date(); y.setDate(y.getDate()-1); var yKey=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===yKey)?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=todayKey(); }
    else{ st.dist[5]++; st.streak=0; st.last=null; }
    store('stats',st);
  }

  /* ---------- Ввод: выбор из списка только подставляет, ответ — кнопкой ---------- */
  /* Поиск как в словаре: сначала названия, начинающиеся с введённого текста (по алфавиту),
     затем — где с него начинается второе и следующие слова. Совпадения из середины слова не показываем. */
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
  function rankList(items,q,nameOf,altsOf,skip,limit){
    var nq=norm(q); if(!nq) return [];
    var out=[];
    items.forEach(function(it){ if(skip(it)) return; var r=rankItem(nameOf(it),altOK(nq)?altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || nameOf(a[1]).localeCompare(nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,limit||8).map(function(x){ return x[1]; });
  }
  var input=$('input'), list=$('list'), active=-1, matches=[];
  function search(q){
    return rankList(LIST,q,function(c){return c.name;},function(c){return c.aliases;},function(c){return state.guesses.indexOf(c.id)>=0;});
  }
  /* Подсветка совпадения жирным в подсказках */
  function hl(s,nq){
    var str=String(s), n='', map=[], i, k;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  }
  function altOK(nq){ return nq.length>=2||/[а-я]/.test(nq); }
  function sugHTML(name,alts,def){
    var nq=norm(input.value), h=hl(name,nq), sub=esc(def);
    if(h.indexOf('<b>')<0&&altOK(nq)){ for(var i=0;i<alts.length;i++){ var ah=hl(alts[i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
    return '<span>'+h+'</span><small>'+sub+'</small>';
  }
  function listOpen(){ return list.style.display==='block'; }
  function showList(){
    matches=search(input.value); active=-1;
    if(!matches.length||(matches.length===1&&norm(matches[0].name)===norm(input.value))){ hideList(); return; }
    list.innerHTML=matches.map(function(c,i){ return '<li data-i="'+i+'">'+sugHTML(c.name,c.aliases,c.aliases[0])+'</li>'; }).join('');
    list.style.display='block';
  }
  function hideList(){ list.style.display='none'; active=-1; }
  function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
  function choose(i){ var c=matches[i]; if(!c) return; input.value=c.name; hideList(); input.focus(); }
  input.addEventListener('input',function(){ $('msg').textContent=''; showList(); });
  input.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'&&listOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
    else if(e.key==='ArrowUp'&&listOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
    else if(e.key==='Enter'){ e.preventDefault(); if(listOpen()&&active>=0) choose(active); else submit(); }
    else if(e.key==='Escape'){ hideList(); }
  });
  list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
  document.addEventListener('click',function(e){ if(!root.contains(e.target)) hideList(); });
  $('submit').addEventListener('click',submit);
  function submit(){
    if(state.done) return;
    var n=norm(input.value);
    var pick=LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id);
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    if(state.done) updateStats();
    save(); input.value=''; hideList(); render();
    if(state.done&&state.won) confetti();
    if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
  }

  /* ---------- Поделиться, таймер ---------- */
  var SQ={ok:'🟩',near:'🟨',miss:'🟥'};
  function share(){
    var lines=state.guesses.map(function(id){ if(id===answer.id) return '🎯'; var r=compare(COMP[id]); return SQ[r.country]+SQ[r.sector]+SQ[r.year]; });
    var text='finanedly · Ключевые слова · '+(MODE==='hard'?'Hard':'Easy')+' '+(testMode?'(тест)':'№'+dayNo)+'\n'+(state.won?state.guesses.length:'X')+'/'+MAX+'\n'+lines.join('\n')+'\nfinanedly.com';
    function done(){ toast('Результат скопирован'); }
    function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
  }
  function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
  function tick(){
    var el=$('countdown'); if(!el) return;
    var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
    var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
    el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  setInterval(tick,1000);

  /* ---------- Конфетти при победе ---------- */
  function confetti(){
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
  }
  /* ---------- Окна ---------- */
  function openM(k){ $(k).className='t-modal t-show'; }
  Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
  $('rulesBtn').onclick=function(){ openM('rulesModal'); };
  function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!store('seenRules')){ openM('rulesModal'); store('seenRules',1); } }catch(e){} }
  root.addEventListener('fnd-show',function(){ autoRules(); try{ render(); }catch(e){} });
  $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
  $('statsBtn').onclick=function(){ renderStats(); openM('statsModal'); };
  Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
    b.onclick=function(){
      Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
    };
  });
  $('nav').innerHTML=MODES.map(function(m){ return '<a href="'+m[1]+'"'+(m[2]?' class="t-on"':'')+'>'+m[0]+'</a>'; }).join('');
  (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
  function onMode(){ ORDER=order(); if(testMode){ loadRandom(); root.setAttribute('data-test-answer',answer.name); } else loadDaily(); prevWrong=wrong(); input.value=''; if($('msg')) $('msg').textContent=''; hideList(); render(); }
  /* ---------- Режим Easy / Hard (общий для всех игр) ---------- */
  function paintMode(){ var b=$('modeBtn'); b.className='t-mode t-'+MODE; b.innerHTML='<i></i>'+(MODE==='hard'?'Hard':'Easy'); b.title=MODE==='hard'?'Сложный режим. Нажмите, чтобы переключить на Easy':'Простой режим. Нажмите, чтобы переключить на Hard'; }
  $('modeBtn').onclick=function(){ MODE=MODE==='hard'?'easy':'hard'; try{ localStorage.setItem('fnd_mode',MODE); }catch(e){} paintMode(); onMode(); try{ window.dispatchEvent(new CustomEvent('fnd-mode',{detail:{mode:MODE,from:root.id}})); }catch(e){} };
  window.addEventListener('fnd-mode',function(e){ if(!e.detail||e.detail.from===root.id||e.detail.mode===MODE) return; MODE=e.detail.mode; paintMode(); onMode(true); });
  paintMode();

  /* Тестовый режим: адрес страницы с #test */
  if(/test/.test(location.hash)){
    $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>';
    $('random').onclick=function(){ loadRandom(); prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); };
  }
  loadDaily(); prevWrong=wrong(); render();
})();


(function(){
  var root=document.getElementById('fg4');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var MODE='easy'; try{ if(localStorage.getItem('fnd_mode')==='hard') MODE='hard'; }catch(e){}

  /* Ссылки на страницы режимов в Tilda — заменить на свои */
  var MODES=[['Компании','#companies'],['График','#chart'],['Ключевые слова','#keywords'],['Цитата','#quote',true],['Классика','#classic']];

  /* ---------- Данные (прототип: проверить перед запуском) ---------- */
  var C = [
    ['tesla','Tesla',['TSLA','тесла'],'США','Автомобили',2003,'NASDAQ'],
    ['toyota','Toyota',['TM','7203','тойота'],'Япония','Автомобили',1937,'Токийская биржа'],
    ['vw','Volkswagen',['VOW3','фольксваген','vw'],'Германия','Автомобили',1937,'Франкфуртская биржа'],
    ['bmw','BMW',['BMW','бмв'],'Германия','Автомобили',1916,'Франкфуртская биржа'],
    ['mercedes','Mercedes-Benz Group',['MBG','мерседес','daimler'],'Германия','Автомобили',1926,'Франкфуртская биржа'],
    ['honda','Honda',['HMC','7267','хонда'],'Япония','Автомобили',1948,'Токийская биржа'],
    ['hyundai','Hyundai Motor',['005380','хендай','хёндэ'],'Южная Корея','Автомобили',1967,'Корейская биржа'],
    ['ford','Ford',['F','форд'],'США','Автомобили',1903,'NYSE'],
    ['gm','General Motors',['GM','дженерал моторс'],'США','Автомобили',1908,'NYSE'],
    ['apple','Apple',['AAPL','эппл','эпл'],'США','Технологии',1976,'NASDAQ'],
    ['microsoft','Microsoft',['MSFT','майкрософт'],'США','Технологии',1975,'NASDAQ'],
    ['alphabet','Alphabet (Google)',['GOOGL','GOOG','google','гугл'],'США','Технологии',1998,'NASDAQ'],
    ['meta','Meta',['META','facebook','фейсбук','мета'],'США','Технологии',2004,'NASDAQ'],
    ['tencent','Tencent',['0700','TCEHY','тенсент'],'Китай','Технологии',1998,'Гонконгская биржа'],
    ['uber','Uber',['UBER','убер'],'США','Технологии',2009,'NYSE'],
    ['airbnb','Airbnb',['ABNB','эйрбиэнби'],'США','Технологии',2008,'NASDAQ'],
    ['shopify','Shopify',['SHOP','шопифай'],'Канада','Технологии',2006,'NYSE'],
    ['samsung','Samsung Electronics',['005930','самсунг'],'Южная Корея','Электроника',1969,'Корейская биржа'],
    ['sony','Sony',['SONY','6758','сони'],'Япония','Электроника',1946,'Токийская биржа'],
    ['nvidia','Nvidia',['NVDA','нвидиа','нвидия'],'США','Полупроводники',1993,'NASDAQ'],
    ['intel','Intel',['INTC','интел'],'США','Полупроводники',1968,'NASDAQ'],
    ['amd','AMD',['AMD','амд'],'США','Полупроводники',1969,'NASDAQ'],
    ['amazon','Amazon',['AMZN','амазон'],'США','Электронная торговля',1994,'NASDAQ'],
    ['alibaba','Alibaba',['BABA','алибаба'],'Китай','Электронная торговля',1999,'NYSE'],
    ['netflix','Netflix',['NFLX','нетфликс'],'США','Медиа и развлечения',1997,'NASDAQ'],
    ['spotify','Spotify',['SPOT','спотифай'],'Швеция','Медиа и развлечения',2006,'NYSE'],
    ['disney','Walt Disney',['DIS','дисней'],'США','Медиа и развлечения',1923,'NYSE'],
    ['nintendo','Nintendo',['NTDOY','7974','нинтендо'],'Япония','Медиа и развлечения',1889,'Токийская биржа'],
    ['coca','Coca-Cola',['KO','кока-кола','кока кола'],'США','Напитки и продукты',1892,'NYSE'],
    ['pepsico','PepsiCo',['PEP','пепси'],'США','Напитки и продукты',1965,'NASDAQ'],
    ['nestle','Nestlé',['NESN','nestle','нестле'],'Швейцария','Напитки и продукты',1866,'Швейцарская биржа'],
    ['unilever','Unilever',['ULVR','UL','юнилевер'],'Великобритания','Потребительские товары',1929,'Лондонская биржа'],
    ['starbucks','Starbucks',['SBUX','старбакс'],'США','Рестораны',1971,'NASDAQ'],
    ['nike','Nike',['NKE','найк'],'США','Одежда и обувь',1964,'NYSE'],
    ['adidas','Adidas',['ADS','адидас'],'Германия','Одежда и обувь',1949,'Франкфуртская биржа'],
    ['puma','Puma',['PUM','пума'],'Германия','Одежда и обувь',1948,'Франкфуртская биржа'],
    ['visa','Visa',['V','виза'],'США','Финансы и платежи',1958,'NYSE'],
    ['mastercard','Mastercard',['MA','мастеркард'],'США','Финансы и платежи',1966,'NYSE'],
    ['paypal','PayPal',['PYPL','пейпал'],'США','Финансы и платежи',1998,'NASDAQ'],
    ['pfizer','Pfizer',['PFE','пфайзер'],'США','Фармацевтика',1849,'NYSE'],
    ['jnj','Johnson & Johnson',['JNJ','джонсон'],'США','Фармацевтика',1886,'NYSE'],
    ['moderna','Moderna',['MRNA','модерна'],'США','Фармацевтика',2010,'NASDAQ']
  ];
  var COMP={}, LIST=[];
  C.forEach(function(r){ var o={id:r[0],name:r[1],aliases:r[2],country:r[3],sector:r[4],founded:r[5],exchange:r[6]}; COMP[o.id]=o; LIST.push(o); });

  /* ---------- Люди (для режима Hard: угадываем автора цитаты) ----------
     [имя, id компании, синонимы]. Авторы цитат + известные основатели и CEO как ложные следы. */
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
  var REGION={'США':'Северная Америка','Канада':'Северная Америка','Германия':'Европа','Швеция':'Европа','Швейцария':'Европа','Великобритания':'Европа','Франция':'Европа','Япония':'Азия','Китай':'Азия','Южная Корея':'Азия'};
  var P=[
    ['apple','Оставайтесь голодными. Оставайтесь безрассудными.','Stay Hungry. Stay Foolish.','Стив Джобс','С. Д.','сооснователь и CEO',2005,'Речь перед выпускниками Стэнфорда','🎓📱','https://news.stanford.edu/2005/06/12/youve-got-find-love-jobs-says/'],
    ['amazon','День второй — это застой. Затем потеря актуальности. Затем мучительный упадок. Затем смерть. Поэтому у нас всегда день первый.','Day 2 is stasis. Followed by irrelevance. Followed by excruciating, painful decline. Followed by death. And that is why it is always Day 1.','Джефф Безос','Д. Б.','основатель и CEO',2017,'Письмо акционерам за 2016 год','📦☁️','https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders'],
    ['meta','Двигайся быстро и ломай. Если ты ничего не ломаешь, значит, движешься недостаточно быстро.','Move fast and break things. The idea is that if you never break anything, you’re probably not moving fast enough.','Марк Цукерберг','М. Ц.','основатель и CEO',2012,'Письмо инвесторам перед IPO','👍🥽','https://www.snopes.com/fact-check/move-fast-break-things-facebook-motto/'],
    ['netflix','Мы, по сути, конкурируем со сном.','We’re competing with sleep, on the margin.','Рид Хастингс','Р. Х.','сооснователь и CEO',2017,'Звонок с инвесторами по итогам квартала','🍿📺','https://www.cnbc.com/2017/04/17/amazon-hbo-netflix-thinks-its-real-competitor-is--sleep.html'],
    ['nvidia','Мы переживаем „момент iPhone“ для искусственного интеллекта.','We are at the iPhone moment of AI.','Дженсен Хуанг','Д. Х.','основатель и CEO',2023,'Ключевой доклад на конференции GTC','🎮🧠','https://blogs.nvidia.com/blog/gtc-keynote-spring-2023/'],
    ['microsoft','Наша отрасль не уважает традиции — она уважает только инновации.','Our industry does not respect tradition — it only respects innovation.','Сатья Наделла','С. Н.','CEO',2014,'Письмо сотрудникам в первый день на посту CEO','☁️💼','https://news.microsoft.com/source/2014/02/04/satya-nadella-email-to-employees-on-first-day-as-ceo/'],
    ['tesla','Построить спорткар. На эти деньги построить доступный автомобиль. На эти деньги построить ещё более доступный автомобиль.','Build sports car. Use that money to build an affordable car. Use that money to build an even more affordable car.','Илон Маск','И. М.','сооснователь и CEO',2006,'„Секретный генеральный план“ в блоге компании','🔋⚡','https://www.tesla.com/secret-master-plan'],
    ['microsoft','Контент — вот где, как я ожидаю, в интернете будут зарабатываться настоящие деньги, как это было в теле- и радиовещании.','Content is where I expect much of the real money will be made on the Internet, just as it was in broadcasting.','Билл Гейтс','Б. Г.','сооснователь и CEO',1996,'Эссе „Content is King“','💾🪟','http://web.archive.org/web/20010126005200/http://www.microsoft.com/billgates/columns/1996essay/essay960103.asp']
  ];
  var MAX=5;

  /* ---------- Утилиты ---------- */
  function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function norm(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); }
  function store(k,v){ if(k==='state'||k==='stats') k+='_'+MODE; try{ if(v===undefined){ var x=localStorage.getItem('fnd_quote6_'+k); return x?JSON.parse(x):null; } localStorage.setItem('fnd_quote6_'+k,JSON.stringify(v)); }catch(e){ return null; } }
  function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  var START=new Date(2026,10,1);
  function dayNumber(){ var d=new Date(); d.setHours(0,0,0,0); return Math.floor((d-START)/86400000)+1; }
  function order(){ var a=P.map(function(_,i){return i;}), s=20261104; for(var i=a.length-1;i>0;i--){ s=(s*1103515245+12345)%2147483648; var j=s%(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var ORDER=order();
  var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

  /* ---------- Состояние ---------- */
  var puzzle, answer, state, testMode=false, dayNo=dayNumber(), prevWrong=0;
  function loadDaily(){
    var qi=ORDER[((dayNo-1)%P.length+P.length)%P.length]; puzzle=P[qi]; answer=COMP[puzzle[0]];
    var saved=store('state');
    state=(saved&&saved.day===todayKey()&&saved.q===qi)?saved:{day:todayKey(),q:qi,answer:tgt().id,guesses:[],done:false,won:false};
  }
  function loadRandom(){
    var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur);
    puzzle=p; answer=COMP[p[0]]; testMode=true; state={day:'test',answer:tgt().id,guesses:[],done:false,won:false};
  }
  function tgt(){ return MODE==='hard' ? PER[puzzle[3]] : answer; }
  function pool(){ return MODE==='hard' ? PEOPLE : LIST; }
  function save(){ if(!testMode) store('state',state); }
  function wrong(){ var a=tgt().id; return state.guesses.filter(function(g){return g!==a;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(REGION[g.country]===REGION[answer.country]?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }

  function compareP(pp){ var c=COMP[pp.company]; return {company:pp.company===answer.id?'ok':'miss',country:c.country===answer.country?'ok':(REGION[c.country]===REGION[answer.country]?'near':'miss'),sector:c.sector===answer.sector?'ok':'miss'}; }
  /* ---------- Отрисовка ---------- */
  function render(){
    var w=wrong(), nh=state.done?4:Math.min(4,w), fresh=w>prevWrong&&!state.done;
    $('quote').textContent=puzzle[1];
    var em=Array.from(puzzle[8]);
    var HV = MODE==='easy' ? [puzzle[6],answer.country,puzzle[8],puzzle[4]] : [puzzle[6],answer.country,em[0],em[1]||''], hh='';
    for(var i=0;i<4;i++){
      if(i<nh) hh+='<div class="t-hint'+(fresh&&i===nh-1?' t-fresh':'')+(/^[^0-9a-zа-яё]+$/i.test(String(HV[i]))?' t-emo':'')+'"><span>'+esc(HV[i])+'</span></div>';
      else hh+='<div class="t-hint t-lock"><span>'+LOCK+'</span></div>';
    }
    $('hints').innerHTML=hh;
    // статус-бар
    var used=state.guesses.length, sh='';
    for(var k=0;k<MAX;k++){
      var cls = k<used ? (state.won&&k===used-1?'t-win':'t-used') : (!state.done&&k===used?'t-cur':'');
      sh+='<i class="'+cls+'"></i>';
    }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML = state.done ? (state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились') : 'Попытка <b>'+(used+1)+'</b> из '+MAX;
    // таблица
    $('input').placeholder = MODE==='hard' ? 'Имя автора цитаты' : 'Название компании или тикер';
    $('note').innerHTML = MODE==='hard'
      ? '<span class="t-c-ok">Зелёный</span> — совпадает с компанией автора, <span class="t-c-near">жёлтый</span> — близко (тот же регион), <span class="t-c-miss">красный</span> — не совпадает.'
      : '<span class="t-c-ok">Зелёный</span> — совпадает с загаданной компанией, <span class="t-c-near">жёлтый</span> — близко (тот же регион или разница до 10 лет), <span class="t-c-miss">красный</span> — не совпадает. Стрелка у года подсказывает, основана загаданная компания позже (↑) или раньше (↓).';
    if(MODE==='hard'){
      var tp='<div class="t-tr t-th"><span>Автор</span><span>Компания</span><span>Страна</span><span>Сектор</span></div>';
      if(!used) tp+='<div class="t-empty">Здесь появятся ваши ответы</div>';
      state.guesses.slice().reverse().forEach(function(id,k){
        var pp=PER[id], c=COMP[pp.company], n=used-k, win=id===tgt().id, r=win?{company:'ok',country:'ok',sector:'ok'}:compareP(pp);
        tp+='<div class="t-tr'+(win?' t-win':'')+'"><span class="t-co">'+esc(pp.name)+'</span>'+
          '<span class="t-chip t-yr '+r.company+'">'+esc(c.name)+'</span>'+
          '<span class="t-chip t-cty '+r.country+'">'+esc(c.country)+'</span>'+
          '<span class="t-chip t-hide-m '+r.sector+'">'+esc(c.sector)+'</span></div>';
      });
      $('table').innerHTML=tp;
      $('play').style.display=state.done?'none':'';
      renderEnd(); renderStats(); prevWrong=w;
      return;
    }
    var th='<div class="t-tr t-th"><span>Компания</span><span>Страна</span><span>Сектор</span><span>Основана</span></div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id,k){
      var g=COMP[id], n=used-k;
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
    renderEnd(); renderStats();
    prevWrong=w;
  }
  function renderEnd(){
    var el=$('end');
    if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
    el.className='t-answer'+(state.won?' t-won':'');
    var head = MODE==='hard' ? esc(puzzle[3])+'</h2><p>'+esc(puzzle[5])+', '+esc(answer.name)+'</p>' : esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+' · '+esc(answer.exchange)+'</p>';
    el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small><h2>'+head+'<p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+' · '+esc(answer.exchange)+'</p></div>'+
      '<div class="t-orig">«'+esc(puzzle[2])+'»</div>'+
      '<div class="t-src">'+esc(puzzle[3])+', '+esc(puzzle[5])+' · '+esc(puzzle[7])+', '+puzzle[6]+'</div>'+
      '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(testMode?'':'<span data-t="countdown"></span>')+'</div>';
    el.hidden=false;
    $('share').onclick=share; tick();
  }
  function renderStats(){
    var st=store('stats')||{played:0,won:0,streak:0,best:0,dist:[0,0,0,0,0,0]};
    var dist=st.dist||[0,0,0,0,0,0], mx=Math.max.apply(null,dist.concat([1]));
    var today=state.done&&!testMode?(state.won?state.guesses.length-1:5):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML = !st.played ? '<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>' :
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  }
  function updateStats(){
    if(testMode) return;
    var st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    st.dist=st.dist||[0,0,0,0,0,0];
    var y=new Date(); y.setDate(y.getDate()-1); var yKey=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===yKey)?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=todayKey(); }
    else{ st.dist[5]++; st.streak=0; st.last=null; }
    store('stats',st);
  }

  /* ---------- Ввод: выбор из списка только подставляет, ответ — кнопкой ---------- */
  /* Поиск как в словаре: сначала названия, начинающиеся с введённого текста (по алфавиту),
     затем — где с него начинается второе и следующие слова. Совпадения из середины слова не показываем. */
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
  function rankList(items,q,nameOf,altsOf,skip,limit){
    var nq=norm(q); if(!nq) return [];
    var out=[];
    items.forEach(function(it){ if(skip(it)) return; var r=rankItem(nameOf(it),altOK(nq)?altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || nameOf(a[1]).localeCompare(nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,limit||8).map(function(x){ return x[1]; });
  }
  var input=$('input'), list=$('list'), active=-1, matches=[];
  function search(q){
    return rankList(pool(),q,function(c){return c.name;},function(c){return c.aliases;},function(c){return state.guesses.indexOf(c.id)>=0;});
  }
  /* Подсветка совпадения жирным в подсказках */
  function hl(s,nq){
    var str=String(s), n='', map=[], i, k;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  }
  function altOK(nq){ return nq.length>=2||/[а-я]/.test(nq); }
  function sugHTML(name,alts,def){
    var nq=norm(input.value), h=hl(name,nq), sub=esc(def);
    if(h.indexOf('<b>')<0&&altOK(nq)){ for(var i=0;i<alts.length;i++){ var ah=hl(alts[i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
    return '<span>'+h+'</span><small>'+sub+'</small>';
  }
  function listOpen(){ return list.style.display==='block'; }
  function showList(){
    matches=search(input.value); active=-1;
    if(!matches.length||(matches.length===1&&norm(matches[0].name)===norm(input.value))){ hideList(); return; }
    list.innerHTML=matches.map(function(c,i){ return '<li data-i="'+i+'">'+sugHTML(c.name,c.aliases,MODE==='hard'?COMP[c.company].name:c.aliases[0])+'</li>'; }).join('');
    list.style.display='block';
  }
  function hideList(){ list.style.display='none'; active=-1; }
  function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
  function choose(i){ var c=matches[i]; if(!c) return; input.value=c.name; hideList(); input.focus(); }
  input.addEventListener('input',function(){ $('msg').textContent=''; showList(); });
  input.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'&&listOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
    else if(e.key==='ArrowUp'&&listOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
    else if(e.key==='Enter'){ e.preventDefault(); if(listOpen()&&active>=0) choose(active); else submit(); }
    else if(e.key==='Escape'){ hideList(); }
  });
  list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
  document.addEventListener('click',function(e){ if(!root.contains(e.target)) hideList(); });
  $('submit').addEventListener('click',submit);
  function submit(){
    if(state.done) return;
    var n=norm(input.value);
    var pick=pool().filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    var who=MODE==='hard'?['Такого человека нет в списке — выберите из подсказок','Введите имя автора','Этого человека вы уже называли']:['Такой компании нет в списке — выберите из подсказок','Введите название компании','Эту компанию вы уже называли'];
    if(!pick){ $('msg').textContent=input.value?who[0]:who[1]; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent=who[2]; return; }
    state.guesses.push(pick.id);
    if(pick.id===tgt().id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    if(state.done) updateStats();
    save(); input.value=''; hideList(); render();
    if(state.done&&state.won) confetti();
    if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
  }

  /* ---------- Поделиться, таймер ---------- */
  var SQ={ok:'🟩',near:'🟨',miss:'🟥'};
  function share(){
    var lines=state.guesses.map(function(id){ if(id===tgt().id) return '🎯'; if(MODE==='hard'){ var q=compareP(PER[id]); return SQ[q.company]+SQ[q.country]+SQ[q.sector]; } var r=compare(COMP[id]); return SQ[r.country]+SQ[r.sector]+SQ[r.year]; });
    var text='finanedly · Цитата · '+(MODE==='easy'?'Easy':'Hard')+' '+(testMode?'(тест)':'№'+dayNo)+'\n'+(state.won?state.guesses.length:'X')+'/'+MAX+'\n'+lines.join('\n')+'\nfinanedly.com';
    function done(){ toast('Результат скопирован'); }
    function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
  }
  function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
  function tick(){
    var el=$('countdown'); if(!el) return;
    var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
    var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
    el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  setInterval(tick,1000);

  /* ---------- Конфетти при победе ---------- */
  function confetti(){
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
  }
  /* ---------- Окна ---------- */
  function openM(k){ $(k).className='t-modal t-show'; }
  Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
  $('rulesBtn').onclick=function(){ openM('rulesModal'); };
  function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!store('seenRules')){ openM('rulesModal'); store('seenRules',1); } }catch(e){} }
  root.addEventListener('fnd-show',function(){ autoRules(); try{ render(); }catch(e){} });
  $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
  $('statsBtn').onclick=function(){ $('statsSub').textContent='Режим «Цитата» · '+(MODE==='easy'?'Easy':'Hard'); renderStats(); openM('statsModal'); };
  Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
    b.onclick=function(){
      Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
    };
  });
  $('nav').innerHTML=MODES.map(function(m){ return '<a href="'+m[1]+'"'+(m[2]?' class="t-on"':'')+'>'+m[0]+'</a>'; }).join('');
  (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
  function onMode(){ if(testMode){ state={day:'test',answer:tgt().id,guesses:[],done:false,won:false}; root.setAttribute('data-test-answer',tgt().name); } else loadDaily(); prevWrong=wrong(); input.value=''; $('msg').textContent=''; hideList(); render(); }
  /* ---------- Режим Easy / Hard (общий для всех игр) ---------- */
  function paintMode(){ var b=$('modeBtn'); b.className='t-mode t-'+MODE; b.innerHTML='<i></i>'+(MODE==='hard'?'Hard':'Easy'); b.title=MODE==='hard'?'Сложный режим. Нажмите, чтобы переключить на Easy':'Простой режим. Нажмите, чтобы переключить на Hard'; }
  $('modeBtn').onclick=function(){ MODE=MODE==='hard'?'easy':'hard'; try{ localStorage.setItem('fnd_mode',MODE); }catch(e){} paintMode(); onMode(); try{ window.dispatchEvent(new CustomEvent('fnd-mode',{detail:{mode:MODE,from:root.id}})); }catch(e){} };
  window.addEventListener('fnd-mode',function(e){ if(!e.detail||e.detail.from===root.id||e.detail.mode===MODE) return; MODE=e.detail.mode; paintMode(); onMode(true); });
  paintMode();

  /* Тестовый режим: адрес страницы с #test */
  if(/test/.test(location.hash)){
    $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>';
    $('random').onclick=function(){ loadRandom(); prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',tgt().name); };
  }
  loadDaily(); prevWrong=wrong(); render();
})();


(function(){
  var root=document.getElementById('fg5');
  if(!root||root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready','1');
  var MODE='easy'; try{ if(localStorage.getItem('fnd_mode')==='hard') MODE='hard'; }catch(e){}

  /* Ссылки на страницы режимов в Tilda — заменить на свои */
  var MODES=[['Компании','#companies'],['График','#chart'],['Ключевые слова','#keywords'],['Цитата','#quote'],['Классика','#classic',true]];

  /* ---------- Данные (прототип: проверить перед запуском) ---------- */
  var C = [
    ['tesla','Tesla',['TSLA','тесла'],'США','Автомобили',2003,'NASDAQ'],
    ['toyota','Toyota',['TM','7203','тойота'],'Япония','Автомобили',1937,'Токийская биржа'],
    ['vw','Volkswagen',['VOW3','фольксваген','vw'],'Германия','Автомобили',1937,'Франкфуртская биржа'],
    ['bmw','BMW',['BMW','бмв'],'Германия','Автомобили',1916,'Франкфуртская биржа'],
    ['mercedes','Mercedes-Benz Group',['MBG','мерседес','daimler'],'Германия','Автомобили',1926,'Франкфуртская биржа'],
    ['honda','Honda',['HMC','7267','хонда'],'Япония','Автомобили',1948,'Токийская биржа'],
    ['hyundai','Hyundai Motor',['005380','хендай','хёндэ'],'Южная Корея','Автомобили',1967,'Корейская биржа'],
    ['ford','Ford',['F','форд'],'США','Автомобили',1903,'NYSE'],
    ['gm','General Motors',['GM','дженерал моторс'],'США','Автомобили',1908,'NYSE'],
    ['apple','Apple',['AAPL','эппл','эпл'],'США','Технологии',1976,'NASDAQ'],
    ['microsoft','Microsoft',['MSFT','майкрософт'],'США','Технологии',1975,'NASDAQ'],
    ['alphabet','Alphabet (Google)',['GOOGL','GOOG','google','гугл'],'США','Технологии',1998,'NASDAQ'],
    ['meta','Meta',['META','facebook','фейсбук','мета'],'США','Технологии',2004,'NASDAQ'],
    ['tencent','Tencent',['0700','TCEHY','тенсент'],'Китай','Технологии',1998,'Гонконгская биржа'],
    ['uber','Uber',['UBER','убер'],'США','Технологии',2009,'NYSE'],
    ['airbnb','Airbnb',['ABNB','эйрбиэнби'],'США','Технологии',2008,'NASDAQ'],
    ['shopify','Shopify',['SHOP','шопифай'],'Канада','Технологии',2006,'NYSE'],
    ['samsung','Samsung Electronics',['005930','самсунг'],'Южная Корея','Электроника',1969,'Корейская биржа'],
    ['sony','Sony',['SONY','6758','сони'],'Япония','Электроника',1946,'Токийская биржа'],
    ['nvidia','Nvidia',['NVDA','нвидиа','нвидия'],'США','Полупроводники',1993,'NASDAQ'],
    ['intel','Intel',['INTC','интел'],'США','Полупроводники',1968,'NASDAQ'],
    ['amd','AMD',['AMD','амд'],'США','Полупроводники',1969,'NASDAQ'],
    ['amazon','Amazon',['AMZN','амазон'],'США','Электронная торговля',1994,'NASDAQ'],
    ['alibaba','Alibaba',['BABA','алибаба'],'Китай','Электронная торговля',1999,'NYSE'],
    ['netflix','Netflix',['NFLX','нетфликс'],'США','Медиа и развлечения',1997,'NASDAQ'],
    ['spotify','Spotify',['SPOT','спотифай'],'Швеция','Медиа и развлечения',2006,'NYSE'],
    ['disney','Walt Disney',['DIS','дисней'],'США','Медиа и развлечения',1923,'NYSE'],
    ['nintendo','Nintendo',['NTDOY','7974','нинтендо'],'Япония','Медиа и развлечения',1889,'Токийская биржа'],
    ['coca','Coca-Cola',['KO','кока-кола','кока кола'],'США','Напитки и продукты',1892,'NYSE'],
    ['pepsico','PepsiCo',['PEP','пепси'],'США','Напитки и продукты',1965,'NASDAQ'],
    ['nestle','Nestlé',['NESN','nestle','нестле'],'Швейцария','Напитки и продукты',1866,'Швейцарская биржа'],
    ['unilever','Unilever',['ULVR','UL','юнилевер'],'Великобритания','Потребительские товары',1929,'Лондонская биржа'],
    ['starbucks','Starbucks',['SBUX','старбакс'],'США','Рестораны',1971,'NASDAQ'],
    ['nike','Nike',['NKE','найк'],'США','Одежда и обувь',1964,'NYSE'],
    ['adidas','Adidas',['ADS','адидас'],'Германия','Одежда и обувь',1949,'Франкфуртская биржа'],
    ['puma','Puma',['PUM','пума'],'Германия','Одежда и обувь',1948,'Франкфуртская биржа'],
    ['visa','Visa',['V','виза'],'США','Финансы и платежи',1958,'NYSE'],
    ['mastercard','Mastercard',['MA','мастеркард'],'США','Финансы и платежи',1966,'NYSE'],
    ['paypal','PayPal',['PYPL','пейпал'],'США','Финансы и платежи',1998,'NASDAQ'],
    ['pfizer','Pfizer',['PFE','пфайзер'],'США','Фармацевтика',1849,'NYSE'],
    ['jnj','Johnson & Johnson',['JNJ','джонсон'],'США','Фармацевтика',1886,'NYSE'],
    ['moderna','Moderna',['MRNA','модерна'],'США','Фармацевтика',2010,'NASDAQ']
  ];
  var COMP={}, LIST=[];
  C.forEach(function(r){ var o={id:r[0],name:r[1],aliases:r[2],country:r[3],sector:r[4],founded:r[5],exchange:r[6]}; COMP[o.id]=o; LIST.push(o); });
  var REGION={'США':'Северная Америка','Канада':'Северная Америка','Германия':'Европа','Швеция':'Европа','Швейцария':'Европа','Великобритания':'Европа','Франция':'Европа','Япония':'Азия','Китай':'Азия','Южная Корея':'Азия'};
  // «Смежные» секторы дают жёлтый
  var SECTOR_GROUP={'Технологии':'tech','Электроника':'tech','Полупроводники':'tech','Электронная торговля':'tech','Напитки и продукты':'cons','Потребительские товары':'cons','Рестораны':'cons','Одежда и обувь':'cons','Медиа и развлечения':'media','Финансы и платежи':'fin','Фармацевтика':'pharma','Автомобили':'auto'};
  var EXCHANGE_COUNTRY={'NASDAQ':'США','NYSE':'США','Франкфуртская биржа':'Германия','Токийская биржа':'Япония','Корейская биржа':'Южная Корея','Швейцарская биржа':'Швейцария','Лондонская биржа':'Великобритания','Гонконгская биржа':'Китай'};

  var SHORT={'Франкфуртская биржа':'Франкфурт','Токийская биржа':'Токио','Корейская биржа':'Сеул','Швейцарская биржа':'Цюрих (SIX)','Лондонская биржа':'Лондон','Гонконгская биржа':'Гонконг','Электронная торговля':'E-commerce','Напитки и продукты':'Напитки, продукты','Потребительские товары':'Товары для дома','Медиа и развлечения':'Медиа','Финансы и платежи':'Платежи','Великобритания':'Британия'};
  /* ---------- Колонки сравнения ---------- */
  var COLS=[
    {key:'country',title:'Страна',cmp:function(g,a){ return g.country===a.country?'ok':(REGION[g.country]===REGION[a.country]?'near':'miss'); }},
    {key:'sector',title:'Сектор',info:true,cmp:function(g,a){ return g.sector===a.sector?'ok':(SECTOR_GROUP[g.sector]===SECTOR_GROUP[a.sector]?'near':'miss'); }},
    {key:'exchange',title:'Биржа',info:true,cmp:function(g,a){ return g.exchange===a.exchange?'ok':(EXCHANGE_COUNTRY[g.exchange]===EXCHANGE_COUNTRY[a.exchange]?'near':'miss'); }},
    {key:'cap',title:'Капитализация',ratio:2,fmt:function(v){return fmtCap(v);}},
    {key:'emp',title:'Сотрудники',ratio:2,fmt:function(v){return fmtEmp(v);}},
    {key:'founded',title:'Основана',num:true,near:10}
  ];

  var P=LIST.map(function(c){ return [c.id]; });
  var MAX=7;

  /* Капитализация, млрд $ — companiesmarketcap.com на 25.11.2026 (Puma — оценка на июль 2026). Обновлять скриптом. */
  var CAP_DATE='25 ноября 2026';
  var CAP={tesla:1520,toyota:246.42,vw:35.71,bmw:36.10,mercedes:39.01,honda:42.97,hyundai:52.78,ford:47.61,gm:68.72,apple:5145,microsoft:3684,alphabet:3400,meta:1507,tencent:394.10,uber:132.11,airbnb:103.82,shopify:170.21,samsung:829.39,sony:161.96,nvidia:3751,intel:291.26,amd:683.98,amazon:2728,alibaba:211.11,netflix:241.73,spotify:123.26,disney:209.25,nintendo:63.47,coca:419.95,pepsico:194.43,nestle:265.47,unilever:140.46,starbucks:121.28,nike:53.09,adidas:31.18,puma:4.31,visa:777.62,mastercard:564.03,paypal:46.62,pfizer:162.21,jnj:665.52,moderna:91.93};
  LIST.forEach(function(c){ c.cap=CAP[c.id]; });
  function fmtCap(b){ if(b>=1000) return '$'+(b/1000).toFixed(b>=10000?0:2).replace('.',',').replace(/,?0+$/,'')+' трлн'; if(b>=10) return '$'+Math.round(b)+' млрд'; return '$'+b.toFixed(1).replace('.',',')+' млрд'; }
  /* Сотрудники — последние годовые отчёты (companiesmarketcap.com, отчёты компаний, SEC), данные 2025–2026 */
  var EMP={tesla:134785,toyota:367990,vw:656134,bmw:159104,mercedes:163132,honda:195109,hyundai:63018,ford:169000,gm:156000,apple:150000,microsoft:223000,alphabet:198933,meta:75472,tencent:109414,uber:36600,airbnb:8200,shopify:7600,samsung:259149,sony:94900,nvidia:42000,intel:85100,amd:31000,amazon:1595000,alibaba:132165,netflix:16000,spotify:7287,disney:175560,nintendo:8666,coca:65900,pepsico:306000,nestle:270000,unilever:93731,starbucks:381000,nike:73000,adidas:46045,puma:18488,visa:34100,mastercard:39800,paypal:23800,pfizer:75000,jnj:138200,moderna:4700};
  LIST.forEach(function(c){ c.emp=EMP[c.id]; });
  function fmtEmp(n){ if(n>=1e6) return (n/1e6).toFixed(1).replace('.',',')+' млн'; if(n>=1e4) return Math.round(n/1000)+' тыс'; return (n/1000).toFixed(1).replace('.',',')+' тыс'; }
  /* Списки для подсказок в заголовках */
  function uniq(key){ var s={}; LIST.forEach(function(c){ s[c[key]]=1; }); return Object.keys(s); }
  function infoHTML(key){
    var groups={}, order=[], map=key==='sector'?SECTOR_GROUP:EXCHANGE_COUNTRY;
    uniq(key).forEach(function(v){ var g=map[v]||v; if(!groups[g]){groups[g]=[];order.push(g);} groups[g].push(SHORT[v]||v); });
    var head=key==='sector'?'Секторы в игре. В одной строке — смежные, они подсвечиваются жёлтым.':'Биржи в игре. Биржи одной страны подсвечиваются жёлтым.';
    return '<b>'+head+'</b>'+order.map(function(g){ var vals=groups[g].sort(function(a,b){return a.localeCompare(b,'ru');}); return '<div>'+(key==='exchange'?'<em>'+esc(g)+':</em> ':'')+vals.map(esc).join(' · ')+'</div>'; }).join('');
  }
  /* ---------- Утилиты ---------- */
  function $(k){ return root.querySelector('[data-t="'+k+'"]'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function norm(s){ return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]/g,''); }
  function store(k,v){ try{ if(v===undefined){ var x=localStorage.getItem('fnd_classic4_'+k); return x?JSON.parse(x):null; } localStorage.setItem('fnd_classic4_'+k,JSON.stringify(v)); }catch(e){ return null; } }
  function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  var START=new Date(2026,10,1);
  function dayNumber(){ var d=new Date(); d.setHours(0,0,0,0); return Math.floor((d-START)/86400000)+1; }
  function order(){ var a=P.map(function(_,i){return i;}), s=20261105; for(var i=a.length-1;i>0;i--){ s=(s*1103515245+12345)%2147483648; var j=s%(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var ORDER=order();
  var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

  /* ---------- Состояние ---------- */
  var puzzle, answer, state, testMode=false, dayNo=dayNumber(), prevWrong=0;
  function loadDaily(){
    puzzle=P[ORDER[((dayNo-1)%P.length+P.length)%P.length]]; answer=COMP[puzzle[0]];
    var saved=store('state');
    state=(saved&&saved.day===todayKey()&&saved.answer===answer.id)?saved:{day:todayKey(),answer:answer.id,guesses:[],done:false,won:false};
  }
  function loadRandom(){
    var cur=puzzle, p; do{ p=P[Math.floor(Math.random()*P.length)]; }while(p===cur);
    puzzle=p; answer=COMP[p[0]]; testMode=true; state={day:'test',answer:answer.id,guesses:[],done:false,won:false};
  }
  function save(){ if(!testMode) store('state',state); }
  var justAdded=null;
  function cell(col,g){
    if(col.ratio){ var A=answer[col.key], G=g[col.key], r=Math.max(A,G)/Math.min(A,G); return {cls:A===G?'ok':(r<=col.ratio?'near':'miss'),text:col.fmt(G)+(A>G?' ↑':(A<G?' ↓':''))}; }
    if(col.num){ var d=answer[col.key]-g[col.key]; return {cls:d===0?'ok':(Math.abs(d)<=col.near?'near':'miss'),text:g[col.key]+(d>0?' ↑':(d<0?' ↓':''))}; }
    return {cls:col.cmp(g,answer),text:SHORT[g[col.key]]||g[col.key]};
  }
  function plural(n,f){ var a=n%100,b=n%10; if(a>10&&a<20) return f[2]; if(b===1) return f[0]; if(b>1&&b<5) return f[1]; return f[2]; }
  function wrong(){ return state.guesses.filter(function(g){return g!==answer.id;}).length; }
  function compare(g){
    var c=g.country===answer.country?'ok':(REGION[g.country]===REGION[answer.country]?'near':'miss');
    var s=g.sector===answer.sector?'ok':'miss';
    var d=answer.founded-g.founded;
    return {country:c,sector:s,year:d===0?'ok':(Math.abs(d)<=10?'near':'miss'),arrow:d>0?' ↑':(d<0?' ↓':'')};
  }

  /* ---------- Отрисовка ---------- */
  function render(){
    var w=wrong();
    // статус-бар
    var used=state.guesses.length;
    var sh=''; for(var k=0;k<MAX;k++){ var cls=k<used?(state.won&&k===used-1?'t-win':'t-used'):(!state.done&&k===used?'t-cur':''); sh+='<i class="'+cls+'"></i>'; }
    $('steps').innerHTML=sh;
    $('stxt').innerHTML = state.done ? (state.won?'Угадано с <b>'+used+'</b>-й попытки':'Попытки закончились') : 'Попытка <b>'+(used+1)+'</b> из '+MAX;
    // таблица
    var th='<div class="t-tr t-th"><span>Компания</span>'+COLS.map(function(c){ return c.info?'<span class="t-hd" tabindex="0">'+c.title+'<span class="t-hd-tip">'+infoHTML(c.key)+'</span></span>':'<span>'+c.title+'</span>'; }).join('')+'</div>';
    if(!used) th+='<div class="t-empty">Здесь появятся ваши ответы</div>';
    state.guesses.slice().reverse().forEach(function(id,k){
      var g=COMP[id], n=used-k, win=id===answer.id;
      th+='<div class="t-tr'+(win?' t-win':'')+(id===justAdded?' t-new':'')+'"><span class="t-co">'+esc(g.name)+'</span>'+
        COLS.map(function(c,ci){ var r=cell(c,g); return '<span class="t-chip c'+ci+' '+r.cls+'">'+esc(r.text)+'</span>'; }).join('')+'</div>';
    });
    $('table').innerHTML=th; justAdded=null;
    $('play').style.display=state.done?'none':'';
    renderEnd(); renderStats();
    prevWrong=w;
  }
  function renderEnd(){
    var el=$('end');
    if(!state.done){ el.hidden=true; el.innerHTML=''; return; }
    el.className='t-answer'+(state.won?' t-won':'');
    el.innerHTML='<div class="t-ahead"><small>'+(state.won?'Верно! Это':'Ответ')+'</small><h2>'+esc(answer.name)+'</h2><p>'+esc(answer.country)+' · '+esc(answer.sector)+' · основана в '+answer.founded+' · '+esc(answer.exchange)+'</p></div>'+
      '<div class="t-arow"><button class="t-btn" type="button" data-t="share">Поделиться результатом</button>'+(testMode?'':'<span data-t="countdown"></span>')+'</div>';
    el.hidden=false;
    $('share').onclick=share; tick();
  }
  function renderStats(){
    var st=store('stats')||{played:0,won:0,streak:0,best:0,dist:[0,0,0,0,0,0,0,0]};
    var dist=(st.dist&&st.dist.length===8)?st.dist:[0,0,0,0,0,0,0,0], mx=Math.max.apply(null,dist.concat([1]));
    var today=state.done&&!testMode?(state.won?state.guesses.length-1:7):-1;
    $('nums').innerHTML='<div class="t-num"><b>'+st.played+'</b><span>сыграно</span></div><div class="t-num"><b>'+(st.played?Math.round(st.won/st.played*100):0)+'%</b><span>побед</span></div><div class="t-num"><b>'+st.streak+'</b><span>серия</span></div><div class="t-num"><b>'+st.best+'</b><span>рекорд серии</span></div>';
    $('bars').innerHTML = !st.played ? '<div style="grid-column:1/-1;align-self:center;text-align:center;font-size:13px;color:#8c8c8c">Появится после первой загадки</div>' :
      dist.map(function(v,i){ return '<div class="t-col"><em>'+(v||'')+'</em><div class="'+(i===today?'t-today':'')+'" style="height:'+Math.max(3,v/mx*100)+'%"></div></div>'; }).join('');
  }
  function updateStats(){
    if(testMode) return;
    var st=store('stats')||{played:0,won:0,streak:0,best:0,last:null};
    if(!st.dist||st.dist.length!==8) st.dist=[0,0,0,0,0,0,0,0];
    var y=new Date(); y.setDate(y.getDate()-1); var yKey=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    st.played++;
    if(state.won){ st.won++; st.dist[state.guesses.length-1]++; st.streak=(st.last===yKey)?st.streak+1:1; st.best=Math.max(st.best,st.streak); st.last=todayKey(); }
    else{ st.dist[7]++; st.streak=0; st.last=null; }
    store('stats',st);
  }

  /* ---------- Ввод: выбор из списка только подставляет, ответ — кнопкой ---------- */
  /* Поиск как в словаре: сначала названия, начинающиеся с введённого текста (по алфавиту),
     затем — где с него начинается второе и следующие слова. Совпадения из середины слова не показываем. */
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
  function rankList(items,q,nameOf,altsOf,skip,limit){
    var nq=norm(q); if(!nq) return [];
    var out=[];
    items.forEach(function(it){ if(skip(it)) return; var r=rankItem(nameOf(it),altOK(nq)?altsOf(it):[],nq); if(r>=0) out.push([r,it]); });
    out.sort(function(a,b){ return a[0]-b[0] || nameOf(a[1]).localeCompare(nameOf(b[1]),'ru',{sensitivity:'base'}); });
    return out.slice(0,limit||8).map(function(x){ return x[1]; });
  }
  var input=$('input'), list=$('list'), active=-1, matches=[];
  function search(q){
    return rankList(LIST,q,function(c){return c.name;},function(c){return c.aliases;},function(c){return state.guesses.indexOf(c.id)>=0;});
  }
  /* Подсветка совпадения жирным в подсказках */
  function hl(s,nq){
    var str=String(s), n='', map=[], i, k;
    for(i=0;i<str.length;i++){ var ch=str[i].toLowerCase().replace('ё','е'); if(/[a-zа-я0-9]/.test(ch)){ n+=ch; map.push(i); } }
    for(k=0;k<map.length;k++){
      var st=map[k]===0||!/[a-zа-яё0-9]/i.test(str[map[k]-1]);
      if(st&&n.substr(k,nq.length)===nq){ var a=map[k], b=map[k+nq.length-1]; return esc(str.slice(0,a))+'<b>'+esc(str.slice(a,b+1))+'</b>'+esc(str.slice(b+1)); }
    }
    return esc(str);
  }
  function altOK(nq){ return nq.length>=2||/[а-я]/.test(nq); }
  function sugHTML(name,alts,def){
    var nq=norm(input.value), h=hl(name,nq), sub=esc(def);
    if(h.indexOf('<b>')<0&&altOK(nq)){ for(var i=0;i<alts.length;i++){ var ah=hl(alts[i],nq); if(ah.indexOf('<b>')>=0){ sub=ah; break; } } }
    return '<span>'+h+'</span><small>'+sub+'</small>';
  }
  function listOpen(){ return list.style.display==='block'; }
  function showList(){
    matches=search(input.value); active=-1;
    if(!matches.length||(matches.length===1&&norm(matches[0].name)===norm(input.value))){ hideList(); return; }
    list.innerHTML=matches.map(function(c,i){ return '<li data-i="'+i+'">'+sugHTML(c.name,c.aliases,c.aliases[0])+'</li>'; }).join('');
    list.style.display='block';
  }
  function hideList(){ list.style.display='none'; active=-1; }
  function setActive(i){ active=i; Array.prototype.forEach.call(list.children,function(li,k){ li.className=k===i?'t-act':''; }); }
  function choose(i){ var c=matches[i]; if(!c) return; input.value=c.name; hideList(); input.focus(); }
  input.addEventListener('input',function(){ $('msg').textContent=''; showList(); });
  input.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'&&listOpen()){ e.preventDefault(); setActive((active+1)%matches.length); }
    else if(e.key==='ArrowUp'&&listOpen()){ e.preventDefault(); setActive((active-1+matches.length)%matches.length); }
    else if(e.key==='Enter'){ e.preventDefault(); if(listOpen()&&active>=0) choose(active); else submit(); }
    else if(e.key==='Escape'){ hideList(); }
  });
  list.addEventListener('mousedown',function(e){ var li=e.target.closest('li'); if(!li) return; e.preventDefault(); choose(+li.getAttribute('data-i')); });
  document.addEventListener('click',function(e){ if(!root.contains(e.target)) hideList(); });
  $('submit').addEventListener('click',submit);
  function submit(){
    if(state.done) return;
    var n=norm(input.value);
    var pick=LIST.filter(function(c){ return norm(c.name)===n||c.aliases.some(function(a){return norm(a)===n;}); })[0];
    if(!pick){ $('msg').textContent=input.value?'Такой компании нет в списке — выберите из подсказок':'Введите название компании'; return; }
    if(state.guesses.indexOf(pick.id)>=0){ $('msg').textContent='Эту компанию вы уже называли'; return; }
    state.guesses.push(pick.id); justAdded=pick.id;
    if(pick.id===answer.id){ state.done=true; state.won=true; }
    else if(state.guesses.length>=MAX){ state.done=true; state.won=false; }
    if(state.done) updateStats();
    save(); input.value=''; hideList(); render();
    if(state.done&&state.won) confetti();
    if(state.done) $('end').scrollIntoView({behavior:'smooth',block:'nearest'}); else input.focus();
  }

  /* ---------- Поделиться, таймер ---------- */
  var SQ={ok:'🟩',near:'🟨',miss:'🟥'};
  function share(){
    var lines=state.guesses.map(function(id){ if(id===answer.id) return '🎯'; var g=COMP[id]; return COLS.map(function(c){ return SQ[cell(c,g).cls]; }).join(''); });
    if(lines.length>8) lines=lines.slice(0,3).concat(['…'],lines.slice(-4));
    var n=state.guesses.length;
    var text='finanedly · Классика '+(testMode?'(тест)':'№'+dayNo)+'\n'+(state.won?n:'X')+'/'+MAX+'\n'+lines.join('\n')+'\nfinanedly.com';
    function done(){ toast('Результат скопирован'); }
    function fallback(t){ var ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Не удалось скопировать'); } document.body.removeChild(ta); }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,function(){ fallback(text); }); else fallback(text);
  }
  function toast(t){ var el=$('toast'); el.textContent=t; el.className='t-toast t-show'; setTimeout(function(){ el.className='t-toast'; },1800); }
  function tick(){
    var el=$('countdown'); if(!el) return;
    var now=new Date(), nx=new Date(now); nx.setHours(24,0,0,0);
    var s=Math.floor((nx-now)/1000), h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=s%60;
    el.textContent='Новая загадка через '+h+':'+(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  setInterval(tick,1000);

  /* ---------- Конфетти при победе ---------- */
  function confetti(){
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
  }
  /* ---------- Окна ---------- */
  function openM(k){ $(k).className='t-modal t-show'; }
  Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-close]')) m.className='t-modal'; });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') Array.prototype.forEach.call(root.querySelectorAll('.t-modal'),function(m){ m.className='t-modal'; }); });
  $('rulesBtn').onclick=function(){ openM('rulesModal'); };
  function autoRules(){ try{ if(!localStorage.getItem('fnd_skip_rules')&&!store('seenRules')){ openM('rulesModal'); store('seenRules',1); } }catch(e){} }
  root.addEventListener('fnd-show',function(){ autoRules(); try{ render(); }catch(e){} });
  $('rulesSkip').onclick=function(){ try{ localStorage.setItem('fnd_skip_rules','1'); }catch(e){} $('rulesModal').className='t-modal'; };
  $('statsBtn').onclick=function(){ renderStats(); openM('statsModal'); };
  Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(b){
    b.onclick=function(){
      Array.prototype.forEach.call(root.querySelectorAll('[data-tab]'),function(x){ x.className=x===b?'t-on':''; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pane]'),function(p){ p.hidden=p.getAttribute('data-pane')!==b.getAttribute('data-tab'); });
    };
  });
  $('nav').innerHTML=MODES.map(function(m){ return '<a href="'+m[1]+'"'+(m[2]?' class="t-on"':'')+'>'+m[0]+'</a>'; }).join('');
  (function(){ var n=$('nav'), on=n.querySelector('.t-on'); if(on&&n.scrollWidth>n.clientWidth) n.scrollLeft=Math.max(0,on.offsetLeft-n.offsetLeft-40); })();
  function onMode(silent){ if(!silent) toast('В «Классике» загадка одна для Easy и Hard'); }
  /* ---------- Режим Easy / Hard (общий для всех игр) ---------- */
  function paintMode(){ var b=$('modeBtn'); b.className='t-mode t-'+MODE; b.innerHTML='<i></i>'+(MODE==='hard'?'Hard':'Easy'); b.title=MODE==='hard'?'Сложный режим. Нажмите, чтобы переключить на Easy':'Простой режим. Нажмите, чтобы переключить на Hard'; }
  $('modeBtn').onclick=function(){ MODE=MODE==='hard'?'easy':'hard'; try{ localStorage.setItem('fnd_mode',MODE); }catch(e){} paintMode(); onMode(); try{ window.dispatchEvent(new CustomEvent('fnd-mode',{detail:{mode:MODE,from:root.id}})); }catch(e){} };
  window.addEventListener('fnd-mode',function(e){ if(!e.detail||e.detail.from===root.id||e.detail.mode===MODE) return; MODE=e.detail.mode; paintMode(); onMode(true); });
  paintMode();

  /* Тестовый режим: адрес страницы с #test */
  if(/test/.test(location.hash)){
    $('testSlot').innerHTML='<button type="button" data-t="random">Другая загадка (тест)</button>';
    $('random').onclick=function(){ loadRandom(); prevWrong=0; render(); input.focus(); root.setAttribute('data-test-answer',answer.name); };
  }
  $('capdate').textContent=CAP_DATE;
  $('mlSector').innerHTML=infoHTML('sector'); $('mlExchange').innerHTML=infoHTML('exchange');
  loadDaily(); prevWrong=wrong(); render();
})();


/* Переключение игр внутри одной страницы: адрес вида #companies, #chart, #keywords, #quote, #classic.
   Тестовый режим: #test (для «Компаний») или #quote-test и т. п. */
(function(){
  var KEYS=['companies','chart','keywords','quote','classic'];
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
})();
