import axios from 'axios';
import { API_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// const interceptors = (store: StoreApi<AuthState & AuthAction>) => {
//   console.log("ttt", apiClient);

// apiClient.interceptors.request.use(
//   (config: any) => {
//     console.log("ttttt");

//     // const token = getAuthToken();
//     // console.log(token, "headers");

//     if (config.headers && !excludeUrls.includes(config.url!)) {
//       config.headers.Authorization = `Bearer ${getAuth()}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error.response);
//   }
// );
// apiClient.interceptors.response.use(
//   (response: AxiosResponse<any>): any => {
//     console.log("ssssss");

//     if (
//       response.config.responseType === "arraybuffer" ||
//       response.config.responseType === "blob"
//     ) {
//       return Promise.resolve(response?.data);
//     }
//     if (requestSuccessStatusCodes.includes(response.status)) {
//       return Promise.resolve(response?.data);
//     } else {
//       if (failedRequestCodes.includes(response.status) && response.config.url) {
//         notification.error({
//           message: "Алдаа",
//           description: response.data.message,
//         });
//       }
//     }

//     if (
//       response.config.url &&
//       !excludeUrls.includes(response.config.url) &&
//       (response.status === 403 || response.status === 401)
//     ) {
//       // authLogout(store);
//     }
//     return Promise.reject(response);
//   },
//   (error: AxiosError<ErrorResponse>) => {
//     console.log("tttttttt");

//     notification.error({
//       message: "Алдаа",
//       description: error.response?.data.message,
//     });
//     return Promise.reject();
//   }
// );
// };

export { apiClient };
