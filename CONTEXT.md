# Context — Decision Log

A condensed log of design decisions made during the build, in roughly chronological order. If the next Claude is wondering "why is X this way?", the answer is probably in here.

## Session 2 updates (Grace + Claude, June 2026)

This session did a full overhaul of both sites. Major changes are documented below. The original CONTEXT.md notes from Session 1 are preserved at the bottom.

---

## Current cache-bust version

`v=2026053137` — bump this across all HTML files whenever CSS or JS changes.

Files to bump: `index.html`, `skiff-craft.html`, `skiff-craft-services.html`, `skiff-craft-products.html`, `parts.html`

Pattern:
```bash
sed -i '' 's|v=2026053137|v=2026053138|g' index.html skiff-craft.html skiff-craft-services.html skiff-craft-products.html parts.html
```

---

## Dev server

```bash
cd /Users/grace/Desktop/midwest-boat-appeal && python3 -m http.server 5731
```

The server must be started from the project directory. The preview tool's launch.json points here but sometimes loses the --directory flag — restart manually if needed.

---

## Midwest site — typography (SESSION 2 FINAL)

- **Hero title**: `Cormorant Garamond`, weight 600, normal style, letter-spacing .04em, size `clamp(3.4rem, 9.5vw, 9rem)`. Andy reviewed and approved this. If reverting: Playfair Display 900.
- **Hero title is now ONE LINE**: "Midwest Boat Appeal" only. "Marine Plywood" moved into the badge: "Established 1990 · Marine Plywood · St. Bonifacius, MN". Andy has not yet confirmed he prefers this — revert available on request.
- **About h2**: "Same shop. Same hands. Thirty-five years." — Andy approved.
- All other headings: Fraunces serif (unchanged).

---

## Midwest site — structure changes (SESSION 2)

- **Parts teaser section REMOVED** — was redundant with nav link. Parts page still exists at `parts.html`.
- **Four-season section REMOVED** as standalone — content folded into Services section as a navy callout panel (`fs-callout`) at the bottom of the services section after the brands strip.
- **Boats for Sale** restructured as `listings-grid`. Current listing is `listing-card-featured`. To add more boats, copy the `<article class="listing-card">` block — there's an HTML comment showing exactly where.
- **Hiring notice** added to About section — tasteful navy left-border card. Says "Qualified woodworkers and shop assistants." — "on Lake Minnetonka" was removed per Andy.
- **Parts page** (`parts.html`) — 15 dropdown categories with bullet lists, brands section, CTA. ALL "Sierra" references removed per Andy. Brands removed: Cummins, Detroit Diesel, Caterpillar, Perkins, Bosch Marine.
- **Social media**: Facebook and Instagram added to footer. URLs: `https://www.facebook.com/people/Midwest-Boat-Appeal-Marine-Plywood/100063669514326/` and `https://www.instagram.com/mwboatappeal.marineplywood/`

---

## Midwest site — content corrections (Andy confirmed, SESSION 2)

- **"Award-winning restorations"** REMOVED — Andy has not won formal awards. Now says "done in-house by our craftsmen."
- **"No subcontracted work"** REMOVED from Craft section — Andy confirmed.
- **"Hand-rubbed between coats"** REMOVED from restoration step 3.
- **"Sierra marine parts"** REMOVED everywhere — replaced with "marine parts and accessories."
- **"Marine Plywood" second hero line** REMOVED — moved to badge.
- **Plywood dropdown**: "plus" removed, just lists species names.
- **Craft section**: "No subcontracted work" removed.

---

## Midwest site — timeline (ALL DATES CONFIRMED BY ANDY)

- 1990 — Founded in Tonka Bay
- 1992 — Expanded to fiberglass and gel coat repair
- 1995 — Moved to Excelsior
- 2000 — Current home: St. Bonifacius
- 2009 — Acquired Midwest Marine Plywood (formerly of Eagan, MN)
- 2025 — Acquired Skiff Craft

---

## Midwest site — hero dropdowns fix

`.hero` changed from `overflow: hidden` to `overflow: visible` so dropdown panels don't get clipped by the Services section below. `.services` has `position: relative; z-index: 0` to ensure dropdowns float above it.

---

