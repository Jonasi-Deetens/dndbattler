const determineFloorType = (
  map: string[][],
  wallMap: string[][],
  borderMap: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 3).join('-');

  const hasWallAbove =
    (y > 0 && wallMap[y - 1][x].includes('wall')) ||
    (y > 0 && borderMap[y - 1][x].includes('border'));
  const hasWallBelow =
    (y < height - 1 && wallMap[y + 1][x].includes('wall')) ||
    (y < height - 1 && borderMap[y + 1][x].includes('border'));
  const hasWallLeft =
    (x > 0 && wallMap[y][x - 1].includes('wall')) ||
    (x > 0 && borderMap[y][x - 1].includes('border'));
  const hasWallRight =
    (x < width - 1 && wallMap[y][x + 1].includes('wall')) ||
    (x < width - 1 && borderMap[y][x + 1].includes('border'));

  const hasWallTopLeft =
    x > 0 && y > 0 && wallMap[y - 1][x - 1].includes('wall');

  if (!hasWallAbove && hasWallLeft) {
    return tileName + '-corner-bottom-left';
  }
  if (hasWallAbove && !hasWallLeft) {
    return tileName + '-top';
  }
  if (hasWallAbove && hasWallLeft) {
    return tileName + '-corner-top-left';
  }
  if (!hasWallAbove && !hasWallLeft && hasWallTopLeft) {
    return tileName + '-corner-top-right';
  }
  if (!hasWallAbove && hasWallBelow && !hasWallLeft && hasWallRight) {
    // return tileName + '-corner-bottom-right';
    return tileName + '-bottom';
  }

  // Default fallback
  return tileName + '-bottom';
};

export const adjustFloorTiles = (
  map: string[][],
  wallMap: string[][],
  borderMap: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('ground') && !map[y][x].includes('sky')) {
        map[y][x] = determineFloorType(
          map,
          wallMap,
          borderMap,
          x,
          y,
          width,
          height,
          map[y][x]
        );
      }
    }
  }
};
