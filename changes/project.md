# ALLUVI — Project Guide

> **Read this first.** A complete briefing on the ALLUVI website: every page,
> section, component, animation, and where to go to edit anything. If you (or
> Claude) need to change something, find it in §8 "Edit recipes" or in the
> page/section map (§6).

---

## 1. What this is

ALLUVI is a premium research-formulations (peptide) marketing + shop website.
The **layout/structure** was recreated from `luminpeptides.com`; the **brand,
content, products, and images** are ALLUVI's own; the **visual finish** is an
elevated, animated, 3D, futuristic treatment.

Companion docs:
- `changes/content-and-assets.md` — the original content + image-slot inventory.
- `changes/recreation-rules.md` — the rebuild ruleset.
- `action/build-spec.md` — the original design spec + reference screenshots.
- `changes/changes.md` — running change log.

---

## 2. Tech stack

| Layer | Tool |
|-------|------|
| Build | Vite |
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS (tokens via CSS variables) |
| Routing | React Router (`react-router-dom`) |
| UI animation | Motion (`motion/react`) |
| Scroll animation | GSAP + ScrollTrigger (`@gsap/react`) |
| Smooth scroll | Lenis |
| 3D / WebGL | Three.js + React Three Fiber + `@react-three/drei` |
| Misc motion | CSS keyframes (defined in `tailwind.config.js`) |

---

## 3. Run / build / deploy

```bash
npm install      # install dependencies
npm run dev      # dev server (http://localhost:5173 by default)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
npm run typecheck
```

Deploy: `dist/` is a static SPA. `public/_redirects` (Netlify) and
`vercel.json` (Vercel) already route all paths to `index.html` so deep links
work on refresh.

GitHub repo: `https://github.com/mohamedsahadm786/web_1` (branch `main`).

---

## 4. Project structure

```
index.html                 page shell, <title>, meta, Google Fonts
tailwind.config.js          design tokens (colours, fonts, keyframes)
vite.config.ts              build config + "@/" path alias
vercel.json, public/_redirects   SPA routing for hosts
public/favicon.svg

src/
  main.tsx                  React entry point
  App.tsx                   providers + router + global layout
  index.css                 CSS variables + base styles + component classes
  vite-env.d.ts

  lib/
    site.ts                 brand constants (name, address, email, WhatsApp, NAV)
    copy.ts                 all section text content
    products.ts             8-product catalogue + price helpers
    cart.tsx                cart state (React context + reducer)
    images.ts               image resolver for src/images/**
    webgl.ts                cached WebGL-support probe
    gsap.ts                 GSAP plugin registration

  hooks/
    useReducedMotion.ts     respects prefers-reduced-motion
    useTypewriter.ts        rotating typewriter text
    useCountUp.ts           number count-up on scroll-in
    useLenis.ts             mounts Lenis smooth scroll
    useTilt.ts              pointer-tracked 3D card tilt
    useScrolled.ts          true once page scrolled past N px

  three/
    HeroScene.tsx           the 3D hero (DNA helix + particles)

  components/               shared, reusable UI (see §7)
  sections/                 home-page sections (see §6.1)
  pages/                    one file per route (see §6.2)
  images/                   real image assets, one folder per area (see §9)
```

Path alias: `@/` → `src/` (e.g. `import { SITE } from '@/lib/site'`).

---

## 5. Design system

**Where it lives:** colour/font tokens are CSS variables in
`src/index.css` (`:root { ... }`) and mapped into Tailwind in
`tailwind.config.js`. **Never hardcode hex in components — use the tokens.**

| Token (Tailwind class) | Value | Use |
|------------------------|-------|-----|
| `bg` | `#F2F4F7` | page background |
| `bg-alt` | `#EFF6F9` | alternate light band / footer |
| `surface` | `#FFFFFF` | cards, header |
| `navy` | `#000F24` | dark sections |
| `navy-deep` | `#061131` | footer bottom bar |
| `ink` | `#0A1F5C` | headings on light bg |
| `ink-soft` | `#35415B` | body text on light bg |
| `accent` | `#02A7E3` | primary cyan — buttons, links, eyebrows |
| `accent-ink` | `#0B2E6B` | deep-navy accent |
| `violet` | `#6D4AFF` | gradient end-stop |
| `cyan-glow` | `#3CE0FF` | glow highlight |

