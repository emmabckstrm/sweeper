export type SquareState = "unopened" | "open" | "flag" | "question";
export interface SquareStatus {
  isBomb: boolean;
  adjacentBombs: number;
  status: SquareState;
}

export type GameBoard = SquareStatus[][];
export type Position = [number, number];
export type GameState = "idle" | "running" | "win" | "loss";
