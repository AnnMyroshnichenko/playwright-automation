import { Locator, Page } from '@playwright/test';

export class Header {
    protected readonly page: Page;

    constructor(page: Page)  {      
        this.page = page;
    }

    public get logo(): Locator {
        return this.page.getByTestId('Navbar').getByTestId('logo');
    }

    public get advertisement(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Оголошення'});
    }

    public get jobApplications(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Запити на роботу'});
    }

    public get tenders(): Locator {
         return this.page.getByTestId('Navbar').getByRole('link', { name: 'Тендери'});
    }

    public get placeAd(): Locator {
        return this.page.getByTestId('Navbar').getByRole('link', { name: 'Подати оголошення'});
    }

    public get searchField(): Locator {
        return this.page.getByTestId('searchInput').first();
    }

    public get searchHistoryItems(): Locator {
        return this.page
            .locator('h6:text-is("Історія пошуку") + div')
            .getByTestId('resultItem');
    }

    public get citySearchField(): Locator {
        return this.page.getByTestId('cityInput');
    }

    public get loginBtn(): Locator {
        return this.page.getByText('Вхід', { exact: true });
    }

    public get catalogDropdown(): Locator {
        return this.page.getByText('Каталог', { exact: true });
    }

    public get specMachineryCatalog(): Locator {
        return this.page.locator('[class^="Catalog_container"]').getByText('Спецтехніка', { exact: true });
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

    async clickLogo(): Promise<void> {
        await this.logo.click();
    }

    async openCatalogDropdown(): Promise<void> {
        await this.catalogDropdown.click();
    }

    async clickAdvertisements(): Promise<void> {
        await this.advertisement.click();
    }

    async clickTenders(): Promise<void> {
        await this.tenders.click();
    }

    async searchForItem(item: string): Promise<void> {
        await this.searchField.fill(item);
        await this.searchField.press('Enter');
    }

    async clickSearchField(): Promise<void> {
        await this.searchField.click();
    }

    async clickLogin(): Promise<void> {
        await this.loginBtn.click();
    }

    async clickPlaceAnAd(): Promise<void> {
        await this.placeAd.click();
    }
}
