import { haileImage } from '../lib/images';
import foodItems from './haile-food-items.json';
import type { Branch, BranchId, Category, Product } from '../types/menu';

export const BRAND = {
  name: 'Enjoy Cafe',
  domain: 'https://enjoycafeke.com',
  logo: '/assets/enjoy-cafe-logo.jpeg'
} as const;

export const BRANCHES: readonly Branch[] = [
  { id: 'delamere', name: 'Delamere', menuSource: 'Awaiting approved Delamere menu', heroImage: '/brand/enjoy-cafe-mark.svg', verification: 'Menu pending approval; no unverified prices published' },

  {
    id: 'imara-daima',
    name: 'Imara Daima',
    menuSource: 'https://www.ubereats.com/ke/store/enjoy-cafe-imara-daima/h22Gb3mbUc-3hchhYmRFIg',
    heroImage: 'https://tb-static.uber.com/prod/image-proc/processed_images/15c6d0f98fc01ee688b08567ebcc2946/bb3c0a72d9475b425c5ee9e6ea716d2f.webp',
    verification: 'Fullest currently verified public listing'
  },
  {
    id: 'cbd',
    name: 'Haile CBD',
    menuSource: 'https://www.ubereats.com/ke/store/enjoy-cafe-cbd/pvHR24NxU1aqET0Q4jifyw',
    heroImage: 'https://tb-static.uber.com/prod/image-proc/processed_images/5db0377872502fd32365764833d3d6bc/bb3c0a72d9475b425c5ee9e6ea716d2f.webp',
    verification: 'Partial currently verified public listing'
  },
  {
    id: 'karen',
    name: 'Karen',
    menuSource: 'https://www.ubereats.com/ke/store/enjoy-cafe-karen/GTJwHN-KXG24K9s7b_Ld6Q',
    heroImage: 'https://tb-static.uber.com/prod/image-proc/processed_images/7a5a8eabb3aa39aafaef6e0d1f864ca7/bb3c0a72d9475b425c5ee9e6ea716d2f.webp',
    verification: 'Karen drinks verified from the provided 2025 drink menu; existing non-drink listing retained'
  },
  {
    id: 'haile',
    name: 'Haile',
    menuSource: 'Provided Haile drink menu',
    heroImage: '/assets/enjoy-cafe-logo.jpeg',
    verification: 'Haile drinks verified from the provided Haile drink menu; no unsupported non-drink items added'
  }
] as const;

const gallery = {
  cover: '/brand/enjoy-cafe-mark.svg',
  imara: '/brand/enjoy-cafe-mark.svg',
  cbd: '/brand/enjoy-cafe-mark.svg',
  karen: '/brand/enjoy-cafe-mark.svg'
} as const;

