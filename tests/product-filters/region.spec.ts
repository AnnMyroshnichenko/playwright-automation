import {test, expect} from '../../fixtures/fixture';
import {regions, regionPairs} from '../../test-data/regions';
import {resultCountLabel} from '../../test-data/results-count';

test.describe('C549 Filtering by region', () => {
    test.beforeEach(async ({ mainPage, productsPage }) => {
        await mainPage.open();
        await mainPage.closeTenderPopup();
        await expect(mainPage.showOnMap).toBeVisible();
        await mainPage.showOnMap.click();
        await expect(productsPage.map).toBeVisible({ timeout: 10000 });
    });

    for (const region of regions) {
        test(`should select ${region}`, async ({productsPage}) => {
            const allUkraineRegionCheckbox = productsPage.allUkraineRegionCheckbox;
            const regionCheckbox = productsPage.regionCheckbox(region);
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked();
            await regionCheckbox.check();
            await expect(regionCheckbox).toBeChecked();
            await expect(productsPage.resultsCount).toHaveText(resultCountLabel);
            await expect(allUkraineRegionCheckbox).not.toBeChecked();
            await productsPage.resetFilters.click();
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked();
            await expect(regionCheckbox).not.toBeChecked();
        });
    }

    for (const pair of regionPairs) {
        test(`should select ${pair.region1} and ${pair.region2}`, async ({productsPage}) => {
            const allUkraineRegionCheckbox = productsPage.allUkraineRegionCheckbox;
            const region1Checkbox = productsPage.regionCheckbox(pair.region1);
            const region2Checkbox = productsPage.regionCheckbox(pair.region2);
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked();
            await region1Checkbox.check();
            await region2Checkbox.check();
            await expect(region1Checkbox).toBeChecked();
            await expect(region2Checkbox).toBeChecked();
            await expect(productsPage.resultsCount).toHaveText(resultCountLabel);
            await expect(allUkraineRegionCheckbox).not.toBeChecked();
            await productsPage.resetFilters.click();
            await productsPage.regionExpander.click();
            await expect(allUkraineRegionCheckbox).toBeChecked();
            await expect(region1Checkbox).not.toBeChecked();
            await expect(region2Checkbox).not.toBeChecked();
        });    
    }
});