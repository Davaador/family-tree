import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { StoreApi } from "zustand";
import { AuthState } from "./entities/auth.model";
import { AuthAction } from "./actions/auth.action";
import { notification } from "antd";
import { authLogout } from "pages/private/hooks/usePrivateHook";

const requestSuccessStatusCodes: number[] = [200, 201, 202, 204];
const failedRequestCodes: number[] = [400, 404, 405];
const excludeUrls: string[] = ["/auth/token", "/auth/user/register"];
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
  console.log("axiosIn");
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
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
      if (
        response.config.responseType === "arraybuffer" ||
        response.config.responseType === "blob"
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
            message: "Алдаа",
            description: response.data.message,
          });
        }
      }

      if (
        response.config.url &&
        !excludeUrls.includes(response.config.url) &&
        (response.status === 403 || response.status === 401)
      ) {
        authLogout(store);
      }
      return Promise.reject(response);
    },
    (error: AxiosError<ErrorResponse>) => {
      console.log("tttttttt", error);
      if (error) {
        notification.error({
          message: "Алдаа",
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
