import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE, year } from '../lib/site';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { Img } from './Img';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Products', to: '/shop' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Support', to: '/contact' },
      { label: 'Why Us', to: '/#why-us' },
      { label: 'Testimonials', to: '/#testimonials' },
      { label: 'Cart', to: '/cart' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Research Use', to: '/faq' },
      { label: 'Shop All', to: '/shop' },
      { label: 'Home', to: '/' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-bg-alt">
      {/* watermark */}
      <Img
        name="extra/E_1"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[16vw] font-extrabold leading-none text-ink/[0.045]"
      >
        ALLUVI
      </span>

      <div className="shell relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Advancing scientific research with premium-quality formulations — trusted for
            purity, consistency, and reliability.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={SITE.social.facebook} icon="facebook" label="Facebook" />
            <SocialLink href={SITE.social.instagram} icon="instagram" label="Instagram" />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-ink">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* newsletter */}
      <div className="shell relative pb-14">
        <div className="rounded-2xl border border-hairline bg-surface p-7 shadow-card md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="eyebrow">Get Latest Offers</p>
            <h3 className="mt-1.5 font-heading text-xl font-extrabold text-ink">
              Don't miss the latest offers
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Be the first to know about new products, promotions, and updates from ALLUVI.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
            className="mt-5 flex w-full max-w-md gap-2 md:mt-0"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full border border-hairline bg-bg px-5 py-3 text-sm text-ink outline-none focus:border-accent"
            />
            <button className="btn-pill shrink-0 !px-6">
              {done ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
        {done && (
          <p className="mt-3 text-center text-sm font-semibold text-accent">
            Subscribed — thank you.
          </p>
        )}
      </div>

      <div className="relative z-10 bg-navy-deep py-5 text-center">
        <p className="text-sm text-white/70">
          © {year} {SITE.brand}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: 'facebook' | 'instagram'; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-ink transition-all hover:border-accent hover:bg-accent hover:text-white"
    >
      <Icon name={icon} size={18} />
    </a>
  );
}