export const CATEGORIES: readonly Category[] = [
  { id: 'breakfast', name: 'Breakfast', eyebrow: 'Start your day', mediaSource: '', image: gallery.cover },
  { id: 'food-combos', name: 'Food Combos', eyebrow: 'Better together', mediaSource: '', image: gallery.cover },
  { id: 'traditional-sides', name: 'Traditional Sides', eyebrow: 'Local favourites', mediaSource: '', image: gallery.cover },
  { id: 'breakfast', name: 'Breakfast', eyebrow: 'Start your day', mediaSource: '', image: gallery.cover },
  { id: 'food-combos', name: 'Food Combos', eyebrow: 'Better together', mediaSource: '', image: gallery.cover },
  { id: 'traditional-sides', name: 'Traditional Sides', eyebrow: 'Local favourites', mediaSource: '', image: gallery.cover },
  { id: 'lunch', name: 'Lunch', eyebrow: 'Proper plates', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.imara },
  { id: 'hot-snacks', name: 'Hot Snacks', eyebrow: 'Quick favourites', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.cover },
  { id: 'wraps-rolls', name: 'Wraps & Rolls', eyebrow: 'Roll with it', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/sandwiches/', image: gallery.karen },
  { id: 'pastries', name: 'Pastries', eyebrow: 'Baked bites', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.cover },
  { id: 'donuts', name: 'Donuts', eyebrow: 'Sweet circles', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.cover },
  { id: 'cakes-muffins', name: 'Cakes & Muffins', eyebrow: 'Something sweet', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.cover },
  { id: 'herbal-drinks', name: 'Herbal Drinks', eyebrow: 'Naturally refreshing', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/hotdrinks/', image: gallery.karen },
  { id: 'coffee-hot', name: 'Coffee & Hot Drinks', eyebrow: 'Warm up', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/hotdrinks/', image: gallery.cbd },
  { id: 'iced-drinks', name: 'Iced Drinks', eyebrow: 'Keep it cool', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/icedcoffees/', image: gallery.cbd },
  { id: 'signature-drinks', name: 'Signature Drinks', eyebrow: 'Colourful sips', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/icedcoffees/', image: gallery.karen },
  { id: 'drink-combos', name: 'Drink Combos', eyebrow: 'Sip & snack', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafetakeawayitems/', image: gallery.cover },
  { id: 'smoothies-juices', name: 'Smoothies & Juices', eyebrow: 'Fresh & blended', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/smoothies/', image: gallery.karen },
  { id: 'milkshakes-icecream', name: 'Milkshakes & Ice Cream', eyebrow: 'Shake things up', mediaSource: 'https://marketingmastery.pixieset.com/enjoycafedrinkscampaignshoot/milkshakes/', image: gallery.imara }
] as const;

const product = (
  id: string,
  category: string,
  name: string,
  imara?: number,
  cbd?: number,
  karen?: number,
  note?: string,
  _imageTags?: string,
  _lock = 1,
  haile?: number
): Product => ({
  id,
  category,
  name,
  prices: {
    ...(imara !== undefined ? { 'imara-daima': imara } : {}),
    ...(cbd !== undefined ? { cbd } : {}),
    ...(karen !== undefined ? { karen } : {}),
    ...(haile !== undefined ? { haile } : {})
  },
  ...(note ? { note } : {}),
  image: haileImage(name, id) ?? '/brand/enjoy-cafe-mark.svg',
  fallbackImage: '/brand/enjoy-cafe-mark.svg'
});

export const PRODUCTS: readonly Product[] = [
  ...foodItems.map(item => ({
    id: item.id, category: item.category, name: item.name,
    prices: { haile: item.price ?? 0 }, pricePending: item.price === null,
    note: item.note, image: item.image, fallbackImage: '/brand/enjoy-cafe-mark.svg'
  })),
  product('tavis-chicken-wings', 'lunch', 'Tavis Chicken Wings', 550, 550, 550, 'Chicken wings glazed with a sweet and savory sauce.', 'glazed chicken wings restaurant', 101),
  product('vegetable-rice-beef-stew', 'lunch', 'Vegetable Rice + Beef Stew', 550, 550, 550, 'Vegetable rice served with beef stew.', 'beef stew rice vegetables', 102),
  product('bhajia-passion-combo', 'lunch', 'Bhajia + Passion Juice', 750, undefined, 550, 'Bhajia served with passion juice.', 'bhajia fritters passion juice', 103),
  product('tavis-pilau-salsa', 'lunch', 'Tavis Pilau with Salsa', 550, 550, 550, 'Pilau served with fresh salsa.', 'kenyan pilau rice salsa', 104),

  product('pancake', 'hot-snacks', 'Pancake', 150, 150, 150, 'Light breakfast pancake.', 'pancake breakfast', 105),
  product('chapati', 'hot-snacks', 'Chapati', 100, 100, 100, 'Thin flatbread.', 'chapati flatbread', 106),
  product('beef-sausage', 'hot-snacks', 'Beef Sausage', 100, 100, 100, 'Cooked beef sausage.', 'beef sausage breakfast', 107),
  product('beef-chicken-samosa', 'hot-snacks', 'Beef/Chicken Samosa', 100, 100, 100, 'Pastry with beef or chicken filling.', 'samosa pastry', 108),
  product('beef-kebab', 'hot-snacks', 'Beef Kebab', 160, 160, 160, 'Seasoned beef kebab.', 'beef kebab skewer', 109),
  product('ngwaci-nduma', 'hot-snacks', 'Ngwaci/Nduma', 250, undefined, undefined, 'Cooked sweet potato or arrowroots.', 'sweet potato arrowroot', 110),

  product('eggroll-chicken', 'wraps-rolls', 'Eggroll Chicken', 270, 270, 270, 'Chicken egg roll.', 'chicken egg roll', 111),
  product('chicken-burrito', 'wraps-rolls', 'Chicken Burrito', 350, undefined, 350, 'Burrito with chicken and vegetables.', 'chicken burrito', 112),
  product('rolex', 'wraps-rolls', 'Rolex', 250, 250, 250, 'Chapati rolled with egg and vegetables.', 'uganda rolex chapati egg', 113),
  product('chicken-sandwich', 'wraps-rolls', 'Chicken Sandwich', 350, undefined, 350, 'Sandwich with chicken filling.', 'chicken sandwich', 114),

  product('doughnut-cappuccino', 'pastries', 'Doughnut and Cappuccino', 550, 550, 500, 'Doughnut served with cappuccino.', 'doughnut cappuccino coffee', 115, 500),
  product('tea-scone', 'pastries', 'Tea Scone', 120, 120, 120, 'Light baked scone.', 'tea scone pastry', 116),
  product('rockbun', 'pastries', 'Rockbun', 120, 120, 120, 'Sweet baked bun.', 'rock bun pastry', 117),
  product('coconut-crunch', 'pastries', 'Coconut Crunch', 120, 120, 120, 'Coconut pastry.', 'coconut pastry', 118),

  product('white-chocolate-donut', 'donuts', 'White Chocolate', 200, 200, undefined, 'Donut with white chocolate flavour.', 'white chocolate donut', 119),
  product('chocolate-sprinkles-donut', 'donuts', 'Chocolate Sprinkles', 200, undefined, 200, 'Donut with chocolate and sprinkles.', 'chocolate sprinkle donut', 120),
  product('buy-five-get-one', 'donuts', 'Buy 5 Get 1 Free', undefined, 1000, undefined, 'Tuesday offer.', 'assorted donuts box', 121),

  product('cookies', 'cakes-muffins', 'Cookies', 50, 50, 50, 'Baked cookies.', 'cookies bakery', 122),
  product('marble-cake', 'cakes-muffins', 'Marble Cake', 250, 250, 250, 'Marble sponge cake.', 'marble cake slice', 123),
  product('red-velvet-cake', 'cakes-muffins', 'Red Velvet Cake', 400, 400, undefined, 'Rich red velvet cake.', 'red velvet cake slice', 124),
  product('muffin', 'cakes-muffins', 'Muffin', 150, 150, undefined, 'Soft baked muffin.', 'muffin bakery', 125),
  product('black-forest', 'cakes-muffins', 'Black Forest', 400, 400, undefined, 'Chocolate sponge cake with cream.', 'black forest cake slice', 126),

  product('hibiscus-tea', 'herbal-drinks', 'Hibiscus Tea', undefined, undefined, 350, 'A vibrant, tangy tea from hibiscus flowers — naturally refreshing and caffeine free.', 'hibiscus tea glass', 201, 300),
  product('dawa', 'herbal-drinks', 'Dawa', undefined, undefined, 350, 'A soothing mix of lemon, ginger and honey. Served hot or iced.', 'dawa lemon ginger honey drink', 202, 350),

  product('espresso', 'coffee-hot', 'Espresso', 200, 200, 200, 'Strong espresso shot.', 'espresso coffee cup', 127, 200),
  product('karen-americano-small', 'coffee-hot', 'Americano (Small)', undefined, undefined, 300, 'Smooth espresso blended with hot water for a mellow, aromatic taste.', 'americano coffee cup', 203),
  product('karen-americano-big', 'coffee-hot', 'Americano (Big)', undefined, undefined, 350, 'Smooth espresso blended with hot water for a mellow, aromatic taste.', 'americano coffee cup large', 204),
  product('karen-cafe-latte-small', 'coffee-hot', 'Cafe Latte (Small)', undefined, undefined, 300, 'Velvety smooth espresso with steamed milk for a gentle, creamy flavor.', 'cafe latte coffee', 205),
  product('karen-cafe-latte-big', 'coffee-hot', 'Cafe Latte (Big)', undefined, undefined, 350, 'Velvety smooth espresso with steamed milk for a gentle, creamy flavor.', 'cafe latte coffee large', 206),
  product('karen-latte-macchiato', 'coffee-hot', 'Latte Macchiato', undefined, undefined, 350, 'An espresso coffee drink topped with a small amount of foamed or steamed milk.', 'latte macchiato coffee', 207),
  product('karen-cappuccino-small', 'coffee-hot', 'Cappuccino (Small)', undefined, undefined, 250, 'A perfect trio of espresso, steamed milk and froth. Creamy and comforting.', 'cappuccino latte art', 208),
  product('karen-cappuccino-big', 'coffee-hot', 'Cappuccino (Big)', undefined, undefined, 350, 'A perfect trio of espresso, steamed milk and froth. Creamy and comforting.', 'cappuccino coffee large', 209),
  product('karen-hot-chocolate-small', 'coffee-hot', 'Hot Chocolate (Small)', undefined, undefined, 350, 'Smooth, velvety hot chocolate made with rich cocoa and steamed milk.', 'hot chocolate cup', 210),
  product('karen-hot-chocolate-big', 'coffee-hot', 'Hot Chocolate (Big)', undefined, undefined, 450, 'Smooth, velvety hot chocolate made with rich cocoa and steamed milk.', 'hot chocolate large', 211),
  product('karen-milk-alternative', 'coffee-hot', 'Oat / Lactose-Free / Almond Milk', undefined, undefined, 100, 'Milk alternative add-on.', 'oat almond milk coffee', 212),

  product('haile-americano-small', 'coffee-hot', 'Americano (Small)', undefined, undefined, undefined, 'Smooth espresso blended with hot water for a mellow, aromatic taste.', 'americano coffee cup', 301, 300),
  product('haile-americano-large', 'coffee-hot', 'Americano (Large)', undefined, undefined, undefined, 'Smooth espresso blended with hot water for a mellow, aromatic taste.', 'americano coffee cup large', 302, 350),
  product('haile-cafe-latte-small', 'coffee-hot', 'Cafe Latte (Small)', undefined, undefined, undefined, 'Velvety smooth espresso with steamed milk for a gentle, creamy flavor.', 'cafe latte coffee', 303, 250),
  product('haile-cafe-latte-large', 'coffee-hot', 'Cafe Latte (Large)', undefined, undefined, undefined, 'Velvety smooth espresso with steamed milk for a gentle, creamy flavor.', 'cafe latte coffee large', 304, 300),
  product('haile-latte-macchiato', 'coffee-hot', 'Latte Macchiato', undefined, undefined, undefined, 'Espresso coffee drink topped with a small amount of foamed or steamed milk.', 'latte macchiato coffee', 305, 350),
  product('haile-cappuccino-small', 'coffee-hot', 'Cappuccino (Small)', undefined, undefined, undefined, 'A perfect trio of espresso, steamed milk and froth. Creamy and comforting.', 'cappuccino latte art', 306, 250),
  product('haile-cappuccino-large', 'coffee-hot', 'Cappuccino (Large)', undefined, undefined, undefined, 'A perfect trio of espresso, steamed milk and froth. Creamy and comforting.', 'cappuccino coffee large', 307, 350),
  product('haile-hot-chocolate-small', 'coffee-hot', 'Hot Chocolate (Small)', undefined, undefined, undefined, 'Smooth, velvety hot chocolate made with rich cocoa and steamed milk.', 'hot chocolate cup', 308, 350),
  product('haile-hot-chocolate-large', 'coffee-hot', 'Hot Chocolate (Large)', undefined, undefined, undefined, 'Smooth, velvety hot chocolate made with rich cocoa and steamed milk.', 'hot chocolate large', 309, 450),
  product('haile-milk-alternative', 'coffee-hot', 'Oat / Lactose-Free / Almond Milk', undefined, undefined, undefined, 'Milk alternative add-on.', 'oat almond milk coffee', 310, 100),
  product('americano', 'coffee-hot', 'Americano', 310, 310, undefined, 'Espresso with hot water.', 'americano coffee cup', 128),
  product('cappuccino', 'coffee-hot', 'Cappuccino', 390, 390, undefined, 'Espresso with steamed milk and foam.', 'cappuccino latte art', 129),
  product('kenyan-tea', 'coffee-hot', 'Kenyan Tea', 290, 290, 300, 'Traditional Kenyan tea.', 'kenyan milk tea cup', 130, 250),
  product('hot-chocolate', 'coffee-hot', 'Hot Chocolate', 390, 390, undefined, 'Warm chocolate drink.', 'hot chocolate cup', 131),
  product('mocha', 'coffee-hot', 'Mocha', 390, 390, 350, 'Chocolate-flavoured coffee.', 'mocha coffee chocolate', 132, 350),

  product('iced-coffee', 'iced-drinks', 'Iced Coffee', 450, 450, 390, 'Chilled coffee over ice.', 'iced coffee glass', 133, 390),
  product('iced-mocha', 'iced-drinks', 'Iced Mocha', 450, 450, 390, 'Chilled mocha over ice.', 'iced mocha coffee', 134, 390),
  product('iced-americano', 'iced-drinks', 'Iced Americano', 450, 450, undefined, 'Chilled Americano over ice.', 'iced americano coffee', 135),
  product('iced-tea', 'iced-drinks', 'Iced Tea', 450, 450, 390, 'Chilled tea over ice.', 'iced tea glass', 136, 390),
  product('karen-iced-strawberry-latte', 'iced-drinks', 'Iced Strawberry Latte', undefined, undefined, 450, 'Creamy milk, rich espresso and sweet strawberry syrup poured over ice.', 'iced strawberry latte', 213),
  product('karen-matcha', 'iced-drinks', 'Matcha', undefined, undefined, 550, 'Creamy, earthy Japanese green tea. Energizing and refreshing.', 'iced matcha latte', 214),
  product('karen-iced-mango-coffee', 'iced-drinks', 'Iced Mango Coffee', undefined, undefined, 450, 'Bold espresso meets tropical mango for a refreshing balance of rich and fruity flavors.', 'iced mango coffee', 215),

  product('haile-iced-strawberry-latte', 'iced-drinks', 'Iced Strawberry Latte', undefined, undefined, undefined, 'Creamy milk, rich espresso and sweet strawberry syrup poured over ice.', 'iced strawberry latte', 311, 450),
  product('haile-matcha', 'iced-drinks', 'Matcha', undefined, undefined, undefined, 'Creamy, earthy Japanese green tea. Energizing and refreshing.', 'iced matcha latte', 312, 550),
  product('haile-iced-mango-coffee', 'iced-drinks', 'Iced Mango Coffee', undefined, undefined, undefined, 'Bold espresso meets tropical mango for a refreshing balance of rich and fruity flavors.', 'iced mango coffee', 313, 450),

  product('passion-juice', 'smoothies-juices', 'Passion Juice', 300, undefined, 300, 'Passion fruit juice.', 'passion fruit juice glass', 137, 150),
  product('cocktail-juice', 'smoothies-juices', 'Cocktail Juice', 300, undefined, 300, 'Fruit juice blend.', 'fresh fruit juice cocktail', 138, 150),
  product('karen-strawberry-mango-smoothie', 'smoothies-juices', 'Strawberry/Mango Smoothie', undefined, undefined, 400, 'A vibrant blend of seasonal fruits blended to perfection.', 'strawberry mango smoothie', 216),
  product('karen-energy-boost-smoothie', 'smoothies-juices', 'Energy Boost Smoothie', undefined, undefined, 300, 'Power up with complex carbs, like whole grains, fruits, vegetables, nuts and seeds.', 'energy smoothie fruits nuts', 217),

  product('haile-strawberry-mango-smoothie', 'smoothies-juices', 'Strawberry/Mango Smoothie', undefined, undefined, undefined, 'A vibrant blend of seasonal fruits blended to perfection.', 'strawberry mango smoothie', 314, 400),
  product('haile-energy-boost-smoothie', 'smoothies-juices', 'Energy Boost Smoothie', undefined, undefined, undefined, 'Power up with complex carbs, like whole grains, fruits, vegetables, nuts and seeds.', 'energy smoothie fruits nuts', 315, 300),

  product('karen-blue-paradise', 'signature-drinks', 'Blue Paradise', undefined, undefined, 450, 'Butterfly Pea, espresso, milk, lime syrup and blue curacao.', 'blue paradise iced coffee', 218),
  product('karen-irish-coffee', 'signature-drinks', 'Irish Coffee', undefined, undefined, 800, 'Espresso, whisky, simple syrup and whipped cream.', 'irish coffee glass', 219),
  product('karen-butterfly-pea', 'signature-drinks', 'Butterfly Pea', undefined, undefined, 600, 'Layered passion fruit, lime and mint in a fruity limeade.', 'butterfly pea purple drink', 220),
  product('karen-strawberry-mohito', 'signature-drinks', 'Strawberry Mohito', undefined, undefined, 600, 'Fresh strawberries, mint leaves, light rum, lime juice, simple syrup and club soda.', 'strawberry mojito drink', 221),
  product('karen-blueberry-mango-splash', 'signature-drinks', 'Blueberry Mango Splash', undefined, undefined, 600, 'Fresh blueberry fruits, mango juice, blue curacao and mint lemonade.', 'blueberry mango drink', 222),
  product('karen-red-blue-ocean', 'signature-drinks', 'Red Blue Ocean', undefined, undefined, 600, 'Grenadine, Sprite soda and blue curacao.', 'red blue layered drink', 223),
  product('karen-shirley-temple', 'signature-drinks', 'Shirley Temple', undefined, undefined, 600, 'Grenadine, Sprite soda, lime juice; vodka optional for cocktails.', 'shirley temple drink', 224),
  product('karen-blue-lagoon', 'signature-drinks', 'Blue Lagoon', undefined, undefined, 600, 'Citrus and mint flavors with the vibrant color and sweet orange flavor of blue curaçao.', 'blue lagoon drink', 225),

  product('haile-blue-paradise-small', 'signature-drinks', 'Blue Paradise (Small)', undefined, undefined, undefined, 'Butterfly Pea, blue curacao, espresso, milk and lime syrup.', 'blue paradise iced coffee', 316, 450),
  product('haile-blue-paradise-large', 'signature-drinks', 'Blue Paradise (Large)', undefined, undefined, undefined, 'Butterfly Pea, blue curacao, espresso, milk and lime syrup.', 'blue paradise iced coffee large', 317, 550),
  product('haile-butterfly-pea', 'signature-drinks', 'Butterfly Pea', undefined, undefined, undefined, 'Layered passion fruit, butterfly pea powder, lime and mint in a fruity limeade.', 'butterfly pea purple drink', 318, 750),
  product('haile-strawberry-mohito', 'signature-drinks', 'Strawberry Mohito', undefined, undefined, undefined, 'Fresh strawberries, mint leaves, light rum, lime juice, simple syrup and club soda.', 'strawberry mojito drink', 319, 600),
  product('haile-blueberry-mango-splash', 'signature-drinks', 'Blueberry Mango Splash', undefined, undefined, undefined, 'Fresh blueberry fruits, mango juice, blue curacao and mint lemonade.', 'blueberry mango drink', 320, 600),
  product('haile-red-blue-ocean', 'signature-drinks', 'Red Blue Ocean', undefined, undefined, undefined, 'Grenadine, Sprite soda, uber powder and blue curacao.', 'red blue layered drink', 321, 750),
  product('haile-shirley-temple', 'signature-drinks', 'Shirley Temple', undefined, undefined, undefined, 'Grenadine, Sprite soda, lime juice; vodka optional for cocktails.', 'shirley temple drink', 322, 600),
  product('haile-blue-lagoon', 'signature-drinks', 'Blue Lagoon', undefined, undefined, undefined, 'Citrus and mint flavors of a classic mojito with the vibrant color and sweet orange flavor of blue curaçao.', 'blue lagoon drink', 323, 600),

  product('karen-tea-sandwich-combo', 'drink-combos', 'Kenyan Tea + Sandwich', undefined, undefined, 550, 'Snack Attack combo from the Karen drink menu.', 'tea sandwich combo', 226),
  product('karen-black-coffee-cinnamon-roll-combo', 'drink-combos', 'Black Coffee + Cinnamon Roll', undefined, undefined, 500, 'Snack Attack combo from the Karen drink menu.', 'black coffee cinnamon roll', 227),
  product('karen-white-coffee-hotdog-combo', 'drink-combos', 'White Coffee + Hotdog', undefined, undefined, 500, 'Snack Attack combo from the Karen drink menu.', 'white coffee hotdog', 228),
  product('karen-red-blue-ocean-sandwich-combo', 'drink-combos', 'Red Blue Ocean + Sandwich', undefined, undefined, 650, 'Snack Attack combo from the Karen drink menu.', 'blue drink sandwich combo', 229),
  product('karen-strawberry-mohito-cinnamon-roll-combo', 'drink-combos', 'Strawberry Mohito + Cinnamon Roll', undefined, undefined, 800, 'Snack Attack combo from the Karen drink menu.', 'strawberry drink cinnamon roll', 230),
  product('karen-shirley-temple-hotdog-combo', 'drink-combos', 'Shirley Temple + Hotdog', undefined, undefined, 800, 'Snack Attack combo from the Karen drink menu.', 'shirley temple hotdog', 231),
  product('karen-cafe-latte-black-forest-combo', 'drink-combos', 'Cafe Latte + Black Forest Slice', undefined, undefined, 650, 'Snack Attack combo from the Karen drink menu.', 'latte black forest cake', 232),
  product('karen-iced-coffee-samosa-combo', 'drink-combos', 'Iced Coffee + 2 Beef Samosa', undefined, undefined, 480, 'Snack Attack combo from the Karen drink menu.', 'iced coffee beef samosa', 233),
  product('karen-cinnamon-roll-juice-combo', 'drink-combos', 'Cinnamon Roll + Passion/Cocktail', undefined, undefined, 580, 'Snack Attack combo from the Karen drink menu.', 'cinnamon roll fruit juice', 234),
  product('karen-strawberry-mohito-samosa-combo', 'drink-combos', 'Strawberry Mohito + 2 Beef/Chicken Samosa', undefined, undefined, 580, 'Snack Attack combo from the Karen drink menu.', 'strawberry drink samosa', 235),
  product('karen-butterfly-pea-wings-combo', 'drink-combos', 'Butterfly Pea + Chicken Wings', undefined, undefined, 800, 'Snack Attack combo from the Karen drink menu.', 'purple drink chicken wings', 236),
  product('karen-blue-lagoon-kebab-combo', 'drink-combos', 'Blue Lagoon + 1 Beef Kebab', undefined, undefined, 520, 'Snack Attack combo from the Karen drink menu.', 'blue lagoon beef kebab', 237),

  product('haile-tea-sandwich-combo', 'drink-combos', 'Kenyan Tea + Sandwich', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'tea sandwich combo', 324, 550),
  product('haile-black-coffee-cinnamon-roll-combo', 'drink-combos', 'Black Coffee + Cinnamon Roll', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'black coffee cinnamon roll', 325, 500),
  product('haile-white-coffee-hotdog-combo', 'drink-combos', 'White Coffee + Hotdog', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'white coffee hotdog', 326, 500),
  product('haile-red-blue-ocean-sandwich-combo', 'drink-combos', 'Red Blue Ocean + Sandwich', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'blue drink sandwich combo', 327, 650),
  product('haile-strawberry-mohito-cinnamon-roll-combo', 'drink-combos', 'Strawberry Mohito + Cinnamon Roll', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'strawberry drink cinnamon roll', 328, 800),
  product('haile-shirley-temple-hotdog-combo', 'drink-combos', 'Shirley Temple + Hotdog', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'shirley temple hotdog', 329, 800),
  product('haile-cafe-latte-black-forest-combo', 'drink-combos', 'Cafe Latte + Black Forest Slice', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'latte black forest cake', 330, 550),
  product('haile-iced-coffee-samosa-combo', 'drink-combos', 'Iced Coffee + 2 Beef Samosa', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'iced coffee beef samosa', 331, 480),
  product('haile-cinnamon-roll-juice-combo', 'drink-combos', 'Cinnamon Roll + Passion/Cocktail', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'cinnamon roll fruit juice', 332, 580),
  product('haile-strawberry-mohito-samosa-combo', 'drink-combos', 'Strawberry Mohito + 2 Beef/Chicken Samosa', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'strawberry drink samosa', 333, 580),
  product('haile-butterfly-pea-wings-combo', 'drink-combos', 'Butterfly Pea + Chicken Wings', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'purple drink chicken wings', 334, 800),
  product('haile-blue-lagoon-kebab-combo', 'drink-combos', 'Blue Lagoon + 1 Beef Kebab', undefined, undefined, undefined, 'Snack Attack combo from the Haile drink menu.', 'blue lagoon beef kebab', 335, 520),

  product('strawberry-milkshake', 'milkshakes-icecream', 'Strawberry Milkshake', 550, undefined, 400, 'Strawberry milkshake.', 'strawberry milkshake', 139, 400),
  product('caramel-milkshake', 'milkshakes-icecream', 'Caramel Milkshake', 600, undefined, undefined, 'Caramel milkshake.', 'caramel milkshake', 140),
  product('vanilla-milkshake', 'milkshakes-icecream', 'Vanilla Milkshake', 500, undefined, 400, 'Vanilla milkshake.', 'vanilla milkshake', 141, 400),
  product('peanut-milkshake', 'milkshakes-icecream', 'Peanut Milkshake', 650, undefined, 450, 'Peanut milkshake.', 'peanut butter milkshake', 142, 450),
  product('oreo-milkshake', 'milkshakes-icecream', 'Oreo Milkshake', 650, undefined, 450, 'Oreo milkshake.', 'oreo cookies cream milkshake', 143, 450),
  product('ice-cream', 'milkshakes-icecream', 'Ice Cream', 150, undefined, undefined, 'Price per scoop.', 'ice cream scoop', 144)
] as const;

export const FEEDBACK_AREAS = ['Food & Beverage', 'Service Quality', 'Atmosphere', 'Entertainment', 'Staff / Waiter'] as const;

export const priorityCategories = (branchId: BranchId): readonly string[] => {
  if (branchId === 'haile' || branchId === 'cbd') return ['coffee-hot','herbal-drinks','drink-combos','breakfast','hot-snacks','wraps-rolls','lunch','food-combos','traditional-sides','pastries','donuts','cakes-muffins','iced-drinks','signature-drinks','smoothies-juices','milkshakes-icecream','wraps-rolls','lunch'];
  if (branchId === 'imara-daima') return ['signature-drinks','iced-drinks','drink-combos','smoothies-juices','coffee-hot','lunch','hot-snacks','wraps-rolls','pastries'];
  return ['lunch','wraps-rolls','hot-snacks','drink-combos','coffee-hot','herbal-drinks','pastries','cakes-muffins','donuts','iced-drinks','signature-drinks','smoothies-juices','milkshakes-icecream'];
};
export const productsForBranch = (branchId: BranchId): readonly Product[] =>
  PRODUCTS.filter((item) => item.prices[branchId] !== undefined)
   .sort((a,b) => priorityCategories(branchId).indexOf(a.category) - priorityCategories(branchId).indexOf(b.category));

export const categoriesForBranch = (branchId: BranchId): readonly Category[] => {
  const ids = new Set(productsForBranch(branchId).map((item) => item.category));
  return CATEGORIES.filter((category) => ids.has(category.id)).sort((a,b) => priorityCategories(branchId).indexOf(a.id) - priorityCategories(branchId).indexOf(b.id));
};

export const branchById = (branchId: BranchId): Branch =>
  BRANCHES.find((branch) => branch.id === branchId) ?? BRANCHES[0]!;
