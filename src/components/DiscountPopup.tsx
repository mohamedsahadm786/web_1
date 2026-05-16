import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from './Logo';
import { Icon } from './Icon';

const KEY = 'alluvi-discount-seen';

/** On-load email-capture modal. Shows once per session. */
export function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 2200);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem(KEY, '1');
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-navy/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface p-8 text-center shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-bg"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="aurora left-[-20%] top-[-20%] h-48 w-48 bg-accent/40" />

            <div className="relative">
              <div className="flex justify-center">
                <Logo />
              </div>
              {claimed ? (
                <>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                    You're in 🎉
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    Your 10% welcome discount is on its way to your inbox.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-5 text-sm font-semibold text-ink-soft">Get started with</p>
                  <p className="font-display text-5xl font-bold text-gradient">10% OFF</p>
                  <p className="mt-2 text-sm text-ink-soft">
                    Enter your email for an instant discount on your first order.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) setClaimed(true);
                    }}
                    className="mt-5 space-y-3"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-full border border-hairline bg-bg px-5 py-3 text-sm text-ink outline-none focus:border-accent"
                    />
                    <button className="btn-pill w-full justify-center">Claim Now</button>
                  </form>
                  <p className="mt-3 text-[0.7rem] text-ink-soft">
                    Research-use formulations · UAE delivery
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
