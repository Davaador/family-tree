import { apiClient } from 'context/http';
import { CustomerModel } from 'types/customer.types';

function createAdminCustomer(
  data: CustomerModel.AdminCustomer
): Promise<CustomerModel.AdminCustomer> {
  return apiClient.post('/api/admin', data);
}

function getAdminList(): Promise<CustomerModel.AdminCustomer[]> {
  return apiClient.get('/api/admin/customers');
}

function deleteAdmin(id: number): Promise<void> {
  return apiClient.delete(`/api/admin/${id}`);
}

function updateAdmin(
  id: number,
  data: CustomerModel.AdminCustomer
): Promise<CustomerModel.AdminCustomer> {
  return apiClient.put(`/api/admin/${id}`, data);
}

function getAdminCustomerById(
  id: number
): Promise<CustomerModel.AdminCustomer> {
  return apiClient.get(`/api/admin/customers/${id}`);
}

function addBiographyForCustomer(
  customerId: number,
  biography: CustomerModel.BiographyCustomer
): Promise<CustomerModel.BiographyCustomer> {
  return apiClient.post(
    `/api/admin/customers/${customerId}/biography`,
    biography
  );
}

function getBiographyForCustomer(
  customerId: number
): Promise<CustomerModel.BiographyCustomer> {
  return apiClient.get(`/api/admin/customers/${customerId}/biography`);
}

function getBiographyHistoryForCustomer(
  customerId: number
): Promise<CustomerModel.BiographyHistory[]> {
  return apiClient.get(`/api/admin/customers/${customerId}/biography/history`);
}

function restoreBiographyVersionForCustomer(
  customerId: number,
  historyId: number
): Promise<CustomerModel.BiographyCustomer> {
  return apiClient.post(
    `/api/admin/customers/${customerId}/biography/restore/${historyId}`
  );
}

export {
  createAdminCustomer,
  getAdminList,
  deleteAdmin,
  updateAdmin,
  getAdminCustomerById,
  addBiographyForCustomer,
  getBiographyForCustomer,
  getBiographyHistoryForCustomer,
  restoreBiographyVersionForCustomer,
};
