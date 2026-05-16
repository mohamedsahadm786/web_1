import { Link } from 'react-router-dom';
import { products } from '../lib/products';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCarousel } from '../components/ProductCarousel';
import { Reveal } from '../components/Reveal';
import { Icon } from '../components/Icon';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Products"
          title="Research formulations packed with precision and care"
          text="A focused catalogue built around consistency — every unit sealed, protected, and ready for structured research."
        />
        <div className="mt-12">
          <ProductCarousel items={featured} />
        </div>
        <Reveal className="mt-8 text-center">
          <Link to="/shop" className="btn-pill">
            View All Products
            <Icon name="arrow-right" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
