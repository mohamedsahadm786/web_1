import { Children, type ElementType, type ReactNode } from 'react';
import { motion } from 'motion/react';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Masked line-by-line reveal for headings. Each <Line> child is wrapped in an
 * overflow-hidden mask and slides up into view. Uses Motion's whileInView
 * (IntersectionObserver) so it stays reliable alongside Lenis smooth scroll.
 */
export function HeadingReveal({ children, as: Tag = 'h2', className = '' }: Props) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, i) => (
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          >
            {child}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A single masked line inside HeadingReveal. */
export function Line({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
