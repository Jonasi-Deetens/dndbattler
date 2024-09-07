import React, { useEffect, useState } from 'react';
import useTiles from '../../hooks/useTiles';
import { Tile } from '../../types/DBTypes';

interface FieldProps {
  isCharacterPosition: boolean;
  additionalClasses: string;
  name: string;

  onMouseEnter?: () => void;
  onClick?: () => void;
}

const FieldComponent: React.FC<FieldProps> = React.memo(
  ({ isCharacterPosition, additionalClasses, name, onClick, onMouseEnter }) => {
    const { getAllTiles } = useTiles();
    const [tiles, setTiles] = useState<Tile[]>([]);

    const getTileByName = (name: string) => {
      const foundTile = tiles.find(tile => tile.name === name);
      return foundTile;
    };

    useEffect(() => {
      const fetchTiles = async () => {
        try {
          const fetchedTiles = await getAllTiles();
          setTiles(fetchedTiles);
        } catch (error) {
          console.error('Failed to fetch tiles:', error);
        }
      };

      fetchTiles();
    }, []);

    return (
      <div
        className={`flex justify-center items-center ${
          isCharacterPosition ? 'border-4 border-yellow-500' : ''
        } ${additionalClasses}`}
        style={{
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: getTileByName(name)?.imageUrl ? '' : 'gray',
          backgroundImage: `url(${getTileByName(name)?.imageUrl})`,
          backgroundSize: 'cover',
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      ></div>
    );
  }
);

export default FieldComponent;
