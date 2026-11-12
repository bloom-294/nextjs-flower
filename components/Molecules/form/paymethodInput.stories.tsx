
import type { Meta } from "@storybook/react";
import { useState } from "react";
import { PaymethodInput } from "./paymethodInput";

const meta = {
  title: "Components/Molecules/Form/PaymethodInput",
  component: PaymethodInput,
  tags: ["autodocs"],
} as Meta<typeof PaymethodInput>;

export default meta;

const Template = () => {
  const [payMethod, setPayMethod] =
    useState("現金払い");

  return (
    <PaymethodInput
      ordererPayMethod={payMethod}
      SetOrdererPayMethod={setPayMethod}
    />
  );
};

export const Default = {
  render: () => <Template />,
};

export const Cash = {
  args: {
    ordererPayMethod: "現金払い",
    SetOrdererPayMethod: () => {},
  },
};

export const Credit = {
  args: {
    ordererPayMethod: "クレジット",
    SetOrdererPayMethod: () => {},
  },
};
