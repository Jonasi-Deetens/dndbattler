const determineWallType = (
  map: string[][],
  roofMap: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 2).join('-');

  const hasWallAbove = y > 0 && map[y - 1][x].includes('wall');
  const hasWallBelow = y < height - 1 && map[y + 1][x].includes('wall');
  const hasWallLeft = x > 0 && map[y][x - 1].includes('wall');
  const hasWallRight = x < width - 1 && map[y][x + 1].includes('wall');

  const hasBorderAbove = y > 0 && roofMap[y - 1][x].includes('border');

  if (
    !hasWallRight &&
    hasWallLeft &&
    hasWallBelow &&
    hasBorderAbove &&
    !hasWallAbove
  )
    return tileName + '-corner-top-right-outer';
  if (
    !hasWallLeft &&
    hasWallRight &&
    hasWallBelow &&
    hasBorderAbove &&
    !hasWallAbove
  )
    return tileName + '-corner-top-left-outer';
  if (
    hasWallLeft &&
    hasWallRight &&
    hasWallBelow &&
    hasBorderAbove &&
    !hasWallAbove
  )
    return tileName + '-top-outer';

  if (!hasWallLeft && !hasWallBelow && hasWallRight && hasWallAbove)
    return tileName + '-corner-bottom-left';
  if (!hasWallLeft && !hasWallAbove && hasWallRight && hasWallBelow)
    return tileName + '-corner-top-left';
  if (hasWallLeft && hasWallRight && !hasWallAbove && hasWallBelow)
    return tileName + '-top';
  if (hasWallLeft && hasWallRight && !hasWallBelow && hasWallAbove)
    return tileName + '-bottom';
  if (!hasWallRight && !hasWallBelow && hasWallLeft && hasWallAbove)
    return tileName + '-corner-bottom-right';
  if (!hasWallRight && !hasWallAbove && hasWallLeft && hasWallBelow)
    return tileName + '-corner-top-right';

  if (!hasWallLeft && !hasWallRight && !hasWallBelow && hasWallAbove)
    return tileName + '-bottom-end';
  if (!hasWallLeft && !hasWallRight && hasWallBelow && !hasWallAbove)
    return tileName + '-top-end-outer';

  if (!hasWallLeft && hasWallAbove && hasWallRight && hasWallBelow)
    return tileName + '-left';
  if (!hasWallLeft && !hasWallRight && hasWallAbove && hasWallBelow)
    return tileName + '-vertical';
  if (hasWallLeft && hasWallAbove && !hasWallRight && hasWallBelow)
    return tileName + '-right';

  return tileName;
};

// Function to adjust all tiles in the map
export const adjustWallTiles = (
  map: string[][],
  roofMap: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('wall')) {
        map[y][x] = determineWallType(
          map,
          roofMap,
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
