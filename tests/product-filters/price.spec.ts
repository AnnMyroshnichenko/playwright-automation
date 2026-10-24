import {test, expect} from '../../fixtures/test';
import {priceRanges} from '../../test-data/prices';

test.describe('Price filter', () => {
    test.beforeEach(async ({productsPage}) => {
        await productsPage.open();
    });

    for (const range of priceRanges) {
        test(`should filter products by price range: ${range.min} - ${range.max}`, async ({productsPage}) => {
            await productsPage.minPriceInput.fill(range.min.toString());
            await productsPage.minPriceInput.press('Enter');
            await expect(productsPage.minPriceInput).toHaveValue(range.min.toString());
            await productsPage.maxPriceInput.fill(range.max.toString());
            await productsPage.maxPriceInput.press('Enter');
            await expect(productsPage.maxPriceInput).toHaveValue(range.max.toString());
        });
    }

    test('should show no results for max price 0', async ({productsPage}) => {
        await productsPage.maxPriceInput.fill('0');
        await productsPage.maxPriceInput.press('Enter');
        await expect(productsPage.resultsCount).toHaveText(/Знайдено 0 оголошень?\s+на видимій території/);
    });
});