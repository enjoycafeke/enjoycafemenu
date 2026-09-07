import { describe, expect, it } from 'vitest';
import { BRANCHES, CATEGORIES, PRODUCTS, categoriesForBranch, productsForBranch } from '../src/data/menu';

describe('Enjoy Cafe menu data', () => {
  it('has unique branch ids', () => {
    expect(new Set(BRANCHES.map((branch) => branch.id)).size).toBe(BRANCHES.length);
  });

  it('has unique category ids', () => {
    expect(new Set(CATEGORIES.map((category) => category.id)).size).toBe(CATEGORIES.length);
  });

  it('has unique product ids', () => {
    expect(new Set(PRODUCTS.map((product) => product.id)).size).toBe(PRODUCTS.length);
  });

  it('does not expose products without a branch price', () => {
    for (const branch of BRANCHES) {
      for (const product of productsForBranch(branch.id)) {
        expect(product.prices[branch.id]).toBeTypeOf('number');
      }
    }
  });

  it('only returns categories with at least one branch product', () => {
    for (const branch of BRANCHES) {
      const products = productsForBranch(branch.id);
      for (const category of categoriesForBranch(branch.id)) {
        expect(products.some((product) => product.category === category.id)).toBe(true);
      }
    }
  });

  it('gives every product an item-specific visual and fallback', () => {
    for (const item of PRODUCTS) {
      expect(item.image).toContain('loremflickr.com/960/720/');
      expect(item.fallbackImage.length).toBeGreaterThan(0);
    }
  });
});

describe('Karen 2025 drink menu merge', () => {
  const karenPrice = (id: string) => PRODUCTS.find((item) => item.id === id)?.prices.karen;

  it('includes the verified Karen drink prices and size variants', () => {
    expect(karenPrice('hibiscus-tea')).toBe(350);
    expect(karenPrice('dawa')).toBe(350);
    expect(karenPrice('espresso')).toBe(200);
    expect(karenPrice('karen-americano-small')).toBe(300);
    expect(karenPrice('karen-americano-big')).toBe(350);
    expect(karenPrice('karen-cafe-latte-small')).toBe(300);
    expect(karenPrice('karen-cafe-latte-big')).toBe(350);
    expect(karenPrice('karen-latte-macchiato')).toBe(350);
    expect(karenPrice('karen-cappuccino-small')).toBe(250);
    expect(karenPrice('karen-cappuccino-big')).toBe(350);
    expect(karenPrice('kenyan-tea')).toBe(300);
    expect(karenPrice('karen-hot-chocolate-small')).toBe(350);
    expect(karenPrice('karen-hot-chocolate-big')).toBe(450);
    expect(karenPrice('mocha')).toBe(350);
    expect(karenPrice('karen-milk-alternative')).toBe(100);
  });

  it('includes Karen frosty favourites, milkshakes and signature drinks', () => {
    expect(karenPrice('karen-iced-strawberry-latte')).toBe(450);
    expect(karenPrice('iced-tea')).toBe(390);
    expect(karenPrice('karen-matcha')).toBe(550);
    expect(karenPrice('iced-coffee')).toBe(390);
    expect(karenPrice('iced-mocha')).toBe(390);
    expect(karenPrice('karen-iced-mango-coffee')).toBe(450);
    expect(karenPrice('passion-juice')).toBe(300);
    expect(karenPrice('cocktail-juice')).toBe(300);
    expect(karenPrice('karen-strawberry-mango-smoothie')).toBe(400);
    expect(karenPrice('karen-energy-boost-smoothie')).toBe(300);
    expect(karenPrice('strawberry-milkshake')).toBe(400);
    expect(karenPrice('vanilla-milkshake')).toBe(400);
    expect(karenPrice('peanut-milkshake')).toBe(450);
    expect(karenPrice('oreo-milkshake')).toBe(450);
    expect(karenPrice('karen-blue-paradise')).toBe(450);
    expect(karenPrice('karen-irish-coffee')).toBe(800);
    expect(karenPrice('karen-butterfly-pea')).toBe(600);
    expect(karenPrice('karen-strawberry-mohito')).toBe(600);
    expect(karenPrice('karen-blueberry-mango-splash')).toBe(600);
    expect(karenPrice('karen-red-blue-ocean')).toBe(600);
    expect(karenPrice('karen-shirley-temple')).toBe(600);
    expect(karenPrice('karen-blue-lagoon')).toBe(600);
  });

  it('includes the Karen drink-menu combos without changing the root menu model', () => {
    expect(karenPrice('doughnut-cappuccino')).toBe(500);
    expect(karenPrice('bhajia-passion-combo')).toBe(550);
    expect(karenPrice('karen-tea-sandwich-combo')).toBe(550);
    expect(karenPrice('karen-black-coffee-cinnamon-roll-combo')).toBe(500);
    expect(karenPrice('karen-white-coffee-hotdog-combo')).toBe(500);
    expect(karenPrice('karen-red-blue-ocean-sandwich-combo')).toBe(650);
    expect(karenPrice('karen-strawberry-mohito-cinnamon-roll-combo')).toBe(800);
    expect(karenPrice('karen-shirley-temple-hotdog-combo')).toBe(800);
    expect(karenPrice('karen-cafe-latte-black-forest-combo')).toBe(650);
    expect(karenPrice('karen-iced-coffee-samosa-combo')).toBe(480);
    expect(karenPrice('karen-cinnamon-roll-juice-combo')).toBe(580);
    expect(karenPrice('karen-strawberry-mohito-samosa-combo')).toBe(580);
    expect(karenPrice('karen-butterfly-pea-wings-combo')).toBe(800);
    expect(karenPrice('karen-blue-lagoon-kebab-combo')).toBe(520);
  });
});


