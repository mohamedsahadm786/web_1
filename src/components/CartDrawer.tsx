import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { CURRENCY } from '../lib/products';
import { Icon } from './Icon';

/** Slide-in cart drawer. */
export function CartDrawer() {
  const { lines, open, toggle, setQty, remove, total, count } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-navy/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggle(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[81] flex h-full w-[min(420px,92vw)] flex-col bg-surface shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 240, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <h3 className="font-heading text-lg font-extrabold text-ink">
                Your Cart ({count})
              </h3>
              <button
                onClick={() => toggle(false)}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-bg"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <Icon name="cart" size={42} className="mx-auto text-hairline" />
                    <p className="mt-3 text-sm text-ink-soft">Your cart is empty.</p>
                    <Link
                      to="/shop"
                      onClick={() => toggle(false)}
                      className="mt-4 inline-block font-heading text-sm font-bold text-accent"
                    >
                      Browse products →
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((l) => (
                    <li key={l.slug} className="flex gap-3 rounded-xl border border-hairline p-3">
                      <div className="flex-1">
                        <p className="font-heading text-sm font-bold text-ink">{l.name}</p>
                        <p className="text-xs text-ink-soft">
                          {CURRENCY} {l.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Stepper
                            value={l.qty}
                            onChange={(q) => setQty(l.slug, q)}
                          />
                          <button
                            onClick={() => remove(l.slug)}
                            className="ml-auto text-xs font-semibold text-ink-soft hover:text-accent"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="font-heading text-sm font-extrabold text-accent-ink">
                        {CURRENCY} {(l.price * l.qty).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-hairline px-6 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-heading text-sm font-bold text-ink-soft">Subtotal</span>
                  <span className="font-heading text-lg font-extrabold text-ink">
                    {CURRENCY} {total.toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => toggle(false)}
                  className="btn-pill w-full justify-center"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-hairline px-1.5 py-1">
      <button
        aria-label="Decrease"
        onClick={() => onChange(value - 1)}
        className="grid h-6 w-6 place-items-center rounded-full text-ink hover:bg-bg"
      >
        <Icon name="minus" size={14} />
      </button>
      <span className="w-5 text-center font-heading text-sm font-bold text-ink">{value}</span>
      <button
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="grid h-6 w-6 place-items-center rounded-full text-ink hover:bg-bg"
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
