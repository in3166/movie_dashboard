import { ChangeEvent, RefObject, useEffect } from 'react';

import { cx } from 'styles';
import styles from './inputText.module.scss';

interface IInputFormProps {
  formTitle?: string;
  value: string | number;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
  hasError?: boolean;
  type: string;
  errorMessage?: string;
  inputFocusRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  read?: boolean;
  placeholder?: string;
}

const InputText = (props: IInputFormProps) => {
  const { formTitle, value, onBlur, onChange, reset, hasError, type, errorMessage, inputFocusRef, read, placeholder } =
    props;

  const handleResetOnclick = () => {
    if (reset) reset();
  };

  useEffect(() => {
    inputFocusRef?.current?.focus();
  }, [inputFocusRef]);

  return (
    <div className={styles.inputForm}>
      {formTitle && (
        <label htmlFor={formTitle} className={styles.formTitle}>
          {formTitle}
        </label>
      )}

      <input
        type={type}
        id={formTitle}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={cx(styles.inputText, { [styles.readOnlyInput]: read })}
        ref={inputFocusRef as RefObject<HTMLInputElement>}
        readOnly={read}
        autoComplete={`current-${formTitle}`}
      />
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default InputText;
