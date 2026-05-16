import { motion } from 'motion/react';
import { whyCards, whyStats } from '../lib/copy';
import { HeadingReveal, Line } from '../components/HeadingReveal';
import { Reveal } from '../components/Reveal';
import { Icon, type IconName } from '../components/Icon';
import { useCountUp } from '../hooks/useCountUp';

const icons: IconName[] = ['spark', 'badge', 'check', 'whatsapp'];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: n } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold text-cyan-glow sm:text-4xl">
        <span ref={ref}>{n.toLocaleString()}</span>
        {suffix}
      </p>
      <p className="mt-1 text-xs text-white/55">{label}</p>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy py-24">
      <div className="aurora left-[30%] top-[8%] h-[400px] w-[600px] bg-accent/40" />
      <div className="aurora bottom-0 right-[-6%] h-[360px] w-[360px] bg-violet" />

      <div className="shell relative">
        <Reveal>
          <p className="eyebrow">Why Choose ALLUVI</p>
        </Reveal>
        <HeadingReveal className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.18] text-white sm:text-4xl">
          <Line>We deliver dependable, quality formulations</Line>
          <Line>with careful handling and supportive service.</Line>
        </HeadingReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* tall stat card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col justify-between rounded-3xl p-8"
          >
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-cyan-glow">
                <Icon name="flask" size={24} />
              </span>
              <h3 className="mt-5 font-heading text-xl font-extrabold text-white">
                Built for Consistency
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Controlled processes, verified suppliers, and uniform standards — so every
                unit you receive performs the same way, every time.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {whyStats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* 2x2 card grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glass group rounded-3xl p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-cyan-glow transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={icons[i]} size={20} />
                </span>
                <p className="mt-4 font-heading text-[0.66rem] font-bold uppercase tracking-[0.18em] text-accent">
                  {card.kicker}
                </p>
                <h4 className="mt-1 font-heading text-base font-extrabold text-white">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
