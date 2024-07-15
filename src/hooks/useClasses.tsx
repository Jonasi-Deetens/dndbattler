import { useEffect, useState } from 'react';
import { Class } from '../types/DBTypes';
import {
  getAllClasses,
  getAllSpellsFromClassService,
  getClassByIdService
} from '../services/classService';

const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses();
        setClasses(data);
      } catch (error) {
        setError('Failed to fetch subraces');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const getClassById = async ({ id }: { id: number }) => {
    try {
      const classById = await getClassByIdService({ id: id });
      return classById;
    } catch (error) {
      throw new Error('Failed to fetch class by id');
    }
  };

  const getAllSpellsFromClass = async ({
    className
  }: {
    className: string;
  }) => {
    try {
      const spells = await getAllSpellsFromClassService({
        className: className
      });
      return spells;
    } catch (error) {
      setError('Failed to fetch spells from class');
    } finally {
      setLoading(false);
    }
  };

  return { classes, loading, error, getClassById, getAllSpellsFromClass };
};

export default useClasses;
