import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
};

/** Eyebrow + title + optional supporting text block. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  dark = false,
  className = '',
}: Props) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`mt-3 font-display text-3xl font-bold leading-[1.12] sm:text-4xl md:text-[2.6rem] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className={`mt-4 text-[0.98rem] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
