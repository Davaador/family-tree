import { authStore } from "./auth/store";
import { AuthStateToken } from "./entities/auth.model";
const { auth } = authStore();

export function getUser(): boolean {
  if (auth) {
    return true;
  }
  throw new Error("not auth");
}

export function getAuthToken(): AuthStateToken | undefined {
  return auth;
}