**Fonts** (loaded in `index.html`, mapped in `tailwind.config.js`):
- `font-display` → Poppins — hero + large display headings
- `font-heading` → Montserrat — section headings, card titles, buttons, nav
- `font-body` → Open Sans — paragraphs (default body font)

**Reusable CSS classes** (defined in `src/index.css` under `@layer components`):
`shell` (centered max-width container), `btn-pill` (gradient pill button with
sheen), `btn-ghost`, `btn-card` (small product button), `eyebrow` (small-caps
label), `glass` / `glass-light` (frosted panels), `text-gradient`,
`grad-brand` (gradient background), `aurora` (blurred glow blob), `grain`
(noise overlay).

---

## 6. Page & section map

### 6.1 Home page

`src/pages/Home.tsx` just stacks the sections in order. Each section is its
own file in `src/sections/`:

| Order | Section file | What it is | Anchor id |
|-------|--------------|-----------|-----------|
| 1 | `Hero.tsx` | 3D hero — headline, typewriter, CTAs, product image | `#home` |
| 2 | `FeatureBadges.tsx` | 4 overlapping badge cards | — |
| 3 | `AboutBlock.tsx` | "Who We Are" — image stack + copy + stat | `#about-block` |
| 4 | `FeaturedProducts.tsx` | featured products carousel | — |
| 5 | `WhyUs.tsx` | dark "Why Choose ALLUVI" bento + count-up stats | `#why-us` |
| 6 | `components/Marquee.tsx` | infinite scrolling phrase strip | — |
| 7 | `ProductsPreview.tsx` | full 8-product grid | `#products` |
| 8 | `Testimonials.tsx` | review carousel | `#testimonials` |
| 9 | `Support.tsx` | dark contact block + form | `#contact` |
| 10 | `DisclaimerBand.tsx` | research-use disclaimer strip | — |

The header, footer, cart drawer, floating buttons, cursor and discount popup
are added globally in `src/App.tsx` (not per page).

### 6.2 Routes / other pages

Routes are declared in `src/App.tsx`. One file per route in `src/pages/`:

| Route | File | Notes |
|-------|------|-------|
| `/` | `Home.tsx` | home (the sections above) |
| `/shop` | `Shop.tsx` | all 8 products in a grid |
| `/product/:slug` | `Product.tsx` | product detail — gallery, tabs, related |
| `/about` | `About.tsx` | zig-zag rows + gradient card |
| `/faq` | `Faq.tsx` | accordion |
| `/contact` | `Contact.tsx` | contact details + form |
| `/cart` | `Cart.tsx` | cart line items + WhatsApp order |
| `*` | `NotFound.tsx` | 404 |

---

## 7. Component reference (`src/components/`)

| File | Purpose / where used |
|------|----------------------|
| `Header.tsx` | Sticky top nav — logo, links, search, cart, "Buy Now". Transparent over hero, solid white on scroll. Mobile menu. |
| `Footer.tsx` | 3 link columns, newsletter form, social links, watermark. |
| `AnnouncementBar.tsx` | Thin strip above the header. |
| `CartDrawer.tsx` | Slide-in cart panel. Also exports `Stepper` (qty +/−). |
| `FloatingActions.tsx` | Floating WhatsApp button + back-to-top arrow. |
| `Cursor.tsx` | Custom cursor + trailing ring (desktop, fine pointer only). |
| `DiscountPopup.tsx` | On-load "10% off" modal (once per browser session). |
| `ScrollToTop.tsx` | Resets scroll on route change; smooth-scrolls to `#anchor`. |
| `Logo.tsx` | ALLUVI wordmark (uses `images/logo/site-logo` if present). |
| `Icon.tsx` | All inline SVG icons. Add new icons to the `paths` map here. |
| `Img.tsx` | Renders a real image/video or a gradient `Placeholder`. |
| `ProductCard.tsx` | Product card — 3D tilt, hover sheen, add-to-cart / enquire. |
| `ProductCarousel.tsx` | Horizontal scroll carousel of product cards. |
| `Marquee.tsx` | Infinite phrase strip. |
| `Reveal.tsx` | Fade/slide-in-on-scroll wrapper (plays once). |
| `HeadingReveal.tsx` | Masked line-by-line heading reveal (`Line` = one line). |
| `SectionHeading.tsx` | Eyebrow + title + text block (used by most sections). |
| `PageHeader.tsx` | Dark page banner with breadcrumb (Shop/About/FAQ/etc). |
| `MagneticButton.tsx` | Wrapper that pulls its child toward the cursor. |
| `Stars.tsx` | Row of rating stars. |
| `ContactForm.tsx` | The contact form (used in Support section + Contact page). |

