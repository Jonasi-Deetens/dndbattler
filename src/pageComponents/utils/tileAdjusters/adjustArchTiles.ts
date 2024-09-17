const determineArchType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-').slice(0, 2).join('-');

  console.log(tileName);
  const hasTileAbove = y > 0 && map[y - 1][x].includes(tileName);
  const hasTileBelow = y < height - 1 && map[y + 1][x].includes(tileName);
  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);
  const hasTileTwoAbove =
    (y > 1 && map[y - 2][x].includes(tileName)) ||
    (y > 1 && map[y - 2][x].includes(tileName));

  // Determine specific floor type based on adjacency
  if (!hasTileTwoAbove && hasTileAbove && hasTileBelow && !hasTileLeft) {
    return tileName + '-left';
  }
  if (!hasTileTwoAbove && hasTileAbove && hasTileBelow && hasTileLeft) {
    return tileName + '-right';
  }
  if (!hasTileAbove && !hasTileLeft) {
    return tileName + '-corner-top-left';
  }
  if (!hasTileAbove && hasTileLeft) {
    return tileName + '-corner-top-right';
  }
  if (hasTileRight) {
    return tileName + '-corner-bottom-left';
  }
  if (hasTileLeft) {
    return tileName + '-corner-bottom-right';
  }

  // Default fallback
  return tileName + '-left';
};

export const adjustArchTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('arch')) {
        map[y][x] = determineArchType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
