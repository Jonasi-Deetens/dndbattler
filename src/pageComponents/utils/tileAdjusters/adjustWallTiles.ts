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

  const hasBorder = roofMap[y][x].includes('border');
  const hasWallAbove = y > 0 && map[y - 1][x].includes('wall');
  const hasWallBelow = y < height - 1 && map[y + 1][x].includes('wall');
  const hasWallLeft = x > 0 && map[y][x - 1].includes('wall');
  const hasWallRight = x < width - 1 && map[y][x + 1].includes('wall');

  const hasRightWallAbove = y > 0 && map[y - 1][x].includes('-right');
  const hasLeftWallAbove = y > 0 && map[y - 1][x].includes('-left');

  const hasWallTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes('wall');
  const hasWallTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes('wall');

  const hasBorderAbove = y > 0 && roofMap[y - 1][x].includes('border');
  const hasBorderLeft = x > 0 && roofMap[y][x - 1].includes('border');
  const hasBorderRight = x < width - 1 && roofMap[y][x + 1].includes('border');

  const hasLargeBorderAbove = y > 0 && roofMap[y - 1][x].includes('large');
  const hasCornerBorderAbove = y > 0 && roofMap[y - 1][x].includes('corner');

  const hasBorderTopLeft =
    x > 0 && y > 0 && roofMap[y - 1][x - 1].includes('border');
  const hasBorderTopRight =
    x < width - 1 && y > 0 && roofMap[y - 1][x + 1].includes('border');

  const hasTopOuterAbove = y > 0 && map[y - 1][x].includes('-top-end-outer');

  if (
    (!hasWallLeft &&
      !hasWallRight &&
      hasWallBelow &&
      !hasWallAbove &&
      hasBorderAbove &&
      !hasBorderLeft &&
      !hasBorderRight) ||
    (hasLargeBorderAbove &&
      (!hasWallLeft || !hasWallRight) &&
      hasCornerBorderAbove)
  )
    return tileName + '-top-end-outer';

  if (!hasWallAbove && hasWallBelow) {
    if (
      (!hasBorderLeft && !hasWallLeft) ||
      (hasBorderAbove &&
        !hasBorderTopRight &&
        (hasBorderTopLeft || hasWallTopLeft) &&
        !hasBorderLeft &&
        hasBorder)
    )
      return tileName + '-corner-top-left';
    if (
      (!hasBorderRight && !hasWallRight) ||
      (hasBorderAbove &&
        (hasBorderTopRight || hasWallTopRight) &&
        !hasBorderTopLeft &&
        !hasBorderRight &&
        hasBorder)
    )
      return tileName + '-corner-top-right';
    if (hasLargeBorderAbove) return tileName + '-top-end-outer';
    return tileName + '-top';
  }

  if (
    !hasWallLeft &&
    !hasWallRight &&
    !hasWallBelow &&
    hasWallAbove &&
    !hasBorderLeft &&
    !hasBorderRight
  )
    return tileName + '-bottom-end';

  if (!hasWallBelow && hasWallAbove) {
    if (!hasWallLeft && !hasBorderLeft) return tileName + '-corner-bottom-left';
    if (!hasWallRight && !hasBorderRight)
      return tileName + '-corner-bottom-right';
    return tileName + '-bottom';
  }

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
    (!hasWallLeft &&
      !hasBorderLeft &&
      hasWallAbove &&
      (hasWallRight || hasBorderRight) &&
      hasWallBelow &&
      !hasTopOuterAbove) ||
    (hasLeftWallAbove && hasWallBelow && !hasTopOuterAbove)
  )
    return tileName + '-left';

  if (
    ((hasWallLeft || hasBorderLeft) &&
      hasWallAbove &&
      !hasWallRight &&
      !hasBorderRight &&
      hasWallBelow &&
      !hasTopOuterAbove) ||
    (hasRightWallAbove && hasWallBelow && !hasTopOuterAbove)
  )
    return tileName + '-right';

  if (
    hasWallLeft &&
    hasWallRight &&
    hasWallBelow &&
    hasBorderAbove &&
    !hasWallAbove
  )
    return tileName + '-top-outer';

  if (
    (!hasWallLeft && !hasWallRight && hasWallAbove && hasWallBelow) ||
    hasTopOuterAbove
  )
    return tileName + '-vertical';

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
