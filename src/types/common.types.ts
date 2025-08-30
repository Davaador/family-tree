export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  fixed?: 'left' | 'right';
  sorter?: boolean;
  filters?: SelectOption[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'select'
    | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: any;
}
