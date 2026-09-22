# puedesleerlo.github.io

Personal site for Mario Alejandro Tabares Arango — AI/ML engineer.

Static HTML: no build step, no framework. Edit, commit, push; GitHub Pages
redeploys. The design system arrives as a prebuilt copy in `_ds/cosmografia/`.

## Structure

```
index.html                              the whole site
assets/Mario_Alejandro_Tabares_Arango_CV.pdf   linked from the hero and contact block
```

## The through-line

The site is organized around one argument, not around a job history: *how should a
decision be made when the evidence cannot settle it?* The **The question** section
(`#story`) is a five-movement essay — physics, philosophy, risk, governance, and
what remains unresolved. Everything else on the page is evidence for it:

- the hero states the question
- each Experience entry opens with a `.frame` line tying the role back to a movement
- Selected work reports what each system was *measured against*, not just what it did
- Education is presented as three chapters chosen in a deliberate order

If you edit one part, keep the argument consistent across the others.

## The ask

The page has one concrete request: **a Summer 2027 internship** as a CMU MS
student (graduating Dec 2027). It appears in three places, which must stay in
agreement — the `.availability` badge in the hero, the closing paragraph of
movement V, and the Contact section intro (plus the two `<meta>` descriptions).
When the target term changes, update all five.

## Design

Built on **[Cosmografía](https://github.com/puedesleerlo/cosmografia)**, the
author's design system: a white atlas sheet, a post-apocalyptic organic world
drawn on it, and one loud sky. The page reads as an atlas — a frontispiece, then
numbered plates (`Plate I…` / `Lám. I…`) in the rail beside each section.

- **Three inks.** Black (`--ink`) for structure, ultramarine (`--hand`) for
  interpretation — leaders, notes, links — and ember (`--highlight-bg`) behind the
  one finding per surface.
- **Type.** Castoro Titling (titles, the name), Castoro italic (the annotating
  voice), Instrument Sans (body), Martian Mono (every measured number, label,
  coordinate and catalog code). Loaded from Google Fonts.
- **Plates.** Illustrations live in `assets/art/` as optimized SVGs and are
  presented as `.ds-atlas` plates. They assemble themselves ground-up when they
  scroll in (`TabaresDS.mountPlates`); the frontispiece tower carries the four
  headline metrics as blue-pencil callouts, which become numbered keys plus a
  legend on phones. One plate per section, five on the landing page at most.
- **Catalog.** Selected work is `MAT·01`–`MAT·07`: the two case studies as plates,
  the rest as rows with a generated constellation seal.
- **Motion** is slow and honors `prefers-reduced-motion`; without JavaScript every
  drawing is a plain `<img>` and every highlight is simply on.

`_ds/cosmografia/` is a copy of the design system's browser build
(`dist/browser/` in the Cosmografía repo) plus React 18 UMD, used only to mount
the idea diagrams (`SITE_FIGURES`). To update it, run `npm run build` in the design
system and copy `dist/browser/cosmografia.js` and `styles.css` here. Page layout
lives in `_ds/site.css`; behavior in `_ds/site.js`.

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

**Spelling: American English throughout.** The audience is US recruiting, so
`center`, `behavior`, `organization`, `anonymization`, `analyze`, `program`,
`judgment` — never the `-ise`/`-our`/`-re` forms. This includes both case-study
directory names (`work/anonymization-pipeline/`), which are public URLs and must
not be renamed casually.

## Theme

White, always — there is no dark mode. A theme stored by the previous version of
the site (`site-theme`) is cleared on first load.

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
