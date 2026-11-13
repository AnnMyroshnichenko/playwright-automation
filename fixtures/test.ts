import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';
import { ProfilePage } from '../pages/profile-page';

type Fixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
  profilePage: ProfilePage;
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
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
});

export { expect } from '@playwright/test';
