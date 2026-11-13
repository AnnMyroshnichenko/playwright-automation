import { Locator, Page } from '@playwright/test';
import { Header } from './components/header-component';
import { LoginForm } from './components/login-form-component';

export abstract class BasePage {
  protected readonly page: Page;
  public readonly header: Header;
  protected abstract readonly url: string;
  public readonly loginForm: LoginForm;


  protected constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.loginForm = new LoginForm(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  public getUrl(): string {
    return this.page.url();
  }
}