import { CustomerModel } from 'types/customer.types';
import { apiClient } from 'context/http';

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

export { createAdminCustomer, getAdminList, deleteAdmin, updateAdmin };
