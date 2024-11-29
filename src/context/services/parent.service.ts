import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';
import { AddParentForm } from 'pages/public/auth/auth.model';

function getParents(): Promise<CustomerModel.Customer[]> {
  return apiClient.get('/api/parent/all');
}

function addParent(
  addParentCustomer: AddParentForm
): Promise<CustomerModel.Customer> {
  return apiClient.post('/api/parent', addParentCustomer);
}

function findByParentId(id: number[]): Promise<CustomerModel.ParentDto> {
  return apiClient.get(`/api/parent/${id}`);
}

export const parentService = {
  getParents,
  addParent,
  findByParentId,
};
