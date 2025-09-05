import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';
import { CustomerDetail } from 'pages/public/auth/auth.model';

function createCouple(
  body: CustomerModel.CoupleCustomer
): Promise<CustomerModel.Customer> {
  return apiClient.post('/api/customer/add/couple', body);
}

function createBiography(body: CustomerModel.BiographyCustomer) {
  return apiClient.post('/api/biography', body);
}

async function getBiography() {
  return await apiClient.get('/api/biography');
}

async function getBiographyHistory() {
  return await apiClient.get('/api/biography/history');
}

async function restoreBiographyVersion(historyId: number) {
  return await apiClient.post(`/api/biography/restore/${historyId}`);
}

async function getThreeGenerationsBiography() {
  return await apiClient.get('/api/biography/three-generations');
}

async function getDashboard() {
  return await apiClient.post('/api/customer/dashboard', {});
}

function editCustomerInfo(editUser: CustomerDetail): Promise<CustomerDetail> {
  return apiClient.post('/api/customer/update/info', editUser, {});
}

function findAllActiveCustomers(): Promise<CustomerDetail[]> {
  return apiClient.get('/api/customer/all');
}

function getAvailableSpouses(): Promise<CustomerModel.Customer[]> {
  return apiClient.get('/api/customer/couple/all');
}

function getAvailableSpousesForCustomer(
  customerId: number
): Promise<CustomerModel.Customer[]> {
  return apiClient.get(`/api/admin/customers/${customerId}/available-spouses`);
}

export {
  createBiography,
  createCouple,
  getBiography,
  getBiographyHistory,
  restoreBiographyVersion,
  getThreeGenerationsBiography,
  getDashboard,
  editCustomerInfo,
  findAllActiveCustomers,
  getAvailableSpouses,
  getAvailableSpousesForCustomer,
};
