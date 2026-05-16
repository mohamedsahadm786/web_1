/** Inline stroke-icon set used across the site. */
export type IconName =
  | 'shield'
  | 'whatsapp'
  | 'box'
  | 'users'
  | 'truck'
  | 'badge'
  | 'check'
  | 'arrow-right'
  | 'arrow-up'
  | 'chevron-down'
  | 'plus'
  | 'minus'
  | 'cart'
  | 'user'
  | 'search'
  | 'star'
  | 'heart'
  | 'close'
  | 'facebook'
  | 'instagram'
  | 'flask'
  | 'spark';

const paths: Record<IconName, string> = {
  shield: 'M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z',
  whatsapp:
    'M3 21l1.6-4.5A8 8 0 1 1 12 20a8 8 0 0 1-3.9-1L3 21zM8.5 8.5c-.3 0-.6.1-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3 2 3.1 4.9 4.2c2.4.9 2.9.8 3.4.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4l-2-.9c-.3-.1-.5-.1-.7.2l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.6-.7-2.7-1.8-.8-.8-1.4-1.7-1.5-2-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3.2-.5 0-.2 0-.3-.1-.5l-.9-2c-.2-.5-.4-.5-.7-.5z',
  box: 'M3 8l9-5 9 5v8l-9 5-9-5V8zm9-5v18M3 8l9 5 9-5',
  users:
    'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm13 8v-1a4 4 0 0 0-3-3.8M16 4.2A3.5 3.5 0 0 1 16 11',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.8 1.8 0 1 0 0-3.5 1.8 1.8 0 0 0 0 3.5zm10 0a1.8 1.8 0 1 0 0-3.5 1.8 1.8 0 0 0 0 3.5z',
  badge: 'M12 3l2.4 2 3.1-.4 1 3 2.5 1.9-1.4 2.8.4 3.1-3 1-1.9 2.5-2.8-1.4L9 21.1l-1.9-2.5-3-1 .4-3.1L3 11.7l2.5-1.9 1-3 3.1.4L12 3zm-3 9l2 2 4-4',
  check: 'M5 12l5 5 9-11',
  'arrow-right': 'M5 12h14M13 5l7 7-7 7',
  'arrow-up': 'M12 19V5M5 12l7-7 7 7',
  'chevron-down': 'M6 9l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  cart: 'M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  user: 'M5 21v-1a6 6 0 0 1 12 0v1M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2l-5-5',
  star: 'M12 3l2.7 5.5 6 .9-4.4 4.2 1 6L12 17.8 6.7 19.6l1-6L3.3 9.4l6-.9L12 3z',
  heart: 'M12 20s-7-4.4-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.6-9 9-9 9z',
  close: 'M6 6l12 12M18 6L6 18',
  facebook: 'M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z',
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 14h9',
  spark: 'M12 3v6m0 6v6M3 12h6m6 0h6M6 6l3 3m6 6l3 3M18 6l-3 3m-6 6l-3 3',
};

const filled: Partial<Record<IconName, boolean>> = {
  star: true,
  whatsapp: true,
  facebook: true,
};

export function Icon({
  name,
  size = 22,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const isFilled = filled[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
