// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/login`,
  REGISTER: `${API_URL}/api/register`,
  TICKETS: `${API_URL}/api/tickets`,
};
