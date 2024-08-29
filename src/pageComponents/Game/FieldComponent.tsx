import React from 'react';
import grass from '../../assets/Tiles/grass.webp';
import grass2 from '../../assets/Tiles/grass-2.webp';
import path from '../../assets/Tiles/path.webp';
import floor from '../../assets/Tiles/floor.webp';
import topLeftCorner from '../../assets/Tiles/grass-corner-top-left.webp';
import topRightCorner from '../../assets/Tiles/grass-corner-top-right.webp';
import bottomLeftCorner from '../../assets/Tiles/grass-corner-bottom-left.webp';
import bottomRightCorner from '../../assets/Tiles/grass-corner-bottom-right.webp';
import bottomWall from '../../assets/Tiles/grass-wall-bottom.webp';
import topWall from '../../assets/Tiles/grass-wall-top.webp';
import leftWall from '../../assets/Tiles/grass-wall-left.webp';
import rightWall from '../../assets/Tiles/grass-wall-right.webp';
import trap from '../../assets/Tiles/grass-trap.webp';
import wall from '../../assets/Tiles/grass-wall.webp';
import water from '../../assets/Tiles/water.webp';
import bush from '../../assets/Tiles/grass-bush.webp';
import { Field } from '../../types/DBTypes';

interface FieldProps {
  field: Field | undefined;
  isCharacterPosition: boolean;
  additionalClasses: string; 
}

const FieldComponent: React.FC<FieldProps> = React.memo(
  ({ field, isCharacterPosition, additionalClasses }) => {
    const getImageUrl = (type: string | undefined): string => {
      const grassImages = [grass, grass2];
      const getRandomGrassImage = () => grassImages[Math.floor(Math.random() * grassImages.length)];

      switch (type) {
        case 'path':
          return path;
        case 'grass':
          return getRandomGrassImage();
        case 'floor':
          return floor;
        case 'top-left-corner':
          return topLeftCorner;
        case 'top-right-corner':
          return topRightCorner;
        case 'bottom-left-corner':
          return bottomLeftCorner;
        case 'bottom-right-corner':
          return bottomRightCorner;
        case 'bottom-wall':
          return bottomWall;
        case 'top-wall':
          return topWall;
        case 'left-wall':
          return leftWall;
        case 'right-wall':
          return rightWall;
        case 'trap':
          return trap;
        case 'wall':
          return wall;
        case 'water':
          return water;
        case 'mountain':
          return bush;
        default:
          return '';
      }
    };

    return (
      <div
        className={`flex justify-center items-center ${
          isCharacterPosition ? 'border-4 border-yellow-500' : ''
        } ${additionalClasses}`} 
        style={{
          width: '64px',
          height: '64px',
          position: 'relative',
          cursor: 'pointer',
          backgroundImage: `url(${getImageUrl(field?.type)})`,
          backgroundSize: 'cover',
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
);

export default FieldComponent;
