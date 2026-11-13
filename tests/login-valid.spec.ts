import { test, expect } from '../fixtures/test';

test.describe('C201: Authorization with valid email and password', () => {
  const docEmail = process.env.DOC_USER_EMAIL!;
  const docPassword = process.env.DOC_USER_PASSWORD!;

  const testCredentials = [
    { email: docEmail, caseType: 'lowercase email' },
    { email: docEmail.toUpperCase(), caseType: 'uppercase email' },
  ];

  for (const creds of testCredentials) {
    test(`Verify successful login and password toggle with ${creds.caseType}`, async ({
      mainPage,
    }) => {
      await test.step('Open main page, open login form, and fill credentials', async () => {
        await mainPage.open();
        await mainPage.header.clickLogin();
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
    });
  }
});

test.describe('C202: Authorization with valid phone and password', () => {
  const basePhone = process.env.DOC_USER_PHONE!;
  const docPassword = process.env.DOC_USER_PASSWORD!;

  const phoneVariations = [
    { phone: basePhone, formatType: 'full format with plus (+)' },
    { phone: basePhone.replace('+', ''), formatType: 'without plus (+)' },
    {
      phone: basePhone.replace('+38', ''),
      formatType: 'without country code (+38)',
    },
  ];

  for (const creds of phoneVariations) {
    test(`Verify successful login using phone format: ${creds.formatType}`, async ({
      page,
      mainPage,
      profilePage,
    }) => {
      await test.step('Open main page, open login form, fill credentials and verify successful authentication', async () => {
        await mainPage.open();
        await mainPage.header.clickLogin();
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

      await test.step('Log out to clean up session for the next iteration', async () => {
        await profilePage.clickLogout();
        await expect(mainPage.header.loginBtn).toBeVisible();
        await expect(mainPage.header.userIcon).not.toBeVisible();
      });
    });
  }
});
