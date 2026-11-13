export const validEmail = process.env.DOC_USER_EMAIL!;
export const validPassword = process.env.DOC_USER_PASSWORD!;
export const validPhone = process.env.DOC_USER_PHONE!;

const [localPart, domain] = validEmail.split('@');

export const invalidEmailCases = [
  {
    value: validEmail.replace('@', ' @'),
    description: 'email with space',
  },
  {
    value: 'еуіегіуккутеяшдф',
    description: 'email in cyrillic',
  },
  {
    value: validEmail.replace('@', ''),
    description: 'email without "@"',
  },
  {
    value: validEmail.replace('.', ''),
    description: 'email without dot "."',
  },
  {
    value: validEmail.replace(/\.[^.]+$/, ''),
    description: 'email without extension (e.g., .com)',
  },
  {
    value: `${localPart}@.${domain.split('.').pop()}`,
    description: 'email without domain name (e.g., @.com)',
  },
  {
    value: localPart,
    description: 'email without domain and extension',
  },
  {
    value: validEmail.replace('@', '@@'),
    description: 'email with double "@"',
  },
];

export const invalidPasswordCases = [
  {
    value: `${validPassword} `,
    description: 'password with space at the end',
  },
  {
    value: ` ${validPassword}`,
    description: 'password with space at the beginning',
  },
  {
    value: validPassword.toLowerCase(),
    description: 'password without uppercase letter',
  },
  {
    value: validPassword.toUpperCase(),
    description: 'password without lowercase letter',
  },
  {
    value: 'ЦкщтпЗфііцщкв123!',
    description: 'password in cyrillic',
  },
];

export const credentialErrorCases = [
  {
    email: `${localPart}99@${domain}`,
    password: validPassword,
    description: 'non-existent email',
  },
  {
    email: validEmail,
    password: 'WrongPassword123!',
    description: 'non-existent password',
  },
];

const country = validPhone.slice(0, 4);
const operator = validPhone.slice(4, 6);
const part1 = validPhone.slice(6, 9);
const part2 = validPhone.slice(9);

export const invalidPhoneCases = [
  {
    value: validPhone.replace('+380', ''),
    description: 'without "+380"',
  },
  {
    value: validPhone.slice(0, -1),
    description: 'without the last digit',
  },
  {
    value: `${country}-${operator}-${part1}-${part2}`,
    description: 'with hyphens (-)',
  },
  {
    value: `${country} ${operator} ${part1} ${part2}`,
    description: 'with spaces',
  },
  {
    value: `${country}(${operator})${part1}${part2}`,
    description: 'with parentheses ()',
  },
  {
    value: `(${operator})${part1}${part2}`,
    description: 'without "+380" and with parentheses ()',
  },
  {
    value: `${validPhone}0`,
    description: 'with extra digit (11 numbers)',
  },
  {
    value: validPhone.replace('+380', '+10'),
    description: 'with other country code (+1)',
  },
  {
    value: validPhone.replace('38', ''),
    description: 'without "38"',
  },
];
