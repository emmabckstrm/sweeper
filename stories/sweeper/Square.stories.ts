import type { Meta, StoryObj } from "@storybook/react";

import { Square } from "../../app/components/Square";

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
    isOpen: false,
  },
};

export const OpenEmpty: Story = {
  args: {
    isOpen: true,
    isBomb: false,
  },
};

export const OpenAdjacentBombs: Story = {
  args: {
    isOpen: true,
    isBomb: false,
    adjacentBombs: 3,
  },
};

export const OpenWithBomb: Story = {
  args: {
    isOpen: true,
    isBomb: true,
  },
};
