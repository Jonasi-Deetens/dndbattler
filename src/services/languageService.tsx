import axios, { AxiosResponse } from "axios";
import { Language } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/languages"; // Adjust as necessary

// Fetch all languages
export const getAllLanguages = async (): Promise<Language[]> => {
  try {
    const response: AxiosResponse<Language[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
