import { useCallback, useEffect, useRef, useState } from 'react';

export const useSnackbar = (ms = 5000) => {
  const [message, setMessage] = useState('');
  const timer = useRef<null | NodeJS.Timeout>(null);

  const setSnackbarMessage = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  useEffect(() => {
    if (timer.current) clearTimer();
    if (message !== '') {
      timer.current = setTimeout(() => {
        setMessage('');
        clearTimer();
      }, ms + 100);
    }
  }, [message, ms]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimer();
      setMessage('');
    };
  }, []);

  return { message, setMessage: setSnackbarMessage, clearTimer };
};
