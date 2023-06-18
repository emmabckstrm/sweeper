import type { Meta, StoryObj } from "@storybook/react";
import { Board } from "../../app/components/Board";
import { Square } from "../../app/components/Square";
import { initGameBoard } from "../../app/src/setup";

const meta: Meta<typeof Board> = {
  title: "Sweeper/Board",
  component: Board,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Board>;

const gameBoard = initGameBoard(5, 5);

export const Idle: Story = {
  args: {
    gameState: "idle",
    gameBoard,
    renderSquare: ({ row, col, ...props }) => (
      <Square
        onClick={() => {}}
        onSecondClick={() => {}}
        key={`${row}-${col}`}
        {...props}
      />
    ),
  },
};

export const GameIsRunning: Story = {
  args: {
    gameState: "running",
    gameBoard,
    renderSquare: ({ row, col, ...props }) => (
      <Square
        onClick={() => {}}
        onSecondClick={() => {}}
        key={`${row}-${col}`}
        {...props}
      />
    ),
  },
};

export const GameIsLost: Story = {
  args: {
    gameState: "loss",
    gameBoard,
    renderSquare: ({ row, col, ...props }) => (
      <Square
        onClick={() => {}}
        onSecondClick={() => {}}
        key={`${row}-${col}`}
        {...props}
      />
    ),
  },
};

export const GameIsWon: Story = {
  args: {
    gameState: "win",
    gameBoard,
    renderSquare: ({ row, col, ...props }) => (
      <Square
        onClick={() => {}}
        onSecondClick={() => {}}
        key={`${row}-${col}`}
        {...props}
      />
    ),
  },
};
