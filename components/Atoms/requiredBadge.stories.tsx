import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { RequiredBadge } from './requiredBadge';

/**
 * 注意喚起するための赤いバッジです。<br/>
 * テキストは変更できます。
 */

const meta = {
  title: 'Components/Atoms/RequiredBadge',
  component: RequiredBadge,
  tags: ['autodocs'],
} as Meta<typeof RequiredBadge>;

export default meta;
type Story = StoryObj<typeof RequiredBadge>;

export const Default: Story = {
  args: {
    label: '必須',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = await canvas.findByTestId('badge-label');
    await expect(badge).not.toBeEmptyDOMElement();
  },
  parameters: {
    docs: {
      description: {
        story: '短いテキストを表示したバージョンです。',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    label: 'Warning',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = await canvas.findByTestId('badge-label');
    await expect(badge).not.toBeEmptyDOMElement();
  },
  parameters: {
    docs: {
      description: {
        story: '長いテキストを表示したバージョンです。',
      },
    },
  },
};
