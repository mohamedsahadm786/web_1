import { Icon } from './Icon';

/** Static row of rating stars. */
export function Stars({ value = 5, size = 15 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-accent" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={size} className={i < value ? '' : 'opacity-25'} />
      ))}
    </span>
  );
}
