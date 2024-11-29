import { RouteObject } from 'react-router-dom';
import Login from './Login';
import GuestLayout from 'layouts/GuestLayout';
import { loginLoader, redirectIfLoggedIn } from './hooks/usePublicHook';
import { authStore } from 'context/auth/store';
import Register from './Register/Register';
import ErrorResult from 'layouts/ErrorResult';

const authRoutes: RouteObject = {
  path: 'auth',
  loader: () => redirectIfLoggedIn(authStore),
  errorElement: <ErrorResult />,
  element: <GuestLayout />,
  children: [
    {
      path: 'login',
      loader: loginLoader,
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ],
};

export default authRoutes;
