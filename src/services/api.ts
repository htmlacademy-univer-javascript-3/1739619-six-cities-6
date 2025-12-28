import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {handleErrorMessage} from './handle-error-message.ts';

type DetailMessageType = {
  type: string;
  message: string;
}

const errorStatusCodes = new Set<StatusCodes>([
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND
]);

const SERVER_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        if (errorStatusCodes.has(error.response.status)) {
          const detailMessage = error.response.data;
          handleErrorMessage(detailMessage.message);
        }
      } else {
        handleErrorMessage(
          'Сервер временно недоступен. Пожалуйста, попробуйте позже.'
        );
      }

      throw error;
    }
  );


  return api;
};
