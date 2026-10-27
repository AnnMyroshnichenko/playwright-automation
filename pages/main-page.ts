import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Footer } from './components/footer-component';

export class MainPage extends BasePage {
  public readonly footer: Footer;
  public readonly url = process.env.BASE_URL!;

  constructor(page: Page) {
    super(page);
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

  public get seedDrillEquipment(): Locator {
    return this.page.getByTestId('category__sivalki');
  }

  public get tractorEquipment(): Locator {
    return this.page.getByTestId('category__traktori');
  }

  public get sprayerEquipment(): Locator {
    return this.page.getByTestId('category__obpriskuvachi');
  }

  public get excavatorEquipment(): Locator {
    return this.page.getByTestId('category__ekskavatori');
  }

  public get loaderEquipment(): Locator {
    return this.page.getByTestId('category__navantazhuvachi');
  }

  public get lifterEquipment(): Locator {
    return this.page.getByTestId('category__pidiomniki');
  }

  public get municipalMachineEquipment(): Locator {
    return this.page.getByTestId('category__komunalni-mashini');
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
    return this.page
      .getByTestId('services')
      .locator('[class^="RentzilaProposes_proposes_item"]');
  }

  public get allPurposesUnderEquipment(): Locator {
    return this.page
      .getByTestId('specialEquipment')
      .locator('[class^="RentzilaProposes_proposes_item"]');
  }

  async clickServicesFilter(filter: Locator): Promise<void> {
    await filter.click();
  }

  async clickEquipmentFilter(filter: Locator): Promise<void> {
    await filter.click();
  }

  async clickCategory(category: string): Promise<void> {
    await this.page.getByTestId(`category__${category}`).click();
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
