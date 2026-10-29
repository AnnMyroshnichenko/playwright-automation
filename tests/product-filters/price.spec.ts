import {test, expect} from '../../fixtures/fixture';
import {priceRanges} from '../../test-data/prices';
import {resultCountLabel, zeroResultsCountLabel} from '../../test-data/results-count';

test.describe('C548 Filtering by price', () => {
    test.beforeEach(async ({ mainPage, productsPage }) => {
        await mainPage.open();
        await mainPage.closePopup();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.showOnMap.click();
        await expect(productsPage.map).toBeVisible();
    });

    for (const range of priceRanges) {
        test(`should filter products by price range: ${range.min} - ${range.max}`, async ({productsPage}) => {
            await productsPage.minPriceInput.pressSequentially(range.min.toString());
            await productsPage.minPriceInput.press('Enter');
            await expect(productsPage.minPriceInput).toHaveValue(range.min.toString());
            await productsPage.maxPriceInput.pressSequentially(range.max.toString());
            await productsPage.maxPriceInput.press('Enter');
            await expect(productsPage.maxPriceInput).toHaveValue(range.max.toString());
            await expect(productsPage.resultsCount).toHaveText(resultCountLabel);
        });
    }

    test('should show no results for max price 0', async ({productsPage}) => {
        await productsPage.maxPriceInput.pressSequentially('0');
        await productsPage.maxPriceInput.press('Enter');
        await expect(productsPage.resultsCount).toHaveText(zeroResultsCountLabel);
    });
});