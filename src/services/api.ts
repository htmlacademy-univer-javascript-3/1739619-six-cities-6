import axios, {AxiosInstance} from 'axios';

const SERVER_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance =>
  axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });
