import { AuthAction } from 'context/actions/auth.action';
import { AuthState } from 'context/entities/auth.model';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { StoreApi } from 'zustand';
import {
  getCouple,
  getCouplesData,
  getPendingRequest,
  getTrees,
  getUserDetail,
} from '../private.service';
import { CustomerDetail } from 'pages/public/auth/auth.model';
import { authStore } from 'context/auth/store';
import { CustomerModel, Gender } from 'context/entities/customer.model';
import { getBiography, getDashboard } from 'context/services/cutomer.service';
import { IMember } from '../page/FamilyTree/FamileTree';

const authGuard = async (store: StoreApi<AuthState & AuthAction>) => {
  try {
    const state: AuthState & AuthAction = store.getState();
    if (state.authenticated && !state.authUser) {
      getUserDetail()
        .then((res: CustomerDetail) => {
          console.log(res, 'dsss');
          state.setAuthUser(res);
          if (res.user.roles) {
            state.setRoles(res.user.roles);
          }
        })
        .catch(() => {
          return redirect('/auth/login');
        });
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
  console.log(num, 'ssss');

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
      data: datas.content,
      total: datas.totalElements,
      perPage: size,
      currentPage: page,
    },
  };
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
  // const rootMember: IMember = {
  //   name: 'test',
  //   gender: Gender.MALE,
  //   spouse: {
  //     name: 'test em',
  //     gender: Gender.FEMALE,
  //     spouse: null,
  //     children: [
  //       {
  //         name: 'tsedes',
  //         gender: Gender.MALE,
  //         spouse: null,
  //         children: [],
  //       },
  //     ],
  //   },
  //   children: [
  //     {
  //       name: 'tsede',
  //       gender: Gender.MALE,
  //       spouse: null,
  //       children: [],
  //     },
  //     {
  //       name: 'davaa',
  //       gender: Gender.MALE,
  //       spouse: {
  //         name: 'test em',
  //         gender: Gender.FEMALE,
  //         spouse: null,
  //         children: [],
  //       },
  //       children: [
  //         {
  //           name: 'test em',
  //           gender: Gender.FEMALE,
  //           spouse: null,
  //           children: [
  //             {
  //               name: 'ss',
  //               gender: Gender.FEMALE,
  //               spouse: null,
  //               children: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // };
  return {
    treeData: treeData,
  };
};

const biographyLoader = async () => {
  const biographyData = await getBiography();
  console.log(biographyData, 'sss');

  return { biographyData: biographyData };
};

const dashboardLoader = async () => {
  const dashboardData = await getDashboard();
  console.log(dashboardData, 'dashboardLoader');

  return { dashboardData };
};

export {
  authGuard,
  authLogout,
  getAuth,
  requestLoader,
  coupleLoader,
  treeLoader,
  biographyLoader,
  dashboardLoader,
};
