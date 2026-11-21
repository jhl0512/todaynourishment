'use strict';
/* ===================== 기본 ===================== */
const APP = /[?&]app=1/.test(location.search);
const LOCKMODE = /[?&]lock=1/.test(location.search);
if (window.HP && !LOCKMODE) document.documentElement.classList.add('apk'); // APK 잠금화면은 하단 네비를 숨겨서 아래 여백 0 → 꾸미기 화면도 똑같이 // 안드로이드 실제 잠금화면(LockActivity)에서 열렸을 때
const FULL = APP || window.innerWidth < 520;
document.body.classList.add(FULL ? 'full' : 'desk');
function fitPhone(){ if (FULL) return; const k = Math.min(1, (window.innerHeight - 40) / 866, (window.innerWidth - 40) / 412); document.getElementById('phoneWrap').style.transform = k < 1 ? `scale(${k})` : ''; }
window.addEventListener('resize', fitPhone); setTimeout(fitPhone, 0);
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ic = (n, sz = 24) => (ICONS[n] || '').replace('<svg', `<svg width="${sz}" height="${sz}"`);
const A = id => ART.find(a => a.id === id) || MYPIC.find(a => a.id === id);
// 내가 넣은 사진: 그림처럼 문장과 함께 걸 수 있게 작품 모양으로 (갤러리·기본 순서에는 안 섞임)
const MYPIC = [];
function addMyPic(id, src){ IMG[id] = src; TH[id] = src; MYPIC.push({ id, t:'내 사진', te:'', a:'나', as:'나', y:'', m:'', pos:'50% 50%', g:'mine', mine:true }); }
function loadMyPics(){ try { (JSON.parse(localStorage.getItem('hanpok.pics')) || []).forEach(p => addMyPic(p.id, p.src)); } catch(e){} }
function saveMyPics(){ try { localStorage.setItem('hanpok.pics', JSON.stringify(MYPIC.map(p => ({ id:p.id, src:IMG[p.id] })))); return true; } catch(e){ return false; } }
loadMyPics();
const img = id => IMG[id];
const th = id => TH[id] || IMG[id];
const DAYS = ['일','월','화','수','목','금','토'];

const DEF = {
  onboarded:false, cats:['위로'], tastes:[], when:'every', perm:{overlay:false, noti:false},
  lockArt:'starry', seen:['starry'], saved:[], savedSent:[], mine:[], unlocks:6, reads:2, streak:4, readToday:false,
  mode:'cover', big:false, unlockBy:'swipe', lockOn:true, alarms:{a8:true, a13:false, a22:true}, teaser:true,
  pinned:null, written:false, change:'every', label:'one', qalign:'left', lalign:'left', fitc:'split', nick:'한폭러', joined:null, pfTab:'post', qk:1, lk:1, qw:1, lw:1, bw:1, pad:28, tint:'auto', fsize:86, fborder:'mat', fbg:'blur', qfont:'noto', lfont:'sans', clk:{ font:'thin', align:'center', size:86, off:0, date:'ko', form:'h24' }, lpos:'default', lxy:{ x:8, y:72 }, cpos:null, qpos:null, grp:true, bpos:null, banc:'auto', groups:[], activeG:null, base:null
};
let S = loadS();
if (!Array.isArray(S.gm)) S.gm = S.grp === false ? [] : ['quote', 'label']; // 그룹에 들어간 요소들
// 꾸미기 요소 위치를 한 번 기본값으로 되돌려요 (시계·문장·작품정보·그룹)
// 디폴트: 좌우 28px · 그룹(문장+작품정보)은 꾸미기 영역 최하단 · 작품 정보는 기본 고딕, 한 줄
if (S.posv !== 3) { Object.assign(S, { cpos:null, qpos:null, lpos:DEF.lpos, lxy:{ ...DEF.lxy }, bpos:null, banc:DEF.banc, gm:['quote', 'label'], label:'one', lfont:'sans', posv:3 }); S.clk = Object.assign({}, S.clk, { off:0 }); save(); }
// 바탕화면 그룹을 새로 꾸민 5개로 정리: 내가 만든 그룹·올린 사진은 지우고, 잠금화면 규격은 기본값으로
if (S.gset !== 2) {
  S.groups = []; S.activeG = null; S.base = null; S.pinned = null;
  try { localStorage.removeItem('hanpok.pics'); } catch(e){} MYPIC.length = 0;
  ['mode','cats','qfont','lfont','label','clk','qalign','lalign','fitc','fborder','fbg','big','fsize','tint','qk','lk','qw','lw','lwOn','bw','pad'].forEach(k => { S[k] = JSON.parse(JSON.stringify(DEF[k] === undefined ? null : DEF[k])); });
  if (!S.cats || !S.cats.length) S.cats = ['위로'];
  S.gset = 2; save();
}
if (!ART.some(a => a.id === S.lockArt)) S.lockArt = ART[0].id;
S.seen = S.seen.filter(id => ART.some(a => a.id === id)); S.saved = S.saved.filter(id => ART.some(a => a.id === id));
// 문장 유형은 하나만 골라요 (예전 '하루상식'은 '정보'로 이름이 바뀌었어요)
S.cats = S.cats.map(c => c === '하루상식' ? '정보' : c).filter(c => CATS.some(x => x.k === c)).slice(0, 1); if (!S.cats.length) S.cats = ['위로'];
S.mine.forEach(m => { if (m.c === '하루상식') m.c = '정보'; });
function loadS(){ let d = null; try { d = JSON.parse(localStorage.getItem('hanpok.v1')); } catch(e){} return Object.assign(JSON.parse(JSON.stringify(DEF)), d || {}); }
function save(){ try { localStorage.setItem('hanpok.v1', JSON.stringify(S)); } catch(e){} try { edRecord(); } catch(e){} syncLock(); }
// 앱 설정 「잠금화면에 명화 띄우기」 ↔ 안드로이드 잠금화면 서비스 (값이 바뀔 때만 알려요)
var _lockSynced;
function syncLock(){ if (typeof LOCKMODE === "undefined" || LOCKMODE) return; const on = !!(S.onboarded && S.lockOn); if (on === _lockSynced) return; _lockSynced = on; try { window.HP && HP.setLockOn && HP.setLockOn(on); } catch(e){} }

/* Android 셸 연결 */
window.__setInsets = (t, b) => { document.documentElement.style.setProperty('--sat', t + 'px'); document.documentElement.style.setProperty('--sab', b + 'px'); };
function statusLight(on){ $('#sb').classList.toggle('light', !!on); try { window.HP && HP.statusLight(!!on); } catch(e){} }

/* ===================== 문장 ===================== */
// 문장 유형 → 작품별 한마디 후보 번호 (시트의 이야기·관찰·위로·웃음·하루상식)
const CAT_IDX = { '용기':0, '감사':1, '위로':2, '웃음':3, '정보':4 };
function lineOf(art, k){ const l = LINES[art.id]; return l && l[CAT_IDX[k]] ? { c:k, t:l[CAT_IDX[k]], art:art.id } : null; }
function sentenceFor(art){
  // 고른 유형에 맞는, 그 작품만의 문장을 띄워요. 문장이 없는 작품만 기본 문장으로 대신해요.
  const k = S.cats.length > 1 ? S.cats[Math.max(0, artOrder().indexOf(art.id)) % S.cats.length] : (S.cats[0] || '위로'); // 여러 유형이면 그림마다 번갈아
  const own = lineOf(art, k); if (own) return own;
  let pool = POOL.filter(p => p.c === k); if (!pool.length) pool = POOL;
  const i = Math.max(0, ART.indexOf(art) < 0 ? MYPIC.indexOf(art) : ART.indexOf(art)) % pool.length; return { c: pool[i].c, t: pool[i].t };
}
function allSentences(){
  return [...CATS.flatMap(c => ART.map(a => lineOf(a, c.k)).filter(Boolean)), ...S.mine.map(m => ({ c:m.c, t:m.t, mine:true }))];
}
// 잠금화면 작품 정보 스타일 (이때까지 나온 시안들) — 문장 탭에서 바꿀 수 있어요
const LABELS = [
  ['pill','썸네일 칩'], ['one','한 줄'], ['two','두 줄'], ['card','흰 카드'], ['plain','라벨'], ['line','세로선 라벨'],
];
function wallLabel(a, st){
  const te = a.te && a.te !== a.t ? a.te : '';
  if (st === 'pill') return `<img src="${th(a.id)}" alt=""><span>${esc(a.t)} · ${esc(a.as)}, ${esc(a.y)}</span>${ic('chevR', 16)}`;
  if (st === 'one') return `<span>${esc(a.t)} · ${esc(a.as)}, ${esc(a.y)}</span>`;
  if (st === 'two') return `<span class="t">${esc(a.t)}</span><span class="m">${esc(a.as)}, ${esc(a.y)}</span>`;
  if (st === 'card' || st === 'plain') return `<span class="wa">${esc(a.a)}</span><span class="wt">「${esc(a.t)}」, ${esc(a.y)}</span>${te ? `<span class="we">${esc(te)}</span>` : ''}<span class="wr"></span><span class="wm">${esc(a.m)}</span>`;
  return `<span class="wt">${esc(a.t)}</span>${te ? `<span class="we">${esc(te)}</span>` : ''}<span class="wa">${esc(a.a)}, ${esc(a.y)}</span><span class="wm">${esc(a.m)}</span>`;
}
/* ===================== 주조색 그라데이션 =====================
   그림을 40×40으로 줄여 위쪽(시계 자리)·아래쪽(문장 자리)에서 가장 많이 쓰인 색을 뽑고,
   색상은 살리고 아주 어둡게 만들어 검정 대신 그 색으로 그라데이션을 깔아요. */
const TINT = (() => { try { return JSON.parse(localStorage.getItem('hanpok.tint13')) || {}; } catch(e){ return {}; } })();
const tintBusy = {};
function domColor(px, y0, y1, W){
  const B = new Map(); let lum = 0, n = 0;
  for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4, r = px[i], g = px[i+1], b = px[i+2];
    lum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; n++;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const w = 1 + 2 * (mx - mn) / 255;               // 채도가 있는 색에 가중치 (회색·검정보다 그림의 색이 이기게)
    const k = (r >> 5) << 6 | (g >> 5) << 3 | (b >> 5); // 채널당 8단계로 묶기
    const o = B.get(k) || { w:0, r:0, g:0, b:0 }; o.w += w; o.r += r * w; o.g += g * w; o.b += b * w; B.set(k, o);
  }
  let best = null; B.forEach(o => { if (!best || o.w > best.w) best = o; });
  return { rgb:[best.r / best.w, best.g / best.w, best.b / best.w], lum: lum / n }; // lum: 그 영역의 평균 밝기(0~1)
}
// 글자색용: 그림에서 색감이 가장 강한 색 (채도 높은 픽셀일수록 가중치) → 선명한 색으로 정리
function vividColor(px, W, H){
  let vx = 0, vy = 0, ws = 0;
  for (let i = 0; i < W * H * 4; i += 4) {
    const r = px[i] / 255, g = px[i+1] / 255, b = px[i+2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2;
    if (!d || l < .12 || l > .92) continue;
    const s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= Math.PI / 3;
    const w = s * s; vx += Math.cos(h) * w; vy += Math.sin(h) * w; ws += w;
  }
  if (!ws) return [255, 255, 255];
  let hue = Math.atan2(vy, vx) * 180 / Math.PI; if (hue < 0) hue += 360;
  const S = .7, L = .55, c = (1 - Math.abs(2 * L - 1)) * S, x = c * (1 - Math.abs((hue / 60) % 2 - 1)), m = L - c / 2;
  const [a1, a2, a3] = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x];
  return [a1 + m, a2 + m, a3 + m].map(v => Math.round(v * 255));
}
function deepen({ rgb:[r, g, b], lum }, L){ // HSL로 바꿔 색상은 그대로, 채도는 적당히, 밝기는 L로
  r /= 255; g /= 255; b /= 255;
  // 그림이 어두우면 한 톤 더 가라앉히고, 밝으면 채도를 살짝 올려 색이 묻히지 않게
  const dark = Math.min(Math.max((0.40 - lum) / 0.25, 0), 1);   // 평균 밝기 40% 아래부터 서서히, 15% 이하면 최대
  const light = Math.min(Math.max((lum - 0.55) / 0.25, 0), 1);  // 55% 위부터 서서히, 80% 이상이면 최대
  L -= 0.035 * dark;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0, sat = 0; const l = (mx + mn) / 2;
  if (d) { sat = d / (1 - Math.abs(2 * l - 1)); h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
  sat = Math.min(sat, .62); sat = Math.min(sat * (1 - 0.12 * dark) * (1 + 0.35 * light), .78);
  const c = (1 - Math.abs(2 * L - 1)) * sat, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = L - c / 2;
  const [a1, a2, a3] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [a1 + m, a2 + m, a3 + m].map(v => Math.round(v * 255)).join(',');
}
const mixW = rgb => rgb.map(v => Math.round(255 * .90 + v * .10)).join(',');
function calcTint(id){
  if (TINT[id] || !img(id)) return Promise.resolve(TINT[id]);
  if (tintBusy[id]) return tintBusy[id]; // 계산 중이면 같은 결과를 기다려요 (전에는 빈 값을 바로 돌려줘서 미리보기 색이 안 칠해지던 문제)
  tintBusy[id] = new Promise(res => {
    const im = new Image();
    im.onload = () => {
      try {
        const W = 40, H = 40, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
        const cx = cv.getContext('2d', { willReadFrequently:true }); cx.drawImage(im, 0, 0, W, H);
        const px = cx.getImageData(0, 0, W, H).data;
        const top = domColor(px, 0, 12, W), bot = domColor(px, 22, 40, W), all = domColor(px, 0, 40, W);
        TINT[id] = { t: deepen(top, .13), b: deepen(bot, .14),           // 글자 뒤 그라데이션
                     m: deepen(all, .24), g1: deepen(top, .30), g2: deepen(bot, .16),
                     x: mixW(bot.rgb), xt: mixW(top.rgb), s: deepen(bot, .10),
                     et: domColor(px, 0, 3, W).rgb.map(Math.round).join(','), eb: domColor(px, 37, 40, W).rgb.map(Math.round).join(',') }; // et/eb: 그림 맨 위·맨 아래 가장자리 주조색 (가로 맞춤 모드에서 위아래로 이어지는 색) // s: 글자 그림자색 = 아래 주조색을 아주 어둡게 // 글자색: 흰색 90% + 글자 뒤에 깔리는 주조색 10% (문장·작품정보=아래, 시계=위)
        try { localStorage.setItem('hanpok.tint13', JSON.stringify(TINT)); } catch(e){}
      } catch(e){}
      res(TINT[id]);
    };
    im.onerror = () => { delete tintBusy[id]; res(null); };
    im.src = img(id);
  });
  return tintBusy[id];
}
function applyTints(){
  document.querySelectorAll('[data-tint]').forEach(el => {
    const id = el.dataset.tint;
    const set = (t, fade) => {
      if (!t || !el.isConnected) return;
      if (S.tint === 'auto') { el.style.setProperty('--tt', t.t); el.style.setProperty('--tb', t.b); } else { el.style.removeProperty('--tt'); el.style.removeProperty('--tb'); }
      if (t.x) el.style.setProperty('--tx', t.x);
      if (t.xt) el.style.setProperty('--txt', t.xt);
      if (t.s) el.style.setProperty('--ts', t.s);
      if (t.et) { el.style.setProperty('--et', t.et); el.style.setProperty('--eb', t.eb); }
      el.style.setProperty('--tm', t.m); el.style.setProperty('--g1', t.g1); el.style.setProperty('--g2', t.g2);
      if (fade) el.animate([{ opacity:.7 }, { opacity:1 }], { duration:350, easing:'ease-out' });
    };
    if (TINT[id] && TINT[id].et) set(TINT[id]); else { delete TINT[id]; calcTint(id).then(t => set(t, true)); }
  });
}
// 그림 표시: 꽉 채우기 / 액자형(크기·테두리·뒷배경)
const FBORDER = [['none','없음'], ['line','얇은 선'], ['mat','매트'], ['wood','월넛 원목'], ['oak','밝은 원목'], ['gold','금빛 클래식'], ['black','블랙 모던'], ['white','화이트 갤러리'], ['float','띄운 캔버스'], ['polaroid','폴라로이드']];
const FBG = [['blur','흐린 그림'], ['tint','주조색'], ['grad','주조색 그라데이션'], ['black','검정'], ['paper','종이']];
function frameCls(){ const fr = S.mode === 'frame'; return `${fr ? 'frame' : ''} ${S.mode === 'fitw' ? 'fitw fc-' + (S.fitc || 'split') : ''} fb-${S.fbg} bd-${S.fborder} ${fr && S.fbg === 'paper' ? 'light' : ''} qa-${S.qalign || 'left'} la-${S.lalign || 'left'}`; }
// 폰트: 문장 폰트는 앱의 모든 명조(--serif)를, 작품 정보 폰트는 라벨을 바꿔요
const QFONTS = [['noto','본명조','HPSerif'], ['maru','마루 부리','HPF-maru'], ['nanum','나눔명조','HPF-nanum'], ['gowun','고운바탕','HPF-gowun'], ['hahmlet','함렛','HPF-hahmlet'], ['song','송명','HPF-song'], ['iropke','이롭게바탕','HPF-iropke'], ['kopub','KoPub 바탕','HPF-kopub'], ['ridi','리디바탕','HPF-ridi'], ['chosun','조선일보명조','HPF-chosun'], ['jeju','제주명조','HPF-jeju']];
const LFONTS = [['sans','기본 고딕',''], ['serif','문장 폰트',''], ['cormorant','Cormorant','HPL-cormorant'], ['ebg','EB Garamond','HPL-ebg'], ['playfair','Playfair','HPL-playfair'], ['caslon','Caslon','HPL-caslon']];
const qfam = k => { const f = (QFONTS.find(x => x[0] === k) || QFONTS[0])[2]; return `'${f}','HPSerif','Noto Serif KR',serif`; };
function applyFonts(){
  const r = document.documentElement.style;
  r.setProperty('--serif', qfam(S.qfont));
  const l = LFONTS.find(x => x[0] === S.lfont) || LFONTS[0];
  r.setProperty('--lf', l[0] === 'sans' ? 'var(--sans)' : l[0] === 'serif' ? 'var(--serif)' : `'${l[2]}',var(--serif)`);
}
applyFonts();
function fontVars(){ const l = LFONTS.find(x => x[0] === S.lfont) || LFONTS[0]; return `--serif:${qfam(S.qfont)};--lf:${l[0] === 'sans' ? 'var(--sans)' : l[0] === 'serif' ? qfam(S.qfont) : `'${l[2]}',${qfam(S.qfont)}`}`; }
function setFont(k, v){ if (S[k] === v) return; S[k] = v; save(); applyFonts(); rerender(); }
function setOpt(k, v){ if (S[k] === v) return; S[k] = v; save(); rerender(); }
function setFs(v){ S.fsize = +v; document.querySelectorAll('[data-fs]').forEach(e => e.style.setProperty('--fs', v + '%')); const l = $('#fsV'); if (l) l.textContent = v + '%'; }
// 작품 정보 위치: 기본(문장 아래) / 자유(끌어서 옮김) / 작품 아래(액자형에서만)
const LPOS = [['default','기본 위치'], ['free','자유 위치'], ['under','작품 아래']];
const freeXY = xy => `left:${xy.x}%;top:${xy.y}%;transform:translate(-${xy.x}%,-${xy.y}%)`;
function lblPos(){ const p = S.lpos || 'default'; return p === 'under' && S.mode !== 'frame' ? 'default' : p; }
function lblEl(a, tag, cls, attrs, extra = '', force = null){
  const p = force || lblPos(), xy = S.lxy || { x:8, y:72 };
  const sty = p === 'free' ? ` style="${freeXY(xy)}"` : '';
  return `<${tag} class="wl st-${labelSt()} ${cls} pos-${p} ${S.lwOn ? 'wset' : ''}"${sty} ${attrs}>${wallLabel(a, labelSt())}${extra}</${tag}>`;
}
/* ===================== 블록(그룹): 문장 + 작품 정보를 한 덩어리로 =====================
   - 안쪽은 세로 오토 레이아웃이라 문장이 1~4줄로 바뀌어도 작품 정보가 따라 밀려 겹치지 않아요
   - 자유 위치일 땐 고정점(위/가운데/아래)을 기준으로 늘어나요: 아래 기준이면 위로 자람 */
const G_ORDER = ['clock', 'quote', 'label'];
const gMembers = () => G_ORDER.filter(k => (S.gm || []).includes(k) && (k !== 'label' || lblPos() !== 'under'));
const grouped = () => gMembers().length >= 2;
const inGrp = k => grouped() && gMembers().includes(k);
const lblInBlk = () => inGrp('label');
function blkStyle(){
  const b = S.bpos; if (!b) return '';
  return b.anc === 'bottom' ? `left:${b.x}%;bottom:${(100 - b.y).toFixed(2)}%;transform:translateX(-${b.x}%)`
       : b.anc === 'center' ? `left:${b.x}%;top:${b.y}%;transform:translate(-${b.x}%,-50%)`
       : `left:${b.x}%;top:${b.y}%;transform:translateX(-${b.x}%)`;
}
function blockHTML(a, sen, mode){ // mode: lock | ed | pv
  const free = !!S.bpos, ed = mode === 'ed';
  const c = !inGrp('clock') ? '' : clockBlock(now(), mode === 'pv', ed ? `${edSel === 'clock' ? 'sel' : ''}" data-child="clock` : '', true);
  const q = !inGrp('quote') ? '' : mode === 'pv' ? `<p class="pv-q">${esc(sen.t)}</p>`
          : `<div class="lk-quote ${ed && edSel === 'quote' ? 'sel' : ''}" data-child="quote"><p>${esc(sen.t)}</p></div>`;
  const l = !lblInBlk() ? '' : mode === 'pv' ? lblEl(a, 'div', 'pv', '', '', 'default')
          : mode === 'lock' ? lblEl(a, 'button', '', 'onclick="lockArtSheet()"', '', 'default')
          : lblEl(a, 'div', edSel === 'label' ? 'sel' : '', 'data-child="label"', '', 'default');
  const cls = ['lk-blk', mode === 'pv' ? 'pv' : '', free ? `pos-free anc-${S.bpos.anc}` : '', ed && edSel === 'group' ? 'sel' : '', ed && edMulti.has('group') ? 'sel multi' : '', ed && gMembers().includes(edSel) ? 'child-sel' : ''].join(' ');
  const attrs = ed ? ` data-el="group" onpointerdown="edDown(event,'group')" onclick="event.stopPropagation()"` : '';
  return `<div class="${cls}"${free ? ` style="${blkStyle()}"` : ''}${attrs}>${c}${q}${l}${ed && edSel === 'group' ? edHandle('group') : ''}</div>`;
}
function setGrp(on){ S.gm = on ? ['quote', 'label'] : []; if (typeof edSel !== 'undefined') { edSel = on ? 'group' : 'quote'; edMulti.clear(); } save(); rerender(); }
function setAnc(k){
  S.banc = k;
  if (S.bpos && k !== 'auto') { // 화면에 보이는 위치는 그대로 두고 고정점만 바꿈
    const el = document.querySelector('.ed-lock [data-el="group"]');
    if (el) { const box = el.closest('.inner').getBoundingClientRect(), r = el.getBoundingClientRect();
      const top = (r.top - box.top) / box.height * 100, hh = r.height / box.height * 100;
      S.bpos = { x: S.bpos.x, y: +(k === 'top' ? top : k === 'center' ? top + hh / 2 : top + hh).toFixed(1), anc: k }; }
  }
  save(); rerender();
}
// 넘침 방지: 문장이 4줄을 넘으면 글자를 조금씩 줄여요 (최소 원래 크기의 70%)
function fitQuotes(){
  document.querySelectorAll('.lk-quote p, .pv-q').forEach(p => {
    p.style.fontSize = '';
    let cs = getComputedStyle(p), fs = parseFloat(cs.fontSize); const min = fs * .7;
    for (let i = 0; i < 20; i++) {
      const lh = parseFloat(getComputedStyle(p).lineHeight) || fs * 1.5;
      if (p.scrollHeight <= lh * 5 + 2 || fs <= min) break;
      fs -= 1; p.style.fontSize = fs + 'px';
    }
  });
}
try { document.fonts && document.fonts.ready.then(fitQuotes); } catch(_){}
function setLpos(k){
  if (k === 'under' && S.mode !== 'frame') { toast('작품 아래는 그림이 「액자형」일 때 쓸 수 있어요', 'infoCircle'); return; }
  setOpt('lpos', k);
}
// 「작품 아래」 라벨: 그림은 정가운데 그대로, 라벨은 그림 바로 밑에 매달기
function placeUnder(){
  document.querySelectorAll('.lk-frame.has-lbl, .pv-frame.has-lbl').forEach(fr => {
    const im = fr.querySelector('img'), lb = fr.querySelector('.wl'); if (!im || !lb) return;
    const go = () => {
      const z = parseFloat(getComputedStyle(lb).zoom) || 1, gap = fr.classList.contains('pv-frame') ? 8 : 16;
      lb.style.top = ((im.offsetTop + im.offsetHeight + gap) / z) + 'px'; lb.classList.add('placed');
    };
    im.complete && im.naturalWidth ? go() : im.addEventListener('load', go, { once:true });
  });
}
function lblDrag(e){
  if (lblPos() !== 'free') return;
  e.stopPropagation(); e.preventDefault();
  const el = e.currentTarget, box = el.offsetParent.getBoundingClientRect();
  const r = el.getBoundingClientRect(), gx = e.clientX - r.left, gy = e.clientY - r.top; // 잡은 지점 유지
  const mv = ev => {
    const lx = ev.clientX - gx - box.left, ly = ev.clientY - gy - box.top;
    const x = Math.min(100, Math.max(0, lx / Math.max(1, box.width - r.width) * 100));
    const y = Math.min(100, Math.max(0, ly / Math.max(1, box.height - r.height) * 100));
    S.lxy = { x: Math.round(x), y: Math.round(y) };
    el.style.left = x + '%'; el.style.top = y + '%'; el.style.transform = `translate(-${x}%,-${y}%)`;
  };
  const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); save(); };
  addEventListener('pointermove', mv); addEventListener('pointerup', up);
}
function labelSt(){ return LABELS.some(l => l[0] === S.label) ? S.label : 'line'; }
function teaser(art, sen){
  if (!S.teaser) return `${art.as} “${sen.t}”`;
  const cut = sen.t.slice(0, 11).trim();
  return `${art.as} “${cut}…”`;
}
function artOrder(){
  const ag = activeGroup(); if (ag && ag.arts && ag.arts.some(id => A(id))) return ag.arts.filter(id => A(id)); // 걸어 둔 그룹의 그림만
  if (!S.tastes.length) return ART.map(a => a.id);
  const pref = ART.filter(a => S.tastes.includes(a.g)).map(a => a.id);
  const rest = ART.filter(a => !S.tastes.includes(a.g)).map(a => a.id);
  const out = []; let i = 0, j = 0;
  while (i < pref.length || j < rest.length) { if (i < pref.length) out.push(pref[i++]); if (i < pref.length) out.push(pref[i++]); if (j < rest.length) out.push(rest[j++]); }
  return out;
}
function nextArtId(){
  if (S.pinned) { const p = S.pinned; S.pinned = null; return p; }
  const o = artOrder(); return o[(o.indexOf(S.lockArt) + 1) % o.length];
}
function markSeen(id){ if (!S.seen.includes(id)) S.seen.push(id); }

