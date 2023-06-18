"use client";

import { useState } from "react";
import { Square } from "./components/Square";
import { Board } from "./components/Board";
import {
  initGameBoard,
  generateBombPositions,
  getAdjacentSquares,
} from "./src/setup";
import type { SquareStatus, GameBoard, Position } from "./src/types";
import {
  updateBoardWithSquare,
  getBoardWithOpenedSquares,
  getNumberOfOpenSquares,
  setAllSquaresToOpen,
} from "./src/gamePlay";

const WIDTH = 10;
const HEIGHT = 10;
const NUMBER_OF_BOMBS = 2;

export const Sweeper = () => {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameBoard, setGameBoard] = useState<GameBoard>([]);
  const [numberOfOpenedSquares, setNumberOfOpenedSquares] = useState<number>(0);
  const [totalBombs, setTotalBombs] = useState<number>(0);

  const updateSquare = (
    row: number,
    col: number,
    newValue: Partial<SquareStatus>
  ) => {
    setGameBoard((prevBoard) => {
      return updateBoardWithSquare(prevBoard, row, col, newValue);
    });
  };

  const handleOnGameInit = (rows: number, cols: number, bombs: number) => {
    setTotalBombs(bombs);
    setGameBoard(initGameBoard(rows, cols));
    setGameIsRunning(true);
  };

  const handleOnGameStart = (
    row: number,
    col: number,
    reservedPositions: Position[]
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
      board = updateBoardWithSquare(gameBoard, position[0], position[1], {
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
        board = updateBoardWithSquare(board, adjacent[0], adjacent[1], {
          adjacentBombs,
        });
      });
    });

    board = getBoardWithOpenedSquares(row, col, board);

    setNumberOfOpenedSquares(getNumberOfOpenSquares(board));
    setGameBoard(board);
    setGameIsRunning(true);
  };

  const openSquare = (row: number, col: number) => {
    const newBoard = getBoardWithOpenedSquares(row, col, gameBoard);
    setNumberOfOpenedSquares(getNumberOfOpenSquares(newBoard));
    setGameBoard(newBoard);
  };

  const flagSquare = (row: number, col: number) => {
    updateSquare(row, col, { isFlagged: !gameBoard[row][col].isFlagged });
  };

  const handleOnSquareClick = (row: number, col: number) => {
    console.log("left click", row, col);
    if (numberOfOpenedSquares === 0) {
      const adjacents = getAdjacentSquares(row, col, gameBoard);
      handleOnGameStart(row, col, [...adjacents, [row, col]]);
    } else if (!gameBoard[row][col].isOpen && !gameBoard[row][col].isFlagged) {
      if (gameBoard[row][col].isBomb) {
        console.log("YOU LOOSE!");
        setGameBoard(setAllSquaresToOpen(gameBoard));
      } else {
        openSquare(row, col);
      }
    }
  };

  const handleOnSquareSecondClick = (row: number, col: number) => {
    console.log("right click", row, col);
    flagSquare(row, col);
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
