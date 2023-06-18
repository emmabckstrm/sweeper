export interface SquareStatus {
  isBomb: boolean;
  isOpen: boolean;
  adjacentBombs: number;
  isFlagged: boolean;
}

export type GameBoard = SquareStatus[][];
export type Position = [number, number];
