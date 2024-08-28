import React, { useEffect, useState } from 'react';
import { Campaign, Character, Field } from '../../types/DBTypes';
import useCampaigns from '../../hooks/useCampaigns';
import { useLocation } from 'react-router-dom';
import grass from '../../assets/Tiles/grass.webp';
import path from '../../assets/Tiles/path.webp';
import floor from '../../assets/Tiles/floor.webp';
import topLeftCorner from '../../assets/Tiles/grass-corner-top-left.webp';
import topRightCorner from '../../assets/Tiles/grass-corner-top-right.webp';
import bottomLeftCorner from '../../assets/Tiles/grass-corner-bottom-left.webp';
import bottomRightCorner from '../../assets/Tiles/grass-corner-bottom-right.webp';
import bottomWall from '../../assets/Tiles/grass-wall-bottom.webp';
import topWall from '../../assets/Tiles/grass-wall-top.webp';

const GameBoard: React.FC = () => {
  const [campaign, setCampaign] = useState<Campaign>();
  const [fields, setFields] = useState<Field[]>([]);
  const [maxX, setMaxX] = useState<number>();
  const [maxY, setMaxY] = useState<number>();
  const { getAllCampaigns } = useCampaigns();

  const location = useLocation();
  const character = location.state?.character as Character;

  // Define initial character position (always centered)
  const initialPosition = { x: 10, y: 10 }; // Adjusted to reflect center of new grid
  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);

  // Grid layout: each row's number of cells
  const gridLayout = [
    11, 11, 15, 15, 19, 23, 27, 27, 31, 31, 35, 35, 39, 39, 39, 35, 35, 31, 31,
    27, 27, 23, 19, 15, 15, 11, 11
  ];

  useEffect(() => {
    const loadFields = async () => {
      const gridData = await getAllCampaigns();
      const campaignData = gridData[0];
      setCampaign(campaignData);
      setFields(campaignData.fields);

      const maxPositionX = Math.max(
        ...gridData[0].fields.map(field => field.positionX)
      );
      const maxPositionY = Math.max(
        ...gridData[0].fields.map(field => field.positionY)
      );

      setMaxX(maxPositionX);
      setMaxY(maxPositionY);
    };

    loadFields();
  }, [getAllCampaigns]);

  // Handle character movement with arrow keys
  const handleKeyDown = (event: KeyboardEvent) => {
    maxX &&
      maxY &&
      setCharacterPosition(prevPosition => {
        let newX = prevPosition.x;
        let newY = prevPosition.y;

        switch (event.key) {
          case 'ArrowUp':
            newY = Math.max(0, prevPosition.y - 1);
            break;
          case 'ArrowDown':
            newY = Math.min(maxY, prevPosition.y + 1);
            break;
          case 'ArrowLeft':
            newX = Math.max(0, prevPosition.x - 1);
            break;
          case 'ArrowRight':
            newX = Math.min(maxX, prevPosition.x + 1);
            break;
          default:
            break;
        }

        return { x: newX, y: newY };
      });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [maxX, maxY]);

  const visibleFields = gridLayout.map((cols, rowIndex) => {
    const centerRow = Math.floor(gridLayout.length / 2);
    const halfRowCols = Math.floor(cols / 2);

    const offsetY = characterPosition.y - centerRow;

    const rowFields = [];

    for (let colIndex = 0; colIndex < cols; colIndex++) {
      const realX = colIndex - halfRowCols + characterPosition.x;
      const realY = rowIndex + offsetY;

      const field = fields.find(
        field => field.positionX === realX && field.positionY === realY
      );

      rowFields.push(
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`flex justify-center items-center transition-all duration-300 border ${
            realX === characterPosition.x && realY === characterPosition.y
              ? 'border-4 border-yellow-500'
              : 'border-0'
          }`}
          style={{
            width: '64px',
            height: '64px',
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: field
              ? field.type === 'ceiling'
                ? 'gray'
                : field.type === 'wall'
                ? 'darkgray'
                : field.type === 'water'
                ? 'blue'
                : field.type === 'lava'
                ? 'brown'
                : 'transparent'
              : 'gray',
            backgroundImage:
              field?.type === 'path'
                ? `url(${path})`
                : field?.type === 'grass'
                ? `url(${grass})`
                : field?.type === 'floor'
                ? `url(${floor})`
                : field?.type === 'top-left-corner'
                ? `url(${topLeftCorner})`
                : field?.type === 'top-right-corner'
                ? `url(${topRightCorner})`
                : field?.type === 'bottom-left-corner'
                ? `url(${bottomLeftCorner})`
                : field?.type === 'bottom-right-corner'
                ? `url(${bottomRightCorner})`
                : field?.type === 'bottom-wall'
                ? `url(${bottomWall})`
                : field?.type === 'top-wall'
                ? `url(${topWall})`
                : 'none',
            backgroundSize: 'cover'
          }}
        >
          {field && field.isDestructible && (
            <span
              className="absolute bottom-1 right-1 text-xs text-red-500 font-bold"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              D
            </span>
          )}
          {field && !field.passable && (
            <span
              className="absolute top-1 left-1 text-xs text-red-500 font-bold"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              X
            </span>
          )}
        </div>
      );
    }
    return (
      <div
        key={`row-${rowIndex}`}
        className="flex justify-center"
        style={{ width: `${cols * 64}px` }}
      >
        {rowFields}
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-neutral-100 relative">
      {/* Header Overlay */}
      <header className="w-full bg-gray-800 shadow-lg p-4 fixed top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Game Title */}
          <h2 className="text-2xl font-bold text-yellow-400">
            {campaign?.name} - {character.name}
          </h2>

          {/* Character Stats */}
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-sm">Level</span>
              <span className="text-lg">{character.stats.level}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-sm">HP</span>
              <span className="text-lg">
                {character.stats.hp} / {character.stats.maxHp}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-sm">AC</span>
              <span className="text-lg">{character.stats.ac}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Game Grid Container */}
      <div className="flex-grow w-full mt-[64px] overflow-auto relative flex justify-center">
        <div className="flex flex-col justify-center items-center min-w-max">
          {visibleFields}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
