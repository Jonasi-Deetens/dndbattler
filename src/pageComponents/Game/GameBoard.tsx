import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { Campaign, Character, Field } from '../../types/DBTypes';
import useCampaigns from '../../hooks/useCampaigns';
import { useLocation } from 'react-router-dom';

// Lazy load FieldComponent
const FieldComponent = lazy(() => import('./FieldComponent'));

const GameBoard: React.FC = React.memo(() => {
  const [campaign, setCampaign] = useState<Campaign>();
  const [fields, setFields] = useState<Field[]>([]);
  const [maxX, setMaxX] = useState<number>();
  const [maxY, setMaxY] = useState<number>();
  const { getAllCampaigns } = useCampaigns();

  const location = useLocation();
  const character = location.state?.character as Character;

  const initialPosition = { x: 10, y: 10 };
  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);

  const gridLayout = [
    5, 7, 9, 11, 13, 15, 15, 17, 19, 19, 21, 21, 21, 19, 19, 17,
    15, 15, 13, 11, 9, 7, 5
  ];

  useEffect(() => {
    const loadFields = async () => {
      const gridData = await getAllCampaigns();
      const campaignData = gridData[0];
      setCampaign(campaignData);
      setFields(campaignData.fields);

      let maxPositionX = 0;
      let maxPositionY = 0;
      let hasPathField = false;

      campaignData.fields.forEach(field => {
        if (field.positionX > maxPositionX) {
          maxPositionX = field.positionX;
        }
        if (field.positionY > maxPositionY) {
          maxPositionY = field.positionY;
        }

        if (field.type === 'path') {
          hasPathField = true;
        }
      });

      setMaxX(maxPositionX);
      setMaxY(maxPositionY);

      // Example: Log if a 'path' field exists
      if (hasPathField) {
        console.log('A field with type "path" exists in the grid.');
      } else {
        console.log('No fields with type "path" were found.');
      }
    };

    loadFields();
  }, [getAllCampaigns]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault(); // Prevent default scrolling behavior

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
    },
    [maxX, maxY]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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

      // Determine border style
      let borderStyle = '';

      // Top border
      if (rowIndex === 0) {
        borderStyle += 'border-t-2 border-gray-600 ';
      }
      // Bottom border
      if (rowIndex === gridLayout.length - 1) {
        borderStyle += 'border-b-2 border-gray-600 ';
      }
      // Left border
      if (colIndex === 0) {
        borderStyle += 'border-l-2 border-gray-600 ';
      }
      // Right border
      if (colIndex === cols - 1) {
        borderStyle += 'border-r-2 border-gray-600 ';
      }

      rowFields.push(
        <Suspense
          fallback={<div className="loading">Loading...</div>}
          key={`${rowIndex}-${colIndex}`}
        >
          <FieldComponent
            field={field}
            isCharacterPosition={
              realX === characterPosition.x && realY === characterPosition.y
            }
            additionalClasses={borderStyle}
          />
        </Suspense>
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
      <div
        className="bg-grass flex-grow w-full mt-[64px] overflow-hidden relative flex justify-center"
      >
        <div className="flex flex-col justify-center items-center min-w-max">
          {visibleFields}
        </div>
      </div>
    </div>
  );
});

export default GameBoard;
