import { test, expect } from '../fixtures/products.fixture';
import { searchKeywords, invalidKeywords } from '../test-data/search-keywords';

test.describe('TC C518: Search for units by keyword', () => {
  test.beforeEach(async ({ mainPage, productsPage }) => {
    await mainPage.openMap();
    await expect(productsPage.map).toBeVisible();
  });

  test('should search units by valid keyword', async ({
    mainPage,
    productsPage,
  }) => {
    await expect(mainPage.searchField).toBeVisible();

    await test.step('Enter valid keyword and submit search', async () => {
      await mainPage.enterSearchKeyword(searchKeywords.valid);
      await mainPage.submitKeywordSearch();
    });

    await test.step('Verify search results title', async () => {
      await expect(productsPage.searchResultsTitle).toBeVisible();
      await expect(productsPage.searchResultsTitle).toContainText(
        searchKeywords.valid,
      );
    });
  });

  for (const keyword of [
    searchKeywords.valid.toUpperCase(),
    searchKeywords.valid.toLowerCase(),
  ]) {
    test(`should search units by keyword "${keyword}"`, async ({
      mainPage,
      productsPage,
    }) => {
      await expect(mainPage.searchField).toBeVisible();

      await mainPage.enterSearchKeyword(keyword);
      await mainPage.submitKeywordSearch();

      await expect(productsPage.searchResultsTitle).toBeVisible();
      await expect(productsPage.searchResultsTitle).toContainText(keyword);
    });
  }

  for (const keyword of invalidKeywords) {
    test(`should handle invalid keyword "${keyword}"`, async ({
      mainPage,
      productsPage,
    }) => {
      await expect(mainPage.searchField).toBeVisible();

      await mainPage.enterSearchKeyword(keyword);
      await mainPage.submitKeywordSearch();

      await expect(productsPage.searchResultsTitle).toBeVisible();
      await expect(productsPage.searchResultsTitle).toContainText(keyword);
    });
  }
});
