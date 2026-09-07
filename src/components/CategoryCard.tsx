import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import type { Category } from '../types/menu';

interface CategoryCardProps {
  category: Category;
  count: number;
  index: number;
  image: string;
  onOpen: (categoryId: string) => void;
}

export function CategoryCard({ category, count, index, image, onOpen }: CategoryCardProps) {
  return (
    <motion.button
      type="button"
      className="group relative aspect-[4/3] min-h-56 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#151515] text-left shadow-[0_22px_70px_rgba(0,0,0,.28)]"
      onClick={() => onOpen(category.id)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.36 }}
      whileHover={{ y: -5, scale: 1.006 }}
      whileTap={{ scale: 0.985 }}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-65" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/55">{count} items</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/18 bg-black/25 text-white backdrop-blur-md transition duration-300 group-hover:border-white/35 group-hover:bg-white group-hover:text-black">
            <ChevronRight size={18} />
          </span>
        </div>
        <h3 className="max-w-[92%] text-3xl font-black leading-none tracking-[-0.045em] text-white">{category.name}</h3>
      </div>
    </motion.button>
  );
}
