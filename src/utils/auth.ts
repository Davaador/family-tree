import { authStore } from '../context/auth/store';

export const authLogout = (store: typeof authStore) => {
  store.getState().clearAccessToken();
  window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
  return authStore.getState().authenticated || false;
};

export const getAuthToken = (): string | undefined => {
  return authStore.getState().auth?.token;
};

export const getUserRole = (): string[] => {
  return authStore.getState().roleUser?.map((role) => role.name) || [];
};

export const hasRole = (requiredRole: string): boolean => {
  const userRoles = getUserRole();
  return userRoles.includes(requiredRole);
};
