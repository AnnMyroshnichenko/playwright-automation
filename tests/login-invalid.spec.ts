import { test, expect } from '../fixtures/test';
import {
  validEmail,
  validPassword,
  invalidEmailCases,
  invalidPasswordCases,
  credentialErrorCases,
  invalidPhoneCases,
  emptyFieldCases,
} from '../test-data/login-negative-data';

const submitMethods = ['click', 'enter'] as const;

test.describe('Authorization with invalid credentials and empty fields', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.header.clickLogin();
  });

  test('C200: Login with empty fields', async ({ mainPage }) => {
    for (const {
      description,
      email,
      password,
      expectEmailError,
      expectPasswordError,
    } of emptyFieldCases) {
      await test.step(`Submit with ${description}`, async () => {
        await mainPage.loginForm.fillLoginForm(email, password);
        await mainPage.loginForm.clickLoginBtn();

        if (expectEmailError) {
          await expect(
            mainPage.loginForm.getEmptyFieldError(
              mainPage.loginForm.loginField,
            ),
          ).toBeVisible();
          await expect(mainPage.loginForm.loginField).toHaveClass(
            mainPage.loginForm.errorInputClass,
          );
        } else {
          await expect(
            mainPage.loginForm.getEmptyFieldError(
              mainPage.loginForm.loginField,
            ),
          ).toBeHidden();
          await expect(mainPage.loginForm.loginField).not.toHaveClass(
            mainPage.loginForm.errorInputClass,
          );
        }

        if (expectPasswordError) {
          await expect(
            mainPage.loginForm.getEmptyFieldError(
              mainPage.loginForm.passwordField,
            ),
          ).toBeVisible();
          await expect(mainPage.loginForm.passwordField).toHaveClass(
            mainPage.loginForm.errorInputClass,
          );
        } else {
          await expect(
            mainPage.loginForm.getEmptyFieldError(
              mainPage.loginForm.passwordField,
            ),
          ).toBeHidden();
          await expect(mainPage.loginForm.passwordField).not.toHaveClass(
            mainPage.loginForm.errorInputClass,
          );
        }
      });
    }
  });

  test('C203: Authorization with invalid email or password', async ({
    mainPage,
  }) => {
    for (const item of invalidEmailCases) {
      for (const method of submitMethods) {
        await test.step(`Invalid email format (${item.description}) via [${method}]`, async () => {
          await mainPage.loginForm.fillLoginForm(item.value, validPassword);
          await mainPage.loginForm.submit(method);
          await expect(mainPage.loginForm.invalidEmailError).toBeVisible();
        });
      }
    }

    for (const item of invalidPasswordCases) {
      for (const method of submitMethods) {
        await test.step(`Password rule violation (${item.description}) via [${method}]`, async () => {
          await mainPage.loginForm.fillLoginForm(validEmail, item.value);
          await mainPage.loginForm.submit(method);
          await expect(mainPage.loginForm.invalidPasswordError).toBeVisible();
        });
      }
    }

    for (const item of credentialErrorCases) {
      for (const method of submitMethods) {
        await test.step(`Credentials error for (${item.description}) via [${method}]`, async () => {
          await mainPage.loginForm.fillLoginForm(item.email, item.password);
          await mainPage.loginForm.submit(method);
          await expect(
            mainPage.loginForm.invalidCredentialsError,
          ).toBeVisible();
        });
      }
    }
  });

  test('C207: Authorization with invalid phone formats', async ({
    mainPage,
  }) => {
    for (const item of invalidPhoneCases) {
      for (const method of submitMethods) {
        await test.step(`Invalid phone format (${item.description}) via [${method}]`, async () => {
          await mainPage.loginForm.fillLoginForm(item.value, validPassword);
          await mainPage.loginForm.submit(method);
          await expect(mainPage.loginForm.invalidEmailError).toBeVisible();
        });
      }
    }
  });
});
