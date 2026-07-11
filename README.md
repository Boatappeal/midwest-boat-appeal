# Midwest Boat Appeal · Marine Plywood + Skiff Craft

Two-site static project. Same folder, no build, no framework.

## Sites

- **`index.html`** — Midwest Boat Appeal · Marine Plywood (the main shop).
- **`skiff-craft.html`** — Skiff Craft Boats (the sister-brand marque, separate visual identity).
- **`skiftcraft.html`** — tiny redirect catching the old misspelled URL.

## Run locally

No build step. Any static server works:

```bash
cd midwest-boat-appeal
python3 -m http.server 5731
```

Then open:
- http://localhost:5731/ (Midwest Boat Appeal)
- http://localhost:5731/skiff-craft.html (Skiff Craft)

## Edit workflow

1. Edit `index.html` / `styles.css` / `script.js` (Midwest) or `skiff-craft.html` / `skiff-craft.css` (Skiff Craft).
2. Bump the cache-bust integer on the CSS/JS link in the affected HTML files:
   ```bash
   sed -i '' 's|v=2026053114|v=2026053115|g' index.html skiff-craft.html
   ```
3. Refresh the browser. If Safari is stubborn, ⌘⌥R hard-refreshes.

## Files

```
midwest-boat-appeal/
├── index.html                Midwest Boat Appeal homepage
├── styles.css                Midwest styles
├── script.js                 Midwest behavior (nav, dropdowns, gallery, etc.)
├── skiff-craft.html          Skiff Craft homepage (independent site)
├── skiff-craft.css           Skiff Craft styles
├── skiftcraft.html           0-byte redirect to skiff-craft.html
│
├── img/
│   ├── hero/                 Midwest hero photo
│   ├── logo/                 Original MBA PNG logo (kept for reference)
│   ├── sea-skiff/            8 real photos of the 1966 Chris-Craft for sale
│   ├── shop/                 Real shop / restoration / founder photos
│   ├── plywood/              Real per-species plywood photos
│   ├── skiff-craft/          Skiff Craft beauty photos
│   └── sc-beauty/            Pexels source files (kept for reference)
│
├── HANDOFF.md                Read this first — full owner-preference brief
├── CONTEXT.md                Decision log, history, dos and don'ts
├── CREDITS.md                Photo licensing & attribution
└── README.md                 This file
```

## Read before editing

- **`HANDOFF.md`** — owner preferences, what's done, what's pending.
- **`CONTEXT.md`** — every design decision and what's been rejected (don't reintroduce these).
- **`CREDITS.md`** — every photo source, license, and which slot needs to be swapped for owner-provided photos eventually.

## Tech

- Plain HTML5, CSS, JS. No build tools, no framework.
- Google Fonts loaded via CDN: Fraunces, Inter (Midwest); Bodoni Moda, Cormorant Garamond, Inter (Skiff Craft).
- A handful of Pexels and Unsplash hot-links remain in `index.html` (intro and craft sections). All licensed for commercial use without attribution. See `CREDITS.md`.
- IntersectionObserver-based scroll-reveal on the Skiff Craft timeline.
- All forms (Midwest Contact) are stubs — wire to your form handler of choice (Formspree / Basin / Netlify Forms / custom endpoint).
