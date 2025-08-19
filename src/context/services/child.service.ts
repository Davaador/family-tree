import { ChildModel } from 'context/entities/child.model';
import { apiClient } from 'context/http';
import { CustomerDetail } from 'pages/public/auth/auth.model';

function addChild(body: ChildModel.CreateChild): Promise<CustomerDetail> {
  return apiClient.post('/api/child', body);
}

export const childService = { addChild };
