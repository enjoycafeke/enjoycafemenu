import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Coffee, MapPin, UtensilsCrossed, ChevronDown, Gift, Heart, Home, Search, Star } from 'lucide-react';
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
  const [branchId, setBranchId] = useState<BranchId>(() => readStorage<BranchId>(STORAGE.branch, 'haile'));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [intent, setIntent] = useState<'food' | 'drinks' | null>(null);
  const [discoveryChoice, setDiscoveryChoice] = useState<'meals' | 'bakery' | 'hot' | 'cold' | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [picks, setPicks] = useState<string[]>(() => readStorage<string[]>(STORAGE.picks, []));
  const [viewedProducts, setViewedProducts] = useState<string[]>(() => readStorage<string[]>(STORAGE.viewedProducts, []));
  const [viewedCategories, setViewedCategories] = useState<string[]>(() => readStorage<string[]>(STORAGE.viewedCategories, []));
  const [rewardedPicks, setRewardedPicks] = useState<string[]>(() => readStorage<string[]>(STORAGE.rewardedPicks, []));
  const [searchOpen, setSearchOpen] = useState(false);
  const [picksOpen, setPicksOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [, setVisits] = useState<number>(() => readStorage<number>('enjoy.visits', 0));
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const sessionKey = 'enjoy.session.visited';
    try {
      if (!window.sessionStorage.getItem(sessionKey)) {
        window.sessionStorage.setItem(sessionKey, 'yes');
        const count = readStorage<number>('enjoy.visits', 0) + 1;
        writeStorage('enjoy.visits', count);
        setVisits(count);
      }
    } catch {
      /* local storage is optional */
    }
  }, []);

  const branch = branchById(branchId);
  const allCategories = useMemo(() => categoriesForBranch(branchId), [branchId]);
  // Follow the ORIGINAL menu groupings. Pastries, donuts and cakes are Food.
  const DRINK_CATEGORY_IDS = ['coffee-hot','herbal-drinks','iced-drinks','signature-drinks','drink-combos','smoothies-juices','milkshakes-icecream'];
  const FOOD_MEAL_IDS = ['breakfast','lunch','wraps-rolls','hot-snacks','food-combos','traditional-sides'];
  const FOOD_BAKERY_IDS = ['pastries','donuts','cakes-muffins'];
  const HOT_DRINK_IDS = ['coffee-hot','herbal-drinks'];
  const COLD_DRINK_IDS = ['iced-drinks','signature-drinks','drink-combos','smoothies-juices','milkshakes-icecream'];
  const isDrinkCategory = (id: string) => DRINK_CATEGORY_IDS.includes(id);
  const allProducts = useMemo(() => productsForBranch(branchId), [branchId]);
  const modeProducts = useMemo(() => intent === null ? allProducts : allProducts.filter(product => isDrinkCategory(product.category) === (intent === 'drinks')), [allProducts, intent]);
  const categories = useMemo(() => {
    const modeCategories = allCategories.filter(category => intent === null || isDrinkCategory(category.id) === (intent === 'drinks'));
    const sectionIds = discoveryChoice === 'meals' ? FOOD_MEAL_IDS : discoveryChoice === 'bakery' ? FOOD_BAKERY_IDS : discoveryChoice === 'hot' ? HOT_DRINK_IDS : discoveryChoice === 'cold' ? COLD_DRINK_IDS : null;
    return sectionIds ? modeCategories.filter(category => sectionIds.includes(category.id)) : modeCategories;
  }, [allCategories, intent, discoveryChoice]);
  const products = useMemo(() => modeProducts.filter(product => categories.some(category => category.id === product.category)), [modeProducts, categories]);
  const visibleProducts = useMemo(
    () => (activeCategory === 'all' ? products : products.filter((product) => product.category === activeCategory)),
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

  const activeCategoryMeta = useMemo(
    () => CATEGORIES.find((category) => category.id === activeCategory),
    [activeCategory]
  );

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => (current === message ? null : current)), 1500);
  };

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setStage(4);
    if (categoryId !== 'all' && !viewedCategories.includes(categoryId)) {
      const next = [...viewedCategories, categoryId];
      setViewedCategories(next);
      writeStorage(STORAGE.viewedCategories, next);
      flash(`+${CATEGORY_POINTS} pts`);
    }
  };

  const switchIntent = (next: 'food' | 'drinks') => {
    setIntent(next);
    setDiscoveryChoice(null);
    setActiveCategory('all');
    setActiveProduct(null);
    setStage(2);
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

      <header className="app-header sticky top-0 z-50 border-b border-white/[0.07] bg-[#090909]/92 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" className="flex min-w-0 items-center" onClick={() => setStage(0)} aria-label="Enjoy Cafe home">
            <img src={BRAND.logo} className="h-10 w-auto max-w-[145px] rounded-sm object-contain sm:h-11 sm:max-w-[170px]" alt="Enjoy Cafe" />
          </button>

          {stage >= 2 ? <div className="flex items-center gap-2">
            <div className="journey-switch hidden sm:flex" aria-label="Switch between food and drinks">
              <button type="button" className={intent === 'food' ? 'selected' : ''} onClick={() => switchIntent('food')}><UtensilsCrossed size={15}/> Food</button>
              <button type="button" className={intent === 'drinks' ? 'selected' : ''} onClick={() => switchIntent('drinks')}><Coffee size={15}/> Drinks</button>
            </div>
            <div className="relative hidden sm:block">
              <select value={branchId} onChange={(event) => setBranchId(event.target.value as BranchId)} className="branch-select" aria-label="Choose Enjoy Cafe branch">
                {BRANCHES.filter((item) => item.id !== 'cbd').map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 sm:flex">
              <Gift size={16} className="text-[#ff4058]" />
              <strong className="text-sm">{points} pts</strong>
            </div>
            <button className="header-pill hidden md:flex" type="button" onClick={() => setFeedbackOpen(true)}>
              <Star size={15} /> Rate us
            </button>
            <button className="icon-button md:hidden" type="button" onClick={() => setFeedbackOpen(true)} aria-label="Rate us">
              <Star size={18} />
            </button>
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search menu">
              <Search size={18} />
            </button>
            <button className="relative icon-button" type="button" onClick={() => setPicksOpen(true)} aria-label="Open My Picks">
              <Heart size={18} />
              {selectedProducts.length > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d9253d] px-1 text-[0.62rem] font-black text-white">{selectedProducts.length}</span> : null}
            </button>
          </div> : null}
        </div>

        {stage >= 2 ? <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8">
          <div className="journey-switch mb-3 flex sm:hidden" aria-label="Switch between food and drinks">
            <button type="button" className={intent === 'food' ? 'selected' : ''} onClick={() => switchIntent('food')}><UtensilsCrossed size={15}/> Food</button>
            <button type="button" className={intent === 'drinks' ? 'selected' : ''} onClick={() => switchIntent('drinks')}><Coffee size={15}/> Drinks</button>
          </div>
          <div className="mb-3 flex items-center gap-3 sm:hidden">
            <div className="relative min-w-0 flex-1">
              <select value={branchId} onChange={(event) => setBranchId(event.target.value as BranchId)} className="branch-select w-full" aria-label="Choose Enjoy Cafe branch">
                {BRANCHES.filter((item) => item.id !== 'cbd').map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
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

          {stage >= 3 ? <div className="category-tabs mt-3" role="tablist" aria-label="Menu categories">
            {stage === 4 ? <button type="button" role="tab" aria-selected={activeCategory === 'all'} className={`category-tab ${activeCategory === 'all' ? 'is-active' : ''}`} onClick={() => selectCategory('all')}>
              All <span>{products.length}</span>
            </button> : null}
            {categories.map((category) => {
              const count = products.filter((product) => product.category === category.id).length;
              return (
                <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} className={`category-tab ${activeCategory === category.id ? 'is-active' : ''}`} onClick={() => selectCategory(category.id)}>
                  {category.name} <span>{count}</span>
                </button>
              );
            })}
          </div> : null}
        </div>
        : null}
      </header>

      <main className="app-main relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        {stage < 3 ? (
          <div className="onboard-shell">
            <div className="onboard-orbit orbit-a" aria-hidden="true" />
            <div className="onboard-orbit orbit-b" aria-hidden="true" />
            <div className="relative z-10">
              <div className="onboard-topline"><span className="onboard-star">✳</span> ENJOY CAFÉ <span className="onboard-line" /> ROOTED IN KENYA · MADE TO ENJOY</div>
              <div className="onboard-steps" aria-label="Menu journey">
                <span className={stage === 0 ? 'now' : 'done'}>Location</span><i />
                <span className={stage === 1 ? 'now' : stage > 1 ? 'done' : ''}>Your mood</span><i />
                <span className={stage === 2 ? 'now' : stage > 2 ? 'done' : ''}>Discover</span><i /><span className={stage >= 3 ? 'now' : ''}>Menu</span>
              </div>
              {stage === 0 ? <>
                <div className="onboard-eyebrow"><MapPin size={15} /> THE EXPERIENCE STARTS HERE</div>
                <h1 className="onboard-headline">Where are we <em>meeting</em> you?</h1>
                <p className="onboard-description">Every Enjoy Café has its own favourites. Choose the branch you’re visiting and we’ll take you to the right menu.</p>
                <div className="onboard-choice-grid branches">
                  {BRANCHES.filter(item => item.id !== 'cbd').map((item) => <button key={item.id} type="button" className="onboard-choice" onClick={() => { setBranchId(item.id); setIntent(null); setActiveCategory('all'); setStage(1); }}>
                    <span className="choice-icon"><MapPin size={21}/></span>
                    <span className="choice-text"><strong>{item.name}</strong><small>{item.id === 'haile' ? 'Coffee, tea & the perfect bite' : item.id === 'imara-daima' ? 'Drinks, sharing & good company' : 'Fresh food & everyday favourites'}</small></span>
                    <ArrowRight size={19} className="choice-arrow" />
                  </button>)}
                </div>
                <p className="onboard-footnote">Not sure which outlet? Select the location you are at. We never guess your location.</p>
              </> : null}
              {stage === 1 ? <>
                <button type="button" className="onboard-back" onClick={() => setStage(0)}><ArrowLeft size={16}/> Change branch</button>
                <div className="onboard-eyebrow"><span className="small-dot"/> ENJOY CAFÉ · {branch.name.toUpperCase()}</div>
                <h1 className="onboard-headline">What are you <em>in the mood</em> for?</h1>
                <p className="onboard-description">A delicious meal, a favourite drink, or a little of both? Pick where you want to start. You can always switch later.</p>
                <div className="onboard-choice-grid moods">
                  <button type="button" className="onboard-choice mood-choice" onClick={() => switchIntent('food')}><span className="choice-icon"><UtensilsCrossed size={25}/></span><span className="choice-text"><strong>Something to eat</strong><small>Meals, pastries, snacks & sweet treats</small></span><ArrowRight className="choice-arrow" size={21}/></button>
                  <button type="button" className="onboard-choice mood-choice" onClick={() => switchIntent('drinks')}><span className="choice-icon"><Coffee size={25}/></span><span className="choice-text"><strong>Something to drink</strong><small>Coffee, tea, coolers & signature drinks</small></span><ArrowRight className="choice-arrow" size={21}/></button>
                </div>
              </> : null}
              {stage === 2 ? <>
                <button type="button" className="onboard-back" onClick={() => setStage(1)}><ArrowLeft size={16}/> Back to food or drinks</button>
                <div className="onboard-eyebrow">{branch.name.toUpperCase()} · {intent === 'food' ? 'THE KITCHEN & BAKERY' : 'THE DRINKS BAR'}</div>
                <h1 className="onboard-headline">{intent === 'food' ? <>What kind of food <em>sounds good?</em></> : <>How would you like <em>your drink?</em></>}</h1>
                <p className="onboard-description">{intent === 'food' ? 'Choose meals and savoury bites, or discover pastries, donuts and cakes. We will show relevant category tabs before any menu photographs.' : 'Choose warming coffee and tea, or chilled and signature drinks. Category tabs come next, before photographs and prices.'}</p>
                <div className="onboard-choice-grid moods">
                  <button type="button" className="onboard-choice mood-choice" onClick={() => { setDiscoveryChoice(intent === 'food' ? 'meals' : 'hot'); setStage(3); }}><span className="choice-icon">{intent === 'food' ? <UtensilsCrossed size={24}/> : <Coffee size={24}/>}</span><span className="choice-text"><strong>{intent === 'food' ? 'Meals & savoury bites' : 'Coffee, tea & hot drinks'}</strong><small>{intent === 'food' ? 'Breakfast, meals, wraps, sides and combos' : 'Explore coffee, Kenyan tea and herbal drinks'}</small></span><ArrowRight className="choice-arrow" size={21}/></button>
                  <button type="button" className="onboard-choice mood-choice" onClick={() => { setDiscoveryChoice(intent === 'food' ? 'bakery' : 'cold'); setStage(3); }}><span className="choice-icon"><Star size={24}/></span><span className="choice-text"><strong>{intent === 'food' ? 'Bakery & sweet treats' : 'Cold & signature drinks'}</strong><small>{intent === 'food' ? 'Pastries, donuts, cakes and muffins' : 'Iced drinks, smoothies, juices and signatures'}</small></span><ArrowRight className="choice-arrow" size={21}/></button>
                </div>
                <div className="onboard-bottom-actions"><button type="button" className="primary-button" onClick={() => { setDiscoveryChoice(null); setStage(3); }}>See {intent === 'food' ? 'food' : 'drink'} categories <ArrowRight size={16}/></button><button type="button" className="onboard-inline-switch" onClick={() => switchIntent(intent === 'food' ? 'drinks' : 'food')}>Actually, show me {intent === 'food' ? 'drinks' : 'food'} <ArrowRight size={15}/></button></div>
                {categories.length === 0 ? <p className="onboard-footnote">The {intent} menu for {branch.name} is being prepared; you can switch to the other menu at any time.</p> : null}
              </> : null}
            </div>
          </div>
        ) : null}
        {stage === 3 ? <section className="category-gateway">
          <div className="category-gateway-header"><div><span className="onboard-eyebrow">{branch.name.toUpperCase()} · {intent === 'food' ? 'FOOD MENU' : 'DRINKS MENU'}</span><h1>What would you like to <em>explore?</em></h1><p>{discoveryChoice === 'meals' ? 'Explore savoury meals, lunch and hot snacks.' : discoveryChoice === 'bakery' ? 'Discover pastries, donuts, cakes and muffins.' : discoveryChoice === 'hot' ? 'Explore warm coffee, tea and herbal drinks.' : discoveryChoice === 'cold' ? 'Find iced drinks, fruit blends and signatures.' : 'Pick a category below. Only then will photographs, details and prices appear.'}</p></div><button className="onboard-back" type="button" onClick={() => setStage(2)}><ArrowLeft size={16}/> Back</button></div>
          {discoveryChoice !== null ? <button type="button" className="onboard-inline-switch" onClick={() => { setDiscoveryChoice(null); setActiveCategory('all'); }}>See all {intent === 'food' ? 'food' : 'drink'} categories →</button> : null}
          <div className="category-gateway-grid">{categories.map((category) => <button type="button" className="gateway-tile" key={category.id} onClick={() => selectCategory(category.id)}><span className="gateway-kicker">{category.eyebrow}</span><strong>{category.name}</strong><span className="gateway-meta">{products.filter(product => product.category === category.id).length} options <ArrowRight size={16}/></span></button>)}</div>
          {categories.length === 0 ? <p className="onboard-footnote">This selection is not available at this outlet yet.</p> : null}
        </section> : null}
        {stage === 4 ? <div className="menu-context-bar">
          <span><strong>{branch.name}</strong> / {intent === 'food' ? 'Food' : 'Drinks'} / {activeCategoryMeta?.name ?? 'All items'}</span>
          <div className="flex gap-2"><button type="button" onClick={() => setStage(3)}>All categories</button><button type="button" onClick={() => switchIntent(intent === 'food' ? 'drinks' : 'food')}>Switch to {intent === 'food' ? 'Drinks' : 'Food'}</button><button type="button" onClick={() => setStage(0)}>Change Branch</button></div>
        </div> : null}
        {stage === 4 ? <>
        <div className="menu-stage-header mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-white/45">
              {activeCategory === 'all' ? `${branch.name} Menu Highlights` : activeCategoryMeta?.eyebrow ?? 'Now showing'}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">
              {activeCategory === 'all' ? 'The Enjoy Selection' : activeCategoryMeta?.name ?? 'Menu'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              {activeCategory === 'all'
                ? 'Browse the full branch offering, or jump into a category above to focus the experience.'
                : `Showing ${visibleProducts.length} options in ${activeCategoryMeta?.name ?? 'this section'}.`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="secondary-button" onClick={() => setSearchOpen(true)}>
              <Search size={16} /> Search
            </button>
            {activeCategory !== 'all' ? (
              <button type="button" className="secondary-button" onClick={() => selectCategory('all')}>
                Show full menu
              </button>
            ) : null}
          </div>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div layout key={product.id}>
                <ProductCard product={product} branchId={branchId} viewed={viewedProducts.includes(product.id)} index={index} onOpen={openProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </> : null}
      </main>

      {stage === 4 ? <nav className="mobile-dock fixed inset-x-3 bottom-3 z-50 mx-auto grid max-w-sm grid-cols-3 rounded-[1.5rem] border border-white/10 bg-[#111]/94 p-2 shadow-[0_20px_80px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:hidden" aria-label="Mobile menu navigation">
        <button type="button" className="mobile-nav" onClick={() => selectCategory('all')}>
          <Home size={18} />
          <span>Menu</span>
        </button>
        <button type="button" className="mobile-nav" onClick={() => setSearchOpen(true)}>
          <Search size={18} />
          <span>Search</span>
        </button>
        <button type="button" className="mobile-nav" onClick={() => setPicksOpen(true)}>
          <Heart size={18} />
          <span>Picks</span>
        </button>
      </nav> : null}

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
          <motion.div
            className="fixed left-1/2 top-24 z-[120] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-black text-black shadow-2xl"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
