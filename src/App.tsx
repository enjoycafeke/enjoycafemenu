import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Gift, Heart, Home, Search, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BRAND, BRANCHES, CATEGORIES, PRODUCTS, branchById, categoriesForBranch, productsForBranch } from './data/menu';
import { readStorage, writeStorage } from './lib/storage';
import type { BranchId, Product } from './types/menu';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPanel } from './components/ProductDetailPanel';
import { PicksPanel } from './components/PicksPanel';
import { SearchPanel } from './components/SearchPanel';
import { FeedbackPanel } from './components/FeedbackPanel';

const STORAGE = {
  branch: 'enjoy.branch',
  picks: 'enjoy.picks',
  viewedProducts: 'enjoy.viewedProducts',
  viewedCategories: 'enjoy.viewedCategories',
  rewardedPicks: 'enjoy.rewardedPicks'
} as const;

const PRODUCT_POINTS = 5;
const CATEGORY_POINTS = 10;
const PICK_POINTS = 2;

export default function App() {
  const [branchId, setBranchId] = useState<BranchId>(() => readStorage<BranchId>(STORAGE.branch, 'imara-daima'));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [picks, setPicks] = useState<string[]>(() => readStorage<string[]>(STORAGE.picks, []));
  const [viewedProducts, setViewedProducts] = useState<string[]>(() => readStorage<string[]>(STORAGE.viewedProducts, []));
  const [viewedCategories, setViewedCategories] = useState<string[]>(() => readStorage<string[]>(STORAGE.viewedCategories, []));
  const [rewardedPicks, setRewardedPicks] = useState<string[]>(() => readStorage<string[]>(STORAGE.rewardedPicks, []));
  const [searchOpen, setSearchOpen] = useState(false);
  const [picksOpen, setPicksOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const branch = branchById(branchId);
  const categories = useMemo(() => categoriesForBranch(branchId), [branchId]);
  const products = useMemo(() => productsForBranch(branchId), [branchId]);
  const visibleProducts = useMemo(
    () => activeCategory === 'all' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory, products]
  );
  const selectedProducts = useMemo(
    () => PRODUCTS.filter((product) => picks.includes(product.id) && product.prices[branchId] !== undefined),
    [branchId, picks]
  );

  const availableIds = useMemo(() => new Set(products.map((item) => item.id)), [products]);
  const viewedAvailable = useMemo(() => viewedProducts.filter((id) => availableIds.has(id)), [availableIds, viewedProducts]);
  const progress = products.length ? Math.round((viewedAvailable.length / products.length) * 100) : 0;
  const points = viewedProducts.length * PRODUCT_POINTS + viewedCategories.length * CATEGORY_POINTS + rewardedPicks.length * PICK_POINTS;

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => (current === message ? null : current)), 1500);
  };

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId !== 'all' && !viewedCategories.includes(categoryId)) {
      const next = [...viewedCategories, categoryId];
      setViewedCategories(next);
      writeStorage(STORAGE.viewedCategories, next);
      flash(`+${CATEGORY_POINTS} pts`);
    }
  };

  const openProduct = (product: Product) => {
    setActiveProduct(product);
    if (!viewedProducts.includes(product.id)) {
      const next = [...viewedProducts, product.id];
      setViewedProducts(next);
      writeStorage(STORAGE.viewedProducts, next);
      flash(`+${PRODUCT_POINTS} pts`);
    }
  };

  const togglePick = (productId: string) => {
    const adding = !picks.includes(productId);
    const next = adding ? [...picks, productId] : picks.filter((id) => id !== productId);
    setPicks(next);
    writeStorage(STORAGE.picks, next);

    if (adding && !rewardedPicks.includes(productId)) {
      const rewarded = [...rewardedPicks, productId];
      setRewardedPicks(rewarded);
      writeStorage(STORAGE.rewardedPicks, rewarded);
      flash(`+${PICK_POINTS} pts`);
    }
  };

  useEffect(() => {
    writeStorage(STORAGE.branch, branchId);
    setActiveCategory('all');
    setActiveProduct(null);
    const validPicks = picks.filter((id) => PRODUCTS.some((product) => product.id === id && product.prices[branchId] !== undefined));
    if (validPicks.length !== picks.length) {
      setPicks(validPicks);
      writeStorage(STORAGE.picks, validPicks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId]);

  return (
    <div className="min-h-dvh bg-[#090909] text-white selection:bg-[#d9253d] selection:text-white">
      <div className="fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[-14rem] top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-[#d9253d]/8 blur-[120px]" />
        <div className="absolute right-[-22rem] top-[24rem] h-[44rem] w-[44rem] rounded-full bg-[#8b1024]/8 blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090909]/92 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" className="flex min-w-0 items-center" onClick={() => selectCategory('all')} aria-label="Enjoy Cafe home">
            <img src={BRAND.logo} className="h-10 w-auto max-w-[145px] rounded-sm object-contain sm:h-11 sm:max-w-[170px]" alt="Enjoy Cafe" />
          </button>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <select value={branchId} onChange={(event) => setBranchId(event.target.value as BranchId)} className="branch-select" aria-label="Choose Enjoy Cafe branch">
                {BRANCHES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 sm:flex">
              <Gift size={16} className="text-[#ff4058]" />
              <strong className="text-sm">{points} pts</strong>
            </div>
            <button className="header-pill hidden md:flex" type="button" onClick={() => setFeedbackOpen(true)}><Star size={15} /> Rate us</button>
            <button className="icon-button md:hidden" type="button" onClick={() => setFeedbackOpen(true)} aria-label="Rate us"><Star size={18} /></button>
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search menu"><Search size={18} /></button>
            <button className="relative icon-button" type="button" onClick={() => setPicksOpen(true)} aria-label="Open My Picks">
              <Heart size={18} />
              {selectedProducts.length > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d9253d] px-1 text-[0.62rem] font-black text-white">{selectedProducts.length}</span> : null}
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-3 sm:hidden">
            <div className="relative min-w-0 flex-1">
              <select value={branchId} onChange={(event) => setBranchId(event.target.value as BranchId)} className="branch-select w-full" aria-label="Choose Enjoy Cafe branch">
                {BRANCHES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </div>
            <div className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4">
              <Gift size={15} className="text-[#ff4058]" />
              <strong className="whitespace-nowrap text-sm">{points} pts</strong>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pb-2 text-xs font-extrabold text-white/55">
            <span>Progress</span>
            <span>{viewedAvailable.length}/{products.length} · {progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div className="h-full rounded-full bg-[#d9253d]" animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 170, damping: 24 }} />
          </div>

          <div className="category-tabs mt-3" role="tablist" aria-label="Menu categories">
            <button type="button" role="tab" aria-selected={activeCategory === 'all'} className={`category-tab ${activeCategory === 'all' ? 'is-active' : ''}`} onClick={() => selectCategory('all')}>
              All <span>{products.length}</span>
            </button>
            {categories.map((category) => {
              const count = products.filter((product) => product.category === category.id).length;
              return (
                <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} className={`category-tab ${activeCategory === category.id ? 'is-active' : ''}`} onClick={() => selectCategory(category.id)}>
                  {category.name} <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">
              {activeCategory === 'all' ? 'Menu' : CATEGORIES.find((category) => category.id === activeCategory)?.name ?? 'Menu'}
            </h1>
          </div>
          <button type="button" className="secondary-button hidden sm:inline-flex" onClick={() => setSearchOpen(true)}><Search size={16} /> Search</button>
        </div>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div layout key={product.id}>
                <ProductCard product={product} branchId={branchId} viewed={viewedProducts.includes(product.id)} index={index} onOpen={openProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-50 mx-auto grid max-w-sm grid-cols-3 rounded-[1.5rem] border border-white/10 bg-[#111]/94 p-2 shadow-[0_20px_80px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:hidden" aria-label="Mobile menu navigation">
        <button type="button" className="mobile-nav" onClick={() => selectCategory('all')}><Home size={18} /><span>Menu</span></button>
        <button type="button" className="mobile-nav" onClick={() => setSearchOpen(true)}><Search size={18} /><span>Search</span></button>
        <button type="button" className="mobile-nav" onClick={() => setPicksOpen(true)}><Heart size={18} /><span>Picks</span></button>
      </nav>

      <ProductDetailPanel product={activeProduct} branchId={branchId} branchName={branch.name} selected={activeProduct ? picks.includes(activeProduct.id) : false} onClose={() => setActiveProduct(null)} onToggle={togglePick} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} branchId={branchId} categories={categories} products={products} onOpenProduct={openProduct} />
      <PicksPanel
        open={picksOpen}
        onClose={() => setPicksOpen(false)}
        branchId={branchId}
        branchName={branch.name}
        products={selectedProducts}
        onRemove={togglePick}
        onOpenProduct={openProduct}
        onClear={() => {
          setPicks([]);
          writeStorage(STORAGE.picks, []);
        }}
        onCopied={() => flash('Copied')}
      />
      <FeedbackPanel open={feedbackOpen} onClose={() => setFeedbackOpen(false)} branchId={branchId} onSaved={() => flash('Thank you')} />

      <AnimatePresence>
        {toast ? (
          <motion.div className="fixed left-1/2 top-24 z-[120] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-black text-black shadow-2xl" initial={{ opacity: 0, y: -10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}>
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
