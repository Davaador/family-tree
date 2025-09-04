// Get API URL from environment variables
const getApiUrl = (): string => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:8080';
  }

  // Production mode
  return process.env.REACT_APP_API_URL || 'https://api.urag.mn';
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/user/register',
  RESET_PASSWORD: '/auth/reset-password',
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',

  // Admin
  ADMIN: '/api/admin',
  ADMIN_CUSTOMERS: '/api/admin/customers',

  // Customer
  CUSTOMER: '/api/customer',
  CUSTOMER_ALL: '/api/customer/all',
  CUSTOMER_DASHBOARD: '/api/customer/dashboard',
  CUSTOMER_UPDATE_INFO: '/api/customer/update/info',
  CUSTOMER_ADD_COUPLE: '/api/customer/add/couple',

  // Biography
  BIOGRAPHY: '/api/biography',

  // Parent
  PARENT: '/api/parent',
  PARENT_BY_ID: '/api/parent/find',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const REQUEST_SUCCESS_STATUS_CODES = [200, 201, 204];
export const FAILED_REQUEST_CODES = [400, 401, 403, 404, 500];

export const EXCLUDE_URLS = [
  '/auth/login',
  '/auth/user/register',
  '/auth/reset-password',
  '/auth/send-otp',
  '/auth/verify-otp',
];
