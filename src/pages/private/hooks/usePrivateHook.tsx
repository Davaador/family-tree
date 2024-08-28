import { AuthAction } from "context/actions/auth.action";
import { AuthState } from "context/entities/auth.model";
import { redirect } from "react-router-dom";
import { StoreApi } from "zustand";
import { getUserDetail } from "../private.service";
import { User } from "pages/public/auth/auth.model";
import { authStore } from "context/auth/store";

const authGuard = async (store: StoreApi<AuthState & AuthAction>) => {
  try {
    const state: AuthState & AuthAction = store.getState();
    if (state.authenticated && !state.authUser) {
      getUserDetail()
        .then((res: User) => {
          state.setAuthUser(res);
        })
        .catch(() => {
          return redirect("/auth/login");
        });
    }
  } catch (error) {
    return redirect("/auth/login");
  }
  return {};
};

const authLogout = (store: StoreApi<AuthState & AuthAction>) => {
  const state: AuthState & AuthAction = store.getState();
  state.clearAccessToken();
  window.location.href = "/auth/login";
  return redirect("/auth/login");
};

const getAuth = () => {
  return authStore().auth?.token;
};

export { authGuard, authLogout, getAuth };
