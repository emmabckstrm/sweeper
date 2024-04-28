import type { Meta, StoryObj } from "@storybook/react";

import { Square } from "./Square";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Square> = {
  title: "Sweeper/Square",
  component: Square,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Square>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Unopened: Story = {
  args: {
    status: "unopened",
  },
};

export const OpenEmpty: Story = {
  args: {
    isBomb: false,
    status: "open",
  },
};

export const OpenAdjacentBombs: Story = {
  args: {
    isBomb: false,
    status: "open",
    adjacentBombs: 3,
  },
};

export const OpenWithBomb: Story = {
  args: {
    isBomb: true,
    status: "open",
  },
};

export const Flagged: Story = {
  args: {
    isBomb: true,
    status: "flag",
  },
};
