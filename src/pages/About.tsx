import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { aboutRows } from '../lib/copy';
import { Img } from '../components/Img';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { Marquee } from '../components/Marquee';

export function About() {
  return (
    <>
      <PageHeader
        title="About ALLUVI"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        intro="Advancing modern research with clean, reliable, and precisely developed formulations — built for purity, consistency, and trust."
      />

      {/* zig-zag rows */}
      <section className="space-y-20 py-20 sm:space-y-28">
        {aboutRows.map((row, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={row.title} className="shell grid items-center gap-12 lg:grid-cols-2">
              <Reveal from={flip ? 'left' : 'right'} className={flip ? 'lg:order-2' : ''}>
                <div className="overflow-hidden rounded-3xl border border-hairline shadow-card">
                  <Img
                    name={row.image}
                    alt={row.title}
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </Reveal>
              <Reveal from={flip ? 'right' : 'left'} className={flip ? 'lg:order-1' : ''}>
                <p className="eyebrow">{row.eyebrow}</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                  {row.title}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{row.body}</p>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* trusted-partner gradient card */}
      <section className="pb-24">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl grad-brand p-10 text-white sm:p-14">
              <div className="aurora right-[-6%] top-[-30%] h-72 w-72 bg-white/30" />
              <div className="relative max-w-2xl">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  A Trusted Partner in Research
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                  Built for researchers who value precision
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-white/85">
                  From verified sourcing to sealed, protected delivery, ALLUVI is committed
                  to consistency and reliability at every step — so your research moves
                  forward with confidence.
                </p>
                <Link
                  to="/shop"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-sm font-bold text-accent-ink transition-transform hover:-translate-y-0.5"
                >
                  Explore Products
                  <Icon name="arrow-right" size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Questions? We're here to help"
            text="Reach out anytime for product details, order help, or personalised assistance."
          />
          <Reveal className="mt-7 text-center">
            <Link to="/contact" className="btn-pill">
              Contact ALLUVI
              <Icon name="arrow-right" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Marquee />
    </>
  );
}
