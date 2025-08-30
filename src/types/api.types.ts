export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
  details?: {
    [key: string]: string;
  };
}

export interface ApiError {
  response?: {
    data: ErrorResponse;
    status: number;
  };
  message: string;
}
