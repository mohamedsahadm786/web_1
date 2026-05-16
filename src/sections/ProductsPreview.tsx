import { Link } from 'react-router-dom';
import { products } from '../lib/products';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Icon } from '../components/Icon';

/** Full-grid product showcase anchored at #products. */
export function ProductsPreview() {
  return (
    <section id="products" className="relative py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Products"
          title="The full ALLUVI catalogue"
          text="Eight research formulations — sourced from verified suppliers and packed with precision."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/shop" className="btn-pill">
            View All Products
            <Icon name="arrow-right" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
