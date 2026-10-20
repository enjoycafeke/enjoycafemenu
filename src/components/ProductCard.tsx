import { motion } from 'motion/react';
import { Check, Eye } from 'lucide-react';
import type { BranchId, Product } from '../types/menu';
import { formatKES } from '../lib/format';
import { CATEGORIES } from '../data/menu';

interface ProductCardProps {
  product: Product;
  branchId: BranchId;
  viewed: boolean;
  index: number;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, branchId, viewed, index, onOpen }: ProductCardProps) {
  const price = product.prices[branchId];
  const category = CATEGORIES.find((item) => item.id === product.category);
  if (price === undefined) return null;

  return (
    <motion.article
      className={`group product-card relative cursor-pointer overflow-hidden rounded-[1.9rem] border bg-[#141414] transition ${
        viewed ? 'border-[#d9253d]/28' : 'border-white/10 hover:border-[#f5bd79]/28'
      }`}
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
      <div className="relative aspect-[5/3.3] overflow-hidden bg-[#1b1b1b] sm:aspect-[5/3.5]">
        <img
          src={branchId === 'haile' ? product.image : '/brand/enjoy-cafe-mark.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.src !== product.fallbackImage) image.src = product.fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent opacity-70" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {viewed ? (
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/18 bg-black/42 text-white backdrop-blur-md">
              <Check size={16} />
            </span>
          ) : (
            <span className="rounded-full border border-white/18 bg-black/42 px-3 py-2 text-[0.68rem] font-black tracking-wide text-white backdrop-blur-md">
              +5 pts
            </span>
          )}
        </div>
        <motion.button
          type="button"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-black/38 text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white hover:text-black"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(product);
          }}
          whileTap={{ scale: 0.9 }}
          aria-label={`View ${product.name}`}
        >
          <Eye size={18} />
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[.18em] text-[#f5bd79] backdrop-blur-md">
              {category?.name ?? 'Menu item'}
            </span>
            <span className="rounded-full border border-[#ff4058]/20 bg-[#d9253d]/14 px-3 py-1.5 text-sm font-black text-white backdrop-blur-md">
              {product.pricePending ? 'Ask staff for price' : formatKES(price)}
            </span>
          </div>
          <h3 className="max-w-[92%] text-[1.35rem] font-black leading-tight tracking-[-0.03em] text-white sm:text-[1.5rem]">
            {product.name}
          </h3>
          {product.note ? <p className="mt-2 max-w-[92%] text-sm leading-6 text-white/72">{product.note}</p> : null}
        </div>
      </div>
    </motion.article>
  );
}
