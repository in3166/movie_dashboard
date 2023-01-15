import { MouseEvent } from 'react';
import { IProductItem } from './product.d';

export interface IUser extends IAuthToken {
  _id?: string;
  id?: string;
  name?: string | null | undefined;
  password?: string;
  email?: string | null | undefined;
  phone?: string;
  likes?: IProductItem[];
  role?: number;
  createdAt?: date;
  updatedAt?: date;
  __v?: number;
}

export interface IDBUser {
  data: IUser;
  key: string;
}

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
