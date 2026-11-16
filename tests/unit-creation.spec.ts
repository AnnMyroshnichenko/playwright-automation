import { test, expect } from '../fixtures/fixtures';
import { AUTH_FILE } from '../utils/auth-helpers';
import unitData from '../test-data/create-unit-data.json';

test.describe('unit creation flow tests', () => {
    test.use({ storageState: AUTH_FILE })
    test.beforeEach(async ({ createUnitPage }) => {
        await createUnitPage.open();
        await expect(createUnitPage.categoryField).toBeVisible();
    });

    test('C329. Verify "Далі" button on main information tab', async ({ createUnitPage }) => {
        test.step('1. Click on "Далі" button without filling required fields', async () => {
            await expect(createUnitPage.nextBtn).toBeVisible();
            await expect(createUnitPage.nextBtn).toHaveText(unitData.buttonNames.nextBtn);
            await createUnitPage.nextBtn.click();
        });

        test.step('2. Error messages should be displayed', async () => {
            for (const fieldLocator of [createUnitPage.categoryField, createUnitPage.unitNameField, createUnitPage.producerSearchField, createUnitPage.adressField]) {
                await expect(createUnitPage.getinputError(fieldLocator)).toBeVisible();
            }
        });
        
        test.step('3. Fill required fields and press "Далі" button', async () => {
            await createUnitPage.setCategory();

            await createUnitPage.unitNameField.fill(unitData.c329.unitName);
            await createUnitPage.typeInField(createUnitPage.producerSearchField, unitData.c329.unitProducer);
            await expect(createUnitPage.producerSearchDropdownItems.first()).toBeVisible();
            await createUnitPage.producerSearchDropdownItems.first().click();

            await createUnitPage.adressField.click();
            await expect(createUnitPage.mapPopup).toBeVisible();
            await createUnitPage.mapPopupSelectBtn.click();

            await expect(createUnitPage.mapPopup).toBeHidden();
            await expect(createUnitPage.adressField).not.toHaveText(unitData.addressPlaceholder);
            await createUnitPage.nextBtn.click();
        });
        

        test.step('4. Verify that the next tab is opened', async () => {
            for (let i = 0; i < unitData.tabNames.length; i++) {
                const tabNumberLocator = createUnitPage.tabNumbers.nth(i);
                await expect(tabNumberLocator).toBeVisible();
                await expect(tabNumberLocator).toHaveText((i + 1).toString());
                await expect(createUnitPage.getTabTextLocator(tabNumberLocator)).toHaveText(unitData.tabNames[i]);
                if (i !== 1) {
                    await expect(createUnitPage.tabButtons.nth(i)).toHaveAttribute('aria-selected', 'false');
                }
            }
            await expect(createUnitPage.tabButtons.nth(1)).toHaveAttribute('aria-selected', 'true');

            await expect(createUnitPage.bodyTitle).toBeVisible();
            await expect(createUnitPage.bodyTitle).toHaveText(unitData.bodyTitle);
        });
    })
})