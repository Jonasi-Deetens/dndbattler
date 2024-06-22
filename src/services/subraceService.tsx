import axios, { AxiosResponse } from 'axios';
import { Subrace } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/subraces'; // Adjust as necessary

// Fetch all races
export const getAllSubraces = async (): Promise<Subrace[]> => {
  try {
    const response: AxiosResponse<Subrace[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching subraces:', error);
    throw error;
  }
};
