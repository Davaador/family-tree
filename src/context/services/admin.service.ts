import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';

function createAdminCustomer(
  data: CustomerModel.AdminCustomer
): Promise<CustomerModel.AdminCustomer> {
  return apiClient.post('/api/admin', data);
}

export { createAdminCustomer };
