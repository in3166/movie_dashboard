import userEvent from '@testing-library/user-event';
import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';
import { loginUserValue } from 'fixtures/users';
import Login from '../index';

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'open');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('login page', () => {
  test.each(loginUserValue)('The %s field should be in the document', async (fieldText) => {
    renderWithProviders(<Login />);
    // id input이 존재하고 값은 없어야 한다.
    const field = screen.getByLabelText(fieldText);
    expect(field).toBeInTheDocument();
    expect(field.value).toMatch('');
  });

  test.each(loginUserValue)(
    'error message should be in the document when the %s value is not valid',
    async (fieldText, { messageText, validInputText, notValidInputText }) => {
      renderWithProviders(<Login />);
      const field = screen.getByLabelText(fieldText);

      // id 에러메시지는 초기에 존재하지 않는다.
      const nullErrorMessage = screen.queryByText(messageText);
      expect(nullErrorMessage).not.toBeInTheDocument();

      // id input을 포커즈하고 바로 포커즈 아웃하면 에러메시지가 존재한다.
      userEvent.clear(field);
      fireEvent.focus(field);
      fireEvent.focusOut(field);

      const errorMessage = screen.getByText(messageText);
      expect(errorMessage).toBeInTheDocument();

      // 에러 메시지가 있는 상태로 id input을 입력하면 에러 메시지가 사라진다.
      await userEvent.type(field, validInputText);
      expect(errorMessage).not.toBeInTheDocument();

      userEvent.clear(field);
      await userEvent.type(field, notValidInputText);
      const reErrorMessage = await screen.findByText(messageText);
      expect(reErrorMessage).toBeInTheDocument();
    }
  );

  test('Access button appears after login', async () => {
    renderWithProviders(<Login />);

    const field = screen.getByLabelText('EMAIL');
    await userEvent.type(field, 'example@nxef.co.kr');

    const passwordInput = screen.getByLabelText('PASSWORD');
    await userEvent.type(passwordInput, 'qwert12345');

    const submitButton = await screen.findByText('Log In');
    await userEvent.click(submitButton);
    windowSpy.mockImplementation(() => ({}));

    const connectButton = await screen.findByText('접속');
    expect(connectButton).toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });
});
