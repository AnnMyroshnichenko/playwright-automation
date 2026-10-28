import { Locator,Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Footer} from './components/footer-component';

export class MainPage extends BasePage {
    public readonly footer: Footer;
    protected readonly url = "/"

    constructor(page: Page ) {
        super(page)
        this.footer = new Footer(page);
    }

    public get searchField(): Locator {
        return this.page.getByTestId('searchForm').last();
    }

    public get showOnMap(): Locator {
        return this.page.getByTestId('mapButton');
    }

    public get popularFilter(): Locator {
        return this.page.getByTestId('services__populyarni');
    }

    public get agriculturalFilter(): Locator {
        return this.page.getByTestId('services__silskogospodarski');
    }

    public get constructionFilter(): Locator {
        return this.page.getByTestId('services__budivelni');
    }

    public get otherFilter(): Locator {
        return this.page.getByTestId('services__inshi');
    }

    public get popularEquipmentFilter(): Locator {
        return this.page.getByTestId('specialEquipment__populyarna');
    }

    public get agriculturalEquipmentFilter(): Locator {
        return this.page.getByTestId('specialEquipment__silskogospodarska');
    }

    public get constructionEquipmentFilter(): Locator {
        return this.page.getByTestId('specialEquipment__budivelna');
    }

    public get otherEquipmentFilter(): Locator {
        return this.page.getByTestId('specialEquipment__insha');
    }

    public get allPurposesUnderService(): Locator {
        return this.page.getByTestId('services').locator('[class^="RentzilaProposes_proposes_item"]');
    }

    public get allPurposesUnderEquipment(): Locator {
        return this.page.getByTestId('specialEquipment').locator('[class^="RentzilaProposes_proposes_item"]');
    }

    public get tenderPopup(): Locator {
        return this.page.getByTestId('completeTenderRectangle');
    }

    public get tenderPopupCloseButton(): Locator {
        return this.tenderPopup.getByTestId('crossButton');
    }

    async closeTenderPopup(): Promise<void> {
        if (await this.tenderPopup.isVisible()) {
            await this.tenderPopupCloseButton.click();
        }
    }

    async clickServicesFilter(filter: Locator): Promise<void> {
        await filter.click();
    }

    async clickEquipmentFilter(filter: Locator): Promise<void> {
        await filter.click();
    }

    async clickPurposeServices(index: number): Promise<void> {
        await this.allPurposesUnderService.nth(index).click();
    }

    async clickPurposeEquipment(index: number): Promise<void> {
        await this.allPurposesUnderEquipment.nth(index).click();
    }

    async searchForItemMainPage(item: string): Promise<void> {
        await this.searchField.fill(item);
        await this.searchField.press('Enter');
    }
}