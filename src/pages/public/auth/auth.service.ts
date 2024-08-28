import { apiClient } from "context/http";
import { Auth, LoginRequest, UserRegisterForm } from "./auth.model";

function redirectIfLoggedIn() {
  return false;
}

function userRegister(values: UserRegisterForm) {
  return apiClient.post("/auth/user/register", values);
}
function login(values: LoginRequest): Promise<Auth> {
  return apiClient.post("/auth/token", { ...values, rememberMe: undefined });
}

export { userRegister, redirectIfLoggedIn, login };