## Skiff Craft — typography (SESSION 2 FINAL)

- **Hero title font**: Currently `Alex Brush` script (Google Font). Still being evaluated — font exploration ongoing. Previous attempts: Pinyon Script, Great Vibes. Owner wants something close to the vintage Skiff Craft brochure script. May revert to Bodoni Moda italic if no match found.
- **Hero title size**: `clamp(5rem, 14vw, 13rem)` — intentionally large.
- **Nav wordmark**: Bodoni Moda italic (unchanged).
- **Footer mark**: Uses same script font as hero title.

---

## Skiff Craft — structure changes (SESSION 2)

- **Nav simplified**: Heritage, History, Craftsmanship REMOVED from nav. Nav is now: Models · Gallery · Services · Products · Call (5 items, much cleaner).
- **Timeline condensed**: 7 cards → 4 cards. 1904 / 1959 (merged with Amish craftsmen) / 1970s–80s peak (merged with 2011 last build) / Today.
- **Hero subtitle updated**: "Lapstrake wooden boats. Hand-built since 1904. Restored and serviced in Minnesota."
- **Services + Products teaser section** added just above the Call section — two ivory cards linking to the dedicated pages.
- **Call section background**: Fixed with `!important` and by removing `sc-section` class from the element — the nth-of-type alternating rule was overriding the dark background. DO NOT add `sc-section` class back to `.sc-call-section`.
- **Full footer added** to skiff-craft.html — matches Midwest structure with contact info, services list, products list, area served, copyright bar.

---

## Skiff Craft — new pages (SESSION 2)

- `skiff-craft-services.html` — 10 services as `<details>` dropdowns in SC aesthetic. Dark hero, ivory dropdown cards with brass accent on open.
- `skiff-craft-products.html` — Placeholder catalog, 8 categories marked "Available to order." Full cart/checkout to be built when Andy provides product list.

Both pages have full nav (5 items) and updated footer.

---

## Skiff Craft — content corrections (Andy confirmed, SESSION 2)

