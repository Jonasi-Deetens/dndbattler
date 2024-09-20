const determineCarpetType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 3).join('-');

  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);

  const hasBorderLeft =
    x > 0 &&
    (map[y][x - 1].includes('border') || map[y][x - 1].includes('wall'));

  if (!hasTileLeft && hasTileRight) {
    if (hasBorderLeft) return tileName + '-left-shadow';
    else return tileName + '-left';
  }
  if (hasTileLeft && !hasTileRight) return tileName + '-right';
  if (!hasTileLeft && !hasTileRight) {
    if (hasBorderLeft) return tileName + '-shadow';
    else return tileName;
  }

  return tileName + '-middle';
};

export const adjustCarpetTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('carpet')) {
        map[y][x] = determineCarpetType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
