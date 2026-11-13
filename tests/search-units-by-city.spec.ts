import { test, expect } from '../fixtures/products.fixture';
import { cities, invalidCities } from '../test-data/cities';

test.describe('TC C519: Search for units by city', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.openMap();
    await expect(productsPage.map).toBeVisible();
  });

  for (const value of [
    cities.kyivSearch.toUpperCase(),
    cities.kyivSearch.toLowerCase(),
  ]) {
    test(`should show Kyiv suggestion for "${value}"`, async ({
      productsPage,
    }) => {
      await expect(productsPage.cityField).toBeVisible();

      await productsPage.enterCity(value);

      await expect(productsPage.getCitySuggestion(cities.kyiv)).toBeVisible();
    });
  }

  test('should select a city suggestion', async ({ productsPage }) => {
    await expect(productsPage.cityField).toBeVisible();

    await test.step('Enter city and find suggestion', async () => {
      await productsPage.enterCity(cities.kyivSearch);

      await expect(productsPage.getCitySuggestion(cities.kyiv)).toBeVisible();
    });

    await test.step('Select suggestion and verify city field', async () => {
      await productsPage.selectCitySuggestion(cities.kyiv);

      await expect(productsPage.cityField).toHaveValue(cities.kyivSearch);
    });
  });

  for (const city of invalidCities) {
    test(`should not show Kyiv suggestion for invalid city "${city}"`, async ({
      productsPage,
    }) => {
      await expect(productsPage.cityField).toBeVisible();

      await productsPage.enterCity(city);

      await expect(
        productsPage.getCitySuggestion(cities.kyiv),
      ).not.toBeVisible();
    });
  }
});
