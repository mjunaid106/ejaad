# Treat Trail Learning — product page

Part of the ejaad website, served at **https://ejaad.co.uk/treat-trail/**.

## Stack

Plain static HTML/CSS — no build step.

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `assets/css/styles.css` | Design tokens, layout, responsive rules |
| `assets/img/` | Biscuit app icon, Open Graph image, screenshots |
| `assets/img/screens/` | Home, Learn, lesson, comprehension, wardrobe, working-out captures |

## Content rules

This page follows the product PRD, not the internal spec:

- The product is **Treat Trail Learning**; the app version is **1.0.0**.
- Exactly **1 treat per correct answer** — no bonuses, multipliers or streaks.
- One lesson in **each** of maths, English and comprehension unlocks the wardrobe until local midnight.
- No account, no ads, no analytics, no crash reporting; progress stays on the device and is lost on uninstall.
- Android release APK exists; iOS and web are configured but **no store listing is published**. Do not add a download or store CTA until one exists.
- Do not market a streak feature; it is not built.
- Screenshots are the owner's captures; keep their captions concrete.

## Deployment

Ships with the ejaad site. From the repository root:

```bash
git add .
git commit -m "Update Treat Trail page"
git push
```

GitHub Pages deploys `main` from the repository root; `/treat-trail/` updates with it.
