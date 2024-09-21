import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import '@pixi/events';
import { FiSettings } from 'react-icons/fi';
import {
  adjustArchTiles,
  adjustBarTiles,
  adjustBoardTiles,
  adjustBorderTiles,
  adjustCarpetTiles,
  adjustDoorTiles,
  adjustFloorTiles,
  adjustLadderTiles,
  adjustPathTiles,
  adjustScreenTiles,
  adjustShadowTiles,
  adjustStairsTiles,
} from '../utils/tileAdjusters';
import { adjustWallTiles } from '../utils/tileAdjusters';
import { Field, Layer, Tile } from '../../types/DBTypes';
import useTiles from '../../hooks/useTiles';
import { Container, Sprite, Stage, Text } from '@pixi/react';

interface GameObject {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string;
}

const MapCreator: React.FC = () => {
  const { getAllTiles } = useTiles();
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [zoom, setZoom] = useState<number>(48);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [layer, setLayer] = useState<Layer>(Layer.GROUND);
  const [isReplace, setIsReplace] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const generateFields = async () => {
      const tiles = await getAllTiles();
      setTiles(tiles);

      setFields(prevFields => {
        const newFields: Field[] = [];
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const existingField = prevFields.find(
              field => field.x === x && field.y === y
            );

            if (existingField) {
              newFields.push(existingField);
            } else {
              newFields.push({
                x,
                y,
                layers: {
                  ground:
                    tiles.find(tile => tile.name.includes('sky')) || tiles[0],
                  floor: null,
                  wall: null,
                  border: null,
                  object: null,
                  detail: null,
                  collision: null,
                  overlay: null,
                  interaction: null,
                  shadow: null,
                  foreground: null,
                },
              });
            }
          }
        }
        return newFields;
      });
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

  const handleReplaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsReplace(e.target.checked);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleTileSelect = (tile: Tile) => {
    setSelectedTile(tile);
  };

  const handleFieldClick = (x: number, y: number) => {
    if (!selectedTile || !layer) return;
    if (isReplace) {
      setFields(prevFields =>
        prevFields.map(field =>
          field.x === x && field.y === y
            ? {
                ...field,
                layers: {
                  ground: null,
                  floor: null,
                  wall: null,
                  border: null,
                  object: null,
                  detail: null,
                  collision: null,
                  overlay: null,
                  interaction: null,
                  shadow: null,
                  foreground: null,
                  [layer.toLowerCase()]: selectedTile,
                },
              }
            : field
        )
      );
    } else {
      setFields(prevFields =>
        prevFields.map(field =>
          field.x === x && field.y === y
            ? {
                ...field,
                layers: {
                  ...field.layers,
                  [layer.toLowerCase()]: selectedTile,
                },
              }
            : field
        )
      );
    }
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

  const handleAdjustTiles = () => {
    setFields(prevFields => {
      const groundMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.ground?.name || '';
        })
      );
      const floorMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.floor?.name || '';
        })
      );
      const wallMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.wall?.name || '';
        })
      );
      const borderMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.border?.name || '';
        })
      );
      const objectMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.object?.name || '';
        })
      );
      const collisionMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.collision?.name || '';
        })
      );
      const overlayMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.overlay?.name || '';
        })
      );
      const detailMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.detail?.name || '';
        })
      );
      const interactionMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.interaction?.name || '';
        })
      );
      const shadowMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.shadow?.name || '';
        })
      );
      const foregroundMap = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const field = prevFields.find(f => f.x === x && f.y === y);

          return field?.layers.foreground?.name || '';
        })
      );
      adjustArchTiles(overlayMap, width, height);
      adjustBarTiles(detailMap, width, height);
      adjustBoardTiles(detailMap, width, height);
      adjustCarpetTiles(floorMap, wallMap, borderMap, width, height);
      adjustDoorTiles(overlayMap, width, height);
      adjustFloorTiles(groundMap, wallMap, overlayMap, width, height);
      adjustLadderTiles(floorMap, width, height);
      adjustPathTiles(floorMap, width, height);
      adjustScreenTiles(floorMap, width, height);
      adjustShadowTiles(floorMap, width, height);

      adjustBorderTiles(borderMap, wallMap, groundMap, floorMap, width, height);
      adjustStairsTiles(floorMap, wallMap, borderMap, width, height);
      adjustWallTiles(wallMap, borderMap, width, height);

      return prevFields.map(field => ({
        ...field,
        layers: {
          ground: field.layers.ground
            ? tiles.find(tile => tile.name === groundMap[field.y][field.x]) ||
              null
            : null,
          floor: field.layers.floor
            ? tiles.find(tile => tile.name === floorMap[field.y][field.x]) ||
              null
            : null,
          wall: field.layers.wall
            ? tiles.find(tile => tile.name === wallMap[field.y][field.x]) ||
              null
            : null,
          border: field.layers.border
            ? tiles.find(tile => tile.name === borderMap[field.y][field.x]) ||
              null
            : null,
          object: field.layers.object
            ? tiles.find(tile => tile.name === objectMap[field.y][field.x]) ||
              null
            : null,
          collision: field.layers.collision
            ? tiles.find(
                tile => tile.name === collisionMap[field.y][field.x]
              ) || null
            : null,
          overlay: field.layers.overlay
            ? tiles.find(tile => tile.name === overlayMap[field.y][field.x]) ||
              null
            : null,
          detail: field.layers.detail
            ? tiles.find(tile => tile.name === detailMap[field.y][field.x]) ||
              null
            : null,
          interaction: field.layers.interaction
            ? tiles.find(
                tile => tile.name === interactionMap[field.y][field.x]
              ) || null
            : null,
          shadow: field.layers.shadow
            ? tiles.find(tile => tile.name === shadowMap[field.y][field.x]) ||
              null
            : null,
          foreground: field.layers.foreground
            ? tiles.find(
                tile => tile.name === foregroundMap[field.y][field.x]
              ) || null
            : null,
        },
      }));
    });
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
            <label className="flex items-center text-sm flex-col">
              Selected Tile
              <img src={selectedTile?.imageUrl} />
            </label>
            <label className="flex items-center text-sm">
              Replace
              <input
                type="checkbox"
                checked={isReplace}
                onChange={handleReplaceChange}
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
            <button onClick={handleAdjustTiles} className="primary">
              Auto Adjust Tiles
            </button>
          </div>
        </div>
      </header>

      <div className="flex overflow-hidden w-full h-full">
        <div
          className="overflow-hidden flex justify-center items-center w-full"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
        >
          <Stage
            width={width * zoom}
            height={height * zoom}
            options={{ backgroundColor: 0x002211 }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {fields.map(field => (
              <Container
                key={`${field.x}-${field.y}`}
                x={field.x * zoom}
                y={field.y * zoom}
                interactive={true}
                pointerdown={() => handleFieldClick(field.x, field.y)}
                pointerover={() => handleMouseEnter(field.x, field.y)}
                mousedown={() => handleFieldClick(field.x, field.y)}
                mouseover={() => handleMouseEnter(field.x, field.y)}
              >
                {field.layers?.ground && (
                  <Sprite
                    image={field?.layers?.ground.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.floor && (
                  <Sprite
                    image={field?.layers?.floor.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.wall && (
                  <Sprite
                    image={field?.layers?.wall.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.border && (
                  <Sprite
                    image={field.layers?.border?.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.collision && (
                  <Sprite
                    image={field.layers.collision.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.overlay && (
                  <Sprite
                    image={field.layers.overlay.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.detail && (
                  <Sprite
                    image={field.layers.detail.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
                {field.layers?.shadow && (
                  <Sprite
                    image={field.layers.shadow.imageUrl}
                    width={zoom}
                    height={zoom}
                  />
                )}
              </Container>
            ))}
          </Stage>
        </div>
        <div className="relative">
          <div className="absolute right-20 flex flex-col items-left gap-2 mt-10">
            {Object.values(Layer)
              .filter(key => isNaN(Number(key)))
              .map(layerKey => (
                <button
                  key={layerKey}
                  className={`primary p-2 rounded ${layer.toString() === layerKey ? 'bg-yellow-400' : '!bg-gray-600 hover:!bg-yellow-400'}`}
                  onClick={() => setLayer(layerKey as Layer)}
                >
                  {layerKey}
                </button>
              ))}
          </div>
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
            layer={layer}
          />
        )}
      </div>
    </div>
  );
};

export default MapCreator;
