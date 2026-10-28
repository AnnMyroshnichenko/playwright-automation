import { test, expect } from '../fixtures/products.fixture';
import { MainPage } from '../pages/main-page';
import { searchKeywords, invalidKeywords } from '../test-data/search-keywords';

test.describe('TC C518: Search for units by keyword', () => {
  test('should search units by keyword', async ({ page, productsPage }) => {
    const mainPage = new MainPage(page);

    await expect(mainPage.searchField).toBeVisible();
    await mainPage.searchField.click();
    await mainPage.submitKeywordSearch();

    await expect(productsPage.map).toBeVisible();

    await mainPage.enterSearchKeyword(searchKeywords.valid);
    await mainPage.submitKeywordSearch();

    await expect(productsPage.searchResultsTitle).toBeVisible();
    await expect(productsPage.searchResultsTitle).toContainText(
      searchKeywords.valid,
    );

    await mainPage.clearSearchField();
    await expect(mainPage.searchField).toHaveValue('');

    for (const keyword of [
      searchKeywords.valid.toUpperCase(),
      searchKeywords.valid.toLowerCase(),
    ]) {
      await mainPage.enterSearchKeyword(keyword);
      await mainPage.submitKeywordSearch();

      await expect(productsPage.map).toBeVisible();
    }

    for (const keyword of invalidKeywords) {
      await mainPage.enterSearchKeyword(keyword);
      await mainPage.submitKeywordSearch();

      await expect(productsPage.map).toBeVisible();
    }
  });
});
