import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';

test('C214: Verify footer visibility labels, links, and navigation sequence', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
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
  await expect(page).toHaveURL(/.*privacy-policy.*/);

  await mainPage.footer.cookiePolicy.click();
  await expect(page).toHaveURL(/.*cookie-policy.*/);

  await mainPage.footer.accessTerms.click();
  await expect(page).toHaveURL(/.*terms-conditions.*/);

  await mainPage.footer.advertisement.click();
  await expect(page).toHaveURL(/.*products.*/);

  await page.getByTestId('logo').first().click();
  await expect(page).toHaveURL(/\/$/);

  await mainPage.footer.tenders.click();
  await expect(page).toHaveURL(/.*tenders-map.*/);

  await page.getByTestId('logo').first().click();
  await expect(page).toHaveURL(/\/$/);

  await expect(mainPage.footer.email).toHaveAttribute(
    'href',
    'mailto:info@rentzila.com.ua',
  );
  await mainPage.footer.email.click();
});