/* ===================== 시간 ===================== */
function now(){ return new Date(); }
function hhmm(d){ return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); }
function dateKo(d){ return `${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일`; }
/* 잠금화면 시계: 모양·폰트·정렬·크기·위치·날짜 표기 */
const CK_FORM = [['h24','24시간'], ['h12','12시간'], ['stack','세로 쌓기']];
const CK_FONT = [['thin','얇은 고딕',"var(--sans)",200], ['regular','보통 고딕',"var(--sans)",400], ['bold','굵은 고딕',"var(--sans)",800], ['serif','문장 폰트',"var(--serif)",600], ['cormorant','Cormorant',"'HPL-cormorant',var(--serif)",500], ['playfair','Playfair',"'HPL-playfair',var(--serif)",400], ['ebg','EB Garamond',"'HPL-ebg',var(--serif)",400], ['caslon','Caslon',"'HPL-caslon',var(--serif)",400]];
const CK_ALIGN = [['center','가운데'], ['left','왼쪽'], ['right','오른쪽']];
const CK_DATE = [['ko','10월 29일 목요일'], ['koRev','목요일 · 10월 29일'], ['dot','10. 29. 목'], ['en','THU, OCT 29'], ['none','숨김']];
const MON_EN = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'], DAY_EN = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
function ck(){ return Object.assign({ font:'thin', align:'center', size:86, off:0, date:'ko', form:'h24' }, S.clk || {}); }
function clockTime(d){
  const c = ck(), m = String(d.getMinutes()).padStart(2, '0');
  let h = d.getHours(); if (c.form !== 'h24') h = h % 12 || 12;
  const hs = c.form === 'stack' ? String(h).padStart(2, '0') : String(h);
  return c.form === 'stack' ? `<span>${hs}</span><span>${m}</span>` : `${hs}:${m}`;
}
function clockDate(d){
  const c = ck(), M = d.getMonth() + 1, D = d.getDate(), w = d.getDay();
  return c.date === 'koRev' ? `${DAYS[w]}요일 · ${M}월 ${D}일` : c.date === 'dot' ? `${M}. ${D}. ${DAYS[w]}` : c.date === 'en' ? `${DAY_EN[w]}, ${MON_EN[M - 1]} ${D}` : `${M}월 ${D}일 ${DAYS[w]}요일`;
}
function clockBlock(d, pv, ed = '', inBlk = false){
  const c = ck(), f = CK_FONT.find(x => x[0] === c.font) || CK_FONT[0];
  return `<div class="ck ${pv ? 'pv' : ''} al-${c.align} fm-${c.form} cf-${c.font} ${S.cpos && !inBlk ? 'pos-free' : ''} ${ed}" style="--cs:${c.size}px;--co:${inBlk ? 0 : c.off}px;--cf:${f[2]};--cw:${f[3]};${S.cpos && !inBlk ? freeXY(S.cpos) : ''}"><div class="t">${clockTime(d)}</div>${c.date === 'none' ? '' : `<div class="dt">${clockDate(d)}</div>`}${ed && edSel === 'clock' && !inBlk ? edHandle('clock') : ''}</div>`;
}
function setClk(k, v){ S.clk = Object.assign(ck(), { [k]: v }); save(); rerender(); if (lockOpen()) renderLock(); }
function setKLive(k, v){ S[k] = +v / 100; document.querySelectorAll('[data-fs]').forEach(e => e.style.setProperty('--' + k, S[k])); const l = $('#' + k + 'V'); if (l) l.textContent = v + '%'; fitQuotes(); } // 문장·작품 정보 크기 슬라이더
function setClkLive(k, v){ S.clk = Object.assign(ck(), { [k]: +v }); document.querySelectorAll('.ck').forEach(e => e.style.setProperty(k === 'size' ? '--cs' : '--co', v + 'px')); const l = $('#ck_' + k); if (l) l.textContent = v + 'px'; }
function tickClock(){
  const d = now(); $('#sbTime').textContent = hhmm(d);
  document.querySelectorAll('.ck .t').forEach(e => e.innerHTML = clockTime(d));
}
setInterval(tickClock, 15000);

/* ===================== 토스트 · 시트 · 다이얼로그 ===================== */
let toastT;
function toast(msg, icon = 'circleCheck'){
  const t = $('#toast'); $('#toastTx').textContent = msg; t.querySelector('.ti').innerHTML = ic(icon, 22);
  if (lockOpen() && !sheetOpen()) { t.style.top = 'calc(var(--sat) + 10px)'; t.style.bottom = 'auto'; }
  else { t.style.top = 'auto'; t.style.bottom = (lockOpen() || !hasTabbar()) ? 'calc(110px + var(--sab))' : 'calc(92px + var(--sab))'; }
  t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}
function hasTabbar(){ const top = stack[stack.length - 1]; return top && SCR[top.name].tab; }
let sheetOnClose = null;
function openSheet(html, onClose){ $('#sheetIn').innerHTML = html; $('#dim').classList.add('show'); $('#sheet').classList.add('show'); sheetOnClose = onClose || null; }
function closeSheet(){ $('#dim').classList.remove('show'); $('#sheet').classList.remove('show'); const f = sheetOnClose; sheetOnClose = null; f && f(); }
function sheetOpen(){ return $('#sheet').classList.contains('show'); }
function openDlg(html){ $('#dlgIn').innerHTML = html; $('#dlg').classList.add('show'); }
function closeDlg(){ $('#dlg').classList.remove('show'); }
function openViewer(id){ const a = A(id); const v = $('#viewer'); v.querySelector('img').src = img(id); v.querySelector('button').innerHTML = ic('x', 22); v.querySelector('.cap').textContent = `${a.t} · ${a.a}, ${a.y}`; v.classList.add('show'); statusLight(true); }
function closeViewer(){ $('#viewer').classList.remove('show'); statusLight(lockOpen()); }

/* ===================== 라우터 ===================== */
const stack = [];
const SCR = {};
function mount(name, params, anim){
  const el = document.createElement('div'); el.className = 'screen' + (anim ? ' ' + anim : '');
  el.innerHTML = SCR[name].render(params || {});
  $('#screens').appendChild(el);
  const rec = { name, params: params || {}, el }; stack.push(rec);
  SCR[name].after && SCR[name].after(el, rec.params);
  setTimeout(() => el.classList.remove('enter', 'fade', 'xfade'), 400);
  return rec;
}
function go(name, params){ mount(name, params, 'enter'); }
function back(){
  if (stack.length <= 1) return false;
  const top = stack.pop(); top.el.classList.add('leave'); setTimeout(() => top.el.remove(), 260);
  rerender(); return true;
}
function setRoot(name, params, anim = 'fade'){
  const old = stack.splice(0);
  if (anim === 'xfade') { mount(name, params, anim); setTimeout(() => old.forEach(r => r.el.remove()), 300); return; } // 겹쳐 흐려지기
  old.forEach(r => r.el.remove());
  mount(name, params, anim);
}
function rerender(){
  const top = stack[stack.length - 1]; if (!top) return;
  const b = top.el.querySelector('.body'); const st = b ? b.scrollTop : 0;
  const hs = [...top.el.querySelectorAll('.hscroll,.chips')].map(x => x.scrollLeft);
  top.el.innerHTML = SCR[top.name].render(top.params);
  SCR[top.name].after && SCR[top.name].after(top.el, top.params);
  if (top.name === 'style') { // 메뉴 위치가 위↔아래로 바뀌면 새 자리에서 부드럽게 들어와요 (ease-out)
    const ed = top.el.querySelector('.ed'), pn = top.el.querySelector('.ed-panel'), d = ed && ed.classList.contains('dock-b') ? 'b' : 't';
    const EO = { duration:160, easing:'cubic-bezier(0,0,.58,1)' }, hid = ed && ed.classList.contains('hide');
    const dockChanged = pn && window._edDock && window._edDock !== d && !hid;
    if (dockChanged) pn.animate([{ transform:`translateY(${d === 'b' ? '100%' : '-100%'})`, opacity:0 }, { transform:'none', opacity:1 }], EO);
    // 메뉴가 열리고 닫힐 때: 옵션 영역 높이가 부드럽게 (ease-out)
    const open = !!(ed && ed.classList.contains('open')), body = top.el.querySelector('.ed-body');
    if (!dockChanged && !hid && body && window._edOpen !== undefined && window._edOpen !== open) {
      const on = { height:'132px', paddingTop:'8px', paddingBottom:'8px', opacity:1 }, off = { height:'0px', paddingTop:'0px', paddingBottom:'0px', opacity:0 };
      body.animate(open ? [off, on] : [on, off], EO);
    }
    // 새로 선택한 요소: 테두리·이동 핸들·정렬 버튼이 스르륵 (ease-out)
    if (edSel && edSel !== window._edSelPrev) {
      top.el.querySelectorAll('.ed-lock .sel').forEach(el => { try { el.animate([{ opacity:0 }, { opacity:1 }], { ...EO, duration:120, pseudoElement:'::after' }); } catch(e){} });
      top.el.querySelectorAll('.ed-lock .mv, .ed-lock .al-bar').forEach(el => el.animate([{ opacity:0, scale:.85 }, { opacity:1, scale:1 }], { ...EO, duration:120 }));
    }
    window._edDock = d; window._edOpen = open; window._edSelPrev = edSel;
  }
  const b2 = top.el.querySelector('.body'); if (b2) b2.scrollTop = st;
  [...top.el.querySelectorAll('.hscroll,.chips')].forEach((x, i) => x.scrollLeft = hs[i] || 0);
}
function tab(name){
  if (stack.length && stack[stack.length - 1].name === name && stack.length === 1) { const b = stack[0].el.querySelector('.body'); b && b.scrollTo({top:0, behavior:'smooth'}); return; }
  const prev = stack.length ? stack[stack.length - 1].name : null;
  const into = name === 'style' && prev !== 'style', out = prev === 'style' && name !== 'style';
  if (into) edHistStart(); // 꾸미기에 들어올 때마다 되돌리기 기록을 새로 시작
  setRoot(name, {}, into || out ? 'xfade' : null);
  // 꾸미기로 들어갈 땐 탭 바가 접히고, 나올 땐 펼쳐지도록 이전 모양에서 시작해 전환
  if (!into && !out) return;
  const tb = stack[stack.length - 1].el.querySelector('.tabbar'); if (!tb) return;
  tb.classList.add('instant'); tb.classList.toggle('dark', out);
  void tb.offsetWidth; tb.classList.remove('instant');
  requestAnimationFrame(() => requestAnimationFrame(() => tb.classList.toggle('dark', into)));
}

/* ===================== 공통 컴포넌트 ===================== */
function nav({ back: bk, title = '', left = '', right = '' } = {}){
  return `<div class="nav"><div class="l">${bk ? `<button class="ib" onclick="back()" aria-label="뒤로">${ic('chevL')}</button>` : left}</div>
  ${title ? `<div class="title">${esc(title)}</div>` : ''}<div class="r">${right}</div></div>`;
}
function hd(title, desc, size = ''){ return `<div class="hd ${size}"><h1>${title}</h1>${desc ? `<p>${desc}</p>` : ''}</div>`; }
function lh(title, acc = '', fn = ''){ return `<div class="lh"><h2>${title}</h2>${acc ? (fn ? `<button class="acc" onclick="${fn}">${acc}${ic('chevR', 18)}</button>` : `<span class="cap">${acc}</span>`) : ''}</div>`; }
function cta(inner){ return `<div class="cta">${inner}</div>`; }
function sw(on, fn){ return `<button class="sw ${on ? 'on' : ''}" onclick="event.stopPropagation();${fn}" role="switch" aria-checked="${!!on}"></button>`; }
function tabbar(active){
  const T = [['home','home','오늘'],['gallery','photo','화첩'],['style','palette','꾸미기'],['sentences','quote','문장'],['me','user','나']];
  return `<div class="tabbar ${active === 'style' ? 'abs dark' : ''}">${T.map(([k, i, l]) => `<button class="tab ${k === active ? 'on' : ''}" onclick="tab('${k}')" aria-label="${l}">${ic(i, 24)}<span class="tl">${l}</span></button>`).join('')}</div>`;
}
function logoMark(sz = 18){ return ic('quote', sz); }
function appIcon(cls = 'ai'){ return `<div class="${cls}" style="background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff">${ic('quote', 18)}</div>`; }

