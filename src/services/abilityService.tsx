import axios, { AxiosResponse } from 'axios';
import { Ability } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/abilities'; // Adjust as necessary

// Fetch all skills
export const getAllAbilities = async (): Promise<Ability[]> => {
  try {
    const response: AxiosResponse<Ability[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching abilities:', error);
    throw error;
  }
};
