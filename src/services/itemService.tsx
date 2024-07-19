import axios, { AxiosResponse } from "axios";
import { Item } from "../types/DBTypes";

const API_URL = "http://localhost:3055/api/items"; // Adjust as necessary

// Fetch all skills
export const getAllItems = async (): Promise<Item[]> => {
  try {
    const response: AxiosResponse<Item[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
