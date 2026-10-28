import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
  protected readonly url = '/products/';

  constructor(page: Page) {
    super(page);
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
    return this.page
      .getByTestId('firstCategoryLabel')
      .getByText('Будівельна техніка');
  }

  public get municipalCategory(): Locator {
    return this.page
      .getByTestId('firstCategoryLabel')
      .getByText('Комунальна техніка');
  }

  public get warehouseCategory(): Locator {
    return this.page
      .getByTestId('firstCategoryLabel')
      .getByText('Складська техніка');
  }

  public async dragMap(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): Promise<void> {
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(endX, endY, { steps: 10 });
    await this.page.mouse.up();
  }

  public async dragMapToDifferentArea(): Promise<void> {
    const mapBox = await this.map.boundingBox();

    if (!mapBox) {
      throw new Error('Map bounding box was not found');
    }

    const startX = mapBox.x + mapBox.width / 2;
    const startY = mapBox.y + mapBox.height / 2;
    const endX = startX + 120;
    const endY = startY + 80;

    await this.dragMap(startX, startY, endX, endY);
  }

  public get cityField(): Locator {
    return this.page.getByPlaceholder('Введіть назву населеного пункту');
  }

  public getCitySuggestion(city: string): Locator {
    return this.page.getByText(city, { exact: true });
  }

  public async enterCity(city: string): Promise<void> {
    await this.cityField.fill(city);
  }

  public async enterCityCharacterByCharacter(city: string): Promise<void> {
    await this.cityField.fill('');

    for (const character of city) {
      await this.cityField.pressSequentially(character);
    }
  }

  public async submitCitySearch(): Promise<void> {
    await this.cityField.press('Enter');
  }

  public async clearCityField(): Promise<void> {
    const clearCityButton = this.page
      .locator('input[placeholder="Введіть назву населеного пункту"]')
      .locator('..')
      .locator('button');

    if ((await clearCityButton.count()) > 0) {
      await clearCityButton.last().click();
    } else {
      await this.cityField.fill('');
    }
  }

  public async selectCitySuggestion(city: string): Promise<void> {
    await this.getCitySuggestion(city).click();
  }

  public get searchResultsTitle(): Locator {
    return this.page.locator('h1[class*="MapPagination_count"]');
  }

  public get zoomOutButton(): Locator {
    return this.page.locator('#map .leaflet-control-zoom-out');
  }

  public get clusters(): Locator {
    return this.page.locator('#map path.leaflet-interactive[fill="gray"]');
  }

  public async zoomOut(times: number = 3): Promise<void> {
    for (let i = 0; i < times; i++) {
      if (!(await this.zoomOutButton.isEnabled())) {
        break;
      }

      await this.zoomOutButton.click();
    }
  }

  public async selectFirstCluster(): Promise<void> {
    await this.clusters.first().click();
  }

  public async selectAnotherClusterIfAvailable(): Promise<void> {
    if ((await this.clusters.count()) > 0) {
      await this.clusters.first().click();
    }
  }
}
