import { useEffect, useState } from 'react';
import { Race } from '../types/DBTypes';
import { getAllRaces } from '../services/raceService';

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
        setError('Failed to fetch races');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  return { races, loading, error };
};

export default useRaces;
