import { Locator, Page } from '@playwright/test';

export class Header {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get logo(): Locator {
        return this.page.getByTestId('Navbar').getByTestId('logo');
    }

    public get advertisement(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Оголошення' });
    }

    public get jobApplications(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Запити на роботу' });
    }

    public get tenders(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Тендери' });
    }

    public get placeAd(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Подати оголошення' });
    }

    public get searchField(): Locator {
        return this.page.getByTestId('searchInput').first();
    }

    public get searchDropdown(): Locator {
        return this.page.getByTestId('searchDropdown');
    }

    public get searchHistoryItems(): Locator {
        return this.page
            .locator('h6:text-is("Історія пошуку") + div')
            .getByTestId('resultItem');
    }

    public get rightSideSearchResults(): Locator {
        return this.page
            .getByTestId('searchDropdown')
            .getByTestId('rightsideUnits')
            .getByTestId('cardContainer');
    }

    public get searchDropdownServices(): Locator {
        return this.page.getByTestId('searchDropdown').getByTestId('services').getByTestId('resultItem');
    }

    public get searchDropdownCategories(): Locator {
        return this.page
            .locator('h6:text-is("Категорії") + div')
            .getByTestId('resultItem');
    }

    public get citySearchField(): Locator {
        return this.page.getByTestId('cityInput');
    }

    public get loginBtn(): Locator {
        return this.page.getByText('Вхід', { exact: true });
    }

    public get catalogDropdown(): Locator {
        return this.page.locator('[class^="Navbar_containerBottom"]').getByText('Каталог', { exact: true });
    }

    public get catalogDropdownOpened(): Locator {
        return this.page.locator('[class^="Catalog_container"]');
    }

    public get specMachineryCatalog(): Locator {
        return this.page.locator('[class^="Catalog_container"]').locator('[class^="Catalog_parent"]').getByText('Спецтехніка', { exact: true });
    }

    public get servicesCatalog(): Locator {
        return this.page.locator('[class^="Catalog_container"]').getByText('Послуги', { exact: true });
    }

    public get constructionMachinery(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Будівельна техніка');
    }

    public get municipalMachinery(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Комунальна техніка');
    }

    public get warehouseMachinery(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Складська техніка');
    }

    public get agricultural(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Сільськогосподарські');
    }

    public get construction(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Будівельні');
    }

    public get other(): Locator {
        return this.page.locator('[class^="Catalog_list"]').getByText('Інші');
    }

    public get catalogSubcategoriesList(): Locator {
        return this.page.locator('[class*=Catalog_listSecond]');
    }

    public get catalogSubcategoriesItems(): Locator {
        return this.catalogSubcategoriesList.locator('[class^="CatalogItem_item"]');
    }

    public catalogCategory(name: string): Locator {
        return this.catalogDropdownOpened.getByText(name, { exact: true });
    }

    public async openCategorySubmenu(sectionName: Locator, categoryName: string): Promise<void> {
        await this.catalogDropdown.click();
        await sectionName.hover();
        await this.catalogCategory(categoryName).hover();
        await this.catalogSubcategoriesItems.first().waitFor({ state: 'visible' });
    }

    async searchForItem(item: string): Promise<void> {
        await this.searchField.fill(item);
        await this.searchField.press('Enter');
    }

    async typeInSearchField(text: string): Promise<void> {
        await this.searchField.click();
        await this.searchField.pressSequentially(text);
    }

    async pressEnterInSearchField(): Promise<void> {
        await this.searchField.click();
        await this.searchField.press('Enter');

    }

    public async goToMainPage(): Promise<void> {
        await this.logo.click();
        await this.page.waitForURL('/');
    }

    public async openCatalogSection(serviceLocator: Locator): Promise<void> {
        await this.goToMainPage();
        await this.page.waitForLoadState('load');
        await this.catalogDropdown.click();
        await this.catalogDropdownOpened.waitFor({ state: 'visible' });
        await serviceLocator.hover();
    }
    public async typeInSearchAndWaitForResults(text: string): Promise<void> {
        const response = this.page.waitForResponse(r =>
                r.url().includes('/api/search/?search=') &&                 
                r.url().includes(encodeURIComponent(text.trim()))  
            );
        await this.typeInSearchField(text);
        await response;
    }

    public async searchAndWaitForResults(): Promise<void> {
        const response = this.page.waitForResponse(r => r.url().includes('/api/units/map/')); 
        await this.pressEnterInSearchField();
        await response;
    }

}
