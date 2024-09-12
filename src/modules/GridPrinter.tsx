import React from 'react';

interface GridPrinterProps {
  grid: string[][];
}

const GridPrinter: React.FC<GridPrinterProps> = ({
  grid,
}: {
  grid: string[][];
}) => {
  // Function to format the grid as a string
  const formatGrid = (map: string[][]) => {
    return map
      .map(row => `[${row.map(cell => `'${cell}'`).join(', ')}]`)
      .join(',\n ');
  };

  // Use the formatted grid string in the component
  return (
    <div>
      <pre>{formatGrid(grid)}</pre>
    </div>
  );
};

export default GridPrinter;
