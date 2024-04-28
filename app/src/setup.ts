import type { SquareStatus, GameBoard, Position } from "./types";

export const initGameBoard = (rows: number, cols: number): GameBoard => {
  const board = [];
  const squareStatus: SquareStatus = {
    isBomb: false,
    adjacentBombs: 0,
    status: "unopened",
  };
  for (let row = 0; row < rows; row++) {
    const newRow: SquareStatus[] = [];
    for (let col = 0; col < cols; col++) {
      newRow.push({ ...squareStatus });
    }
    board.push(newRow);
  }
  return board;
};

export const positionExistsInArray = (
  position: Position,
  array: Position[]
) => {
  if (array.length === 0) return false;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (JSON.stringify(position) === JSON.stringify(element)) {
      return true;
    }
  }
  return false;
};

const disallowedPosition = (
  position: Position,
  occupiedPositions: Position[],
  reservedPositions: Position[]
) => {
  return (
    positionExistsInArray(position, occupiedPositions) ||
    positionExistsInArray(position, reservedPositions)
  );
};

export const generateBombPositions = (
  rows: number,
  cols: number,
  numberOfBombs: number,
  reservedPositions: Position[] = []
) => {
  if (cols * rows - reservedPositions.length <= numberOfBombs) {
    throw new Error("too many bombs!");
  }
  const positions: Position[] = [];
  const random = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  for (let i = 0; i < numberOfBombs; i++) {
    let pos = [random(rows), random(cols)] as [number, number];
    while (disallowedPosition(pos, positions, reservedPositions)) {
      pos = [random(rows), random(cols)];
    }

    positions.push(pos);
  }
  return positions;
};

export const calculateAdjacentBombs = () => {};

export const getAdjacentSquares = (
  row: number,
  col: number,
  gameBoard: GameBoard
) => {
  const adjacents: Position[] = [];
  const deltas = [-1, 0, 1];
  for (let i = 0; i < 8; i++) {}
  deltas.forEach((rowDelta) => {
    deltas.forEach((colDelta) => {
      if (rowDelta === 0 && colDelta === 0) return;
      const newRow = row + rowDelta;
      const newCol = col + colDelta;
      if (
        newRow < 0 ||
        newRow >= gameBoard.length ||
        newCol < 0 ||
        newCol >= gameBoard[0].length
      ) {
        return;
      }

      adjacents.push([newRow, newCol]);
    });
  });
  return adjacents;
};
