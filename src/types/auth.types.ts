import { CustomerDetail, Role } from 'pages/public/auth/auth.model';

export interface AuthState {
  authenticated?: boolean;
  auth?: AuthStateToken;
  phone?: string;
  authUser?: CustomerDetail;
  roleUser?: Role[];
}

export interface AuthStateToken {
  token: string;
}

export interface AddRoleRequest {
  id: number;
  phoneNumber: string;
  roleName: string;
}

export type AuthAction = {
  setAuthentication: (auth: boolean) => void;
  clearAccessToken: () => void;
  setAuth: (auth?: AuthStateToken) => void;
  setPhoneRemember: (phone: string) => void;
  clearRemember: () => void;
  setAuthUser: (authUser: CustomerDetail) => void;
  setRoles: (roles: Role[]) => void;
};

export type LanguageState = {
  language: 'en' | 'mn';
  changeLanguage: (language: 'en' | 'mn') => void;
};

export type LoadingState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};
