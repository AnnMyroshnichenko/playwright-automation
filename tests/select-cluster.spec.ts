import { test, expect } from '../fixtures/products.fixture';

test.describe('TC C517: Select a cluster of units', () => {
  test('should zoom into map clusters and display individual units', async ({
    productsPage,
  }) => {
    await expect(productsPage.zoomOutButton).toBeVisible();

    await productsPage.zoomOut();

    await expect(productsPage.clusters.first()).toBeVisible();

    await productsPage.selectFirstCluster();

    await expect(productsPage.map).toBeVisible();

    await productsPage.zoomOut();

    await productsPage.selectAnotherClusterIfAvailable();

    await expect(productsPage.map).toBeVisible();
  });
});
