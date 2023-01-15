import axios, { AxiosError, AxiosResponse } from 'axios';

const { CancelToken } = axios;
const { isCancel } = axios;

const baseSettings = {
  timeout: 10 * 1000,
};

const requestError = (error: any): any => {
  return Promise.reject(error);
};

const resolveResponse = (response: AxiosResponse): AxiosResponse => response;

const responseError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

const plainInstance = axios.create({
  ...baseSettings,
  withCredentials: false,
});

const instance = axios.create(baseSettings);
instance.interceptors.request.use((config) => config, requestError);
instance.interceptors.response.use(resolveResponse, responseError);

const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err);
};

export { axios, instance, plainInstance, CancelToken, isCancel, isAxiosError };
