const determineBorderType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = baseName.split('-')[0] + '-' + baseName.split('-')[1];

  const isHorizontalEdge = x === 0 || x === width - 1;
  const isVerticalEdge = y === 0 || y === height - 1;

  const hasBorderAbove =
    y > 0 &&
    (map[y - 1][x].includes('border') || map[y - 1][x].includes('wall'));
  const hasBorderBelow =
    y < height - 1 &&
    (map[y + 1][x].includes('border') || map[y + 1][x].includes('wall'));
  const hasBorderLeft =
    x > 0 &&
    (map[y][x - 1].includes('border') || map[y][x - 1].includes('wall'));
  const hasBorderRight =
    x < width - 1 &&
    (map[y][x + 1].includes('border') || map[y][x + 1].includes('wall'));

  const hasWallBelow = y < height - 1 && map[y + 1][x].includes('wall');
  const hasWallLeft = x > 0 && map[y][x - 1].includes('wall');
  const hasWallRight = x < width - 1 && map[y][x + 1].includes('wall');

  // Diagonal checks
  const hasTileTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes(tileName);
  const hasTileTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes(tileName);
  const hasTileBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes(tileName);
  const hasTileBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes(tileName);

  const hasWallTopLeft =
    x > 0 && y > 0 && map[y - 1][x - 1].startsWith(tileName);
  const hasWallTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith(tileName);
  const hasWallBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].startsWith(tileName);
  const hasWallBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].startsWith(tileName);

  // Determine specific floor type based on adjacency

  if (!hasWallTopLeft) {
  }

  if (!hasBorderLeft && !hasBorderAbove && hasBorderBelow && hasBorderRight)
    return 'border-1-top-end';
  if (hasBorderLeft && !hasBorderAbove && hasBorderBelow && !hasBorderRight)
    return 'border-1-top-end';

  if ((!hasBorderLeft || !hasBorderRight) && hasBorderAbove && hasBorderBelow)
    return 'border-1-vertical-large';
  //  if (!hasBorderAbove && hasBorderLeft && hasBorderRight)
  //s  return 'border-1-link-top-large';

  // Default fallback
  return tileName + '-bottom';
};

const determineOuterBorderType = (
  map: string[][],
  x: number,
  y: number,
  width: number,
  height: number,
  baseName: string
) => {
  const tileName = 'border-1';

  const isHorizontalEdge = x === 0 || x === width - 1;
  const isVerticalEdge = y === 0 || y === height - 1;

  const hasSkyAbove = y > 0 && map[y - 1][x].includes('sky');
  const hasSkyBelow = y < height - 1 && map[y + 1][x].includes('sky');
  const hasSkyLeft = x > 0 && map[y][x - 1].includes('sky');
  const hasSkyRight = x < width - 1 && map[y][x + 1].includes('sky');

  // Diagonal checks
  const hasSkyTopLeft = x > 0 && y > 0 && map[y - 1][x - 1].includes('sky');
  const hasSkyTopRight =
    x < width - 1 && y > 0 && map[y - 1][x + 1].includes('sky');
  const hasSkyBottomLeft =
    x > 0 && y < height - 1 && map[y + 1][x - 1].includes('sky');
  const hasSkyBottomRight =
    x < width - 1 && y < height - 1 && map[y + 1][x + 1].includes('sky');

  // Determine specific floor type based on adjacency
  if (!hasSkyAbove) {
    if (hasSkyTopLeft) return tileName + '-';
  }

  return tileName;
};

export const addBorders = (map: string[][], width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].includes('sky')) {
        map[y][x] = determineOuterBorderType(
          map,
          x,
          y,
          width,
          height,
          map[y][x]
        );
      }
      if (map[y][x].includes('wall') || map[y][x].includes('border')) {
        map[y][x] = determineBorderType(map, x, y, width, height, map[y][x]);
      }
    }
  }
};
