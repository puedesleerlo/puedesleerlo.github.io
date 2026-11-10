# puedesleerlo.github.io

Personal site for Mario Alejandro Tabares Arango — AI/ML engineer.

Static HTML: no build step, no framework. Edit, commit, push; GitHub Pages
redeploys. The design system arrives as a prebuilt copy in `_ds/cosmografia/`.

## Structure

```
index.html                              the whole site
assets/Mario_Alejandro_Tabares_Arango_CV.pdf   linked from the hero and contact block
```

## The first fifteen seconds

The opening should answer who Alejandro is, what he can contribute, and what he
wants to explore next. Lead with his Carnegie Mellon MS program and the statement
“I build AI systems people can test and control.” Keep the primary actions visible:
view selected work, download the CV, or send an email.

- **Selected work** (Plate I) provides two case studies and five more systems.
- **Skills and education** (Plate II) describes actions, tools, and links to evidence.
  Explain harness and loop engineering through context, tools, evaluation,
  feedback, and stopping rules. Describe autonomous ML through experiment workflows.
- **Interests** (Plate III, `#story`) explicitly presents causal ML, decisions under
  uncertainty, and technical AI governance as directions being pursued. The longer
  personal argument remains available at `the-question/`.
- **Experience** (Plate IV) and **Research** (Plate V) supply the detailed record.

Keep demonstrated work distinct from developing interests. Avoid expertise labels,
unqualified safety guarantees, or claims that automation removes human judgment.

## The ask

The page has one concrete request: **a Summer 2027 internship** in applied AI or
ML systems, as a CMU MS student (graduating Dec 2027). The hero availability line,
Contact section, two meta descriptions, and the longer essay's closing ask must
agree on the term. Research interests describe the direction of study, not a claim
of established specialization.

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
- **Plates.** Illustrations live in `assets/art/` as SVGs prepared with the design
  system's `scripts/art/svgopt.py` and presented as `.ds-atlas` plates. They assemble
  themselves ground-up when they scroll in (`TabaresDS.mountPlates`). The
  homepage opening uses a compact portrait and text so the introduction and next
  actions are immediately visible. Larger illustrations accompany the evidence.
- **No image appears twice across the site.** Landing: conduit and vault
  (the case-study pair, repeated only on their own case-study page), stair
  (interests), airship (experience), astrolabe (skills and education), zodiac
  (research), keeper (contact), city (closing). Essay: lighthouse, cosmogram, cabin,
  figure, whales. Cultural-adoption case study: outpost (formerly the hero).
  When you add a plate, check this list first.
- **Figures in the margin move, slowly.** The airship floats and crosses its margin
  as you scroll, the astrolabe swings from its ring, the star chart turns once every
  four minutes, the keeper rises into view. Motion is always on the wrapper element,
  never on the SVG, so the drawing is composited once and never repaints. All of it
  stops under `prefers-reduced-motion`.
- **Night plate.** Research (`#research`) is the one dark surface
  (`data-theme="dark"` on the section), because it holds the star chart. The site
  itself stays white.
- **No text inside any SVG.** Diagrams draw only lines and shapes; every label is
  HTML over or beside the drawing, so it swaps language and reflows. The division
  on the essay page is an HTML bracket with text-free SVG braces (`.bracket` in
  `_ds/site.css`); the case-study diagrams use `_ds/figures.css`.
- **Catalog.** Selected work is `MAT·01`–`MAT·08`: the two case studies as a
  framed pair, the rest as rows with a generated constellation seal. `MAT·08`
  is a row that links to its own case study, `work/cultural-adoption/`.
- **HTML figures.** The cultural-adoption figures use no SVG at all (`.gx` in
  `_ds/figures.css`): tracks, markers and the clock are boxes, and any element
  with `data-arrive` plays once when it scrolls in.
- **Motion** is slow and honors `prefers-reduced-motion`; without JavaScript every
  drawing is a plain `<img>` and every highlight is simply on.

`_ds/cosmografia/` is a copy of the design system's browser build
(`dist/browser/` in the Cosmografía repo) plus React 18 UMD. The browser build
needs React loaded before it even where no React figure is mounted. To update it, run `pnpm run build` in the design
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

Employment and quantitative claims are drawn from the CV in `assets/`. Current
skills and developing interests also reflect the author's own description; keep
those separate from measured project outcomes.

Claims are scoped, not absolute. The privacy work is described as de-identification
(hashed linkage keys, suppression, generalization, release checks, restricted
access) with residual re-identification risk, never as irreversible anonymization;
the agent never authors SQL, but its answers are only as correct as the source data
and semantic definitions. The 240× turnaround assumes a 40-hour analyst-week. When the CV changes,
update the PDF and the corresponding section here — the two should never disagree.

Live figures currently on the page: 230+ credit-risk models, 8 audit cycles with
zero material findings, USD 14B credit exposure across four countries, 2.5M+
residents, 65,000+ individuals protected by the PII pipeline, 34 historical data
standards, 96-question agent benchmark. The cultural-adoption case study draws
its figures from the plan document (DAMA maturity 1.83 of 5, 19 of 87 controls)
and labels every plan target as a target; it reports no measured outcomes.
The timed-decision exercises and their leaderboard are the author's own
description; their scripts live in the operating guides, not in the plan.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Cache stamps

GitHub Pages lets browsers cache CSS and JS for ten minutes, so a visitor can
get a new page with an old stylesheet and see the layout collapse. Every local
stylesheet, script and drawing link therefore carries a hash of the file:
`_ds/site.css?v=f385c892`. `tools/stamp_assets.py` rewrites the stamps, and the
pre-commit hook runs it on every commit. After cloning, install the hook once:

```sh
./tools/install-hooks.sh
```
