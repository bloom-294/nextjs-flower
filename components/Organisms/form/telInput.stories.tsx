import type { Meta } from "@storybook/react";

import { TelInput } from "./telInput";

const meta = {
  title: "Components/Organisms/Form/TelInput",
  component: TelInput,
  tags: ["autodocs"],
} as Meta<typeof TelInput>;

export default meta;

export const Saved = {
  args: {
    telValue: "",
    ordererTel: "090-1234-5678",
    telErrorState: "ok",
    errorFlag: false,
    SetTelValue: () => {},
    SetTelErrorState: () => {},
    SetOrdererTel: () => {},
  },
};

export const FormatError = {
  args: {
    telValue: "09012345678",
    ordererTel: "",
    telErrorState: "format-incorrect",
    errorFlag: false,
    SetTelValue: () => {},
    SetTelErrorState: () => {},
    SetOrdererTel: () => {},
  },
};

export const Empty = {
  args: {
    telValue: "",
    ordererTel: "",
    telErrorState: "empty",
    errorFlag: true,
    SetTelValue: () => {},
    SetTelErrorState: () => {},
    SetOrdererTel: () => {},
  },
};
