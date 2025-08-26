import { RcFile } from 'antd/es/upload';
import { AddRoleRequest } from 'context/entities/auth.model';
import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';
import { AddParentForm, CustomerDetail } from 'pages/public/auth/auth.model';
import { CustomerListData, ImageField } from './private.model';
function getUserDetail(): Promise<CustomerDetail> {
  return apiClient.get('/auth/introspect', {});
}

function editUser(editUser: AddParentForm) {
  return apiClient.post('/auth/user/edit', editUser, {});
}

function editProfile(editUser: CustomerDetail) {
  return apiClient.post('/auth/user/profile/update', editUser, {});
}

function getPendingRequest(size: number, page: number) {
  return apiClient.get(`/api/pending/users?size=${size}&page=${page}`, {});
}

function updateActiveUser(id: number) {
  return apiClient.put(`/api/users/active/${id}`, undefined, {});
}

function deleteActiveUser(id: number) {
  return apiClient.delete(`/api/users/active/${id}`, {});
}
function getCouplesData(): Promise<CustomerModel.Customer[]> {
  return apiClient.get('/api/customer/couples');
}

function getCouple(): Promise<CustomerModel.Customer> {
  return apiClient.get('/api/customer/couple');
}

function getTrees(): Promise<CustomerModel.ParentDto> {
  return apiClient.get('/api/parent');
}

function uploadFile(file: string | Blob | RcFile): Promise<ImageField> {
  const form = new FormData();
  form.append('file', file);
  return apiClient.post('/api/file', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

function getActiveCustomerList(
  size: number,
  page: number,
  isSortAscending: number,
  searchLabel?: string,
  searchValue?: string
): Promise<CustomerListData> {
  let url = `/api/customer/active/all?size=${size}&page=${page}&isSortAscending=${isSortAscending}`;

  if (searchLabel && searchValue) {
    url += `&${searchLabel}=${encodeURIComponent(searchValue)}`;
  }

  return apiClient.get(url, {});
}

function getChildList(): Promise<CustomerModel.ParentDto[]> {
  return apiClient.get('/api/child/list');
}

function addRoleUser(values: AddRoleRequest): Promise<AddRoleRequest> {
  return apiClient.post('/api/add/role/user', values, {});
}

export {
  addRoleUser,
  deleteActiveUser,
  editProfile,
  editUser,
  getActiveCustomerList,
  getChildList,
  getCouple,
  getCouplesData,
  getPendingRequest,
  getTrees,
  getUserDetail,
  updateActiveUser,
  uploadFile,
};
