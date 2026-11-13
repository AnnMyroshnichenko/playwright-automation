import { test, expect } from '../fixtures/fixtures';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';
import searchInputs from '../test-data/search-inputs.json';
import { pickRandom, findByName } from '../utils/general-helpers';
import { categories } from '../test-data/categories';
import search123Mock from '../test-data/mocks/search-123.json';
import { serviceCategories } from '../test-data/services';
import { mockSearchResponse, removeSearchMock } from '../utils/mock-helpers';
import searchSpecialCharsMock from '../test-data/mocks/search-special-chars.json';

test.describe('Search field tests', () => {

    test.beforeEach(async ({ mainPage}) => {
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

test.describe('Catalog tests', () => {
    const NOT_IN_CATALOG = ['Сільськогосподарська техніка'];
    const catalogCategories = categories.filter(c => !NOT_IN_CATALOG.includes(c.name));

    test.beforeEach(async ({ mainPage }) => {
        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
    });

    async function verifySubcategories(mainPage: MainPage, productsPage: ProductsPage, stepNumber: number, categoryName: string): Promise<void> {
        const subcategories = (findByName(categories, categoryName).subcategories ?? [])
            .filter(sub => !NOT_IN_CATALOG.includes(sub.name));
        expect(subcategories.length).toBeGreaterThan(0);

        await test.step(`${stepNumber}.0 Labels match the spreadsheet`, async () => {
            await mainPage.header.goToMainPage();
            await expect(mainPage.showOnMap).toBeVisible();
            await mainPage.header.openCategorySubmenu(mainPage.header.specMachineryCatalog, categoryName);
            await expect(mainPage.header.catalogSubcategoriesItems).toHaveText(subcategories.map(s => s.name));
        });

        for (const [i, sub] of subcategories.entries()) {
            await test.step(`${stepNumber}.${i + 1} "${sub.name}" leads to the correct link`, async () => {
                expect(sub.url, `URL for "${sub.name}" is missing in test data`).not.toBe('');

                await mainPage.header.goToMainPage();
                await expect(mainPage.showOnMap).toBeVisible();
                await mainPage.header.openCategorySubmenu(mainPage.header.specMachineryCatalog, categoryName);

                const item = mainPage.header.catalogSubcategoriesItems.nth(i);
                await expect(item).toHaveText(sub.name);
                await item.click();


                await expect.poll(() => productsPage.getUrl()).toContain(sub.url);
                await expect(productsPage.map.mapWindow).toBeVisible();
            });
        }
    }

    test('C559. part 1. Verify "Каталог"', async ({ mainPage, productsPage }) => {
        await test.step('1. "Каталог" button is displayed', async () => {
            await expect(mainPage.header.catalogDropdown).toBeVisible();
        });

        await test.step('2. Click on "Каталог"', async () => {
            await mainPage.header.openCatalogSection(mainPage.header.specMachineryCatalog);
        });

        await test.step('3. Hover "Спецтехніка"', async () => {
            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        for (const [i, category] of catalogCategories.entries()) {
            const stepTitle = i === 0 ? '4.' : `5.${i}`;

            await test.step(`${stepTitle} Click on "${category.name}"`, async () => {
                if (i > 0) {
                await mainPage.header.openCatalogSection(mainPage.header.specMachineryCatalog);
                }

                await mainPage.header.catalogCategory(category.name).click();
                await expect(productsPage.map.mapWindow).toBeVisible();
                await expect.poll(() => productsPage.getUrl()).toContain(category.url);
                await expect(productsPage.categoryFilter(category.filterTestId)).toBeVisible();
            });
        }
    });

    test('C559. part 2. Verify "Каталог"', async ({ mainPage, productsPage }) => {
        test.slow();
        await test.step('6. Verify "Будівельна техніка" subcategories', async () => {
            await verifySubcategories(mainPage, productsPage, 6, 'Будівельна техніка');
        });

        await test.step('7. "Каталог" and "Спецтехніка" open again', async () => {
            await mainPage.header.openCatalogSection(mainPage.header.specMachineryCatalog);

            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        await test.step('8. Verify "Комунальна техніка" subcategories', async () => {
            await verifySubcategories(mainPage, productsPage, 8, 'Комунальна техніка');
        });


        await test.step('11. Hover the "Спецтехніка" label', async () => {
            await mainPage.header.openCatalogSection(mainPage.header.specMachineryCatalog);

            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        await test.step('12. Verify "Складська техніка" subcategories', async () => {
            await verifySubcategories(mainPage, productsPage, 12, 'Складська техніка');
        });
    });

    test('C559. part 3. Verify "Каталог"', async ({ mainPage, productsPage }) => {
        await test.step('13. "Каталог" open again', async () => {
            await mainPage.header.openCatalogSection(mainPage.header.servicesCatalog);
        });

        await test.step('14. Hover "Послуги"', async () => {
            for (const c of serviceCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        for (const [i, serviceCategory] of serviceCategories.entries()) {
            await test.step(`16.${i + 1} Hover "${serviceCategory.name}"`, async () => {
                await mainPage.header.catalogCategory(serviceCategory.name).hover();
                await expect(mainPage.header.catalogSubcategoriesList).toBeVisible();
            });
        }

        const allServices = serviceCategories.flatMap(c =>
            (c.subcategories ?? []).map(s => ({ ...s, category: c.name }))
        );
        const randomService = pickRandom(allServices);

        await test.step(`17. Click on a random service ("${randomService.name}")`, async () => {
            await mainPage.header.catalogCategory(randomService.category).hover();
            await mainPage.header.catalogSubcategoriesList.getByText(randomService.name, { exact: true }).click();

            await expect(productsPage.map.mapWindow).toBeVisible();
            await expect(productsPage.categoryFilter(randomService.filterTestId)).toBeVisible();
        });

        for (const [i, category] of serviceCategories.entries()) {
            const reopenStep = 18 + i * 3;

            const service = category.subcategories?.[0];
            if (!service) {
                throw new Error(`No services for "${category.name}" in test data`);
            }

            await test.step(`${reopenStep}. "Каталог" and "Послуги" menu are open again`, async () => {
                await mainPage.header.openCatalogSection(mainPage.header.servicesCatalog);
                for (const c of serviceCategories) {
                    await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
                }
            });

            await test.step(`${reopenStep + 1}. Hover "${category.name}"`, async () => {
                await mainPage.header.catalogCategory(category.name).hover();
                await expect(mainPage.header.catalogSubcategoriesList).toBeVisible();
            });

            await test.step(`${reopenStep + 2}. Click on "${service.name}"`, async () => {
                await mainPage.header.catalogSubcategoriesList.getByText(service.name, { exact: true }).click();

                await expect(productsPage.map.mapWindow).toBeVisible();
                await expect(productsPage.categoryFilter(service.filterTestId)).toBeVisible();
            });
        }
    });
});