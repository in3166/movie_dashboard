import userEvent from '@testing-library/user-event';
import { fireEvent, renderWithProviders, screen, act, renderHook } from 'utils/test-utils';
import LoginForm from './LoginForm/index';
import SignInPage from './index';
import useFormInput from 'hooks/useFormInput';
import { signInValue } from 'fixtures/users';

describe('SignIn Component', () => {
  test.each(signInValue)('The %s field should be in the document', async (fieldText) => {
    renderWithProviders(<SignInPage />);
    // id input이 존재하고 값은 없어야 한다.
    const field = screen.getByLabelText(fieldText);
    expect(field).toBeInTheDocument();
    expect(field.value).toMatch('');
  });

  test.each(signInValue)(
    'error message should be in the document when the %s value is not valid',
    async (fieldText, { messageText, validInputText, notValidInputText }) => {
      renderWithProviders(<SignInPage />);
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

  test.each(signInValue)(
    'The snackbar should be in the document if the %s is not valid.',
    async (fieldText, { notValidInputText }) => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      renderWithProviders(<SignInPage />);
      // ID is invalid
      const field = screen.getByLabelText(fieldText);
      user.clear(field);
      user.type(field, notValidInputText);

      // 입력이 올바르지 않으면 스낵바 출력
      const nullSnackBar = screen.queryByText(/The ID or password is not valid./i);
      expect(nullSnackBar).not.toBeInTheDocument();

      const submitButton = screen.getByRole('button', { name: /SIGN IN/i });

      // 로그인 실패 시 스낵바 출력
      user.click(submitButton);
      const snackBar = await screen.findByText(/The ID or password is not valid./i);
      expect(snackBar).toBeInTheDocument();

      const reSnackBar = await screen.findByText(/The ID or password is not valid./i);
      // 로그인 실패 시 스낵바 출력
      await user.click(submitButton);
      expect(reSnackBar).toBeInTheDocument();

      // timeout 되면 스낵바가 사라진다.
      act(() => {
        jest.runAllTimers();
      });

      expect(snackBar).not.toBeInTheDocument();
      jest.useRealTimers();
    }
  );
});

describe('LoginForm Component', () => {
  test('should be able to submit form', async () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());

    const { result: resultid } = renderHook(() => useFormInput(() => true));
    const { result: resultpw } = renderHook(() => useFormInput(() => true));

    renderWithProviders(<LoginForm onSubmit={mockSubmit} id={resultid} password={resultpw} />);

    const field = screen.getByLabelText('ID');
    userEvent.type(field, 'user1');

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, 'qlqjs12');

    const submitButton = screen.getByRole('button', { name: /SIGN IN/i });
    await userEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
