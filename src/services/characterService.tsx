import axios, { AxiosResponse } from "axios";
import { Character, NewCharacter } from "../types/DBTypes";

const API_URL = "http://localhost:3001/api/characters"; // Adjust as necessary

export type CharacterPromise = {
  allCharacters: Character[];
};

// Fetch all characters
export const getAllCharacters = async (
  userId: string
): Promise<CharacterPromise> => {
  console.log(userId);
  try {
    const response: AxiosResponse<CharacterPromise> = await axios.get(API_URL, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

// Add a new character
export const addCharacter = async (
  characterData: NewCharacter
): Promise<Character> => {
  try {
    const response: AxiosResponse<Character> = await axios.post(
      API_URL + "/add",
      {
        characterData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding character:", error);
    throw error;
  }
};
