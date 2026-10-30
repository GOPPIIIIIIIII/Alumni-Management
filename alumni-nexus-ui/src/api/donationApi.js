import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './API_ENDPOINTS';

export const donationApi = {
  getCampaigns: async () => {
    // GET /api/campaigns
    const response = await axiosInstance.get(API_ENDPOINTS.CAMPAIGNS);
    return response.data;
  },

  createCampaign: async (campaignData) => {
    // POST /api/campaigns
    const response = await axiosInstance.post(API_ENDPOINTS.CAMPAIGNS, campaignData);
    return response.data;
  },

  getCampaignAnalytics: async (id) => {
    // GET /api/campaigns/{id}/analytics
    const response = await axiosInstance.get(API_ENDPOINTS.CAMPAIGN_ANALYTICS(id));
    return response.data;
  },

  donate: async (campaignId, donorId, amount, isAnonymous = false) => {
    // POST /api/donations { campaignId, donorId, amount, isAnonymous }
    const response = await axiosInstance.post(API_ENDPOINTS.DONATIONS, {
      campaignId,
      donorId,
      amount,
      isAnonymous
    });
    return response.data;
  },

  getReceipt: async (id) => {
    // GET /api/donations/receipt/{id}
    const response = await axiosInstance.get(API_ENDPOINTS.DONATION_RECEIPT(id));
    return response.data;
  }
};
