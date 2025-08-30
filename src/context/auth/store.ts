import { AuthAction } from 'context/actions/auth.action';
import {
  AuthState,
  LanguageState,
  LoadingState,
} from 'context/entities/auth.model';
import { zStorage } from 'context/reducers/reducers';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18n from '../../i18n';

const authStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      authenticated: false,
      auth: undefined,
      phone: undefined,
      authUser: undefined,
      roleUser: undefined,
      setAuth: (token) => set({ auth: token }),
      setAuthentication(authBoolean) {
        set({ authenticated: authBoolean });
      },
      clearAccessToken() {
        set({
          authenticated: false,
          auth: undefined,
          authUser: undefined,
          roleUser: undefined,
        });
      },
      setPhoneRemember(phone) {
        set({ phone: phone });
      },
      clearRemember() {
        set({ phone: undefined });
      },
      setAuthUser(authUser) {
        set({ authUser: authUser });
      },
      setRoles(roles) {
        set({ roleUser: roles });
      },
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zStorage) }
  )
);

const languageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'mn',
      changeLanguage(language) {
        i18n.changeLanguage(language === 'mn' ? 'en' : 'mn').then(() => {
          set({ language: language === 'mn' ? 'en' : 'mn' });
        });
      },
    }),
    { name: 'language-store', storage: createJSONStorage(() => zStorage) }
  )
);

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));

export { authStore, languageStore, useLoadingStore };
