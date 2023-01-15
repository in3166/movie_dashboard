import { useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from 'store';
import useFormInput from 'hooks/useFormInput';
import { setUser } from 'states/user';
import { validateEmail, validatePassword } from 'utils/validateInput';
import InputText from 'routes/Login/LoginForm/InputText/index';
import styles from '../login.module.scss';
import { getRequestToken } from 'services/movies';
import { MOVIE_WEB_URL } from 'features';

const LoginForm = () => {
  const inputFocusRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useFormInput({ validateFunction: validateEmail });
  const password = useFormInput({ validateFunction: validatePassword });

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.valueIsValid || !password.valueIsValid) {
      console.log('invalid');
      return;
    }

    const { data } = await getRequestToken();
    store.set('requestToken', data.request_token);
    store.set('email', email.value);

    // dispatch(setUser({ email: email.value, requestToken: data.request_token }));
    window.location.href = `${MOVIE_WEB_URL}/auth/access?request_token=${data.request_token}`;
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.loginForm}>
      <InputText
        type='text'
        formTitle='EMAIL'
        value={email.value}
        onChange={email.valueChangeHandler}
        reset={email.reset}
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
        reset={password.reset}
        onBlur={password.inputBlurHandler}
        hasError={password.hasError}
        placeholder='Password'
      />
      <button type='submit' className={styles.loginButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
