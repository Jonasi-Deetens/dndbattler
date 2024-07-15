import { useEffect, useState } from "react";
import { Class } from "../types/DBTypes";
import {
  getAllClasses,
  getAllSpellsFromClassService,
} from "../services/classService";

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
        setError("Failed to fetch subraces");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const getAllSpellsFromClass = async ({
    className,
  }: {
    className: string;
  }) => {
    try {
      const spells = await getAllSpellsFromClassService({
        className: className,
      });
      return spells;
    } catch (error) {
      setError("Failed to fetch spells from class");
    } finally {
      setLoading(false);
    }
  };

  return { classes, loading, error, getAllSpellsFromClass };
};

export default useClasses;
