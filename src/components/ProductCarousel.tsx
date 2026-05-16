import { useRef } from 'react';
import type { Product } from '../lib/products';
import { ProductCard } from './ProductCard';
import { Icon } from './Icon';

/** Horizontal drag/scroll carousel of product cards. */
export function ProductCarousel({ items }: { items: Product[] }) {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = (card?.offsetWidth ?? 280) + 20;
    el.scrollBy({ left: amount * dir, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <div
            key={p.slug}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-15px)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-card transition-transform hover:scale-110 md:grid"
      >
        <Icon name="arrow-right" size={20} className="rotate-180" />
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-card transition-transform hover:scale-110 md:grid"
      >
        <Icon name="arrow-right" size={20} />
      </button>
    </div>
  );
}
