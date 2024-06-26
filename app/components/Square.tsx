import type { ReactNode } from "react";
import type { SquareStatus } from "../src/types";

const BASE_CLASSES = "font-mono p-2 border w-10 h-10 block font-bold";
const UNOPENED_CLASSES = "bg-purple-400 border-purple-700 text-black";
const OPENED_CLASSES = "bg-gray-200 border-gray-300";
const QUESTION_MARKED_CLASSES = "bg-purple-300 border-purple-600";
const BOMB_CLASSES = "bg-amber-500 border-amber-700 text-black";

export interface SquareT extends SquareStatus {
  onClick: () => void;
  onSecondClick: () => void;
}

export const Square = ({
  adjacentBombs,
  isBomb,
  status,
  onClick,
  onSecondClick,
}: SquareT) => {
  const isOpen = status === "open";
  const isFlagged = status === "flag";
  const isQuestionMarked = status === "question";

  const handleSecondClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSecondClick();
  };

  const style = () => {
    if (isQuestionMarked) return QUESTION_MARKED_CLASSES;
    if (!isOpen) return UNOPENED_CLASSES;
    if (isBomb) return BOMB_CLASSES;
    if (isOpen) return OPENED_CLASSES;
  };

  const textColor = () => {
    let color;
    if (isQuestionMarked) return "text-purple-700";
    if (!isOpen || isBomb || isFlagged) return "text-black";

    switch (adjacentBombs) {
      case 1:
        color = "text-blue-500";
        break;
      case 2:
        color = "text-green-500";
        break;
      case 3:
        color = "text-red-500";
        break;
      case 4:
        color = "text-indigo-800";
        break;
      case 5:
        color = "text-red-800";
        break;
      case 6:
        color = "text-cyan-600";
        break;
      case 7:
        color = "text-purple-700";
        break;
      case 8:
        color = "text-gray-600";
        break;
    }
    return color;
  };

  const squareContent = () => {
    if (isFlagged) return "⚑";
    if (isQuestionMarked) return "?";
    if (!isOpen) return null;
    if (isBomb) return "X";
    if (adjacentBombs > 0) return adjacentBombs;
  };

  return (
    <button
      className={`${BASE_CLASSES} ${textColor()} ${style()}`}
      onClick={onClick}
      onContextMenu={handleSecondClick}
    >
      {squareContent()}
    </button>
  );
};
