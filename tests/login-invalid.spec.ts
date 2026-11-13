import { test, expect } from '../fixtures/test';
import {
  validEmail,
  validPassword,
  invalidEmailCases,
  invalidPasswordCases,
  credentialErrorCases,
  invalidPhoneCases,
} from '../test-data/login-negative-data';

const submitMethods = ['click', 'enter'] as const;

async function submitForm(mainPage: any, method: 'click' | 'enter') {
  if (method === 'click') {
    await mainPage.loginForm.clickLoginBtn();
  } else {
    await mainPage.loginForm.passwordField.press('Enter');
  }
}

test.describe('C203: Authorization with invalid email or password', () => {
  for (const item of invalidEmailCases) {
    for (const method of submitMethods) {
      test(`Invalid email format (${item.description}) via [${method}]`, async ({
        mainPage,
      }) => {
        await test.step('Open form and fill invalid email format', async () => {
          await mainPage.open();
          await mainPage.header.clickLogin();
          await mainPage.loginForm.fillLoginForm(item.value, validPassword);
        });

        await test.step(`Submit via ${method} and verify email error`, async () => {
          await submitForm(mainPage, method);
          await expect(mainPage.loginForm.invalidEmailError).toBeVisible();
        });
      });
    }
  }

  for (const item of invalidPasswordCases) {
    for (const method of submitMethods) {
      test(`Password rule violation (${item.description}) via [${method}]`, async ({
        mainPage,
      }) => {
        await test.step('Open form and fill invalid password format', async () => {
          await mainPage.open();
          await mainPage.header.clickLogin();
          await mainPage.loginForm.fillLoginForm(validEmail, item.value);
        });

        await test.step(`Submit via ${method} and verify password error`, async () => {
          await submitForm(mainPage, method);
          await expect(mainPage.loginForm.invalidPasswordError).toBeVisible();
        });
      });
    }
  }

  for (const item of credentialErrorCases) {
    for (const method of submitMethods) {
      test(`Credentials error for (${item.description}) via [${method}]`, async ({
        mainPage,
      }) => {
        await test.step(`Open form and fill ${item.description}`, async () => {
          await mainPage.open();
          await mainPage.header.clickLogin();
          await mainPage.loginForm.fillLoginForm(item.email, item.password);
        });

        await test.step(`Submit via ${method} and verify auth error banner`, async () => {
          await submitForm(mainPage, method);
          await expect(
            mainPage.loginForm.invalidCredentialsError,
          ).toBeVisible();
        });
      });
    }
  }
});

test.describe('C207: Authorization with invalid phone formats', () => {
  for (const item of invalidPhoneCases) {
    for (const method of submitMethods) {
      test(`Invalid phone format (${item.description}) via [${method}]`, async ({
        mainPage,
      }) => {
        await test.step('Open form and fill invalid phone with valid password', async () => {
          await mainPage.open();
          await mainPage.header.clickLogin();
          await mainPage.loginForm.fillLoginForm(item.value, validPassword);
        });

        await test.step(`Submit via ${method} and verify format error`, async () => {
          await submitForm(mainPage, method);
          await expect(mainPage.loginForm.invalidEmailError).toBeVisible();
        });
      });
    }
  }
});
