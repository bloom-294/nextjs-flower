import type { Meta, StoryObj } from "@storybook/react";
import { RequiredBadge } from "./requiredBadge";

const meta: Meta<typeof RequiredBadge> = {
  title: "Components/Atom/RequiredBadge",
  component: RequiredBadge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RequiredBadge>;

export const Default: Story = {};
