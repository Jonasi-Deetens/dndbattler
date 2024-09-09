import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import useTiles from '../../hooks/useTiles';
import { Tile } from '../../types/DBTypes';
import { FaArrowLeft } from 'react-icons/fa6';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTile: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectTile }) => {
  const { getAllTiles } = useTiles();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const itemsPerPage = 50;

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

  const filteredTiles = tiles.filter(tile =>
    tile.name.toLowerCase().includes(filter.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTiles = filteredTiles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tiles.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };

  return (
    <div
      className={`w-64 z-30 bg-gray-900 p-4 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } h-full shadow-lg flex flex-col`}
    >
      <div className="h-25 mb-5">
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
        <input
          type="text"
          placeholder="Filter tiles..."
          value={filter}
          onChange={handleFilterChange}
          className="mb-4 p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center h-11/12 overflow-auto">
        {tiles &&
          currentTiles.map(tile => (
            <div
              key={tile.name}
              onClick={() => onSelectTile(tile.name)}
              className="cursor-pointer w-16 h-16 border-2 border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg active:scale-95 hover:border-yellow-500 transition duration-200 transform hover:scale-105"
            >
              <img
                src={tile.imageUrl}
                alt={tile.name}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded mr-2 hover:bg-gray-600 disabled:opacity-50"
        >
          <FaArrowLeft size={10} />
        </button>
        <span className="text-white">
          {page} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-700 text-white rounded ml-2 hover:bg-gray-600 disabled:opacity-100"
        >
          <FaArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
