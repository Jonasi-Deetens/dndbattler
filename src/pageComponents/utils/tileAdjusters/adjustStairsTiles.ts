const determineStairsType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  // Extract the base type (e.g., 'wall-2')
  const tileName = baseName.split('-').slice(0, 2).join('-');

  const isHorizontalEdge = x === 0 || x === width - 1;
  const isVerticalEdge = y === 0 || y === height - 1;

  const hasTileAbove = y > 0 && map[y - 1][x].includes(tileName);
  const hasTileBelow = y < height - 1 && map[y + 1][x].includes(tileName);
  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);

  const hasFloorAbove = y > 0 && map[y - 1][x].includes('floor');
  const hasFloorBelow = y < height - 1 && map[y + 1][x].includes('floor');
  const hasFloorLeft = x > 0 && map[y][x - 1].includes('floor');
  const hasFloorRight = x < width - 1 && map[y][x + 1].includes('floor');

  if (!hasTileAbove && hasFloorRight) return tileName + '-stairs-left-top';
  if (hasTileAbove && hasFloorRight) return tileName + '-stairs-left-bottom';
  if (!hasTileAbove && hasFloorLeft) return tileName + '-stairs-right-top';
  if (hasTileAbove && hasFloorLeft) return tileName + '-stairs-right-bottom';

  if (hasTileLeft && hasFloorAbove) return tileName + '-stairs-bottom';
  if (!hasTileLeft && hasFloorAbove) return tileName + '-stairs-bottom-left';
  if (hasTileLeft && hasFloorBelow) return tileName + '-stairs-top';
  if (!hasTileLeft && hasFloorBelow) return tileName + '-stairs-top-left';

  return baseName;
};

export const adjustStairsTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('stairs')) {
        map[y][x] = determineStairsType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