- **Mahogany**: Changed from "African and Honduran" to **"Philippine mahogany"**
- **Varnish coats**: Changed from "Six to eight" to **"10 to 15 coats"**
- **Varnish service**: "6–8 coat" → **"12–15 coat"**
- **Custom Interior**: Carpet removed (Skiffs don't have carpet)
- **Engine Work**: Cooling system service removed
- **Cosmetic Repairs**: Fiberglass and gelcoat removed (not applicable to Skiffs)
- **Storage**: Fogging removed, "Water system winterizing" added, "blowout" replaced with "winterizing"

---

## Skiff Craft — call section phone number

Phone number color: `#ffffff` (white). Heading: `#ffffff`. Note: `rgba(246,240,227,.92)`. The dark background is forced with `!important` on `.sc-call-section` — this is intentional, do not remove.

---

## File inventory (SESSION 2 additions)

```
index.html              Midwest — updated
styles.css              Midwest styles — updated  
script.js               Midwest behavior — unchanged
skiff-craft.html        Skiff Craft main — updated
skiff-craft.css         Skiff Craft styles — updated
skiff-craft-services.html   NEW — Skiff Craft services page
skiff-craft-products.html   NEW — Skiff Craft products placeholder
parts.html              NEW — Midwest parts catalog
skiftcraft.html         redirect — unchanged
```

---

## What's pending (do these next)

1. **Andy's photos** — swap into both sites. Slots: SC hero, SC heritage, SC models (3), SC gallery (6), SC craftsmanship banner, Midwest craft section.
2. **Skiff Craft hero font** — still being evaluated. Try Allura or Parisienne next, or revert to Bodoni Moda italic.
3. **Contact form wiring** — wire Midwest contact form to `boatappeal@frontiernet.net` via Formspree.
4. **Shopping cart** — build on SC products page once Andy provides product list. Plan: JavaScript cart + Formspree email to Andy + confirmation email to customer.
5. **Hosting migration** — Andy owns domain `midwestboatappeal.com`. Current host is a local web developer. Plan: deploy to Netlify (free), point domain DNS there, cancel old developer. Andy needs to find domain registrar login.
6. **Owner CMS login** — implement AFTER moving to Netlify. Netlify CMS gives Andy a visual editor at `/admin` to add boats for sale without coding.
7. **Mobile testing** — both sites need hand-testing on real phones.
8. **Google Search Console** — set up after going live.

---

## Hosting plan (SESSION 2)

- Andy OWNS the domain `midwestboatappeal.com`
- Current host: local web developer (unknown provider)
- Plan: Netlify (free tier, plenty for this site)
- Migration steps: finish site → deploy to Netlify → get preview URL → test → point DNS → wait 24-48h → confirm live → cancel old developer
- Security: static HTML = no database = no SQL injection risk. Netlify provides free HTTPS/SSL automatically.

---

## Business context

- Owner: **Andy Williamson**
- Business: Midwest Boat Appeal, Inc. · Marine Plywood
- Address: 4340 Main Street, St. Bonifacius, MN 55375
- Phone: 952-446-9611
- Email: boatappeal@frontiernet.net
- Hours: Mon–Fri 8–5, Sat by appointment 10–2
- Facebook: https://www.facebook.com/people/Midwest-Boat-Appeal-Marine-Plywood/100063669514326/
- Instagram: https://www.instagram.com/mwboatappeal.marineplywood/
- Grace is managing the project on Andy's behalf

---

## Proposal PDF

A professional investment summary PDF was created and saved to:
`/Users/grace/Desktop/midwest-boat-appeal-proposal.pdf`

Includes: what was built, competitor comparison, feature comparison table, ROI argument, what's still coming, investment summary with market rates.

---

# Original Session 1 Notes (preserved)

## The two big pivots

1. **SVG boat illustrations → real photography.** Early versions used hand-coded SVG boats. Owner rejected both as childish. The fix is photography, not "better SVG."
2. **Sister-brand language → independence.** Skiff Craft now reads as its own marque that just happens to be serviced at Midwest.

## Midwest site — visual identity (Session 1)

- Hero photo: Charlevoix Marina navy-hull picnic boat (Pexels, "fish socks", photo 33293847). Owner sent URL personally. Do not change without asking.
- Color palette: **navy + dark red + white + grey**. CSS vars at top of `styles.css`.
- Logo: SVG wordmark with three-line layout (MIDWEST BOAT APPEAL / MARINE PLYWOOD / FROM MINNESOTA · EST. 1990). PNG in `img/logo/` unused but kept.

## Skiff Craft — history facts (real, verified)

- Founded **1904** as the **Henry Boat Company** near Peterborough, Ontario, by Victor and Stanley Henry.
- Relocated to **Plain City, Ohio** in **1959**; renamed **Skiff Craft**.
- Plain City chosen for the **Amish and Mennonite craftsmen** who have built every hull since.
- **1970s–80s** peak production: ~150 boats/year. Models X220, X240, X260 runabouts.
- **2011**: last new Skiff Craft built in Plain City.
- **2025**: acquired by Midwest Boat Appeal and Marine Plywood (Minnesota).

Sources: Mahogany Bay and ACBS. Source-citation paragraph removed at owner request.

## Things rejected (do not reintroduce — ever)

- SVG/cartoon boat illustrations
- Hero stats bar
- "Book the boat in" CTA
- "Sister brand" language on Skiff Craft
- Big wood-plank Skiff Craft button
- Scroll-down mouse oval on Skiff Craft hero
- Hero photo behind Skiff Craft title
- Commission section on Skiff Craft
- Two-arrow toggle indicators (▾▴)
- Photos of boats on trailers / in warehouses on Skiff Craft site
- "Award-winning restorations" (Andy has not won formal awards)
- "No subcontracted work"
- "Hand-rubbed between coats" in restoration step 3
- Carpet in Skiff Craft custom interior
- Cooling system service in Skiff Craft engine work
- Fiberglass/gelcoat in Skiff Craft cosmetic repairs
- Fogging in Skiff Craft storage
- "Sierra marine parts" anywhere
- "African and Honduran mahogany" (replaced with Philippine)

## Restoration scroll math

`script.js → updateRestore()` — do not change scroll math without testing:
- startY = vh * 0.85, endY = vh * 0.25
- Step 1 at p < 0.40, step 2 at 0.40–0.70, step 3 at p ≥ 0.70
