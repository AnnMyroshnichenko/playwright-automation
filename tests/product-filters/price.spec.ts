import { test, expect } from '../../fixtures/fixture';
import {
    validPriceRanges,
    negativePriceValues,
    fractionalPriceValues,
} from '../../test-data/prices';
import { zeroResultsCountLabel } from '../../test-data/results-count';

test.describe('C548 Filtering by price', () => {
    for (const range of validPriceRanges) {
        test(`should filter products by price range: ${range.min} - ${range.max}`, async ({
            productsPage,
        }) => {
            await productsPage.minPriceInput.pressSequentially(range.min.toString());
            await productsPage.minPriceInput.press('Enter');
            await expect(productsPage.minPriceInput).toHaveValue(range.min.toString());
            await productsPage.maxPriceInput.pressSequentially(range.max.toString());
            await productsPage.maxPriceInput.press('Enter');
            await expect(productsPage.maxPriceInput).toHaveValue(range.max.toString());
            await expect(productsPage.resultsCount).toBeVisible();
        });
    }

    test('should show no results for max price 0', async ({ productsPage }) => {
        await productsPage.maxPriceInput.pressSequentially('0');
        await productsPage.maxPriceInput.press('Enter');
        await expect(productsPage.resultsCount).toHaveText(zeroResultsCountLabel);
    });

    for (const value of [...negativePriceValues, ...fractionalPriceValues]) {
        test(`should reject invalid maximum price: ${value}`, async ({ productsPage }) => {
            await productsPage.maxPriceInput.clear();
            await productsPage.maxPriceInput.pressSequentially(value.toString());
            await productsPage.maxPriceInput.press('Enter');
            await expect(productsPage.maxPriceInput).not.toHaveValue(value.toString());
        });

        test(`should reject invalid minimum price: ${value}`, async ({ productsPage }) => {
            await productsPage.minPriceInput.clear();
            await productsPage.minPriceInput.pressSequentially(value.toString());
            await productsPage.minPriceInput.press('Enter');
            await expect(productsPage.minPriceInput).not.toHaveValue(value.toString());
        });
    }
});
