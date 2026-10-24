import {test, expect} from '../../fixtures/test';
import {regions} from '../../test-data/regions';

test.describe('Region filter', () => {
    test.beforeEach(async ({productsPage}) => {
        await productsPage.open();
        productsPage.regionExpander.click();
    });

    test('should select all Ukraine by default', async ({productsPage}) => {
        await expect(productsPage.allUkraineRegionCheckbox).toBeChecked();
    });

    for (const region of regions) {
        test(`should select ${region}`, async ({productsPage}) => {
            const regionCheckbox = productsPage.regionCheckbox(region);
            await regionCheckbox.check();
            await expect(regionCheckbox).toBeChecked();
        });
    }
});