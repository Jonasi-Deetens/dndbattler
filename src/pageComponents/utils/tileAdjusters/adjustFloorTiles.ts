const determineFloorType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-')[0] + '-' + baseName.split('-')[1];

  const hasTileAbove = y > 0 && map[y - 1][x].includes(tileName);
  const hasTileBelow = y < height - 1 && map[y + 1][x].includes(tileName);
  const hasTileLeft = x > 0 && map[y][x - 1].includes(tileName);
  const hasTileRight = x < width - 1 && map[y][x + 1].includes(tileName);

  // Diagonal checks
  const hasTileTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes(tileName);
  const hasTileTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes(tileName);
  const hasTileBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes(tileName);
  const hasTileBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes(tileName);

  // Determine specific floor type based on adjacency
  if (hasTileAbove && !hasTileLeft) {
    return tileName + '-corner-bottom-left'; // Surrounded on top, bottom, right
  }
  if (!hasTileAbove && hasTileLeft) {
    return tileName + '-top'; // Surrounded on bottom, left, right
  }
  if (!hasTileAbove && !hasTileLeft) {
    return tileName + '-corner-top-left'; // No tile above or left, but bottom and right are present
  }
  if (hasTileAbove && hasTileLeft && !hasTileTopLeft) {
    return tileName + '-corner-top-right'; // No tile above or right, but bottom and left are present
  }
  if (hasTileAbove && !hasTileBelow && hasTileLeft && !hasTileRight) {
    return tileName + '-corner-bottom-right'; // No tile below or right, but top and left are present
  }

  // Default fallback
  return tileName + '-bottom';
};

export const adjustFloorTiles = (
  map: string[][],
  width: number,
  height: number
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('floor')) {
        map[y][x] = determineFloorType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
