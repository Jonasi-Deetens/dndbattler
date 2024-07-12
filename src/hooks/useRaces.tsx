import { useEffect, useState } from "react";
import { Race } from "../types/DBTypes";
import { getAllRaces, getRaceByIdService } from "../services/raceService";

const useRaces = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await getAllRaces();
        setRaces(data);
      } catch (error) {
        setError("Failed to fetch races");
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  const getRaceById = async ({ id }: { id: number }) => {
    try {
      const race = await getRaceByIdService({ id: id });
      return race;
    } catch (error) {
      throw new Error("Failed to fetch race by id");
    }
  };

  return { races, loading, error, getRaceById };
};

export default useRaces;
