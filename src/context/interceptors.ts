import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StoreApi } from 'zustand';
import { AuthState } from './entities/auth.model';
import { AuthAction } from './actions/auth.action';
import { notification } from 'antd';
import { authLogout } from 'pages/private/hooks/usePrivateHook';
import { useLoadingStore } from './auth/store';

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
      console.log('config axios');
      const token = store.getState().auth;

      if (config.headers && !excludeUrls.includes(config.url!)) {
        config.headers.Authorization = `Bearer ${token?.token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      console.log('error axios');

      return Promise.reject(error.response);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse<any>): any => {
      console.log(response, 'ressss');
      setLoading(false);
      if (
        response.config &&
        (response.config.responseType === 'arraybuffer' ||
          response.config.responseType === 'blob')
      ) {
        console.log(response, 'resss');

        return Promise.resolve(response?.data);
      }
      if (requestSuccessStatusCodes.includes(response.status)) {
        console.log('response', response);

        return Promise.resolve(response?.data);
      } else {
        console.log('failed aldaa');

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
      console.log(response, 'response failed');

      return Promise.resolve(response);
    },
    (error: AxiosError<ErrorResponse>) => {
      console.log('tttttttt', error);
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
      }
    }
  );
};
