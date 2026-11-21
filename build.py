#!/usr/bin/env python3
"""한 폭 프로토타입 빌드: 이미지·폰트·아이콘을 한 HTML 파일에 넣는다."""
import base64, io, json, os, re, sys
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools import subset as ftsub

ROOT = os.path.dirname(os.path.abspath(__file__))
SCR = '/tmp/claude-0/-home-claude/1514ea50-a93b-5b3f-bfd3-84db2bd957cb/scratchpad'
ART_DIR = f'{SCR}/art'
PKG = f'{SCR}/pkgs'
TAB = f'{PKG}/icons-3.50.0/package/icons'
PRET = f'{PKG}/pretendard-1.3.9/package/dist/public/variable/PretendardVariable.ttf'
NOTO = f'{PKG}/noto-serif-kr-27.0.0/package'

src = lambda f: open(os.path.join(ROOT, 'src', f), encoding='utf-8').read()
html, appjs, data = src('app.html'), src('app.js'), src('data.js')

# ---------- icons ----------
ICON_MAP = {
  'home':'filled/home', 'photo':'filled/photo', 'quote':'filled/quote', 'user':'filled/user',
  'heart':'filled/heart', 'lock':'filled/lock', 'circleCheck':'filled/circle-check', 'microphone':'filled/microphone',
  'pencil':'filled/pencil', 'infoCircle':'filled/info-circle', 'download':'filled/download', 'instagram':'filled/brand-instagram',
  'copy':'filled/copy', 'send':'filled/send', 'palette':'filled/palette', 'move':'outline/arrows-move', 'eye':'outline/eye', 'eyeOff':'outline/eye-off',
  'heartO':'outline/heart', 'check':'outline/check', 'chevL':'outline/chevron-left', 'chevR':'outline/chevron-right',
  'chevU':'outline/chevron-up', 'x':'outline/x', 'refresh':'outline/refresh', 'undo':'outline/arrow-back-up', 'redo':'outline/arrow-forward-up', 'plus':'outline/plus', 'cards':'outline/cards', 'photoO':'outline/photo', 'menu':'outline/menu-2', 'grid':'outline/layout-grid', 'usersG':'outline/users-group', 'alL':'outline/align-left', 'alC':'outline/align-center', 'alR':'outline/align-right', 'share':'outline/share', 'camera':'filled/camera', 'flame':'filled/flame',
}
icons = {}
for k, p in ICON_MAP.items():
    s = open(f'{TAB}/{p}.svg').read()
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    s = re.sub(r'\s(class|width|height)="[^"]*"', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    if p.startswith('outline'):
        s = s.replace('stroke-width="2"', 'stroke-width="2.2"')
    icons[k] = s
icons_js = 'const ICONS=' + json.dumps(icons, ensure_ascii=False) + ';'

# ---------- images ----------
def b64(path_or_bytes, mime='image/jpeg'):
    b = path_or_bytes if isinstance(path_or_bytes, bytes) else open(path_or_bytes, 'rb').read()
    return f'data:{mime};base64,' + base64.b64encode(b).decode()
IDS = re.findall(r"\{ id:'(\w+)'", data)
imgs, thumbs = {}, {}
def enc(im, q):
    bio = io.BytesIO(); im.save(bio, 'JPEG', quality=q, optimize=True, progressive=True); return bio.getvalue()
WEB = os.environ.get('WEB')  # 링크 공유용: 그림은 img/ 폴더의 파일로 (페이지 16MB 제한 때문)
WEBDIR = os.path.join(ROOT, 'dist', 'web')
if WEB: os.makedirs(os.path.join(WEBDIR, 'img'), exist_ok=True)
for i in IDS:
    p = f'{ART_DIR}/{i}.jpg'
    im = Image.open(p).convert('RGB')
    if WEB:
        if i.startswith(('met', 'wm')):
            open(f'{WEBDIR}/img/{i}.jpg', 'wb').write(open(p, 'rb').read())
        else:
            big = im.copy(); big.thumbnail((1100, 1100), Image.LANCZOS); open(f'{WEBDIR}/img/{i}.jpg', 'wb').write(enc(big, 80))
            im.thumbnail((480, 480), Image.LANCZOS); open(f'{WEBDIR}/img/th_{i}.jpg', 'wb').write(enc(im, 78)); thumbs[i] = f'img/th_{i}.jpg'
        imgs[i] = f'img/{i}.jpg'
        continue
    if i.startswith(('met', 'wm')):
        # 이미 800px로 줄여 둔 사본. 미리보기용 HTML은 더 가볍게 (LITE=1)
        if os.environ.get('LITE'):
            im.thumbnail((680, 680), Image.LANCZOS); imgs[i] = b64(enc(im, 64))
        else:
            imgs[i] = b64(p)
        continue
    big = im.copy(); big.thumbnail((1100, 1100), Image.LANCZOS); imgs[i] = b64(enc(big, 78))
    im.thumbnail((480, 480), Image.LANCZOS); thumbs[i] = b64(enc(im, 78))
# base64 -> blob URL at runtime (가벼운 DOM)
img_js = 'const IMG=' + json.dumps(imgs) + ';const TH=' + json.dumps(thumbs) + ';'

# ---------- fonts ----------
alltext = html + appjs + data
chars = set(alltext)
ksx = set()
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try: ksx.add(bytes([hi, lo]).decode('euc-kr'))
        except Exception: pass
ascii_ = {chr(c) for c in range(0x20, 0x7F)}
extra = set('…·“”‘’—–→←↑↓°%₩×①②③④⑤')
sans_chars = {c for c in (chars | ksx | ascii_ | extra) if ord(c) >= 0x20}

def subset_font(path_or_font, codepoints, flavor='woff2', keep_var=True):
    f = TTFont(path_or_font) if isinstance(path_or_font, str) else path_or_font
    opt = ftsub.Options(); opt.flavor = flavor; opt.layout_features = ['*']; opt.name_IDs = ['*']; opt.notdef_outline = True
    sub = ftsub.Subsetter(opt); sub.populate(unicodes=codepoints); sub.subset(f)
    bio = io.BytesIO(); f.flavor = flavor; f.save(bio); return bio.getvalue()

pret = subset_font(PRET, [ord(c) for c in sans_chars])
font_css = ("@font-face{font-family:'Pretendard';font-weight:100 900;font-style:normal;font-display:block;"
            f"src:url({b64(pret, 'font/woff2')}) format('woff2')}}\n")

# serif: 문장·제목에 쓰는 글자만 (데이터 + 화면 고정 문구)
serif_text = data + '한 폭휴대폰을 켤 때마다명화 문장 줄예) 오늘도 나답게, 천천히.0123456789' + ''.join(ascii_)
serif_cps = {ord(c) for c in serif_text if ord(c) >= 0x20}
def parse_ranges(r):
    out = set()
    for part in r.split(','):
        part = part.strip().replace('U+', '').replace('u+', '')
        if '-' in part:
            a, b = part.split('-'); out.update(range(int(a, 16), int(b, 16) + 1))
        elif part:
            out.add(int(part, 16))
    return out
total_serif = 0
for wname, w in [('medium', 500), ('semi_bold', 600), ('bold', 700)]:
    css = open(f'{NOTO}/noto_serif_kr_{wname}/css.css').read()
    for m in re.finditer(r'src:\s*url\(([^)]+)\)[^;]*;\s*unicode-range:\s*([^;]+);', css):
        fn, rng = m.group(1), parse_ranges(m.group(2))
        need = sorted(serif_cps & rng)
        if not need: continue
        try:
            woff = subset_font(f'{NOTO}/noto_serif_kr_{wname}/{fn}', need)
        except Exception as e:
            print('skip', fn, e); continue
        total_serif += len(woff)
        ur = ','.join(f'U+{c:X}' for c in need)
        font_css += (f"@font-face{{font-family:'HPSerif';font-weight:{w};font-style:normal;font-display:block;"
                     f"src:url({b64(woff, 'font/woff2')}) format('woff2');unicode-range:{ur}}}\n")

# ---------- 바꿔 쓸 수 있는 문장 폰트 (한글 명조·부리) + 작품 정보용 영문 세리프 ----------
FP = f'{SCR}/fontpkgs'
CACHE = f'{SCR}/fontcache'; os.makedirs(CACHE, exist_ok=True)
import hashlib
def cached_subset(path, cps, flavor='woff2'):
    key = hashlib.md5((path + str(sorted(cps))).encode()).hexdigest()
    cp = f'{CACHE}/{key}.{flavor}'
    if os.path.exists(cp): return open(cp, 'rb').read()
    b = subset_font(path, cps, flavor); open(cp, 'wb').write(b); return b
q_text = data + html + appjs + ''.join(ascii_) + ''.join(extra)
q_cps = {ord(c) for c in q_text if ord(c) >= 0x20}
# (key, family, 파일 또는 fontsource 폴더, weight)  — 한 굵기만 넣고 font-weight 100~900 전체에 대응
QF = [
  ('maru',    'HPF-maru',    f'{FP}/_kfonts_maruburi/package/src/MaruBuri-SemiBold.ttf', None),
  ('nanum',   'HPF-nanum',   f'{FP}/_fontsource_nanum-myeongjo/package', 700),
  ('gowun',   'HPF-gowun',   f'{FP}/_fontsource_gowun-batang/package', 700),
  ('hahmlet', 'HPF-hahmlet', f'{FP}/_fontsource_hahmlet/package', 600),
  ('song',    'HPF-song',    f'{FP}/_fontsource_song-myung/package', 400),
  ('iropke',  'HPF-iropke',  f'{FP}/_noonnu_iropke-batang/package/fonts/iropke-batang-400.ttf', None),
  ('kopub',   'HPF-kopub',   f'{FP}/_noonnu_ko-pub-batang/package/fonts/kopub-batang-400.ttf', None),
  ('ridi',    'HPF-ridi',    f'{FP}/_kfonts_ridi-batang/package/src/RIDIBatang.otf', None),
  ('chosun',  'HPF-chosun',  f'{FP}/_noonnu_chosunilbo-myungjo/package/fonts/chosunilbomyungjo-normal.woff', None),
  ('jeju',    'HPF-jeju',    f'{FP}/_noonnu_jeju-myeongjo/package/fonts/jeju-myeongjo-400.ttf', None),
]
def fs_chunks(pkg, w, style='normal', only=None):
    css = open(f'{pkg}/{w}{"-italic" if style == "italic" else ""}.css').read()
    for m in re.finditer(r'src:\s*url\(([^)]+\.woff2)\)[^;]*;[^}]*?unicode-range:\s*([^;}]+)', css):
        fn = m.group(1).replace('./', '')
        if only and not any(o in fn for o in only): continue
        yield f'{pkg}/{fn}', parse_ranges(m.group(2))
total_q = 0
for key, fam, path, w in QF:
    if not os.path.exists(path): print('font missing', key, path); continue
    if os.path.isdir(path):
        for fp, rng in fs_chunks(path, w):
            need = sorted(q_cps & rng)
            if not need: continue
            b = cached_subset(fp, need); total_q += len(b)
            font_css += (f"@font-face{{font-family:'{fam}';font-weight:100 900;font-style:normal;font-display:block;"
                         f"src:url({b64(b, 'font/woff2')}) format('woff2');unicode-range:{','.join(f'U+{c:X}' for c in need)}}}\n")
    else:
        b = cached_subset(path, sorted(q_cps)); total_q += len(b)
        font_css += (f"@font-face{{font-family:'{fam}';font-weight:100 900;font-style:normal;font-display:block;"
                     f"src:url({b64(b, 'font/woff2')}) format('woff2')}}\n")
# 영문 세리프: 원제(이탤릭)와 숫자·로마자만
lat_cps = {ord(c) for c in q_text if ord(c) < 0x250 and ord(c) >= 0x20}
LF = [('cormorant', 'HPL-cormorant', f'{FP}/_fontsource_cormorant-garamond/package', 500),
      ('ebg',       'HPL-ebg',       f'{FP}/_fontsource_eb-garamond/package', 400),
      ('playfair',  'HPL-playfair',  f'{FP}/_fontsource_playfair-display/package', 400),
      ('caslon',    'HPL-caslon',    f'{FP}/_fontsource_libre-caslon-text/package', 400)]
for key, fam, pkg, w in LF:
    for style in ('normal', 'italic'):
        try: chunks = list(fs_chunks(pkg, w, style, only=('latin-',)))
        except FileNotFoundError: print('no', key, style); continue
        for fp, rng in chunks:
            need = sorted(lat_cps & rng)
            if not need: continue
            b = cached_subset(fp, need); total_q += len(b)
            font_css += (f"@font-face{{font-family:'{fam}';font-weight:100 900;font-style:{style};font-display:block;"
                         f"src:url({b64(b, 'font/woff2')}) format('woff2');unicode-range:{','.join(f'U+{c:X}' for c in need)}}}\n")
print(f'extra fonts {total_q//1024}KB')

# ---------- status bar icons ----------
sb_icons = ('<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>'
            '<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.3-1.4C13.4 1.6 10.8.5 8 .5S2.6 1.6.7 3.5L2 4.9c1.6-1.5 3.7-2.4 6-2.4zm0 3.7c1.3 0 2.5.5 3.4 1.3l1.3-1.4C11.5 5 9.8 4.2 8 4.2S4.5 5 3.3 6.1l1.3 1.4C5.5 6.7 6.7 6.2 8 6.2zM8 9.6l2-2.1C9.5 7 8.8 6.8 8 6.8s-1.5.2-2 .7l2 2.1z"/></svg>'
            '<svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor"/><rect x="23.6" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".45"/></svg>')

out = (html.replace('/*FONTS*/', font_css)
           .replace('/*SBICONS*/', sb_icons)
           .replace('/*ICONS*/', icons_js)
           .replace('/*IMAGES*/', img_js)
           .replace('/*DATA*/', data)
           .replace('/*APPJS*/', appjs))
if WEB:
    # 아티팩트는 문서 뼈대(doctype·html·head·body)를 자동으로 씌우므로 내용만 남김
    w = out
    w = re.sub(r'<!doctype html>\s*', '', w, flags=re.I)
    w = re.sub(r'<html[^>]*>\s*|</html>\s*|<head>\s*|</head>\s*|<body>\s*|</body>\s*', '', w)
    w = re.sub(r'<meta charset="utf-8">\s*|<meta name="viewport"[^>]*>\s*', '', w)
    w = w.replace('<title>한 폭 프로토타입</title>', '<title>한 폭</title>')
    w = w.replace('<title>한 폭</title>', '<title>한 폭</title>\n<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">', 1)
    open(os.path.join(WEBDIR, 'index.html'), 'w', encoding='utf-8').write(w)
    print(f'web html {len(w.encode())//1024}KB, imgs {len(imgs)} -> {WEBDIR}')
    sys.exit(0)
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
dst = os.path.join(ROOT, 'dist', 'hanpok-prototype-lite.html' if os.environ.get('LITE') else 'hanpok-prototype.html')
open(dst, 'w', encoding='utf-8').write(out)
print(f'pretendard {len(pret)//1024}KB, serif {total_serif//1024}KB, html {len(out.encode())//1024}KB -> {dst}')
