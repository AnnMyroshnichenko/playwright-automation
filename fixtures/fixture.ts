import { test as base, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products-page';
import { MainPage } from '../pages/main-page';

type Fixtures = {
    productsPage: ProductsPage;
    mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        const mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.showOnMap.click();
        await use(productsPage);
    },

    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
});

export { expect };
