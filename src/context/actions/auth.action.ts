import { AuthStateToken } from "context/entities/auth.model";
import { User } from "pages/public/auth/auth.model";

export type AuthAction = {
  setAuthentication: (auth: boolean) => void;
  clearAccessToken: () => void;
  setAuth: (auth?: AuthStateToken) => void;
  setPhoneRemember: (phone: string) => void;
  clearRemember: () => void;
  setAuthUser: (authUser: User) => void;
};
