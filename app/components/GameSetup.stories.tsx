import type { Meta, StoryObj } from "@storybook/react";
import { GameSetup } from "./GameSetup";

const meta: Meta<typeof GameSetup> = {
  title: "Sweeper/GameSetup",
  component: GameSetup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GameSetup>;

export const Idle: Story = {
  args: {
    gameState: "idle",
  },
};
