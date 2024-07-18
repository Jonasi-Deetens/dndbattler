import { useEffect, useState } from 'react';
import { Ability } from '../types/DBTypes';
import { getAllAbilities } from '../services/abilityService.tsx';

const useAbilities = () => {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const data = await getAllAbilities();
        setAbilities(data);
      } catch (error) {
        setError('Failed to fetch abilities');
      } finally {
        setLoading(false);
      }
    };

    fetchAbilities();
  }, []);

  return { abilities, loading, error, getAllAbilities };
};
export default useAbilities;
