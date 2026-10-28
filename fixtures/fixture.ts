import { test as base, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products-page';
import { MainPage } from '../pages/main-page';

type Fixtures = {
  productsPage: ProductsPage;
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
});

export { expect };