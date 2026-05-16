import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** delay in seconds */
  delay?: number;
  /** travel direction */
  from?: 'up' | 'down' | 'left' | 'right';
  as?: 'div' | 'li' | 'span';
};

const offset = {
  up: { y: 38, x: 0 },
  down: { y: -38, x: 0 },
  left: { x: 54, y: 0 },
  right: { x: -54, y: 0 },
};

/** Reveal-on-scroll wrapper. Plays once. Respects reduced motion via CSS. */
export function Reveal({ children, className, delay = 0, from = 'up', as = 'div' }: Props) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...offset[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
