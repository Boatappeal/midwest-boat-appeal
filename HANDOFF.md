# Handoff Brief — Next Claude, Read This First

**READ CONTEXT.md BEFORE DOING ANYTHING.** It has the full decision log, rejected ideas, Andy's confirmed facts, and everything that was changed in Session 2.

---

## Project Overview

Two static sites for **Andy Williamson** — owner of Midwest Boat Appeal and Marine Plywood, St. Bonifacius, MN. Grace is managing the project on Andy's behalf.

1. **`index.html`** — Midwest Boat Appeal · Marine Plywood
2. **`skiff-craft.html`** — Skiff Craft Boats (separate brand identity)
3. **`skiff-craft-services.html`** — Skiff Craft services page
4. **`skiff-craft-products.html`** — Skiff Craft products placeholder
5. **`parts.html`** — Midwest marine parts catalog

Plain HTML + CSS + JS. No framework, no build step.

Dev server: `cd /Users/grace/Desktop/midwest-boat-appeal && python3 -m http.server 5731`

Current cache version: `v=2026053137`

---

## What's Done

### Midwest Boat Appeal
- Full 9-section site with real content throughout
- Hero: single line "Midwest Boat Appeal", Cormorant Garamond 600, badge includes "Marine Plywood"
- Services: 7 expandable cards + year-round callout panel at bottom
- Plywood: 8 species expandable cards with photos
- Boats for Sale: 1966 Chris-Craft 28' listing, listings-grid ready for more boats
- About: timeline (all dates Andy-confirmed), hiring notice
- Restoration sequence: scroll-animated 3-photo crossfade
- Parts page: 15 dropdown categories, brands list
- Footer: Facebook + Instagram linked
- Contact: address, hours, directions, email form (stub — needs Formspree wiring)

### Skiff Craft
- Separate ivory/mahogany/brass identity — DO NOT mix with Midwest navy/red
- Hero: script font (Alex Brush — still being evaluated), large title, wood-grain CSS bg
- Nav: 5 items only — Models, Gallery, Services, Products, Call
- Timeline: 4 cards (condensed from 7)
- Services page: 10 dropdown services in SC aesthetic
- Products page: 8 placeholder categories, cart to be built later
- Full footer with contact info and area served
- Call section: dark background FORCED with !important — do not remove

---

## What's Still Pending

**Priority order:**

1. **Andy's photos** — swap stock photos across both sites when received. Key slots: SC hero bg (optional), SC heritage, SC models x3, SC gallery x6, SC craftsmanship banner, Midwest craft section photo.

2. **SC hero font** — Alex Brush is current. Still being evaluated against the vintage Skiff Craft brochure script. Next to try: Allura or Parisienne. Fallback: Bodoni Moda italic (looked very clean and premium).

3. **Contact form** — wire Midwest contact form to `boatappeal@frontiernet.net` via Formspree (free, 5 min setup, no backend needed).

4. **Shopping cart** — build on SC products page once Andy provides product list. Plan: JS cart + Formspree to Andy's email + auto-confirmation to customer. No payment processing — order inquiry only.

5. **Hosting migration** — Andy owns `midwestboatappeal.com`. Current host: local web developer. Plan: Netlify (free). Steps: finish site → Netlify deploy → preview URL → test → point DNS → 24-48h wait → confirm → cancel developer.

6. **Owner CMS login** — AFTER Netlify migration. Netlify CMS gives Andy visual editor at `/admin` to manage boats for sale without coding.

7. **Mobile testing** — not yet hand-tested on real devices.

8. **Google Search Console** — set up after going live.

---

## Key Owner Preferences (binding — Andy corrected on each)

- Brand name: **"Midwest Boat Appeal · Marine Plywood"** — no ampersand, no "and"
- **"Skiff Craft"** — two words, both caps. Never "Skiftcraft" or "SkiffCraft"
- No sister-brand language on Skiff Craft (except footer note)
- No SVG/cartoon boat illustrations — ever
- No award-winning language (Andy has not won formal awards)
- No "No subcontracted work"
- No "Sierra" brand references
- Philippine mahogany (not African/Honduran)
- 10–15 varnish coats (not 6–8)
- No carpet in Skiff Craft interiors
- Skiff Craft call section MUST have dark background — fix is in CSS with !important
- Hero dropdowns must not be clipped — hero has overflow:visible, z-index:1

---

## Andy's Confirmed Facts

- Timeline dates all confirmed by Andy (1990, 1992, 1995, 2000, 2009, 2025)
- Midwest Marine Plywood was formerly of Eagan, MN
- Skiff Craft acquired in 2025
- No formal awards won
- Phone: 952-446-9611
- Email: boatappeal@frontiernet.net
- Address: 4340 Main Street, St. Bonifacius, MN 55375
- Hours: Mon–Fri 8–5, Sat by appointment 10–2
- Facebook: https://www.facebook.com/people/Midwest-Boat-Appeal-Marine-Plywood/100063669514326/
- Instagram: https://www.instagram.com/mwboatappeal.marineplywood/

---

## Proposal PDF

Saved at `/Users/grace/Desktop/midwest-boat-appeal-proposal.pdf`
Professional investment summary for presenting to Andy — competitor comparison, feature table, ROI argument, market rates.

---

## File Map

```
midwest-boat-appeal/
├── index.html                  Midwest main (updated Session 2)
├── styles.css                  Midwest styles (updated Session 2)
├── script.js                   Midwest behavior (unchanged)
├── skiff-craft.html            Skiff Craft main (updated Session 2)
├── skiff-craft.css             Skiff Craft styles (updated Session 2)
├── skiff-craft-services.html   NEW Session 2
├── skiff-craft-products.html   NEW Session 2
├── parts.html                  NEW Session 2
├── skiftcraft.html             redirect (unchanged)
├── img/
│   ├── hero/hero.jpg           Midwest hero (keep)
│   ├── logo/                   PNG logo (unused, keep for reference)
│   ├── sea-skiff/              8 Chris-Craft listing photos
│   ├── shop/                   Real shop photos (andy.jpg, refinish-evie.jpg, etc.)
│   ├── plywood/                Per-species plywood photos
│   ├── skiff-craft/            SC beauty photos (all Pexels — swap for Andy's when ready)
│   └── sc-beauty/              Pexels source files (reference only)
├── CONTEXT.md                  Full decision log — READ THIS
├── HANDOFF.md                  This file
├── README.md                   Quick start
└── CREDITS.md                  Photo licensing
```
