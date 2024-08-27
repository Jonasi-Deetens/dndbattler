import { useEffect, useState } from 'react';
import { Field } from '../types/DBTypes';
import { getAllFields } from '../services/fieldService';

const useFields = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getAllFields();
        setFields(data);
      } catch (error) {
        setError('Failed to fetch fields');
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  return { fields, loading, error, getAllFields };
};
export default useFields;
