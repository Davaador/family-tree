import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';
import { AddParentForm, CustomerDetail } from 'pages/public/auth/auth.model';
function getUserDetail(): Promise<CustomerDetail> {
  return apiClient.get('/auth/introspect', {});
}

function editUser(editUser: AddParentForm) {
  return apiClient.post('/auth/user/edit', editUser, {});
}

function editProfile(editUser: CustomerDetail) {
  return apiClient.post('/auth/user/profile/update', editUser, {});
}

function editProfileName(editUser: CustomerDetail) {
  return apiClient.post('/auth/user/profile/update/name', editUser, {});
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

export {
  getUserDetail,
  editUser,
  editProfile,
  editProfileName,
  getPendingRequest,
  updateActiveUser,
  deleteActiveUser,
  getCouplesData,
  getCouple,
  getTrees,
};
