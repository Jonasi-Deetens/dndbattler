import axios, { AxiosResponse } from 'axios';
import { Race } from '../types/DBTypes';

const API_URL = 'http://localhost:3001/api/races';

// Fetch all races
export const getAllRaces = async (): Promise<Race[]> => {
  try {
    const response: AxiosResponse<Race[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching races:', error);
    throw error;
  }
};

export const getRaceByIdService = async ({
  id
}: {
  id: number;
}): Promise<Race> => {
  try {
    const response: AxiosResponse<Race> = await axios.get(
      API_URL + '/byId/' + id
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching race:', error);
    throw error;
  }
};

export const getRaceByNameService = async ({
  name
}: {
  name: string;
}): Promise<Race> => {
  try {
    const response: AxiosResponse<Race> = await axios.get(
      API_URL + '/byName/' + name
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching race:', error);
    throw error;
  }
};
