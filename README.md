# Harinisri Ramesh — Portfolio

A single-page portfolio built for the **Stryker Clinical & MPS Internship Program**
application. Static HTML/CSS/JS — no build step, no dependencies.

## Design concept

- **Palette:** clinical navy (`#0A2540`), Stryker-adjacent signal blue (`#0057B8`),
  and a vital-sign teal (`#14C7B4`) on a sterile off-white — mature, trustworthy,
  medical-technology tone rather than a generic "AI portfolio" look.
- **Type:** Space Grotesk (display) + Inter (body) + IBM Plex Mono (data/tag labels,
  like a monitor readout).
- **Signature motion element:** a live-drawing "vitals" waveform used as the
  scroll-progress indicator at the top of the page, in the hero background, and as
  section dividers — a direct nod to the candidate's biomedical-signal work
  (RespiSense, ECG/locomotor tracking) and to a clinical-monitoring aesthetic.
- Every fact on the page (education, dates, CGPA, experience, projects, activities)
  is pulled directly from the uploaded résumé — nothing is fabricated.

## Project structure

```
portfolio/
├── index.html          # all page content/sections
├── css/
│   └── style.css        # design tokens, layout, responsive rules, animations
├── js/
│   └── script.js         # nav, scroll-reveal, waveform generation, back-to-top
├── assets/
│   └── Harinisri_Ramesh_Resume.pdf   # downloadable résumé (linked from Hero + Nav)
└── README.md
```

## Run locally

No build tools required. Pick any one:

**Option A — Python (built-in on most systems)**
```bash
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — Node**
```bash
cd portfolio
npx serve .
```

**Option C — just open the file**
Double-click `index.html` (works, but a local server is recommended so the
`fetch`-free relative paths and the résumé download behave exactly like production).

## Before you publish — 3 things to update

1. **LinkedIn / GitHub URLs** — in `index.html`, search for `id="linkedinLink"` and
   `id="githubLink"` inside the `#contact` section and replace the placeholder
   `href="#"` with your real profile URLs.
2. **Résumé file** — swap `assets/Harinisri_Ramesh_Resume.pdf` with your latest résumé
   PDF any time it changes (keep the same filename, or update the `href`s in the nav
   bar and hero button).
3. **Favicon/OG image (optional)** — the favicon is an inline SVG monogram; replace
   the `<link rel="icon">` in `index.html` with a real image file if you'd like a
   custom one for link previews.

## Deploy

### GitHub Pages
1. Push this folder to a GitHub repository (e.g. `harinisri-portfolio`).
2. In the repo: **Settings → Pages → Source → Deploy from a branch**, choose `main`
   and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a
   few minutes.

### Vercel
1. Install the CLI: `npm i -g vercel` (or just use the Vercel dashboard → **Add New
   Project → Import Git Repository**).
2. From the `portfolio/` folder: `vercel` and follow the prompts. Since this is a
   static site, no framework preset or build command is needed — set the **Output
   Directory** to `.` (project root) if asked.
3. Vercel will give you a live `*.vercel.app` URL; add a custom domain from the
   project's **Settings → Domains** if you have one.

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) with a skip link.
- All interactive elements are keyboard-reachable with a visible focus ring.
- Respects `prefers-reduced-motion` (waveform drift and scroll-reveal animations are
  disabled for users who request reduced motion).
- No external JS frameworks or icon fonts — icons are inline SVG, fonts are loaded
  from Google Fonts with `preconnect` for speed.
- Fully responsive: tested breakpoints at 1000px (tablet) and 760px/420px (mobile),
  with a slide-in mobile nav.
