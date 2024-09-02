import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { Campaign, Character, Field } from '../../types/DBTypes';
import useCampaigns from '../../hooks/useCampaigns';
import { useLocation } from 'react-router-dom';

// Lazy load FieldComponent
const FieldComponent = lazy(() => import('./FieldComponent'));

const GameBoard: React.FC = React.memo(() => {
  const [campaign, setCampaign] = useState<Campaign>();
  const [fields, setFields] = useState<Field[]>([]);
  const [maxX, setMaxX] = useState<number>(0);
  const [maxY, setMaxY] = useState<number>(0);
  const [fieldsMap, setFieldsMap] = useState<Map<string, Field>>(new Map());
  const [lastKeyDownTime, setLastKeyDownTime] = useState<number>(Date.now());
  const { getAllCampaigns } = useCampaigns();

  const location = useLocation();
  const character = location.state?.character as Character;

  const initialPosition = { x: 5, y: 5 };
  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);

  const gridLayout = Array(15).fill(13);

  useEffect(() => {
    const loadFields = async () => {
      const gridData = await getAllCampaigns();
      const campaignData = gridData[0];
      setCampaign(campaignData);
      setFields(campaignData.fields);

      let maxPositionX = 0;
      let maxPositionY = 0;

      const newFieldsMap = new Map<string, Field>();

      campaignData.fields.forEach(field => {
        if (field.positionX > maxPositionX) {
          maxPositionX = field.positionX;
        }
        if (field.positionY > maxPositionY) {
          maxPositionY = field.positionY;
        }
        // Add to map for quick lookup
        newFieldsMap.set(`${field.positionX},${field.positionY}`, field);
      });

      setFieldsMap(newFieldsMap);
      setMaxX(maxPositionX);
      setMaxY(maxPositionY);
    };

    loadFields();
  }, [getAllCampaigns]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const currentTime = Date.now();
      if (currentTime - lastKeyDownTime < 100) {
        return;
      }

      setLastKeyDownTime(currentTime);

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

          const targetField = fields.find(
            field => field.positionX === newX && field.positionY === newY
          );

          if (targetField?.passable) {
            return { x: newX, y: newY };
          }

          return prevPosition;
        });
    },
    [fields, maxX, maxY, lastKeyDownTime]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const isFieldBlurry = ({ field }: { field: Field }): boolean => {
    const deltaX = field.positionX - characterPosition.x;
    const deltaY = field.positionY - characterPosition.y;

    const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const stepX = deltaX / steps;
    const stepY = deltaY / steps;

    let currentX = characterPosition.x;
    let currentY = characterPosition.y;

    for (let i = 0; i < steps; i++) {
      currentX += stepX;
      currentY += stepY;

      const roundedX = Math.round(currentX);
      const roundedY = Math.round(currentY);

      const chunkKey = `${roundedX},${roundedY}`;
      const blockingField = fieldsMap.get(chunkKey);

      if (blockingField && !blockingField.seeThrough) {
        if (roundedX === field.positionX && roundedY === field.positionY) {
          return false;
        }
        return true;
      }
    }

    return false;
  };

  // Function to generate visible fields based on the current character position
  const getVisibleFields = () => {
    const visibleFields = [];
    const gridWidth = gridLayout[0];
    const gridHeight = gridLayout.length;

    const halfGridWidth = Math.floor(gridWidth / 2);
    const halfGridHeight = Math.floor(gridHeight / 2);

    const startX = Math.max(characterPosition.x - halfGridWidth, 0);
    const endX = Math.min(characterPosition.x + halfGridWidth, maxX);

    const startY = Math.max(characterPosition.y - halfGridHeight, 0);
    const endY = Math.min(characterPosition.y + halfGridHeight, maxY);

    // Loop over the specific range of fields
    for (let y = startY; y <= endY; y++) {
      const rowIndex = y - startY;
      const cols = gridLayout[rowIndex];
      const halfRowCols = Math.floor(cols / 2);

      for (let x = startX; x <= endX; x++) {
        const colIndex = x - startX;
        const realX = colIndex - halfRowCols + characterPosition.x;
        const realY = y;

        const chunkKey = `${realX},${realY}`;
        const field = fieldsMap.get(chunkKey);

        if (field) {
          visibleFields.push({
            field,
            realX,
            realY,
            rowIndex,
            colIndex,
            cols
          });
        }
      }
    }

    return visibleFields;
  };
  // Render the filtered visible fields grouped into rows
  const renderVisibleFields = () => {
    const filteredVisibleFields = getVisibleFields().reduce(
      (acc, { field, realX, realY, rowIndex, colIndex, cols }) => {
        let borderStyle = '';

        if (rowIndex === 0) {
          borderStyle += 'border-t-2 border-gray-600 ';
        }
        if (rowIndex === gridLayout.length - 1) {
          borderStyle += 'border-b-2 border-gray-600 ';
        }
        if (colIndex === 0) {
          borderStyle += 'border-l-2 border-gray-600 ';
        }
        if (colIndex === cols - 1) {
          borderStyle += 'border-r-2 border-gray-600 ';
        }

        const blurClass = isFieldBlurry({ field })
          ? 'transition duration-300 ease-in-out brightness-25 opacity-20'
          : 'transition duration-300 ease-in-out';

        const fieldComponent = (
          <Suspense
            fallback={<div className="loading">Loading...</div>}
            key={`${rowIndex}-${colIndex}`}
          >
            <FieldComponent
              field={field}
              isCharacterPosition={
                realX === characterPosition.x && realY === characterPosition.y
              }
              additionalClasses={`${borderStyle} ${blurClass}`}
            />
          </Suspense>
        );

        if (!acc[rowIndex]) {
          acc[rowIndex] = [];
        }
        acc[rowIndex].push(fieldComponent);

        return acc;
      },
      [] as JSX.Element[][]
    );

    return filteredVisibleFields.map((rowFields, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="flex justify-center"
        style={{ width: `${rowFields.length * 64}px` }}
      >
        {rowFields}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-neutral-100 relative">
      <header className="w-full bg-gray-800 shadow-lg p-4 fixed top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-yellow-400">
            {campaign?.name} - {character.name}
          </h2>
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

      <div className=" flex-grow w-full mt-[64px] overflow-hidden relative flex justify-center">
        <div className="flex flex-col justify-center items-center min-w-max">
          {renderVisibleFields()}
        </div>
      </div>
    </div>
  );
});

export default GameBoard;
