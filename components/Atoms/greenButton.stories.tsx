import type { Meta, StoryObj } from "@storybook/react";
import { GreenButton } from "./greenButton";
// import { expect } from 'storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

/**
 * メインで使用するボタンのコンポーネントです。
 */

const meta: Meta<typeof GreenButton> = {
  title: "Components/Atoms/GreenButton",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await expect(button).not.toBeEmptyDOMElement();
  },
  parameters: {
    docs: {
      description: {
        story: "短いテキストのバージョンです。",
      },
    }
  }
};

export const LongText: Story = {
  args: {
    name: "カートに追加する",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await expect(button).not.toBeEmptyDOMElement();
  },
  parameters: {
    docs: {
      description: {
        story: "長いテキストのバージョンです。",
      },
    }
  }
};
