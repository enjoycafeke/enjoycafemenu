import { Copy, Trash2 } from 'lucide-react';
import { ModalShell } from './ModalShell';
import type { BranchId, Product } from '../types/menu';
import { formatKES } from '../lib/format';

interface PicksPanelProps {
  open: boolean;
  onClose: () => void;
  branchId: BranchId;
  branchName: string;
  products: readonly Product[];
  onRemove: (productId: string) => void;
  onOpenProduct: (product: Product) => void;
  onClear: () => void;
  onCopied: () => void;
}

export function PicksPanel({ open, onClose, branchId, branchName, products, onRemove, onOpenProduct, onClear, onCopied }: PicksPanelProps) {
  const total = products.reduce((sum, product) => sum + (product.prices[branchId] ?? 0), 0);

  const copy = async () => {
    const lines = [
      `Enjoy Cafe — ${branchName}`,
      ...products.map((product) => `• ${product.name} — ${formatKES(product.prices[branchId] ?? 0)}`),
      `Total: ${formatKES(total)}`
    ];
    await navigator.clipboard.writeText(lines.join('\n'));
    onCopied();
  };

  return (
    <ModalShell open={open} onClose={onClose} title="My Picks">
      {products.length === 0 ? (
        <div className="rounded-[1.4rem] border border-dashed border-white/15 p-7 text-center text-sm leading-6 text-white/45">
          Nothing here yet. Add anything that catches your eye.
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <button type="button" className="min-w-0 flex-1 text-left" onClick={() => { onOpenProduct(product); onClose(); }}>
                <p className="truncate font-bold text-white">{product.name}</p>
                <p className="mt-1 text-sm font-bold text-[#ff4058]">{formatKES(product.prices[branchId] ?? 0)}</p>
              </button>
              <button className="text-button" type="button" onClick={() => onRemove(product.id)}>Remove</button>
            </div>
          ))}
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-white p-5 text-black">
            <span className="text-sm font-black uppercase tracking-[0.18em]">Total</span>
            <strong className="text-2xl">{formatKES(total)}</strong>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button type="button" className="secondary-button" onClick={onClear}><Trash2 size={17} /> Clear</button>
            <button type="button" className="primary-button" onClick={() => void copy()}><Copy size={17} /> Copy picks</button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
