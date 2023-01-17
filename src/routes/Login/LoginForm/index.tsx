import { useRef, FormEvent, Dispatch, SetStateAction } from 'react';
import store from 'store';

import { useFormInput } from 'hooks';
import { getRequestToken } from 'services/movieAPI';
import { MOVIE_WEB_URL } from 'features';
import { validateEmail, validatePassword } from 'utils/validateInput';
import InputText from './InputText/index';
import styles from '../login.module.scss';

const LoginForm = ({ setRequestToken }: { setRequestToken: Dispatch<SetStateAction<string | null>> }) => {
  const inputFocusRef = useRef(null);
  const email = useFormInput({ validateFunction: validateEmail });
  const password = useFormInput({ validateFunction: validatePassword });

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.valueIsValid || !password.valueIsValid) {
      return;
    }

    const { data } = await getRequestToken();
    store.set('requestToken', data.request_token);
    store.set('email', email.value);
    window.open(`${MOVIE_WEB_URL}/auth/access?request_token=${data.request_token}`);
    setRequestToken(data.request_token);
    // window.location.href = `${MOVIE_WEB_URL}/auth/access?request_token=${data.request_token}`;
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.loginForm}>
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
      <button type='submit' className={styles.loginButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
