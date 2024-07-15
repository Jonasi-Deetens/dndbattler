import { useEffect, useState } from 'react';
import { Skill } from '../types/DBTypes';
import { getAllSkills } from '../services/skillService.tsx';

const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data);
      } catch (error) {
        setError('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error, getAllSkills };
};
export default useSkills;
