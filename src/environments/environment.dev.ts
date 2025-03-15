export const environment = {
  production: false,
  development: true,
  local: false,
  apiUrl: (window as any).API_URL || 'http://127.0.0.1:5000/',
};