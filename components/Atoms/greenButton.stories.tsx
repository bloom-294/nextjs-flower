import type { Meta, StoryObj } from "@storybook/react";
import { GreenButton } from "./greenButton";

const meta: Meta<typeof GreenButton> = {
  title: "Components/Atom/GreenButton",
  component: GreenButton,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "ボタンに表示するテキスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GreenButton>;

export const Default: Story = {
  args: {
    name: "購入する",
  },
};

export const LongText: Story = {
  args: {
    name: "カートに追加する",
  },
};
