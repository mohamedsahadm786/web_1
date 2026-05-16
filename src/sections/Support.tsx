import { HeadingReveal, Line } from '../components/HeadingReveal';
import { Reveal } from '../components/Reveal';
import { ContactForm } from '../components/ContactForm';
import { Icon } from '../components/Icon';
import { waLink } from '../lib/site';

const bullets = [
  'Fast WhatsApp support',
  'Order & shipping assistance',
  'Product-related questions',
];

export function Support() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-24">
      <div className="aurora left-[-6%] top-[20%] h-[380px] w-[380px] bg-violet" />
      <div className="aurora bottom-[-10%] right-[10%] h-[420px] w-[420px] bg-accent/50" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow">Here to Guide You</p>
          </Reveal>
          <HeadingReveal className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            <Line>Support You</Line>
            <Line>Can Count On</Line>
          </HeadingReveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-white/70">
              Reach out anytime for product details, order help, or personalised
              assistance — we're here to support you smoothly.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/85">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 text-cyan-glow">
                    <Icon name="check" size={14} />
                  </span>
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <a
              href={waLink('Hi ALLUVI, I would like some help.')}
              target="_blank"
              rel="noreferrer"
              className="btn-pill mt-8"
            >
              <Icon name="whatsapp" size={18} />
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal from="left" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
