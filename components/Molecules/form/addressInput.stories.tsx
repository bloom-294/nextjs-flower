import type { Meta } from "@storybook/react";

import { AddressInput } from "./addressInput";

const meta = {
  title: "Components/Molecules/Form/AddressInput",
  component: AddressInput,
  tags: ["autodocs"],
} as Meta<typeof AddressInput>;

export default meta;

export const Saved = {
  args: {
    addressValue: "",
    ordererAddress: "東京都中央区",
    addressErrorState: "ok",
    errorFlag: false,
    SetAddressValue: () => {},
    SetAddressErrorState: () => {},
    SetOrdererAddress: () => {},
  },
};

export const Empty = {
  args: {
    addressValue: "",
    ordererAddress: "",
    addressErrorState: "empty",
    errorFlag: true,
    SetAddressValue: () => {},
    SetAddressErrorState: () => {},
    SetOrdererAddress: () => {},
  },
};
