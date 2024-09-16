const determineBorderType = (
  map: string[][],
  wallMap: string[][],
  floorMap: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 2).join('-');

  const isRightEdge = x === width - 1;
  const isLeftEdge = x === 0;
  const isTopEdge = y === 0;
  const isBottomEdge = y === height - 1;

  const hasTileAbove = y > 0 && map[y - 1][x].includes(tileName);
  const hasTileTwoAbove = y > 1 && map[y - 2][x].includes(tileName);
  const hasTileBelow = y < height - 1 && map[y + 1][x].includes(tileName);
  const hasTileTwoBelow = y < height - 2 && map[y + 2][x].includes(tileName);
  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);

  const hasLargeTileAbove = y > 0 && map[y - 1][x].includes('large');
  const hasLargeTileLeft = x > 0 && map[y][x - 1].includes('large');
  const hasLargeTileRight = x < width - 1 && map[y][x + 1].includes('large');

  const hasTileBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes(tileName);
  const hasTileBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes(tileName);
  const hasTileTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes(tileName);
  const hasTileTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes(tileName);

  const hasWallBelow = y < height - 1 && wallMap[y + 1][x].includes('wall');
  const hasWallLeft = x > 0 && wallMap[y][x - 1].includes('wall');
  const hasWallRight = x < width - 1 && wallMap[y][x + 1].includes('wall');

  const hasSkyAbove = y > 0 && floorMap[y - 1][x].includes('sky');
  const hasSkyBelow = y < height - 1 && floorMap[y + 1][x].includes('sky');
  const hasSkyLeft = x > 0 && floorMap[y][x - 1].includes('sky');
  const hasSkyRight = x < width - 1 && floorMap[y][x + 1].includes('sky');

  const hasFloorAbove =
    (y > 0 && floorMap[y - 1][x].includes('floor')) ||
    (y > 0 && floorMap[y - 1][x].includes('stair'));
  const hasFloorLeft =
    (x > 0 && floorMap[y][x - 1].includes('floor')) ||
    (x > 0 && floorMap[y][x - 1].includes('stair'));
  const hasFloorRight =
    (x < width - 1 && floorMap[y][x + 1].includes('floor')) ||
    (x < width - 1 && floorMap[y][x + 1].includes('stair'));

  const hasFloorTopRight =
    (x < width - 1 && y > 0 && floorMap[y - 1][x + 1].includes('floor')) ||
    (x < width - 1 && y > 0 && floorMap[y - 1][x + 1].includes('stair'));

  const hasFloorTopLeft =
    (x > 0 && y > 0 && floorMap[y - 1][x - 1].includes('floor')) ||
    (x > 0 && y > 0 && floorMap[y - 1][x - 1].includes('stair'));

  // if (hasLargeTileLeft && hasLargeTileRight) {
  //   // if (!hasTileAbove) return tileName + '-top-large';
  //   return tileName;
  // }

  if (hasTileAbove && hasTileBelow && hasTileRight && hasTileLeft)
    return tileName;
  if (
    hasTileAbove &&
    hasTileRight &&
    (hasSkyBelow || isBottomEdge) &&
    (hasSkyLeft || isLeftEdge) &&
    hasFloorTopRight
  )
    if (!hasLargeTileAbove) return tileName + '-corner-bottom-left-outer';
  if (
    hasTileAbove &&
    (hasSkyRight || isRightEdge) &&
    (hasSkyBelow || isBottomEdge) &&
    hasTileLeft &&
    hasFloorTopLeft
  )
    if (!hasLargeTileAbove) return tileName + '-corner-bottom-right-outer';
  if (
    (hasSkyAbove || isTopEdge) &&
    (hasSkyRight || isRightEdge) &&
    hasTileBelow &&
    hasTileLeft &&
    !hasTileRight &&
    !hasTileAbove
  ) {
    if (hasTileBottomRight && hasTileTwoBelow)
      return tileName + '-corner-top-right-large';
    return tileName + '-corner-top-right-outer';
  }
  if (
    (hasSkyAbove || isTopEdge) &&
    hasTileRight &&
    !hasTileLeft &&
    hasTileBelow &&
    (hasSkyLeft || isLeftEdge) &&
    !hasTileAbove
  ) {
    if (hasTileBottomLeft && hasTileTwoBelow)
      return tileName + '-corner-top-left-large';
    return tileName + '-corner-top-left-outer';
  }
  if (
    !hasTileAbove &&
    !hasTileRight &&
    hasTileBelow &&
    (hasTileLeft || hasSkyLeft)
  ) {
    if (hasFloorRight && !hasTileLeft)
      return tileName + '-corner-top-right-large';
    return tileName + '-corner-top-right';
  }
  if (
    !hasTileAbove &&
    (hasTileRight || hasSkyRight) &&
    hasTileBelow &&
    !hasTileLeft
  ) {
    if (hasFloorLeft && !hasTileRight)
      return tileName + '-corner-top-left-large';
    return tileName + '-corner-top-left';
  }
  if (hasTileAbove && !hasTileRight && !hasTileBelow && hasTileLeft)
    return tileName + '-corner-bottom-right';
  if (hasTileAbove && hasTileRight && !hasTileBelow && !hasTileLeft)
    return tileName + '-corner-bottom-left';
  if (hasTileLeft && hasTileRight && hasTileBelow) {
    if (hasLargeTileLeft && hasLargeTileRight) return tileName + '-top-large';
    if (hasLargeTileLeft) return tileName + '-link-top-left-large';
    if (hasLargeTileRight) return tileName + '-link-top-right-large';
    return tileName + '-link-top-large';
  }
  if (
    (hasWallBelow ||
      hasFloorAbove ||
      hasSkyAbove ||
      hasTileTopLeft ||
      hasTileTopRight) &&
    hasTileLeft &&
    hasTileRight
  ) {
    return tileName + '-bottom-outer';
  }
  if (
    (hasFloorRight && hasFloorLeft) ||
    (hasWallLeft && hasWallRight) ||
    (hasWallLeft && hasFloorRight) ||
    (hasFloorLeft && hasWallRight)
  ) {
    if (hasFloorAbove && hasWallLeft && !hasWallRight)
      return tileName + '-corner-top-right-large';
    if (hasFloorAbove && !hasWallLeft && hasWallRight)
      return tileName + '-corner-top-left-large';
    if (hasFloorAbove && hasWallLeft && hasWallRight)
      return tileName + '-link-top-large';
    if (hasWallLeft && hasWallRight && hasWallBelow)
      return tileName + '-link-bottom-large';
    if (hasFloorAbove) return tileName + '-top-end';
    return tileName + '-vertical-large';
  }
  if (hasFloorLeft || hasWallLeft) {
    if (hasLargeTileAbove && hasTileTopRight && hasTileRight)
      return tileName + '-left-large';
    if (hasLargeTileAbove && hasTileRight && hasTileBelow)
      return tileName + '-link-left-large';
    if (hasWallBelow && !hasTileLeft && hasTileRight)
      return tileName + '-corner-top-left';
    if (hasWallLeft && hasTileTopLeft && (hasTileTwoAbove || !hasTileAbove))
      return tileName + '-corner-top-right-outer';

    return tileName + '-right-outer';
  }
  if (hasFloorRight || hasWallRight) {
    if (hasLargeTileAbove && hasTileTopLeft && hasTileLeft)
      return tileName + '-right-large';
    if (hasLargeTileAbove && hasTileLeft && hasTileBelow)
      return tileName + '-link-right-large';
    if (hasWallBelow && !hasTileRight && hasTileLeft)
      return tileName + '-corner-top-right';
    if (hasWallRight && hasTileTopRight && (hasTileTwoAbove || !hasTileAbove))
      return tileName + '-corner-top-left-outer';
    return tileName + '-left-outer';
  }

  return tileName;
};

export const adjustBorderTiles = (
  map: string[][],
  wallMap: string[][],
  floorMap: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('border')) {
        map[y][x] = determineBorderType(
          map,
          wallMap,
          floorMap,
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
