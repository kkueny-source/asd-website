# Artistic Stone Design website

Portable source for [artisticstonerichmond.com](https://artisticstonerichmond.com/).

## Structure

- `public/index.html` — main website
- `public/pay/index.html` — Square payment page
- `public/styles.css` — site design and responsive layout
- `public/images/` — ASD-owned site images and branding

## Local review

```bash
npm install
npm run check
npm run serve
```

## Cloudflare Pages

Connect this repository to Cloudflare Pages with:

- Framework preset: None
- Build command: leave blank
- Build output directory: `public`
- Production branch: `main`

Cloudflare will publish automatically whenever an approved change reaches `main`.

## Updating the site

Edit the relevant HTML or CSS file, run `npm run check`, review the change, then commit it. Do not put passwords, API keys, or customer information in this repository.
