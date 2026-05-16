import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageHeader } from '../components/PageHeader';
import { faqs } from '../lib/copy';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        intro="Everything you need to know about ALLUVI formulations, ordering, and support."
      />
      <section className="py-20">
        <div className="shell mx-auto max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-surface transition-colors ${
                    isOpen ? 'border-accent' : 'border-hairline'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-heading text-[0.98rem] font-bold text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${
                        isOpen ? 'grad-brand text-white' : 'bg-bg text-accent'
                      }`}
                    >
                      <Icon name={isOpen ? 'minus' : 'plus'} size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-[0.94rem] leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
