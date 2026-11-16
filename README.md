# ejaad — website

Marketing site for **ejaad**, a software consultancy building AI systems, mobile apps and
games, websites, and corporate systems.

Live at **https://mjunaid106.github.io/ejaad/**

## Brand mark

The icon is a **"j" monogram** — the distinctive letter of *ejaad* — set in gradient on an ink
tile. The detached dot reads as the spark that starts a new idea.

Source files:

- `assets/img/favicon.svg` — scalable mark, used in the header, footer and browser tab
- `assets/img/apple-touch-icon.png` — 180×180 home-screen icon
- `assets/img/og.png` — 1200×630 social preview built from the same mark

## Stack

Plain, dependency-free static site — no build step, no framework, no `npm install`.

| Path | Purpose |
| --- | --- |
| `index.html` | The whole site (single page, anchored sections) |
| `assets/css/styles.css` | Design tokens, layout, components, responsive rules |
| `assets/js/main.js` | Mobile nav, scroll reveal, contact form `mailto:` handler |
| `assets/img/` | Favicon (SVG), home-screen icon (PNG), Open Graph image (PNG) |
| `404.html` | Custom not-found page |
| `robots.txt`, `sitemap.xml` | Crawler hints |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Preview locally

Any static file server works:

```powershell
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. Opening `index.html` directly also works.

## Editing

**Contact email** — replace `hello@ejaad.com` in `index.html` (search for it; it appears in the
contact block, the 404 page, and the JSON-LD schema) and in `assets/js/main.js` (the `mailto:`
target).

**Copy** — every section is plain HTML in `index.html`, in this order:
hero → services → approach → work → about → contact.

**Colours and type** — all tokens live at the top of `assets/css/styles.css` under `:root`
(`--paper`, `--ink`, `--accent`, `--mint`, font stacks).

**Social preview image** — `assets/img/og.png` is 1200×630. Replace it with your own and keep
the same filename.

## Deploying to GitHub Pages

This repo deploys from the `main` branch, repository root. To publish changes:

```bash
git add .
git commit -m "Update site"
git push
```

GitHub Pages rebuilds automatically in under a minute. Check progress with:

```bash
gh api repos/mjunaid106/ejaad/pages/builds/latest --jq '.status'
```

### Custom domain (optional)

1. Add a `CNAME` file at the repo root containing your domain, e.g. `ejaad.com`.
2. Point a `CNAME` DNS record at `mjunaid106.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain and enable HTTPS.

Then update the absolute URLs (`canonical`, `og:url`, `og:image`, `twitter:image`,
`robots.txt`, `sitemap.xml`) to the new domain.

## Contact form

The form has no backend: on submit, JavaScript validates the fields and opens the visitor's
email client with a pre-filled message to `hello@ejaad.com`. No data is stored.

To collect submissions server-side instead, create a form endpoint (Formspree, Basin, Getform,
Cloudflare Worker, etc.) and set the form's `action` and `method="post"`, then remove the
`submit` handler from `assets/js/main.js`.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, labelled form inputs.
- Respects `prefers-reduced-motion`.
- Responsive from 320px up; mobile nav locks body scroll and closes on link click or `Esc`.
- System-font fallbacks plus `font-display: swap`; no blocking scripts.
