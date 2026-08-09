# puedesleerlo.github.io

Personal site for Mario Alejandro Tabares Arango — AI/ML engineer.

Single self-contained `index.html`: no build step, no framework, no dependencies
beyond three Google Fonts. Edit, commit, push; GitHub Pages redeploys.

## Structure

```
index.html                              the whole site
assets/Mario_Alejandro_Tabares_Arango_CV.pdf   linked from the hero and contact block
```

## The through-line

The site is organised around one argument, not around a job history: *how should a
decision be made when the evidence cannot settle it?* The **The question** section
(`#story`) is a five-movement essay — physics, philosophy, risk, governance, and
what remains unresolved. Everything else on the page is evidence for it:

- the hero states the question
- each Experience entry opens with a `.frame` line tying the role back to a movement
- Selected work reports what each system was *measured against*, not just what it did
- Education is presented as three chapters chosen in a deliberate order

If you edit one part, keep the argument consistent across the others.

## Design

Conventional single-column layout optimised for a fast scan: hero with headline
metrics → the question (essay) → experience → selected work → skills → education →
research, teaching and awards → contact.

- **Headings** Source Serif 4
- **Body and UI** Inter
- **Dates, labels, tags** JetBrains Mono
- Accent is a deep teal (`--accent`), with a burnt-orange secondary (`--accent-2`)
  used only for card category labels.

## Bilingual

English is primary. Every translatable node carries `data-en` and `data-es`
attributes; a small script swaps `innerHTML` and updates `<html lang>`.

To edit copy, change **both** the `data-en` and `data-es` attributes. The visible
text inside the element is the English fallback for users without JavaScript —
keep it in sync with `data-en`.

```html
<h2 data-en="Experience" data-es="Experiencia">Experience</h2>
```

Language choice persists in `localStorage` under `site-lang`. On first visit the
site defaults to Spanish if the browser locale starts with `es`, English otherwise.

## Theme

Light by default, dark available via the `◐` button, respecting
`prefers-color-scheme` on first visit. Persisted as `site-theme`. All colours are
CSS custom properties in `:root` / `:root[data-theme="dark"]`.

## Content accuracy

Every claim on the page is drawn from the CV in `assets/`. When the CV changes,
update the PDF and the corresponding section here — the two should never disagree.

Live figures currently on the page: 230+ credit-risk models, 8 audit cycles with
zero material findings, USD 14B credit exposure across four countries, 2.5M+
residents, 65,000+ individuals protected by the PII pipeline, 34 historical data
standards, 96-question agent benchmark.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
