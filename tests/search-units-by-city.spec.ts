import { test, expect } from '../fixtures/products.fixture';
import { cities, invalidCities } from '../test-data/cities';

test.describe('TC C519: Search for units by city', () => {
  test('should search units by city', async ({ productsPage }) => {
    await expect(productsPage.cityField).toBeVisible();
    await productsPage.cityField.click();
    await productsPage.submitCitySearch();

    await expect(productsPage.map).toBeVisible();

    await productsPage.enterCityCharacterByCharacter(cities.kyivSearch);

    await expect(productsPage.getCitySuggestion(cities.kyiv)).toBeVisible();

    await productsPage.clearCityField();

    await expect(productsPage.cityField).toHaveValue('');
    await expect(productsPage.map).toBeVisible();

    for (const value of [cities.kyivUppercase, cities.kyivLowercase]) {
      await productsPage.enterCity(value);
      await expect(productsPage.cityField).toHaveValue(value);
    }

    await productsPage.enterCity(cities.kyivSearch);

    const citySuggestion = productsPage.getCitySuggestion(cities.kyiv);

    await expect(citySuggestion).toBeVisible();
    await expect(productsPage.getCitySuggestion(cities.kyiv)).toBeVisible({
      timeout: 15000,
    });

    await expect(productsPage.map).toBeVisible();

    for (const value of invalidCities) {
      await productsPage.enterCity(value);
      await productsPage.submitCitySearch();

      await expect(productsPage.map).toBeVisible();
    }
  });
});
