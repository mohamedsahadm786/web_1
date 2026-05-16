# Changes Log

## Initial build — ALLUVI site (design recreated from luminpeptides.com)

**Stack:** Vite + React 18 + TypeScript + Tailwind + Motion + GSAP + Lenis +
Three.js / React Three Fiber. See `action/build-spec.md` for the full spec.

### Scaffold
- Vite project, TS configs, Tailwind theme with ALLUVI design tokens, Google
  Fonts (Poppins / Montserrat / Open Sans), `index.css` design system.

### Core libs (`src/lib`)
- `site.ts` — brand constants (ALLUVI, Dubai, AED, WhatsApp), nav, `waLink()`.
- `images.ts` — `import.meta.glob` resolver for `src/images/**`.
- `products.ts` — 8-product catalogue, AED prices, `formatPrice()`.
- `copy.ts` — all section copy (mapped from `content-and-assets.md`).
- `cart.tsx` — cart context (add / remove / qty / drawer).
- `gsap.ts` — GSAP + ScrollTrigger registration.

### Hooks
- `useReducedMotion`, `useTypewriter`, `useCountUp`, `useLenis`, `useTilt`,
  `useScrolled`.

### Components
- Header (sticky, transparent→solid, search, magnetic CTA, mobile menu),
  Footer (3 columns + newsletter + watermark), CartDrawer, ProductCard
  (3D tilt + sheen), ProductCarousel, Marquee, Cursor (custom + trail),
  MagneticButton, HeadingReveal (masked line reveal), Reveal, Img/Placeholder,
  Logo, Icon set, Stars, SectionHeading, PageHeader, ContactForm,
  AnnouncementBar, DiscountPopup, FloatingActions (WhatsApp + back-to-top).

### 3D — `src/three/HeroScene.tsx`
- React Three Fiber hero: rotating DNA double-helix, floating glass vial,
  drifting particle field. Lazy-loaded; WebGL-capability gated with a static
  image fallback for reduced motion / no-WebGL.

### Pages & sections
- Home: Hero, FeatureBadges, AboutBlock, FeaturedProducts, WhyUs, Marquee,
  ProductsPreview, Testimonials, Support, DisclaimerBand.
- Routes: `/`, `/shop`, `/product/:slug`, `/about`, `/faq`, `/contact`,
  `/cart`, 404. Lazy-loaded with React Router.

### Fixes during verification
- Removed `@react-three/postprocessing` (EffectComposer crashed with a null
  `alpha` read); glow now via emissive materials + CSS aurora.
- Rewrote `HeadingReveal` from GSAP ScrollTrigger to Motion `whileInView` —
  GSAP version left headings stuck hidden on jump-scroll.
- Resized / repositioned the 3D helix so it no longer covers the headline.
- Fixed footer watermark overlapping the copyright bar.

### Verified
- `tsc -b` and `vite build` pass clean.
- Home / Shop / Product / About / FAQ / Contact checked in Playwright at
  1440px and 390px — no console errors on fresh load.
- SPA rewrites added (`public/_redirects`, `vercel.json`).

> Known dev-only note: repeated HMR reloads accumulate WebGL contexts and
> eventually log "Too many active WebGL contexts" — this does not occur in a
> production build (single context, no HMR).
