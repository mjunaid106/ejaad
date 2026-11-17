# Adhan: Prayer Times — product page

Part of the ejaad website, served at **https://ejaad.co.uk/adhan/**.

## Stack

Plain static HTML/CSS — no build step.

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `assets/css/styles.css` | Design tokens, layout, responsive rules |
| `assets/img/` | Brand mark and Open Graph image |

## Content rules

This page follows the product brief, not the internal spec. Do not change copy without checking it
against that brief:

- The app is **Android only**. Title is exactly **Adhan: Prayer Times**.
- Never use “offline” as a name, title or badge. Say **“works without a connection”** only as a fact
  about features.
- Never claim “fully offline”, “100% offline”, “no internet permission” or “never uses the network”.
  `INTERNET` exists for Google Cast on the user's own Wi-Fi.
- Do not claim accuracy, authority, worldwide mosque coverage, “every speaker”, a price, or a Google
  Play listing.
- The bundled mosque data covers **Great Britain and Pakistan**, as of **November 2026**.
- The OpenStreetMap and audio attributions are licence obligations. Keep them visible.

## Deployment

This folder ships with the rest of the site. From the repository root:

```bash
git add .
git commit -m "Update Adhan page"
git push
```

GitHub Pages deploys `main` from the repository root; `https://ejaad.co.uk/adhan/` updates with it.

## Subdomain

`adhan.ejaad.co.uk` forwards to `https://ejaad.co.uk/adhan/` via IONOS subdomain forwarding. GitHub
Pages binds one custom domain per repository and cannot alias a hostname to a subfolder, so the
subdomain redirects rather than serving the folder directly.
