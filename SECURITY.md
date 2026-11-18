# Security

## Reporting

Email **hello@ejaad.co.uk** with a description and, where possible, a reproduction. Please do not
open a public issue for a suspected vulnerability. See `/.well-known/security.txt` for the
machine-readable contact.

## What this site is

A static marketing site hosted on **GitHub Pages**. There is no server-side code, no database, no
login, no form endpoint and no cookies by default. The contact form composes a `mailto:` message in
the visitor's mail client.

## Analytics and consent

The site can load **Microsoft Clarity** to understand how the site is used. It is loaded only
after the visitor chooses **Accept** in the consent banner; declining sets no Clarity script or
cookie. The choice is stored in `localStorage` and can be reset with **Manage analytics** in the
footer. The contact form is marked with `data-clarity-mask="true"`, so names, emails and
messages are not captured in recordings. Clarity is used on the marketing pages, and only after
consent.

## Hardening in place

- HTTPS enforced on `ejaad.co.uk`; the `adhan` subdomain redirects to HTTPS.
- All fonts are **self-hosted** under `assets/fonts/`; no third-party font or script requests.
- A meta Content Security Policy on every page restricts resources to the site origin. The homepage
  additionally allows Microsoft Clarity only for consented analytics; no other third-party scripts
  are permitted.
- Inline scripts were removed; JSON-LD blocks are allowed by per-page SHA-256 hashes.
- External links open with `rel="noopener noreferrer"`.
- No secrets or credentials are stored in the repository.
- Image screenshots carry no GPS or device EXIF metadata.

## Host limitations

GitHub Pages does not allow custom response headers, so `Strict-Transport-Security`,
`X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy` and a header-level
`frame-ancestors` cannot be set from this repository. The site is static and has no authenticated
or sensitive actions. If those headers become a requirement, put Cloudflare (or a similar proxy)
in front and add them there.

## Maintaining the CSP

The homepage and the three product pages allow their JSON-LD blocks by hash. If a JSON-LD block
changes, recompute the hash for that page and update its `script-src` value. For example:

```bash
node -e "const c=require('crypto'),f=require('fs');const s=f.readFileSync('adhan/index.html','utf8');const m=s.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);console.log('sha256-'+c.createHash('sha256').update(m[1]).digest('base64'))"
```

If a browser blocks a needed resource, check the developer console for a `Content Security Policy`
message before loosening the policy.
