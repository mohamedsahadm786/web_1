import { products } from '../lib/products';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { Marquee } from '../components/Marquee';

export function Shop() {
  return (
    <>
      <PageHeader
        title="All Products"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
        intro={`${products.length} research formulations — sourced from verified suppliers and packed with precision.`}
      />
      <section className="py-20">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <Marquee />
    </>
  );
}
