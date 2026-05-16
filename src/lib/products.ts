/** ALLUVI product catalogue. Slug = source of truth for URL + image names. */
export type Product = {
  slug: string;
  name: string;
  /** AED price as string, or null = "Price on enquiry". */
  price: number | null;
  /** placeholder gradient tint [from, to] */
  tint: [string, string];
  blurb: string;
  rating: number;
  featured?: boolean;
};

export const CURRENCY = 'د.إ';

export const products: Product[] = [
  {
    slug: 'bpc-157-tb-500-40mg',
    name: 'BPC-157 & TB-500 40mg',
    price: 999,
    tint: ['#0a4f8c', '#02a7e3'],
    rating: 5,
    featured: true,
    blurb:
      'A dual research blend prepared under controlled conditions for consistent, reliable handling. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'nad-1000mg',
    name: 'NAD+ 1,000mg',
    price: null,
    tint: ['#3a2f8c', '#6d4aff'],
    rating: 5,
    featured: true,
    blurb:
      'NAD+ (Nicotinamide Adenine Dinucleotide) research formulation for laboratory analysis and in vitro studies only. Provided exclusively for controlled laboratory R&D applications.',
  },
  {
    slug: 'glow-70mg',
    name: 'Glow 70mg',
    price: 1199,
    tint: ['#0a6f8c', '#3ce0ff'],
    rating: 5,
    featured: true,
    blurb:
      'A higher-capacity formulation packed securely to preserve freshness and stability. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'retatrutide-20mg',
    name: 'Retatrutide 20mg',
    price: null,
    tint: ['#0a3f8c', '#02a7e3'],
    rating: 5,
    blurb:
      'Developed with a strong focus on purity, consistency, and safe handling practices. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'retatrutide-40mg',
    name: 'Retatrutide 40mg',
    price: 1990,
    tint: ['#1a2f7c', '#6d4aff'],
    rating: 5,
    featured: true,
    blurb:
      'A research formulation produced with uniform standards for a dependable experience. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'tirzepatide-20mg',
    name: 'Tirzepatide 20mg',
    price: null,
    tint: ['#0a5f8c', '#3ce0ff'],
    rating: 5,
    blurb:
      'Checked thoroughly to maintain clean, high-quality formulations you can rely on. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'tirzepatide-40mg',
    name: 'Tirzepatide 40mg',
    price: null,
    tint: ['#0a2f6c', '#02a7e3'],
    rating: 5,
    blurb:
      'Sealed and protected to preserve overall product integrity through delivery. Sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
  {
    slug: 'tirzepatide-5mg',
    name: 'Tirzepatide 5mg',
    price: null,
    tint: ['#2a2f8c', '#6d4aff'],
    rating: 5,
    blurb:
      'A starter-scale formulation sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability.',
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (price: number | null) =>
  price == null ? 'Price on enquiry' : `${CURRENCY} ${price.toFixed(2)}`;
