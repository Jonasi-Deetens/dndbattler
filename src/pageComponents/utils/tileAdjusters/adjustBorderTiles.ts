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
  const tileName = baseName.split('-').slice(0, 3).join('-');

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
  const hasLargeTileBelow = y < height - 1 && map[y + 1][x].includes('large');

  const hasTileBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes(tileName);
  const hasTileBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes(tileName);
  const hasTileTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes(tileName);
  const hasTileTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes(tileName);

  const hasWall = wallMap[y][x].includes('wall');
  const hasWallBelow = y < height - 1 && wallMap[y + 1][x].includes('wall');
  const hasWallLeft = x > 0 && wallMap[y][x - 1].includes('wall');
  const hasWallRight = x < width - 1 && wallMap[y][x + 1].includes('wall');

  const hasWallTopRight =
    x < width - 1 && y > 0 && wallMap[y - 1][x + 1].includes('wall');
  const hasWallTopLeft =
    x > 0 && y > 0 && wallMap[y - 1][x - 1].includes('wall');
  const hasWallBottomLeft =
    x > 0 && y < height - 1 && wallMap[y + 1][x - 1].includes('wall');
  const hasWallBottomRight =
    x < width - 1 && y < height - 1 && wallMap[y + 1][x + 1].includes('wall');

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

  if (
    hasTileAbove &&
    (hasTileBelow || hasWallBelow) &&
    hasLargeTileRight &&
    hasLargeTileLeft
  )
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
    if ((hasFloorRight && !hasTileLeft) || hasLargeTileBelow)
      return tileName + '-corner-top-right-large';
    return tileName + '-corner-top-right';
  }
  if (
    !hasTileAbove &&
    (hasTileRight || hasSkyRight) &&
    hasTileBelow &&
    !hasTileLeft
  ) {
    if ((hasFloorLeft && !hasTileRight) || hasLargeTileBelow)
      return tileName + '-corner-top-left-large';
    return tileName + '-corner-top-left';
  }
  if (
    hasTileAbove &&
    !hasTileRight &&
    !hasTileBelow &&
    hasTileLeft &&
    !hasLargeTileAbove
  )
    return tileName + '-corner-bottom-right';
  if (
    hasTileAbove &&
    hasTileRight &&
    !hasTileBelow &&
    !hasTileLeft &&
    !hasLargeTileAbove
  )
    return tileName + '-corner-bottom-left';
  if (hasTileLeft && hasTileRight && (hasTileBelow || !hasWall)) {
    if (hasLargeTileLeft && hasLargeTileRight && hasTileBelow)
      return tileName + '-top-large';
    if (hasLargeTileLeft && hasTileBelow)
      return tileName + '-link-top-left-large';
    if (hasLargeTileRight && hasTileBelow)
      return tileName + '-link-top-right-large';
    if (hasTileBelow) return tileName + '-link-top-large';
  }
  if (
    (hasWallBelow ||
      hasFloorAbove ||
      hasSkyAbove ||
      hasTileTopLeft ||
      hasTileTopRight) &&
    hasTileLeft &&
    hasTileRight &&
    (!hasLargeTileAbove ||
      (hasLargeTileAbove && (hasTileTopLeft || hasTileTopRight)))
  ) {
    if (hasWallBelow && !hasWall) return tileName + '-link-top-large';
    return tileName + '-bottom-outer';
  }
  if (
    (hasFloorRight && hasFloorLeft) ||
    (hasWallLeft && hasWallRight) ||
    (hasWallLeft && hasFloorRight) ||
    (hasFloorLeft && hasWallRight)
  ) {
    if (
      (hasFloorAbove || hasTileAbove) &&
      hasWallLeft &&
      !hasWallRight &&
      !hasWallTopLeft
    )
      return tileName + '-corner-top-right-large';
    if (
      (hasFloorAbove || hasTileAbove) &&
      !hasWallLeft &&
      hasWallRight &&
      !hasWallTopRight
    )
      return tileName + '-corner-top-left-large';
    if (
      hasFloorTopLeft &&
      hasFloorTopRight &&
      hasWallBottomLeft &&
      hasWallBottomRight &&
      !(hasTileAbove && hasTileBelow)
    )
      return tileName + '-link-top-large';
    if (!hasLargeTileLeft && !hasLargeTileRight && hasTileAbove)
      return tileName + '-vertical-large';
    if (hasFloorAbove && hasWallLeft && hasWallRight && hasTileBelow)
      return tileName + '-link-top-large';
    if (!hasWallLeft && !hasWallRight && hasWallBelow && !hasTileBelow)
      return tileName + '-link-bottom-large';
    if (hasFloorAbove) return tileName + '-top-end';
  }

  if (hasFloorLeft || hasWallLeft) {
    if (hasLargeTileAbove && hasTileTopRight && hasTileRight && !hasWall)
      return tileName + '-left-large';
    if (hasLargeTileAbove && hasTileRight && hasTileBelow)
      return tileName + '-link-left-large';
    if (hasWallBelow && !hasTileLeft && hasTileRight)
      return tileName + '-corner-top-left';
    if (
      hasWallLeft &&
      hasTileTopLeft &&
      (hasTileTwoAbove || !hasTileAbove) &&
      !hasLargeTileLeft
    )
      return tileName + '-corner-top-right-outer';

    if (!hasLargeTileLeft) return tileName + '-right-outer';
  }
  if (hasFloorRight || hasWallRight) {
    if (hasLargeTileAbove && hasTileTopLeft && hasTileLeft && !hasWall)
      return tileName + '-right-large';
    if (hasLargeTileAbove && hasTileLeft && hasTileBelow)
      return tileName + '-link-right-large';
    if (hasWallBelow && !hasTileRight && hasTileLeft)
      return tileName + '-corner-top-right';
    if (hasWallRight && hasTileTopRight && (hasTileTwoAbove || !hasTileAbove))
      return tileName + '-corner-top-left-outer';
    return tileName + '-left-outer';
  }

  if (
    hasTileLeft &&
    hasTileRight &&
    hasTileAbove &&
    (!hasTileTopRight || !hasTileTopLeft)
  ) {
    if (!hasWallBelow) return tileName + '-link-bottom-large';
    return tileName + '-bottom-outer';
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
