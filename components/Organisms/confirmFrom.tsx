import { TelInput } from "components/Organisms/form/telInput";
import { ZipInput } from "components/Organisms/form/zipInput";
import { AddressInput } from "components/Organisms/form/addressInput";
import { NameInput } from "components/Organisms/form/nameInput";
import PaymethodInput from "./form/paymethodInput";
import { DateInput } from "./form/dateInput";
import { ConfirmFromTypes } from "types/type";

export const ConfirmFrom = (props: ConfirmFromTypes) => {
  
  const getIsValidForm = () =>
  props.firstNameErrorState === "ok" &&
  props.lastNameErrorState === "ok" &&
  props.telErrorState === "ok" &&
  props.zipErrorState === "ok" &&
  props.addressErrorState === "ok" &&
  (props.ordererDateState.current[1] === "ok" ||
    props.ordererDateState.current[1] === "init");

  return (
    <div className="container mx-auto my-12 flex flex-wrap items-center justify-center bg-white-100 p-5">
      <form className="bg-gray-50 p-4 rounded-xl">
        <NameInput
          lastNameValue={props.lastNameValue}
          SetLastNameValue={props.SetLastNameValue}
          firstNameValue={props.firstNameValue}
          SetFirstNameValue={props.SetFirstNameValue}
          firstNameErrorState={props.firstNameErrorState}
          SetFirstNameErrorState={props.SetFirstNameErrorState}
          lastNameErrorState={props.lastNameErrorState}
          SetLastNameErrorState={props.SetLastNameErrorState}
          errorFlag={props.errorFlag}
          SetOrdererFirstName={props.SetOrdererFirstName}
          SetOrdererLastName={props.SetOrdererLastName}
          ordererLastName={props.ordererLastName}
          ordererFirstName={props.ordererFirstName}
          displayFlag={false}
        />
        <hr />

        <TelInput
          telValue={props.telValue}
          SetTelValue={props.SetTelValue}
          telErrorState={props.telErrorState}
          SetTelErrorState={props.SetTelErrorState}
          errorFlag={props.errorFlag}
          ordererTel={props.ordererTel}
          SetOrdererTel={props.SetOrdererTel}
        />
        <hr />

        <ZipInput
          zipValue={props.zipValue}
          SetZipValue={props.SetZipValue}
          zipErrorState={props.zipErrorState}
          SetZipErrorState={props.SetZipErrorState}
          errorFlag={props.errorFlag}
          ordererZip={props.ordererZip}
          SetOrdererZip={props.SetOrdererZip}
        />
        <hr />
        <AddressInput
          addressValue={props.addressValue}
          SetAddressValue={props.SetAddressValue}
          addressErrorState={props.addressErrorState}
          SetAddressErrorState={props.SetAddressErrorState}
          errorFlag={props.errorFlag}
          ordererAddress={props.ordererAddress}
          SetOrdererAddress={props.SetOrdererAddress}
        />
        <hr />

        <PaymethodInput SetOrdererPayMethod={props.SetOrdererPayMethod} />
        <hr />

        <DateInput
          ordererDateState={props.ordererDateState}
          SetDateErrorState={props.SetDateErrorState}
          SetOrdererDate={props.SetOrdererDate}
          ordererDate={props.ordererDate}
          errorFlag={props.errorFlag}
        />

        <div className="my-4 flex flex-wrap items-center justify-center">
          <button
            type="button"
            className="mt-5 w-96 rounded-md bg-[#75ad9d] px-6 py-3 text-sm text-white shadow-md focus:opacity-70 focus:shadow-none"
            onClick={() => {
              if (getIsValidForm()) {
                props.SetOrdererName(
                  `${props.ordererLastName} ${props.ordererFirstName}`
                );
                props.SetordererStateChange(false);
                props.SetOrderUserInfoChange(true);
              } else {
                props.SetErrorFlag(true);
              }
            }}
          >
            変更
          </button>
        </div>
      </form>
    </div>
  );
};
