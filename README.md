# Bindlore marketing site

Static marketing site for **Bindlore** — a Chrome extension that turns books you own into AI skills, on your device.

Repo target: `stedeim/bindlore-web`

## Deploy on Vercel

1. Push this folder to GitHub (`stedeim/bindlore-web`).
2. In [Vercel](https://vercel.com), **Import** the repo (framework: Other / static).
3. Deploy. `vercel.json` enables clean URLs and trailing slashes.
4. Attach the custom domain **bindlore.app** (and `www` if desired) under Project → Settings → Domains. Point DNS as Vercel instructs (usually A/CNAME records).

No build step is required — serve `index.html` from the root.

## Demo video

Place the 16:9 MP4 at `public/demo/bindlore-demo-16x9.mp4` (or `demo/bindlore-demo-16x9.mp4` at the site root). The landing page references `/demo/bindlore-demo-16x9.mp4` with muted controls and `playsinline` — no autoplay with sound.

## Coming soon CTA

The Chrome Web Store listing is **not live yet**. All primary CTAs say **Coming soon** and link to `#waitlist`. Do not point them at a Chrome Web Store URL until the extension is published; then swap the hrefs and button copy.

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Landing page |
| `privacy/index.html` | Privacy policy |
| `icon.png` | Brand icon (256×256) |
| `demo/bindlore-demo-16x9.mp4` | Product demo (add before go-live) |
| `vercel.json` | Vercel clean URLs / trailing slash |
