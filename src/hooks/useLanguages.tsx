import { useEffect, useState } from "react";
import { Language } from "../types/DBTypes";
import { getAllLanguages } from "../services/languageService";

const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getAllLanguages();
        setLanguages(data);
      } catch (error) {
        setError("Failed to fetch languages");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading, error, getAllLanguages };
};
export default useLanguages;
