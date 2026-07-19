# Dhwani RIS merged site — repo & hosting plan

_Site lives in this folder (`dhwani-merged-site/`): 9 pages + `assets/css/site.css` + `assets/js/site.js`. Pure static, no build step, all links relative — works from any subpath or root._

## Recommended path

**1. Move into Swapnil's repo (the agreed home).**
- In `github.com/Swapnilchesa/dhwaniriswebsite2026`, create a branch (e.g. `redesign-merge`), replace the page files with these, keep his `blog/` posts, `sitemap.xml`, `robots.txt`, `404.html`, and `assets/img/`.
- Open a PR so both founders can diff and react before merge. GitHub Pages keeps serving the old design from `main` until merged.
- Needs repo access: Swapnil merges, or add a collaborator, or connect the GitHub connector here.

**2. Point dhwaniris.com at it.**
- Repo → Settings → Pages → Custom domain: `dhwaniris.com` (creates a CNAME file).
- At the DNS provider: `A` records for apex → GitHub Pages IPs (185.199.108–111.153), `CNAME` for `www` → `swapnilchesa.github.io`.
- Serving from root also fixes `404.html`'s absolute paths.
- Keep the old site's host until DNS is verified + HTTPS cert issued, then retire it.

**3. Contact form (optional upgrade).**
- Today the form falls back to a pre-filled email (works on GitHub Pages, no server).
- For the live `/api/contact` + Resend flow, host on Vercel or Netlify instead (both serve static + serverless free tier). Import the same repo; only the form's submit handler changes (see TODO comment in `contact.html`).

## Before go-live checklist
- [ ] Both founders sign off on the design (open `index.html` locally or push the branch to a preview).
- [ ] Swap the Unsplash hero photo for a real Dhwani field photo (`assets/css/site.css`, `.hero .bg`).
- [ ] Port the 4 on-site blog posts (blog index links to the old live URLs for now).
- [ ] Decide on `insights.html` (exists on Swapnil's site; not yet ported, footer omits it).
- [ ] Rotate the exposed Resend API key (Resend dashboard) and GitHub PAT (GitHub settings) — still pending from the earlier session.
- [ ] Update `sitemap.xml`/`robots.txt` canonical URLs to dhwaniris.com.

---

## Update — 20 Jul 2026 (production-hardening pass)

Added since the initial port:

- **Real logo (SVG).** Hand-built vector recreation of the Dhwani mark + wordmark. Files in `assets/img/`: `dhwani-mark.svg` (colour), `dhwani-mark-white.svg` (for dark backgrounds), `dhwani-logo.svg` / `dhwani-logo-white.svg` (full lockups), `favicon.svg`. Wired into the header via `assets/css/site.css` — white mark over the dark heroes, colour mark once the header goes solid on scroll. Wordmark now uses the brand-style rounded font (Baloo 2).
- **SEO + social.** Every page now has canonical URL, Open Graph and Twitter Card tags, theme-color, and favicon links (injected before `</head>`, marked `<!-- seo:dhwani -->`). Shared share image: `assets/img/og-cover.png` (1200×630).
- **`404.html`** — branded, on-design, uses relative asset paths (works from root).
- **`sitemap.xml` + `robots.txt`** — all 9 pages listed; robots points at the sitemap. URLs assume the `dhwaniris.com` root.
- **Accessibility.** Skip-to-content link, `<main id="main">` landmark on every page, visible focus rings, mobile-menu `aria-expanded`, and a `prefers-reduced-motion` block that disables animation for users who ask for it.

### Still needs the founders (can't be done from here)
- Real photography: hero (still an Unsplash placeholder), team headshots, case-study screenshots, client logos, testimonial photos.
- Hosting + domain: move into a repo, open the PR, point `dhwaniris.com` DNS, issue HTTPS, add redirects from old URLs.
- Live contact form: needs Vercel/Netlify + Resend (GitHub Pages can't run the serverless endpoint; it falls back to a mailto today).
- Rotate the exposed Resend API key + GitHub PAT.
- Port the 4 blog posts (index still links to the old live URLs) and decide on `insights.html`.
- Optional: analytics (GA4/Plausible), and swap the `og-cover.png` wordmark to Baloo 2 once the brand font is available at build time.

## Update — Dhwani Dots animation added

- **Homepage brand section** ("One mark, made of many") between the stat band and clients: ~9,500 dots scatter, converge into the real Dhwani logo, hold, disperse, and loop.
- Extracted from the uploaded `Dhwani-Dots-standalone.html` bundle into a lightweight **vanilla** script — `assets/js/dhwani-dots.js` (no React/bundler runtime). Logo image is inlined as a data URI so it also works from `file://`.
- Pauses when scrolled off-screen (IntersectionObserver) and renders a **static** logo when `prefers-reduced-motion` is set. Hover the stage for a Replay button.
- The real full-colour logo is also saved as `assets/img/dhwani-logo-full.png` (232×88) — can replace the SVG header lockup later if you prefer the exact original.
- The original uploaded bundle is kept as `Dhwani-Dots-standalone_source.html` in the parent folder (not part of the deployable site).

## Update — real logo wired in

- Your uploaded `Dhwani Logo.png` (232×88, transparent) is now the site logo. Saved as `assets/img/dhwani-logo-full.png`; a white-on-dark variant (orange mark kept, wordmark knocked to white) generated as `assets/img/dhwani-logo-full-white.png`.
- Header uses the **white** version over the dark heroes and the **colour** version once it scrolls onto the light background; the footer uses the white version. Wired via `assets/css/site.css` (CSS-only, applies to all pages). The wordmark text is kept as screen-reader-only so the logo link still has an accessible name.
- The social-share image `assets/img/og-cover.png` was rebuilt with the real logo.
- The hand-built SVG lockups (`dhwani-logo.svg`, `dhwani-mark*.svg`) remain as scalable fallbacks; `dhwani-mark.svg` is still the favicon.
