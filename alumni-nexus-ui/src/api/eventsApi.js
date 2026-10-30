import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const eventsApi = {
  getEvents: async () => {
    // GET /api/events
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.EVENTS, { silent: true });
      return response.data;
    } catch {
      // Fallback fallback data when backend endpoint pending
      return [];
    }
  },

  createEvent: async (eventData) => {
    // POST /api/events
    const response = await axiosInstance.post(API_ENDPOINTS.EVENTS, eventData);
    return response.data;
  },

  rsvp: async (id, rsvpData = {}) => {
    // PUT /api/events/{id}/rsvp
    const response = await axiosInstance.put(API_ENDPOINTS.EVENT_RSVP(id), rsvpData);
    return response.data;
  }
};
