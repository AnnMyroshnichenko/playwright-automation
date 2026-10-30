import { Locator,Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage{
    protected readonly url = "/products/"

    constructor(page: Page ) {
        super(page)
    }

    public get map(): Locator {
        return this.page.locator('#map');
    }

    public get showAsListBtn(): Locator {
        return this.page.getByRole('button', { name: 'Показати список' });
    }

    public get resetFilters(): Locator {
        return this.page.getByTestId('resetFilters');
    }

    public get constructionCategory(): Locator { 
        return this.page.getByTestId('firstCategoryLabel').getByText('Будівельна техніка');
    }

    public get municipalCategory(): Locator { 
        return this.page.getByTestId('firstCategoryLabel').getByText('Комунальна техніка');
    }

    public get warehouseCategory(): Locator { 
        return this.page.getByTestId('firstCategoryLabel').getByText('Складська техніка');
    }

    public get minPriceInput(): Locator {
        return this.page.getByTestId('input');
    }

    public get maxPriceInput(): Locator {
        return this.page.getByTestId('input2');
    }

    public get resultsCount(): Locator {
        return this.page.getByRole('heading', { name: /Знайдено \d+ оголошень?\s+на видимій території/ });
    }

    public get regionExpander(): Locator {
        return this.page.getByText('Областi', { exact: true }).locator('..').getByTestId('filterCaption');
    }
    
    public get allUkraineRegionCheckbox(): Locator {
        return this.page.locator('#all');
    }

    regionCheckbox(region: string): Locator {
        return this.page.getByTestId(region);
    }

    getSelectedFilter(filterTestId: string): Locator {
        return this.resetFilters.locator('..').getByTestId(filterTestId);
    }

    public async selectCategory(category: string): Promise<void> {
        const categoryLocator = this.page.getByTestId('firstCategoryLabel').getByText(category);
        await categoryLocator.click();
    }

    public async selectSubcategory(subcategory: string): Promise<void> {
        const subcategoryLocator = this.page.getByTestId('checkLabel').getByText(subcategory);
        await subcategoryLocator.click();
    }
}