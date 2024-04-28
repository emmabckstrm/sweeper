import type { Meta, StoryObj } from "@storybook/react";
import { Board } from "./Board";
import { initGameBoard } from "../src/setup";

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
  },
};

export const GameIsRunning: Story = {
  args: {
    gameState: "running",
  },
};

export const GameIsLost: Story = {
  args: {
    gameState: "loss",
  },
};

export const GameIsWon: Story = {
  args: {
    gameState: "win",
  },
};
