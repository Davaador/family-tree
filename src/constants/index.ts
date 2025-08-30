// Legacy exports for backward compatibility
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const API_URL = 'http://localhost:8080';
//const API_URL = 'https://api.urag.mn';

export { TOKEN_KEY, USER_KEY, API_URL };

// New organized constants
export * from './api';
export * from './app';
