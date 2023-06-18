import type { ReactNode } from "react";

const BASE_CLASSES = "font-mono p-2 border rounded w-10 h-10 block font-bold";
const UNOPENED_CLASSES = "bg-purple-400 border-purple-700";
const OPENED_CLASSES = "bg-gray-200 border-gray-300";
const BOMB_CLASSES = "bg-amber-500 border-amber-700 text-black";

export interface SquareT {
  adjacentBombs: number;
  children?: ReactNode;
  isBomb: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  onClick: () => void;
  onSecondClick: () => void;
}

export const Square = ({
  adjacentBombs,
  isBomb,
  isOpen,
  isFlagged,
  children,
  onClick,
  onSecondClick,
}: SquareT) => {
  const handleSecondClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSecondClick();
  };

  let style;
  if (!isOpen) {
    style = UNOPENED_CLASSES;
  } else if (isBomb) {
    style = BOMB_CLASSES;
  } else {
    style = OPENED_CLASSES;
  }

  let textColor;
  switch (adjacentBombs) {
    case 1:
      textColor = "text-blue-500";
      break;
    case 2:
      textColor = "text-green-500";
      break;
    case 3:
      textColor = "text-red-500";
      break;
    case 4:
      textColor = "text-indigo-800";
      break;
    case 5:
      textColor = "text-red-800";
      break;
    case 6:
      textColor = "text-cyan-600";
      break;
    case 7:
      textColor = "text-purple-700";
      break;
    case 8:
      textColor = "text-gray-600";
      break;
  }

  const squareContent = () => {
    if (isFlagged) return "F";
    if (!isOpen) return null;
    if (isBomb) return "X";
    if (adjacentBombs > 0) return adjacentBombs;
  };

  return (
    <button
      className={`${BASE_CLASSES} ${textColor} ${style}`}
      onClick={onClick}
      onContextMenu={handleSecondClick}
    >
      {squareContent()}
    </button>
  );
};
