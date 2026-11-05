import type { Meta } from "@storybook/react";

import { AddressInput } from "./addressInput";

const meta = {
  title: "Components/Organisms/Form/AddressInput",
  component: AddressInput,
  tags: ["autodocs"],
} as Meta<typeof AddressInput>;

export default meta;

export const Empty = {
  args: {
    addressValue: "",
    ordererAddress: "",
    addressErrorState: "init",
    errorFlag: false,
    SetAddressValue: () => {},
    SetAddressErrorState: () => {},
    SetOrdererAddress: () => {},
  },
};

export const Inputting = {
  args: {
    addressValue: "東京都中央区",
    ordererAddress: "",
    addressErrorState: "ok",
    errorFlag: false,
    SetAddressValue: () => {},
    SetAddressErrorState: () => {},
    SetOrdererAddress: () => {},
  },
};

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

export const Error = {
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
