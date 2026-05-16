import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Product } from '../lib/products';
import { formatPrice } from '../lib/products';
import { Img } from './Img';
import { Stars } from './Stars';
import { Icon } from './Icon';
import { useTilt } from '../hooks/useTilt';
import { useCart } from '../lib/cart';
import { waLink } from '../lib/site';

/** Product card with 3D pointer tilt + hover sheen. */
export function ProductCard({ product }: { product: Product }) {
  const { ref, onMove, onLeave, style, glare } = useTilt(9);
  const { add } = useCart();
  const priced = product.price != null;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={style}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card transition-shadow duration-300 group-hover:shadow-glow">
        {/* glare */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: glare
              ? `radial-gradient(220px circle at ${glare.x} ${glare.y}, rgba(255,255,255,0.5), transparent 60%)`
              : undefined,
          }}
        />

        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#eef4fb] to-[#dce9f6]">
            <Img
              name={`products/${product.slug}`}
              alt={product.name}
              fit="contain"
              tint={product.tint}
              className="h-full w-full p-5 transition-transform duration-500 group-hover:scale-110"
            />
            {!priced && (
              <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 font-heading text-[0.62rem] font-bold uppercase tracking-wider text-white">
                Enquire
              </span>
            )}
          </div>
        </Link>

        <div className="space-y-2.5 p-5">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-heading text-[0.98rem] font-bold leading-snug text-ink transition-colors group-hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <Stars value={product.rating} />
          <p className="font-heading text-sm font-extrabold text-accent-ink">
            {formatPrice(product.price)}
          </p>

          {priced ? (
            <button className="btn-card" onClick={() => add(product, 1)}>
              <Icon name="cart" size={16} />
              Add to Cart
            </button>
          ) : (
            <a
              className="btn-card"
              href={waLink(`Hi ALLUVI, I'd like to enquire about ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" size={16} />
              Enquire on WhatsApp
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
