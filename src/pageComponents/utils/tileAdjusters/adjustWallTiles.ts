const determineWallType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const hasWallAbove = y > 0 && map[y - 1][x].startsWith('wall');
  const hasWallBelow = y < height - 1 && map[y + 1][x].startsWith('wall');
  const hasWallLeft = x > 0 && map[y][x - 1].startsWith('wall');
  const hasWallRight = x < width - 1 && map[y][x + 1].startsWith('wall');

  // Diagonal checks
  const hasWallTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].startsWith('wall');
  const hasWallTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith('wall');
  const hasWallBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].startsWith('wall');
  const hasWallBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].startsWith('wall');

  // Determine specific wall type based on adjacency
  if (!hasWallAbove && !hasWallBelow && !hasWallLeft && !hasWallRight)
    return 'wall-all';
  if (!hasWallAbove && hasWallBelow && !hasWallLeft && !hasWallRight)
    return 'wall-top-end';
  if (!hasWallAbove && !hasWallBelow && !hasWallLeft && hasWallRight)
    return 'wall-left-end';
  if (!hasWallAbove && !hasWallBelow && hasWallLeft && !hasWallRight)
    return 'wall-right-end';
  if (hasWallAbove && !hasWallBelow && !hasWallLeft && !hasWallRight)
    return 'wall-bottom-end';

  // Specific corner links and complex patterns
  if (hasWallAbove && hasWallBelow && hasWallLeft && hasWallRight) {
    if (
      !hasWallTopLeft &&
      !hasWallTopRight &&
      !hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-links-all';
    } else if (
      hasWallTopLeft &&
      hasWallTopRight &&
      !hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-links-bottom';
    } else if (
      !hasWallTopLeft &&
      hasWallTopRight &&
      hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-links-diagonal-down';
    } else if (
      hasWallTopLeft &&
      !hasWallTopRight &&
      !hasWallBottomLeft &&
      hasWallBottomRight
    ) {
      return 'wall-links-diagonal-up';
    } else if (
      !hasWallTopLeft &&
      hasWallTopRight &&
      !hasWallBottomLeft &&
      hasWallBottomRight
    ) {
      return 'wall-links-left';
    } else if (
      hasWallTopLeft &&
      !hasWallTopRight &&
      hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-links-right';
    } else if (
      !hasWallTopLeft &&
      !hasWallTopRight &&
      hasWallBottomLeft &&
      hasWallBottomRight
    ) {
      return 'wall-links-top';
    } else if (
      !hasWallTopLeft &&
      hasWallTopRight &&
      !hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-link-corner-bottom-left';
    } else if (
      hasWallTopLeft &&
      !hasWallTopRight &&
      !hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-link-corner-bottom-right';
    } else if (
      !hasWallTopLeft &&
      !hasWallTopRight &&
      !hasWallBottomLeft &&
      hasWallBottomRight
    ) {
      return 'wall-link-corner-top-left';
    } else if (
      !hasWallTopLeft &&
      !hasWallTopRight &&
      hasWallBottomLeft &&
      !hasWallBottomRight
    ) {
      return 'wall-link-corner-top-right';
    } else if (!hasWallTopLeft) {
      return 'wall-link-top-left';
    } else if (!hasWallTopRight) {
      return 'wall-link-top-right';
    } else if (!hasWallBottomLeft) {
      return 'wall-link-bottom-left';
    } else if (!hasWallBottomRight) {
      return 'wall-link-bottom-right';
    }
  }

  // Specific cases for sides with links
  if (hasWallAbove && !hasWallBelow && hasWallLeft && hasWallRight) {
    if (!hasWallTopLeft && hasWallTopRight) {
      return 'wall-bottom-link-left';
    } else if (hasWallTopLeft && !hasWallTopRight) {
      return 'wall-bottom-link-right';
    } else if (!hasWallTopLeft && !hasWallTopRight) {
      return 'wall-bottom-links';
    }
  }
  if (hasWallAbove && hasWallBelow && !hasWallLeft && hasWallRight) {
    if (hasWallTopRight && !hasWallBottomRight) {
      return 'wall-left-link-bottom';
    } else if (!hasWallBottomRight && !hasWallTopRight) {
      return 'wall-left-links';
    } else if (hasWallBottomRight && !hasWallTopRight) {
      return 'wall-left-link-top';
    }
  }
  if (hasWallAbove && hasWallBelow && hasWallLeft && !hasWallRight) {
    if (hasWallTopLeft && !hasWallBottomLeft) {
      return 'wall-right-link-bottom';
    } else if (!hasWallTopLeft && !hasWallBottomLeft) {
      return 'wall-right-links';
    } else if (!hasWallTopLeft && hasWallBottomLeft) {
      return 'wall-right-link-top';
    }
  }
  if (!hasWallAbove && hasWallBelow && hasWallLeft && hasWallRight) {
    if (!hasWallBottomLeft && hasWallBottomRight) {
      return 'wall-top-link-left';
    } else if (hasWallBottomLeft && !hasWallBottomRight) {
      return 'wall-top-link-right';
    } else if (!hasWallBottomLeft && !hasWallBottomRight) {
      return 'wall-top-links';
    }
  }

  // Less specific checks for corners and edges
  if (!hasWallAbove && hasWallBelow && !hasWallLeft && hasWallRight) {
    if (!hasWallBottomRight) return 'wall-corner-link-top-left';
    return 'wall-corner-top-left';
  } else if (!hasWallAbove && hasWallBelow && hasWallLeft && !hasWallRight) {
    if (!hasWallBottomLeft) return 'wall-corner-link-top-right';
    return 'wall-corner-top-right';
  } else if (hasWallAbove && !hasWallBelow && !hasWallLeft && hasWallRight) {
    if (!hasWallTopRight) return 'wall-corner-link-bottom-left';
    return 'wall-corner-bottom-left';
  } else if (hasWallAbove && !hasWallBelow && hasWallLeft && !hasWallRight) {
    if (!hasWallTopLeft) return 'wall-corner-link-bottom-right';
    return 'wall-corner-bottom-right';
  } else if (!hasWallAbove && !hasWallBelow && hasWallLeft && hasWallRight) {
    return 'wall-horizontal';
  } else if (hasWallAbove && hasWallBelow && !hasWallLeft && !hasWallRight) {
    return 'wall-vertical';
  }

  if (!hasWallAbove && hasWallBelow && hasWallLeft && hasWallRight) {
    return 'wall-top';
  } else if (hasWallAbove && !hasWallBelow && hasWallLeft && hasWallRight) {
    return 'wall-bottom';
  } else if (hasWallAbove && hasWallBelow && !hasWallLeft && hasWallRight) {
    return 'wall-left';
  } else if (hasWallAbove && hasWallBelow && hasWallLeft && !hasWallRight) {
    return 'wall-right';
  }

  return 'wall';
};

export const adjustWallTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('wall')) {
        map[y][x] = determineWallType(map, x, y, width, height);
      }
    }
  }
};
