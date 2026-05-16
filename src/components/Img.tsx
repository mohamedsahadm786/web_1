import { resolveImage } from '../lib/images';

type Props = {
  /** "folder/name" without extension — see src/images/ */
  name: string;
  alt: string;
  className?: string;
  fit?: 'cover' | 'contain';
  /** placeholder tint when no file exists */
  tint?: [string, string];
  loading?: 'lazy' | 'eager';
};

/** Renders the real photo, a looping muted video, or a sized placeholder. */
export function Img({ name, alt, className = '', fit = 'cover', tint, loading = 'lazy' }: Props) {
  const asset = resolveImage(name);

  if (!asset) {
    return <Placeholder className={className} tint={tint} label={alt} />;
  }

  if (asset.isVideo) {
    return (
      <video
        className={className}
        style={{ objectFit: fit }}
        src={asset.url}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      className={className}
      style={{ objectFit: fit }}
      src={asset.url}
      alt={alt}
      loading={loading}
      decoding="async"
    />
  );
}

export function Placeholder({
  className = '',
  tint,
  label,
}: {
  className?: string;
  tint?: [string, string];
  label?: string;
}) {
  const [a, b] = tint ?? ['#0a2f6c', '#02a7e3'];
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
      role="img"
      aria-label={label}
    >
      <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-white/70">
        ALLUVI
      </span>
    </div>
  );
}
