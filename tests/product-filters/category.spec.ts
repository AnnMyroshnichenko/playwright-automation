import {test, expect} from '../../fixtures/test';
import {categories} from '../../test-data/categories';

test.describe('Category filters', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  for(const category of categories) {
    test(`should filter products by category: ${category.name}`, async ({ productsPage }) => {
        await productsPage.selectCategory(category.name);
        await expect(productsPage.getSelectedFilter(category.filterTestId)).toBeVisible();
        await productsPage.resetFilters.click();
        await expect(productsPage.getSelectedFilter(category.filterTestId)).toHaveCount(0);
    });
  }

  for (const category of categories) {
    for (const subcategory of category.subcategories || []) {
      test(`should filter products by subcategory: ${subcategory.name}`, async ({ productsPage }) => {
        await productsPage.selectCategory(category.name);
        await productsPage.selectSubcategory(subcategory.name);
        await expect(productsPage.getSelectedFilter(subcategory.filterTestId)).toBeVisible();
        await productsPage.resetFilters.click();
        await expect(productsPage.getSelectedFilter(subcategory.filterTestId)).toHaveCount(0);
      });
    }
  }
});