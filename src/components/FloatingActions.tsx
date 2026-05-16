import { AnimatePresence, motion } from 'motion/react';
import { useScrolled } from '../hooks/useScrolled';
import { waLink } from '../lib/site';
import { Icon } from './Icon';

/** Floating WhatsApp button + back-to-top arrow. */
export function FloatingActions() {
  const scrolled = useScrolled(600);

  return (
    <div className="fixed bottom-5 right-5 z-[75] flex flex-col items-center gap-3">
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-surface text-ink shadow-card transition-colors hover:text-accent"
          >
            <Icon name="arrow-up" size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={waLink('Hi ALLUVI, I have a question about your research formulations.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_-4px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <Icon name="whatsapp" size={28} />
      </a>
    </div>
  );
}