/* ===================== 잠금화면 ===================== */
let lockState = null; // { artId, panel }
function lockOpen(){ return !!document.querySelector('#lockLayer .lock'); }
function showLock(advance){
  if (advance) S.lockArt = nextArtId();
  markSeen(S.lockArt); S.unlocks++; save();
  lockState = { artId: S.lockArt, panel: null, noti: anyAlarm() && S.unlocks % 3 === 1 };
  renderLock(true);
  statusLight(true);
}
// 미리보기 페이지(기기 선택)에서 특정 그림을 바로 잠금화면에 띄울 때 사용
window.showArt = function(id){
  if (!A(id)) return false;
  if (!S.onboarded) { S.onboarded = true; S.seen = []; S.unlocks = 0; setRoot('home', {}, null); }
  S.lockArt = id; markSeen(id); save();
  lockState = { artId:id, panel:null, noti:false }; renderLock(true); statusLight(true); return true;
};
// 미리보기 페이지의 뒤로가기/앞으로가기: 그림 순서에서 한 칸 이동
window.stepArt = function(d){
  const o = artOrder(), cur = (lockState && lockState.artId) || S.lockArt;
  const id = o[(o.indexOf(cur) + d + o.length) % o.length]; window.showArt(id); return id;
};
window.artList = () => ART.map(a => ({ id:a.id, t:a.t, a:a.as || a.a }));
function anyAlarm(){ return S.alarms.a8 || S.alarms.a13 || S.alarms.a22; }
function renderLock(wake){
  const a = A(lockState.artId), sen = sentenceFor(a), d = now();
  const o = artOrder(); const nx = A(o[(o.indexOf(a.id) + 1) % o.length]); const nsen = sentenceFor(nx);
  const liked = S.saved.includes(a.id), read = S.readToday;
  const frame = S.mode === 'frame';
  $('#lockLayer').innerHTML = `
  <div class="lock ${frameCls()} ${S.big ? 'big' : ''} ${wake ? 'wake' : ''} ${lockState.panel ? 'pan' : ''}" id="lock" data-tint="${a.id}" data-fs style="--fs:${S.fsize}%;--qk:${S.qk || 1};--lk:${S.lk || 1};--qw:${S.qw || 1};--lw:${S.lw || 1};--bw:${S.bw || 1};--px:${S.pad || 28}px;${fontVars()}">
    <img class="bg" src="${img(a.id)}" style="object-position:${a.pos}" alt="">
    <div class="shade"></div>
    <div class="inner" id="lockInner">
      ${inGrp('clock') ? '' : clockBlock(d)}
      <div class="lk-notis" id="lkNotis">${notisHTML(nx, nsen)}</div>
      ${frame ? `<div class="lk-frame ${lblPos() === 'under' ? 'has-lbl' : ''}"><img src="${img(a.id)}" alt="${esc(a.t)}" onclick="lockArtSheet()">${lblPos() === 'under' ? lblEl(a, 'button', '', 'onclick="lockArtSheet()"') : ''}</div>` : ''}<div class="lk-sp"></div>
      ${grouped() ? blockHTML(a, sen, 'lock') : ''}${inGrp('quote') ? '' : `<div class="lk-quote ${S.qpos ? 'pos-free' : ''}" ${S.qpos ? `style="${freeXY(S.qpos)}"` : ''}>
        <p>${esc(sen.t)}</p>
      </div>`}
      ${lblPos() === 'under' || inGrp('label') ? '' : lblEl(a, 'button', '', 'onclick="lockArtSheet()"')}
      <div class="lk-ad ${lockState.adOn ? 'show' : ''}" aria-label="광고"><span class="ad-b">광고</span><div class="ad-t"><b>광고 영역 예시</b><small>가로 전체 · 높이 50dp 배너</small></div><span class="ad-i">ⓘ</span></div>
      <button class="lk-unlock" onclick="tryUnlock()"><span class="ch">${ic('chevU', 22)}</span>${S.unlockBy === 'swipe' ? '위로 밀어서 열기' : S.unlockBy === 'type' ? '문장을 따라 쓰고 열기' : '소리 내어 읽고 열기'}</button>
    </div>
    ${lockState.panel ? lockPanel(sen) : ''}
  </div>`;
  applyTints(); placeUnder(); fitQuotes();
  // 화면을 켤 때마다 1초 뒤 하단 광고 노출 (밀어서 열기 문구는 광고 위로 살짝 올라감)
  const lk = $('#lock'); if (lk) lk.classList.toggle('ad-on', !!lockState.adOn);
  if (wake) { clearTimeout(lockState.adT); lockState.adT = setTimeout(() => { lockState.adOn = true; const l = $('#lock'); if (l) { l.classList.add('ad-on'); const ad = l.querySelector('.lk-ad'); ad && ad.classList.add('show'); } }, 1000); }
  bindSwipe();
  if (lockState.panel === 'voice') startVoice();
  if (lockState.panel === 'type') setTimeout(() => { const i = $('#lkType'); i && i.focus(); }, 300);
}
const _renderLock = renderLock; renderLock = function(w){ _renderLock(w); placeNotis(); requestAnimationFrame(placeNotis); };
function lockPanel(sen){
  if (lockState.panel === 'type') return `<div class="lk-panel" onclick="event.stopPropagation()">
    <h5>문장을 따라 쓰면 열려요</h5><div class="tg">${esc(sen.t)}</div>
    <input id="lkType" autocomplete="off" placeholder="여기에 따라 써 주세요" oninput="lockTyped(this.value)">
    <div class="prog"><i id="lkProg"></i></div>
    <div class="row2"><span>띄어쓰기와 문장부호는 안 봐도 돼요</span><button onclick="doUnlock()">그냥 열기</button></div></div>`;
  return `<div class="lk-panel" onclick="event.stopPropagation()" style="text-align:center">
    <h5 id="vTitle">소리 내어 읽어 주세요</h5><div class="tg">${esc(sen.t)}</div>
    <div class="mic" id="vMic">${ic('microphone', 32)}</div>
    <div class="row2" style="justify-content:center;gap:16px"><span id="vSub">듣고 있어요…</span><button onclick="doUnlock()">그냥 열기</button></div></div>`;
}
const norm = s => s.replace(/[\s.,!?…·'"“”‘’:;\-–]/g, '');
function lockTyped(v){
  const sen = sentenceFor(A(lockState.artId)); const tg = norm(sen.t), cur = norm(v);
  let k = 0; while (k < cur.length && cur[k] === tg[k]) k++;
  const p = $('#lkProg'); if (p) p.style.width = Math.min(100, k / tg.length * 100) + '%';
  if (cur === tg) { S.readToday = true; S.reads++; save(); toast('오늘의 문장을 마음에 새겼어요'); setTimeout(doUnlock, 500); }
}
let voiceT;
function startVoice(){
  clearTimeout(voiceT);
  voiceT = setTimeout(() => {
    const m = $('#vMic'); if (!m) return; m.classList.add('done'); m.innerHTML = ic('check', 34);
    $('#vTitle').textContent = '잘 들었어요'; $('#vSub').textContent = '오늘의 문장을 마음에 담았어요';
    S.readToday = true; S.reads++; save(); setTimeout(doUnlock, 900);
  }, 2600);
}
function tryUnlock(){
  if (S.unlockBy === 'swipe') return doUnlock();
  lockState.panel = S.unlockBy; renderLock();
}
function doUnlock(cb){
  clearTimeout(voiceT);
  const l = $('#lock'); if (!l) return;
  document.activeElement && document.activeElement.blur && document.activeElement.blur();
  if (l.classList.contains('leaving')) return;
  // 1) 글자·광고·안내가 위로 빠지고 그림만 남음 → 2) 바로 흰색으로 덮임 → 3) 흰색이 걷히며 앱 화면
  clearTimeout(lockState && lockState.adT);
  l.classList.add('leaving');
  setTimeout(() => {
    const w = document.createElement('div'); w.className = 'lk-white'; l.appendChild(w);
    void w.offsetWidth; w.classList.add('on');
    setTimeout(() => {
      statusLight(false);
      if (LOCKMODE) { try { HP.unlock(); } catch(e){} return; } // 실제 잠금화면: 흰 화면에서 닫고 시스템 잠금 해제로
      // 잠금 해제 뒤에는 방금 잠금화면에 있던 작품의 상세 페이지로 (흰 화면 뒤에서 바로 열어 둠)
      const artId = lockState && lockState.artId; lockState = null;
      if (!stack.length) setRoot('home', {}, null);
      if (cb) cb();
      else if (artId && !(A(artId) || {}).mine) { const top = stack[stack.length - 1]; if (top && top.name === 'art' && top.params && top.params.id === artId) rerender(); else mount('art', { id: artId }, null); }
      else rerender();
      $('#lockLayer').innerHTML = '<div class="lk-white on"></div>';
      const w2 = $('#lockLayer .lk-white');
      requestAnimationFrame(() => requestAnimationFrame(() => w2 && w2.classList.remove('on')));
      setTimeout(() => { if (!lockState) $('#lockLayer').innerHTML = ''; }, 200);
    }, 180); // 흰색은 다 덮이자마자 바로 걷힘
  }, 0); // 글자가 빠지는 것과 동시에 흰색 시작 (딜레이 없음)
}
function bindSwipe(){
  const l = $('#lock'), inner = $('#lockInner'); if (!l) return;
  let y0 = null, dy = 0, moved = false;
  l.onpointerdown = e => { if (lockState.panel) { if (!e.target.closest('.lk-panel')) { clearTimeout(voiceT); lockState.panel = null; renderLock(); } y0 = null; return; } if (e.target.closest('button,input,.lk-frame img')) { y0 = null; return; } y0 = e.clientY; dy = 0; moved = false; };
  l.onpointermove = e => { if (y0 === null) return; dy = Math.min(0, e.clientY - y0); if (dy < -6) moved = true; inner.style.transition = 'none'; inner.style.transform = `translateY(${dy * .6}px)`; inner.style.opacity = 1 + dy / 500; };
  const end = () => { if (y0 === null) return; inner.style.transition = ''; if (dy < -110) { inner.style.transform = ''; inner.style.opacity = ''; tryUnlock(); } else { inner.style.transform = ''; inner.style.opacity = ''; } y0 = null; };
  l.onpointerup = end; l.onpointercancel = end; l.onpointerleave = end;
}
function lockLike(){ toggleSave(lockState.artId); renderLock(); }
function lockRead(){
  if (!S.readToday) { S.readToday = true; S.reads++; save(); toast('오늘의 문장을 마음에 담았어요 · ' + S.reads + '개째'); }
  else toast('오늘은 이미 마음에 담았어요');
  renderLock();
}
function lockNext(){ S.lockArt = nextArtId(); markSeen(S.lockArt); save(); lockState.artId = S.lockArt; renderLock(); const l = $('#lock'); l && l.querySelector('.bg').animate([{opacity:0},{opacity:1}], {duration:400}); }
/* 잠금화면 알림: 앱(APK)에서는 내 휴대폰의 실제 알림, 웹 미리보기에서는 한 폭 「다정한 알람」 예시 */
function realNotis(){ try { if (!window.HP || !HP.getNotis) return null; const r = JSON.parse(HP.getNotis()); return Array.isArray(r) ? r : null; } catch(e){ return null; } }
function agoL(t){ const m = Math.round((Date.now() - t) / 60000); return m < 1 ? '지금' : m < 60 ? `${m}분 전` : m < 1440 ? `${Math.floor(m / 60)}시간 전` : `${Math.floor(m / 1440)}일 전`; }
function notisHTML(nx, nsen){
  const rn = realNotis();
  if (rn) { // 실제 알림 (최대 3개, 나머지는 개수만)
    if (!rn.length) return '';
    return rn.slice(0, 3).map((n, i) => `<button class="lk-noti real" style="animation-delay:${.25 + i * .06}s" onclick="openRealNoti('${esc(n.key).replace(/'/g, '&#39;')}')">${n.icon ? `<img class="ai" src="${n.icon}" alt="">` : appIcon('ai')}
        <div class="nt"><div class="nh"><span>${esc(n.app)}</span><span>${agoL(n.time)}</span></div>${n.title ? `<div class="nb">${esc(n.title)}</div>` : ''}${n.text ? `<div class="nd">${esc(n.text)}</div>` : ''}</div>
        ${n.clear ? `<span class="nx" onclick="event.stopPropagation();dismissRealNoti('${esc(n.key).replace(/'/g, '&#39;')}')">${ic('x', 14)}</span>` : ''}</button>`).join('')
      + (rn.length > 3 ? `<div class="lk-nmore">알림 ${rn.length - 3}개 더 있어요</div>` : '');
  }
  return lockState && lockState.noti ? `<button class="lk-noti" onclick="lockNoti('${nx.id}')">${appIcon('ai')}
        <div class="nt"><div class="nh"><span>한 폭 · 다정한 알람</span><span>지금</span></div><div class="nb">${esc(teaser(nx, nsen))}</div></div>
        <span class="nx" onclick="event.stopPropagation();lockState.noti=false;renderLock()">${ic('x', 14)}</span></button>` : '';
}
function openRealNoti(key){ try { HP.openNoti(key); } catch(e){} }
function dismissRealNoti(key){ try { HP.dismissNoti(key); } catch(e){} setTimeout(() => window.__notis && __notis(), 150); }
// 알림 위치: 시계 바로 아래. 시계를 그룹에 넣었거나 따로 옮겨서 흐름에 없으면 시계 아래(시계가 화면 아래쪽이면 화면 위쪽)에 띄워요. 그림·액자보다 항상 위
function placeNotis(){
  const box = document.getElementById('lkNotis'), lock = document.getElementById('lock'); if (!box || !lock) return;
  box.classList.remove('abs'); box.style.top = '';
  if (!(inGrp('clock') || S.cpos) || !box.children.length) return;
  const ck = lock.querySelector('.ck'), L = lock.getBoundingClientRect();
  let top = parseFloat(getComputedStyle(lock).getPropertyValue('--sat')) + 30 || 60;
  const el = ck && (ck.closest('.lk-blk') || ck); // 시계가 묶음 안이면 묶음 전체 아래로 (문장을 가리지 않게)
  if (el) { const r = el.getBoundingClientRect(); if (r.top + r.height / 2 < L.top + L.height / 2) top = r.bottom - L.top + 16; }
  box.classList.add('abs'); box.style.top = top + 'px';
}
window.__notis = () => { if (!lockState && stack.length && stack[stack.length - 1].name === 'settings') rerender(); const box = document.getElementById('lkNotis'); if (!box || !lockState) return; const a = A(lockState.artId), o = artOrder(), nx = A(o[(o.indexOf(a.id) + 1) % o.length]); box.innerHTML = notisHTML(nx, sentenceFor(nx)); placeNotis(); };
function lockNoti(id){ lockState.noti = false; renderLock(); artSheet(id, true); }
function lockArtSheet(){ artSheet(lockState.artId, true); }
function artSheet(id, fromLock){
  const a = A(id), liked = S.saved.includes(id);
  openSheet(`<div class="shd" style="padding-bottom:20px"><h3>오늘의 그림 이야기</h3></div>
    <div class="sh-art"><img src="${th(id)}" alt=""><div><b>${esc(a.t)}</b><span>${esc(a.a)} · ${esc(a.y)}</span></div></div>
    <div class="sh-story">${esc(a.story ? a.story[0] : `${a.te} · ${a.m}`)}</div>
    ${cta(`<div class="btnrow"><button class="btn sec" onclick="toggleSave('${id}');closeSheet();${fromLock ? 'renderLock()' : 'rerender()'}">${ic(liked ? 'heart' : 'heartO', 20)}${liked ? '저장됨' : '저장'}</button>
      <button class="btn" onclick="closeSheet();${fromLock ? `doUnlock(()=>mount('art',{id:'${id}'},null))` : `go('art',{id:'${id}'})`}">${fromLock ? '열고 자세히 보기' : '자세히 보기'}</button></div>`)}`);
}
function toggleSave(id){
  const i = S.saved.indexOf(id);
  if (i >= 0) { S.saved.splice(i, 1); toast('화첩 저장을 취소했어요', 'infoCircle'); }
  else { S.saved.push(id); markSeen(id); toast('화첩에 저장했어요'); }
  save();
}
function powerBtn(){
  if (lockOpen()) {
    const l = $('#lock'); l.style.transition = 'opacity .25s'; l.style.opacity = '0';
    setTimeout(() => showLock(S.change !== 'daily'), 450);
  } else showLock(true);
}

/* ===================== 온보딩 ===================== */
function obProg(n){ return `<div class="obprog">${[1,2,3,4].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`; }
SCR.welcome = { render: () => `<div class="welcome"><img src="${img('starry')}" alt=""><div class="sh"></div>
  <div class="in"><div class="mk">${ic('quote', 30)}</div>
  <h1>휴대폰을 켤 때마다<br>명화 한 폭, 문장 한 줄</h1>
  <p>하루 백 번 여는 잠금화면이<br>나를 다독이는 작은 미술관이 돼요.</p>
  <button class="btn wh" onclick="go('obCats')">시작하기</button>
  <div class="credit">빈센트 반 고흐, 「별이 빛나는 밤」, 1889 · 퍼블릭 도메인</div></div></div>`,
  after: () => statusLight(true) };
SCR.obCats = { render: () => `${nav({ back:true })}${obProg(1)}<div class="body">
  ${hd('어떤 문장을 받고 싶어요?', '하나만 골라 주세요. 나중에 문장 탭에서 언제든 바꿀 수 있어요.')}
  <div class="choices">${CATS.map(c => `<button class="choice ${S.cats.includes(c.k) ? 'on' : ''}" onclick="toggleCat('${c.k}')"><span class="em">${c.e}</span><div><div class="t">${c.k}</div><div class="d">${c.d}</div></div><span class="ck">${ic('circleCheck', 26)}</span></button>`).join('')}</div><div class="pb"></div></div>
  ${cta(`<button class="btn" ${S.cats.length ? '' : 'disabled'} onclick="go('obTaste')">다음</button>`)}`,
  after: () => statusLight(false) };
function toggleCat(k){ S.cats = [k]; save(); rerender(); }
SCR.obTaste = { render: () => `${nav({ back:true, right:`<button class="txt" onclick="S.tastes=[];save();go('obWhen')">건너뛰기</button>` })}${obProg(2)}<div class="body">
  ${hd('어떤 그림에 끌려요?', '고른 결의 그림을 더 자주 보여 드릴게요.')}
  <div class="tiles">${TASTES.map(t => `<button class="tile ${S.tastes.includes(t.k) ? 'on' : ''}" onclick="toggleTaste('${t.k}')"><img src="${th(t.img)}" style="object-position:${A(t.img).pos}" alt=""><div class="ov"><b>${t.t}</b><span>${t.d}</span></div><span class="ck">${ic('check', 16)}</span></button>`).join('')}</div><div class="pb"></div></div>
  ${cta(`<button class="btn" ${S.tastes.length ? '' : 'disabled'} onclick="go('obWhen')">다음</button>`)}` };
function toggleTaste(k){ const i = S.tastes.indexOf(k); i >= 0 ? S.tastes.splice(i, 1) : S.tastes.push(k); save(); rerender(); }
SCR.obWhen = { render: () => `${nav({ back:true })}${obProg(3)}<div class="body">
  ${hd('그림은 언제 바뀔까요?', '자주 바뀔수록 더 많은 그림과 문장을 만나요.')}
  <div class="choices">
    ${[['every','📱','휴대폰을 켤 때마다','하루 수십 번, 매번 새로운 한 폭 (추천)'],['daily','🌅','하루에 한 번','아침마다 오늘의 한 폭을 걸어 둬요']].map(([k, e, t, d]) => `<button class="choice ${S.when === k ? 'on' : ''}" onclick="S.when='${k}';S.change='${k}';save();rerender()"><span class="em">${e}</span><div><div class="t">${t}</div><div class="d">${d}</div></div><span class="ck">${ic('circleCheck', 26)}</span></button>`).join('')}
  </div><div class="pb"></div></div>
  ${cta(`<button class="btn" onclick="go('obPerm')">다음</button>`)}` };
SCR.obPerm = { render: () => `${nav({ back:true })}${obProg(4)}<div class="body">
  ${hd('잠금화면에 그림을 걸려면<br>권한 두 가지가 필요해요', '')}
  <div class="perm"><div class="miniphone"><img src="${img('starry')}" alt=""><div class="sh"></div><div class="t">${hhmm(now())}</div><div class="q">어두운 밤에도 별은 제자리에서 빛나요.</div></div></div>
  <div class="steps">
    <div class="step ${S.perm.overlay ? 'ok' : ''}"><span class="n">${S.perm.overlay ? ic('check', 16) : '1'}</span><div><div class="t">다른 앱 위에 표시</div><div class="d">화면을 켜면 잠금화면 위에 그림과 문장을 띄워요.</div></div></div>
    <div class="step ${S.perm.noti ? 'ok' : ''}"><span class="n">${S.perm.noti ? ic('check', 16) : '2'}</span><div><div class="t">알림</div><div class="d">정해 둔 시간에 다정한 알람으로 문장을 보내요.</div></div></div>
  </div><div class="pb"></div></div>
  ${cta(S.perm.overlay && S.perm.noti ? `<button class="btn" onclick="go('obDone')">다음</button>` : `<button class="btn" onclick="askPerm()">권한 허용하기</button>`)}` };
function askPerm(){
  const which = !S.perm.overlay ? 'overlay' : 'noti';
  const title = which === 'overlay' ? '한 폭이(가) 다른 앱 위에 표시되도록 허용할까요?' : '한 폭에서 알림을 보내도록 허용할까요?';
  const desc = which === 'overlay' ? '잠금화면에 명화와 문장을 띄울 때 사용해요.' : '다정한 알람과 오늘의 문장 소식을 보내요.';
  openDlg(`<div class="ai" style="border-radius:12px;background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff">${ic('quote', 22)}</div>
    <h4>${title}</h4><p>${desc}</p>
    <div class="acts"><button onclick="closeDlg();toast('권한이 없으면 잠금화면에 띄울 수 없어요','infoCircle')">허용 안 함</button><button onclick="grant('${which}')">허용</button></div>`);
}
function grant(w){ S.perm[w] = true; save(); closeDlg(); rerender(); if (w === 'overlay') setTimeout(askPerm, 350); else toast('준비가 끝났어요'); }
SCR.obDone = { render: () => `${nav({ back:true })}<div class="donebox"><div class="ill">🖼️</div><h1>첫 번째 그림을 걸어 뒀어요</h1><p>이제 화면을 끄고 다시 켜 보세요.<br>켤 때마다 새로운 한 폭이 기다려요.</p></div>
  ${cta(`<button class="btn" onclick="finishOb()">화면 켜 보기</button>`)}` };
function finishOb(){
  S.onboarded = true; S.lockArt = artOrder()[0]; S.seen = [S.lockArt]; S.unlocks = 0; save();
  setRoot('home', {}, null);
  const black = document.createElement('div'); black.style.cssText = 'position:absolute;inset:0;background:#000;z-index:200;transition:opacity .5s';
  $('#phone').appendChild(black);
  setTimeout(() => { showLock(false); black.style.opacity = '0'; setTimeout(() => black.remove(), 500); }, 500);
}

/* ===================== 오늘 (홈) ===================== */
/* ===================== 오늘 (홈) — 하루 한 장 일기 ===================== */
// 오늘의 그림·문장이 건네는 질문 → 사진 한 장 → 제목(날짜)·한 줄 → 모두에게 공유
const DQ = {
  위로:['오늘 나를 다독여 준 장면은 무엇이었나요?', '오늘 가장 편안했던 자리를 찍어 보세요.', '오늘 숨 고르던 순간은 어디였나요?'],
  용기:['오늘 한 걸음 내디딘 순간을 남겨 보세요.', '오늘 처음 해 본 것은 무엇인가요?', '오늘 버텨 낸 나를 한 장에 담아 보세요.'],
  감사:['오늘 고마웠던 작은 것 하나를 찍어 보세요.', '오늘 나를 챙겨 준 사람, 혹은 물건은?', '오늘 당연하지 않았던 것은 무엇이었나요?'],
  웃음:['오늘 피식 웃게 만든 장면은?', '오늘 제일 엉뚱했던 순간을 남겨 보세요.', '오늘의 소소한 웃음 한 컷!'],
  정보:['오늘 새로 알게 된 것을 찍어 보세요.', '오늘 처음 본 풍경은 무엇인가요?', '오늘 눈에 띈 색깔 하나를 담아 보세요.']
};
const isoOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const diaryOn = iso => POSTS.find(p => p.mine && p.diary && p.date === iso);
function dayQ(sen){ const L = DQ[sen.c] || DQ['위로'], d = now(); return L[(d.getDate() + d.getMonth()) % L.length]; }
function diaryStreak(){ const d = now(); let n = 0; if (!diaryOn(isoOf(d))) d.setDate(d.getDate() - 1); while (diaryOn(isoOf(d))) { n++; d.setDate(d.getDate() - 1); } return n; }
let dy = null;
function diaryPick(inp){ const f = inp.files && inp.files[0]; inp.value = ''; if (!f) return; readImg(f, src => { if (!src) return toast('사진을 불러오지 못했어요', 'infoCircle'); const d = now(); dy = { photo:src, title:`${d.getMonth() + 1}월 ${d.getDate()}일`, body:'', pub:true }; go('diary'); }); }
SCR.home = { tab:true, render: () => {
  const a = A(S.lockArt), sen = sentenceFor(a), liked = S.saved.includes(a.id), d = now(), iso = isoOf(d), today = diaryOn(iso);
  const WK = ['월','화','수','목','금','토','일'], ti = (d.getDay() + 6) % 7, streak = diaryStreak();
  const week = WK.map((l, i) => { const x = new Date(d); x.setDate(d.getDate() - ti + i); const p = diaryOn(isoOf(x)); const fut = i > ti;
    return `<button class="dw ${i === ti ? 'today' : ''} ${p ? 'has' : ''} ${fut ? 'fut' : ''}" ${p ? `onclick="go('post',{id:'${p.id}'})"` : i === ti ? `onclick="document.getElementById('dyCam').click()"` : 'disabled'}><span class="c">${p ? `<img src="${p.photo}" alt="">` : i === ti ? ic('plus', 16) : ''}</span><b>${l}</b><em>${x.getDate()}</em></button>`; }).join('');
  const card = today
    ? `<div class="dy-done" role="button" tabindex="0" onclick="go('post',{id:'${today.id}'})">
        <div class="ph"><img src="${today.photo}" alt=""><span class="art"><img src="${th(today.art || a.id)}" alt=""></span></div>
        <div class="tx"><span class="tg">${ic('circleCheck', 14)}오늘의 한 장을 남겼어요</span><b>${esc(today.title)}</b>${today.body ? `<p>${esc(today.body)}</p>` : ''}
        <span class="mt">${today.pub ? `${ic('heartO', 12)}${today.likes || 0} · 모두에게 공유됨` : '나만 보기'}</span></div></div>`
    : `<div class="dy-ask">
        <div class="q"><span class="lb">오늘의 질문</span><p>${esc(dayQ(sen))}</p><small>「${esc(a.t)}」과 함께 하루를 한 장으로 남겨요</small></div>
        <div class="acts"><label class="btn">${ic('photo', 20)}사진 찍기<input id="dyCam" type="file" accept="image/*" capture="environment" onchange="diaryPick(this)"></label>
          <label class="btn sec">앨범에서<input type="file" accept="image/*" onchange="diaryPick(this)"></label></div></div>`;
  return `${nav({ left:`<div class="logo"><span class="mk">${ic('quote', 16)}</span>한 폭</div>`, right:`<button class="ib" onclick="showLock(true)" aria-label="잠금화면 보기">${ic('lock')}</button>` })}
  <div class="body">
    <div class="dy-hd"><h1>${d.getMonth() + 1}월 ${d.getDate()}일 ${'일월화수목금토'[d.getDay()]}요일</h1><p>${today ? '오늘도 한 장, 잘 남겼어요.' : streak ? `${streak}일째 이어 가는 중이에요. 오늘도 한 장 남겨 볼까요?` : '휴대폰을 켤 때 만난 그림처럼, 오늘을 한 장으로 남겨 보세요.'}</p></div>
    ${card}
    <div class="dy-week">${week}</div>
    ${lh('오늘의 한 폭', '자세히', `go('art',{id:'${a.id}'})`)}
    <button class="hero sm" onclick="go('art',{id:'${a.id}'})"><img src="${img(a.id)}" style="object-position:${a.pos}" alt="${esc(a.t)}">
      <span class="cat">${CATS.find(c => c.k === sen.c).e} ${sen.c}</span>
      <div class="ov"><div class="q">${esc(sen.t)}</div><div class="cap">${esc(a.t)} · ${esc(a.a)}, ${esc(a.y)}</div></div></button>
    <div class="hero-acts">
      <button class="btn sec sm icon ${liked ? 'on' : ''}" onclick="toggleSave('${a.id}');rerender()" aria-label="저장">${ic(liked ? 'heart' : 'heartO', 22)}</button>
      <button class="btn sec sm" onclick="shareSheet('${a.id}')">${ic('share', 20)}공유 카드</button>
      <button class="btn sec sm" onclick="showLock(false)">${ic('lock', 20)}잠금화면으로</button>
    </div>
    ${lh('모두의 잠금화면', '더 보기', "go('feed')")}
    <div class="hscroll fd-h">${OTHER_POSTS.map(p => feedCard(p, 'sm')).join('')}</div>
    <div class="adbox"><b>광고</b>앱 안 배너 광고 자리 (잠금화면에는 넣지 않아요)</div>
    <div class="pb"></div>
  </div>${tabbar('home')}`; },
  after: () => { statusLight(lockOpen()); applyTints(); sizeMinis(); placeUnder(); fitQuotes(); } };
// 일기 쓰기: 사진 + 오늘의 그림 → 제목(날짜) · 한 줄 → 공유 여부
SCR.diary = { render: () => {
  if (!dy) return `${nav({ back:true })}<div class="body"></div>`;
  const a = A(S.lockArt), sen = sentenceFor(a);
  return `${nav({ back:true, title:'오늘의 한 장' })}<div class="body dyw">
  <div class="dy-comp"><div class="ph"><img src="${dy.photo}" alt=""><label class="re">${ic('refresh', 15)}다시 고르기<input type="file" accept="image/*" onchange="readImg(this.files[0],s=>{if(s){dy.photo=s;rerender();}});this.value=''"></label></div>
    <div class="pair"><img src="${th(a.id)}" style="object-position:${a.pos}" alt=""><div><span>오늘의 한 폭</span><b>${esc(a.t)}</b><p>${esc(sen.t)}</p></div></div></div>
  <div class="pn-h">제목</div>
  <div class="gn-in"><input class="nick-in" maxlength="24" value="${esc(dy.title)}" oninput="dy.title=this.value;document.getElementById('dyGo').disabled=!this.value.trim()"></div>
  <div class="pn-h">오늘의 한 줄 <small>선택</small></div>
  <div class="gn-in"><textarea class="nick-in pn-body" maxlength="300" placeholder="${esc(dayQ(sen))}" oninput="dy.body=this.value">${esc(dy.body)}</textarea></div>
  <button class="dy-pub ${dy.pub ? 'on' : ''}" onclick="dy.pub=!dy.pub;rerender()"><div><b>모두에게 공유</b><span>${dy.pub ? '내 프로필 게시물에 올라가고, 다른 사람도 볼 수 있어요' : '나만 볼 수 있어요 (프로필에만 보관)'}</span></div><i class="sw"></i></button>
  <div class="pb"></div></div>
  ${cta(`<button class="btn" id="dyGo" ${dy.title.trim() ? '' : 'disabled'} onclick="diarySave()">기록하기</button>`)}`; },
  after: () => statusLight(false) };
function diarySave(){
  const a = A(S.lockArt), sen = sentenceFor(a), g = activeGroup() || baseGroup(), L = lookOf(g);
  const look = JSON.parse(JSON.stringify(L)); const mode = look.mode, cats = look.cats; delete look.mode; delete look.cats;
  const arts = g.base ? ART.map(x => x.id) : (g.arts || [g.art]).filter(x => A(x) && !(A(x) || {}).mine);
  const p = { id:'d' + Date.now().toString(36), mine:true, diary:true, pub:dy.pub, date:isoOf(now()), title:dy.title.trim(), body:dy.body.trim(), photo:dy.photo, art:a.id, quote:sen.t, likes:0, uses:0, g:{ mode, cats, look, arts:[a.id, ...arts.filter(x => x !== a.id)] } };
  const old = POSTS.findIndex(x => x.mine && x.diary && x.date === p.date); if (old >= 0) POSTS.splice(old, 1); // 하루 한 장: 다시 쓰면 바꿔요
  POSTS.unshift(p);
  if (!savePosts()) { POSTS.shift(); toast('저장 공간이 부족해요. 프로필에서 오래된 게시물을 지워 주세요', 'infoCircle'); return; }
  dy = null; setRoot('home', {}, null); setTimeout(() => toast('오늘의 한 장을 남겼어요'), 200);
}
function checkWrite(){
  const v = $('#wIn').value, sen = sentenceFor(A(S.lockArt));
  if (norm(v) === norm(sen.t)) { S.written = true; if (!S.readToday) { S.readToday = true; S.reads++; } save(); toast('오늘의 문장을 마음에 새겼어요'); rerender(); }
  else if (!v.trim()) toast('문장을 따라 써 주세요', 'pencil');
  else toast('조금 달라요. 한 글자씩 천천히 따라 써 볼까요?', 'pencil');
}
function shareSheet(id){
  const a = A(id), sen = sentenceFor(a);
  openSheet(`<div class="shd"><h3>공유 카드</h3><p>인스타그램 스토리나 메신저로 보낼 수 있어요.</p></div>
    <div class="sbody"><div class="sharecard"><img src="${img(id)}" style="object-position:${a.pos}" alt=""><div class="ov"><div class="q">${esc(sen.t)}</div>
    <div class="f"><span>${esc(a.t)} · ${esc(a.as)}</span><span class="lg">${ic('quote', 14)}한 폭</span></div></div></div>
    <div class="shareacts">
      <button onclick="closeSheet();toast('공유 카드를 사진첩에 저장했어요')"><span class="c">${ic('download', 24)}</span>이미지 저장</button>
      <button onclick="closeSheet();toast('인스타그램 스토리로 보냈어요')"><span class="c">${ic('instagram', 24)}</span>스토리</button>
      <button onclick="closeSheet();toast('문장을 복사했어요')"><span class="c">${ic('copy', 24)}</span>문장 복사</button>
      <button onclick="closeSheet();toast('메신저로 보냈어요')"><span class="c">${ic('send', 24)}</span>보내기</button>
    </div><div style="height:calc(20px + var(--sab))"></div></div>`);
}

/* ===================== 화첩 ===================== */
function gcardHtml(a){ const seen = S.seen.includes(a.id); return seen ?
    `<button class="gcard" onclick="go('art',{id:'${a.id}'})"><div class="im"><img loading="lazy" decoding="async" src="${th(a.id)}" style="object-position:${a.pos}" alt="">${S.saved.includes(a.id) ? `<span class="hrt">${ic('heart', 16)}</span>` : ''}</div><div class="t">${esc(a.t)}</div><div class="s">${esc(a.as)} · ${esc(a.y)}</div></button>` :
    `<button class="gcard lock-c" onclick="toast('잠금화면에서 만나면 화첩에 담겨요','lock')"><div class="im"><img loading="lazy" decoding="async" src="${th(a.id)}" alt=""><div class="lk">${ic('lock', 26)}</div></div><div class="t">아직 만나지 않은 그림</div><div class="s">${esc(a.as)} · ${esc(a.y)}</div></button>`; }

let galFilter = 'all';
SCR.gallery = { tab:true, render: () => {
  let list = ART.slice();
  if (galFilter === 'saved') list = list.filter(a => S.saved.includes(a.id));
  else if (galFilter !== 'all') list = list.filter(a => a.as === galFilter);
  const seenN = ART.filter(a => S.seen.includes(a.id)).length;
  return `${nav({ right:`<button class="ib" onclick="showLock(true)" aria-label="잠금화면 보기">${ic('lock')}</button>` })}<div class="body">
  ${hd('화첩', `지금까지 만난 그림 ${seenN}점 · 저장한 그림 ${S.saved.length}점`)}
  <div class="progress"><i style="width:${seenN / ART.length * 100}%"></i></div>
  <div class="chips">${[['all','전체'],['saved','저장한 그림'], ...[...new Set(ART.map(a => a.as))].map(n => [n, n])].map(([k, l]) => `<button class="chip ${galFilter === k ? 'on' : ''}" onclick="galFilter='${k}';rerender()">${l}</button>`).join('')}</div>
  ${list.length ? `<div class="grid">${list.map(gcardHtml).join('')}</div>`
  : `<div class="empty"><div class="em">🤍</div>마음에 드는 그림을 저장하면<br>여기에 모여요.</div>`}
  <div class="pb"></div></div>${tabbar('gallery')}`; },
  after: () => statusLight(lockOpen()) };

/* ===================== 작품 상세 ===================== */
SCR.art = { render: ({ id }) => {
  const a = A(id), liked = S.saved.includes(id), sen = sentenceFor(a), pinned = S.pinned === id;
  return `${nav({ back:true, right:`<button class="ib" onclick="toggleSave('${id}');rerender()" aria-label="저장" style="color:${liked ? 'var(--primary)' : 'var(--g900)'}">${ic(liked ? 'heart' : 'heartO')}</button><button class="ib" onclick="shareSheet('${id}')" aria-label="공유">${ic('share')}</button>` })}
  <div class="body">
    <button class="artimg" onclick="openViewer('${id}')"><img src="${img(id)}" alt="${esc(a.t)}"></button>
    <div class="arthd"><h1>${esc(a.t)}</h1><div class="en">${esc(a.te)}</div>
      <div class="meta"><button class="alink" onclick="go('artist',{name:'${a.a}'})">${esc(a.a)}</button> · ${esc(a.y)}<br><span style="color:var(--g500)">${esc(a.m)}</span></div>
      <div class="badges"><span class="badge">퍼블릭 도메인</span>${sen ? `<span class="badge or">${CATS.find(c => c.k === sen.c).e} ${sen.c}</span>` : ''}</div></div>
    ${sen ? `<div class="qblock"><div class="qm">${ic('quote', 22)}</div><p>${esc(sen.t)}</p><div class="c">이 그림과 함께 오는 문장</div></div>` : ''}
    ${a.story ? `${lh('작품 이야기')}
    <div class="story">${a.story.map(p => `<p>${esc(p)}</p>`).join('')}</div>` : ''}
    <div class="pb"></div><div class="pb"></div>
  </div>
  ${cta(pinned ? `<button class="btn sec" onclick="S.pinned=null;save();rerender();toast('잠금화면 예약을 취소했어요','infoCircle')">${ic('circleCheck', 20)}다음 잠금화면에 걸어 뒀어요</button>` :
    `<button class="btn" onclick="S.pinned='${id}';markSeen('${id}');save();rerender();toast('다음에 화면을 켜면 이 그림이 나와요')">다음 잠금화면에 걸기</button>`)}`; },
  after: () => statusLight(false) };

/* ===================== 문장 ===================== */
let senSeg = 'all';
let senPv = 0;
function previewSentence(k, n){
  // 미리보기: 지금 잠금화면 그림부터 시작해서, 누를 때마다 다음 작품의 같은 유형 문장을 보여 줘요
  const o = artOrder(); const st = Math.max(0, o.indexOf(S.lockArt));
  for (let t = 0; t < o.length; t++) { const a = A(o[(st + n + t) % o.length]); const l = lineOf(a, k); if (l) return l; }
  return { c:k, t:'' };
}
/* ===================== 잠금화면 꾸미기 (전체 화면 미리보기 + 아래 도구 패널) ===================== */
const ED_TOOLS = [['clock','시계'], ['text','문장'], ['art','그림'], ['frame','액자'], ['label','작품 정보']];
let edTool = 'clock', edOpen = true, edArt = null, edSel = null, edHide = false, edAdOn = false;
const edMulti = new Set(); // 길게 눌러 함께 고른 요소들 (그룹 만들기용)
// 요소 ↔ 도구
const SEL_TOOL = { clock:'clock', quote:'text', label:'label', frame:'frame', group:'text' };
const TOOL_SEL = { clock:'clock', text:'quote', label:'label', frame:'frame', art:null };
function edAttr(key){ return `${edSel === key ? 'sel' : ''} ${edMulti.has(key) ? 'sel multi' : ''}" data-el="${key}" onpointerdown="edDown(event,'${key}')" onclick="event.stopPropagation()`; }
function edHandle(key){ return `<i class="mv" onpointerdown="edDragStart(event,'${key}')" onclick="event.stopPropagation()" aria-label="위치 옮기기">${ic('move', 13)}</i>${alBar(key)}${rzHandles(key)}`; }
// 크기 조정 손잡이: 테두리 좌·우·위·아래 가운데. 바깥으로 끌면 커지고 안쪽으로 끌면 작아져요
function rzHandles(key){
  if (!['clock', 'quote', 'label', 'group'].includes(key)) return '';
  return (key === 'clock' ? ['l', 'r', 't', 'b'] : ['l', 'r']).map(d => `<i class="rz rz-${d}" onpointerdown="edResize(event,'${key}','${d}')" onclick="event.stopPropagation()" aria-label="크기 조정"></i>`).join('');
}
// 화면 좌우 여백: 점선 손잡이를 끌면 양쪽이 같이 (8px ~ 가운데 20px 남을 때까지)
function edPad(e, side){
  e.stopPropagation(); e.preventDefault();
  const root = e.target.closest('.ed-lock'); if (!root) return;
  const rect = root.getBoundingClientRect(), gs = root.querySelectorAll('.pad-g');
  let v = S.pad || 28;
  gs.forEach(g => g.classList.add('on'));
  const mv = ev => {
    v = Math.round(Math.min(Math.floor((rect.width - 20) / 2), Math.max(8, side === 'l' ? ev.clientX - rect.left : rect.right - ev.clientX))); // 가운데 20px만 남기고 끝까지
    root.style.setProperty('--px', v + 'px'); gs.forEach(g => g.querySelector('b').textContent = `좌우 여백 ${v}px`); fitQuotes();
  };
  const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); S.pad = v; save(); rerender(); };
  addEventListener('pointermove', mv); addEventListener('pointerup', up);
}
function edResize(e, key, d){
  e.stopPropagation(); e.preventDefault();
  const el = e.target.closest('.ck, .lk-quote, .wl, .lk-blk'), root = e.target.closest('.ed-lock'); if (!el || !root) return;
  const r = el.getBoundingClientRect(), base = (d === 'l' || d === 'r') ? r.width : r.height;
  const x0 = e.clientX, y0 = e.clientY, c0 = ck().size, q0 = S.qk || 1, l0 = S.lk || 1;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let k = 1;
  el.classList.add('resizing');
  if (key !== 'clock') { // 문장·작품 정보·그룹: 좌우 손잡이 = 칸 너비 (글자 크기는 메뉴에서)
    // 너비 기준은 좌우 여백과 상관없이 '화면폭 - 56px' (그룹 안 작품 정보는 그룹 칸 너비). 최대는 화면 끝 8px 전까지
    const W = root.clientWidth, inBlk = key === 'label' && el.parentElement.classList.contains('lk-blk');
    const pw = inBlk ? el.parentElement.clientWidth : W - 56, maxR = inBlk ? 1 : (W - 16) / Math.max(1, W - 56);
    const vk = key === 'quote' ? 'qw' : key === 'label' ? 'lw' : 'bw', w0 = r.width, center = (key === 'label' ? S.lalign : S.qalign) === 'center';
    let ratio = S[vk] || 1;
    if (key === 'label' && !S.lwOn) { ratio = clamp(w0 / Math.max(pw, 1), .2, maxR); el.classList.add('wset'); el.style.setProperty('--lw', ratio.toFixed(3)); }
    const mvW = ev => { const out = d === 'l' ? x0 - ev.clientX : ev.clientX - x0; ratio = clamp((w0 + out * (center ? 2 : 1)) / Math.max(pw, 1), .2, maxR); (key === 'label' ? el : root).style.setProperty('--' + vk, ratio.toFixed(3)); fitQuotes(); };
    const upW = () => { removeEventListener('pointermove', mvW); removeEventListener('pointerup', upW); S[vk] = +ratio.toFixed(3); if (key === 'label') S.lwOn = true; save(); rerender(); };
    addEventListener('pointermove', mvW); addEventListener('pointerup', upW); return;
  }
  const mv = ev => {
    const out = d === 'l' ? x0 - ev.clientX : d === 'r' ? ev.clientX - x0 : d === 't' ? y0 - ev.clientY : ev.clientY - y0;
    k = clamp(1 + out / Math.max(base, 60), .5, 2.2); // 끈 거리만큼 비례해서 (너무 민감하지 않게)
    if (key === 'clock' || (key === 'group' && inGrp('clock'))) { const cs = clamp(Math.round(c0 * k), 40, 170); root.querySelectorAll('div.ck').forEach(c => c.style.setProperty('--cs', cs + 'px')); }
    if (key === 'quote' || key === 'group') root.style.setProperty('--qk', clamp(q0 * k, .55, 1.8).toFixed(3));
    if (key === 'label' || key === 'group') root.style.setProperty('--lk', clamp(l0 * k, .6, 2).toFixed(3));
    if (key !== 'clock') fitQuotes();
  };
  const up = () => {
    removeEventListener('pointermove', mv); removeEventListener('pointerup', up);
    if (key === 'clock' || (key === 'group' && inGrp('clock'))) S.clk = Object.assign(ck(), { size: clamp(Math.round(c0 * k), 40, 170) });
    if (key === 'quote' || key === 'group') S.qk = +clamp(q0 * k, .55, 1.8).toFixed(3);
    if (key === 'label' || key === 'group') S.lk = +clamp(l0 * k, .6, 2).toFixed(3);
    save(); rerender();
  };
  addEventListener('pointermove', mv); addEventListener('pointerup', up);
}
// 선택한 요소 위 테두리 가운데에 뜨는 좌·가운데·우 정렬 버튼
function curAlign(key){ return key === 'clock' ? ck().align : key === 'label' ? (S.lalign || 'left') : (S.qalign || 'left'); }
function alBar(key){
  if (!['clock', 'quote', 'label', 'group'].includes(key)) return '';
  const cur = curAlign(key);
  return `<span class="al-bar" onpointerdown="event.stopPropagation()" onclick="event.stopPropagation()">${[['left','alL','왼쪽 정렬'],['center','alC','가운데 정렬'],['right','alR','오른쪽 정렬']].map(([v, i, l]) => `<button class="${cur === v ? 'on' : ''}" aria-label="${l}" onclick="event.stopPropagation();edAlign('${key}','${v}')">${ic(i, 15)}</button>`).join('')}</span>`;
}
function edAlign(key, v){
  if (key === 'clock') S.clk = Object.assign(ck(), { align:v });
  if (key === 'quote' || key === 'group') S.qalign = v;
  if (key === 'label' || key === 'group') S.lalign = v;
  if (key === 'group' && inGrp('clock')) S.clk = Object.assign(ck(), { align:v });
  save(); rerender();
}
function edSelect(key){ edSel = key; edTool = SEL_TOOL[key]; edOpen = true; rerender(); const b = document.querySelector('.ed-body'); if (b) b.scrollTop = 0; }
const GROUPABLE = ['clock', 'quote', 'label', 'group'];
function edDown(e, key){
  e.stopPropagation();
  // 이미 하나를 고른 상태에서 다른 요소를 꾹 누르면(0.45초) 함께 선택 → 「완료」로 그룹
  if (GROUPABLE.includes(key) && edSel && GROUPABLE.includes(edSel) && edSel !== key && !(key === 'group' && gMembers().includes(edSel)) && !(gMembers().includes(key) && edSel === 'group')) {
    const sx = e.clientX, sy = e.clientY; let fired = false;
    const t = setTimeout(() => {
      fired = true; cleanup();
      edMulti.add(edSel); edMulti.add(key);
      try { navigator.vibrate && navigator.vibrate(12); } catch(_){}
      rerender(); toast('함께 묶을 요소를 더 길게 누르고 「완료」를 눌러요', 'infoCircle');
    }, 450);
    const mv = ev => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) { clearTimeout(t); cleanup(); } };
    const up = () => { clearTimeout(t); cleanup(); if (!fired) { edMulti.clear(); key === 'group' ? edSelect('group') : edSelect(key); } };
    const cleanup = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
    return;
  }
  if (edMulti.size) { edMulti.clear(); }
  if (key === 'group') { // 피그마처럼: 처음 누르면 그룹, 그룹이 선택된 상태에서 한 번 더 누르면 안쪽 요소
    const child = (e.target.closest('[data-child]') || {}).dataset?.child;
    if (!['group', 'quote', 'label'].includes(edSel)) { edSelect('group'); return; }
    edDragStart(e, 'group', () => { if (child && edSel !== child) edSelect(child); else if (!child && edSel !== 'group') edSelect('group'); });
    return;
  }
  if (edSel !== key) { edSelect(key); return; }
  if (key !== 'frame') edDragStart(e, key);
}
function edDragStart(e, key, onTap){
  e.stopPropagation(); e.preventDefault();
  const el = document.querySelector(`.ed-lock [data-el="${key}"]`); if (!el || key === 'frame') return;
  const box = el.closest('.inner').getBoundingClientRect(), r = el.getBoundingClientRect();
  let gx = e.clientX - r.left, gy = e.clientY - r.top, w = r.width, h = r.height; const sx = e.clientX, sy = e.clientY;
  let moved = false, xy = null; const guide = document.querySelector('.ed-lock .snap-v');
  const mv = ev => {
    if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4) return;
    if (!moved) { // 처음 움직일 때 그 자리에서 자유 위치로 떼어 냄
      moved = true; el.classList.add('pos-free', 'dragging');
      if (key === 'quote' || key === 'group') el.style.width = r.width + 'px';
      if (key === 'group') el.style.bottom = 'auto';
      if (key === 'label') el.closest('.inner').appendChild(el);
      const r2 = el.getBoundingClientRect(); w = r2.width; h = r2.height; gx = Math.min(gx, w); gy = Math.min(gy, h);
    }
    const lx = ev.clientX - gx - box.left;
    const zone = document.querySelector('.ed-lock .unlock-zone'), zh = zone ? zone.offsetHeight : 0;
    const ly = Math.min(ev.clientY - gy - box.top, box.height - zh - h); // 밀어서 열기·광고 영역 위까지만
    let x = Math.min(100, Math.max(0, lx / Math.max(1, box.width - w) * 100));
    const y = Math.min(100, Math.max(0, ly / Math.max(1, box.height - h) * 100));
    // 가로 정가운데 근처(10px 안)면 가운데에 딱 붙이고 가이드라인 표시
    const snap = Math.abs(lx + w / 2 - box.width / 2) < 10;
    if (snap) x = 50;
    if (guide && snap !== guide.classList.contains('on')) { guide.classList.toggle('on', snap); if (snap) { try { navigator.vibrate && navigator.vibrate(8); } catch(_){} } }
    // 좌우 여백선 근처(10px 안)면 요소 왼쪽/오른쪽 끝을 여백선에 딱 붙이고 그 선을 분홍색으로
    const pad = S.pad || 28, span = Math.max(1, box.width - w);
    const snapL = !snap && Math.abs(lx - pad) < 10, snapR = !snap && !snapL && Math.abs(lx + w - (box.width - pad)) < 10;
    if (snapL) x = pad / span * 100;
    if (snapR) x = (box.width - pad - w) / span * 100;
    const gl = document.querySelector('.ed-lock .pad-g.l'), gr = document.querySelector('.ed-lock .pad-g.r');
    [[gl, snapL], [gr, snapR]].forEach(([g, on]) => { if (g && on !== g.classList.contains('snap')) { g.classList.toggle('snap', on); if (on) { try { navigator.vibrate && navigator.vibrate(8); } catch(_){} } } });
    xy = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    el.style.left = x + '%'; el.style.top = y + '%'; el.style.transform = `translate(-${x}%,-${y}%)`;
  };
  const up = () => {
    removeEventListener('pointermove', mv); removeEventListener('pointerup', up);
    if (guide) guide.classList.remove('on');
    document.querySelectorAll('.ed-lock .pad-g.snap').forEach(g => g.classList.remove('snap'));
    if (!moved || !xy) { onTap && onTap(); return; }
    if (key === 'group') { // 놓은 자리로 고정점 정하기 (자동이면 위쪽→위 기준, 아래쪽→아래 기준, 가운데→가운데)
      const r3 = el.getBoundingClientRect(), top = (r3.top - box.top) / box.height * 100, hh = r3.height / box.height * 100, mid = top + hh / 2;
      const anc = S.banc && S.banc !== 'auto' ? S.banc : mid < 40 ? 'top' : mid > 60 ? 'bottom' : 'center';
      S.bpos = { x: xy.x, y: +(anc === 'top' ? top : anc === 'center' ? mid : top + hh).toFixed(1), anc };
      save(); rerender(); return;
    }
    if (key === 'clock') S.cpos = xy; else if (key === 'quote') S.qpos = xy; else { S.lpos = 'free'; S.lxy = xy; }
    save(); rerender();
  };
  addEventListener('pointermove', mv); addEventListener('pointerup', up);
}
function setFree(key, on){
  if (key === 'clock') S.cpos = on ? (S.cpos || { x:50, y:6 }) : null;
  if (key === 'quote') S.qpos = on ? (S.qpos || { x:50, y:66 }) : null;
  if (key === 'group') S.bpos = on ? (S.bpos || { x:50, y:86, anc:'bottom' }) : null;
  save(); rerender();
}
function edGroup(t){
  if (t === 'clock') return `
  <div class="pv-sub">위치</div>
  <div class="chips">${[['0','기본 위치'],['1','자유 위치']].map(([k, l]) => `<button class="chip ${!!S.cpos === (k === '1') ? 'on' : ''}" onclick="setFree('clock',${k === '1'})">${l}</button>`).join('')}</div>
  <div class="pv-sub">시계 모양</div>
  <div class="chips">${CK_FORM.map(([k, l]) => `<button class="chip ${ck().form === k ? 'on' : ''}" onclick="setClk('form','${k}')">${l}</button>`).join('')}</div>
  <div class="pv-sub">시계 폰트</div>
  <div class="chips">${CK_FONT.map(([k, l, f, w]) => `<button class="chip fchip ${ck().font === k ? 'on' : ''}" style="font-family:${f.replace(/"/g, '&quot;')};font-weight:${w}" onclick="setClk('font','${k}')">${l}</button>`).join('')}</div>
  <div class="pv-sub">시계 정렬</div>
  <div class="chips">${CK_ALIGN.map(([k, l]) => `<button class="chip ${ck().align === k ? 'on' : ''}" onclick="setClk('align','${k}')">${l}</button>`).join('')}</div>
  <div class="pv-sub">시계 크기 <span class="pv-val" id="ck_size">${ck().size}px</span></div>
  <div class="rng-wrap"><span>작게</span><input class="rng" type="range" min="48" max="140" step="1" value="${ck().size}" oninput="setClkLive('size',this.value)" onchange="save()"><span>크게</span></div>
  <div class="pv-sub">시계 위치 <span class="pv-val" id="ck_off">${ck().off}px</span></div>
  <div class="rng-wrap"><span>위로</span><input class="rng" type="range" min="0" max="160" step="1" value="${ck().off}" oninput="setClkLive('off',this.value)" onchange="save()"><span>아래로</span></div>
  <div class="pv-sub">날짜 표기</div>
  <div class="chips">${CK_DATE.map(([k, l]) => `<button class="chip ${ck().date === k ? 'on' : ''}" onclick="setClk('date','${k}')">${l}</button>`).join('')}</div>
