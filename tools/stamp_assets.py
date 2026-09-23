"""Stamp every local stylesheet, script and drawing a page links to with a
hash of that file's contents: href="_ds/site.css?v=3f9a1c2e".

GitHub Pages lets browsers cache CSS and JS for ten minutes. Without a
stamp, a visitor can get a new page with the old stylesheet and see the
layout fall apart. With it, a changed file always has a new URL.

Run from the repo root; the pre-commit hook (tools/install-hooks.sh) runs
it on every commit."""
import hashlib, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = re.compile(r'((?:href|src|data-atlas-src)=")([^"#?:]+\.(?:css|js|svg))(?:\?v=[0-9a-f]+)?(")')

def stamp(page):
    base = os.path.dirname(page)
    s = open(page, encoding='utf-8').read()
    def sub(m):
        target = os.path.normpath(os.path.join(base, m.group(2)))
        if not os.path.isfile(target):
            return m.group(0)
        h = hashlib.md5(open(target, 'rb').read()).hexdigest()[:8]
        return f'{m.group(1)}{m.group(2)}?v={h}{m.group(3)}'
    out = REF.sub(sub, s)
    if out != s:
        open(page, 'w', encoding='utf-8').write(out)
        return True
    return False

changed = []
for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
    for f in files:
        if f == 'index.html':
            p = os.path.join(dirpath, f)
            if stamp(p): changed.append(os.path.relpath(p, ROOT))
print('\n'.join(changed) if changed else 'all stamps current')
