import { validateEmail, validatePassword } from '../LoginForm/validateInput';

describe('test Validate', () => {
  test('validate function should pass on correct input', () => {
    const id = 'example@nxef.co.kr';
    expect(validateEmail(id)).toBe(true);
    const password1 = 'qwert12345';
    expect(validatePassword(password1)).toBe(true);

    const password2 = 'qwert!@#$%';
    expect(validatePassword(password2)).toBe(true);

    const password3 = '12345!@#$%';
    expect(validatePassword(password3)).toBe(true);
  });

  test('validate function should fail on incorrect input', () => {
    const id = '225!example$$nxef.co.kr';
    expect(validateEmail(id)).not.toBe(true);

    const password = 'qwe123';
    expect(validatePassword(password)).not.toBe(true);
  });
});
