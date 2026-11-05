
import type { Meta } from "@storybook/react";

import { ConfirmFrom } from "./confirmFrom";

/**
 * ### 購入確認画面のフォームです。
 * 
 */

const meta = {
  title: "Components/Organisms/ConfirmFrom",
  component: ConfirmFrom,
  tags: ["autodocs"],
} as Meta<typeof ConfirmFrom>;

export default meta;

const mockSetState = () => {};

export const Default = {
  args: {
    // Name
    lastNameValue: "田中",
    SetLastNameValue: mockSetState,
    firstNameValue: "太郎",
    SetFirstNameValue: mockSetState,
    firstNameErrorState: "init",
    SetFirstNameErrorState: mockSetState,
    lastNameErrorState: "init",
    SetLastNameErrorState: mockSetState,
    errorFlag: false,
    SetOrdererFirstName: mockSetState,
    SetOrdererLastName: mockSetState,
    ordererLastName: "",
    ordererFirstName: "",

    // Tel
    telValue: "",
    SetTelValue: mockSetState,
    telErrorState: "init",
    SetTelErrorState: mockSetState,
    ordererTel: "",
    SetOrdererTel: mockSetState,

    // Zip
    zipValue: "",
    SetZipValue: mockSetState,
    zipErrorState: "init",
    SetZipErrorState: mockSetState,
    ordererZip: "",
    SetOrdererZip: mockSetState,

    // Address
    addressValue: "",
    SetAddressValue: mockSetState,
    addressErrorState: "init",
    SetAddressErrorState: mockSetState,
    ordererAddress: "",
    SetOrdererAddress: mockSetState,

    // Paymethod
    ordererPayMethod: "",
    SetOrdererPayMethod: mockSetState,

    // Date
    ordererDateState: {
      current: ["", "init"],
    },
    SetDateErrorState: mockSetState,
    SetOrdererDate: mockSetState,
    ordererDate: "",

    // ConfirmFrom
    SetOrdererName: mockSetState,
    SetordererStateChange: mockSetState,
    SetOrderUserInfoChange: mockSetState,
    SetErrorFlag: mockSetState,
  },
};
