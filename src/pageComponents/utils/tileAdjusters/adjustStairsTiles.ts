const determineStairsType = (
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

  const isHorizontalEdge = x === 0 || x === width - 1;
  const isVerticalEdge = y === 0 || y === height - 1;

  const hasTileAbove = y > 0 && map[y - 1][x].includes(tileName);
  const hasTileBelow = y < height - 1 && map[y + 1][x].includes(tileName);
  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);

  const hasWallAbove =
    y > 0 &&
    (wallMap[y - 1][x].includes('wall') ||
      borderMap[y - 1][x].includes('border'));
  const hasWallBelow =
    y < height - 1 &&
    (wallMap[y + 1][x].includes('wall') ||
      borderMap[y + 1][x].includes('border'));
  const hasWallLeft =
    x > 0 &&
    (wallMap[y][x - 1].includes('wall') ||
      borderMap[y][x - 1].includes('border'));
  const hasWallRight =
    x < width - 1 &&
    (wallMap[y][x + 1].includes('wall') ||
      borderMap[y][x + 1].includes('border'));

  if (
    !hasTileAbove &&
    !hasTileRight &&
    hasWallAbove &&
    !hasTileLeft &&
    hasWallLeft
  )
    return tileName + '-stairs-left-top';
  if (hasTileAbove && !hasTileRight && hasWallLeft)
    return tileName + '-stairs-left-bottom';
  if (!hasTileAbove && !hasTileLeft && hasWallAbove && !hasTileRight)
    return tileName + '-stairs-right-top';
  if (hasTileAbove && !hasTileLeft && hasWallRight)
    return tileName + '-stairs-right-bottom';

  if (hasTileLeft && !hasTileAbove && hasWallBelow)
    return tileName + '-stairs-bottom';
  if (!hasTileLeft && !hasTileAbove && hasWallBelow)
    return tileName + '-stairs-bottom-left';
  if (hasTileLeft && !hasTileBelow && hasWallAbove)
    return tileName + '-stairs-top';
  if (!hasTileLeft && !hasTileBelow && hasWallAbove)
    return tileName + '-stairs-top-left';

  return baseName;
};

export const adjustStairsTiles = (
  map: string[][],
  wallMap: string[][],
  borderMap: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('stairs')) {
        map[y][x] = determineStairsType(
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
