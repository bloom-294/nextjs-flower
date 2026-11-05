
import type { Meta } from "@storybook/react";

import { DateInput } from "./dateInput";

const meta = {
  title: "Components/Organisms/Form/DateInput",
  component: DateInput,
  tags: ["autodocs"],
} as Meta<typeof DateInput>;

export default meta;


export const Defaults  = {
  args: {
    ordererDateState: {
      current: ["日時指定あり", "ok", ""],
    },
    SetDateErrorState: () => {},
    SetOrdererDate: () => {},
    ordererDate: "",
    errorFlag: false,
  },
};

export const FixedDateEmpty  = {
  args: {
    ordererDateState: {
      current: ["日時指定あり", "empty", ""],
    },
    SetDateErrorState: () => {},
    SetOrdererDate: () => {},
    ordererDate: "",
    errorFlag: true,
  },
};

export const FixedDateImpossible  = {
  args: {
    ordererDateState: {
      current: ["日時指定あり", "impossible", ""],
    },
    SetDateErrorState: () => {},
    SetOrdererDate: () => {},
    ordererDate: "",
    errorFlag: true,
  },
};

export const SameDayDelivery = {
  args: {
    ordererDateState: {
      current: ["即日配送", "ok", ""],
    },
    SetDateErrorState: () => {},
    SetOrdererDate: () => {},
    ordererDate: "",
    errorFlag: false,
  },
};
