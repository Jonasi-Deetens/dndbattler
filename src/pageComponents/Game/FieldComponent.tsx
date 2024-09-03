import React from 'react';
import { tileTypes } from '../utils/tileTypes'; // Adjust the path as necessary
import { Field } from '../../types/DBTypes';

interface FieldProps {
  field?: Field | undefined;
  isCharacterPosition: boolean;
  additionalClasses: string;
  type?: string;

  onClick?: () => void; // Add onClick prop here
}

const FieldComponent: React.FC<FieldProps> = React.memo(
  ({ field, isCharacterPosition, additionalClasses, type, onClick }) => {
    const getImageUrl = (type: string | undefined): string => {
      const tile = tileTypes.find(t => t.type === type);
      console.log(tile?.src);
      return tile ? tile.src : '';
    };

    return (
      <div
        className={`flex justify-center items-center ${
          isCharacterPosition ? 'border-4 border-yellow-500' : ''
        } ${additionalClasses}`}
        style={{
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: getImageUrl(field?.type || type) ? '' : 'gray',
          backgroundImage: `url(${getImageUrl(field?.type || type)})`,
          backgroundSize: 'cover'
        }}
        onClick={onClick}
      ></div>
    );
  }
);

export default FieldComponent;
