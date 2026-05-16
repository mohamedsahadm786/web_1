# Build Spec — ALLUVI site (design recreated from luminpeptides.com)

> **What this file is.** The single working reference for rebuilding the
> **ALLUVI** website. The **base layout & section structure** are recreated
> from the reference site **luminpeptides.com**. The **content, brand,
> products and images** are **ALLUVI's own** (from `changes/content-and-assets.md`
> and `src/images/`). The **visual finish is elevated** beyond the reference —
> smooth, vibrant, animated, **3D**, shining and futuristic (see §A).
>
> Reference screenshots: `action/reference-screenshots/`.
> When in doubt while building, read this file.

---

## 0. The three inputs — keep them straight

| Source | What we take from it |
|--------|----------------------|
| **luminpeptides.com** (reference) | Section order, page layout, component anatomy, the *commerce structure*. **Skeleton only.** |
| **`changes/` + `src/images/`** (ALLUVI) | Brand name, copy, products, prices, testimonials, contact details, all images. **Content only.** |
| **User brief** (this project) | Elevated aesthetic: smooth · vibrant · animated · **3D** · shining · futuristic. **Look & feel.** |

Rule of thumb: *structure* → Lumin. *Words / numbers / names / pictures* →
ALLUVI. *Polish, motion, depth, shine* → §A. Never put Lumin's brand name,
products, prices or marketing copy into the build.

---

## A. Aesthetic direction — smooth · vibrant · 3D · shining · futuristic

The reference is a flat, clean WordPress store. ALLUVI keeps that **clear
commerce structure** but is rebuilt as a **premium, futuristic, animated
experience**. This is the project's defining quality — execute it fully.

**Pillars**
- **Smooth** — Lenis inertia scroll; every transition on one easing curve; no
  jank (transform/opacity only); generous, confident pacing.
- **Vibrant** — a living cyan→blue→violet gradient system; aurora / gradient-
  mesh backgrounds; neon edges; rich saturated accents against deep navy.
- **3D** — a real **WebGL hero** (React Three Fiber): a slowly rotating 3D
  **DNA double-helix / molecule** with a floating product vial, soft depth-of-
  field and bloom. Product cards get **3D tilt** (pointer-tracked rotateX/Y
  with spring). Optional 3D molecule accents in section backgrounds.
- **Shining** — glossy specular highlights; animated **sheen sweeps** across
  buttons and cards on hover; glow/bloom on accents; light beams; reflective
  glass surfaces.
- **Futuristic web techniques** — glassmorphism (`backdrop-blur` panels),
  gradient-mesh + animated noise/grain overlay, scroll-driven & scroll-linked
  animations, **magnetic buttons**, a **custom cursor** with trail, masked
  text reveals, count-up, marquee, parallax layers, shimmer skeletons.

**Restraint** — futuristic, not chaotic. One bold WebGL hero moment; tasteful
glow elsewhere. Keep commerce legibility (prices, buttons, forms stay obvious).
Everything respects `prefers-reduced-motion` — WebGL falls back to a static
gradient image, animations simplify.

---

## 1. Tech stack

Reference is WordPress + WooCommerce + Impreza + RevSlider + Owl Carousel —
**not reused**. We rebuild on the lean stack from `changes/recreation-rules.md`,
**plus 3D** (explicitly requested by the user, so approved):

| Layer | Choice |
|-------|--------|
| Build | **Vite** + `@vitejs/plugin-react` |
| Framework | **React 18** + **TypeScript** |
| Styling | **Tailwind CSS** (tokens in theme + CSS vars) |
| Routing | **React Router** |
| UI animation | **Motion** (`motion/react`) |
| Scroll animation | **GSAP** + ScrollTrigger + SplitText (`@gsap/react`) |
| Smooth scroll | **Lenis** |
| **3D / WebGL** | **Three.js** + **React Three Fiber** + **@react-three/drei** (+ `@react-three/postprocessing` for bloom) |
| Misc motion | CSS keyframes (marquee, sheen, glow, ring) |
| Bespoke | Canvas 2D for cursor trail / particles |

