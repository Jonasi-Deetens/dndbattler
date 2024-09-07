const determineWaterType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const hasWaterAbove = y > 0 && map[y - 1][x].startsWith('water');
  const hasWaterBelow = y < height - 1 && map[y + 1][x].startsWith('water');
  const hasWaterLeft = x > 0 && map[y][x - 1].startsWith('water');
  const hasWaterRight = x < width - 1 && map[y][x + 1].startsWith('water');

  // Diagonal checks
  const hasWaterTopLeft =
    x > 0 && y > 0 && map[y - 1][x - 1].startsWith('water');
  const hasWaterTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith('water');
  const hasWaterBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].startsWith('water');
  const hasWaterBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].startsWith('water');

  if (!hasWaterAbove && !hasWaterBelow && !hasWaterLeft && !hasWaterRight)
    return 'water-all';
  if (!hasWaterAbove && hasWaterBelow && !hasWaterLeft && !hasWaterRight)
    return 'water-top-end';
  if (!hasWaterAbove && !hasWaterBelow && !hasWaterLeft && hasWaterRight)
    return 'water-left-end';
  if (!hasWaterAbove && !hasWaterBelow && hasWaterLeft && !hasWaterRight)
    return 'water-right-end';
  if (hasWaterAbove && !hasWaterBelow && !hasWaterLeft && !hasWaterRight)
    return 'water-bottom-end';
  // Specific corner links and complex patterns
  if (hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
    if (
      !hasWaterTopLeft &&
      !hasWaterTopRight &&
      !hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-links-all';
    } else if (
      hasWaterTopLeft &&
      hasWaterTopRight &&
      !hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-links-bottom';
    } else if (
      !hasWaterTopLeft &&
      hasWaterTopRight &&
      hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-links-diagonal-down';
    } else if (
      hasWaterTopLeft &&
      !hasWaterTopRight &&
      !hasWaterBottomLeft &&
      hasWaterBottomRight
    ) {
      return 'water-links-diagonal-up';
    } else if (
      !hasWaterTopLeft &&
      hasWaterTopRight &&
      !hasWaterBottomLeft &&
      hasWaterBottomRight
    ) {
      return 'water-links-left';
    } else if (
      hasWaterTopLeft &&
      !hasWaterTopRight &&
      hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-links-right';
    } else if (
      !hasWaterTopLeft &&
      !hasWaterTopRight &&
      hasWaterBottomLeft &&
      hasWaterBottomRight
    ) {
      return 'water-links-top';
    } else if (
      !hasWaterTopLeft &&
      hasWaterTopRight &&
      !hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-link-corner-bottom-left';
    } else if (
      hasWaterTopLeft &&
      !hasWaterTopRight &&
      !hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-link-corner-bottom-right';
    } else if (
      !hasWaterTopLeft &&
      !hasWaterTopRight &&
      !hasWaterBottomLeft &&
      hasWaterBottomRight
    ) {
      return 'water-link-corner-top-left';
    } else if (
      !hasWaterTopLeft &&
      !hasWaterTopRight &&
      hasWaterBottomLeft &&
      !hasWaterBottomRight
    ) {
      return 'water-link-corner-top-right';
    } else if (!hasWaterTopLeft) {
      return 'water-link-top-left';
    } else if (!hasWaterTopRight) {
      return 'water-link-top-right';
    } else if (!hasWaterBottomLeft) {
      return 'water-link-bottom-left';
    } else if (!hasWaterBottomRight) {
      return 'water-link-bottom-right';
    }
  }

  // Specific cases for sides with links
  if (hasWaterAbove && !hasWaterBelow && hasWaterLeft && hasWaterRight) {
    if (!hasWaterTopLeft && hasWaterTopRight) {
      return 'water-bottom-link-left';
    } else if (hasWaterTopLeft && !hasWaterTopRight) {
      return 'water-bottom-link-right';
    } else if (!hasWaterTopLeft && !hasWaterTopRight) {
      return 'water-bottom-links';
    }
  }
  if (hasWaterAbove && hasWaterBelow && !hasWaterLeft && hasWaterRight) {
    if (hasWaterTopRight && !hasWaterBottomRight) {
      return 'water-left-link-bottom';
    } else if (!hasWaterBottomRight && !hasWaterTopRight) {
      return 'water-left-links';
    } else if (hasWaterBottomRight && !hasWaterTopRight) {
      return 'water-left-link-top';
    }
  }
  if (hasWaterAbove && hasWaterBelow && hasWaterLeft && !hasWaterRight) {
    if (hasWaterTopLeft && !hasWaterBottomLeft) {
      return 'water-right-link-bottom';
    } else if (!hasWaterTopLeft && !hasWaterBottomLeft) {
      return 'water-right-links';
    } else if (!hasWaterTopLeft && hasWaterBottomLeft) {
      return 'water-right-link-top';
    }
  }
  if (!hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
    if (!hasWaterBottomLeft && hasWaterBottomRight) {
      return 'water-top-link-left';
    } else if (hasWaterBottomLeft && !hasWaterBottomRight) {
      return 'water-top-link-right';
    } else if (!hasWaterBottomLeft && !hasWaterBottomRight) {
      return 'water-top-links';
    }
  }

  // Less specific checks for corners and edges
  if (!hasWaterAbove && hasWaterBelow && !hasWaterLeft && hasWaterRight) {
    if (!hasWaterBottomRight) return 'water-corner-link-top-left';
    return 'water-corner-top-left';
  } else if (
    !hasWaterAbove &&
    hasWaterBelow &&
    hasWaterLeft &&
    !hasWaterRight
  ) {
    if (!hasWaterBottomLeft) return 'water-corner-link-top-right';
    return 'water-corner-top-right';
  } else if (
    hasWaterAbove &&
    !hasWaterBelow &&
    !hasWaterLeft &&
    hasWaterRight
  ) {
    if (!hasWaterTopRight) return 'water-corner-link-bottom-left';
    return 'water-corner-bottom-left';
  } else if (
    hasWaterAbove &&
    !hasWaterBelow &&
    hasWaterLeft &&
    !hasWaterRight
  ) {
    if (!hasWaterTopLeft) return 'water-corner-link-bottom-right';
    return 'water-corner-bottom-right';
  } else if (
    !hasWaterAbove &&
    !hasWaterBelow &&
    hasWaterLeft &&
    hasWaterRight
  ) {
    return 'water-horizontal';
  } else if (
    hasWaterAbove &&
    hasWaterBelow &&
    !hasWaterLeft &&
    !hasWaterRight
  ) {
    return 'water-vertical';
  }

  // Edge cases
  if (!hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
    return 'water-top';
  } else if (hasWaterAbove && !hasWaterBelow && hasWaterLeft && hasWaterRight) {
    return 'water-bottom';
  } else if (hasWaterAbove && hasWaterBelow && !hasWaterLeft && hasWaterRight) {
    return 'water-left';
  } else if (hasWaterAbove && hasWaterBelow && hasWaterLeft && !hasWaterRight) {
    return 'water-right';
  }

  // Default to generic water if no specific case matches
  return 'water';
};

export const adjustWaterTiles = (
  map: string[][],
  width: number,
  height: number
): void => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('water')) {
        map[y][x] = determineWaterType(map, x, y, width, height);
      }
    }
  }
};
