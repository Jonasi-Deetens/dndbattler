import axios, { AxiosResponse } from 'axios';
import { Subclass } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/subclasses'; // Adjust as necessary

// Fetch all subclasses
export const getAllSubclasses = async (): Promise<Subclass[]> => {
  try {
    const response: AxiosResponse<Subclass[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching subclasses:', error);
    throw error;
  }
};

export const getSubclassByIdService = async ({
  id
}: {
  id: number;
}): Promise<Subclass> => {
  try {
    const response: AxiosResponse<Subclass> = await axios.get(
      API_URL + '/byId/' + id
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching subclass:', error);
    throw error;
  }
};