`;
  if (t === 'text') return `
  <div class="pv-sub">그룹</div>
  <div class="chips">${grouped() ? `<button class="chip on">${gMembers().map(k => ({ clock:'시계', quote:'문장', label:'작품 정보' })[k]).join(' + ')}</button><button class="chip" onclick="setGrp(false)">그룹 해제</button>` : `<button class="chip" onclick="setGrp(true)">문장 + 작품 정보 묶기</button>`}</div>
  ${grouped() ? '' : `<div class="ed-hint">요소 하나를 누른 뒤 다른 요소를 꾹 누르면 함께 선택돼요. 「완료」를 누르면 그룹이 돼요.</div>`}
  ${grouped() ? `<div class="pv-sub">위치</div>
  <div class="chips">${[['0','기본 위치'],['1','자유 위치']].map(([k, l]) => `<button class="chip ${!!S.bpos === (k === '1') ? 'on' : ''}" onclick="setFree('group',${k === '1'})">${l}</button>`).join('')}</div>
  ${S.bpos ? `<div class="pv-sub">고정점</div>
  <div class="chips">${[['auto','자동'],['top','위 기준'],['center','가운데 기준'],['bottom','아래 기준']].map(([k, l]) => `<button class="chip ${(S.banc || 'auto') === k ? 'on' : ''}" onclick="setAnc('${k}')">${l}${k === 'auto' && (S.banc || 'auto') === 'auto' ? ` · ${{ top:'위', center:'가운데', bottom:'아래' }[S.bpos.anc]}` : ''}</button>`).join('')}</div>` : ''}` : `<div class="pv-sub">위치</div>
  <div class="chips">${[['0','기본 위치'],['1','자유 위치']].map(([k, l]) => `<button class="chip ${!!S.qpos === (k === '1') ? 'on' : ''}" onclick="setFree('quote',${k === '1'})">${l}</button>`).join('')}</div>`}
  <div class="pv-sub">문장 유형</div>
  <div class="chips">${CATS.map(c => `<button class="chip ${S.cats[0] === c.k ? 'on' : ''}" onclick="pickCat('${c.k}')">${c.k}</button>`).join('')}</div>
  <div class="pv-sub">글자 크기 <span class="pv-val" id="qkV">${Math.round((S.qk || 1) * 100)}%</span></div>
  <div class="rng-wrap"><span>작게</span><input class="rng" type="range" min="55" max="180" step="1" value="${Math.round((S.qk || 1) * 100)}" oninput="setKLive('qk',this.value)" onchange="save()"><span>크게</span></div>
  <div class="pv-sub">문장 폰트</div>
  <div class="chips">${QFONTS.map(([k, l, f]) => `<button class="chip fchip ${S.qfont === k ? 'on' : ''}" style="font-family:'${f}','HPSerif',serif" onclick="setFont('qfont','${k}')">${l}</button>`).join('')}</div>
  ${S.mode !== 'frame' || S.fbg === 'blur' ? `<div class="pv-sub">글자 뒤 그라데이션</div>`: ''}
  ${S.mode !== 'frame' || S.fbg === 'blur' ? `<div class="chips">${[['auto','그림 주조색'],['black','검정']].map(([k, l]) => `<button class="chip ${S.tint === k ? 'on' : ''}" onclick="pickTint('${k}')">${l}</button>`).join('')}</div>` : ''}
