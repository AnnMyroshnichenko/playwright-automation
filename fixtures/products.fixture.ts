import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';

type ProductsFixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
};

export const test = base.extend<ProductsFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect };
