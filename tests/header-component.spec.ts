import { test, expect } from '../fixtures/fixtures';
import { MainPage } from '../pages/main-page';
import { ProductsPage } from '../pages/products-page';
import searchInputs from '../test-data/search-inputs.json';
import { pickRandom, findByName } from '../utils/general-helpers';
import { categories } from '../test-data/categories';
import { serviceCategories } from '../test-data/services';

test.describe('Search field tests', () => {
    let mainPage: MainPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        productsPage = new ProductsPage(page);

        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
    });

    test('C530 part 2. Verify Search Input.', async () => {
        await test.step('8. Search spaces inputs', async () => {
            const inputText = searchInputs.spaces;
            const expectedCount = searchInputs.expectedUnitsCount.step8

            await expect(mainPage.header.searchField).toBeVisible();
            await mainPage.header.typeInSearchField(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();

            await expect(mainPage.header.searchDropdownServices).toHaveCount(expectedCount);
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);
            await expect(mainPage.header.searchDropdownCategories).toHaveCount(expectedCount);

            await mainPage.header.pressEnterInSearchField();
            await expect(productsPage.map.mapWindow).toBeVisible({ timeout: 10000 });
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${inputText}"`);
            await expect(productsPage.header.searchField).toHaveValue(inputText);

            await productsPage.header.goToMainPage();
        });

        await test.step('9. Search number inputs', async () => {
            const inputText = searchInputs.numbers;
            const expectedCount = searchInputs.expectedUnitsCount.step9
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchField(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);

            await mainPage.header.pressEnterInSearchField();
            await expect(productsPage.map.mapWindow).toBeVisible();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${inputText}"`);
            await expect(productsPage.header.searchField).toHaveValue(inputText);

            await productsPage.header.goToMainPage();
        });

        const allowedChar = pickRandom(searchInputs.allowedSpecialChars);
        await test.step(`10. Search special characters inputs (input: "${allowedChar}")`, async () => {
            const expectedCount = searchInputs.expectedUnitsCount.step10
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchField(allowedChar);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);

            await mainPage.header.pressEnterInSearchField();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${allowedChar}"`);
            await expect(productsPage.header.searchField).toHaveValue(allowedChar);

            await productsPage.header.goToMainPage();
        });

        const blockedChar = pickRandom(searchInputs.blockedSpecialChars);
        await test.step(`11. Search special characters inputs (input: "${blockedChar}")`, async () => {
            const expectedCount = searchInputs.expectedUnitsCount.step11
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchField(blockedChar);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(4);

            await mainPage.header.pressEnterInSearchField();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території`);
            await expect(productsPage.header.searchField).toHaveValue('');

            await productsPage.header.goToMainPage();
        });

        await test.step('12. Search non-existing keyword', async () => {
            const inputText = searchInputs.nonExistentKeyword;
            const expectedCount = searchInputs.expectedUnitsCount.step12
            await expect(mainPage.showOnMap).toBeVisible();

            await mainPage.header.typeInSearchField(inputText);
            await expect(mainPage.header.searchDropdown).toBeVisible();
            await expect(mainPage.header.rightSideSearchResults).toHaveCount(expectedCount);

            await mainPage.header.pressEnterInSearchField();
            await expect(productsPage.searchResultsText).toHaveText(`Знайдено ${expectedCount} оголошень на видимій території за запитом "${inputText}"`);
            await expect(productsPage.header.searchField).toHaveValue(inputText);
        });
    });
});

test.describe('Catalog tests', () => {
    const SPEC_MACHINERY = 'Спецтехніка';
    const SERVICES = 'Послуги';

    const NOT_IN_CATALOG = ['Сільськогосподарська техніка'];
    const catalogCategories = categories.filter(c => !NOT_IN_CATALOG.includes(c.name));

    let mainPage: MainPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        productsPage = new ProductsPage(page);

        await mainPage.open();
        await expect(mainPage.showOnMap).toBeVisible();
    });

    async function verifySubcategories(stepNumber: number, categoryName: string): Promise<void> {
        const subcategories = (findByName(categories, categoryName).subcategories ?? [])
            .filter(sub => !NOT_IN_CATALOG.includes(sub.name));
        expect(subcategories.length).toBeGreaterThan(0);

        await test.step(`${stepNumber}.0 Labels match the spreadsheet`, async () => {
            await mainPage.header.goToMainPage();
            await expect(mainPage.showOnMap).toBeVisible();
            await mainPage.header.openCategorySubmenu(SPEC_MACHINERY, categoryName);
            await expect(mainPage.header.catalogSubcategoriesItems).toHaveText(subcategories.map(s => s.name));
        });

        for (const [i, sub] of subcategories.entries()) {
            await test.step(`${stepNumber}.${i + 1} "${sub.name}" leads to the correct link`, async () => {
                expect(sub.url, `URL for "${sub.name}" is missing in test data`).not.toBe('');

                await mainPage.header.goToMainPage();
                await expect(mainPage.showOnMap).toBeVisible();
                await mainPage.header.openCategorySubmenu(SPEC_MACHINERY, categoryName);

                const item = mainPage.header.catalogSubcategoriesItems.nth(i);
                await expect(item).toHaveText(sub.name);
                await mainPage.header.clickCategory(item);


                await expect.poll(() => productsPage.getUrl()).toContain(sub.url);
                await expect(productsPage.map.mapWindow).toBeVisible();
            });
        }
    }

    test('C559. part 1. Verify "Каталог"', async () => {
        await test.step('1. "Каталог" button is displayed', async () => {
            await expect(mainPage.header.catalogDropdown).toBeVisible();
        });

        await test.step('2. Click on "Каталог"', async () => {
            await mainPage.header.openCatalogDropdown();
            await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
            await expect(mainPage.header.specMachineryCatalog).toBeVisible();
            await expect(mainPage.header.servicesCatalog).toBeVisible();
        });

        await test.step('3. Hover "Спецтехніка"', async () => {
            await mainPage.header.hoverCategory(mainPage.header.specMachineryCatalog);
            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        for (const [i, category] of catalogCategories.entries()) {
            const stepTitle = i === 0 ? '4.' : `5.${i}`;

            await test.step(`${stepTitle} Click on "${category.name}"`, async () => {
                if (i > 0) {
                    await mainPage.header.goToMainPage();
                    await mainPage.header.openCatalogDropdown();
                    await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
                    await mainPage.header.hoverCategory(mainPage.header.catalogCategory(SPEC_MACHINERY));
                }

                await mainPage.header.clickCategory(mainPage.header.catalogCategory(category.name));
                await expect(productsPage.map.mapWindow).toBeVisible();
                await expect.poll(() => productsPage.getUrl()).toContain(category.url);
                await expect(productsPage.categoryFilter(category.filterTestId)).toBeVisible();
            });
        }
    });
    test('C559. part 2. Verify "Каталог"', async () => {
        test.slow();
        await test.step('6. Verify "Будівельна техніка" subcategories', async () => {
            await verifySubcategories(6, 'Будівельна техніка');
        });

        await test.step('7. "Каталог" and "Спецтехніка" open again', async () => {
            await mainPage.header.goToMainPage();
            await expect(mainPage.showOnMap).toBeVisible();
            await mainPage.header.openCatalogDropdown();
            await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
            await mainPage.header.hoverCategory(mainPage.header.catalogCategory(SPEC_MACHINERY));

            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        await test.step('8. Verify "Комунальна техніка" subcategories', async () => {
            await verifySubcategories(8, 'Комунальна техніка');
        });

        await test.step('9. "Каталог" and "Спецтехніка" menu are open again', async () => {
            await mainPage.header.goToMainPage();
            await mainPage.header.openCatalogDropdown();
            await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
            await mainPage.header.hoverCategory(mainPage.header.catalogCategory(SPEC_MACHINERY));

            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });


        await test.step('11. Hover the ""Спецтехніка"" label', async () => {
            await mainPage.header.goToMainPage();
            await mainPage.header.openCatalogDropdown();
            await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
            await mainPage.header.hoverCategory(mainPage.header.catalogCategory(SPEC_MACHINERY));

            for (const c of catalogCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        await test.step('12. Verify "Складська техніка" subcategories', async () => {
            await verifySubcategories(12, 'Складська техніка');
        });
    });
    test('C559. part 3. Verify "Каталог"', async () => {
        await test.step('13. "Каталог" open again', async () => {
            await mainPage.header.goToMainPage();
            await mainPage.header.openCatalogDropdown();
            await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
            await expect(mainPage.header.servicesCatalog).toBeVisible();
        });

        await test.step('14. Hover "Послуги"', async () => {
            await mainPage.header.hoverCategory(mainPage.header.servicesCatalog);
            for (const c of serviceCategories) {
                await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
            }
        });

        for (const [i, serviceCategory] of serviceCategories.entries()) {
            await test.step(`16.${i + 1} Hover "${serviceCategory.name}"`, async () => {
                await mainPage.header.hoverCategory(mainPage.header.catalogCategory(serviceCategory.name));
                await expect(mainPage.header.catalogSubcategoriesList).toBeVisible();
            });
        }

        const allServices = serviceCategories.flatMap(c =>
            (c.subcategories ?? []).map(s => ({ ...s, category: c.name }))
        );
        const randomService = pickRandom(allServices);

        await test.step(`17. Click on a random service ("${randomService.name}")`, async () => {
            await mainPage.header.hoverCategory(mainPage.header.catalogCategory(randomService.category));
            await mainPage.header.clickCategory(
                mainPage.header.catalogSubcategoriesList.getByText(randomService.name, { exact: true })
            );

            await expect(productsPage.map.mapWindow).toBeVisible();
            await expect(productsPage.categoryFilter(randomService.filterTestId)).toBeVisible();
        });

        const serviceChecks = [
            { steps: [18, 19, 20], category: 'Будівельні', serviceToClick: 'Розчищення території' },
            { steps: [21, 22, 23], category: 'Сільськогосподарські', serviceToClick: 'Внесення добрив' },
            { steps: [24, 25, 26], category: 'Інші', serviceToClick: 'Обрізання дерев' },
        ];

        for (const check of serviceChecks) {
            const [reopenStep, hoverStep, clickStep] = check.steps;
            const service = findByName(findByName(serviceCategories, check.category).subcategories ?? [], check.serviceToClick);

            await test.step(`${reopenStep}. "Каталог" and "Послуги" menu are open again`, async () => {
                await mainPage.header.goToMainPage();
                await mainPage.header.openCatalogDropdown();
                await expect(mainPage.header.catalogDropdownOpened).toBeVisible();
                await mainPage.header.hoverCategory(mainPage.header.catalogCategory(SERVICES));

                for (const c of serviceCategories) {
                    await expect(mainPage.header.catalogCategory(c.name)).toBeVisible();
                }
            });

            await test.step(`${hoverStep}. Hover "${check.category}"`, async () => {
                await mainPage.header.hoverCategory(mainPage.header.catalogCategory(check.category));
                await expect(mainPage.header.catalogSubcategoriesList).toBeVisible();
            });

            await test.step(`${clickStep}. Click on "${service.name}"`, async () => {
                await mainPage.header.clickCategory(
                    mainPage.header.catalogSubcategoriesList.getByText(service.name, { exact: true })
                );

                await expect(productsPage.map.mapWindow).toBeVisible();
                await expect(productsPage.categoryFilter(service.filterTestId)).toBeVisible();
            });
        }
    });
});