`;
  if (t === 'art') return `
  <div class="pv-sub">그림 표시</div>
  <div class="chips">${[['cover','꽉 채우기'],['fitw','가로 맞춤'],['frame','액자형']].map(([k, l]) => `<button class="chip ${S.mode === k ? 'on' : ''}" onclick="setOpt('mode','${k}')">${l}</button>`).join('')}</div>
  ${S.mode === 'fitw' ? `<div class="pv-sub">위아래 색</div>
  <div class="chips">${[['split','위·아래 각각'],['top','위 색상으로'],['bottom','아래 색상으로']].map(([k, l]) => `<button class="chip ${(S.fitc || 'split') === k ? 'on' : ''}" onclick="setOpt('fitc','${k}')">${l}</button>`).join('')}</div>` : ''}
  ${S.mode === 'frame' ? `
  <div class="pv-sub">그림 크기 <span class="pv-val" id="fsV">${S.fsize}%</span></div>
  <div class="rng-wrap"><span>작게</span><input class="rng" type="range" min="45" max="100" step="1" value="${S.fsize}" oninput="setFs(this.value)" onchange="save()"><span>크게</span></div>
  <div class="pv-sub">뒷배경</div>
  <div class="chips">${FBG.map(([k, l]) => `<button class="chip ${S.fbg === k ? 'on' : ''}" onclick="setOpt('fbg','${k}')">${l}</button>`).join('')}</div>` : ''}
`;
  if (t === 'frame') return `
  ${S.mode !== 'frame' ? `<div class="ed-hint">액자는 그림을 「액자형」으로 보여 줄 때 쓸 수 있어요.<button onclick="setOpt('mode','frame')">액자형으로 바꾸기</button></div>` : `
  <div class="pv-sub">액자</div>
  <div class="chips">${FBORDER.map(([k, l]) => `<button class="chip ${S.fborder === k ? 'on' : ''}" onclick="setOpt('fborder','${k}')">${l}</button>`).join('')}</div>
`}
`;
  return `
  <div class="pv-sub">위치</div>
  <div class="chips">${(grouped() ? [['default','문장과 묶음'], ['under','작품 아래']] : LPOS).map(([k, l]) => `<button class="chip ${(grouped() && k === 'default' ? lblPos() !== 'under' : lblPos() === k) ? 'on' : ''} ${k === 'under' && S.mode !== 'frame' ? 'dim' : ''}" onclick="setLpos('${k}')">${l}</button>`).join('')}</div>
  <div class="pv-sub">작품 정보 크기 <span class="pv-val" id="lkV">${Math.round((S.lk || 1) * 100)}%</span></div>
  <div class="rng-wrap"><span>작게</span><input class="rng" type="range" min="60" max="200" step="1" value="${Math.round((S.lk || 1) * 100)}" oninput="setKLive('lk',this.value)" onchange="save()"><span>크게</span></div>
  <div class="pv-sub">작품 정보 폰트</div>
  <div class="chips">${LFONTS.map(([k, l, f]) => `<button class="chip fchip ${S.lfont === k ? 'on' : ''}" style="font-family:${k === 'sans' ? 'var(--sans)' : k === 'serif' ? 'var(--serif)' : `'${f}',var(--serif)`}" onclick="setFont('lfont','${k}')">${l}</button>`).join('')}</div>
  <div class="pv-sub">작품 정보 스타일</div>
  <div class="chips" id="lblChips">${LABELS.map(([k, l]) => `<button class="chip ${labelSt() === k ? 'on' : ''}" onclick="pickLabel('${k}')">${l}</button>`).join('')}</div>
