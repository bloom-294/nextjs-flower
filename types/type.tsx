import React from "react"

export type User = {
  address: string;
  firstName: string;
  lastName: string;
  gender: string;
  mail: string;
  password: string;
  tel: string;
  zip: string;
};

export type UserInfo = {
  name: string;
  zip: string;
  address: string;
  tel: string;
  ordererName: string;
  ordererZip: string;
  ordererAddress: string;
  ordererTel: string;
  orderUserInfoChange: boolean;
};

export type FavoriteItem = {
  name: string;
  price: number;
  info: string;
  imagePath: string;
  category: string;
  recommend: number;
  popular: number;
  id: number;
};

export type ItemListTypes = {
  name: string;
  price: number;
  info: string;
  imagePath: string;
  category: string;
  recommend: number;
  popular: number;
  id: number;
};

export type ErrorMessageProps = {
  errorFlag: boolean;
  value: string;
  text: string;
};

export type NameError = {
  errorFlag: boolean;
  value1: string;
  value2: string;
  text: string;
};

export type AddressTypes = {
  ordererAddress?: string;
  addressValue: string;
  SetAddressValue: React.FC | Function;
  SetAddressErrorState: React.FC | Function;
  SetOrdererAddress?: React.FC | Function;
  addressErrorState: string;
  errorFlag: boolean;
};

export type ConfirmPasswordTypes = {
  SetConfirmPasswordValue: React.FC | Function;
  SetConfirmPasswordErrorState: React.FC | Function;
  confirmPasswordErrorState: string;
  passwordValue: string;
  errorFlag: boolean;
  confirmPasswordValue: string;
};

export type MailTypes = {
  SetMailValue: React.FC | Function;
  SetOrdererMail?: React.FC | Function;
  SetMailErrorState: React.FC | Function;
  displayFlag: boolean;
  mailValue: string;
  ordererMail?: string;
  errorFlag: boolean;
  register?: string;
  mailErrorState: string;
};

export type NameTypes = {
  SetLastNameValue: React.FC | Function;
  SetLastNameErrorState: React.FC | Function;
  SetOrdererLastName?: React.FC | Function;
  SetOrdererFirstName?: React.FC | Function;
  SetFirstNameValue: React.FC | Function;
  SetFirstNameErrorState: React.FC | Function;
  displayFlag?: boolean;
  ordererLastName?: string;
  ordererFirstName?: string;
  errorFlag: boolean;
  lastNameErrorState: string;
  firstNameErrorState: string;
  lastNameValue: string;
  firstNameValue: string;
};

export type PasswordTypes = {
  SetPasswordValue: React.FC | Function;
  SetPasswordErrorState: React.FC | Function;
  confirmPasswordValue: string;
  SetConfirmPasswordErrorState: React.FC | Function;
  passwordErrorState: string;
  passwordValue: string;
  errorFlag: boolean;
  displayFlag: boolean;
};

export type TelTypes = {
  SetTelValue: React.FC | Function;
  SetTelErrorState: React.FC | Function;
  ordererTel?: string;
  SetOrdererTel?: React.FC | Function;
  telValue: string;
  telErrorState: string;
  errorFlag: boolean;
};

export type ZipTypes = {
  zipValue: string;
  SetZipValue: React.FC | Function;
  zipErrorState: string;
  SetZipErrorState: React.FC | Function;
  errorFlag: boolean;
  ordererZip?: string;
  SetOrdererZip?: React.FC | Function;
};

export type PaymethodTypes = {
  SetOrdererPayMethod: React.FC | Function;
};

export type DateTypes = {
  ordererDateState?: { current: string[] } | any;
  SetDateErrorState?: React.FC | Function;
  SetOrdererDate?: React.FC | Function;
  ordererDate?: string;
};

export type ConfirmFromTypes =
  NameTypes &
  TelTypes &
  AddressTypes &
  ZipTypes &
  PaymethodTypes &
  DateTypes &
  MailTypes & {
    SetOrdererName: React.Dispatch<
      React.SetStateAction<string>
    >;

    SetordererStateChange: React.Dispatch<
      React.SetStateAction<boolean>
    >;

    SetOrderUserInfoChange: React.Dispatch<
      React.SetStateAction<boolean>
    >;

    SetErrorFlag: React.Dispatch<React.SetStateAction<boolean>>;

    ordererName: string;
    ordererPayMethod: string;
    dateErrorState: string;
  };

export type ItemCardsSideTypes = {
  price: number;
  id: number;
  mutate: any;
  pageName: string;
  imagePath: string;
  name: string;
  quantity: number;
  orderPrice: number;
  totalPrice: number;
  setTotalPrice: React.FC | Function;
  gestId: string;
};

export type ItemCardsSideCountTypes = {
  name: string;
  price: number;
  itemsPriceChange: number;
  quantityAdd: number;
  imagePath: string;
  gestId: string;
  id: number;
  totalPrice: number;
  setItemsPriceChange: any;
  setQuantityAdd: any;
  setTotalPrice: React.FC | Function;
  quantity: number;
};

export type ItemCardsWrapTypes = {
  id?: number;
  imagePath: string;
  name?: string;
  price?: number;
  favorite?: string;
  data?: {
    favoriteItem?: FavoriteItem;
    gestId?: string;
    id?: number;
  };
};

export type ItemCardsWrapRecognizeTypes = {
  id?: number;
  imagePath: string;
  name?: string;
  price?: number;
};

export type ItemCardsWrapRecognizeSqlTypes = {
  id?: number;
  imagePath: string;
  name?: string;
  price?: number;
  recommend?: number;
  popular?: number;
  category?: string | string[];
};
