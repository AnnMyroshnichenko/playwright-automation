import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class TendersPage extends BasePage {
  protected readonly url = '/tenders-map/';

  constructor(page: Page) {
    super(page);
  }

  public get showListBtn(): Locator {
    return this.page.getByRole('button', { name: 'Показати список' });
  }

  public get tendersCount(): Locator {
    return this.page.getByTestId('tendersCount');
  }

  public get tenderCard(): Locator {
    return this.page.getByTestId('tenderLink');
  }

  public getTenderCardElements(card: Locator) {
    return {
      name: card.getByTestId('tenderName'),
      category: card.getByTestId('category'),
      author: card.getByTestId('paragraphWithIcon').nth(0),
      period: card.getByTestId('paragraphWithIcon').nth(1),
      location: card.getByTestId('paragraphWithIcon').nth(2),
      timer: card.getByTestId('remainingTimeDesktop'),
      price: card.getByTestId('tenderPrice'),
      buttonOrLabel: card.locator(
        'text=/Перейти на тендер|Прийом пропозицій завершено/',
      ),
    };
  }
}
