import { useEffect, useState } from 'react';
import { Character, NewCharacter } from '../types/DBTypes';
import { addCharacter, getAllCharacters } from '../services/characterService';
import useAuth from './useAuth';

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCharacters = async () => {
      if (user) {
        try {
          const data = await getAllCharacters(user?.id);
          setCharacters(data.allCharacters);
        } catch (error) {
          setError('Failed to fetch characters');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacters();
  }, [user]);

  const handleAddCharacter = async (characterData: NewCharacter) => {
    try {
      const newCharacter = await addCharacter(characterData);
      setCharacters([...characters, newCharacter]);
    } catch (error) {
      setError('Failed to add character');
    }
  };

  return { characters, loading, error, handleAddCharacter };
};

export default useCharacters;
