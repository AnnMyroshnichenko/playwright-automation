import { test, expect } from '../fixtures/fixtures';

test.describe('Map tests', () => {

    test.beforeEach(async ({ mainPage, productsPage }) => {

        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.showOnMap.click();
        await expect(productsPage.map.mapWindow).toBeVisible({ timeout: 10000 });
        await expect(productsPage.map.regions.first()).toBeVisible();
    });

    test('C481 Switching from map to list.', async ({ productsPage }) => {
        await expect(productsPage.map.showAsListBtn).toBeVisible();
        await productsPage.map.showAsListBtn.click();

        await expect(productsPage.listedAds).toBeVisible();
        await expect(productsPage.showAsMapBtn).toBeVisible();
        await productsPage.showAsMapBtn.click();
        await expect(productsPage.map.mapWindow).toBeVisible();
    });

    test('C501 Zoom in and out on the map.', async ({ productsPage }) => {
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