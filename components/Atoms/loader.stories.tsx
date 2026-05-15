import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Atom/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
