import React, { useEffect, useState } from 'react';
import { Campaign, Field } from '../../types/DBTypes';
import useCampaigns from '../../hooks/useCampaigns';

const GameBoard: React.FC = () => {
  const [campaign, setCampaign] = useState<Campaign>();
  const [fields, setFields] = useState<Field[]>([]);
  const { getAllCampaigns } = useCampaigns();

  useEffect(() => {
    const loadFields = async () => {
      const gridData = await getAllCampaigns();
      console.log(gridData);
      setCampaign(gridData[0]);
      setFields(gridData[0].fields);
    };

    loadFields();
  }, []);

  const gridSizeX = 15; // Assuming a 15x10 grid
  const gridSizeY = 10; // Assuming a 15x10 grid

  return (
    <div className="flex flex-col items-center py-10 bg-gray-900 min-h-screen">
      {campaign && (
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          {campaign.name}
        </h2>
      )}

      <div
        className="grid gap-0 overflow-auto w-full"
        style={{
          gridTemplateColumns: `repeat(${gridSizeX}, 80px)`,
          gridTemplateRows: `repeat(${gridSizeY}, 80px)`
        }}
      >
        {fields &&
          fields.map(field => (
            <div
              key={field.id}
              className={`grid-item flex justify-center items-center transition-all duration-300 ${
                field.type === 'grass'
                  ? 'bg-green-600'
                  : field.type === 'ceiling'
                  ? 'bg-gray-500'
                  : field.type === 'wall'
                  ? 'bg-gray-800'
                  : field.type === 'water'
                  ? 'bg-blue-500'
                  : 'bg-brown-600'
              } border border-gray-700 hover:opacity-80`}
              style={{
                width: '80px',
                height: '80px',
                position: 'relative',
                cursor: 'pointer'
              }}
              title={`Type: ${field.type}, Position: (${field.positionX}, ${field.positionY})`}
            >
              {field.isDestructible && (
                <span
                  className="absolute bottom-1 right-1 text-xs text-red-500 font-bold"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  D
                </span>
              )}
              {!field.passable && (
                <span
                  className="absolute top-1 left-1 text-xs text-red-500 font-bold"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  X
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameBoard;
