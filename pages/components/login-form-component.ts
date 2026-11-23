import { Locator, Page } from '@playwright/test';

export class LoginForm {
  protected readonly page: Page;
  private readonly root: Locator;
  private readonly restorePassRoot: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = this.page.getByTestId('authorizationContainer');
    this.restorePassRoot = this.page.getByTestId('restorePasswordContainer');
  }

  public get loginField(): Locator {
    return this.root.locator('#email');
  }

  public get passwordField(): Locator {
    return this.root.locator('#password');
  }

  public get showPasswordBtn(): Locator {
    return this.root.getByTestId('reactHookButton');
  }

  public get loginBtn(): Locator {
    return this.root.getByRole('button', { name: 'Увійти', exact: true });
  }

  public readonly errorInputClass = /error_input/;

  public get invalidEmailError(): Locator {
    return this.root.getByText('Неправильний формат email або номера телефону');
  }

  public get invalidPasswordError(): Locator {
    return this.root.getByText(
      'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли',
    );
  }

  public get invalidCredentialsError(): Locator {
    return this.root.getByTestId('errorMessage');
  }

  public get closeLoginFormBtn(): Locator {
    return this.root.getByTestId('authClose');
  }

  async fillLoginForm(login: string, password: string): Promise<void> {
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
  }

  async clickLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }

  public getEmptyFieldError(field: Locator): Locator {
    return field
      .locator('../..')
      .getByRole('alert')
      .filter({ hasText: 'Поле не може бути порожнім' });
  }

  async submit(method: 'click' | 'enter'): Promise<void> {
    if (method === 'click') {
      await this.clickLoginBtn();
    } else {
      await this.passwordField.press('Enter');
    }
  }
}
