import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const mentorshipApi = {
  getMentors: async () => {
    // GET /api/mentorship/mentors
    const response = await axiosInstance.get(API_ENDPOINTS.MENTORS);
    return response.data;
  },

  createRequest: async (mentorId, menteeId, areaOfMentorship) => {
    // POST /api/mentorship/request { mentorId, menteeId, areaOfMentorship }
    const response = await axiosInstance.post(API_ENDPOINTS.MENTORSHIP_REQUEST, {
      mentorId,
      menteeId,
      areaOfMentorship
    });
    return response.data;
  },

  getAllRequests: async () => {
    // GET /api/mentorship
    const response = await axiosInstance.get(API_ENDPOINTS.MENTORSHIP_ALL);
    return response.data;
  },

  updateStatus: async (id, status) => {
    // PUT /api/mentorship/{id}/status?status=ACCEPTED|ACTIVE|COMPLETED|DECLINED
    const response = await axiosInstance.put(`${API_ENDPOINTS.MENTORSHIP_STATUS(id)}?status=${status}`);
    return response.data;
  }
};
