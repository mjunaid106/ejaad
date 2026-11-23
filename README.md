# ejaad — website

Marketing site for **ejaad**, a software consultancy building AI systems, mobile apps and
games, websites, and corporate systems.

Live at **https://ejaad.co.uk/**

## Brand mark

The icon is a **"j" monogram** — the distinctive letter of *ejaad* — set in gradient on an ink
tile. The detached dot reads as the spark that starts a new idea — a fitting mark for a name
that means "creation".

Source files:

- `assets/img/brand-mark.svg` — scalable mark, used in the header, footer and browser tab
- `assets/img/brand-mark-180.png` — 180×180 home-screen icon
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

**Contact email** — replace `hello@ejaad.co.uk` in `index.html` (search for it; it appears in the
contact block, the 404 page, and the JSON-LD schema) and in `assets/js/main.js` (the `mailto:`
target).

**Copy** — every section is plain HTML in `index.html`, in this order:
hero → services → approach → work → about → contact.

**Colours and type** — all tokens live at the top of `assets/css/styles.css` under `:root`
(`--paper`, `--ink`, `--accent`, `--mint`, font stacks).

**Social preview image** — `assets/img/og.png` is 1200×630. Replace it with your own and keep
the same filename.

## Cache busting

GitHub Pages serves every file with `Cache-Control: max-age=600`, so browsers can keep old CSS
and JS for up to ten minutes after a deploy. Stylesheet and script links therefore carry a
version query (`?v=20261123`).

After editing anything in `assets/css/`, `assets/js/`, or a product page's own `styles.css`, bump
the token in every page so browsers fetch the new files immediately:

```powershell
$old = '20261123'; $new = '20261201'
Get-ChildItem -Recurse -Filter *.html | ForEach-Object {
  (Get-Content $_.FullName -Raw).Replace("?v=$old", "?v=$new") |
    Set-Content $_.FullName -NoNewline -Encoding UTF8
}
```

Use today's date as the token so it is obvious when it was last bumped. HTML itself is still
cached for up to ten minutes; the query string only guarantees fresh CSS and JS once the new HTML
arrives.

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

### Custom domain

The site is served directly from **https://ejaad.co.uk/** — GitHub Pages custom domain, declared by
the `CNAME` file in this repo.

DNS at IONOS:

- four `A` records on `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` on `www` → `mjunaid106.github.io`
- no `AAAA` on the apex

Email stays on IONOS: the `MX`, SPF/DKIM/DMARC and autodiscover records must not be touched.

HTTPS is issued and renewed by GitHub Pages. Keep **Enforce HTTPS** enabled in
**Settings → Pages**.

## Contact form

The form has no backend: on submit, JavaScript validates the fields and opens the visitor's
email client with a pre-filled message to `hello@ejaad.co.uk`. No data is stored.

To collect submissions server-side instead, create a form endpoint (Formspree, Basin, Getform,
Cloudflare Worker, etc.) and set the form's `action` and `method="post"`, then remove the
`submit` handler from `assets/js/main.js`.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, labelled form inputs.
- Respects `prefers-reduced-motion`.
- Responsive from 320px up; mobile nav locks body scroll and closes on link click or `Esc`.
- System-font fallbacks plus `font-display: swap`; no blocking scripts.
