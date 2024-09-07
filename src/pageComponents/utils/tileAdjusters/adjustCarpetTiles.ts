export const adjustCarpetTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('wall')) {
        //map[y][x] = determineWallType(map, x, y, width, height);
      }
    }
  }
};
