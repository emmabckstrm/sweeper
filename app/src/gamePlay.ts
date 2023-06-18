import { getAdjacentSquares } from "./setup";
import type { GameBoard, Position, SquareStatus } from "./types";

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

  if (!square.isOpen && !square.isBomb) {
    if (square.adjacentBombs > 0) {
      gameBoard = updateBoardWithSquare(gameBoard, row, col, { isOpen: true });
    } else {
      gameBoard = updateBoardWithSquare(gameBoard, row, col, { isOpen: true });
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

export const getSurroundingSquaresToOpen = (
  row: number,
  col: number,
  gameBoard: GameBoard
) => {};

export const getNumberOfOpenSquares = (board: GameBoard) => {
  let numberOfOpenedSquares = 0;
  board.forEach((row) => {
    row.forEach((square) => {
      if (square.isOpen) {
        numberOfOpenedSquares += 1;
      }
    });
  });
  return numberOfOpenedSquares;
};

export const setAllSquaresToOpen = (_board: GameBoard) => {
  const board = _board.slice();
  board.forEach((row, r) => {
    row.forEach((square, c) => {
      if (!square.isOpen) {
        square.isOpen = true;
        square.isFlagged = false;
      }
    });
  });

  return board;
};
