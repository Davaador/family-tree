import { CustomerDetail, Role } from 'pages/public/auth/auth.model';

export interface AuthState {
  authenticated?: boolean;
  auth?: AuthStateToken;
  phone?: string;
  authUser?: CustomerDetail;
  roleUser?: Role[];
}

export type LanguageState = {
  language: 'en' | 'mn';
  changeLanguage: (language: 'en' | 'mn') => void;
};

export interface AuthStateToken {
  token: string;
}

export interface AddRoleRequest {
  id: number;
  phoneNumber: string;
  roleName: string;
}
