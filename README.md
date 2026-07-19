# Dhwani RIS — website

Marketing website for **Dhwani Rural Information Systems Pvt. Ltd.** — a static, no-build site (plain HTML/CSS/JS) that merges the curated content of the company site with the Dhwani Solutions visual design.

## Structure

```
index.html  solutions.html  services.html  work.html  dpdp.html
about.html  blog.html  careers.html  contact.html  404.html
assets/
  css/site.css        design system + all page styles
  js/site.js          shared behaviour (nav, reveal, counters, DPDP countdown)
  js/dhwani-dots.js   brand particle animation (dots form the logo)
  img/                logo (SVG + PNG), favicon, social share image
robots.txt  sitemap.xml  .nojekyll
```

No build step, no dependencies. Fonts load from Google Fonts; everything else is local and links are relative, so it works from any host or subpath.

## Running locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

See `DEPLOYMENT.md` for the full plan (GitHub Pages / custom domain / contact-form options and the remaining go-live checklist).

Quick version — GitHub Pages: push this folder to a repo, then **Settings → Pages → Deploy from a branch → `main` / root**. The site is served as-is (`.nojekyll` is included).

© Dhwani Rural Information Systems Pvt. Ltd.
