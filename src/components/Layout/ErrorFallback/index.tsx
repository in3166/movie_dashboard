import styles from './errorFallback.module.scss';

interface IErrorFallbackProps {
  error: Error;
  errorText?: string;
}

const ErrorFallback = ({ error, errorText }: IErrorFallbackProps) => {
  const myErrorHandler = () => {
    window.location.reload();
  };

  return (
    <div role='alert' className={styles.wrapper}>
      <div className={styles.errorBox}>
        {errorText && <p className={styles.errorText}>{errorText}</p>}
        {error?.message && (
          <dl>
            <dt>Error Message </dt>
            <dd>{error.message}</dd>
          </dl>
        )}
      </div>

      <button type='button' aria-label='refresh a page' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  );
};

export default ErrorFallback;