---

## 8. Edit recipes — "I want to change X"

| I want to change… | Go to |
|-------------------|-------|
| Brand name, address, email, phone, WhatsApp number | `src/lib/site.ts` |
| Header nav links | `NAV` array in `src/lib/site.ts` |
| Any section's text/headings/paragraphs | `src/lib/copy.ts` (most) or the section file in `src/sections/` |
| Products — name, price, slug, blurb, rating, "featured" | `src/lib/products.ts` |
| Colours / theme | tokens in `src/index.css` (`:root`) — affects whole site |
| Fonts | `index.html` (the Google Fonts link) + `tailwind.config.js` (`fontFamily`) |
| A product photo / hero image / testimonial avatar | drop a file in `src/images/<folder>/` — see §9 |
| The hero headline / typewriter strings | `heroHeadlines` in `src/lib/copy.ts` |
| The hero 3D scene (DNA helix, particles) | `src/three/HeroScene.tsx` |
| The hero product image (size, rotation) | `src/sections/Hero.tsx` (the right-column `<Img>`) |
| The 4 feature badge cards | `featureBadges` in `src/lib/copy.ts` + styling in `src/sections/FeatureBadges.tsx` |
| "Why Us" cards or the count-up stats | `whyCards` / `whyStats` in `src/lib/copy.ts` |
| Marquee phrases | `marqueePhrases` in `src/lib/copy.ts` |
| Testimonials (name, role, quote, photo) | `testimonials` in `src/lib/copy.ts` |
| FAQ questions/answers | `faqs` in `src/lib/copy.ts` |
| About-page rows | `aboutRows` in `src/lib/copy.ts` |
| Product-detail tabs / detail rows / trust icons | `productDetails`, `trustIcons` in `src/lib/copy.ts`; tab text in `src/pages/Product.tsx` |
| Footer columns / newsletter text | `src/components/Footer.tsx` |
| Add / remove / reorder a home section | `src/pages/Home.tsx` |
| Add a new page / route | create a file in `src/pages/`, then register it in `src/App.tsx` |
| An icon | `src/components/Icon.tsx` (`paths` map) |
| The discount popup wording or timing | `src/components/DiscountPopup.tsx` |
| Buttons' look (pill / ghost / card) | `.btn-pill` / `.btn-ghost` / `.btn-card` in `src/index.css` |

---

## 9. Image system

All real images live in `src/images/`, one folder per area. A resolver
(`src/lib/images.ts`) auto-imports everything; the `<Img>` component
(`src/components/Img.tsx`) looks an image up by `"folder/name"` **without the
extension**.

**To swap an image:** drop a file into the right folder with the exact name
(extension can be `.png/.jpg/.webp/.svg`, or `.mp4/.webm` for video). No code
change needed. A missing file shows a gradient placeholder.

| Folder | Holds | Naming |
|--------|-------|--------|
| `logo/` | site logo | `site-logo` (else the ALLUVI wordmark shows) |
| `hero/` | hero background + product render | `home-hero-background-image`, `home-hero-product-image` |
| `about/` | About-section media (image or video) | `video`, `home-about-stat-image`, `home-about-small-image` |
| `products/` | one image per product | named after the product **slug** |
| `product-gallery/` | 4 images per product | `<slug>_1` … `<slug>_4` |
| `testimonials/` | reviewer avatars | `home-testimonial-<name>` |
| `extra/` | misc tiles/backgrounds | `E_1`, `E_2`, `E_3` |

