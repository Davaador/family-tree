import { ForgotPassword } from './ResetPassword/ForgotPassword/ForgotPassword';
import { ImageField } from 'pages/private/private.model';
import { CustomerModel } from './../../../context/entities/customer.model';
export interface LoginSavedData {
  rememberMe: boolean;
  savedPhoneNumber?: string;
}

export interface UserRegisterForm {
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  confirmPassword: string;
  register: string;
}

export interface LoginForm extends LoginRequest {
  rememberMe: boolean;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface Auth {
  token: string;
}

export interface CustomerDetail {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  register: string;
  surName: string;
  registeredDate: string;
  lastLoginDate: string;
  editCustomer: boolean;
  birthDate: Date | string;
  age: number;
  gender: string;
  husband: CustomerModel.Customer;
  parent: CustomerModel.Customer;
  wife: CustomerModel.Customer;
  user: UserDetail;
  profilePicture?: ImageField;
}

export interface UserDetail {
  id: number;
  phoneNumber: number;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export type RegisterType = {
  registerNumber?: string;
};

export interface AddParentForm {
  parentId: number;
  isParent: number;
  email: string;
  surName: string;
  age: number;
  birthDate: Date | string;
}

export interface SendEmailForm {
  email: string;
}

export interface CheckOtpForm {
  email: string;
  otp: string;
}

export interface ForgotPasswordForm {
  email: string;
  resetToken: string;
  password: string;
  confirmPassword: string;
}
