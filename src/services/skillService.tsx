import axios, { AxiosResponse } from "axios";
import { Skill } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/skills"; // Adjust as necessary

// Fetch all skills
export const getAllSkills = async (): Promise<Skill[]> => {
  try {
    const response: AxiosResponse<Skill[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
