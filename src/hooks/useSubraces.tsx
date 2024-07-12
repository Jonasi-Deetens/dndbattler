import { useEffect, useState } from "react";
import { Subrace } from "../types/DBTypes";
import {
  getAllSubraces,
  getSubracesByRaceService,
  getSubraceByIdService,
} from "../services/subraceService";

const useSubraces = () => {
  const [subraces, setSubraces] = useState<Subrace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubraces = async () => {
      try {
        const data = await getAllSubraces();
        setSubraces(data);
      } catch (error) {
        setError("Failed to fetch subraces");
      } finally {
        setLoading(false);
      }
    };

    fetchSubraces();
  }, []);

  const getSubracesByRace = async ({ race }: { race: string }) => {
    try {
      const subraces = await getSubracesByRaceService({ parentRace: race });
      return subraces;
    } catch (error) {
      throw new Error("Failed to fetch subraces by race");
    }
  };

  const getSubraceById = async ({ id }: { id: number }) => {
    try {
      const subrace = await getSubraceByIdService({ id: id });
      return subrace;
    } catch (error) {
      throw new Error("Failed to fetch subraces by id");
    }
  };

  return { subraces, loading, error, getSubracesByRace, getSubraceById };
};

export default useSubraces;
