const determineBarType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  // Extract the base type (e.g., 'wall-2')
  const tileName = baseName.split('-').slice(0, 2).join('-');

  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);

  const hasWallAbove =
    (y > 0 && map[y - 1][x].includes('wall')) ||
    (y > 0 && map[y - 1][x].includes('border'));
  const hasWallTopLeft =
    (x > 0 && y > 0 && map[y - 1][x - 1].includes('wall')) ||
    (x > 0 && y > 0 && map[y - 1][x - 1].includes('border'));

  if (hasWallAbove && hasWallTopLeft && !hasTileLeft)
    return tileName + '-shadow-corner';
  if (hasWallAbove) return tileName + '-shadow';

  return tileName;
};

export const adjustBarTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('bar')) {
        map[y][x] = determineBarType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
