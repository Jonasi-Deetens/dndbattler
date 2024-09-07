import { useEffect, useState } from 'react';
import { Tile } from '../types/DBTypes';
import { getAllTiles } from '../services/tileService';

const useTiles = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const data = await getAllTiles();
        setTiles(data);
      } catch (error) {
        setError('Failed to fetch tiles');
      } finally {
        setLoading(false);
      }
    };

    fetchTiles();
  }, []);

  return { tiles, loading, error, getAllTiles };
};
export default useTiles;
