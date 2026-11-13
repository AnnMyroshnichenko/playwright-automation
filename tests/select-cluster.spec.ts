import { test, expect } from '../fixtures/products.fixture';

test.describe('TC C517: Select a cluster of units', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.openMap();
    await expect(productsPage.map).toBeVisible();
  });

  test('should select a cluster and update the map', async ({
    productsPage,
  }) => {
    let initialClusterCount = 0;

    await test.step('Zoom out and count initial clusters', async () => {
      await expect(productsPage.zoomOutButton).toBeVisible();

      await productsPage.zoomOut();

      initialClusterCount = await productsPage.clusters.count();

      expect(initialClusterCount).toBeGreaterThan(0);
    });

    await test.step('Select the first cluster', async () => {
      await productsPage.selectFirstCluster();
    });

    await test.step('Verify that the number of clusters decreases', async () => {
      await expect
        .poll(() => productsPage.clusters.count())
        .toBeLessThan(initialClusterCount);
    });
  });
});
