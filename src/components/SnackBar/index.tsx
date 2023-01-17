import React from 'react';

import { CloseIcon } from 'assets/svgs';
import styles from './snackBar.module.scss';
import { cx } from 'styles';

interface ISnackBarProps {
  message: string;
  setMessage: (text: string) => void;
  status?: string;
}

const SnackBar = ({ message, setMessage, status }: ISnackBarProps) => {
  return (
    <div
      role='alert'
      className={cx(
        styles.snackBar,
        { [styles.visible]: message !== '' },
        { [styles.warning]: status === 'warning' },
        { [styles.error]: status === 'error' }
      )}
    >
      {message}
      <button type='button' aria-label='close snack bar' onClick={() => setMessage('')}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default React.memo(SnackBar);
