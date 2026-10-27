import { test as base, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products-page';
import { MainPage } from '../pages/main-page';

type Fixtures = {
  productsPage: ProductsPage;
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent =
          '[data-testid="completeTenderRectangle"] { display: none !important; }';

        document.head.appendChild(style);
      });
    });

    await use(page);
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
});

export { expect };