import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

type Crumb = { label: string; to?: string };

/** Dark-navy page banner with breadcrumb + title. */
export function PageHeader({
  title,
  crumbs,
  intro,
}: {
  title: string;
  crumbs: Crumb[];
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pb-14 pt-36">
      <div className="aurora left-[-6%] top-[-10%] h-[320px] w-[320px] bg-accent/50" />
      <div className="aurora bottom-[-30%] right-[4%] h-[340px] w-[340px] bg-violet" />
      <div className="shell relative">
        <nav className="flex flex-wrap gap-1.5 text-sm text-white/55">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex gap-1.5">
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-cyan-glow">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-3 max-w-xl text-[0.98rem] text-white/65"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
