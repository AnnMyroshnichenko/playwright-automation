import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';

type ProductsFixtures = {
  productsPage: ProductsPage;
};

export const test = base.extend<ProductsFixtures>({
  productsPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    const productsPage = new ProductsPage(page);

    await mainPage.open();
    await expect(mainPage.showOnMap).toBeVisible();
    await mainPage.clickShowOnMap();
    await expect(productsPage.map).toBeVisible();

    await use(productsPage);
  },
});

export { expect };
