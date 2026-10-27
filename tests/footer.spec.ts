import { test, expect } from '../fixtures/test';

test('C214: Verify footer visibility labels, links, and navigation sequence', async ({
  page,
  mainPage,
  tendersPage,
  productsPage,
}) => {
  await mainPage.open();

  await expect(mainPage.footer.aboutUs).toBeVisible();
  await expect(mainPage.footer.confidentialPolicy).toBeVisible();
  await expect(mainPage.footer.cookiePolicy).toBeVisible();
  await expect(mainPage.footer.accessTerms).toBeVisible();
  await expect(mainPage.footer.users).toBeVisible();
  await expect(mainPage.footer.advertisement).toBeVisible();
  await expect(mainPage.footer.tenders).toBeVisible();
  await expect(mainPage.footer.email).toBeVisible();
  await expect(mainPage.footer.logo).toBeVisible();

  await mainPage.footer.confidentialPolicy.click();
  await expect(page).toHaveURL(process.env.PRIVACY_POLICY_URL!);

  await mainPage.footer.cookiePolicy.click();
  await expect(page).toHaveURL(process.env.COOKIE_POLICY_URL!);

  await mainPage.footer.accessTerms.click();
  await expect(page).toHaveURL(process.env.TERMS_URL!);

  await mainPage.footer.advertisement.click();
  await expect(page).toHaveURL(productsPage.url);

  await mainPage.footer.logo.click();
  await expect(page).toHaveURL(mainPage.url);

  await mainPage.footer.tenders.click();
  await expect(page).toHaveURL(tendersPage.url);

  await mainPage.footer.logo.click();
  await expect(page).toHaveURL(mainPage.url);

  await expect(mainPage.footer.email).toHaveAttribute(
    'href',
    'mailto:info@rentzila.com.ua',
  );
});
