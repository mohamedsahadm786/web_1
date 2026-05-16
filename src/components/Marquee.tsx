import { marqueePhrases } from '../lib/copy';
import { Icon } from './Icon';

/** Infinite scrolling phrase strip. */
export function Marquee() {
  const run = [...marqueePhrases, ...marqueePhrases];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy py-5">
      <div className="flex w-max animate-marquee gap-8">
        {run.map((phrase, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-heading text-lg font-extrabold uppercase tracking-wide text-gradient sm:text-2xl">
              {phrase}
            </span>
            <Icon name="spark" size={22} className="text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
