import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { getProduct, products, formatPrice } from '../lib/products';
import { productDetails, trustIcons } from '../lib/copy';
import { Img } from '../components/Img';
import { Stars } from '../components/Stars';
import { Icon, type IconName } from '../components/Icon';
import { Stepper } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { useCart } from '../lib/cart';
import { waLink } from '../lib/site';

const tags = ['Research Formulation', 'High-Purity', 'Verified'];
const tabNames = ['Description', 'Storage', 'Handling', 'Research Use'] as const;

export function Product() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<(typeof tabNames)[number]>('Description');

  const related = useMemo(
    () => products.filter((p) => p.slug !== slug).slice(0, 4),
    [slug],
  );

  if (!product) {
    return (
      <div className="grid min-h-[70vh] place-items-center pt-24 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Product not found</h1>
          <Link to="/shop" className="btn-pill mt-6">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const priced = product.price != null;
  const thumbs = [1, 2, 3, 4];

  const tabBody: Record<(typeof tabNames)[number], string> = {
    Description: product.blurb,
    Storage:
      'Store in a cool, dry place away from direct light. Sealed and protected packaging preserves freshness, stability, and overall product integrity.',
    Handling:
      'Every unit is produced under controlled processes with uniform standards and handled with safe, documented practices from packing to delivery.',
    'Research Use':
      'This formulation is supplied strictly for research and laboratory use. It is not intended for human or animal consumption.',
  };

  return (
    <>
      {/* breadcrumb */}
      <section className="bg-bg pb-2 pt-32">
        <div className="shell">
          <nav className="flex flex-wrap gap-1.5 text-sm text-ink-soft">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-10">
        <div className="shell grid gap-12 lg:grid-cols-2">
          {/* gallery */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-[#eef4fb] to-[#dce9f6] shadow-card"
              >
                <Img
                  name={`product-gallery/${product.slug}_${active + 1}`}
                  alt={product.name}
                  fit="contain"
                  tint={product.tint}
                  className="aspect-[3/2] w-full p-8"
                />
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {thumbs.map((n, i) => (
                <button
                  key={n}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl border-2 bg-gradient-to-br from-[#eef4fb] to-[#dce9f6] transition-colors ${
                    active === i ? 'border-accent' : 'border-hairline'
                  }`}
                >
                  <Img
                    name={`product-gallery/${product.slug}_${n}`}
                    alt={`${product.name} view ${n}`}
                    fit="contain"
                    tint={product.tint}
                    className="aspect-[3/2] w-full p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-navy px-3 py-1 font-heading text-[0.66rem] font-bold uppercase tracking-wider text-white"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <Stars value={product.rating} />
              <span className="text-xs text-ink-soft">Verified research formulation</span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-accent-ink">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> In stock
            </p>

            <p className="mt-5 text-[0.96rem] leading-relaxed text-ink-soft">{product.blurb}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              {priced && <Stepper value={qty} onChange={setQty} />}
              {priced ? (
                <button
                  onClick={() => add(product, qty)}
                  className="btn-pill flex-1 justify-center sm:flex-none"
                >
                  <Icon name="cart" size={18} />
                  Add to Cart
                </button>
              ) : (
                <a
                  href={waLink(`Hi ALLUVI, I'd like to enquire about ${product.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill flex-1 justify-center sm:flex-none"
                >
                  <Icon name="whatsapp" size={18} />
                  Enquire on WhatsApp
                </a>
              )}
            </div>

            {/* details accordion */}
            <dl className="mt-7 divide-y divide-hairline rounded-2xl border border-hairline">
              {productDetails.map((d) => (
                <div key={d.label} className="flex justify-between px-4 py-3">
                  <dt className="font-heading text-sm font-bold text-ink">{d.label}</dt>
                  <dd className="text-sm text-ink-soft">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* trust icons */}
      <section className="bg-bg-alt py-10">
        <div className="shell grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustIcons.map((t) => (
            <div key={t.label} className="flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <Icon name={t.icon as IconName} size={24} />
              </span>
              <p className="mt-2 font-heading text-xs font-bold text-ink">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* tabs */}
      <section className="py-14">
        <div className="shell">
          <div className="flex flex-wrap gap-2 border-b border-hairline">
            {tabNames.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-4 py-3 font-heading text-sm font-bold transition-colors ${
                  tab === t ? 'text-accent' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 grad-brand"
                  />
                )}
              </button>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[0.96rem] leading-relaxed text-ink-soft">
            {tabBody[tab]}
          </p>
        </div>
      </section>

      {/* related */}
      <section className="bg-bg-alt py-20">
        <div className="shell">
          <SectionHeading eyebrow="Keep Exploring" title="You may also like" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
