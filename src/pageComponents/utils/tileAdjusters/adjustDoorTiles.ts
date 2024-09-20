const determineDoorType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 3).join('-');

  return baseName;
};

export const adjustDoorTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('door')) {
        map[y][x] = determineDoorType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
