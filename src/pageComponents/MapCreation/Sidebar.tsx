import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { tileTypes } from '../utils/tileTypes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTile: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectTile }) => {
  return (
    <div
      className={`w-64 z-30 bg-gray-900 p-4 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } h-full shadow-lg overflow-y-auto`}
    >
      <button
        className="absolute top-2 right-2 text-white p-1 hover:text-yellow-500 focus:outline-none"
        onClick={onClose}
        aria-label="Close Sidebar"
      >
        <FaTimes size={20} />
      </button>
      <h3 className="text-white text-lg font-bold mt-4 mb-4 text-center">
        Select Tile Type
      </h3>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {tileTypes.map(tile => (
          <div
            key={tile.type}
            onClick={() => onSelectTile(tile.type)}
            className="cursor-pointer w-16 h-16 border-2 border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg active:scale-95 hover:border-yellow-500 transition duration-200 transform hover:scale-105"
          >
            <img
              src={tile.src}
              alt={tile.type}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
