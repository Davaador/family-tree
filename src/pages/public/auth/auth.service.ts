import { apiClient } from 'context/http';
import {
  Auth,
  CheckOtpForm,
  ForgotPasswordForm,
  LoginRequest,
  SendEmailForm,
  UserRegisterForm,
} from './auth.model';

function redirectIfLoggedIn() {
  return false;
}

function userRegister(values: UserRegisterForm) {
  return apiClient.post('/auth/user/register', values);
}
function login(values: LoginRequest): Promise<Auth> {
  return apiClient.post('/auth/token', { ...values, rememberMe: undefined });
}

function sendOtp(values: SendEmailForm) {
  return apiClient.post('/auth/sent/otp', values);
}

function checkOtp(values: CheckOtpForm): Promise<string> {
  return apiClient.post('/auth/check/otp', values);
}

function resetPassword(values: ForgotPasswordForm) {
  return apiClient.post('/auth/reset/password', values);
}

export {
  userRegister,
  redirectIfLoggedIn,
  login,
  sendOtp,
  checkOtp,
  resetPassword,
};
