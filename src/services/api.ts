import { notification } from 'antd';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  API_URL,
  REQUEST_SUCCESS_STATUS_CODES,
  FAILED_REQUEST_CODES,
  EXCLUDE_URLS,
} from '../constants';
import { authStore } from '../context/auth/store';
// import { authLogout } from '../utils/auth';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStore.getState().auth?.token;

    if (config.headers && !EXCLUDE_URLS.includes(config.url!)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse<any>): any => {
    if (
      response.config.responseType === 'arraybuffer' ||
      response.config.responseType === 'blob'
    ) {
      return Promise.resolve(response?.data);
    }

    if (REQUEST_SUCCESS_STATUS_CODES.includes(response.status)) {
      return Promise.resolve(response?.data);
    }

    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (FAILED_REQUEST_CODES.includes(error.response?.status || 0)) {
      notification.error({
        message: 'Алдаа',
        description:
          (error.response?.data as any)?.message || 'Системийн алдаа гарлаа',
      });
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      // authLogout(authStore);
      authStore.getState().clearAccessToken();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export { apiClient };
