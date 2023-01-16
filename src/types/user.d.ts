import { MouseEvent } from 'react';

export interface IFormInput {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  hasError: boolean;
  valueIsValid: boolean;
  valueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  valueClickHandler: (e: MouseEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}
