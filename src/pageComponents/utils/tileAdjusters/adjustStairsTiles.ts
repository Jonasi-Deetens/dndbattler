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

  const hasWallAbove =
    (y > 0 && map[y - 1][x].includes('wall')) ||
    (y > 0 && map[y - 1][x].includes('border'));
  const hasWallBelow =
    (y < height - 1 && map[y + 1][x].includes('wall')) ||
    (y < height - 1 && map[y + 1][x].includes('border'));
  const hasWallLeft =
    (x > 0 && map[y][x - 1].includes('wall')) ||
    (x > 0 && map[y][x - 1].includes('border'));
  const hasWallRight =
    (x < width - 1 && map[y][x + 1].includes('wall')) ||
    (x < width - 1 && map[y][x + 1].includes('border'));

  if (isHorizontalEdge && hasTileRight && hasWallAbove)
    return tileName + '-stairs-top-left';
  if (isHorizontalEdge && hasTileLeft && hasWallAbove)
    return tileName + '-stairs-top';
  if (isHorizontalEdge && hasTileRight && hasWallBelow)
    return tileName + '-stairs-bottom-left';
  if (isHorizontalEdge && hasTileLeft && hasWallBelow)
    return tileName + '-stairs-bottom';

  if (isHorizontalEdge && !hasTileAbove && hasFloorRight)
    return tileName + '-stairs-left-top';
  if (isHorizontalEdge && hasTileAbove && hasFloorRight)
    return tileName + '-stairs-left-bottom';
  if (isHorizontalEdge && !hasTileAbove && hasFloorLeft)
    return tileName + '-stairs-right-top';
  if (isHorizontalEdge && hasTileAbove && hasFloorLeft)
    return tileName + '-stairs-right-bottom';

  if (isVerticalEdge && hasTileAbove && hasWallLeft)
    return tileName + '-stairs-left-bottom';
  if (isVerticalEdge && hasTileBelow && hasWallLeft)
    return tileName + '-stairs-left-top';
  if (isVerticalEdge && hasTileAbove && hasWallRight)
    return tileName + '-stairs-right-bottom';
  if (isVerticalEdge && hasTileBelow && hasWallRight)
    return tileName + '-stairs-right-top';

  if (isVerticalEdge && hasTileLeft && hasFloorAbove)
    return tileName + '-stairs-bottom';
  if (isVerticalEdge && !hasTileLeft && hasFloorAbove)
    return tileName + '-stairs-bottom-left';
  if (isVerticalEdge && hasTileLeft && hasFloorBelow)
    return tileName + '-stairs-top';
  if (isVerticalEdge && !hasTileLeft && hasFloorBelow)
    return tileName + '-stairs-top-left';

  if (hasTileAbove && hasWallLeft) return tileName + '-stairs-left-bottom';
  if (hasWallAbove && hasWallLeft && !hasTileRight)
    return tileName + '-stairs-left-top';
  if (hasTileAbove && hasWallRight) return tileName + '-stairs-right-bottom';
  if (hasWallAbove && hasWallRight && !hasTileLeft)
    return tileName + '-stairs-right-top';

  if (hasTileLeft && hasWallAbove) return tileName + '-stairs-top';
  if (hasWallLeft && hasWallAbove) return tileName + '-stairs-top-left';
  if (hasTileLeft && hasWallBelow) return tileName + '-stairs-bottom';
  if (hasWallLeft && hasWallBelow) return tileName + '-stairs-bottom-left';

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
