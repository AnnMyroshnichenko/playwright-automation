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
}