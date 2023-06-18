"use client";

import { useState } from "react";
import { Square } from "./components/Square";
import { Board } from "./components/Board";
import {
  initGameBoard,
  generateBombPositions,
  getAdjacentSquares,
} from "./src/setup";
import type { SquareStatus, GameBoard, Position } from "./src/setup";

const WIDTH = 10;
const HEIGHT = 10;
const NUMBER_OF_BOMBS = 2;

export const Sweeper = () => {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameBoard, setGameBoard] = useState<GameBoard>([]);
  const [openedSquares, setOpenedSquares] = useState<number>(0);
  const [totalBombs, setTotalBombs] = useState<number>(0);

  const updateSquare = (
    row: number,
    col: number,
    newValue: Partial<SquareStatus>
  ) => {
    setGameBoard((prevBoard) => {
      const newBoard = prevBoard.slice();
      newBoard[row][col] = { ...newBoard[row][col], ...newValue };
      return newBoard;
    });
  };
  const updateBoardWithSquare = (
    row: number,
    col: number,
    board: GameBoard,
    newValue: Partial<SquareStatus>
  ) => {
    const newBoard = board.slice();
    newBoard[row][col] = { ...newBoard[row][col], ...newValue };
    return newBoard;
  };

  const handleOnGameInit = (rows: number, cols: number, bombs: number) => {
    setTotalBombs(bombs);
    setGameBoard(initGameBoard(rows, cols));
    setGameIsRunning(true);
  };

  const handleOnGameStart = (
    // rows: number,
    // cols: number,
    // bombs: number,
    reservedPositions: Position[],
    row: number,
    col: number
  ) => {
    let board: GameBoard = [];
    const bombPositions = generateBombPositions(
      gameBoard.length,
      gameBoard[0].length,
      totalBombs,
      reservedPositions
    );
    console.log("reservedPositions", reservedPositions);
    console.log("bombpos", bombPositions);
    bombPositions.forEach((position) => {
      board = updateBoardWithSquare(position[0], position[1], gameBoard, {
        isBomb: true,
      });
    });
    bombPositions.forEach((position) => {
      const adjacents = getAdjacentSquares(position[0], position[1], board);
      adjacents.forEach((adjacent) => {
        const adjacentSquare = board[adjacent[0]][adjacent[1]];
        if (adjacentSquare.isBomb || adjacentSquare.adjacentBombs > 0) {
          return;
        }

        const adjacentAdjacents = getAdjacentSquares(
          adjacent[0],
          adjacent[1],
          board
        );
        let adjacentBombs = 0;
        adjacentAdjacents.forEach((adj) => {
          if (board[adj[0]][adj[1]].isBomb) {
            adjacentBombs += 1;
          }
        });
        board = updateBoardWithSquare(adjacent[0], adjacent[1], board, {
          adjacentBombs,
        });
      });
    });

    setGameBoard(board);
    setGameIsRunning(true);
  };

  const openSquare = (row: number, col: number) => {
    const square = gameBoard[row][col];
    if (square.isOpen) {
      return;
    } else if (square.isBomb) {
      console.log("YOU LOOSE!");
    } else if (square.adjacentBombs > 0) {
      console.log("OPEN SINGLE");
    } else {
      const adjacents = getAdjacentSquares(row, col, gameBoard);
    }
  };

  const handleOnSquareClick = (row: number, col: number) => {
    console.log("left click", row, col);
    if (openedSquares === 0) {
      const adjacents = getAdjacentSquares(row, col, gameBoard);
      handleOnGameStart([...adjacents, [row, col]], row, col);
      // TODO temp
      setOpenedSquares(1);
    } else if (!gameBoard[row][col].isOpen) {
      openSquare(row, col);
    }
    // else open square
  };

  const handleOnSquareSecondClick = (row: number, col: number) => {
    console.log("right click", row, col);
  };

  return (
    <div className="flex justify-center p-24">
      <Board
        gameBoard={gameBoard}
        isGameRunning={gameIsRunning}
        handleOnGameStart={handleOnGameInit}
        renderSquare={({ row, col, ...props }) => (
          <Square
            key={`row-${row}-col-${col}`}
            onClick={() => handleOnSquareClick(row, col)}
            onSecondClick={() => handleOnSquareSecondClick(row, col)}
            {...props}
          />
        )}
      ></Board>
    </div>
  );
};
