import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';
import { Icon, type IconName } from '../components/Icon';
import { SITE, waLink } from '../lib/site';

const details: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'box', label: 'Address', value: SITE.address },
  { icon: 'whatsapp', label: 'Phone / WhatsApp', value: SITE.phone, href: SITE.whatsapp },
  { icon: 'spark', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
];

export function Contact() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        intro="Reach out anytime for product details, order help, or personalised assistance — we're here to support you smoothly."
      />
      <section className="py-20">
        <div className="shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Contact Details</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Let's talk about your research
            </h2>
            <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
              Transparent communication, every step of the way.
            </p>

            <ul className="mt-7 space-y-4">
              {details.map((d) => (
                <li key={d.label}>
                  <Reveal>
                    <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface p-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                        <Icon name={d.icon} size={20} />
                      </span>
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-wider text-ink-soft">
                          {d.label}
                        </p>
                        {d.href ? (
                          <a
                            href={d.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-heading text-sm font-bold text-ink hover:text-accent"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <p className="font-heading text-sm font-bold text-ink">{d.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <a
              href={waLink('Hi ALLUVI, I would like to chat.')}
              target="_blank"
              rel="noreferrer"
              className="btn-pill mt-7"
            >
              <Icon name="whatsapp" size={18} />
              Chat With Us
            </a>
          </div>

          <Reveal from="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
