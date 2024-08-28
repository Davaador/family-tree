import { authStore } from "context/auth/store";
import { RouteObject } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import ErrorResult from "../../layouts/ErrorResult";
import Dashboard from "./Dashboard";
import { authGuard, authLogout } from "./hooks/usePrivateHook";
import Profile from "./Profile/Profile";

const privateRoute: RouteObject = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <ErrorResult />,
  loader: () => authGuard(authStore),
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/logout",
      loader: () => authLogout(authStore),
    },
  ],
};

export default privateRoute;
