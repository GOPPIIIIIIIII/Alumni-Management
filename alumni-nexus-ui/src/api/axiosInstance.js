import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Event listener mechanism for toast notifications from interceptor
export const notifyError = (message, title = 'Error') => {
  window.dispatchEvent(new CustomEvent('nexus-toast', {
    detail: { type: 'error', title, message }
  }));
};

export const notifySuccess = (message, title = 'Success') => {
  window.dispatchEvent(new CustomEvent('nexus-toast', {
    detail: { type: 'success', title, message }
  }));
};

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized Error & Status Handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.error || data?.message || error.message || 'An unexpected error occurred';
    const isSilent = error.config?.silent;

    if (!isSilent) {
      if (status === 401) {
        // Clear token and redirect to login if unauthorized
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        notifyError('Your session has expired. Please login again.', 'Authentication Error');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        notifyError('You do not have permission to perform this action.', 'Access Denied');
      } else if (status === 404) {
        // Skip default toast for 404s on optional/fallback routes
      } else if (status === 409) {
        notifyError(message || 'A conflict occurred. This record may already exist.', 'Conflict');
      } else if (status >= 500) {
        notifyError('Server error. Please try again later.', 'Backend Error');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
