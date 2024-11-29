import { CustomerModel } from 'context/entities/customer.model';
import { CustomerDetail } from 'pages/public/auth/auth.model';

export interface RequestListProps {
  requests: {
    data: CustomerDetail[];
    total: number;
    perPage: number;
    currentPage: number;
  };
}

export interface AddFamilyProps {
  selectData: CustomerModel.Customer[];
  coupleData: CustomerModel.Customer;
}

export interface FamileTreeProps {
  treeData: CustomerModel.Customer[];
}

export interface BiographyProps {
  biographyData?: any;
}

export interface DashboardData {
  total: number;
  activeCount: number;
  pendingCount: number;
}

export interface DashboardProps {
  dashboardData: DashboardData;
}
