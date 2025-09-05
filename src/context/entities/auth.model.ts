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
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AddRoleRequest {
  id: number;
  phoneNumber: string;
  roleName: string;
}

export type LoadingState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};
