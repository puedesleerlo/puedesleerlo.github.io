# puedesleerlo.github.io

Personal site. Single self-contained `index.html` — no build step, no dependencies
beyond three Google Fonts. Edit and push; GitHub Pages redeploys.

## Design

**"Levantamiento"** — the page is laid out as a survey sheet. The structural
devices are borrowed from topographic maps and herbarium labels because that is
the actual vernacular of the work: bilingual field labels (`Localidad / Locality`),
record numbers, a determination, a list of instruments.

- **Display type** is a grotesque (Archivo), not a serif — map lettering is sans.
- **Body** is Spectral, a serif drawn for screen reading.
- **Data and labels** are IBM Plex Mono.
- **The signature element** is the *Strata* section: a stratigraphic column where
  each layer is a period of work, hatched like a geological unit and thickest where
  the learning was slowest. It reads bottom-up, the way a real column does.

Three colour schemes ship with it, switchable in the top bar and remembered in
`localStorage`:

| Scheme | Feel |
|---|---|
| `levantamiento` | survey linen, ochre + hydrographic teal (default) |
| `herbario` | warmer specimen paper, botanical olive and pressed rust |
| `nocturno` | night chart — deep indigo, amber, lifted teal |

Pick one and delete the other two blocks in `:root[data-theme=...]` plus the
`.themes` markup if you'd rather not offer the switcher.

## ⚠️ Placeholders to replace

Everything below is either invented or unverified. Fix before sharing widely.

| Where | What | Status |
|---|---|---|
| Contact → LinkedIn | dead link, marked `data-placeholder` | **add URL** |
| Contact → CV | dead link, marked `data-placeholder` | **add PDF** |
| `REC 004` Palimpsest | described as "in progress" — true today, update when it ships | check |
| `REC 005` Caronte stack | `Go · Python · Raspberry Pi` inferred from repo names | **verify** |
| Strata → tool lists | inferred from public repos, not from memory of what you used | **verify** |
| Strata → 2020–2022 "Rivers" | narrative framing of `bitacora-fluvial`; the lesson quoted is invented | **rewrite in your words** |
| Strata → 2024–2025 "Language" | ditto for `licitai` / `pykeen` / `crewAI` | **rewrite** |
| Title block → "Data & knowledge architecture" | a role label I chose, not one you gave me | **confirm** |
| `<meta name="description">` | mirrors the thesis line | fine if the thesis stays |

Verified against the warehouse and the architecture report, safe to keep:

- 34 source standards, 440K location records, 86% geocode coverage,
  154K free-text addresses resolved, 415K anonymised locations
- five repositories, OWL/SKOS ontology, MetricFlow semantic layer

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
