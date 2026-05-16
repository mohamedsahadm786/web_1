import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { NAV } from '../lib/site';
import { useScrolled } from '../hooks/useScrolled';
import { useCart } from '../lib/cart';
import { products } from '../lib/products';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { MagneticButton } from './MagneticButton';

export function Header() {
  const scrolled = useScrolled(40);
  const { count, toggle } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const results = search.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : [];

  function goTo(to: string) {
    setMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(to);
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ease-smooth ${
        scrolled
          ? 'border-b border-hairline bg-surface/95 py-2 shadow-[0_8px_30px_-18px_rgba(10,31,92,0.4)] backdrop-blur-md'
          : 'border-b border-white/10 bg-navy/30 py-3.5 backdrop-blur-sm'
      }`}
    >
      <div className="shell flex items-center justify-between gap-4">
        <Link to="/" aria-label="ALLUVI home" onClick={() => setMenuOpen(false)}>
          <Logo dark={!scrolled} />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item.to)}
              className={`group relative font-heading text-sm font-semibold transition-colors ${
                scrolled ? 'text-ink hover:text-accent' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 grad-brand transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* search */}
          <div className="relative hidden sm:block">
            <div
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
                scrolled ? 'border-hairline bg-bg' : 'border-white/20 bg-white/10'
              }`}
            >
              <Icon
                name="search"
                size={16}
                className={scrolled ? 'text-ink-soft' : 'text-white/70'}
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                placeholder="Search products..."
                className={`w-32 bg-transparent text-sm outline-none xl:w-44 ${
                  scrolled ? 'text-ink placeholder:text-ink-soft/60' : 'text-white placeholder:text-white/50'
                }`}
              />
            </div>
            <AnimatePresence>
              {searchOpen && results.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-hairline bg-surface shadow-card"
                >
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/product/${p.slug}`}
                        className="block px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-bg hover:text-accent"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <IconButton dark={!scrolled} label="Cart" onClick={() => toggle(true)} badge={count}>
            <Icon name="cart" size={20} />
          </IconButton>

          <div className="hidden sm:block">
            <MagneticButton>
              <button
                onClick={() => goTo('/#products')}
                className="btn-pill !px-5 !py-2.5 !text-[0.82rem]"
              >
                Buy Now
              </button>
            </MagneticButton>
          </div>

          {/* burger */}
          <button
            className={`lg:hidden ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'spark'} size={24} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-hairline bg-surface lg:hidden"
          >
            <div className="shell flex flex-col py-3">
              {NAV.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goTo(item.to)}
                  className="border-b border-hairline py-3 text-left font-heading text-sm font-semibold text-ink last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => goTo('/#products')} className="btn-pill mt-3 justify-center">
                Buy Now
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({
  children,
  label,
  onClick,
  badge,
  dark,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
  dark?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors ${
        dark ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-bg'
      }`}
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[0.66rem] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
