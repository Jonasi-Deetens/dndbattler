import axios, { AxiosResponse } from "axios";
import { Class, Spell } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/classes"; // Adjust as necessary

// Fetch all classes
export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const response: AxiosResponse<Class[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getAllSpellsFromClassService = async ({
  className,
}: {
  className: string;
}): Promise<Spell[]> => {
  try {
    const response: AxiosResponse<Spell[]> = await axios.get(
      API_URL + "/spells/" + className
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching spells from class:", error);
    throw error;
  }
};

export const getClassByIdService = async ({
  id,
}: {
  id: number;
}): Promise<Class> => {
  try {
    const response: AxiosResponse<Class> = await axios.get(
      API_URL + "/byId/" + id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching class:", error);
    throw error;
  }
};
