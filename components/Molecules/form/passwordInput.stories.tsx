
import type { Meta } from "@storybook/react";

import { PasswordInput } from "./passwordInput";

const meta = {
  title: "Components/Molecules/Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
} as Meta<typeof PasswordInput>;

export default meta;

export const Valid = {
  args: {
    passwordValue: "Password123",
    confirmPasswordValue: "Password123",
    passwordErrorState: "ok",
    errorFlag: false,
    displayFlag: true,
    SetPasswordValue: () => {},
    SetPasswordErrorState: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};

export const FormatError = {
  args: {
    passwordValue: "pass",
    confirmPasswordValue: "",
    passwordErrorState: "format-incorrect",
    errorFlag: true,
    displayFlag: true,
    SetPasswordValue: () => {},
    SetPasswordErrorState: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};

export const Mismatch = {
  args: {
    passwordValue: "Password123",
    confirmPasswordValue: "PASSWORD123!",
    passwordErrorState: "mismatch",
    errorFlag: true,
    displayFlag: false,
    SetPasswordValue: () => {},
    SetPasswordErrorState: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};

export const Empty = {
  args: {
    passwordValue: "",
    confirmPasswordValue: "",
    passwordErrorState: "empty",
    errorFlag: false,
    displayFlag: true,
    SetPasswordValue: () => {},
    SetPasswordErrorState: () => {},
    SetConfirmPasswordErrorState: () => {},
  },
};
