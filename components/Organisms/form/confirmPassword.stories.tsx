import type { Meta } from "@storybook/react";

import { ConfirmPasswordInput } from "./confirmPassword";

const meta = {
  title:
    "Components/Organisms/Form/ConfirmPasswordInput",
  component: ConfirmPasswordInput,
  tags: ["autodocs"],
} as Meta<typeof ConfirmPasswordInput>;

export default meta;

export const Saved = {
  args: {
    passwordValue: "Password123",
    confirmPasswordValue: "Password123",
    confirmPasswordErrorState: "ok",
    errorFlag: false,
    SetConfirmPasswordValue: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};

export const Mismatch = {
  args: {
    passwordValue: "Password123",
    confirmPasswordValue: "Password999",
    confirmPasswordErrorState: "mismatch",
    errorFlag: true,
    SetConfirmPasswordValue: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};

export const Empty = {
  args: {
    passwordValue: "",
    confirmPasswordValue: "",
    confirmPasswordErrorState: "empty",
    errorFlag: true,
    SetConfirmPasswordValue: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};
