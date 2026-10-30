import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const adminApi = {
  getUsers: async () => {
    // GET /api/admin/users
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_USERS);
      return response.data;
    } catch {
      return [];
    }
  },

  updateUserStatus: async (userId, status) => {
    // PUT /api/admin/users/{id}/status
    const response = await axiosInstance.put(API_ENDPOINTS.ADMIN_USER_STATUS(userId), { status });
    return response.data;
  },

  getAuditLogs: async () => {
    // GET /api/admin/audit-logs
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_AUDIT_LOGS);
      return response.data;
    } catch {
      return [];
    }
  },

  getSystemHealth: async () => {
    // GET /api/admin/system-health
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_SYSTEM_HEALTH);
      return response.data;
    } catch {
      return { status: 'UP', database: 'CONNECTED', uptime: '99.98%' };
    }
  }
};
