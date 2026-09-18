# Bindlore marketing site

Static marketing site for **Bindlore** — a Chrome extension that turns books you own into AI skills, on your device.

Repo target: `stedeim/bindlore-web`

## Deploy on Vercel

1. Push this folder to GitHub (`stedeim/bindlore-web`).
2. In [Vercel](https://vercel.com), **Import** the repo (framework: Other / static).
3. Deploy. `vercel.json` enables clean URLs and trailing slashes.
4. Attach the custom domain **bindlore.app** (and `www` if desired) under Project → Settings → Domains. Point DNS as Vercel instructs (usually A/CNAME records).

No build step is required — serve `index.html` from the root.

## Analytics

Privacy-safe **Vercel Web Analytics** on every marketing page (`/`, `/press/` and nested press angles, `/privacy/`). Official HTML snippet (`/_vercel/insights/script.js`) plus `/js/analytics.js` for Chrome Web Store click events named `cws_click`.

Enable Web Analytics in the Vercel project dashboard after deploy. Do **not** add Google Analytics / gtag / GA4, Meta Pixel, or Google Ads. Do **not** strip `utm_*` from URLs. Do **not** send book content, file names, or other user-content as event properties.

## Demo video

Place the 16:9 MP4 at `public/demo/bindlore-demo-16x9.mp4` (or `demo/bindlore-demo-16x9.mp4` at the site root). The landing page references `/demo/bindlore-demo-16x9.mp4` with muted controls and `playsinline` — no autoplay with sound.

## Chrome Web Store CTA

The extension is live. Primary CTAs say **Add to Chrome** or **Get Bindlore free** and link to:

https://chromewebstore.google.com/detail/bindlore/cfafldnpgdfankggihnejdfalifdgffh

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Landing page |
| `press/index.html` | Press kit hub |
| `press/press.css` | Shared press-kit styles |
| `press/launch/` | Launch / availability release |
| `press/privacy-on-device/` | Privacy / on-device release |
| `press/agent-skills/` | Agent skills / `SKILL.md` release |
| `press/drm-refused/` | DRM refused release |
| `press/founder-story/` | Founder story release |
| `press/chrome-web-store-free/` | Chrome Web Store media brief |
| `press/ocr-paper-books/` | On-device OCR media brief |
| `press/local-first-pkm/` | Local-first PKM release |
| `press/optional-ai-api-keys/` | Optional AI API keys media brief |
| `press/quotable-facts/` | Quotable fact sheet |
| `privacy/index.html` | Privacy policy |
| `icon.png` | Brand icon (256×256) |
| `demo/bindlore-demo-16x9.mp4` | Product demo (add before go-live) |
| `js/analytics.js` | CWS click event (`cws_click`) for Vercel Analytics |
| `vercel.json` | Vercel clean URLs / trailing slash |
