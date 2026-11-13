import { Locator, Page } from '@playwright/test';
import { Header } from './components/header-component';
import { Footer } from './components/footer-component';
import { LoginForm } from './components/login-form-component';

export abstract class BasePage {
  protected readonly page: Page;
  public readonly header: Header;
  public readonly footer: Footer;
  public readonly loginForm: LoginForm;
  protected abstract readonly url: string;

  protected constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.footer = new Footer(page);
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
}
