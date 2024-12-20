import { authStore } from 'context/auth/store';
import { RouteObject } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import ErrorResult from '../../layouts/ErrorResult';
import {
  authGuard,
  authLogout,
  biographyLoader,
  coupleLoader,
  customerListLoader,
  dashboardLoader,
  requestLoader,
  treeLoader,
} from './hooks/usePrivateHook';
import EditBiography from './page/Biography/EditBiography/EditBiography';
import CustomerList from './page/Customer/CustomerList/CustomerList';
import Dashboard from './page/Dashboard';
import FamileTree from './page/FamilyTree/FamileTree';
import AddFamily from './page/Profile/AddFamily/AddFamily';
import Profile from './page/Profile/Profile';
import RequestList from './page/Requests/RequestList/RequestList';

const privateRoute: RouteObject = {
  path: '/',
  element: <AuthLayout />,
  errorElement: <ErrorResult />,
  loader: () => authGuard(authStore),
  children: [
    {
      path: '/',
      loader: dashboardLoader,
      element: <Dashboard />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/requests',
      loader: requestLoader,
      element: <RequestList />,
    },
    {
      path: '/add/family',
      loader: coupleLoader,
      element: <AddFamily />,
    },
    {
      path: '/tree',
      loader: treeLoader,
      element: <FamileTree />,
    },
    {
      path: '/biography',
      loader: biographyLoader,
      element: <EditBiography />,
    },
    {
      path: '/customers',
      loader: customerListLoader,
      element: <CustomerList />,
    },
    {
      path: '/logout',
      loader: () => authLogout(authStore),
    },
  ],
};

export default privateRoute;
