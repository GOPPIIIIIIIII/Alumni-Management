import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const alumniApi = {
  getDirectory: async () => {
    // GET /api/alumni/directory
    const response = await axiosInstance.get(API_ENDPOINTS.ALUMNI_DIRECTORY);
    return response.data;
  },

  getById: async (id) => {
    // GET /api/alumni/{id}
    const response = await axiosInstance.get(API_ENDPOINTS.ALUMNI_BY_ID(id));
    return response.data;
  },

  register: async (alumniData) => {
    // POST /api/alumni/register
    const response = await axiosInstance.post(API_ENDPOINTS.ALUMNI_REGISTER, alumniData);
    return response.data;
  },

  update: async (id, alumniData) => {
    // PUT /api/alumni/{id}
    const response = await axiosInstance.put(API_ENDPOINTS.ALUMNI_BY_ID(id), alumniData);
    return response.data;
  },

  delete: async (id) => {
    // DELETE /api/alumni/{id}
    const response = await axiosInstance.delete(API_ENDPOINTS.ALUMNI_BY_ID(id));
    return response.data;
  },

  requestConnection: async (targetAlumniId) => {
    // POST /api/connections/request
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CONNECTIONS_REQUEST, { targetAlumniId });
      return response.data;
    } catch {
      // Isolating API when backend endpoint pending
      return { status: 'REQUESTED', message: 'Connection request sent successfully!' };
    }
  }
};
