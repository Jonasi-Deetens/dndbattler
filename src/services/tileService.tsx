import axios, { AxiosResponse } from 'axios';
import { Tile } from '../types/DBTypes';

const API_URL = 'http://localhost:3055/api/tiles'; // Adjust as necessary

// Fetch all tiles
export const getAllTiles = async (): Promise<Tile[]> => {
  try {
    const response: AxiosResponse<Tile[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tiles:', error);
    throw error;
  }
};
