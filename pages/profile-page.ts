import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProfilePage extends BasePage {
  public readonly url = process.env.OWNER_CABINET_URL!;

  constructor(page: Page) {
    super(page);
  }

  public get profilePhone(): Locator {
    return this.page.getByTestId('input_OwnerProfileNumber');
  }

  public get logoutBtn(): Locator {
    return this.page.getByTestId('logOut');
  }

  public async clickLogout(): Promise<void> {
    await this.logoutBtn.click();
  }
}
