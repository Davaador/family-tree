import { authStore } from 'context/auth/store';
import ErrorResult from 'layouts/ErrorResult';
import GuestLayout from 'layouts/GuestLayout';
import { RouteObject } from 'react-router-dom';

import { loginLoader, redirectIfLoggedIn } from './hooks/usePublicHook';
import Login from './Login';
import Register from './Register/Register';
import EnterOtp from './ResetPassword/EnterOtp/EnterOtp';
import ForgotPassword from './ResetPassword/ForgotPassword/ForgotPassword';
import SendOtp from './ResetPassword/SendOtp/SendOtp';

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
    {
      path: 'reset',
      element: <SendOtp />,
    },
    {
      path: 'enter/otp',
      element: <EnterOtp />,
    },
    {
      path: 'forgot/password',
      element: <ForgotPassword />,
    },
  ],
};

export default authRoutes;