describe('Haile drink menu merge', () => {
  const hailePrice = (id: string) => PRODUCTS.find((item) => item.id === id)?.prices.haile;

  it('includes the verified Haile herbal and hot drink prices', () => {
    expect(hailePrice('hibiscus-tea')).toBe(300);
    expect(hailePrice('dawa')).toBe(350);
    expect(hailePrice('espresso')).toBe(200);
    expect(hailePrice('haile-americano-small')).toBe(300);
    expect(hailePrice('haile-americano-large')).toBe(350);
    expect(hailePrice('haile-cafe-latte-small')).toBe(250);
    expect(hailePrice('haile-cafe-latte-large')).toBe(300);
    expect(hailePrice('haile-latte-macchiato')).toBe(350);
    expect(hailePrice('haile-cappuccino-small')).toBe(250);
    expect(hailePrice('haile-cappuccino-large')).toBe(350);
    expect(hailePrice('kenyan-tea')).toBe(250);
    expect(hailePrice('haile-hot-chocolate-small')).toBe(350);
    expect(hailePrice('haile-hot-chocolate-large')).toBe(450);
    expect(hailePrice('mocha')).toBe(350);
    expect(hailePrice('haile-milk-alternative')).toBe(100);
  });

  it('includes the verified Haile frosty favourites and milkshakes', () => {
    expect(hailePrice('iced-coffee')).toBe(390);
    expect(hailePrice('iced-mocha')).toBe(390);
    expect(hailePrice('haile-iced-mango-coffee')).toBe(450);
    expect(hailePrice('haile-iced-strawberry-latte')).toBe(450);
    expect(hailePrice('iced-tea')).toBe(390);
    expect(hailePrice('haile-matcha')).toBe(550);
    expect(hailePrice('passion-juice')).toBe(150);
    expect(hailePrice('cocktail-juice')).toBe(150);
    expect(hailePrice('haile-strawberry-mango-smoothie')).toBe(400);
    expect(hailePrice('haile-energy-boost-smoothie')).toBe(300);
    expect(hailePrice('strawberry-milkshake')).toBe(400);
    expect(hailePrice('vanilla-milkshake')).toBe(400);
    expect(hailePrice('peanut-milkshake')).toBe(450);
    expect(hailePrice('oreo-milkshake')).toBe(450);
  });

  it('includes the verified Haile signature drinks and size-specific Blue Paradise', () => {
    expect(hailePrice('haile-blue-paradise-small')).toBe(450);
    expect(hailePrice('haile-blue-paradise-large')).toBe(550);
    expect(hailePrice('haile-butterfly-pea')).toBe(750);
    expect(hailePrice('haile-strawberry-mohito')).toBe(600);
    expect(hailePrice('haile-blueberry-mango-splash')).toBe(600);
    expect(hailePrice('haile-red-blue-ocean')).toBe(750);
    expect(hailePrice('haile-shirley-temple')).toBe(600);
    expect(hailePrice('haile-blue-lagoon')).toBe(600);
    expect(hailePrice('karen-irish-coffee')).toBeUndefined();
  });

  it('includes every Haile drink-menu combo shown in the provided menu', () => {
    expect(hailePrice('doughnut-cappuccino')).toBe(500);
    expect(hailePrice('haile-tea-sandwich-combo')).toBe(550);
    expect(hailePrice('haile-black-coffee-cinnamon-roll-combo')).toBe(500);
    expect(hailePrice('haile-white-coffee-hotdog-combo')).toBe(500);
    expect(hailePrice('haile-red-blue-ocean-sandwich-combo')).toBe(650);
    expect(hailePrice('haile-strawberry-mohito-cinnamon-roll-combo')).toBe(800);
    expect(hailePrice('haile-shirley-temple-hotdog-combo')).toBe(800);
    expect(hailePrice('haile-cafe-latte-black-forest-combo')).toBe(550);
    expect(hailePrice('haile-iced-coffee-samosa-combo')).toBe(480);
    expect(hailePrice('haile-cinnamon-roll-juice-combo')).toBe(580);
    expect(hailePrice('haile-strawberry-mohito-samosa-combo')).toBe(580);
    expect(hailePrice('haile-butterfly-pea-wings-combo')).toBe(800);
    expect(hailePrice('haile-blue-lagoon-kebab-combo')).toBe(520);
  });
});
