// Xano API Configuration

const XANO_BASE_URL = import.meta.env.VITE_XANO_API_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:xyz';
const XANO_API_KEY = import.meta.env.VITE_XANO_API_KEY || '';

// API Endpoints
export const ENDPOINTS = {
  // Public endpoints
  CREATE_LEAD: '/lead',
  VERIFY_MAGIC_LINK: '/auth/verify',

  // Client endpoints (require auth)
  GET_DASHBOARD: '/client/dashboard',
  UPLOAD_DOCUMENT: '/client/upload',
  SEND_MESSAGE: '/client/message',

  // Admin endpoints (require admin auth)
  GET_ALL_CLIENTS: '/admin/clients',
  GET_ANALYTICS: '/admin/analytics',
  UPDATE_CLIENT_STATUS: '/admin/client/:id/status',
  DOWNLOAD_DOCUMENT: '/admin/download/:id',
  SEND_NUDGE: '/admin/nudge'
};

// Mock mode for development (when Xano not set up yet)
export const MOCK_MODE = !XANO_API_KEY || XANO_API_KEY === 'dev_api_key_placeholder';

// Helper to build full URL
export const buildUrl = (endpoint) => {
  return `${XANO_BASE_URL}${endpoint}`;
};

// Helper to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('gator-auth-token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export { XANO_BASE_URL, XANO_API_KEY };