> Adding Three.js / R3F goes beyond `recreation-rules.md §5` — it is allowed
> here because the user explicitly asked for 3D. No other libraries beyond
> this list without asking.

---

## 2. Global design tokens

Base = the reference's **light theme + dark-navy feature bands + cyan accent**,
extended with a vibrant gradient system for the futuristic finish.

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#F2F4F7` | page background (light blue-grey) |
| `--bg-alt` | `#EFF6F9` | footer / alt light band |
| `--surface` | `#FFFFFF` | cards, header, forms |
| `--navy` | `#000F24` | dark feature-section background |
| `--navy-deep` | `#061131` | footer bottom bar |
| `--ink` | `#0A1F5C` | headings on light bg |
| `--ink-soft` | `#35415B` | body text on light bg |
| `--accent` | `#02A7E3` | primary buttons, CTAs, eyebrows, links |
| `--accent-ink`| `#0B2E6B` | dark-navy buttons |
| `--violet` | `#6D4AFF` | gradient end-stop / neon accent |
| `--cyan-glow` | `#3CE0FF` | glow / bloom highlight |
| `--on-dark` | `#FFFFFF` | text on navy bands |
| `--hairline` | `rgba(10,31,92,0.12)` | borders / dividers |
| `--glass` | `rgba(255,255,255,0.08)` | glass panels on dark |
| Gradient | `linear-gradient(120deg,#02A7E3,#3CE0FF,#6D4AFF)` | brand gradient |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` | standard curve |

No hardcoded hex in components — tokens only.

---

## 3. Typography (the reference's fonts — free on Google Fonts)

| Font | Use |
|------|-----|
| **Poppins** | Hero headline + large display headings (rounded, friendly) |
| **Montserrat** | Section headings, card titles, nav, buttons (bold/extrabold) |
| **Open Sans** | Body copy, paragraphs, form labels |

Never substitute Inter / Roboto / Arial.

---

## 4. Brand & content (ALLUVI)

| Field | Value |
|-------|-------|
| Brand | **ALLUVI** — premium research peptide / supplement formulations |
| Browser title | `ALLUVI — Premium Research Formulations` |
| Address | Level 5, Dubai, UAE |
| Email | `sales@lumauae.com` *(per user — reuse the existing address)* |
| Phone / WhatsApp | +971 54 380 0625 · `https://wa.me/971543800625` |
| Currency | AED (`د.إ`) |
| Copyright | `© {year} ALLUVI. All Rights Reserved.` |
| Logo | none supplied → **`ALLUVI` wordmark** (gradient/navy). Product box art reads "ALLUVI HEALTHCARE" — match that styling. |

All home/page copy comes from `changes/content-and-assets.md` — read it
section by section and **replace every "Luma" with "ALLUVI"**. ALLUVI is a
**Dubai / AED** brand leaning on **WhatsApp ordering**; keep Lumin's layout but
this region (AED prices, WhatsApp CTAs, neutral research-use disclaimer — §6.11,
not a US-FDA one).

---

## 5. Page inventory

| Route | Page | Built from reference |
|-------|------|----------------------|
| `/` | Home | luminpeptides.com home |
| `/shop` | Shop All | `/shops/` |
| `/product/:slug` | Product detail | `/products/bpc-157/` |
| `/about` | About Us | `/about/` |
| `/faq` | FAQ | `/faq/` |
| `/contact` | Contact | (Lumin contact is a home section; give ALLUVI a page too) |
| `/cart` | Cart | basic cart |

