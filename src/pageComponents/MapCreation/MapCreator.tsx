import React, { useState, useEffect, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import { FiSettings } from 'react-icons/fi';

const FieldComponent = lazy(() => import('../Game/FieldComponent'));

const MapCreator: React.FC = () => {
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [fields, setFields] = useState<
    { x: number; y: number; type: string }[]
  >([]);
  const [zoom, setZoom] = useState<number>(64);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTile, setSelectedTile] = useState<string>('grass');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false); // State to track dragging

  useEffect(() => {
    const generateFields = () => {
      const newFields = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          newFields.push({ x, y, type: 'grass' }); // Default type is 'grass'
        }
      }
      setFields(newFields);
    };

    generateFields();
  }, [width, height]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Math.max(16, parseInt(e.target.value) || 64));
  };

  const handleShowGridChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrid(e.target.checked);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleTileSelect = (type: string) => {
    setSelectedTile(type);
  };

  const handleFieldClick = (x: number, y: number) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.x === x && field.y === y
          ? { ...field, type: selectedTile }
          : field
      )
    );
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (isDragging) {
      handleFieldClick(x, y);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-neutral-100 w-full h-screen"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <header className="sticky top-0 z-20 w-full bg-gray-800 shadow-md p-4">
        <div className="flex justify-between items-center mx-auto">
          <h2 className="text-2xl font-bold text-yellow-400">Map Generator</h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm">
              Show Grid
              <input
                type="checkbox"
                checked={showGrid}
                onChange={handleShowGridChange}
                className="ml-2"
              />
            </label>
            <label className="flex flex-col items-center text-sm">
              Width
              <input
                type="number"
                value={width}
                max={200}
                onChange={handleWidthChange}
                className="mt-1 p-1 w-16 text-center bg-gray-700 border border-gray-600 rounded text-neutral-100 focus:outline-none"
              />
            </label>
            <label className="flex flex-col items-center text-sm">
              Height
              <input
                type="number"
                value={height}
                max={150}
                onChange={handleHeightChange}
                className="mt-1 p-1 w-16 text-center bg-gray-700 border border-gray-600 rounded text-neutral-100 focus:outline-none"
              />
            </label>
            <label className="flex flex-col items-center text-sm">
              Zoom
              <input
                type="range"
                min="16"
                max="128"
                value={zoom}
                onChange={handleZoomChange}
                className="mt-1 w-24"
              />
            </label>
          </div>
        </div>
      </header>

      <div className="flex overflow-hidden w-full h-full">
        <div
          className="overflow-hidden flex justify-center items-center w-full"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
        >
          <div
            className={`grid overflow-y-auto overflow-auto p-5 w-full h-full max-h-full ${
              showGrid ? 'gap-1 border-2 border-yellow-500' : ''
            }`}
            style={{
              gridTemplateColumns: `repeat(${width}, ${zoom}px)`,
              gridTemplateRows: `repeat(${height}, ${zoom}px)`
            }}
          >
            {fields.map(({ x, y, type }) => (
              <Suspense
                fallback={<div className="loading">Loading...</div>}
                key={`${x}-${y}`}
              >
                <FieldComponent
                  isCharacterPosition={false}
                  additionalClasses="transition duration-300 ease-in-out"
                  type={type}
                  onClick={() => handleFieldClick(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                />
              </Suspense>
            ))}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleSidebar}
            className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-l shadow-lg z-30 hover:bg-gray-600 transition-colors ${
              isSidebarOpen ? 'left-64' : '-left-10'
            }`}
          >
            {isSidebarOpen ? '' : <FiSettings size={20} />}
          </button>
        </div>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSelectTile={handleTileSelect}
          />
        )}
      </div>
    </div>
  );
};

export default MapCreator;
