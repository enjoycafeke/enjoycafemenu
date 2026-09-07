import { Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { ModalShell } from './ModalShell';
import type { BranchId, Category, Product } from '../types/menu';
import { formatKES } from '../lib/format';

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
  branchId: BranchId;
  categories: readonly Category[];
  products: readonly Product[];
  onOpenProduct: (product: Product) => void;
}

export function SearchPanel({ open, onClose, branchId, categories, products, onOpenProduct }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const results = useMemo(() => {
    if (!deferredQuery) return products.slice(0, 10);
    return products.filter((product) => product.name.toLowerCase().includes(deferredQuery)).slice(0, 30);
  }, [deferredQuery, products]);

  return (
    <ModalShell open={open} onClose={onClose} title="Search Menu" wide>
      <label className="relative block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={19} />
        <input
          autoFocus={open}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search menu…"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.055] py-4 pl-12 pr-4 text-base font-semibold text-white outline-none transition placeholder:text-white/28 focus:border-[#d9253d]/70"
        />
      </label>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {results.map((product) => {
          const category = categories.find((item) => item.id === product.category);
          const price = product.prices[branchId];
          if (price === undefined) return null;
          return (
            <button
              key={product.id}
              type="button"
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:bg-white/[0.07]"
              onClick={() => {
                onOpenProduct(product);
                onClose();
              }}
            >
              <span>
                <strong className="block text-white">{product.name}</strong>
                <small className="mt-1 block text-white/38">{category?.name ?? 'Menu'}</small>
              </span>
              <span className="shrink-0 font-black text-[#ff4058]">{formatKES(price)}</span>
            </button>
          );
        })}
      </div>
      {results.length === 0 ? <p className="py-10 text-center text-white/38">No match.</p> : null}
    </ModalShell>
  );
}
