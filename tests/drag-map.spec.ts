import { test, expect } from '../fixtures/products.fixture';

test.describe('TC C516: Drag and drop the map', () => {
  test('should drag the map to a different area', async ({ productsPage }) => {
    await productsPage.dragMapToDifferentArea();

    await expect(productsPage.map).toBeVisible();
  });
});
