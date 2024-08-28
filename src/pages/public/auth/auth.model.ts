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

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  register: string;
  surName: string;
  registeredDate: string;
  lastLoginDate: string;
  editUser: boolean;
  birthDate: Date | string;
  age: number;
}

export type RegisterType = {
  registerNumber?: string;
};

export interface EditUserForm {
  email: string;
  surName: string;
  age: number;
  birthDate: Date | string;
}
