import {test, expect} from '../../fixtures/fixture';
import {regions} from '../../test-data/regions';

test.describe('C549 Filtering by region', () => {
    test.beforeEach(async ({ mainPage, productsPage }) => {
        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.showOnMap.click();
        await expect(productsPage.map).toBeVisible({ timeout: 10000 });
    });

    for (const region of regions) {
        test(`should select ${region}`, async ({productsPage}) => {
            const allUkraineRegionCheckbox = productsPage.allUkraineRegionCheckbox;
            const regionCheckbox = productsPage.regionCheckbox(region);
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked({ timeout: 10000 });
            await regionCheckbox.check();
            await expect(regionCheckbox).toBeChecked();
            await expect(allUkraineRegionCheckbox).not.toBeChecked();
            await productsPage.resetFilters.click();
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked();
            await expect(regionCheckbox).not.toBeChecked();
        });
    }
});