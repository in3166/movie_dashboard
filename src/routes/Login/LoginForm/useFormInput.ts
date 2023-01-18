import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';

interface IUseFormInputProps {
  validateFunction?: (value: string) => boolean;
  initialValue?: string;
}

export const useFormInput = ({ validateFunction, initialValue = '' }: IUseFormInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = true;
  if (validateFunction) valueIsValid = validateFunction(value);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = e.currentTarget;
    setValue(currentValue.trim());
  }, []);

  const valueClickHandler = useCallback((e: MouseEvent<HTMLInputElement>) => {
    const { value: currentValue } = e.currentTarget;
    setValue(currentValue);
  }, []);

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue('');
    setIsTouched(false);
  }, []);

  return {
    value,
    setValue,
    hasError,
    valueIsValid,
    valueChangeHandler,
    valueClickHandler,
    inputBlurHandler,
    reset,
  };
};
