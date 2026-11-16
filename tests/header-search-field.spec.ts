import { test, expect } from '../fixtures/fixtures';
import { mockSearchResponse, removeSearchMock } from '../utils/mock-helpers';
import searchSpecialCharsMock from '../test-data/mocks/search-special-chars.json';
import search123Mock from '../test-data/mocks/search-123.json';
import searchInputs from '../test-data/search-inputs.json';
import { pickRandom } from '../utils/general-helpers';

test.describe('Search field tests', () => {

    test.beforeEach(async ({ mainPage }) => {
        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
    });

    test('C530 part 2. Verify Search Input.', async ({ page, mainPage, productsPage }) => {
        test.slow();
        await test.step('8. Search spaces inputs', async () => {
            const inputText = searchInputs.spaces;
            const expectedCount = searchInputs.expectedUnitsCount.step8

            await expect(mainPage.header.searchField).toBeVisible();
            await mainPage.header.typeInSearchAndWaitForResults(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();

            await expect(mainPage.header.searchDropdownServices).toHaveCount(expectedCount);
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);
            await expect(mainPage.header.searchDropdownCategories).toHaveCount(expectedCount);

            await mainPage.header.searchAndWaitForResults();
            await expect(productsPage.map.mapWindow).toBeVisible({ timeout: 10000 });
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${inputText}"`);
            await expect(productsPage.header.searchField).toHaveValue(inputText);

            await productsPage.header.goToMainPage();
        });

        await test.step('9. Search number inputs', async () => {
            const inputText = searchInputs.numbers;
            await mockSearchResponse(page, search123Mock);

            await mainPage.header.typeInSearchAndWaitForResults(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();

            await expect(mainPage.header.searchDropdownServices).toHaveText(search123Mock.services.map(s => s.name));
            await expect(mainPage.header.searchDropdownCategories).toHaveText(search123Mock.categories.map(c => c.name));
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(search123Mock.units.length);

            await removeSearchMock(page);
            await productsPage.header.goToMainPage();
        });

        const allowedChar = pickRandom(searchInputs.allowedSpecialChars);
        await test.step(`10. Search special characters inputs (input: "${allowedChar}")`, async () => {
            await expect(mainPage.showOnMap).toBeVisible();
            await mockSearchResponse(page, searchSpecialCharsMock);

            await mainPage.header.typeInSearchAndWaitForResults(allowedChar);
            await expect(mainPage.header.searchDropdown).toBeVisible();

            await expect(mainPage.header.searchDropdownServices).toHaveText(searchSpecialCharsMock.services.map(s => s.name));
            await expect(mainPage.header.searchDropdownCategories).toHaveText(searchSpecialCharsMock.categories.map(c => c.name));
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(searchSpecialCharsMock.units.length);

            await removeSearchMock(page);
            await productsPage.header.goToMainPage();
        });

        const blockedChar = pickRandom(searchInputs.blockedSpecialChars);
        await test.step(`11. Search special characters inputs (input: "${blockedChar}")`, async () => {
            const expectedCount = searchInputs.expectedUnitsCount.step11
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchField(blockedChar);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(4);

            await mainPage.header.searchAndWaitForResults();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території`);
            await expect(productsPage.header.searchField).toHaveValue('');

            await productsPage.header.goToMainPage();
        });

        await test.step('12. Search non-existing keyword', async () => {
            const inputText = searchInputs.nonExistentKeyword;
            const expectedCount = searchInputs.expectedUnitsCount.step12
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchAndWaitForResults(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);

            await mainPage.header.searchAndWaitForResults();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${inputText}"`);
            await expect(productsPage.header.searchField).toHaveValue(inputText);
        });
    });
});