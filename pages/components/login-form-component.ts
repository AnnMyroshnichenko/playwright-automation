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

    get loginField(): Locator {
        return this.root.locator('#login');
    }

    get passwordField(): Locator {
        return this.root.locator('#password');
    }

    get loginBtn(): Locator {
        return this.root.getByRole('button', { name: 'Увійти' });
    }

    get forgotPasswordLink(): Locator {
        return this.root.getByText('Забули пароль?', { exact: true });
    }

    get registerBtn(): Locator {
        return this.root.getByTestId('switcher');
    }

    get registrationCheckbox(): Locator {
        return this.root.locator('#registration');
    }

    get registerationBtn(): Locator {
        return this.root.getByRole('button', { name: 'Зареєструватись' });
    }

    get closeLoginFormBtn(): Locator {
        return this.root.getByTestId('authClose');
    }

    get restorePasswordField(): Locator {
        return this.restorePassRoot.getByTestId('reactHookInput');
    }

    get restorePasswordBtn(): Locator {
        return this.restorePassRoot.getByRole('button', { name: 'Відновити пароль' });
    }

    get restorePasswordCrossBtn(): Locator {
        return this.restorePassRoot.getByTestId('restorePasswordCross');
    }

    async fillLoginForm(login: string, password: string): Promise<void> {
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
    }

    async fillRegisterForm(login: string, password: string): Promise<void> {
        await this.registrationCheckbox.check();
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
    }
}