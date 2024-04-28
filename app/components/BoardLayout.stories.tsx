import type { Meta, StoryObj } from "@storybook/react";

import { BoardLayout } from "./BoardLayout";
import { HeaderLayout } from "./HeaderLayout";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BoardLayout> = {
  title: "Sweeper/BoardLayout",
  component: BoardLayout,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BoardLayout>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    Header: "header",
    children: "children",
  },
};

export const WithHeaderLayoutComponent: Story = {
  args: {
    Header: <HeaderLayout />,
    children: "children",
  },
};
