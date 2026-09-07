import { AnimatePresence, motion } from 'motion/react';
import { Check, Heart, X } from 'lucide-react';
import { formatKES } from '../lib/format';
import type { BranchId, Product } from '../types/menu';

interface ProductDetailPanelProps {
  product: Product | null;
  branchId: BranchId;
  branchName: string;
  selected: boolean;
  onClose: () => void;
  onToggle: (productId: string) => void;
}

export function ProductDetailPanel({ product, branchId, branchName, selected, onClose, onToggle }: ProductDetailPanelProps) {
  const price = product?.prices[branchId];

  return (
    <AnimatePresence>
      {product && price !== undefined ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/72 p-3 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] shadow-[0_40px_140px_rgba(0,0,0,.65)]"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#181818]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" onError={(event) => { const image = event.currentTarget; if (image.src !== product.fallbackImage) image.src = product.fallbackImage; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              <button type="button" className="absolute right-4 top-4 icon-button bg-black/45" onClick={onClose} aria-label="Close"><X size={19} /></button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-4xl">{product.name}</h2>
                  <p className="mt-2 text-sm font-bold text-white/38">{branchName}</p>
                </div>
                <div className="shrink-0 text-xl font-black text-[#ff4058] sm:text-2xl">{formatKES(price)}</div>
              </div>

              {product.note ? <p className="mt-6 text-base leading-7 text-white/62">{product.note}</p> : null}

              <button
                type="button"
                className={`mt-8 w-full ${selected ? 'secondary-button' : 'primary-button'} py-4`}
                onClick={() => onToggle(product.id)}
              >
                {selected ? <><Check size={18} /> Added</> : <><Heart size={18} /> Add to My Picks</>}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
