import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from '../constants';

const HTTP_TIMEOUT = 15000;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: HTTP_TIMEOUT,
  headers: {
    ...DEFAULT_HEADERS,
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.baseURLOverride) {
      config.baseURL = config.baseURLOverride;
      delete config.baseURLOverride;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      const timeoutError = new Error(ERROR_MESSAGES.TIMEOUT);
      timeoutError.status = 408;
      timeoutError.isAxiosError = true;
      return Promise.reject(timeoutError);
    }

    if (error.response) {
      const { status } = error.response;
      const err = new Error(
        error.response.data?.message ||
          error.response.statusText ||
          ERROR_MESSAGES.UNKNOWN
      );
      err.status = status;
      err.statusText = error.response.statusText;
      err.body = error.response.data;
      err.isAxiosError = true;
      return Promise.reject(err);
    }

    const networkError = new Error(ERROR_MESSAGES.NETWORK_ERROR);
    networkError.cause = error;
    networkError.isAxiosError = true;
    return Promise.reject(networkError);
  }
);

export default axiosInstance;
export { axiosInstance };
