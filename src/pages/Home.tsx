import { Hero } from '../sections/Hero';
import { FeatureBadges } from '../sections/FeatureBadges';
import { AboutBlock } from '../sections/AboutBlock';
import { FeaturedProducts } from '../sections/FeaturedProducts';
import { WhyUs } from '../sections/WhyUs';
import { Marquee } from '../components/Marquee';
import { ProductsPreview } from '../sections/ProductsPreview';
import { Support } from '../sections/Support';
import { Testimonials } from '../sections/Testimonials';
import { DisclaimerBand } from '../sections/DisclaimerBand';

export function Home() {
  return (
    <>
      <Hero />
      <FeatureBadges />
      <AboutBlock />
      <FeaturedProducts />
      <WhyUs />
      <Marquee />
      <ProductsPreview />
      <Testimonials />
      <Support />
      <DisclaimerBand />
    </>
  );
}
