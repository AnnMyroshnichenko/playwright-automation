import {test, expect} from '../../fixtures/fixture';
import {categories} from '../../test-data/categories';

test.describe('C547 Filtering by category', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.open();
    await expect(mainPage.showOnMap).toBeVisible();
    await mainPage.showOnMap.click();
    await expect(productsPage.map).toBeVisible({ timeout: 10000 });
  });

  for (const category of categories) {
    for (const subcategory of category.subcategories || []) {
      test(`should filter products by category and subcategory: ${category.name} - ${subcategory.name}`, async ({ productsPage }) => {
        await productsPage.selectCategory(category.name);
        await productsPage.selectSubcategory(subcategory.name);
        await expect(productsPage.getSelectedFilter(subcategory.filterTestId)).toBeVisible();
        await productsPage.resetFilters.click();
        await expect(productsPage.getSelectedFilter(subcategory.filterTestId)).toHaveCount(0);
      });
    }
  }
});