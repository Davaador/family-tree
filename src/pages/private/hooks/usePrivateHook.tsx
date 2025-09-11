import { AuthAction } from 'context/actions/auth.action';
import { authStore } from 'context/auth/store';
import { AuthState } from 'context/entities/auth.model';
import { CustomerModel } from 'context/entities/customer.model';
import { getBiography, getDashboard } from 'context/services/customer.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { StoreApi } from 'zustand';

import { CustomerListData } from '../private.model';
import {
  getActiveCustomerList,
  getChildList,
  getCouple,
  getCouplesData,
  getPendingRequest,
  getTrees,
  getUserDetail,
} from '../private.service';

const authGuard = async (store: StoreApi<AuthState & AuthAction>) => {
  try {
    const state: AuthState & AuthAction = store.getState();
    if (state.authenticated && !state.authUser) {
      try {
        const res: CustomerDetail = await getUserDetail();
        state.setAuthUser(res);
        if (res.user.roles) {
          state.setRoles(res.user.roles);
        }
      } catch (error) {
        return redirect('/auth/login');
      }
    }
  } catch (error) {
    return redirect('/auth/login');
  }
  return {};
};

const authLogout = (store: StoreApi<AuthState & AuthAction>) => {
  const state: AuthState & AuthAction = store.getState();
  state.clearAccessToken();
  window.location.href = '/auth/login';
  return redirect('/auth/login');
};

const getAuth = () => {
  return authStore().auth?.token;
};
const parseOrDefault = (data: string, def: number): number => {
  const num = parseInt(data);

  if (Number.isNaN(num)) {
    return def;
  }

  return num;
};

const requestLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseOrDefault(url.searchParams.get('page') || '', 0);
  const size = parseOrDefault(url.searchParams.get('perPage') || '', 2);

  const datas: any = await getPendingRequest(size, page);

  return {
    requests: {
      content: datas.content,
      totalElements: datas.totalElements,
      perPage: size,
      currentPage: page,
    },
  };
};

const customerListLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseOrDefault(url.searchParams.get('page') || '', 0);
  const size = parseOrDefault(url.searchParams.get('perPage') || '', 10);
  const isSortAscending = parseOrDefault(
    url.searchParams.get('isSortAscending') || '',
    1
  );
  const datas: CustomerListData = await getActiveCustomerList(
    size,
    page,
    isSortAscending
  );

  return {
    customers: {
      ...datas,
      perPage: size,
      currentPage: page,
    },
  };
};

const childListLoader = async () => {
  const datas: CustomerModel.ParentDto[] = await getChildList();

  return { child: { datas: datas } };
};

const coupleLoader = async () => {
  const coupleData: CustomerModel.Customer = await getCouple();
  const selectData: CustomerModel.Customer[] = await getCouplesData();
  return {
    coupleData: coupleData,
    selectData: selectData,
  };
};

const treeLoader = async () => {
  const treeData: CustomerModel.ParentDto = await getTrees();
  return {
    treeData: treeData,
  };
};

const biographyLoader = async () => {
  const biographyData = await getBiography();
  return { biographyData: biographyData };
};

const dashboardLoader = async () => {
  const dashboardData = await getDashboard();
  return { dashboardData };
};

export {
  authGuard,
  authLogout,
  biographyLoader,
  coupleLoader,
  customerListLoader,
  dashboardLoader,
  getAuth,
  requestLoader,
  treeLoader,
  childListLoader,
};
