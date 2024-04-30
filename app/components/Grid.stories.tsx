import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";
import { initGameBoard } from "../src/setup";
import { Square } from "./Square";
import { SquareStatus } from "../src/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Grid> = {
  title: "Sweeper/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {},
};

const gameBoard = initGameBoard(5, 5);

export default meta;
type Story = StoryObj<typeof Grid>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    grid: [
      [1, 2],
      [2, 3],
    ],
    renderItem: ({ col, row }) => `${row}${col}`,
  },
};

export const WithSquares: Story = {
  args: {
    grid: gameBoard,
    renderItem: ({ col, row, ...props }) => (
      <Square
        key={`row-${row}-col-${col}`}
        onClick={() => {}}
        onSecondClick={() => {}}
        {...(props as SquareStatus)}
      />
    ),
  },
};

export const WithSquaresWithDifferentStatuses: Story = {
  args: {
    grid: [
      [
        { isBomb: true, status: "unopened" },
        { isBomb: false, status: "unopened" },
      ],
      [
        { isBomb: true, status: "open" },
        { isBomb: false, status: "open" },
      ],
      [
        { isBomb: true, status: "flag" },
        { isBomb: false, status: "flag" },
      ],
      [
        { isBomb: true, status: "question" },
        { isBomb: false, status: "question" },
      ],
      [
        { adjacentBombs: 4, status: "unopened" },
        { adjacentBombs: 4, status: "open" },
      ],
      [
        { adjacentBombs: 4, status: "flag" },
        { adjacentBombs: 4, status: "question" },
      ],
    ],
    renderItem: ({ col, row, ...props }) => (
      <Square
        key={`row-${row}-col-${col}`}
        onClick={() => {}}
        onSecondClick={() => {}}
        {...(props as SquareStatus)}
      />
    ),
  },
};
