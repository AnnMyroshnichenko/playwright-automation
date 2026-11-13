import { test, expect } from '../fixtures/products.fixture';

test.describe('TC C516: Drag and drop the map', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.openMap();
    await expect(productsPage.map).toBeVisible();
  });

  test('should drag the map to a different area', async ({ productsPage }) => {
    const mapPane = productsPage.map.locator('.leaflet-map-pane');

    let initialTransform = '';

    await test.step('Get initial map position', async () => {
      await expect(mapPane).toHaveCount(1);

      initialTransform = await mapPane.evaluate(
        (element) => getComputedStyle(element).transform,
      );
    });

    await test.step('Drag the map to a different area', async () => {
      await productsPage.dragMapToDifferentArea();
    });

    await test.step('Verify that the map position has changed', async () => {
      await expect
        .poll(() =>
          mapPane.evaluate((element) => getComputedStyle(element).transform),
        )
        .not.toBe(initialTransform);
    });
  });
});
