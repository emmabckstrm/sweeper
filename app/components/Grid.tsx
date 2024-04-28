import { ReactNode } from "react";

interface Square {
  row: number;
  col: number;
}

interface Props<T> {
  grid: T[][];
  renderSquare: (arg0: T & Square) => ReactNode;
}

export const Grid = <T,>({ grid, renderSquare }: Props<T>) => {
  return (
    <div className="shadow-sm inline-block bg-purple-600 p-1 rounded-md">
      {grid.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`} className="flex flex-row">
            {row.map((col, colIndex) => {
              return renderSquare({
                row: rowIndex,
                col: colIndex,
                ...col,
              });
            })}
          </div>
        );
      })}
    </div>
  );
};
