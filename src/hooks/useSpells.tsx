import { useEffect, useState } from 'react';
import { Spell } from '../types/DBTypes';
import { getAllSpells, getSpellsByListService } from '../services/spellService';

const useSpells = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const data = await getAllSpells();
        setSpells(data);
      } catch (error) {
        setError('Failed to fetch spells');
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  const getSpellsByList = async ({ spellList }: { spellList: string[] }) => {
    try {
      const spells = await getSpellsByListService({ spellList: spellList });
      return spells;
    } catch (error) {
      throw new Error('Failed to fetch spells by list');
    }
  };

  return { spells, loading, error, getSpellsByList };
};

export default useSpells;
