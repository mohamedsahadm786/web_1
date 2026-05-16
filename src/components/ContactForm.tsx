import { useState } from 'react';
import { Icon } from './Icon';

const inquiryTypes = ['General Inquiry', 'Product Question', 'Order Help', 'Bulk / Wholesale'];

/** Static contact form — submits locally with a success state. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="grid place-items-center rounded-3xl border border-hairline bg-surface p-10 text-center shadow-card">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-4 font-heading text-lg font-extrabold text-ink">Message sent</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Thanks for reaching out — our team typically replies within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-hairline bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input required className="field" placeholder="Your name" />
        </Field>
        <Field label="Email Address">
          <input required type="email" className="field" placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="Inquiry Type" className="mt-4">
        <select className="field appearance-none">
          {inquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Message" className="mt-4">
        <textarea rows={4} required className="field resize-none" placeholder="How can we help?" />
      </Field>
      <button className="btn-pill mt-5 w-full justify-center">Send Message</button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        We typically respond within 24 hours.
      </p>

      <style>{`
        .field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--hairline);
          background: var(--bg);
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s var(--ease);
        }
        .field:focus { border-color: var(--accent); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
