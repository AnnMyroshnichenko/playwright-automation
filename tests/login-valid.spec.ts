import { test, expect } from '../fixtures/test';

const docEmail = process.env.DOC_USER_EMAIL!;
const docPassword = process.env.DOC_USER_PASSWORD!;
const basePhone = process.env.DOC_USER_PHONE!;

const testCredentials = [
  { email: docEmail, caseType: 'lowercase email' },
  { email: docEmail.toUpperCase(), caseType: 'uppercase email' },
];

const phoneVariations = [
  { phone: basePhone, formatType: 'full format with plus (+)' },
  { phone: basePhone.replace('+', ''), formatType: 'without plus (+)' },
  {
    phone: basePhone.replace('+38', ''),
    formatType: 'without country code (+38)',
  },
];

test.describe('Authorization with valid credentials (email and phone)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.header.clickLogin();
  });

  test('C201: Authorization with valid email and password', async ({
    mainPage,
    profilePage,
  }) => {
    for (const [index, creds] of testCredentials.entries()) {
      await test.step(`Verify login and password toggle with ${creds.caseType}`, async () => {
        if (index > 0) {
          await mainPage.header.clickLogin();
        }

        await test.step('Fill in credentials', async () => {
          await mainPage.loginForm.fillLoginForm(creds.email, docPassword);
        });

        await test.step('Verify password visibility toggle (show and hide)', async () => {
          await mainPage.loginForm.showPasswordBtn.click();
          await expect(mainPage.loginForm.passwordField).toHaveAttribute(
            'type',
            'text',
          );

          await mainPage.loginForm.showPasswordBtn.click();
          await expect(mainPage.loginForm.passwordField).toHaveAttribute(
            'type',
            'password',
          );
        });

        await test.step('Submit login form and verify successful authentication', async () => {
          await mainPage.loginForm.clickLoginBtn();
          await expect(mainPage.header.userIcon).toBeVisible();
        });

        await test.step('Verify correct user email in the profile dropdown', async () => {
          await mainPage.header.clickUserIcon();
          await expect(mainPage.header.userEmail).toBeVisible();
          await expect(mainPage.header.userEmail).toHaveText(
            creds.email.toLowerCase(),
          );
        });

        await test.step('Log out to reset session', async () => {
          await mainPage.header.clickLogout();
          await expect(mainPage.header.loginBtn).toBeVisible();
        });
      });
    }
  });

  test('C202: Authorization with valid phone and password', async ({
    page,
    mainPage,
    profilePage,
  }) => {
    for (const [index, creds] of phoneVariations.entries()) {
      await test.step(`Verify successful login using phone format: ${creds.formatType}`, async () => {
        if (index > 0) {
          await mainPage.header.clickLogin();
        }

        await test.step('Fill in credentials and verify successful authentication', async () => {
          await mainPage.loginForm.fillLoginForm(creds.phone, docPassword);
          await mainPage.loginForm.clickLoginBtn();
          await expect(mainPage.header.userIcon).toBeVisible();
        });

        await test.step('Navigate to Profile page via dropdown and verify phone number', async () => {
          await mainPage.header.clickUserIcon();
          await mainPage.header.clickUserProfile();
          await expect(page).toHaveURL(profilePage.url);

          await expect(profilePage.profilePhone).toBeVisible();
          const rawValue = await profilePage.profilePhone.inputValue();
          const cleanValue = rawValue.replace(/\s+/g, '');
          expect(cleanValue).toBe(basePhone);
        });

        await test.step('Log out and verify user is unauthenticated', async () => {
          await profilePage.clickLogout();
          await expect(mainPage.header.loginBtn).toBeVisible();
          await expect(mainPage.header.userIcon).not.toBeVisible();
        });
      });
    }
  });
});
