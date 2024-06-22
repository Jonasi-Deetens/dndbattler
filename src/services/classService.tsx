import axios, { AxiosResponse } from 'axios';
import { Class } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/classes'; // Adjust as necessary

// Fetch all classes
export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const response: AxiosResponse<Class[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};
