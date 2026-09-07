import { motion } from 'motion/react';
import { Check, Eye } from 'lucide-react';
import type { BranchId, Product } from '../types/menu';
import { formatKES } from '../lib/format';

interface ProductCardProps {
  product: Product;
  branchId: BranchId;
  viewed: boolean;
  index: number;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, branchId, viewed, index, onOpen }: ProductCardProps) {
  const price = product.prices[branchId];
  if (price === undefined) return null;

  return (
    <motion.article
      className={`group relative cursor-pointer overflow-hidden rounded-[1.65rem] border bg-[#141414] shadow-[0_18px_70px_rgba(0,0,0,.20)] transition ${viewed ? 'border-[#d9253d]/25' : 'border-white/10 hover:border-white/20'}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.2), duration: 0.3 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen(product)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(product);
        }
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1b1b1b]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.src !== product.fallbackImage) image.src = product.fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {viewed ? (
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md"><Check size={15} /></span>
          ) : (
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[0.66rem] font-black tracking-wide text-white backdrop-blur-md">+5 pts</span>
          )}
        </div>
        <motion.button
          type="button"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-black/38 text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white hover:text-black"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(product);
          }}
          whileTap={{ scale: 0.9 }}
          aria-label={`View ${product.name}`}
        >
          <Eye size={17} />
        </motion.button>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-black leading-tight tracking-tight text-white">{product.name}</h3>
            {product.note ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/45">{product.note}</p> : null}
          </div>
          <span className="shrink-0 text-xl font-black tracking-tight text-[#ff4058]">{formatKES(price)}</span>
        </div>
      </div>
    </motion.article>
  );
}
