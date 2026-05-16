import { resolveImage } from '../lib/images';

/** ALLUVI logo — uses src/images/logo/site-logo if present, else a wordmark. */
export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const asset = resolveImage('logo/site-logo');

  if (asset && !asset.isVideo) {
    return <img src={asset.url} alt="ALLUVI" className={`h-9 w-auto ${className}`} />;
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#02A7E3" />
            <stop offset="0.5" stopColor="#3CE0FF" />
            <stop offset="1" stopColor="#6D4AFF" />
          </linearGradient>
        </defs>
        <path d="M32 8 L54 56 H42 L32 30 L22 56 H10 Z" fill="url(#lg)" />
      </svg>
      <span
        className="font-heading text-xl font-extrabold tracking-[0.16em]"
        style={{ color: dark ? '#fff' : 'var(--ink)' }}
      >
        ALLUVI
      </span>
    </span>
  );
}
