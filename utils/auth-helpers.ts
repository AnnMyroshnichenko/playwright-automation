import { APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ENV_FILE = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);
export const AUTH_FILE = 'playwright/.auth/user.json';
const ORIGIN = process.env.BASE_URL;
const LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT;


type Tokens = { access: string; refresh: string };

export function getTestUserCredentials(): { email: string; password: string } {
    if (fs.existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);

    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) {
        throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env');
    }
    return { email, password };
}

export async function getTokens(request: APIRequestContext, email: string, password: string): Promise<Tokens> {
    const res = await request.post(`${ORIGIN}${LOGIN_ENDPOINT}`, { data: { email, password } });
    if (!res.ok()) throw new Error(`Login failed: ${res.status()} ${await res.text()}`);
    return (await res.json()) as Tokens;
}

export function savedTokenIsValid(): boolean {
    if (!fs.existsSync(AUTH_FILE)) return false;

    try {
        const state = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
        const token: string | undefined = state.origins
            ?.find((o: { origin: string }) => o.origin === ORIGIN)
            ?.localStorage?.find((i: { name: string }) => i.name === 'access')?.value;
        if (!token) return false;

        const { exp } = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
        return exp * 1000 > Date.now() + 60 * 60 * 1000;
    } catch {
        return false;
    }
}

export function saveAuthState({ access, refresh }: Tokens): void {
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
    fs.writeFileSync(
        AUTH_FILE,
        JSON.stringify(
            {
                cookies: [],
                origins: [
                    {
                        origin: ORIGIN,
                        localStorage: [
                            { name: 'access', value: access },
                            { name: 'refresh', value: refresh },
                        ],
                    },
                ],
            },
            null,
            2,
        ),
    );
}
