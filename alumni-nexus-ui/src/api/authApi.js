import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const authApi = {
  login: async (credentials) => {
    // POST /api/auth/login { email, password }
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
    return response.data;
  },

  register: async (userData) => {
    // POST /api/auth/register { name, phoneNumber, email, password, role }
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH_REGISTER, userData);
    return response.data;
  },

  logout: async () => {
    // POST /api/auth/logout
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH_LOGOUT);
      return response.data;
    } catch {
      return { message: 'Logged out' };
    }
  },
};
