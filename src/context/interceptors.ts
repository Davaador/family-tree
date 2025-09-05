import { notification } from 'antd';
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { authLogout } from 'pages/private/hooks/usePrivateHook';
import { StoreApi } from 'zustand';

import { AuthAction } from './actions/auth.action';
import { useLoadingStore } from './auth/store';
import { AuthState } from './entities/auth.model';

const requestSuccessStatusCodes: number[] = [200, 201, 202, 204];
const failedRequestCodes: number[] = [400, 404, 405];
const excludeUrls: string[] = [
  '/auth/token',
  '/auth/user/register',
  '/auth/sent/otp',
  '/auth/check/otp',
  '/auth/reset/password',
];
const setLoading = useLoadingStore.getState().setLoading;
type ErrorResponse = {
  message: string;
  code: string;
  details: {
    [key: string]: string;
  };
};
export const axiosInstance = (
  apiClient: AxiosInstance,
  store: StoreApi<AuthState & AuthAction>
) => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      setLoading(true);
      const token = store.getState().auth;

      if (config.headers && !excludeUrls.includes(config.url!)) {
        config.headers.Authorization = `Bearer ${token?.token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse<any>): any => {
      setLoading(false);
      if (
        response.config &&
        (response.config.responseType === 'arraybuffer' ||
          response.config.responseType === 'blob')
      ) {
        return Promise.resolve(response?.data);
      }
      if (requestSuccessStatusCodes.includes(response.status)) {
        return Promise.resolve(response?.data);
      } else {
        if (
          failedRequestCodes.includes(response.status) &&
          response.config.url
        ) {
          notification.error({
            message: 'Алдаа',
            description: response.data.message,
          });
        }
      }

      if (
        response.config &&
        response.config.url &&
        !excludeUrls.includes(response.config.url) &&
        (response.status === 403 || response.status === 401)
      ) {
        authLogout(store);
      }

      return Promise.resolve(response);
    },
    (error: AxiosError<ErrorResponse>) => {
      setLoading(false);
      if (error) {
        notification.error({
          message: 'Алдаа',
          description: error.response?.data.message,
        });
        if (error.response?.status === 401 || error.response?.status === 403) {
          authLogout(store);
        }
        return Promise.reject(error.response?.data);
      } else {
        authLogout(store);
        return Promise.reject(error);
      }
    }
  );
};
