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

  public get forgotPasswordLink(): Locator {
    return this.root.getByText('Забули пароль?', { exact: true });
  }

  public get registerBtn(): Locator {
    return this.root.getByTestId('switcher');
  }

  public get registrationCheckbox(): Locator {
    return this.root.locator('#registration');
  }

  public get registerationBtn(): Locator {
    return this.root.getByRole('button', { name: 'Зареєструватись' });
  }

  public get closeLoginFormBtn(): Locator {
    return this.root.getByTestId('authClose');
  }

  public get restorePasswordField(): Locator {
    return this.restorePassRoot.getByTestId('reactHookInput');
  }

  public get restorePasswordBtn(): Locator {
    return this.restorePassRoot.getByRole('button', {
      name: 'Відновити пароль',
    });
  }

  public get restorePasswordCrossBtn(): Locator {
    return this.restorePassRoot.getByTestId('restorePasswordCross');
  }

  async fillLoginForm(login: string, password: string): Promise<void> {
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
  }

  async clickLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async switchToRegistration(): Promise<void> {
    await this.registerBtn.click();
  }

  async fillRestorePasswordForm(email: string): Promise<void> {
    await this.restorePasswordField.fill(email);
  }

  async fillRegisterForm(login: string, password: string): Promise<void> {
    await this.registrationCheckbox.check();
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
  }

  async clickRegisterBtn(): Promise<void> {
    await this.registerationBtn.click();
  }
}
