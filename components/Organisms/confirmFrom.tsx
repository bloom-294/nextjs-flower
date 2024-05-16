import React from "react";
import { MailInput } from "components/Organisms/form/mailInput";
import { TelInput } from "components/Organisms/form/telInput";
import { ZipInput } from "components/Organisms/form/zipInput";
import { AddressInput } from "components/Organisms/form/addressInput";
import { PasswordInput } from "components/Organisms/form/passwordInput";
import { NameInput } from "components/Organisms/form/nameInput";
import PaymethodInput from "./form/paymethodInput";
import { useState } from "react";
import { DateInput } from "./form/dateInput";
import { ConfirmFromTypes } from "types/type";

export const ConfirmFrom = (props: ConfirmFromTypes) => {
  return (
    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto py-5 px-5 bg-white-100 my-12">
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
            // SetOrdererName={props.SetOrdererName}
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

          <div className="items-center justify-center flex flex-wrap my-4 ">
            <button
              type="button"
              className="text-white px-6 py-3 rounded-md text-sm mr-3 mt-5 w-96 bg-[#75ad9d] shadow-md focus:shadow-none focus:opacity-70"
              onClick={() => {
                if (
                  (props.firstNameErrorState === "ok" &&
                    props.lastNameErrorState === "ok" &&
                    props.telErrorState === "ok" &&
                    props.zipErrorState === "ok" &&
                    props.addressErrorState === "ok" &&
                    // props.dateErrorState === "ok"
                    props.ordererDateState.current[1] == "ok") ||
                  props.ordererDateState.current[1] == "init"
                ) {
                  // console.log(props.ordererTel);
                  props.SetOrdererName(
                    `${props.ordererLastName} ${props.ordererFirstName}`
                  );
                  // props.SetOrdererMail(props.mailValue)
                  // props.SetOrdererAddress(props.addressValue)
                  // props.SetOrdererTel(props.telValue)
                  // props.SetOrdererZip(props.zipValue)
                  props.SetordererStateChange(false);
                  props.SetOrderUserInfoChange(true);
                } else {
                  props.SetErrorFlag("true");
                }
              }}
            >
              変更
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
