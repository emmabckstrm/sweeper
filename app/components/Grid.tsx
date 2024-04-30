import { ReactNode } from "react";

interface Item {
  row: number;
  col: number;
}

interface Props<T> {
  grid: T[][];
  renderItem: (arg0: T & Item) => ReactNode;
}

export const Grid = <T,>({ grid, renderItem }: Props<T>) => {
  return (
    <div className="shadow-sm inline-block bg-purple-600 p-1 rounded-md">
      {grid.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`} className="flex flex-row">
            {row.map((item, colIndex) => {
              return renderItem({
                row: rowIndex,
                col: colIndex,
                ...item,
              });
            })}
          </div>
        );
      })}
    </div>
  );
};
