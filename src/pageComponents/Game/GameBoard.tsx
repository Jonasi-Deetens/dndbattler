import React, { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { Campaign, Character, Field } from "../../types/DBTypes";
import useCampaigns from "../../hooks/useCampaigns";
import { useLocation } from "react-router-dom";

// Lazy load FieldComponent
const FieldComponent = lazy(() => import("./FieldComponent"));

const GameBoard: React.FC = React.memo(() => {
  const [campaign, setCampaign] = useState<Campaign>();
  const [fields, setFields] = useState<Field[]>([]);
  const [maxX, setMaxX] = useState<number>();
  const [maxY, setMaxY] = useState<number>();
  const [lastKeyDownTime, setLastKeyDownTime] = useState<number>(Date.now());
  const { getAllCampaigns } = useCampaigns();

  const location = useLocation();
  const character = location.state?.character as Character;

  const initialPosition = { x: 10, y: 10 };
  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);

  const gridLayout = [
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21,
  ];

  useEffect(() => {
    const loadFields = async () => {
      const gridData = await getAllCampaigns();
      const campaignData = gridData[0];
      setCampaign(campaignData);
      setFields(campaignData.fields);

      let maxPositionX = 0;
      let maxPositionY = 0;

      campaignData.fields.forEach((field) => {
        if (field.positionX > maxPositionX) {
          maxPositionX = field.positionX;
        }
        if (field.positionY > maxPositionY) {
          maxPositionY = field.positionY;
        }
      });

      setMaxX(maxPositionX);
      setMaxY(maxPositionY);
    };

    loadFields();
  }, [getAllCampaigns]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const currentTime = Date.now();
      if (currentTime - lastKeyDownTime < 500) {
        return;
      }

      setLastKeyDownTime(currentTime);

      maxX &&
        maxY &&
        setCharacterPosition((prevPosition) => {
          let newX = prevPosition.x;
          let newY = prevPosition.y;

          switch (event.key) {
            case "ArrowUp":
              newY = Math.max(0, prevPosition.y - 1);
              break;
            case "ArrowDown":
              newY = Math.min(maxY, prevPosition.y + 1);
              break;
            case "ArrowLeft":
              newX = Math.max(0, prevPosition.x - 1);
              break;
            case "ArrowRight":
              newX = Math.min(maxX, prevPosition.x + 1);
              break;
            default:
              break;
          }

          const targetField = fields.find(
            (field) => field.positionX === newX && field.positionY === newY
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
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const isFieldBlurry = ({ field }: { field: Field }): boolean => {
    const deltaX = field.positionX - characterPosition.x;
    const deltaY = field.positionY - characterPosition.y;

    // Calculate slope for diagonal checks
    const slope = deltaY / deltaX;

    let hasBlockingField = false;

    // Traverse the fields only once
    fields.forEach((otherField) => {
      if (!otherField.seeThrough) {
        const otherDeltaX = otherField.positionX - characterPosition.x;
        const otherDeltaY = otherField.positionY - characterPosition.y;

        // Horizontal and vertical blocking checks
        if (deltaX === 0 || deltaY === 0) {
          const isHorizontalBlock =
            field.positionY === characterPosition.y &&
            otherField.positionY === field.positionY &&
            otherField.positionX >
              Math.min(field.positionX, characterPosition.x) &&
            otherField.positionX <
              Math.max(field.positionX, characterPosition.x);

          const isVerticalBlock =
            field.positionX === characterPosition.x &&
            otherField.positionX === field.positionX &&
            otherField.positionY >
              Math.min(field.positionY, characterPosition.y) &&
            otherField.positionY <
              Math.max(field.positionY, characterPosition.y);

          if (isHorizontalBlock || isVerticalBlock) {
            hasBlockingField = true;
            return;
          }
        }
        // Diagonal/angled blocking checks
        if (otherDeltaX !== 0 && otherDeltaY !== 0) {
          const otherSlope = otherDeltaY / otherDeltaX;

          if (
            slope === otherSlope && // Same slope
            ((otherDeltaX > 0 && deltaX > 0) ||
              (otherDeltaX < 0 && deltaX < 0)) && // Same direction in X
            ((otherDeltaY > 0 && deltaY > 0) ||
              (otherDeltaY < 0 && deltaY < 0)) && // Same direction in Y
            Math.abs(otherDeltaX) < Math.abs(deltaX) &&
            Math.abs(otherDeltaY) < Math.abs(deltaY) // Check if the blocking field is closer to the player
          ) {
            hasBlockingField = true;
          }
        }
      }
    });

    return hasBlockingField;
  };

  // Function to generate visible fields based on the current character position
  const getVisibleFields = () => {
    const visibleFields: {
      field: Field;
      realX: number;
      realY: number;
      rowIndex: number;
      colIndex: number;
      cols: number;
    }[] = [];

    gridLayout.forEach((cols, rowIndex) => {
      const centerRow = Math.floor(gridLayout.length / 2);
      const halfRowCols = Math.floor(cols / 2);

      const offsetY = characterPosition.y - centerRow;

      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const realX = colIndex - halfRowCols + characterPosition.x;
        const realY = rowIndex + offsetY;

        const field = fields.find(
          (field) => field.positionX === realX && field.positionY === realY
        );

        if (field) {
          visibleFields.push({ field, realX, realY, rowIndex, colIndex, cols });
        }
      }
    });

    return visibleFields;
  };

  // Render the filtered visible fields grouped into rows
  const renderVisibleFields = () => {
    const filteredVisibleFields = getVisibleFields().reduce(
      (acc, { field, realX, realY, rowIndex, colIndex, cols }) => {
        // Determine border style
        let borderStyle = "";

        // Top border
        if (rowIndex === 0) {
          borderStyle += "border-t-2 border-gray-600 ";
        }
        // Bottom border
        if (rowIndex === gridLayout.length - 1) {
          borderStyle += "border-b-2 border-gray-600 ";
        }
        // Left border
        if (colIndex === 0) {
          borderStyle += "border-l-2 border-gray-600 ";
        }
        // Right border
        if (colIndex === cols - 1) {
          borderStyle += "border-r-2 border-gray-600 ";
        }

        const blurClass = isFieldBlurry({ field }) ? "blur-sm" : "";

        // Create the field component
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

        // Group fields into rows
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
      <div className="bg-grass flex-grow w-full mt-[64px] overflow-hidden relative flex justify-center">
        <div className="flex flex-col justify-center items-center min-w-max">
          {renderVisibleFields()}
        </div>
      </div>
    </div>
  );
});

export default GameBoard;
