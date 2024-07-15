import { useEffect, useState } from 'react';
import { Subclass } from '../types/DBTypes';
import {
  getAllSubclasses,
  getSubclassByIdService
} from '../services/subclassService';

const useSubclasses = () => {
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubclasses = async () => {
      try {
        const data = await getAllSubclasses();
        setSubclasses(data);
      } catch (error) {
        setError('Failed to fetch subclasses');
      } finally {
        setLoading(false);
      }
    };

    fetchSubclasses();
  }, []);

  const getSubclassById = async ({ id }: { id: number }) => {
    try {
      const subclass = await getSubclassByIdService({ id: id });
      return subclass;
    } catch (error) {
      throw new Error('Failed to fetch subclass by id');
    }
  };

  return { subclasses, loading, error, getSubclassById };
};

export default useSubclasses;
