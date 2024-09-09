const determineWallType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-')[0] + '-' + baseName.split('-')[1];

  const isLeftEdge = x === 0;
  const isRightEdge = x === width - 1;
  const isHorizontalEdge = x === 0 || x === width - 1;
  const isVerticalEdge = y === 0 || y === height - 1;

  const hasRightCornerAbove =
    y > 0 && map[y - 1][x].includes('corner-top-right');
  const hasRightWallAbove = y > 0 && map[y - 1][x].includes('right');

  const hasLeftCornerAbove = y > 0 && map[y - 1][x].includes('corner-top-left');
  const hasLeftWallAbove = y > 0 && map[y - 1][x].includes('left');

  const hasEndAbove = y > 0 && map[y - 1][x].includes('top-end');
  const hasVerticalAbove = y > 0 && map[y - 1][x].includes('vertical');

  const hasBorderAbove = y > 0 && map[y - 1][x].startsWith('border');
  const hasBorderBelow = y < height - 1 && map[y + 1][x].startsWith('border');
  const hasBorderLeft = x > 0 && map[y][x - 1].startsWith('border');
  const hasBorderRight = x < width - 1 && map[y][x + 1].startsWith('border');

  const hasBorderTopLeft =
    x > 0 && y > 0 && map[y - 1][x - 1].startsWith('border');
  const hasBorderTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith('border');

  const hasWallAbove = y > 0 && map[y - 1][x].startsWith(tileName);
  const hasWallBelow = y < height - 1 && map[y + 1][x].startsWith(tileName);
  const hasWallLeft = x > 0 && map[y][x - 1].startsWith(tileName);
  const hasWallRight = x < width - 1 && map[y][x + 1].startsWith(tileName);

  // Diagonal checks
  const hasWallTopLeft =
    x > 0 && y > 0 && map[y - 1][x - 1].startsWith(tileName);
  const hasWallTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith(tileName);
  const hasWallBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].startsWith(tileName);
  const hasWallBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].startsWith(tileName);

  if (!hasWallAbove) {
    if (hasBorderAbove || isVerticalEdge) {
      if (
        (hasWallTopLeft && hasWallTopRight) ||
        (isHorizontalEdge &&
          !hasBorderTopLeft &&
          !hasBorderTopRight &&
          (!hasWallLeft || !hasWallRight) &&
          !isVerticalEdge)
      )
        return tileName + '-top-end-outer';

      if (hasBorderRight || hasBorderLeft) return tileName + '-top-outer';
      if (
        hasWallTopLeft ||
        ((isVerticalEdge || isHorizontalEdge) && !hasWallLeft) ||
        (!hasWallLeft && !hasBorderLeft)
      )
        return tileName + '-corner-top-left-outer';
      if (
        hasWallTopRight ||
        ((isVerticalEdge || isHorizontalEdge) && !hasWallRight) ||
        (!hasWallRight && !hasBorderRight)
      )
        return tileName + '-corner-top-right-outer';
      return tileName + '-top-outer';
    } else {
      if (hasWallLeft && hasWallRight) return tileName + '-top';
      if (
        (hasWallLeft && isHorizontalEdge) ||
        hasBorderRight ||
        (!hasWallAbove && !hasWallRight && !isHorizontalEdge) ||
        (isLeftEdge && !hasWallRight)
      )
        return tileName + '-corner-top-right';
      if (
        (hasWallRight && isHorizontalEdge) ||
        hasBorderLeft ||
        (!hasWallAbove && !hasWallLeft && !isHorizontalEdge) ||
        (isRightEdge && !hasWallLeft)
      )
        return tileName + '-corner-top-left';
    }
  }

  if (!hasWallBelow) {
    if (hasVerticalAbove || hasEndAbove) return tileName + '-bottom-end';
    if (
      hasWallLeft &&
      hasWallRight &&
      (!hasWallBottomRight || !hasWallBottomLeft)
    ) {
      return tileName + '-bottom';
    }
    if (hasBorderRight || hasBorderLeft) return tileName + '-bottom';
    if (hasWallLeft || hasWallBottomRight)
      return tileName + '-corner-bottom-right';
    if (hasWallRight || hasBorderLeft) return tileName + '-corner-bottom-left';
  }

  if (hasVerticalAbove || hasEndAbove) return tileName + '-vertical';

  if (
    (!hasWallLeft && !hasBorderLeft && hasWallRight) ||
    (!hasWallLeft && isRightEdge) ||
    ((hasLeftWallAbove || hasLeftCornerAbove) &&
      hasWallAbove &&
      (hasWallRight || hasBorderRight) &&
      hasWallBelow)
  ) {
    return tileName + '-left';
  } else if (
    (!hasWallRight && !hasBorderRight && hasWallLeft) ||
    (!hasWallRight && isLeftEdge) ||
    ((hasRightWallAbove || hasRightCornerAbove) &&
      hasWallAbove &&
      (hasWallLeft || hasBorderLeft) &&
      hasWallBelow)
  ) {
    return tileName + '-right';
  }
  return tileName + '';
};

export const adjustWallTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('wall')) {
        map[y][x] = determineWallType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
