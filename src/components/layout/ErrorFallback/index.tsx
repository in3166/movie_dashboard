import styles from './errorFallback.module.scss'

interface IErrorFallbackProps {
  error: Error
}

const ErrorFallback = ({ error }: IErrorFallbackProps) => {
  const myErrorHandler = () => {
    window.location.reload()
  }

  return (
    <div role='alert' className={styles.wrapper}>
      <dl className={styles.errorBox}>
        <dt>Error Message </dt>
        <dd>{error.message}</dd>
      </dl>

      <button type='button' aria-label='refresh a page' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  )
}

export default ErrorFallback
