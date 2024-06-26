import { getAdjacentSquares } from "./setup";
import type { GameBoard, GameState, SquareState, SquareStatus } from "./types";

export const updateBoardWithSquare = (
  board: GameBoard,
  row: number,
  col: number,
  newValue: Partial<SquareStatus>
) => {
  const newBoard = board.slice();
  newBoard[row][col] = { ...newBoard[row][col], ...newValue };
  return newBoard;
};

export const getBoardWithOpenedSquares = (
  row: number,
  col: number,
  _gameBoard: GameBoard
): GameBoard => {
  let gameBoard = _gameBoard.slice();
  const square = gameBoard[row][col];

  if (isUnopened(square)) {
    if (square.adjacentBombs > 0) {
      gameBoard = updateBoardWithSquare(gameBoard, row, col, {
        status: "open",
      });
    } else {
      gameBoard = updateBoardWithSquare(gameBoard, row, col, {
        status: "open",
      });
      const adjacents = getAdjacentSquares(row, col, gameBoard);
      for (let i = 0; i < adjacents.length; i++) {
        gameBoard = getBoardWithOpenedSquares(
          adjacents[i][0],
          adjacents[i][1],
          gameBoard
        );
      }
    }
  }
  return gameBoard;
};

export const getNumberOfOpenSquares = (board: GameBoard) => {
  let total = 0;
  board.forEach((row) => {
    row.forEach((square) => {
      if (isOpen(square)) {
        total += 1;
      }
    });
  });
  return total;
};

export const getNumberOfFlagsPlaced = (board: GameBoard) => {
  let total = 0;
  board.forEach((row) => {
    row.forEach((square) => {
      if (isFlagged(square)) {
        total += 1;
      }
    });
  });
  return total;
};

export const setAllSquaresToOpen = (_board: GameBoard) => {
  const board = _board.slice();
  board.forEach((row, r) => {
    row.forEach((square, c) => {
      if (!isOpen(square)) {
        square.status = "open";
      }
    });
  });

  return board;
};

export const isOpen = (square: SquareStatus) => {
  return square.status === "open";
};
export const isUnopened = (square: SquareStatus) => {
  return square.status === "unopened";
};
export const isFlagged = (square: SquareStatus) => {
  return square.status === "flag";
};

export const allowSquareInteraction = (
  square: SquareStatus,
  gameState: GameState
) => {
  return gameState === "running" && !isOpen(square);
};