`;
}
// 메뉴 위치: 고른 요소의 반대편 (위쪽 요소 → 메뉴는 아래, 아래쪽 요소 → 메뉴는 위)
function edDock(){
  const k = edSel || (edTool === 'clock' ? 'clock' : null);
  const y = k === 'clock' ? (S.cpos && !inGrp('clock') ? S.cpos.y : inGrp('clock') ? (S.bpos ? S.bpos.y : 90) : 10)
          : k === 'quote' ? (S.qpos && !inGrp('quote') ? S.qpos.y : S.bpos ? S.bpos.y : 80)
          : k === 'label' ? (S.lpos === 'free' && !inGrp('label') ? S.lxy.y : S.bpos ? S.bpos.y : 85)
          : k === 'group' ? (S.bpos ? S.bpos.y : 80) : 80;
  return y < 50 ? 'bottom' : 'top';
}
function edPick(t){ if (edTool === t && edOpen) { edOpen = false; edSel = null; } else { edTool = t; edOpen = true; edSel = t === 'frame' && S.mode !== 'frame' ? null : t === 'text' && grouped() ? 'group' : TOOL_SEL[t]; } rerender(); const b = document.querySelector('.ed-body'); if (b) b.scrollTop = 0; }
// 눈 버튼: 두 버튼만 남기고 패널·탭 바를 숨겨 잠금화면만 보기 (다시 누르면 돌아옴)
// 완료: 길게 눌러 함께 고른 요소가 있으면 그룹으로 묶고, 아니면 편집을 마침
function edDone(){
  if (edMulti.size >= 2) {
    const add = new Set(); edMulti.forEach(k => k === 'group' ? gMembers().forEach(m => add.add(m)) : add.add(k));
    S.gm = G_ORDER.filter(k => add.has(k)); if (S.gm.includes('label') && lblPos() === 'under') S.lpos = 'default';
    S.bpos = null; edMulti.clear(); edSel = 'group'; edTool = 'text'; save(); rerender(); toast('그룹으로 묶었어요');
    return;
  }
  edMulti.clear(); edSel = null; edOpen = false; rerender(); toast('저장했어요');
}
// 빈 바탕 탭: 선택·메뉴 닫기 → (한 번 더) 뷰 모드 → (뷰 모드에서 한 번 더) 기본 상태
function edBgTap(){
  if (edMulti.size) return;
  if (edHide) { if (edSel) { edSel = null; edOpen = false; rerender(); } else edToggleHide(); return; }
  if (edOpen || edSel) { edOpen = false; edSel = null; rerender(); } else edToggleHide();
}
function edToggleHide(){
  edHide = !edHide;
  const ed = document.querySelector('.ed'); if (ed) ed.classList.toggle('hide', edHide);
  if (edHide) { // 숨길 땐 깨끗한 화면으로 시작 (요소를 누르면 다시 테두리·핸들이 떠요)
    edSel = null;
    document.querySelectorAll('.ed-lock .sel').forEach(e => e.classList.remove('sel'));
    document.querySelectorAll('.ed-lock .mv').forEach(e => e.remove());
  }
  const eye = $('#edEye'); if (eye) eye.innerHTML = ic(edHide ? 'eyeOff' : 'eye', 18);
}
// 꾸미기 되돌리기(undo)·다시 실행(redo): 꾸미기 설정을 바꿀 때마다 기록해요
const ED_KEYS = ['pad','qw','lw','lwOn','bw','qk','lk','fitc','qalign','lalign','mode','big','label','tint','fsize','fborder','fbg','qfont','lfont','clk','lpos','lxy','cpos','qpos','grp','bpos','banc','gm'];
let edHist = [], edHi = -1, edApplying = false;
const edSnap = () => JSON.stringify(ED_KEYS.map(k => S[k]));
function edInEditor(){ return typeof stack !== 'undefined' && stack.length && stack[stack.length - 1].name === 'style'; }
function edHistStart(){ edHist = [edSnap()]; edHi = 0; }
function edRecord(){
  if (edApplying || !edInEditor()) return;
  if (!edHist.length) edHistStart();
  const s = edSnap(); if (s === edHist[edHi]) return;
  edHist = edHist.slice(0, edHi + 1); edHist.push(s); if (edHist.length > 60) edHist.shift(); edHi = edHist.length - 1;
  updUndo();
}
function edUndoRedo(d){
  const i = edHi + d; if (i < 0 || i >= edHist.length) return;
  edHi = i; const v = JSON.parse(edHist[i]); ED_KEYS.forEach((k, j) => { S[k] = v[j] === undefined ? (DEF[k] === undefined ? undefined : JSON.parse(JSON.stringify(DEF[k]))) : v[j]; });
  edApplying = true; save(); edApplying = false; rerender();
}
function updUndo(){ const u = document.getElementById('edUndo'), r = document.getElementById('edRedo'); if (u) u.disabled = edHi <= 0; if (r) r.disabled = edHi >= edHist.length - 1; }
function edNext(){ const o = artOrder(); const cur = edArt || S.lockArt; edArt = o[(o.indexOf(cur) + 1) % o.length]; rerender(); }
SCR.style = { tab:true, render: () => {
  const a = A(edArt || S.lockArt) || ART[0], sen = sentenceFor(a), d = now(), frame = S.mode === 'frame';
  return `<div class="ed ${edOpen ? 'open' : ''} ${edHide ? 'hide' : ''} ${edDock() === 'bottom' ? 'dock-b' : ''}">
    <div class="lock ed-lock ${frameCls()} ${S.big ? 'big' : ''}" data-tint="${a.id}" data-fs style="--fs:${S.fsize}%;--qk:${S.qk || 1};--lk:${S.lk || 1};--qw:${S.qw || 1};--lw:${S.lw || 1};--bw:${S.bw || 1};--px:${S.pad || 28}px;${fontVars()}" onclick="edBgTap()">
      <img class="bg" src="${img(a.id)}" style="object-position:${a.pos}" alt="">
      <div class="shade"></div>
      <div class="snap-v"></div>
      <div class="unlock-zone" aria-hidden="true"></div>
      <div class="pad-g l" onpointerdown="edPad(event,'l')" onclick="event.stopPropagation()" aria-label="화면 좌우 여백"><i></i><b>좌우 여백 ${S.pad || 28}px</b></div><div class="pad-g r" onpointerdown="edPad(event,'r')" onclick="event.stopPropagation()" aria-label="화면 좌우 여백"><i></i><b>좌우 여백 ${S.pad || 28}px</b></div>
      <div class="inner">
        ${inGrp('clock') ? '' : clockBlock(d, false, edAttr('clock'))}
        ${frame ? `<div class="lk-frame ${lblPos() === 'under' ? 'has-lbl' : ''} ${edSel === 'frame' ? 'sel' : ''}"><img src="${img(a.id)}" alt="${esc(a.t)}" data-el="frame" onpointerdown="edDown(event,'frame')" onclick="event.stopPropagation()">${lblPos() === 'under' ? lblEl(a, 'div', edSel === 'label' ? 'sel' : '', `data-el="label" onpointerdown="edDown(event,'label')" onclick="event.stopPropagation()"`, edSel === 'label' ? edHandle('label') : '') : ''}</div>` : ''}<div class="lk-sp"></div>
        ${grouped() ? blockHTML(a, sen, 'ed') : ''}${inGrp('quote') ? '' : `<div class="lk-quote ${S.qpos ? 'pos-free' : ''} ${edSel === 'quote' ? 'sel' : ''} ${edMulti.has('quote') ? 'sel multi' : ''}" ${S.qpos ? `style="${freeXY(S.qpos)}"` : ''} data-el="quote" onpointerdown="edDown(event,'quote')" onclick="event.stopPropagation()"><p>${esc(sen.t)}</p>${edSel === 'quote' ? edHandle('quote') : ''}</div>`}
        ${lblPos() === 'under' || inGrp('label') ? '' : lblEl(a, 'div', `${edSel === 'label' ? 'sel' : ''} ${edMulti.has('label') ? 'sel multi' : ''}`, `data-el="label" onpointerdown="edDown(event,'label')" onclick="event.stopPropagation()"`, edSel === 'label' ? edHandle('label') : '')}
        <div class="lk-unlock" aria-hidden="true"><span class="ch">${ic('chevU', 22)}</span>${S.unlockBy === 'swipe' ? '위로 밀어서 열기' : S.unlockBy === 'type' ? '문장을 따라 쓰고 열기' : '소리 내어 읽고 열기'}</div>
      </div>
    </div>
    <div class="ed-panel">
      <div class="ed-fab ed-nav"><button id="edUndo" onclick="edUndoRedo(-1)" aria-label="되돌리기" ${edHi <= 0 ? 'disabled' : ''}>${ic('undo', 18)}</button><button id="edRedo" onclick="edUndoRedo(1)" aria-label="다시 실행" ${edHi >= edHist.length - 1 ? 'disabled' : ''}>${ic('redo', 18)}</button></div>
      <div class="ed-fab"><button onclick="edToggleHide()" aria-label="화면만 보기" id="edEye">${ic(edHide ? 'eyeOff' : 'eye', 18)}</button><button onclick="edNext()" aria-label="다른 그림">${ic('refresh', 18)}</button><button class="done" onclick="edDone()">${edMulti.size >= 2 ? '그룹 완료' : '완료'}</button></div>
      <div class="ed-tools">${ED_TOOLS.map(([k, l]) => `<button class="${edTool === k && edOpen ? 'on' : ''}" onclick="edPick('${k}')">${l}</button>`).join('')}</div>
      <div class="body ed-body">${edGroup(edTool)}</div>
    </div>
  </div>${tabbar('style')}`; },
  after: () => { statusLight(true); applyTints(); placeUnder(); fitQuotes();} };
SCR.sentences = { tab:true, render: () => {
  const cur = S.cats[0];
  let list = allSentences();
  if (senSeg === 'saved') list = list.filter(s => S.savedSent.includes(s.t));
  if (senSeg === 'mine') list = list.filter(s => s.mine);
  if (senSeg === 'all') list = list.filter(s => s.c === cur);
  const pv = previewSentence(cur, senPv);
  const pa = A(pv.art || S.lockArt) || A(S.lockArt);
  const cc = CATS.find(c => c.k === cur), d = now();
  return `${nav({ right:`<button class="ib" onclick="showLock(true)" aria-label="잠금화면 보기">${ic('lock')}</button>` })}<div class="body">
  ${hd('문장 유형', '잠금화면에 나올 문장 유형을 골라요.')}
  <div class="chips fit" id="catChips">${CATS.map(c => `<button class="chip ${cur === c.k ? 'on' : ''}" onclick="pickCat('${c.k}')">${c.k}</button>`).join('')}</div>
  <div class="pv-wrap">
    <button class="pv-phone ${frameCls()}" onclick="senPv++;rerender()" aria-label="다른 예시 보기" data-tint="${pa.id}" data-fs style="--fs:${S.fsize}%;--qk:${S.qk || 1};--lk:${S.lk || 1};--qw:${S.qw || 1};--lw:${S.lw || 1};--bw:${S.bw || 1};--px:${S.pad || 28}px;${fontVars()}">
      <img class="bg" src="${img(pa.id)}" style="object-position:${pa.pos}" alt="">
      <div class="shade"></div>
      <div class="pv-in">
        ${inGrp('clock') ? '' : clockBlock(d, true)}
        ${S.mode === 'frame' ? `<div class="pv-frame ${lblPos() === 'under' ? 'has-lbl' : ''}"><img src="${img(pa.id)}" alt="">${lblPos() === 'under' ? lblEl(pa, 'div', 'pv', '') : ''}</div>` : ''}<div class="pv-sp"></div>
        ${grouped() ? blockHTML(pa, pv, 'pv') : ''}${inGrp('quote') ? '' : `<p class="pv-q ${S.qpos ? 'pos-free' : ''}" ${S.qpos ? `style="${freeXY(S.qpos)}"` : ''}>${esc(pv.t)}</p>`}
        ${lblPos() === 'under' || inGrp('label') ? '' : lblEl(pa, 'div', 'pv', '')}
      </div>
    </button>
    <div class="pv-cap"><b>${cur}</b> · ${cc.d}<br><span>미리보기를 누르면 다른 예시를 보여 줘요</span></div>
  </div>
  <button class="ed-link" onclick="tab('style')"><span>${ic('palette', 22)}</span><div><b>잠금화면 꾸미기</b><small>시계 · 문장 폰트 · 그림 · 액자 · 작품 정보</small></div>${ic('chevR', 18)}</button>
  <div class="divider" style="margin-top:20px"></div>
  ${lh('문장 모음', '나의 문장 쓰기', 'writeSheet()')}
  <div class="seg">${[['all',`${cur} 문장`],['saved','저장'],['mine','나의 문장']].map(([k, l]) => `<button class="${senSeg === k ? 'on' : ''}" onclick="senSeg='${k}';rerender()">${l}</button>`).join('')}</div>
  ${list.length ? list.map(s => { const on = S.savedSent.includes(s.t); const src = s.art ? `${A(s.art).t} · ${A(s.art).as}` : s.mine ? '내가 쓴 문장' : '한 폭 문장';
    return `<div class="scard"><p>${esc(s.t)}</p><div class="meta"><span class="badge ${s.mine ? 'or' : ''}">${CATS.find(c => c.k === s.c).e} ${s.c}</span><span class="src">${esc(src)}</span><button class="hb ${on ? 'on' : ''}" onclick="toggleSent(${JSON.stringify(s.t).replace(/"/g, '&quot;')})" aria-label="문장 저장">${ic(on ? 'heart' : 'heartO', 22)}</button></div></div>`; }).join('')
  : `<div class="empty"><div class="em">${senSeg === 'mine' ? '✍️' : '🤍'}</div>${senSeg === 'mine' ? '나에게 하고 싶은 말을 적어 보세요.<br>잠금화면에 가끔 섞여 나와요.' : '마음에 드는 문장의 하트를 눌러 보세요.'}</div>`}
  <div class="pb"></div></div>${tabbar('sentences')}`; },
  after: () => { statusLight(lockOpen()); applyTints(); placeUnder(); fitQuotes(); const on = document.querySelector('#catChips .chip.on'); if (on) on.scrollIntoView({ block:'nearest', inline:'nearest' }); } };
function pickTint(k){ if (S.tint === k) return; S.tint = k; save(); const b = document.querySelector('.body'); const y = b ? b.scrollTop : 0; rerender(); const b2 = document.querySelector('.body'); if (b2) b2.scrollTop = y; }
function pickLabel(k){
  if (S.label === k) return;
  S.label = k; save();
  const b = document.querySelector('.body'); const y = b ? b.scrollTop : 0; const c = document.querySelector('#lblChips'); const x = c ? c.scrollLeft : 0;
  rerender();
  const b2 = document.querySelector('.body'); if (b2) b2.scrollTop = y; const c2 = document.querySelector('#lblChips'); if (c2) c2.scrollLeft = x;
}
function pickCat(k){
  if (S.cats[0] === k) return;
  S.cats = [k]; senPv = 0; save();
  const b = document.querySelector('.body'); const y = b ? b.scrollTop : 0;
  rerender();
  const b2 = document.querySelector('.body'); if (b2) b2.scrollTop = y;
}
function toggleSent(t){ const i = S.savedSent.indexOf(t); if (i >= 0) { S.savedSent.splice(i, 1); toast('문장 저장을 취소했어요', 'infoCircle'); } else { S.savedSent.push(t); toast('문장을 저장했어요'); } save(); rerender(); }
let wCat = '위로';
function writeSheet(){
  openSheet(`<div class="shd"><h3>나의 문장 쓰기</h3><p>나에게 하고 싶은 말을 적으면 잠금화면에 가끔 섞여 나와요.</p></div>
  <div style="padding:0 24px"><textarea class="ta" id="wTa" maxlength="60" placeholder="예) 오늘도 나답게, 천천히." oninput="$('#wCnt').textContent=this.value.length+' / 60';$('#wAdd').disabled=!this.value.trim()"></textarea><div class="cnt" id="wCnt">0 / 60</div></div>
  <div class="chips wrap" style="padding-top:8px;padding-bottom:4px" id="wCats">${CATS.map(c => `<button class="chip ${wCat === c.k ? 'on' : ''}" onclick="wCat='${c.k}';[...document.querySelectorAll('#wCats .chip')].forEach(b=>b.classList.toggle('on',b.dataset.k===wCat))" data-k="${c.k}">${c.e} ${c.k}</button>`).join('')}</div>
  ${cta(`<button class="btn" id="wAdd" disabled onclick="addMine()">추가하기</button>`)}`);
  setTimeout(() => { const t = $('#wTa'); t && t.focus(); }, 350);
}
function addMine(){ const v = $('#wTa').value.trim(); if (!v) return; S.mine.unshift({ c:wCat, t:v }); save(); closeSheet(); senSeg = 'mine'; if (stack[stack.length - 1].name === 'sentences') rerender(); toast('나의 문장을 추가했어요'); }

/* ===================== 나 ===================== */
const MODE_L = { cover:'꽉 채우기', fitw:'가로 맞춤', frame:'액자형' }, UNL_L = { swipe:'밀어서 열기', type:'따라 쓰고 열기', voice:'소리 내어 읽고 열기' }, CHG_L = { every:'켤 때마다', daily:'하루 한 번' };
// 실제 잠금화면과 똑같은 미니 미리보기 (390×844로 그린 뒤 칸 크기에 맞춰 축소) — 「위로 밀어서 열기」까지 그대로, 광고는 꾸미기 화면처럼 없이
function lockMini(id, senOv){
  const a = A(id) || A(S.lockArt), sen = senOv || sentenceFor(a), d = now(), frame = S.mode === 'frame';
  return `<div class="mini"><div class="mini-in"><div class="lock ${frameCls()} ${S.big ? 'big' : ''}" data-tint="${a.id}" data-fs style="--fs:${S.fsize}%;--qk:${S.qk || 1};--lk:${S.lk || 1};--qw:${S.qw || 1};--lw:${S.lw || 1};--bw:${S.bw || 1};--px:${S.pad || 28}px;${fontVars()}">
    <img class="bg" src="${img(a.id)}" style="object-position:${a.pos}" alt="">
    <div class="shade"></div>
    <div class="inner">
      ${inGrp('clock') ? '' : clockBlock(d)}
      ${frame ? `<div class="lk-frame ${lblPos() === 'under' ? 'has-lbl' : ''}"><img src="${img(a.id)}" alt="">${lblPos() === 'under' ? lblEl(a, 'div', '', '') : ''}</div>` : ''}<div class="lk-sp"></div>
      ${grouped() ? blockHTML(a, sen, 'lock') : ''}${inGrp('quote') ? '' : `<div class="lk-quote ${S.qpos ? 'pos-free' : ''}" ${S.qpos ? `style="${freeXY(S.qpos)}"` : ''}><p>${esc(sen.t)}</p></div>`}
      ${lblPos() === 'under' || inGrp('label') ? '' : lblEl(a, 'div', '', '')}
      <div class="lk-unlock"><span class="ch">${ic('chevU', 22)}</span>${S.unlockBy === 'swipe' ? '위로 밀어서 열기' : S.unlockBy === 'type' ? '문장을 따라 쓰고 열기' : '소리 내어 읽고 열기'}</div>
    </div>
  </div></div></div>`;
}
function sizeMinis(){ document.querySelectorAll('.mini-in').forEach(m => { m.style.transform = `scale(${m.parentElement.clientWidth / 390})`; }); }
addEventListener('resize', () => setTimeout(sizeMinis, 50));

// 프로필 샘플 데이터 (프로토타입)
const PF_POSTS = ['wmmon4e12b1', 'starry', 'wmmat5c630b', 'wmkan6473ec', 'lilies', 'cafe', 'wmmon30d1e3', 'wmmond0be2b', 'wmmon882481'];
// 바탕화면 그룹 (예시 4개 · 직접 디자인): 그림 묶음 + 규격 + 문장 유형 + 글자 스타일
const PF_GROUPS = [
  // 모네의 정원: 하늘을 비우고, 아래쪽에 가운데 정렬로 조용히 — 큰 Cormorant 시계, 좁은 문장 폭
  { id:'c1', t:'모네의 정원', m:[], mine:true, mode:'cover', cats:['위로','감사'],
    look:{ qfont:'maru', lfont:'cormorant', label:'two', qalign:'center', lalign:'center', clk:{ font:'cormorant', align:'center', size:104, off:6, date:'ko', form:'h24' },
           pad:44, qk:.86, lk:.95, bw:1.06, gm:['quote','label'], bpos:{ x:50, y:86, anc:'bottom' }, banc:'bottom' },
    arts:['wmmon4e12b1','lilies','wmmon19aa12','wmmon748789','wmmonbb5a9d','wmmond0be2b','wmmone5f19b','wmmona8d6f1','wmmon78acd7','wmmon882481'] },
  // 고흐의 금빛 액자: 왼쪽 위에 작은 세리프 시계 + 작품 캡션(박물관 벽 라벨처럼), 문장은 액자 아래 왼쪽 정렬
  { id:'c2', t:'고흐의 금빛 액자', m:[], mine:true, mode:'frame', cats:['용기','위로'],
    look:{ fborder:'gold', fbg:'blur', qfont:'hahmlet', lfont:'ebg', label:'line', qalign:'left', lalign:'left', clk:{ font:'serif', align:'left', size:58, off:0, date:'ko', form:'h24' },
           pad:28, qk:.86, lk:1, bw:1, fsize:80, gm:['clock','label'], bpos:{ x:50, y:7, anc:'top' }, banc:'top' },
    arts:['starry','cafe','wheat','met436524','met436528','met437980','olive','met436527','vgself'] },
  // 바다와 파도: 잡지 표지처럼 — 위쪽 바다색 띠에 큰 굵은 시계와 문장을 몰고, 그림은 아래로 시원하게
  { id:'c3', t:'바다와 파도', m:[], mine:true, mode:'fitw', cats:['정보','웃음'],
    look:{ fitc:'split', qfont:'gowun', lfont:'sans', label:'one', qalign:'left', lalign:'left', clk:{ font:'bold', align:'left', size:112, off:0, date:'ko', form:'h24' },
           pad:28, qk:.86, lk:1, bw:1, gm:['clock','quote','label'], bpos:{ x:50, y:6, anc:'top' }, banc:'top' },
    arts:['wave','met36490','shipwreck','met36495','wmtur90806e','met36492','met437852','wmturfee3f6','wmtur3e4166','wmturb61091'] },
  // 색의 산책: 액자를 위로 올리고, 시계·문장·작품 정보를 아래 한 묶음으로 — 갤러리 벽의 설명판처럼
  { id:'c4', t:'색의 산책', m:[], mine:true, mode:'frame', cats:['감사','웃음'],
    look:{ fborder:'white', fbg:'tint', qfont:'ridi', lfont:'playfair', label:'two', qalign:'center', lalign:'center', clk:{ font:'playfair', align:'center', size:56, off:0, date:'none', form:'h24' },
           pad:40, qk:.8, lk:.95, bw:1, fsize:72, gm:['clock','quote','label'], bpos:null, banc:'auto' },
    arts:['wmmatcd2116','kandinsky','wmmatff80ca','wmkan04fe40','wmmat87afa3','wmkan6473ec','matisse','wmkan3d8b4e','wmmatec0a94','wmkand52f8b'] }
].map(g => Object.assign(g, { art:g.arts[0], n:g.arts.length }));
function allGroups(){ const mine = S.groups || []; return [...mine, ...PF_GROUPS.filter(g => !mine.some(m => m.id === g.id))]; }
function groupById(id){ return id === 'base' ? baseGroup() : allGroups().find(g => g.id === id) || null; }
function activeGroup(){ return S.activeG ? allGroups().find(g => g.id === S.activeG) || null : null; }
// 「기본 잠금화면」: 그룹을 걸기 전의 내 설정 (전체 그림 + 내가 고른 문장·규격)
function baseGroup(){
  const b = S.activeG ? (S.base || {}) : { mode:S.mode, cats:S.cats };
  const o = ART.map(a => a.id), st = Math.max(0, o.indexOf(S.lockArt));
  return { id:'base', t:'기본 잠금화면', mode:b.mode || 'cover', cats:(b.cats && b.cats.length ? b.cats : ['위로']), m:[], art:S.activeG ? o[0] : S.lockArt, arts:o.slice(st).concat(o.slice(0, st)).slice(0, 8), n:ART.length, base:true };
}
// 「바탕화면 그룹」 탭 순서: 지금 걸려 있는 것 → 기본(안 걸려 있으면) → 내가 만든 그룹 → 예시 그룹
function pfCards(){ const ag = activeGroup(), base = baseGroup(), rest = allGroups().filter(g => g !== ag); return ag ? [ag, base, ...rest] : [base, ...rest]; }
function isActive(g){ return g.base ? !S.activeG : g.id === S.activeG; }
function applyGroup(id){
  const g = groupById(id); if (!g) return;
  if (g.base) { if (S.base) Object.assign(S, JSON.parse(JSON.stringify(S.base))); S.activeG = null; S.base = null; }
  else {
    if (!S.activeG) S.base = lookSnap(); // 그룹을 걸기 전의 내 규격을 기억해 뒀다가 「기본 잠금화면」으로 되돌릴 때 사용
    else if (S.base) Object.assign(S, JSON.parse(JSON.stringify(S.base)));
    S.activeG = g.id; Object.assign(S, JSON.parse(JSON.stringify(lookOf(g))));
  }
  applyFonts();
  // 미리보기 첫 장 그대로: 다음에 화면을 켜면 그룹의 첫 그림부터
  const o = artOrder(); S.lockArt = o[0]; S.pinned = o[0];
  save(); rerender(); toast(`「${g.t}」을(를) 잠금화면에 걸었어요`);
}
/* 그룹 상세: 화면 자체가 미리보기 (좌우로 밀면 그룹 그림이 넘어감) · 오른쪽 위 「수정」 · 아래 CTA 「잠금화면에 걸기」 */
let gvIdx = 0;
SCR.gview = { render: ({ id }) => {
  const g = groupById(id); if (!g) return `${nav({ back:true })}<div class="body"></div>`;
  const on = isActive(g), ids = (g.arts || [g.art]).filter(x => A(x)), shown = ids.slice(0, 12);
  const look = (GN_LOOKS.find(l => l[0] === (g.mode || S.mode)) || GN_LOOKS[0])[1], cats = (g.cats && g.cats.length ? g.cats : S.cats).join(' · ');
  return `${nav({ back:true, title:esc(g.t), right:`<button class="txt gv-edit" onclick="gvEdit('${g.id}')">수정</button>` })}<div class="body gv">
  <div class="gv-rail" onscroll="gvScroll(this)">${shown.map((x, k) => `<div class="gv-slide" onclick="showArt('${x}')">${groupMini(g, x, k)}${on && k === 0 ? `<span class="pf-on">${ic('check', 12)}적용 중</span>` : ''}</div>`).join('')}</div>
  <div class="gv-dots">${shown.map((x, k) => `<i class="${k === 0 ? 'on' : ''}"></i>`).join('')}</div>
  <div class="gv-meta"><div><span>그림</span><b>${g.n || ids.length}점</b></div><div><span>규격</span><b>${look}</b></div><div><span>문장</span><b>${cats}</b></div></div>
  <p class="gv-hint">좌우로 밀어서 다른 그림도 미리 볼 수 있어요. 누르면 실제 잠금화면으로 크게 보여요.</p><div class="pb"></div></div>
  ${cta(`<button class="btn" ${on ? 'disabled' : ''} onclick="applyGroup('${g.id}')">${on ? `${ic('check', 18)}지금 잠금화면에 걸려 있어요` : '잠금화면에 걸기'}</button>`)}`; },
  after: () => { statusLight(false); applyTints(); sizeMinis(); placeUnder(); fitQuotes(); } };
function gvScroll(el){ const w = el.firstElementChild ? el.firstElementChild.offsetWidth + 12 : 1, k = Math.round(el.scrollLeft / w); el.parentElement.querySelectorAll('.gv-dots i').forEach((d, i) => d.classList.toggle('on', i === k)); }
function gvEdit(id){
  const g = groupById(id); if (!g) return;
  if (g.base) { tab('style'); return; } // 기본 잠금화면은 꾸미기에서
  gn = { mode:g.mode || S.mode, cats:(g.cats && g.cats.length ? g.cats : S.cats).slice(), pick:'art', arts:(g.arts || [g.art]).filter(x => A(x)), name:g.t, edit:g.id };
  gnArtF = '전체'; go('gnArts');
}
// 그룹 구성원: 나 + 멤버 이니셜을 겹친 동그라미로 (최대 3개, 나머지는 숫자)
const AV_BG = ['#E8DCCB', '#D5E2DA', '#DCD6EA', '#F0D5D0', '#D4E1EC'];
function avStack(m){
  const all = [null, ...m], show = all.slice(0, 3), more = all.length - show.length;
  if (!m.length) return `<span class="avs solo" aria-label="${esc(S.nick || '한폭러')}"><i><img src="${th(S.lockArt)}" alt=""></i><b>${esc(S.nick || '한폭러')}</b></span>`; // 나 혼자면 이름만
  return `<span class="avs" aria-label="구성원 ${all.length}명">${show.map((n, i) => n === null ? `<i><img src="${th(S.lockArt)}" alt=""></i>` : `<i style="background:${AV_BG[(n.charCodeAt(0) + i) % AV_BG.length]}">${esc(n[0])}</i>`).join('')}${more > 0 ? `<i class="more">+${more}</i>` : ''}<b>${all.length}명</b></span>`;
}
// 바탕화면 그룹: 각 카드가 5초마다 그룹 사진을 하나씩 넘겨요 (카드마다 1.2초씩 엇갈려서, 스르륵 겹쳐 바뀜)
let pfTimer = null, pfTick = 0;
function pfCycle(){
  clearInterval(pfTimer); pfTimer = null;
  if (!document.querySelector('.pf-group[data-g]')) return;
  const start = Date.now();
  pfTimer = setInterval(() => {
    const cards = document.querySelectorAll('.pf-group[data-g]');
    if (!cards.length) { clearInterval(pfTimer); pfTimer = null; return; }
    const t = Date.now() - start;
    cards.forEach((c, i) => {
      const g = pfCards()[+c.dataset.g], step = Math.floor((t - i * 1200) / 5000);
      if (!g || !g.arts || step < 1 || +(c.dataset.step || 0) === step) return;
      c.dataset.step = step;
      const id = g.arts[step % g.arts.length]; c.dataset.cur = id;
      const old = c.querySelector('.mini'); if (!old) return;
      const tmp = document.createElement('div'); tmp.innerHTML = groupMini(g, id, step); const nw = tmp.firstElementChild;
      nw.classList.add('swap'); old.after(nw);
      applyTints(); sizeMinis(); fitQuotes();
      nw.animate([{ opacity:0 }, { opacity:1 }], { duration:700, easing:'cubic-bezier(0,0,.58,1)' }).onfinish = () => { nw.classList.remove('swap'); old.remove(); };
    });
  }, 250);
}
function pfDays(){ if (!S.joined) { S.joined = Date.now() - 41 * 864e5; save(); } return Math.max(1, Math.round((Date.now() - S.joined) / 864e5)); }
function nickSheet(){
  openSheet(`<div class="shd"><h3>프로필 편집</h3><p>다른 사람에게 보일 이름이에요.</p></div>
  <div style="padding:0 24px"><input id="nickIn" class="nick-in" maxlength="16" value="${esc(S.nick || '')}" placeholder="이름"></div>
  ${cta(`<button class="btn" onclick="const v=document.getElementById('nickIn').value.trim(); if(v){S.nick=v;save();} closeSheet();rerender()">저장</button>`)}`);
}
SCR.me = { tab:true, render: () => {
  const a = A(S.lockArt), sen = sentenceFor(a);
  return `${nav({ left:`<div class="pf-top">${esc(S.nick || '한폭러')}</div>`, right:`<button class="ib" onclick="showLock(true)" aria-label="잠금화면 보기">${ic('lock')}</button><button class="ib" onclick="go('settings')" aria-label="설정">${ic('menu')}</button>` })}<div class="body pf">
  <div class="pf-head">
    <button class="pf-av" onclick="nickSheet()" aria-label="프로필 편집"><img src="${th(S.lockArt)}" alt=""></button>
    <div class="pf-stats"><div><b>${S.streak + (S.readToday ? 1 : 0)}</b><span>연속 기록</span></div><div><b>${ART.filter(x => S.seen.includes(x.id)).length}</b><span>만난 그림</span></div><div><b>${S.reads}</b><span>담은 문장</span></div></div>
  </div>
  <div class="pf-bio"><b>${esc(S.nick || '한폭러')}</b><span>한 폭과 함께한 지 ${pfDays()}일째</span><span class="now">${ic('lock', 12)}지금 잠금화면 · ${esc(A(S.lockArt).t)}</span></div>
  <div class="pf-btns"><button onclick="nickSheet()">프로필 편집</button><button onclick="toast('프로필 링크를 복사했어요','check')">프로필 공유</button></div>
  <div class="pf-tabs">${[['post','grid','게시물'],['group','cards','바탕화면 그룹']].map(([k, i, l]) => `<button class="${(S.pfTab || 'post') === k ? 'on' : ''}" onclick="S.pfTab='${k}';save();rerender()" aria-label="${l}">${ic(i, 24)}</button>`).join('')}</div>
  ${(S.pfTab || 'post') === 'post'
    ? `<div class="pf-grid"><button class="pf-post pf-add" onclick="pnStart()">${ic('plus', 26)}<span>새 게시물</span></button>${POSTS.map(postCell).join('')}</div>`
    : `<div class="pf-groups">${pfCards().map((g, gi) => [g, gi]).filter(([g]) => A(g.art)).map(([g, gi]) => `<div class="pf-group ${g.just ? 'just' : ''} ${isActive(g) ? 'act' : ''}" role="button" tabindex="0" data-g="${gi}" onclick="go('gview',{id:'${g.id}'})"><div class="pf-mw">${groupMini(g, g.art)}${isActive(g) ? `<span class="pf-on">${ic('check', 12)}적용 중</span>` : ''}</div><div class="pf-gt">${esc(g.t)}</div><div class="pf-gm">${avStack(g.m)}<span class="ph" aria-label="${g.mine || g.base ? '그림' : '사진'} ${g.n}${g.mine || g.base ? '점' : '장'}">${ic('photoO', 14)}${g.n}</span></div></div>`).join('')}
      <button class="pf-group pf-new" onclick="gnStart()"><div class="mini"><div class="nw">${ic('plus', 26)}<span>새 그룹</span></div></div><div class="pf-gt">새 그룹 만들기</div><div class="pf-gm"><span>규격 · 문장 · 그림을 내 맘대로</span></div></button></div>`}
  <div class="pb"></div></div>${tabbar('me')}`; },
  after: () => { statusLight(lockOpen()); applyTints(); sizeMinis(); placeUnder(); fitQuotes(); pfCycle(); } };
/* ===================== 새 그룹 만들기 (4단계) ===================== */
// 그룹 = 내가 정한 잠금화면 묶음: 1 그림(작가로 / 낱개로 / 내 사진) → 2 규격 → 3 문장 유형 → 4 이름 → 프로필 「바탕화면 그룹」
const GN_LOOKS = [['cover', '꽉 채우기', '그림이 화면을 가득'], ['fitw', '가로 맞춤', '그림 전체가 보이게'], ['frame', '액자형', '액자에 건 것처럼']];
let gn = null, gnArtF = '전체';
// 잠깐 S 값을 바꿔서 그려요 (그룹마다 다른 규격·문장 유형으로 미리보기)
function withS(over, fn){ const keep = {}; Object.keys(over).forEach(k => { keep[k] = S[k]; S[k] = over[k]; }); try { return fn(); } finally { Object.assign(S, keep); } }
const LOOK_KEYS = ['mode','cats','qfont','lfont','label','clk','qalign','lalign','fitc','fborder','fbg','big','fsize','cpos','qpos','gm','bpos','banc','qk','lk','qw','bw','lw','lwOn','pad','lpos','lxy'];
// 그룹이 위치·크기를 따로 안 정했으면 기본 배치로 (좌우 28px · 문장+작품 정보 묶음은 맨 아래)
const LAYOUT_DEF = { cpos:null, qpos:null, gm:['quote','label'], bpos:null, banc:'auto', qk:1, lk:1, qw:1, bw:1, lw:1, lwOn:false, pad:28, lpos:'default', lxy:{ x:8, y:72 }, big:false, fsize:86 };
const lookSnap = () => JSON.parse(JSON.stringify(Object.fromEntries(LOOK_KEYS.map(k => [k, S[k]]))));
function lookOf(g){ return JSON.parse(JSON.stringify(Object.assign({}, g.base ? (S.activeG ? (S.base || {}) : lookSnap()) : LAYOUT_DEF, g.look || {}, g.mode ? { mode:g.mode } : {}, g.cats && g.cats.length ? { cats:g.cats } : {}))); }
function groupMini(g, id, k = 0){ const L = lookOf(g); L.cats = L.cats && L.cats.length ? [L.cats[k % L.cats.length]] : S.cats; return withS(L, () => lockMini(id)); }
function gnArtists(){ return Object.keys(ARTISTS).filter(n => ART.some(a => a.a === n)); }
function gnPicked(){ return gn.arts.filter(id => A(id)); }
function gnCnt(nm){ return gn.arts.filter(id => (A(id) || {}).a === nm).length; }
function gnStart(){ gn = { mode:S.mode || 'cover', cats:S.cats.length ? S.cats.slice() : ['위로'], pick:'artist', arts:[], name:'' }; gnArtF = '전체'; go('gnArts'); }
function gnToggle(list, v){ const i = gn[list].indexOf(v); i >= 0 ? gn[list].splice(i, 1) : gn[list].push(v); rerender(); }
// 작가 한 명: 다 담겨 있으면 전부 빼고, 아니면 전부 담기
function gnArtist(nm){ const w = ART.filter(a => a.a === nm).map(a => a.id), all = w.every(id => gn.arts.includes(id)); gn.arts = all ? gn.arts.filter(id => !w.includes(id)) : [...gn.arts, ...w.filter(id => !gn.arts.includes(id))]; rerender(); }
function gnShown(){ return ART.filter(a => gnArtF === '전체' || a.a === gnArtF).map(a => a.id); }
function gnAll(){ const w = gnShown(), all = w.every(id => gn.arts.includes(id)); gn.arts = all ? gn.arts.filter(id => !w.includes(id)) : [...gn.arts, ...w.filter(id => !gn.arts.includes(id))]; rerender(); }
// 내 사진 넣기: 긴 변 1280px로 줄여 저장 (휴대폰 저장 공간 아끼려고)
function gnAddPics(inp){
  const files = [...(inp.files || [])].filter(f => /^image\//.test(f.type)); inp.value = '';
  if (!files.length) return;
  let done = 0, fail = 0;
  files.forEach(f => {
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => {
      const k = Math.min(1, 1280 / Math.max(im.width, im.height)), cv = document.createElement('canvas');
      cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
      const id = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      addMyPic(id, cv.toDataURL('image/jpeg', .8));
      if (saveMyPics()) { if (gn) gn.arts.push(id); } else { MYPIC.pop(); delete IMG[id]; delete TH[id]; fail++; }
      if (++done === files.length) { rerender(); if (fail) toast('저장 공간이 부족해서 일부 사진은 못 넣었어요', 'infoCircle'); else toast(`사진 ${files.length - fail}장을 담았어요`); }
    }; im.onerror = () => { if (++done === files.length) rerender(); }; im.src = r.result; };
    r.readAsDataURL(f);
  });
}
// 내 사진 지우기: 후보에서 빼고, 그 사진을 쓰던 그룹에서도 빼요
function picUsage(){ try { return Math.min(100, Math.round((localStorage.getItem('hanpok.pics') || '').length * 2 / (5 * 1024 * 1024) * 100)); } catch(e){ return 0; } }
function delMyPic(id){
  const i = MYPIC.findIndex(p => p.id === id); if (i < 0) return;
  MYPIC.splice(i, 1); delete IMG[id]; delete TH[id]; saveMyPics();
  if (gn) gn.arts = gn.arts.filter(x => x !== id);
  (S.groups || []).forEach(g => { if (g.arts) { g.arts = g.arts.filter(x => x !== id); g.n = g.arts.length; if (g.art === id) g.art = g.arts[0] || S.lockArt; } });
  if (S.lockArt === id) S.lockArt = artOrder()[0] || ART[0].id;
  save(); rerender(); toast('사진을 지웠어요');
}
const gnFresh = () => { applyTints(); sizeMinis(); placeUnder(); fitQuotes(); };
SCR.gnArts = { render: () => {
  const n = gnPicked().length, names = gnArtists(), shortN = nm => (ART.find(a => a.a === nm) || {}).as || nm;
  const badge = c => c ? `<em class="gn-n">${c}</em>` : '';
  let list = '', btns = `<button class="btn" ${n ? '' : 'disabled'} onclick="go('gnLook')">${n ? `그림 ${n}점 담기` : '그림을 골라 주세요'}</button>`;
  if (gn.pick === 'artist') list = `<div class="gn-artists">${names.map(nm => { const w = ART.filter(a => a.a === nm), c = gnCnt(nm), all = c === w.length; return `<button class="${all ? 'on' : c ? 'part' : ''}" onclick="gnArtist('${nm}')"><span class="th">${w.slice(0, 3).map(a => `<img src="${th(a.id)}" style="object-position:${a.pos}" alt="">`).join('')}</span><div><b>${esc(nm)}${badge(c)}</b><span>작품 ${w.length}점${c && !all ? ` 중 ${c}점 담음` : ''}</span></div><span class="ck">${ic('circleCheck', 26)}</span></button>`; }).join('')}</div>`;
  else if (gn.pick === 'art') {
    const shown = gnShown(), allOn = shown.length && shown.every(id => gn.arts.includes(id));
    list = `<div class="chips">${['전체', ...names].map(nm => `<button class="chip ${gnArtF === nm ? 'on' : ''}" onclick="gnArtF='${nm}';rerender()">${nm === '전체' ? '전체' : esc(shortN(nm))}${nm === '전체' ? '' : badge(gnCnt(nm))}</button>`).join('')}</div>
       <div class="gn-arts">${shown.map(id => A(id)).map(a => `<button class="${gn.arts.includes(a.id) ? 'on' : ''}" onclick="gnToggle('arts','${a.id}')" aria-label="${esc(a.t)}"><img loading="lazy" decoding="async" src="${th(a.id)}" style="object-position:${a.pos}" alt=""><span class="ck">${ic('check', 14)}</span></button>`).join('')}</div>`;
    btns = `<div class="gn-2btn"><button class="btn sec" onclick="gnAll()">${allOn ? '모두 빼기' : '모두 담기'}</button>${btns}</div>`;
  } else list = `<div class="gn-arts">
      <label class="gn-add">${ic('plus', 26)}<span>사진 추가</span><input type="file" accept="image/*" multiple onchange="gnAddPics(this)"></label>
      ${MYPIC.slice().reverse().map(a => `<div class="gn-pic ${gn.arts.includes(a.id) ? 'on' : ''}"><button class="pk" onclick="gnToggle('arts','${a.id}')" aria-label="내 사진 담기"><img src="${th(a.id)}" alt=""><span class="ck">${ic('check', 14)}</span></button><button class="del" onclick="delMyPic('${a.id}')" aria-label="사진 지우기">${ic('x', 14)}</button></div>`).join('')}</div>
      ${MYPIC.length ? `<p class="gn-note">사진 ${MYPIC.length}장 · 저장 공간 ${picUsage()}% 사용 중${picUsage() >= 80 ? ' — 안 쓰는 사진은 ✕로 지워 주세요' : ''}</p>` : `<p class="gn-note">휴대폰 사진첩에서 골라 넣어요. 내 사진도 명화처럼 문장과 함께 걸려요.</p>`}`;
  return `${nav({ back:true, title:gn && gn.edit ? '그룹 수정' : '새 그룹' })}${obProg(1)}<div class="body">
  ${hd('어떤 그림을 걸까요?', '작가로 한 번에 담거나, 마음에 드는 그림만 고르거나, 내 사진을 넣을 수 있어요.')}
  <div class="seg">${[['artist','작가로 고르기'],['art','직접 고르기'],['mine','내 사진']].map(([k, l]) => `<button class="${gn.pick === k ? 'on' : ''}" onclick="gn.pick='${k}';rerender()">${l}${k === 'mine' ? badge(gn.arts.filter(id => (A(id) || {}).mine).length) : ''}</button>`).join('')}</div>
  ${list}<div class="pb"></div></div>
  ${cta(btns)}`; },
  after: () => statusLight(false) };
SCR.gnLook = { render: () => { const id = gnPicked()[0] || S.lockArt; return `${nav({ back:true, title:gn && gn.edit ? '그룹 수정' : '새 그룹' })}${obProg(2)}<div class="body">
  ${hd('잠금화면 규격을 정해요', '글자 위치·크기·폰트는 지금 꾸민 그대로 들어가요.')}
  <div class="gn-looks">${GN_LOOKS.map(([k, t, d]) => `<div class="gl ${gn.mode === k ? 'on' : ''}" role="button" tabindex="0" onclick="gn.mode='${k}';rerender()">${withS({ mode:k }, () => lockMini(id))}<b>${t}</b><span>${d}</span></div>`).join('')}</div><div class="pb"></div></div>
  ${cta(`<button class="btn" onclick="go('gnCats')">다음</button>`)}`; },
  after: gnFresh };
SCR.gnCats = { render: () => `${nav({ back:true, title:gn && gn.edit ? '그룹 수정' : '새 그룹' })}${obProg(3)}<div class="body">
  ${hd('어떤 문장을 띄울까요?', '여러 개 고르면 번갈아 나와요.')}
  <div class="choices">${CATS.map(c => `<button class="choice ${gn.cats.includes(c.k) ? 'on' : ''}" onclick="gnToggle('cats','${c.k}')"><span class="em">${c.e}</span><div><div class="t">${c.k}</div><div class="d">${c.d}</div></div><span class="ck">${ic('circleCheck', 26)}</span></button>`).join('')}</div><div class="pb"></div></div>
  ${cta(`<button class="btn" ${gn.cats.length ? '' : 'disabled'} onclick="go('gnName')">다음</button>`)}` };
function gnSrc(){
  const ids = gnPicked(), by = {}; ids.forEach(id => { const a = A(id); by[a.as] = (by[a.as] || 0) + 1; });
  return Object.entries(by).map(([k, v]) => `${k === '나' ? '내 사진' : k} ${v}`).join(' · ');
}
function gnSuggest(){
  const ids = gnPicked(), as = [...new Set(ids.map(id => A(id).as).filter(x => x !== '나'))], mine = ids.some(id => A(id).mine), c = gn.cats[0];
  const out = [];
  if (!as.length && mine) out.push('내 사진 모음');
  if (as.length === 1) out.push(`${as[0]} 모음`, `${as[0]} · ${c}`);
  else if (as.length === 2) out.push(`${as[0]}와 ${as[1]}`);
  out.push(`오늘의 ${c}`, '나만의 미술관', '아침 잠금화면');
  return [...new Set(out)].slice(0, 4);
}
SCR.gnName = { render: () => {
  const ids = gnPicked(), sug = gnSuggest(); if (!gn.name) gn.name = sug[0];
  const look = GN_LOOKS.find(l => l[0] === gn.mode)[1];
  return `${nav({ back:true, title:gn && gn.edit ? '그룹 수정' : '새 그룹' })}${obProg(4)}<div class="body">
  ${hd('그룹 이름을 지어 주세요', '프로필의 「바탕화면 그룹」에 이 이름으로 보여요.')}
  <div class="gn-sum"><div class="pv">${groupMini(gn, ids[0])}</div><dl>
    <div><dt>그림</dt><dd>${ids.length}점<small>${esc(gnSrc())}</small></dd></div><div><dt>규격</dt><dd>${look}</dd></div><div><dt>문장</dt><dd>${gn.cats.join(' · ')}</dd></div></dl></div>
  <div class="gn-in"><input id="gnName" class="nick-in" maxlength="14" value="${esc(gn.name)}" placeholder="그룹 이름" oninput="gn.name=this.value;document.getElementById('gnCnt').textContent=this.value.length+'/14';document.getElementById('gnNext').disabled=!this.value.trim()"><span id="gnCnt" class="gn-cnt">${gn.name.length}/14</span></div>
  <div class="chips wrap gn-sug">${sug.map(n => `<button class="chip ${gn.name === n ? 'on' : ''}" onclick="gn.name='${n}';rerender()">${esc(n)}</button>`).join('')}</div><div class="pb"></div></div>
  ${cta(`<button class="btn" id="gnNext" ${gn.name.trim() ? '' : 'disabled'} onclick="gn.name=document.getElementById('gnName').value.trim();gnCreate()">${gn.edit ? '저장' : '그룹 만들기'}</button>`)}`; },
  after: gnFresh };
function gnCreate(){
  const ids = gnPicked(); if (!ids.length || !gn.name) return;
  if (gn.edit) { // 수정: 같은 자리에 덮어쓰기 (예시 그룹은 내 사본으로)
    S.groups = S.groups || [];
    const old = groupById(gn.edit) || {}, upd = Object.assign({}, old, { t:gn.name, mode:gn.mode, cats:gn.cats.slice(), art:ids[0], arts:ids, n:ids.length });
    const k = S.groups.findIndex(g => g.id === gn.edit); if (k >= 0) S.groups[k] = upd; else S.groups.push(upd);
    if (S.activeG === gn.edit) { S.mode = gn.mode; S.cats = gn.cats.slice(); S.lockArt = ids[0]; S.pinned = ids[0]; }
    save(); const id = gn.edit; gn = null;
    setRoot('me', {}, null); go('gview', { id }); setTimeout(() => toast('그룹을 수정했어요'), 250); return;
  }
  (S.groups = S.groups || []).forEach(g => delete g.just);
  S.groups.unshift({ id:'g' + Date.now().toString(36), look:(() => { const l = lookSnap(); delete l.mode; delete l.cats; return l; })(), t:gn.name, mode:gn.mode, cats:gn.cats.slice(), m:[], art:ids[0], arts:ids, n:ids.length, mine:true, just:true });
  S.pfTab = 'group'; save();
  const name = gn.name; gn = null;
  setRoot('me', {}, 'fade');
  setTimeout(() => toast(`「${name}」 그룹을 만들었어요`, 'check'), 250);
  setTimeout(() => { (S.groups || []).forEach(g => delete g.just); save(); }, 1500);
}
/* ===================== 게시물 (UGC): 내 잠금화면을 올리고, 다른 사람 것을 내 바탕화면으로 ===================== */
// 게시물 = 잠금화면 묶음(그림 + 규격 + 문장 + 글자 스타일) + 사진(선택) + 제목(기본: 날짜) + 본문
const PEOPLE = [
  { nick:'새벽산책', av:'wmmon19aa12' }, { nick:'파랑수집가', av:'wave' }, { nick:'밤의카페', av:'cafe' },
  { nick:'꽃잎일기', av:'wmmonbb5a9d' }, { nick:'느린오후', av:'wmmat87afa3' }, { nick:'절규는월요일', av:'scream' }
];
const byArtist = (n, k = 10) => ART.filter(a => a.a === n).slice(0, k).map(a => a.id);
const CK = (font, align, size) => ({ font, align, size, off:0, date:'ko', form:'h24' });
const OTHER_POSTS = [
  { id:'o1', who:0, date:'2026-11-01', title:'11월 1일', body:'출근길에 모네를 보면 조금 덜 피곤해요. 화면 켤 때마다 다른 정원이 열리는 느낌이라 좋아요.', likes:128, uses:42,
    g:{ mode:'cover', cats:['위로'], look:{ qfont:'maru', lfont:'cormorant', label:'two', qalign:'center', lalign:'center', clk:CK('cormorant', 'center', 96) }, arts:['wmmon19aa12','lilies','wmmon748789','wmmone5f19b','wmmona8d6f1','wmmonbb5a9d'] } },
  { id:'o2', who:1, date:'2026-10-30', title:'파도 모음', body:'호쿠사이 파도만 모았어요. 가로 맞춤으로 하면 위아래가 바다색으로 이어져서 진짜 바다 같아요 🌊', likes:96, uses:31,
    g:{ mode:'fitw', cats:['정보'], look:{ fitc:'split', qfont:'gowun', lfont:'sans', label:'one', qalign:'left', lalign:'left', clk:CK('bold', 'left', 84) }, arts:['wave','met36490','met36495','met36492','met36489','met55289'] } },
  { id:'o3', who:2, date:'2026-10-29', title:'10월 29일', body:'밤에만 쓰는 잠금화면. 금빛 액자에 고흐 밤 그림만 넣었어요.', likes:211, uses:77,
    g:{ mode:'frame', cats:['위로','용기'], look:{ fborder:'gold', fbg:'black', qfont:'hahmlet', lfont:'ebg', label:'line', qalign:'left', lalign:'left', clk:CK('serif', 'left', 80) }, arts:['starry','cafe','met437980','wheat','olive'] } },
  { id:'o4', who:3, date:'2026-10-27', title:'꽃 피는 화면', body:'모네·고흐 꽃 그림만. 감사 문장이랑 같이 보면 하루가 조금 부드러워져요.', likes:64, uses:18,
    g:{ mode:'frame', cats:['감사'], look:{ fborder:'white', fbg:'tint', qfont:'ridi', lfont:'playfair', label:'two', qalign:'center', lalign:'center', clk:CK('playfair', 'center', 84) }, arts:['wmmonbb5a9d','met436528','met436524','wmmon748789','met436534','met436525'] } },
  { id:'o5', who:4, date:'2026-10-25', title:'10월 25일', body:'마티스 색감이 좋아서 꽉 채우기로. 웃음 문장이 은근 웃겨요.', likes:57, uses:12,
    g:{ mode:'cover', cats:['웃음'], look:{ qfont:'song', lfont:'sans', label:'one', qalign:'left', lalign:'left', clk:CK('regular', 'left', 80) }, arts:['wmmatcd2116','wmmat87afa3','wmmatff80ca','matisse','wmmatec0a94','wmmat748122'] } },
  { id:'o6', who:5, date:'2026-10-20', title:'월요일 전용', body:'월요일엔 뭉크. 다들 이런 기분이잖아요?', likes:302, uses:120,
    g:{ mode:'fitw', cats:['웃음','용기'], look:{ fitc:'bottom', qfont:'chosun', lfont:'sans', label:'one', qalign:'left', lalign:'left', clk:CK('thin', 'center', 92) }, arts:byArtist('에드바르 뭉크', 8) } }
];
let POSTS = []; try { POSTS = JSON.parse(localStorage.getItem('hanpok.posts')) || []; } catch(e){}
function savePosts(){ try { localStorage.setItem('hanpok.posts', JSON.stringify(POSTS)); return true; } catch(e){ return false; } }
if (!S.postSeed) { // 처음 한 번: 예시 게시물 3개
  const snap = id => { const g = PF_GROUPS.find(x => x.id === id); return { mode:g.mode, cats:g.cats.slice(), look:JSON.parse(JSON.stringify(g.look)), arts:g.arts.slice() }; };
  POSTS = [
    { id:'m3', mine:true, date:'2026-11-01', title:'11월 1일', body:'요즘 쓰는 잠금화면. 마티스랑 칸딘스키를 섞었더니 화면 켤 때마다 기분이 좋아져요.', photo:null, likes:23, uses:5, g:snap('c4') },
    { id:'m2', mine:true, date:'2026-10-30', title:'10월 30일', body:'바다 그림만 모았어요. 가로 맞춤 강추.', photo:null, likes:41, uses:9, g:snap('c3') },
    { id:'m1', mine:true, date:'2026-10-28', title:'10월 28일', body:'', photo:null, likes:12, uses:2, g:snap('c1') }
  ];
  savePosts(); S.postSeed = 1; save();
}
// 한 번: 내가 올린 사진 정리 (사진 넣은 게시물·오늘의 한 장·내 사진 후보 모두 삭제)
if (S.photoWipe !== 1) {
  POSTS = POSTS.filter(p => !(p.mine && (p.photo || p.diary))); savePosts();
  const pics = MYPIC.map(p => p.id); MYPIC.length = 0; try { localStorage.removeItem('hanpok.pics'); } catch(e){}
  (S.groups || []).forEach(g => { if (g.arts) { g.arts = g.arts.filter(x => !pics.includes(x)); g.n = g.arts.length; if (pics.includes(g.art)) g.art = g.arts[0]; } });
  S.groups = (S.groups || []).filter(g => !g.arts || g.arts.length);
  if (S.activeG && !allGroups().some(g => g.id === S.activeG)) { S.activeG = null; if (S.base) Object.assign(S, S.base); S.base = null; }
  if (pics.includes(S.lockArt) || !A(S.lockArt)) S.lockArt = ART[0].id;
  S.photoWipe = 1; save();
}
const allPosts = () => [...POSTS, ...OTHER_POSTS];
const postById = id => allPosts().find(p => p.id === id);
const postWho = p => p.mine ? { nick:S.nick || '한폭러', av:S.lockArt } : PEOPLE[p.who];
function postGroup(p){ return { id:'p_' + p.id, t:p.title, mode:p.g.mode, cats:p.g.cats, look:p.g.look, arts:p.g.arts, art:p.g.arts[0], n:p.g.arts.length, m:[], mine:true }; }
const dLabel = iso => { const d = new Date(iso + 'T12:00:00'); return `${d.getMonth() + 1}월 ${d.getDate()}일`; };
// 다른 사람 게시물 → 내 바탕화면 그룹에 담고 바로 걸기 (내 게시물이면 그대로 걸기)
function usePost(id){
  const p = postById(id); if (!p) return;
  S.groups = S.groups || [];
  let g = S.groups.find(x => x.src === p.id);
  if (!g) { const who = postWho(p); g = Object.assign(postGroup(p), { id:'g' + Date.now().toString(36), t:p.mine ? p.title : `${who.nick}의 ${p.title}`, src:p.id, from:p.mine ? null : who.nick }); S.groups.unshift(g); if (!p.mine) { p.uses = (p.uses || 0) + 1; } }
  save(); applyGroup(g.id);
}
function postInUse(p){ const g = (S.groups || []).find(x => x.src === p.id); return !!g && S.activeG === g.id; }
function likePost(id){ const p = postById(id); if (!p) return; p.liked = !p.liked; p.likes = (p.likes || 0) + (p.liked ? 1 : -1); if (p.mine) savePosts(); rerender(); }
function postCover(p){ return p.photo || th(p.g.arts[0]); }
function postCell(p){ return `<button class="pf-post" onclick="go('post',{id:'${p.id}'})"><img src="${postCover(p)}" style="object-position:${p.photo ? '50% 50%' : (A(p.g.arts[0]) || {}).pos}" alt="${esc(p.title)}"><span class="pc-b">${ic(p.photo ? 'photo' : 'lock', 13)}</span></button>`; }
function feedCard(p, w = ''){ const who = postWho(p); return `<div class="fd-card ${w}" role="button" tabindex="0" onclick="go('post',{id:'${p.id}'})">${groupMini(postGroup(p), p.g.arts[0])}<div class="fd-who"><img src="${th(who.av)}" alt=""><b>${esc(who.nick)}</b></div><div class="fd-t">${esc(p.title)}</div><div class="fd-m">${ic('heartO', 12)}${p.likes} · ${p.uses}명이 쓰는 중</div></div>`; }
const miniFresh = () => { applyTints(); sizeMinis(); placeUnder(); fitQuotes(); };

SCR.post = { render: ({ id }) => {
  const p = postById(id); if (!p) return `${nav({ back:true })}<div class="body"></div>`;
  const who = postWho(p), g = postGroup(p), L = lookOf(g), use = postInUse(p);
  const look = (GN_LOOKS.find(l => l[0] === L.mode) || GN_LOOKS[0])[1];
  const slides = [...(p.photo ? [`<div class="gv-slide"><div class="mini pt-photo"><img src="${p.photo}" alt=""></div></div>`] : []), ...p.g.arts.slice(0, 8).map((x, k) => `<div class="gv-slide" onclick="showArt('${x}')">${groupMini(g, x, k)}</div>`)];
  return `${nav({ back:true, title:'게시물' })}<div class="body gv pt">
  <div class="pt-head"><img src="${th(who.av)}" alt=""><div><b>${esc(who.nick)}</b><span>${dLabel(p.date)}</span></div></div>
  <div class="gv-rail" onscroll="gvScroll(this)">${slides.join('')}</div>
  <div class="gv-dots">${slides.map((x, k) => `<i class="${k === 0 ? 'on' : ''}"></i>`).join('')}</div>
  <div class="pt-acts"><button class="${p.liked ? 'on' : ''}" onclick="likePost('${p.id}')">${ic(p.liked ? 'heart' : 'heartO', 24)}<span>${p.likes || 0}</span></button><span class="pt-use">${ic('lock', 14)}${p.uses || 0}명이 바탕화면으로 쓰는 중</span></div>
  <div class="pt-txt"><h3>${esc(p.title)}</h3>${p.body ? `<p>${esc(p.body)}</p>` : ''}
    <div class="pt-meta">그림 ${p.g.arts.length}점 · ${look} · ${(L.cats || []).join(' · ')}</div></div><div class="pb"></div></div>
  ${cta(`<button class="btn" ${use ? 'disabled' : ''} onclick="usePost('${p.id}')">${use ? `${ic('check', 18)}지금 잠금화면에 걸려 있어요` : p.mine ? '잠금화면에 걸기' : '내 바탕화면으로 쓰기'}</button>`)}`; },
  after: () => { statusLight(false); miniFresh(); } };

SCR.feed = { render: () => `${nav({ back:true, title:'모두의 잠금화면' })}<div class="body">
  ${hd('모두의 잠금화면', '마음에 드는 잠금화면을 골라 내 바탕화면으로 바로 쓸 수 있어요.')}
  <div class="fd-grid">${OTHER_POSTS.map(p => feedCard(p)).join('')}</div><div class="pb"></div></div>`,
  after: () => { statusLight(false); miniFresh(); } };

// 새 게시물: 어떤 잠금화면 → 사진(선택) → 제목(기본: 오늘 날짜) · 본문
let pn = null;
function pnStart(){ const d = now(); pn = { gid:S.activeG || 'base', photo:null, title:`${d.getMonth() + 1}월 ${d.getDate()}일`, body:'' }; go('postNew'); }
function readImg(file, cb){ const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 1280 / Math.max(im.width, im.height)), cv = document.createElement('canvas'); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); cb(cv.toDataURL('image/jpeg', .8)); }; im.onerror = () => cb(null); im.src = r.result; }; r.readAsDataURL(file); }
function pnPhoto(inp){ const f = inp.files && inp.files[0]; inp.value = ''; if (!f) return; readImg(f, d => { if (d) { pn.photo = d; rerender(); } }); }
SCR.postNew = { render: () => {
  const cards = pfCards();
  return `${nav({ back:true, title:'새 게시물' })}<div class="body pn">
  <div class="pn-h">어떤 잠금화면을 올릴까요?</div>
  <div class="pn-rail">${cards.map(g => `<div class="pn-g ${pn.gid === g.id ? 'on' : ''}" role="button" tabindex="0" onclick="pn.gid='${g.id}';rerender()">${groupMini(g, g.art)}<span>${esc(g.t)}</span></div>`).join('')}</div>
  <div class="pn-h">사진 <small>선택</small></div>
  <div class="pn-ph">${pn.photo ? `<div class="pn-img"><img src="${pn.photo}" alt=""><button onclick="pn.photo=null;rerender()" aria-label="사진 빼기">${ic('x', 16)}</button></div>` : `<label class="gn-add">${ic('plus', 24)}<span>사진 추가</span><input type="file" accept="image/*" onchange="pnPhoto(this)"></label>`}<p>이 잠금화면을 쓰는 모습이나, 그날의 사진을 같이 올려 보세요.</p></div>
  <div class="pn-h">제목</div>
  <div class="gn-in"><input class="nick-in" maxlength="24" value="${esc(pn.title)}" oninput="pn.title=this.value;document.getElementById('pnGo').disabled=!this.value.trim()" placeholder="제목"></div>
  <div class="pn-h">본문 <small>선택</small></div>
  <div class="gn-in"><textarea class="nick-in pn-body" maxlength="300" placeholder="이 잠금화면에 대해 한마디 남겨 주세요" oninput="pn.body=this.value">${esc(pn.body)}</textarea></div><div class="pb"></div></div>
  ${cta(`<button class="btn" id="pnGo" ${pn.title.trim() ? '' : 'disabled'} onclick="pnPost()">올리기</button>`)}`; },
  after: () => { statusLight(false); miniFresh(); } };
function pnPost(){
  const g = groupById(pn.gid) || baseGroup(), L = lookOf(g), d = now();
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const arts = g.base ? ART.map(a => a.id) : (g.arts || [g.art]).filter(x => A(x) && !(A(x) || {}).mine);
  const look = JSON.parse(JSON.stringify(L)); const mode = look.mode, cats = look.cats; delete look.mode; delete look.cats;
  const p = { id:'m' + Date.now().toString(36), mine:true, date:iso, title:pn.title.trim(), body:pn.body.trim(), photo:pn.photo, likes:0, uses:0, g:{ mode, cats, look, arts:arts.length ? arts : [S.lockArt] } };
  POSTS.unshift(p);
  if (!savePosts()) { POSTS.shift(); p.photo = null; POSTS.unshift(p); savePosts(); toast('저장 공간이 부족해서 사진 없이 올렸어요', 'infoCircle'); }
  pn = null; S.pfTab = 'post'; save();
  setRoot('me', {}, null); go('post', { id:p.id }); setTimeout(() => toast('게시물을 올렸어요'), 250);
}
SCR.settings = { render: () => {
  const a = A(S.lockArt), sen = sentenceFor(a);
  return `${nav({ back:true, title:'설정' })}<div class="body">
  ${lh('잠금화면')}
  <div class="row" onclick="S.lockOn=!S.lockOn;save();rerender()"><div class="tx"><div class="t">잠금화면에 명화 띄우기</div><div class="sub">${S.lockOn ? '화면을 켤 때마다 그림과 문장이 나와요' : '지금은 꺼져 있어요'}</div></div>${sw(S.lockOn, 'S.lockOn=!S.lockOn;save();rerender()')}</div>
  <button class="row" onclick="modeSheet()"><div class="tx"><div class="t">그림 보기 방식</div></div><span class="v">${MODE_L[S.mode]}${ic('chevR', 18)}</span></button>
  <button class="row" onclick="unlockSheet()"><div class="tx"><div class="t">잠금 해제 방식</div><div class="sub">문장을 따라 하면 더 오래 기억에 남아요</div></div><span class="v">${UNL_L[S.unlockBy]}${ic('chevR', 18)}</span></button>
  <button class="row" onclick="changeSheet()"><div class="tx"><div class="t">그림이 바뀌는 때</div></div><span class="v">${CHG_L[S.change || S.when]}${ic('chevR', 18)}</span></button>
  <div class="row" onclick="S.big=!S.big;save();rerender()"><div class="tx"><div class="t">문장 크게 보기</div><div class="sub">잠금화면 문장을 더 큰 글씨로 보여 줘요</div></div>${sw(S.big, 'S.big=!S.big;save();rerender()')}</div>
  ${window.HP && HP.notiAccess ? (() => { const on = HP.notiAccess(); return `<button class="row" onclick="HP.openNotiAccess()"><div class="tx"><div class="t">잠금화면에 내 알림 보여 주기</div><div class="sub">${on ? '카톡·문자 같은 실제 알림이 시계 아래에 떠요' : '휴대폰 설정에서 「알림 접근」을 허용하면 실제 알림이 떠요'}</div></div><span class="v">${on ? '켜짐' : '허용하기'}${ic('chevR', 18)}</span></button>
  ${on ? '' : `<button class="row" onclick="HP.openAppInfo()"><div class="tx"><div class="t">허용 버튼이 회색이면</div><div class="sub">앱 정보 → 오른쪽 위 ⋮ → 「제한된 설정 허용」을 먼저 켜 주세요</div></div><span class="v">${ic('chevR', 18)}</span></button>`}`; })() : ''}
  <div class="divider" style="margin-top:12px"></div>
  ${lh('다정한 알람')}
  ${[['a8','오전 8:00','출근길에 한 문장'],['a13','오후 1:00','점심 먹고 한숨 돌릴 때'],['a22','오후 10:00','잠들기 전 하루 마무리']].map(([k, t, d]) => `<div class="row" onclick="S.alarms.${k}=!S.alarms.${k};save();rerender()"><div class="tx"><div class="t">${t}</div><div class="sub">${d}</div></div>${sw(S.alarms[k], `S.alarms.${k}=!S.alarms.${k};save();rerender()`)}</div>`).join('')}
  <div class="row" onclick="S.teaser=!S.teaser;save();rerender()"><div class="tx"><div class="t">궁금하게 잘라서 보여 주기</div><div class="sub">알림에는 문장의 앞부분만 보여 줘요</div></div>${sw(S.teaser, 'S.teaser=!S.teaser;save();rerender()')}</div>
  <div class="notiprev">${appIcon('ai')}<div style="flex:1;min-width:0"><div class="nh"><span>한 폭 · 다정한 알람</span><span>오후 10:00</span></div><div class="nb">${esc(teaser(a, sen))}</div></div></div>
  <div class="divider" style="margin-top:16px"></div>
  ${lh('정보')}
  <button class="row" onclick="go('credits')"><div class="tx"><div class="t">그림 출처와 저작권</div></div><span class="v">${ic('chevR', 18)}</span></button>
  <button class="row" onclick="restart()"><div class="tx"><div class="t">처음 화면 다시 보기</div><div class="sub">온보딩부터 다시 시작해요</div></div><span class="v">${ic('chevR', 18)}</span></button>
  <div class="row" style="cursor:default"><div class="tx"><div class="t">버전</div></div><span class="v">0.1 프로토타입</span></div>
  <div class="pb"></div></div>`; },
  after: () => statusLight(lockOpen()) };
function modeSheet(){
  const a = A(S.lockArt);
  openSheet(`<div class="shd"><h3>그림 보기 방식</h3><p>잠금화면에서 그림을 어떻게 보여 줄지 골라요.</p></div>
  <div class="modepv">
    <button class="${S.mode === 'cover' ? 'on' : ''}" onclick="S.mode='cover';save();closeSheet();rerender();toast('꽉 채우기로 바꿨어요')"><div class="pv"><img class="full" src="${th(a.id)}" style="object-position:${a.pos}" alt=""></div>꽉 채우기</button>
    <button class="${S.mode === 'frame' ? 'on' : ''}" onclick="S.mode='frame';save();closeSheet();rerender();toast('액자형으로 바꿨어요')"><div class="pv"><img class="blur" src="${th(a.id)}" alt=""><img class="fr" src="${th(a.id)}" alt=""></div>액자형</button>
  </div>
  ${cta(`<button class="btn sec" onclick="closeSheet();showLock(false)">잠금화면에서 확인하기</button>`)}`);
}
function pickSheet(title, desc, opts, cur, fn){
  openSheet(`<div class="shd"><h3>${title}</h3>${desc ? `<p>${desc}</p>` : ''}</div>
  <div class="choices" style="padding-bottom:4px">${opts.map(([k, e, t, d]) => `<button class="choice ${cur === k ? 'on' : ''}" onclick="${fn}('${k}')"><span class="em">${e}</span><div><div class="t">${t}</div><div class="d">${d}</div></div><span class="ck">${ic('circleCheck', 26)}</span></button>`).join('')}</div>
  ${cta('')}`);
}
function unlockSheet(){ pickSheet('잠금 해제 방식', '문장을 한 번 더 마주치게 하는 장치예요.', [['swipe','👆','밀어서 열기','가장 빠르게 열어요'],['type','✍️','따라 쓰고 열기','문장을 직접 써야 열려요'],['voice','🗣️','소리 내어 읽고 열기','소리 내어 읽으면 열려요']], S.unlockBy, 'setUnlock'); }
function setUnlock(k){ S.unlockBy = k; save(); closeSheet(); rerender(); toast(UNL_L[k] + '로 바꿨어요'); }
function changeSheet(){ pickSheet('그림이 바뀌는 때', '', [['every','📱','휴대폰을 켤 때마다','매번 새로운 한 폭'],['daily','🌅','하루에 한 번','아침마다 오늘의 한 폭']], S.change || S.when, 'setChange'); }
function setChange(k){ S.change = k; S.when = k; save(); closeSheet(); rerender(); toast(CHG_L[k] + ' 바뀌어요'); }
function restart(){ const keep = { }; S = Object.assign(JSON.parse(JSON.stringify(DEF)), keep); save(); galFilter = 'all'; senSeg = 'all'; $('#lockLayer').innerHTML = ''; setRoot('welcome'); }


/* ===================== 작가 상세 ===================== */
let artSort = 'old';
const SORT_L = { old:'오래된 작품순', new:'최근 작품순', seen:'만난 그림 먼저', saved:'저장한 그림 먼저' };
const yearOf = a => parseInt(String(a.y).match(/\d{4}/)[0], 10);
function sortWorks(list){
  const byYear = (x, y) => yearOf(x) - yearOf(y);
  const l = list.slice().sort(byYear);
  if (artSort === 'new') l.reverse();
  if (artSort === 'seen') l.sort((x, y) => (S.seen.includes(y.id) - S.seen.includes(x.id)) || byYear(x, y));
  if (artSort === 'saved') l.sort((x, y) => (S.saved.includes(y.id) - S.saved.includes(x.id)) || (S.seen.includes(y.id) - S.seen.includes(x.id)) || byYear(x, y));
  return l;
}
function sortSheet(){
  openSheet(`<div class="shd"><h3>정렬</h3></div>
  <div style="padding-bottom:calc(16px + var(--sab))">${Object.entries(SORT_L).map(([k, l]) => `<button class="row" onclick="artSort='${k}';closeSheet();rerender()"><div class="tx"><div class="t" style="${artSort === k ? 'font-weight:700;color:var(--g900)' : ''}">${l}</div></div>${artSort === k ? `<span style="color:var(--g900);display:flex">${ic('check', 22)}</span>` : ''}</button>`).join('')}</div>`);
}

SCR.artist = { render: ({ name }) => {
  const p = ARTISTS[name], works = sortWorks(ART.filter(x => x.a === name));
  return `${nav({ back:true })}<div class="body">
    ${hd(esc(name), `${esc(p.en)}<br>${esc(p.nat)} · ${esc(p.life)}`)}
    <div class="story">${p.bio.map(t => `<p>${esc(t)}</p>`).join('')}</div>
    ${lh(`작품 ${works.length}점`, SORT_L[artSort], 'sortSheet()')}
    <div class="grid">${works.map(gcardHtml).join('')}</div>
    <div class="pb"></div></div>`; },
  after: () => statusLight(false) };

SCR.credits = { render: () => `${nav({ back:true, title:'그림 출처와 저작권' })}<div class="body">
  ${hd('모든 그림은<br>퍼블릭 도메인이에요', '저작권 보호 기간이 끝난 작품만 써요. 프로토타입에는 화면용 사본을 넣었어요.', 'm')}
  ${ART.map(a => `<button class="row" onclick="go('art',{id:'${a.id}'})"><img class="thumb" loading="lazy" decoding="async" src="${th(a.id)}" style="object-position:${a.pos}" alt=""><div class="tx"><div class="t">${esc(a.t)}</div><div class="sub">${esc(a.a)} · ${esc(a.y)}</div></div><span class="badge">PD</span></button>`).join('')}
  <div class="divider" style="margin-top:12px"></div>
  ${lh('글꼴과 아이콘')}
  <div class="row"><div class="tx"><div class="t">Pretendard</div><div class="sub">SIL Open Font License 1.1</div></div></div>
  <div class="row"><div class="tx"><div class="t">Noto Serif KR</div><div class="sub">SIL Open Font License 1.1</div></div></div>
  <div class="row"><div class="tx"><div class="t">Tabler Icons</div><div class="sub">MIT License</div></div></div>
  <div class="pb"></div></div>`, after: () => statusLight(false) };

/* ===================== 뒤로가기 (Android) ===================== */
window.__back = function(){
  if ($('#dlg').classList.contains('show')) { closeDlg(); return 'y'; }
  if ($('#viewer').classList.contains('show')) { closeViewer(); return 'y'; }
  if (sheetOpen()) { closeSheet(); return 'y'; }
  if (lockOpen()) { if (lockState && lockState.panel) { lockState.panel = null; renderLock(); } return 'y'; }
  if (back()) return 'y';
  const top = stack[stack.length - 1];
  if (top && SCR[top.name].tab && top.name !== 'home') { setRoot('home', {}, null); return 'y'; }
  return 'n';
};
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.__back(); });

/* ===================== 시작 ===================== */
tickClock();
if (LOCKMODE) { // 실제 잠금화면: 잠금 화면만 보여요
  if (!S.onboarded || !S.lockOn) { try { HP.unlock(); } catch(e){} }
  else { setRoot('home', {}, null); showLock(false); }
  // 화면을 켤 때마다(안드로이드가 호출): 앱에서 바꾼 설정을 다시 읽고 새 그림으로
  window.__wake = () => { S = loadS(); try { if (!S.onboarded || !S.lockOn) return HP.unlock(); showLock(S.change !== 'daily'); } catch(e){} };
} else if (!S.onboarded) setRoot('welcome', {}, null);
else { setRoot('home', {}, null); if (S.lockOn) { S.lockArt = S.change === 'daily' ? S.lockArt : nextArtId(); showLock(false); } }
syncLock();
