import { authStore } from 'context/auth/store';
import { RouteObject } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import ErrorResult from '../../layouts/ErrorResult';
import {
  authGuard,
  authLogout,
  biographyLoader,
  childListLoader,
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
import ChildList from './page/Child/ChildList/ChildList';
import AddChild from './page/Child/AddChild/AddChild';
import AddCustomerList from './page/Admin/AddCustomerList/AddCustomerList';
import AddCustomer from './page/Admin/AddCustomer/AddCustomer';

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
      path: '/childs',
      loader: childListLoader,
      element: <ChildList />,
    },
    {
      path: '/add/child',
      element: <AddChild />,
    },
    {
      path: '/add/customer/list',
      element: <AddCustomerList />,
    },
    {
      path: '/admin/add/customer',
      element: <AddCustomer />,
    },
    {
      path: '/logout',
      loader: () => authLogout(authStore),
    },
  ],
};

export default privateRoute;