Product slugs (the single source of truth, in `src/lib/products.ts`):
`bpc-157-tb-500-40mg`, `nad-1000mg`, `glow-70mg`, `retatrutide-20mg`,
`retatrutide-40mg`, `tirzepatide-20mg`, `tirzepatide-40mg`, `tirzepatide-5mg`.

---

## 10. Animation & motion catalog

Map of each effect → the file/owner that implements it:

| Effect | Owner |
|--------|-------|
| Smooth (inertia) scroll | Lenis — `hooks/useLenis.ts`, mounted in `App.tsx` |
| Header transparent → solid on scroll | `components/Header.tsx` + `hooks/useScrolled.ts` |
| 3D DNA helix + particles | `three/HeroScene.tsx` (React Three Fiber) |
| Hero load-in stagger | Motion in `sections/Hero.tsx` (`fade()` helper) |
| Hero typewriter headline | `hooks/useTypewriter.ts` |
| Floating / bobbing product image | CSS keyframe `animate-bob` (`tailwind.config.js`) |
| Masked heading line reveals | `components/HeadingReveal.tsx` (Motion) |
| Reveal-on-scroll (fade/slide, once) | `components/Reveal.tsx` (Motion `whileInView`) |
| Card 3D pointer tilt | `hooks/useTilt.ts` → used by `components/ProductCard.tsx` |
| Button sheen sweep | `.btn-pill` CSS in `index.css` + `sheen` keyframe |
| Magnetic buttons | `components/MagneticButton.tsx` (Motion spring) |
| Count-up numbers | `hooks/useCountUp.ts` → `sections/WhyUs.tsx`, `AboutBlock.tsx` |
| Infinite marquee | CSS `marquee` keyframe → `components/Marquee.tsx` |
| Testimonials carousel | `sections/Testimonials.tsx` (Motion `AnimatePresence`) |
| FAQ accordion | `src/pages/Faq.tsx` (Motion `AnimatePresence`) |
| Custom cursor + trail | `components/Cursor.tsx` |
| Cart drawer slide-in | `components/CartDrawer.tsx` (Motion) |
| Aurora glow blobs / grain | `.aurora` / `.grain` CSS in `index.css` |

CSS keyframes (`marquee`, `sheen`, `bob`, `drift`, `spin-slow`, `blink`) are
defined in `tailwind.config.js` under `theme.extend.keyframes`/`animation`.

**Accessibility:** `index.css` has a `prefers-reduced-motion` block that
neutralises animation, and `hooks/useReducedMotion.ts` lets components
disable motion / the 3D scene. Keep both when editing.

---

## 11. The 3D hero scene

`src/three/HeroScene.tsx` — a React Three Fiber `<Canvas>` containing:
- **`Helix`** — a rotating DNA double-helix of emissive spheres + rungs.
- **`Particles`** — a drifting point field.

It is **lazy-loaded** in `sections/Hero.tsx` and only rendered when WebGL is
available (`lib/webgl.ts`) and reduced-motion is off; otherwise a static
product image shows. To tune the scene, edit `HeroScene.tsx` (sphere count,
radius, colours, rotation speed). To change the floating product image, edit
the right-column `<Img>` in `Hero.tsx`.

> Note: `lib/webgl.ts` probes WebGL **once** and caches the result — important,
> because probing on every render leaks WebGL contexts and makes the 3D canvas
> blink. Do not move that probe inline into a render.

---

## 12. Conventions & guard-rails

- No hardcoded hex colours in components — use the design tokens.
- Animate `transform` / `opacity` only (not `width`/`height`/`top`/`left`).
- Reveal-on-scroll animations play once.
- Always keep `prefers-reduced-motion` handling intact.
- Images go through `src/images/` + `<Img>` — never inline base64.
- Register GSAP plugins only in `src/lib/gsap.ts`.
- After changes, run `npm run build` (type-check must pass) and check the
  site in a browser at desktop and mobile widths.
- Log notable changes in `changes/changes.md`.
