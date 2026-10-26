import { Locator,Page } from '@playwright/test';
import { BasePage } from './base-page';
import { MapComponent } from './components/map-component';

export class ProductsPage extends BasePage{
    protected readonly url = "/products/"
    public readonly map: MapComponent;

    constructor(page: Page ) {
        super(page)
        this.map = new MapComponent(page);
    }

    public get resetFilters(): Locator {
        return this.page.getByTestId('resetFilters');
    }

    public get filtersPanel():Locator{
        return this.page.locator('[class^=ResetFilters_filtersWrapper]')
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

    public get searchResultsText(): Locator { 
        return this.page.locator('h1[class^="MapPagination_count"]');
    }

    public get listedAds(): Locator { 
        return this.page.locator('[class^="ListPagination_unitsListCards"]');
    }

    public get showAsMapBtn(): Locator {
        return this.page.getByTestId('switch').getByRole('button');
    }

    public serviceFilter(name: string): Locator {
        return this.filtersPanel.getByText(name, { exact: true });
    }

    async clickSwitchToMapBtn(): Promise<void> {
        await this.showAsMapBtn.click();
    }
    public categoryFilter(testId: string): Locator {
        return this.page.getByTestId(testId);
    }
}