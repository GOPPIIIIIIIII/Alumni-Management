import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const userApi = {
  getProfile: async () => {
    // GET /api/users/profile
    const response = await axiosInstance.get(API_ENDPOINTS.PROFILE);
    return response.data;
  },
};