Header nav (ALLUVI): **Home · About Us · Products · Why Us · Testimonials ·
Contact** + "Buy Now" / cart / search. (Richer than Lumin's 3-item nav — use
ALLUVI's nav; links point at the matching sections/pages.)

---

## 6. Home page — section by section

Order & layout are Lumin's; copy is ALLUVI's; finish is §A.

### 6.1 Announcement bar
Thin dark-navy strip, centred white text, full width.
Copy: `Easy WhatsApp Ordering — Fast Support Across the UAE`.

### 6.2 Header
White, **sticky**. Logo left · nav centre · pill **search bar** + cart + account
right. Over the hero it is glassy/translucent; on scroll → **solid white with
soft shadow**. Magnetic CTA, gradient underline on active nav.

### 6.3 Hero (`#home`) — the 3D moment
Full-bleed dark scene. Behind the copy: a **React Three Fiber** canvas — a
slowly rotating 3D **DNA double-helix / molecule** + a floating product vial,
with **bloom**, soft particles and a drifting light streak. Reduced-motion /
no-WebGL → static gradient-mesh image (`hero/home-hero-background-image`).
Centred stack: large **2-line headline** (Poppins, white, masked line reveal),
sub-line, single **cyan→violet gradient pill CTA** with a sheen sweep.
- Headline (typewriter, rotates 2 strings):
  1. `Your Weight-Loss Journey Reinvented by Science`
  2. `Lab-Engineered Formulations for Your Biology`
- Sub: `Sourced from verified suppliers and carefully packed for consistency, purity, and reliability.`
- CTA: `Shop Products` → `/shop`
- Motion: load-in stagger (Motion), parallax (GSAP scrub), typewriter (hook),
  WebGL idle rotation (R3F), helix/vial bob (CSS or R3F).

### 6.4 Feature badges row
Row of **overlapping glass pill cards** straddling the hero's bottom edge —
alternating white & cyan, icon + label, subtle glow. Labels:
`Purity First` · `Easy WhatsApp Ordering` · `Secure Packaging` ·
`Trusted by Thousands`. Hover lift; reveal-on-scroll stagger.

### 6.5 Featured products carousel
White band. Heading + a **horizontal carousel** of product cards (4 visible),
circular **next arrow** on the right edge.
- Card: white, soft shadow, **3D pointer tilt**, sheen on hover, product image,
  name, 5-star rating, price (AED) or `Price on enquiry`, cyan button
  `Select options` / `Add to Cart`; no-price products show `Enquire`.
- Heading: eyebrow `Our Products` · title
  `Research formulations packed with precision and care`.

### 6.6 Why Us (`#why-us`)
**Dark navy band** with an aurora/gradient-mesh glow. Small cyan **eyebrow** +
large white heading (SplitText line reveal) + paragraph, then a **bento grid
of glass cards** — one tall card left with a row of **count-up stats**, two
stacked cards right. Each card: glass surface, hairline border, icon, small-
caps kicker, title, text.
- Eyebrow: `Why Choose ALLUVI`
- Heading: `We deliver dependable, quality formulations with careful handling and supportive service.`
- Stats (count-up): `25+` High-Purity Peptides · `99%+` Purity Standard ·
  `1000s` Orders Fulfilled.
- Cards — adapt ALLUVI's "Why Choose" copy (`content-and-assets.md §3.6`):
  `Consistent Results`, `Verified Purity`, `Reliable Service`, `Quick Support`.

### 6.7 Marquee strip *(ALLUVI extra — §10)*
Thin infinite **marquee** in the navy/cyan language, gradient text, slash-
separated phrases from `content-and-assets.md §3.4`. CSS keyframes.

### 6.8 Products / Shop All preview (`#products`)
Light band. Dark-navy heading, 4-card product grid/carousel, centred **gradient
pill button** `View All Products` → `/shop`. Eyebrow `Our Products`.

### 6.9 Support / Contact (`#contact`)
**Dark navy band, two columns.**
- Left: huge white display heading + paragraph + bullet list + a secondary
  gradient pill CTA.
  - Heading: `Support You Can Count On`
  - Para: `Reach out anytime for product details, order help, or personalised assistance.`
  - Bullets: `Fast WhatsApp support` · `Order & shipping assistance` ·
    `Product-related questions`
  - CTA: `Chat on WhatsApp` → WhatsApp link
- Right: **glass contact-form card** — Name, Email, Inquiry Type (select),
  Message, `Send Message` button. Static/local, no reCAPTCHA.

### 6.10 Testimonials *(ALLUVI extra — §10)*
**Carousel** of review cards (glass cards) — reviews/names/roles from
`content-and-assets.md §3.8`, avatars from `src/images/testimonials/`.
Motion: `AnimatePresence` + autoplay.

### 6.11 Disclaimer band
Dark-navy strip, centred small text — neutral research-use line (not US-FDA):
`ALLUVI products are intended for research and laboratory use only. Not for human consumption.`

### 6.12 Footer
Light band with a faint **product-image watermark** + giant faint `ALLUVI`
wordmark behind. Logo + tagline + social icons (Facebook, Instagram); **3 link
columns** (Company / Help / Resources); **newsletter** row — email input +
gradient pill `Subscribe to Newsletter` (success `Subscribed — thank you`).
Copy/links from `content-and-assets.md §4.1`.

### 6.13 Bottom bar
Dark-navy strip: `© {year} ALLUVI. All Rights Reserved.`

### 6.14 Discount popup *(optional — §10)*
Centred glass **email-capture modal** on load: `Get 10% off your first order`
+ email field + `Claim Now`. Dismissible, once per session.

### 6.15 Floating helpers
Floating **WhatsApp button** + **back-to-top** arrow, bottom-right, with glow.

---

## 7. Other pages

### 7.1 Shop All (`/shop`)
Breadcrumb `Home / Shop`; heading `All Products`; intro line with count; **grid
of all 8 products**; same card component (3D tilt, sheen).

### 7.2 Product detail (`/product/:slug`)
Two columns.
- **Left:** large product image + **4-thumbnail strip** (click swaps main) from
  `src/images/product-gallery/<slug>_1..4`. Subtle 3D tilt / glow on the main
  image.
- **Right:** navy **tag pills** (`Research Formulation`, `High-Purity`,
  `Verified`); name; 5-star rating; price (AED) or `Price on enquiry`; optional
  variant select; green `In stock`; **quantity stepper**; primary button
  `Add to Cart` (priced) or `Enquire on WhatsApp` (no price); **Certificate /
  Details card**.
- **Trust-icon row:** `Dispatched within 24 hours`, `Verified — third-party
  tested`, `Secure packaging`, `Trusted suppliers`.
- **Tabs / accordion:** Description · Storage · Handling · Research Use — values
  from `content-and-assets.md §4.3`.
- **Related products:** `You May Also Like` — 4 others.
- Not-found: `Product not found` + `Back to Shop`.

### 7.3 About (`/about`)
Dark-navy **hero band** (`About Us` + intro, `content-and-assets.md §3.3`);
**zig-zag image/text rows** (cyan headings) — `Our Mission`, `Purity &
Transparency`, `Service for Researchers`, `Reliable Consistency` — media from
`src/images/about/` (incl. `video.mp4`); a **gradient feature card**
`A Trusted Partner in Research`; disclaimer + footer. Rows reveal alternately
from left/right.

### 7.4 FAQ (`/faq`)
Centred dark-navy heading `Frequently Asked Questions`; stack of **rounded
glass accordion rows** with `+`/`–` toggle. ALLUVI-appropriate Q&A (research
use, ordering, WhatsApp, storage, purity, UAE shipping — §10). Motion:
`AnimatePresence` expand/collapse.

### 7.5 Contact (`/contact`)
The §6.9 block as a standalone page + ALLUVI contact details. Reuse the form.

### 7.6 Cart (`/cart`)
Simple line-items + totals (AED) + checkout / WhatsApp order-summary
placeholder. Lightweight.

---

## 8. Animation ownership table

| Effect | Owner |
|--------|-------|
| Smooth scroll | Lenis |
| Header transparent→solid on scroll | Motion / CSS |
| Hero 3D scene (helix, vial, bloom) | React Three Fiber + drei + postprocessing |
| Hero load-in stagger | Motion |
| Hero typewriter headline | Custom hook |
| Hero parallax layers | GSAP ScrollTrigger (`scrub`) |
| Light-streak / glow drift | CSS keyframes |
| Section heading line reveals | GSAP SplitText + ScrollTrigger |
| Card reveal on scroll (stagger) | Motion `whileInView` (once) |
| Card 3D pointer tilt | Motion (`useMotionValue` / `useSpring`) |
| Button sheen sweep / magnetic pull | CSS + Motion |
| Count-up stats | GSAP + ScrollTrigger + hook |
| Product / testimonials carousel | Motion (drag, `AnimatePresence`, autoplay) |
| Marquee strip | CSS keyframes |
| FAQ accordion | Motion `AnimatePresence` |
| Custom cursor + trail | Canvas 2D / Motion spring |
| Page / route transitions | Motion |

Rules: animate **transform/opacity only**; reveal-on-scroll plays **once**;
masked line reveals for headings; **`prefers-reduced-motion`** neutralises all
motion and swaps WebGL for a static image; gate WebGL/canvas to capable
devices and clean up on unmount.

---

## 9. Project structure

```
src/
  main.tsx, App.tsx, index.css
  lib/        gsap.ts, images.ts, products.ts
  hooks/      useTypewriter, useCountUp, useScrollHeader, useTilt, ...
  three/      HeroScene.tsx (R3F), Helix.tsx, particles
  components/ Header, Footer, ProductCard, Img, Placeholder, Marquee,
              Cursor, MagneticButton, WhatsAppButton, BackToTop, Carousel, ...
  sections/   one file per home section
  pages/      Home, Shop, Product, About, Faq, Contact, Cart
  images/     (already populated — do not rename folders)
```

Image system: keep `src/images/<section>/` + `<Img>` resolver exactly as in
`content-and-assets.md §6–§8`; file names already match slots; empty logo slot
→ `ALLUVI` wordmark. Products → `src/lib/products.ts`, 8 items, slugs/prices/
blurbs from `content-and-assets.md §5` (slugs already match image file names).

---

## 10. Decisions made & open questions

**Decisions taken:**
1. Brand = **ALLUVI** everywhere (replaces "Luma" from the `.md`). Email stays
   `sales@lumauae.com` per the user.
2. Theme follows the **reference** (light + navy + cyan) **elevated** with the
   §A futuristic finish — not the monochrome example in `recreation-rules.md`.
3. Region = ALLUVI's — AED prices, UAE, WhatsApp ordering; Lumin's USD +
   US-FDA disclaimer replaced with neutral research-use equivalents.
4. Nav = ALLUVI's 6-item nav.
5. **Marquee** (§6.7) & **Testimonials** (§6.10) are ALLUVI sections with no
   Lumin equivalent — kept, rebuilt in the reference's visual language.
6. **Three.js / R3F** added for 3D — approved because the user asked for it.
7. FAQ questions + the two extra Why-section stats are ALLUVI-appropriate fill
   (not invented brand facts).

**Open questions (current plan in italics — override anytime):**
- Q1. Cart + checkout, or WhatsApp-enquiry only? *Plan: keep cart; WhatsApp is
  the no-price path.*
- Q2. Include the on-load discount popup? *Plan: include, optional.*
- Q3. Hero background placeholder is a non-peptide photo. *Plan: WebGL hero is
  primary; the image is only the reduced-motion fallback.*
- Q4. Keep Testimonials + Marquee extras? *Plan: keep.*

---

## 11. Verification checklist

- `tsc` / build passes — **no type errors**.
- No console errors in the browser (incl. WebGL).
- Every page + every scroll animation checked in Playwright at desktop (1440)
  and mobile (390) widths.
- `prefers-reduced-motion` disables/simplifies motion and swaps the WebGL hero
  for a static image.
- WebGL degrades gracefully where unsupported.
- Routing works on direct load + refresh (SPA rewrite).
- Keep a running `changes/changes.md` log.
