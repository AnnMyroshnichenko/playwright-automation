import { test, expect } from '../fixtures/fixtures';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';

test.describe('Map tests', () => {
    let mainPage: MainPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        productsPage = new ProductsPage(page);

        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.clickShowOnMap();
        await expect(productsPage.map.mapWindow).toBeVisible({ timeout: 10000 });
        await expect(productsPage.map.regions.first()).toBeVisible();
    });

    test('C481 Switching from map to list.', async () => {
        await expect(productsPage.map.showAsListBtn).toBeVisible();
        await productsPage.map.clickShowAsListBtn();

        await expect(productsPage.listedAds).toBeVisible();
        await expect(productsPage.showAsMapBtn).toBeVisible();
        await productsPage.clickSwitchToMapBtn();
        await expect(productsPage.map.mapWindow).toBeVisible();
    });

    test('C501 Zoom in and out on the map.', async () => {
        await test.step('1. Zoom in/out with mouse wheel', async () => {
            let before = await productsPage.map.getRegionWidth();
            await productsPage.map.scrollZoom(-110);
            await expect.poll(() => productsPage.map.getRegionWidth()).toBeGreaterThan(before);
            await productsPage.map.waitForZoomEnd();


            before = await productsPage.map.getRegionWidth();
            await productsPage.map.scrollZoom(110);
            await expect.poll(() => productsPage.map.getRegionWidth()).toBeLessThan(before);
            await productsPage.map.waitForZoomEnd();
        });

        await test.step('2. Zoom in/out with the button', async () => {
            let before = await productsPage.map.getRegionWidth();
            await productsPage.map.zoomInBtn.click();

            await expect.poll(async () => (await productsPage.map.getRegionWidth()) / before).toBeCloseTo(2, 0);
            await productsPage.map.waitForZoomEnd();
            await expect(productsPage.map.zoomOutBtn).toHaveAttribute('aria-disabled', 'false');

            before = await productsPage.map.getRegionWidth();

            await productsPage.map.zoomOutBtn.click();
            await expect.poll(async () => (await productsPage.map.getRegionWidth()) / before).toBeCloseTo(0.5, 0);
            await productsPage.map.waitForZoomEnd();
            await expect(productsPage.map.zoomOutBtn).toHaveAttribute('aria-disabled', 'true');
        });
    })
});