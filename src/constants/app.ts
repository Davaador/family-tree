export const APP_CONFIG = {
  NAME: 'Family Tree',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'mn',
  SUPPORTED_LANGUAGES: ['mn', 'en'],
  DEFAULT_PAGE_SIZE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

export const ROLES = {
  ROOT: 'ROOT',
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export const GENDER = {
  MALE: '0',
  FEMALE: '1',
} as const;

export const TABLE_PAGE_SIZES = [10, 20, 50, 100];

export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD',
  API: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
} as const;
