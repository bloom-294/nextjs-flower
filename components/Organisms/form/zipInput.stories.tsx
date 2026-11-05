
import type { Meta } from "@storybook/react";

import { ZipInput } from "./zipInput";

const meta = {
  title: "Components/Organisms/Form/ZipInput",
  component: ZipInput,
  tags: ["autodocs"],
} as Meta<typeof ZipInput>;

export default meta;

export const Saved = {
  args: {
    zipValue: "",
    ordererZip: "123-1234",
    zipErrorState: "ok",
    errorFlag: false,
    register: "",
    SetZipValue: () => {},
    SetZipErrorState: () => {},
    SetOrdererZip: () => {},
  },
};

export const FormatError = {
  args: {
    zipValue: "1234567",
    ordererZip: "",
    zipErrorState: "format-incorrect",
    errorFlag: true,
    register: "",
    SetZipValue: () => {},
    SetZipErrorState: () => {},
    SetOrdererZip: () => {},
  },
};

export const UnexistError = {
  args: {
    zipValue: "000-0000",
    ordererZip: "",
    zipErrorState: "unexist",
    errorFlag: true,
    register: "",
    SetZipValue: () => {},
    SetZipErrorState: () => {},
    SetOrdererZip: () => {},
  },
};

export const Empty = {
  args: {
    zipValue: "",
    ordererZip: "",
    zipErrorState: "empty",
    errorFlag: true,
    register: "",
    SetZipValue: () => {},
    SetZipErrorState: () => {},
    SetOrdererZip: () => {},
  },
};
