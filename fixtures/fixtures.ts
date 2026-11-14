import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';

type Fixtures = {
    mainPage: MainPage;
    productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.addInitScript(() => {
            const hidePopup = () => {
                const style = document.createElement('style');
                style.textContent = '[data-testid="completeTenderRectangle"] { display: none !important; }';
                document.head.appendChild(style);
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', hidePopup);
            } else {
                hidePopup();
            }
        });

        await use(page);
    },

    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
});

export { expect } from '@playwright/test';