import { motion } from 'motion/react';
import { featureBadges } from '../lib/copy';
import { Icon, type IconName } from '../components/Icon';

/** Overlapping glass pill cards straddling the hero edge. */
export function FeatureBadges() {
  return (
    <div className="relative z-20 -mt-12 sm:-mt-14">
      <div className="shell grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {featureBadges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-white shadow-card backdrop-blur-md ${
              i % 2 === 0
                ? 'border border-white/10 bg-navy/90'
                : 'grad-brand'
            }`}
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                i % 2 === 0 ? 'bg-white/10 text-cyan-glow' : 'bg-white/20 text-white'
              }`}
            >
              <Icon name={badge.icon as IconName} size={20} />
            </span>
            <span className="font-heading text-[0.82rem] font-bold leading-tight text-white sm:text-sm">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
