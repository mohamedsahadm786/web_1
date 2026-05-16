import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-navy pt-24 text-center">
      <div className="aurora left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 bg-accent/40" />
      <div className="relative">
        <p className="font-display text-[7rem] font-bold leading-none text-gradient">404</p>
        <h1 className="font-display text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-sm text-white/60">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-pill mt-7">
          <Icon name="arrow-right" size={18} className="rotate-180" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
