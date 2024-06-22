import axios, { AxiosResponse } from 'axios';
import { Race } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/races'; // Adjust as necessary

// Fetch all races
export const getAllRaces = async (): Promise<Race[]> => {
  try {
    const response: AxiosResponse<Race[]> = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching races:', error);
    throw error;
  }
};
