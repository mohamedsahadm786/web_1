import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { Product } from './products';

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  qty: number;
};

type State = { lines: CartLine[]; open: boolean };

type Action =
  | { type: 'add'; product: Product; qty: number }
  | { type: 'remove'; slug: string }
  | { type: 'setQty'; slug: string; qty: number }
  | { type: 'toggle'; open?: boolean }
  | { type: 'clear' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      if (action.product.price == null) return state;
      const existing = state.lines.find((l) => l.slug === action.product.slug);
      const lines = existing
        ? state.lines.map((l) =>
            l.slug === action.product.slug ? { ...l, qty: l.qty + action.qty } : l,
          )
        : [
            ...state.lines,
            {
              slug: action.product.slug,
              name: action.product.name,
              price: action.product.price,
              qty: action.qty,
            },
          ];
      return { lines, open: true };
    }
    case 'remove':
      return { ...state, lines: state.lines.filter((l) => l.slug !== action.slug) };
    case 'setQty':
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.slug === action.slug ? { ...l, qty: Math.max(1, action.qty) } : l))
          .filter((l) => l.qty > 0),
      };
    case 'toggle':
      return { ...state, open: action.open ?? !state.open };
    case 'clear':
      return { ...state, lines: [] };
    default:
      return state;
  }
}

type CartContext = {
  lines: CartLine[];
  open: boolean;
  count: number;
  total: number;
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  toggle: (open?: boolean) => void;
  clear: () => void;
};

const Ctx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], open: false });

  const value = useMemo<CartContext>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const total = state.lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines: state.lines,
      open: state.open,
      count,
      total,
      add: (product, qty = 1) => dispatch({ type: 'add', product, qty }),
      remove: (slug) => dispatch({ type: 'remove', slug }),
      setQty: (slug, qty) => dispatch({ type: 'setQty', slug, qty }),
      toggle: (open) => dispatch({ type: 'toggle', open }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
