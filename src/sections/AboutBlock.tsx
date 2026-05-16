import { motion } from 'motion/react';
import { HeadingReveal, Line } from '../components/HeadingReveal';
import { Reveal } from '../components/Reveal';
import { Img } from '../components/Img';
import { Icon } from '../components/Icon';
import { useCountUp } from '../hooks/useCountUp';

const checks = ['Verified Suppliers', 'Sealed & Protected', 'Uniform Standards'];

export function AboutBlock() {
  const { ref, value } = useCountUp(25);

  return (
    <section id="about-block" className="relative py-24">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        {/* media stack */}
        <Reveal from="right">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-hairline shadow-card">
              <Img
                name="about/home-about-stat-image"
                alt="ALLUVI research"
                className="aspect-[4/3] w-full"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 w-44 overflow-hidden rounded-2xl border-4 border-surface shadow-card sm:-right-8">
              <Img
                name="about/home-about-small-image"
                alt="ALLUVI formulation"
                className="aspect-square w-full"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -left-4 -top-6 rounded-2xl grad-brand px-5 py-4 text-white shadow-glow sm:-left-8"
            >
              <p className="font-display text-3xl font-bold">
                <span ref={ref}>{value}</span>+
              </p>
              <p className="text-[0.66rem] uppercase tracking-wider text-white/80">
                Research Peptides
              </p>
            </motion.div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Reveal>
            <p className="eyebrow">Who We Are</p>
          </Reveal>
          <HeadingReveal className="mt-4 font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl">
            <Line>Advancing modern research</Line>
            <Line>with smarter formulations</Line>
          </HeadingReveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
              ALLUVI is committed to advancing high-quality peptide and supplement
              research through clean, reliable, and precisely developed formulations —
              controlled, consistent, and easy to use for structured research applications.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
              Every formulation is created with a strong focus on purity, consistency,
              and safe handling practices.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="mt-6 flex flex-wrap gap-3">
              {checks.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-white">
                    <Icon name="check" size={12} />
                  </span>
                  <span className="font-heading text-xs font-bold text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
