import React from 'react';
import { Field } from '../../types/DBTypes';

interface FieldProps {
  field?: Field | undefined;
  isCharacterPosition?: boolean;
  additionalClasses?: string;
  type?: string;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

const FieldComponent: React.FC<FieldProps> = React.memo(
  ({
    field,
    isCharacterPosition,
    additionalClasses,
    onClick,
    onMouseEnter,
  }) => {
    const layers = field?.layers || {
      floor: undefined,
      wall: undefined,
      detail: undefined,
      object: undefined,
      roof: undefined,
      overlay: undefined,
    };

    return (
      <div
        className={`relative flex justify-center items-center ${additionalClasses} ${
          isCharacterPosition ? 'border-4 border-yellow-500' : ''
        }`}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {/* Floor Layer */}
        {layers.floor && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.floor.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 1,
            }}
          />
        )}

        {/* Wall Layer */}
        {layers.wall && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.wall.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 2,
            }}
          />
        )}

        {/* Detail Layer */}
        {layers.detail && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.detail.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 3,
            }}
          />
        )}

        {/* Object Layer */}
        {layers.object && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.object.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 4,
            }}
          />
        )}

        {/* Roof Layer */}
        {layers.roof && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.roof.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 5,
            }}
          />
        )}

        {/* Overlay Layer */}
        {layers.overlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${layers.overlay.imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 6,
            }}
          />
        )}
      </div>
    );
  }
);

export default FieldComponent;
