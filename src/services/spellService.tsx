import axios, { AxiosResponse } from "axios";
import { Spell } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/spells"; // Adjust as necessary

// Fetch all spells
export const getAllSpells = async (): Promise<Spell[]> => {
  try {
    const response: AxiosResponse<Spell[]> = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching spells:", error);
    throw error;
  }
};

export const getSpellsByListService = async ({
  spellList,
}: {
  spellList: string[];
}): Promise<Spell[]> => {
  try {
    const response: AxiosResponse<Spell[]> = await axios.get(
      API_URL + "/byList/" + spellList
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching spells:", error);
    throw error;
  }
};
