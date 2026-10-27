import {test, expect} from '../../fixtures/fixture';
import {priceRanges, resultMessage} from '../../test-data/prices';

test.describe('C548 Filtering by price', () => {
    test.beforeEach(async ({ mainPage, productsPage }) => {
        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.showOnMap.click();
        await expect(productsPage.map).toBeVisible({ timeout: 10000 });
    });

    for (const range of priceRanges) {
        test(`should filter products by price range: ${range.min} - ${range.max}`, async ({productsPage}) => {
            await productsPage.minPriceInput.pressSequentially(range.min.toString());
            await productsPage.minPriceInput.press('Enter');
            await expect(productsPage.minPriceInput).toHaveValue(range.min.toString());
            await productsPage.maxPriceInput.pressSequentially(range.max.toString());
            await productsPage.maxPriceInput.press('Enter');
            await expect(productsPage.maxPriceInput).toHaveValue(range.max.toString());
        });
    }

    test('should show no results for max price 0', async ({productsPage}) => {
        await productsPage.maxPriceInput.pressSequentially('0');
        await productsPage.maxPriceInput.press('Enter');
        await expect(productsPage.resultsCount).toHaveText(resultMessage);
    });
});