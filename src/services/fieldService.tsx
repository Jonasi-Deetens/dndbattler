import axios, { AxiosResponse } from 'axios';
import { Field } from '../types/DBTypes';

const API_URL = 'http://localhost:3055/api/fields'; // Adjust as necessary

// Fetch all fields
export const getAllFields = async (): Promise<Field[]> => {
  try {
    const response: AxiosResponse<Field[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching fields:', error);
    throw error;
  }
};
