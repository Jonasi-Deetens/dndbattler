import { useEffect, useState } from 'react';
import { Subrace } from '../types/DBTypes';
import { getAllSubraces } from '../services/subraceService';

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
        setError('Failed to fetch subraces');
      } finally {
        setLoading(false);
      }
    };

    fetchSubraces();
  }, []);

  return { subraces, loading, error };
};

export default useSubraces;
