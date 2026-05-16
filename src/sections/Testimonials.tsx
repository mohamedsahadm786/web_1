import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { testimonials } from '../lib/copy';
import { SectionHeading } from '../components/SectionHeading';
import { Img } from '../components/Img';
import { Stars } from '../components/Stars';
import { Icon } from '../components/Icon';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Testimonials() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, reduced]);

  const item = testimonials[index];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-bg-alt py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Trusted by Thousands"
          title="What our customers say"
          text="Trusted feedback from people who choose ALLUVI for purity and precision every time."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-hairline bg-surface p-8 shadow-card sm:p-10"
              >
                <Icon name="spark" size={28} className="text-accent/30" />
                <p className="mt-4 font-display text-lg leading-relaxed text-ink sm:text-xl">
                  "{item.quote}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Img
                    name={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full"
                  />
                  <div>
                    <p className="font-heading text-sm font-extrabold text-ink">{item.name}</p>
                    <p className="text-xs text-ink-soft">{item.role}</p>
                  </div>
                  <div className="ml-auto">
                    <Stars value={5} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface text-ink transition-colors hover:bg-navy hover:text-white"
            >
              <Icon name="arrow-right" size={18} className="rotate-180" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-7 bg-accent' : 'w-2 bg-hairline'
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface text-ink transition-colors hover:bg-navy hover:text-white"
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
