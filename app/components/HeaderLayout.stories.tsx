import type { Meta, StoryObj } from "@storybook/react";

import { HeaderLayout } from "./HeaderLayout";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HeaderLayout> = {
  title: "Sweeper/HeaderLayout",
  component: HeaderLayout,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderLayout>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Unopened: Story = {
  args: {
    Title: "sweeper",
    LeftElement: "12",
    CenterElement: "12",
    RightElement: "12",
  },
};
