import { test, expect } from '../fixtures/products.fixture';

test.describe('TC C516: Drag and drop the map', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.open();
    await expect(mainPage.showOnMap).toBeVisible();

    await mainPage.clickShowOnMap();
    await expect(productsPage.map).toBeVisible();
  });

  test('should drag the map to a different area', async ({ productsPage }) => {
    await productsPage.dragMapToDifferentArea();

    await expect(productsPage.map).toBeVisible();
  });
});
