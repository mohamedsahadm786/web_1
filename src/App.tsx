import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/cart';
import { useLenis } from './hooks/useLenis';
import { ScrollToTop } from './components/ScrollToTop';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingActions } from './components/FloatingActions';
import { Cursor } from './components/Cursor';
import { DiscountPopup } from './components/DiscountPopup';
import { Home } from './pages/Home';

const Shop = lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })));
const Product = lazy(() => import('./pages/Product').then((m) => ({ default: m.Product })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-hairline border-t-accent" />
    </div>
  );
}

function Shell() {
  useLenis();
  return (
    <>
      <div className="grain" aria-hidden />
      <Cursor />
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <FloatingActions />
      <DiscountPopup />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </CartProvider>
  );
}
