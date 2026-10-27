import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';
import { TendersPage } from '../pages/tenders-page';

type Fixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
  tendersPage: TendersPage;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  tendersPage: async ({ page }, use) => {
    const tendersPage = new TendersPage(page);
    await use(tendersPage);
  },
});

export { expect } from '@playwright/test';
