import {test as base} from '@playwright/test';
import { ProductsPage } from '../pages/products-page';

type Fixtures = {
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  }
});

export { expect } from '@playwright/test';