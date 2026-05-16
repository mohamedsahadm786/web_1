import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useCart } from '../lib/cart';
import { CURRENCY } from '../lib/products';
import { Stepper } from '../components/CartDrawer';
import { Icon } from '../components/Icon';
import { waLink } from '../lib/site';

export function Cart() {
  const { lines, setQty, remove, total, clear } = useCart();

  const orderMessage =
    'Hi ALLUVI, I would like to order:\n' +
    lines.map((l) => `• ${l.name} ×${l.qty}`).join('\n') +
    `\nTotal: ${CURRENCY} ${total.toFixed(2)}`;

  return (
    <>
      <PageHeader title="Your Cart" crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <section className="py-16">
        <div className="shell">
          {lines.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-hairline bg-surface py-20 text-center">
              <Icon name="cart" size={48} className="text-hairline" />
              <p className="mt-4 font-heading text-lg font-bold text-ink">Your cart is empty</p>
              <p className="mt-1 text-sm text-ink-soft">
                Browse our research formulations to get started.
              </p>
              <Link to="/shop" className="btn-pill mt-6">
                Shop Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-4">
                {lines.map((l) => (
                  <div
                    key={l.slug}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-hairline bg-surface p-5"
                  >
                    <div className="min-w-[160px] flex-1">
                      <Link
                        to={`/product/${l.slug}`}
                        className="font-heading text-[0.98rem] font-bold text-ink hover:text-accent"
                      >
                        {l.name}
                      </Link>
                      <p className="text-sm text-ink-soft">
                        {CURRENCY} {l.price.toFixed(2)}
                      </p>
                    </div>
                    <Stepper value={l.qty} onChange={(q) => setQty(l.slug, q)} />
                    <p className="w-24 text-right font-heading text-sm font-extrabold text-accent-ink">
                      {CURRENCY} {(l.price * l.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => remove(l.slug)}
                      aria-label="Remove"
                      className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-bg hover:text-accent"
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={clear}
                  className="font-heading text-sm font-semibold text-ink-soft hover:text-accent"
                >
                  Clear cart
                </button>
              </div>

              <aside className="h-fit rounded-2xl border border-hairline bg-surface p-6 shadow-card">
                <h3 className="font-heading text-lg font-extrabold text-ink">Order Summary</h3>
                <div className="mt-4 space-y-2 border-b border-hairline pb-4 text-sm">
                  <Row label="Subtotal" value={`${CURRENCY} ${total.toFixed(2)}`} />
                  <Row label="Shipping" value="Calculated on enquiry" />
                </div>
                <div className="flex justify-between py-4">
                  <span className="font-heading font-bold text-ink">Total</span>
                  <span className="font-display text-xl font-bold text-ink">
                    {CURRENCY} {total.toFixed(2)}
                  </span>
                </div>
                <a
                  href={waLink(orderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill w-full justify-center"
                >
                  <Icon name="whatsapp" size={18} />
                  Complete Order on WhatsApp
                </a>
                <p className="mt-3 text-center text-xs text-ink-soft">
                  Secure ordering — finalise details with our team.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink-soft">
      <span>{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
