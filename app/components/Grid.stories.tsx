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
    renderSquare: ({ col, row }) => `${row}${col}`,
  },
};

export const WithSquares: Story = {
  args: {
    grid: gameBoard,
    renderSquare: ({ col, row, ...props }) => (
      <Square
        key={`row-${row}-col-${col}`}
        onClick={() => {}}
        onSecondClick={() => {}}
        {...(props as SquareStatus)}
      />
    ),
  },
};
