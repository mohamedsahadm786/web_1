import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { heroHeadlines } from '../lib/copy';
import { Img } from '../components/Img';
import { Icon } from '../components/Icon';
import { MagneticButton } from '../components/MagneticButton';

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene })),
);

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(heroHeadlines);
  const webgl =
    !reduced &&
    typeof window !== 'undefined' &&
    !!document.createElement('canvas').getContext('webgl');

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy pt-28"
    >
      {/* base background image */}
      <Img
        name="hero/home-hero-background-image"
        alt=""
        className="absolute inset-0 h-full w-full opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy" />

      {/* aurora glow */}
      <div className="aurora left-[-8%] top-[10%] h-[420px] w-[420px] bg-accent" />
      <div className="aurora bottom-[-12%] right-[6%] h-[460px] w-[460px] bg-violet" />

      {/* 3D scene */}
      {webgl && (
        <div className="absolute inset-0 opacity-90">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      {/* drifting light streak */}
      <div className="pointer-events-none absolute left-0 top-2/3 h-px w-full -rotate-6 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent blur-[1px]" />

      <div className="shell relative z-10 grid items-center gap-10 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <motion.span
            {...fade(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-cyan-glow backdrop-blur"
          >
            <Icon name="spark" size={14} />
            High-Purity Research Peptides
          </motion.span>

          <motion.h1
            {...fade(0.2)}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl"
          >
            <span className="text-gradient">{typed}</span>
            {!reduced && <span className="animate-blink text-cyan-glow">|</span>}
          </motion.h1>

          <motion.p
            {...fade(0.34)}
            className="mx-auto mt-6 max-w-lg text-[1.02rem] leading-relaxed text-white/75 lg:mx-0"
          >
            Sourced from verified suppliers and carefully packed for consistency,
            purity, and reliability.
          </motion.p>

          <motion.div
            {...fade(0.46)}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton>
              <Link to="/shop" className="btn-pill">
                Shop Products
                <Icon name="arrow-right" size={18} />
              </Link>
            </MagneticButton>
            <a href="#about-block" className="btn-ghost">
              Discover ALLUVI
            </a>
          </motion.div>
        </div>

        {/* right column — 3D scene shows through; static fallback when no WebGL */}
        <div className="relative hidden min-h-[420px] lg:block">
          {!webgl && (
            <motion.div {...fade(0.5)} className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-0 -z-10 rounded-full bg-accent/25 blur-3xl" />
              <div className={reduced ? '' : 'animate-bob'}>
                <Img
                  name="hero/home-hero-product-image"
                  alt="ALLUVI research formulation"
                  fit="contain"
                  className="h-[380px] w-full drop-shadow-[0_30px_60px_rgba(2,167,227,0.4)]"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="font-heading text-[0.66rem] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <div className="mx-auto mt-2 h-9 w-5 rounded-full border border-white/25">
          <span className="mx-auto mt-1.5 block h-1.5 w-1.5 animate-bob rounded-full bg-cyan-glow" />
        </div>
      </div>
    </section>
  );
}
