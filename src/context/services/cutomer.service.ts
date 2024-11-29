import { CustomerModel } from 'context/entities/customer.model';
import { apiClient } from 'context/http';

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

async function getDashboard() {
  return await apiClient.post('/api/customer/dashboard', {});
}

export { createBiography, createCouple, getBiography, getDashboard };
