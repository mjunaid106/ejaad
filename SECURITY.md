# Security

## Reporting

Email **hello@ejaad.co.uk** with a description and, where possible, a reproduction. Please do not
open a public issue for a suspected vulnerability. See `/.well-known/security.txt` for the
machine-readable contact.

## What this site is

A static marketing site hosted on **GitHub Pages**. There is no server-side code, no database, no
login, no cookies, no analytics and no form endpoint. The only interactive element is the contact
form, which composes a `mailto:` message in the visitor's mail client.

## Hardening in place

- HTTPS enforced on `ejaad.co.uk`; the `adhan` subdomain redirects to HTTPS.
- All fonts are **self-hosted** under `assets/fonts/`; no third-party font or script requests.
- A meta Content Security Policy on every page restricts resources to the site origin, blocks
  framing and objects, and disallows outbound connections.
- Inline scripts were removed; the JSON-LD block is allowed by a SHA-256 hash in the homepage CSP.
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

The homepage CSP allows its JSON-LD block by hash. If that JSON-LD changes, recompute the hash and
update the `script-src` value in `index.html`:

```bash
node -e "const c=require('crypto'),f=require('fs');const s=f.readFileSync('index.html','utf8');const m=s.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);console.log('sha256-'+c.createHash('sha256').update(m[1]).digest('base64'))"
```

If a browser blocks a needed resource, check the developer console for a `Content Security Policy`
message before loosening the policy.
