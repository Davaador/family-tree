// Legacy exports for backward compatibility
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export { TOKEN_KEY, USER_KEY };

// New organized constants
export * from './api';
export * from './app';

// Re-export API_URL for legacy compatibility
export { API_URL } from './api';
