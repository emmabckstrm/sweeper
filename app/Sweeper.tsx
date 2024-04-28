"use client";

import { useMemo, useState } from "react";
import { Square } from "./components/Square";
import {
  initGameBoard,
  generateBombPositions,
  getAdjacentSquares,
} from "./src/setup";
import type {
  SquareStatus,
  SquareState,
  GameBoard,
  Position,
  GameState,
} from "./src/types";
import {
  updateBoardWithSquare,
  getBoardWithOpenedSquares,
  getNumberOfOpenSquares,
  setAllSquaresToOpen,
  allowSquareInteraction,
  getNumberOfFlagsPlaced,
} from "./src/gamePlay";
import { Grid } from "./components/Grid";
import { BoardLayout } from "./components/BoardLayout";
import { HeaderLayout } from "./components/HeaderLayout";
import { GameSetup } from "./components/GameSetup";
import { Button } from "./components/Button";

export const Sweeper = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [gameBoard, setGameBoard] = useState<GameBoard>([]);
  const [numberOfSquaresToOpen, setNumberOfSquaresToOpen] = useState<number>(0);
  const [totalBombs, setTotalBombs] = useState<number>(0);

  const numberOfFlagsPlaced = getNumberOfFlagsPlaced(gameBoard);
  const numberOfOpenedSquares = getNumberOfOpenSquares(gameBoard);

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
    setNumberOfSquaresToOpen(rows * cols - bombs);
    setGameState("running");
  };

  const handleOnGameReset = () => {
    setGameBoard([]);
    setTotalBombs(0);
    setGameState("idle");
  };

  const handleOnGameWin = (_board: GameBoard) => {
    setGameState("win");
    // setGameBoard(setAllSquaresToOpen(board));
  };

  const handleOnGameLoss = () => {
    setGameState("loss");
    setGameBoard(setAllSquaresToOpen(gameBoard));
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

    setGameBoard(board);
    setGameState("running");
  };

  const openSquare = (row: number, col: number) => {
    const newBoard = getBoardWithOpenedSquares(row, col, gameBoard);
    const openedSquares = getNumberOfOpenSquares(newBoard);
    if (openedSquares === numberOfSquaresToOpen) {
      handleOnGameWin(newBoard);
    } else {
      setGameBoard(newBoard);
    }
  };

  const flagSquare = (row: number, col: number) => {
    let newStatus: SquareState = "unopened";
    switch (gameBoard[row][col].status) {
      case "unopened":
        newStatus = "flag";
        break;
      case "flag":
        newStatus = "unopened";
        break;
    }
    updateSquare(row, col, { status: newStatus });
  };

  const handleOnSquareClick = (row: number, col: number) => {
    const square = gameBoard[row][col];
    if (!allowSquareInteraction(square, gameState)) return;

    if (numberOfOpenedSquares === 0) {
      const adjacents = getAdjacentSquares(row, col, gameBoard);
      handleOnGameStart(row, col, [...adjacents, [row, col]]);
    } else {
      if (square.isBomb) {
        handleOnGameLoss();
      } else {
        openSquare(row, col);
      }
    }
  };

  const handleOnSquareSecondClick = (row: number, col: number) => {
    const square = gameBoard[row][col];
    if (!allowSquareInteraction(square, gameState)) return;

    flagSquare(row, col);
  };

  return (
    <div className="flex justify-center p-4 md:p-24">
      <BoardLayout
        Header={
          <HeaderLayout
            Title={"minesweeper"}
            LeftElement={
              <>
                <span className="text-sm">
                  {`${totalBombs - numberOfFlagsPlaced} / ${totalBombs}`}
                </span>
              </>
            }
            CenterElement={
              <span
                className="text-xl cursor-pointer"
                onClick={handleOnGameReset}
              >
                {gameState === "loss" ? "✘" : "☻"}
              </span>
            }
            RightElement={``}
          />
        }
      >
        {gameState === "idle" && (
          <GameSetup
            gameState={gameState}
            handleOnGameStart={handleOnGameInit}
          />
        )}

        {gameState !== "idle" && (
          <Grid
            grid={gameBoard}
            renderSquare={({ row, col, ...props }) => (
              <Square
                key={`row-${row}-col-${col}`}
                onClick={() => handleOnSquareClick(row, col)}
                onSecondClick={() => handleOnSquareSecondClick(row, col)}
                {...props}
              />
            )}
          />
        )}

        {gameState === "win" && <div>You won!</div>}
        {gameState === "loss" && <div>You lost!</div>}
        {(gameState === "loss" || gameState === "win") && (
          <Button onClick={handleOnGameReset}>Play again</Button>
        )}
      </BoardLayout>
    </div>
  );
};
