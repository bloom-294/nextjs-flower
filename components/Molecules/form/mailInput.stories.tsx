
import type { Meta } from "@storybook/react";

import { MailInput } from "./mailInput";

const meta = {
  title: "Components/Molecules/Form/MailInput",
  component: MailInput,
  tags: ["autodocs"],
} as Meta<typeof MailInput>;

export default meta;

export const Defaults = {
  args: {
    mailValue: "",
    displayFlag: false,
    errorFlag: false,
    mailErrorState: "ok",
    register: "",
    SetMailValue: () => {},
    SetOrdererMail: () => {},
    SetMailErrorState: () => {},
  },
};

export const Saved = {
  args: {
    mailValue: "test@example.com",
    displayFlag: true,
    errorFlag: false,
    mailErrorState: "ok",
    register: "",
    SetMailValue: () => {},
    SetOrdererMail: () => {},
    SetMailErrorState: () => {},
  },
};

export const Empty = {
  args: {
    mailValue: "",
    displayFlag: false,
    errorFlag: true,
    mailErrorState: "empty",
    register: "",
    SetMailValue: () => {},
    SetOrdererMail: () => {},
    SetMailErrorState: () => {},
  },
};

export const FormatError= {
  args: {
    mailValue: "testexample",
    displayFlag: true,
    errorFlag: true,
    mailErrorState: "format-incorrect",
    register: "",
    SetMailValue: () => {},
    SetOrdererMail: () => {},
    SetMailErrorState: () => {},
  },
};

export const registered = {
  args: {
    mailValue: "registered@example.com",
    displayFlag: true,
    errorFlag: true,
    mailErrorState: "registered",
    register: "register",
    SetMailValue: () => {},
    SetOrdererMail: () => {},
    SetMailErrorState: () => {},
  },
};
