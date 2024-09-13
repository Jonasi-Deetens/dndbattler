// Function to determine the correct type of wall or border based on surrounding tiles
const determineWallType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  // Extract the base type (e.g., 'wall-2')
  const tileName = baseName.split('-').slice(0, 2).join('-');

  // Adjacency checks for walls
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
  const hasWallBottomRight =
    (x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes('wall')) ||
    (x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes('border'));
  const hasWallBottomLeft =
    (x > 0 && y < height - 1 && map[y + 1][x - 1].includes('wall')) ||
    (x > 0 && y < height - 1 && map[y + 1][x - 1].includes('border'));
  const hasWallTopRight =
    (x < width - 1 && y > 0 && map[y - 1][x + 1].includes('wall')) ||
    (x < width - 1 && y > 0 && map[y - 1][x + 1].includes('border'));
  const hasWallTopLeft =
    (x > 0 && y > 0 && map[y - 1][x - 1].includes('wall')) ||
    (x > 0 && y > 0 && map[y - 1][x - 1].includes('border'));

  const hasWallTwoBelow =
    (y < height - 2 && map[y + 2][x].includes('wall')) ||
    (y < height - 2 && map[y + 2][x].includes('border'));

  const hasBottomEndBelow =
    y < height - 1 && map[y + 1][x].includes('top-end-outer');

  // Adjacency checks for borders
  const hasBorderAbove = y > 0 && map[y - 1][x].includes('border');
  const hasBorderBelow = y < height - 1 && map[y + 1][x].includes('border');
  const hasStairsBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes('stair');

  const hasStairsBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes('stairs');

  // Determine if the wall should be converted to a border based on surrounding tiles

  if (hasBottomEndBelow) {
    if (!hasWallAbove) return 'border-1-top-end';
    else return 'border-1-vertical-large';
  }
  if (!hasWallBelow) {
    if (hasWallRight && !hasWallLeft) return tileName + '-corner-bottom-left';
    if (!hasWallRight && hasWallLeft) return tileName + '-corner-bottom-right';
    if (!hasWallRight && !hasWallLeft) return tileName + '-bottom-end';

    return tileName + '-bottom';
  }

  if (
    !hasWallTwoBelow &&
    ((!hasWallBottomLeft &&
      !hasWallTopLeft &&
      !hasWallBottomRight &&
      !hasWallTopRight) ||
      hasStairsBottomLeft ||
      hasStairsBottomRight)
  )
    return tileName + '-top-end-outer';

  if (
    ((!hasWallLeft && !hasWallRight) || hasBorderAbove) &&
    hasWallBelow &&
    !hasWallTwoBelow &&
    hasWallTopLeft &&
    hasWallTopRight
  )
    return tileName + '-top-end-outer';
  if (!hasWallAbove || hasBorderAbove) {
    if (hasWallRight && !hasWallLeft && hasBorderBelow)
      if (hasBorderAbove) return 'border-1-vertical-large';
      else return 'border-1-top-end';
    if (!hasWallRight && hasWallLeft && hasBorderBelow)
      if (hasBorderAbove) return 'border-1-vertical-large';
      else return 'border-1-top-end';
    if (hasWallRight && !hasWallLeft) return tileName + '-corner-top-left';
    if (!hasWallRight && hasWallLeft) return tileName + '-corner-top-right';
    if (!hasWallRight && !hasWallLeft && !hasBorderAbove)
      return 'border-1-top-end';
    if (!hasWallRight && !hasWallLeft && hasBorderAbove) {
      if (hasWallBelow) return 'border-1-vertical-large';
    }
    if (!hasWallAbove && hasBorderBelow) return 'border-1-top-end';
    if (hasBorderAbove && hasBorderBelow) return 'border-1-vertical-large';
    return tileName + '-top';
  }

  if (hasWallAbove && hasWallBelow) {
    if (hasWallRight && !hasWallLeft && !hasBorderBelow)
      return tileName + '-left';
    if (!hasWallRight && hasWallLeft && !hasBorderBelow)
      return tileName + '-right';
    if (!hasWallBottomLeft && !hasWallBottomRight && !hasWallTwoBelow)
      return tileName + '-top-end-outer';
    if ((!hasWallRight && !hasWallLeft) || hasBorderBelow)
      return 'border-1-vertical-large';
    if (!hasWallBottomLeft && !hasWallBottomRight)
      return 'border-1-vertical-large';
  }

  return tileName;
};

// Function to adjust all tiles in the map
export const adjustWallTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('wall') && !map[y][x].includes('top-end-outer')) {
        map[y][x] = determineWallType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
