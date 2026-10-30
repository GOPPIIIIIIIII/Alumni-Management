export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: "/api/auth/register",
  AUTH_LOGIN: "/api/auth/login",
  AUTH_LOGOUT: "/api/auth/logout",

  // Profile / User
  PROFILE: "/api/users/profile",

  // Alumni Directory
  ALUMNI_REGISTER: "/api/alumni/register",
  ALUMNI_DIRECTORY: "/api/alumni/directory",
  ALUMNI_BY_ID: (id) => `/api/alumni/${id}`,
  
  // Connections
  CONNECTIONS_REQUEST: "/api/connections/request",

  // Mentorship
  MENTORS: "/api/mentorship/mentors",
  MENTORSHIP_REQUEST: "/api/mentorship/request",
  MENTORSHIP_ALL: "/api/mentorship",
  MENTORSHIP_STATUS: (id) => `/api/mentorship/${id}/status`,

  // Campaigns & Donations
  CAMPAIGNS: "/api/campaigns",
  CAMPAIGN_ANALYTICS: (id) => `/api/campaigns/${id}/analytics`,
  DONATIONS: "/api/donations",
  DONATION_RECEIPT: (id) => `/api/donations/receipt/${id}`,

  // Events
  EVENTS: "/api/events",
  EVENT_BY_ID: (id) => `/api/events/${id}`,
  EVENT_RSVP: (id) => `/api/events/${id}/rsvp`,

  // Jobs
  JOBS: "/api/jobs",
  JOB_BY_ID: (id) => `/api/jobs/${id}`,

  // Admin
  ADMIN_USERS: "/api/admin/users",
  ADMIN_USER_STATUS: (id) => `/api/admin/users/${id}/status`,
  ADMIN_AUDIT_LOGS: "/api/admin/audit-logs",
  ADMIN_SYSTEM_HEALTH: "/api/admin/system-health",
};
