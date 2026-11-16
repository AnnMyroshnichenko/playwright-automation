import { test as setup } from '@playwright/test';
import { getTestUserCredentials, getTokens, savedTokenIsValid, saveAuthState } from '../utils/auth-helpers';

setup('authenticate via API', async ({ request }) => {
    if (savedTokenIsValid()) return;

    const { email, password } = getTestUserCredentials();
    saveAuthState(await getTokens(request, email, password));
});
