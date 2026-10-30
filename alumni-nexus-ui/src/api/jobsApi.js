import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const jobsApi = {
  getJobs: async () => {
    // GET /api/jobs
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS, { silent: true });
      return response.data;
    } catch {
      return [];
    }
  },

  createJob: async (jobData) => {
    // POST /api/jobs
    const response = await axiosInstance.post(API_ENDPOINTS.JOBS, jobData);
    return response.data;
  }
};
