import { useRef, FormEvent, Dispatch, SetStateAction } from 'react';
import store from 'store';

import { getRequestToken } from 'services/movieAPI';
import { MOVIE_WEB_URL } from 'constant';
import InputText from './InputText/index';
import { useFormInput } from './useFormInput';
import { isNotRecommendPassword, validateEmail, validatePassword } from './validateInput';
import styles from '../login.module.scss';

interface ILoginFormProps {
  setRequestToken: Dispatch<SetStateAction<string | null>>;
  setSnackBarStatus: Dispatch<React.SetStateAction<string>>;
  setMessage: (text: string) => void;
}
const LoginForm = ({ setRequestToken, setSnackBarStatus, setMessage }: ILoginFormProps) => {
  const inputFocusRef = useRef(null);

  const email = useFormInput({ validateFunction: validateEmail });
  const password = useFormInput({ validateFunction: validatePassword });

  const notRecommendPassword = isNotRecommendPassword(password.value);
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.valueIsValid || !password.valueIsValid) {
      password.inputBlurHandler();
      setSnackBarStatus('warning');
      setMessage(`입력값을 확인해주세요.`);
      return;
    }
    try {
      const { data } = await getRequestToken();
      store.set('requestToken', data.request_token);
      store.set('email', email.value);

      window.open(`${MOVIE_WEB_URL}/auth/access?request_token=${data.request_token}`);
      setRequestToken(data.request_token);
    } catch (error) {
      setSnackBarStatus('error');
      setMessage(`로그인을 실패하였습니다.`);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
      <InputText
        type='text'
        formTitle='EMAIL'
        value={email.value}
        onChange={email.valueChangeHandler}
        onBlur={email.inputBlurHandler}
        hasError={email.hasError}
        errorMessage='이메일 형식이 맞지 않습니다.'
        inputFocusRef={inputFocusRef}
        placeholder='Email address'
      />

      <InputText
        type='password'
        formTitle='PASSWORD'
        value={password.value}
        onChange={password.valueChangeHandler}
        onBlur={password.inputBlurHandler}
        hasError={password.hasError}
        errorMessage='비밀번호 형식이 맞지 않습니다.'
        placeholder='Password'
      />

      {notRecommendPassword.repeatedNumbers && (
        <p className={styles.notRecommendPw}>연속적인 숫자는 3개 이하만 사용해 주세요.</p>
      )}
      {notRecommendPassword.phoneType && <p className={styles.notRecommendPw}>전화번호 사용은 지양해주세요.</p>}
      {notRecommendPassword.birthType && <p className={styles.notRecommendPw}>생년월일의 사용은 지양해주세요.</p>}
      {notRecommendPassword.isSimilarToEmail(email.value) && (
        <p className={styles.notRecommendPw}>이메일과 유사한 비밀번호는 지양해주세요.</p>
      )}

      <button type='submit' className={styles.loginButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
