import axios, { AxiosResponse } from 'axios';
import { Campaign } from '../types/DBTypes';

const API_URL = 'http://localhost:3055/api/campaigns'; // Adjust as necessary

// Fetch all campaigns
export const getAllCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response: AxiosResponse<Campaign[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};
