/** Brand-wide constants for ALLUVI. */
export const SITE = {
  brand: 'ALLUVI',
  tagline: 'Premium Research Formulations',
  description:
    'Premium research formulations sourced from verified suppliers — consistency, purity, and reliability.',
  address: 'Level 5, Dubai, UAE',
  email: 'sales@lumauae.com',
  phone: '+971 54 380 0625',
  whatsapp: 'https://wa.me/971543800625',
  social: {
    facebook: '#',
    instagram: '#',
  },
} as const;

export const NAV = [
  { label: 'Home', to: '/#home' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/#products' },
  { label: 'Why Us', to: '/#why-us' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/contact' },
] as const;

export const year = new Date().getFullYear();

/** Build a WhatsApp deep-link with a prefilled message. */
export const waLink = (message: string) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
