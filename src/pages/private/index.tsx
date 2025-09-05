import Spin from 'antd/es/spin';
import { authStore } from 'context/auth/store';
import { lazy, Suspense } from 'react';
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

// Lazy load components for code splitting
const EditBiography = lazy(
  () => import('./page/Biography/EditBiography/EditBiography')
);
const CustomerList = lazy(
  () => import('./page/Customer/CustomerList/CustomerList')
);
const Dashboard = lazy(() => import('./page/Dashboard'));
const FamileTree = lazy(() => import('./page/FamilyTree/FamileTree'));
const AddFamily = lazy(() => import('./page/Profile/AddFamily/AddFamily'));
const Profile = lazy(() => import('./page/Profile/Profile'));
const RequestList = lazy(
  () => import('./page/Requests/RequestList/RequestList')
);
const ChildList = lazy(() => import('./page/Child/ChildList/ChildList'));
const AddChild = lazy(() => import('./page/Child/AddChild/AddChild'));
const AddCustomerList = lazy(
  () => import('./page/Admin/AddCustomerList/AddCustomerList')
);
const AddCustomer = lazy(() => import('./page/Admin/AddCustomer/AddCustomer'));
const EditCustomerPage = lazy(
  () => import('./page/Admin/AddCustomerList/EditCustomerPage')
);

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    }}
  >
    <Spin size='large' />
  </div>
);

const privateRoute: RouteObject = {
  path: '/',
  element: <AuthLayout />,
  errorElement: <ErrorResult />,
  loader: () => authGuard(authStore),
  children: [
    {
      path: '/',
      loader: dashboardLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: '/profile',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: '/requests',
      loader: requestLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <RequestList />
        </Suspense>
      ),
    },
    {
      path: '/add/family',
      loader: coupleLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AddFamily />
        </Suspense>
      ),
    },
    {
      path: '/tree',
      loader: treeLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <FamileTree />
        </Suspense>
      ),
    },
    {
      path: '/biography',
      loader: biographyLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <EditBiography />
        </Suspense>
      ),
    },
    {
      path: '/customers',
      loader: customerListLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <CustomerList />
        </Suspense>
      ),
    },
    {
      path: '/childs',
      loader: childListLoader,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ChildList />
        </Suspense>
      ),
    },
    {
      path: '/add/child',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AddChild />
        </Suspense>
      ),
    },
    {
      path: '/add/customer/list',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AddCustomerList />
        </Suspense>
      ),
    },
    {
      path: '/admin/add/customer',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AddCustomer />
        </Suspense>
      ),
    },
    {
      path: '/admin/edit/customer/:id',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <EditCustomerPage />
        </Suspense>
      ),
    },
    {
      path: '/logout',
      loader: () => authLogout(authStore),
    },
  ],
};

export default privateRoute;
