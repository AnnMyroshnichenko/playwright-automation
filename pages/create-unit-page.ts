import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CreateUnitPage extends BasePage {
    protected readonly url = "/create-unit/"

    constructor(page: Page) {
        super(page)
    }

    get categoryField(): Locator {
        return this.page.getByTestId('buttonDiv');
    }
    get categoryPopup(): Locator {
        return this.page.getByTestId('categoryPopupWrapper');
    }

    get popupConstructionMachinary(): Locator {
        return this.categoryPopup.getByTestId('list__budivelna-tekhnika');
    }

    get popupSubcategoryItems(): Locator {
        return this.categoryPopup.getByTestId('namesBlock');
    }

    get popupthirdCategoryLevelItem(): Locator {
        return this.categoryPopup.getByTestId('thirdCategoryLabel');
    }

    get unitNameField(): Locator {
        return this.page.getByTestId('custom-input').first();
    }

    get producerSearchField(): Locator {
        return this.page.locator('[class^="CustomSelectWithSearch_wrapper"]');
    }

    get producerSearchDropdownItems(): Locator {
        return this.page.getByTestId('item-customSelectWithSearch');
    }

    get producerSelected(): Locator {
        return this.page.getByTestId('div-service-customSelectWithSearch');
    }

    get adressField(): Locator {
        return this.page.getByTestId('mapLabel');
    }

    get mapPopup(): Locator {
        return this.page.getByTestId('div-mapPopup');
    }

    get mapPopupSelectBtn(): Locator {
        return this.mapPopup.locator('[class^="MapPopup_btns"]').locator('[class^="ItemButtons"]').last();
    }

    get nextBtn(): Locator {
        return this.page.getByTestId('nextButton');
    }

    get prevBtn(): Locator {
        return this.page.getByTestId('prevButton');
    }

    get bodyTitle(): Locator {
        return this.page.locator('[class^="CreateEditFlowLayout_title"]');
    }

    get tabButtons(): Locator {
        return this.page.getByRole('tab');
    }

    get tabNumbers(): Locator {
        return this.page.getByTestId('label');
    }

    get imageBlocks(): Locator {
        return this.page.getByTestId('imageBlock');
    }

    get imageInput(): Locator {
        return this.page.getByTestId('input_ImagesUnitFlow');
    }

    get imageHint(): Locator {
        return this.page.getByTestId('description');
    }

    get serviceSearchField(): Locator {
        return this.page.getByTestId('searchResult');
    }

    get serviceSearchDropdownItems(): Locator {
        return this.page.getByTestId('searchItem-servicesUnitFlow');
    }

    get selectedService(): Locator {
        return this.page.getByTestId('item-servicesUnitFlow');
    }

    public getinputError(fieldLocator: Locator): Locator {
        return fieldLocator.locator('xpath=following-sibling::div[1]');
    }

    public getTabTextLocator(tabNumberLocator: Locator): Locator {
        return tabNumberLocator.locator('xpath=following-sibling::span[1]');
    }
    public async typeInField(fieldLocator: Locator, text: string): Promise<void> {
        await fieldLocator.click();
        await fieldLocator.pressSequentially(text);
    }

    public async setCategory(): Promise<void> {
        await this.categoryField.click();
        await this.categoryPopup.waitFor({ state: 'visible' });
        await this.popupConstructionMachinary.click();
        await this.popupSubcategoryItems.first().waitFor({ state: 'visible' });
        await this.popupSubcategoryItems.first().click();
        await this.popupthirdCategoryLevelItem.first().waitFor({ state: 'visible' });
        await this.popupthirdCategoryLevelItem.first().click();
    }

    public async fillDataInRequiredFields(name: string, producer: string, adressPlaceholder: string): Promise<void> {
        await this.setCategory();

        await this.unitNameField.fill(name);
        await this.typeInField(this.producerSearchField, producer);
        await this.producerSearchDropdownItems.first().waitFor({ state: 'visible' });
        await this.producerSearchDropdownItems.first().click();

        await this.adressField.click();
        await this.mapPopup.waitFor({ state: 'visible' });
        await this.mapPopupSelectBtn.click();

        await this.mapPopup.waitFor({ state: 'hidden' });
        await this.adressField.filter({ hasNotText: adressPlaceholder }).waitFor();

        await this.nextBtn.click();
    }

    async uploadImages(...files: string[]): Promise<void> {
        await this.imageInput.setInputFiles(files);
    }

}