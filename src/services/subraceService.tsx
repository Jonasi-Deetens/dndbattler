import axios, { AxiosResponse } from "axios";
import { Subrace } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/subraces";

// Fetch all races
export const getAllSubraces = async (): Promise<Subrace[]> => {
  try {
    const response: AxiosResponse<Subrace[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching subraces:", error);
    throw error;
  }
};

export const getSubracesByRaceService = async ({
  parentRace,
}: {
  parentRace: string;
}): Promise<Subrace[]> => {
  try {
    const response: AxiosResponse<Subrace[]> = await axios.get(
      API_URL + "/byRace/" + parentRace
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subraces:", error);
    throw error;
  }
};

export const getSubraceByIdService = async ({
  id,
}: {
  id: number;
}): Promise<Subrace> => {
  try {
    const response: AxiosResponse<Subrace> = await axios.get(
      API_URL + "/byId/" + id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subraces:", error);
    throw error;
  }
};
