import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.addInitScript(() => {
            document.addEventListener('DOMContentLoaded', () => {
                const style = document.createElement('style');
                style.textContent = '[data-testid="completeTenderRectangle"] { display: none !important; }';
                document.head.appendChild(style);
            });
        });

        await use(page);
    },
});

export { expect } from '@playwright/test';