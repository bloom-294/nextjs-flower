import { RequiredBadge } from "components/Atoms/requiredBadge";
import type { ChangeEvent } from "react";
import { AddressTypes, ErrorMessageProps } from "types/type";

const ErrorMessage = ({
  errorFlag,
  value,
  text,
}: ErrorMessageProps) => {
  if (!errorFlag) {
    return null;
  }

  if (value !== "empty" && value !== "init") {
    return null;
  }

  return (
    <label className="Error ml-3 sm:text-sm text-xs text-red-500 sm:inline-block block sm:mt-0 mt-2">
      {text}
    </label>
  );
};

export const AddressInput = (props: AddressTypes) => {
  const address = props.ordererAddress
    ? props.ordererAddress
    : props.addressValue;

  const onChangeHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (props.ordererAddress) {
      return;
    }

    props.SetAddressValue(ev.target.value);
    props.SetAddressErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  const onBlurHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (!props.ordererAddress) {
      return;
    }

    props.SetAddressValue(ev.target.value);
    props.SetOrdererAddress?.(ev.target.value);
    props.SetAddressErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="address">住所</label>
        <RequiredBadge />
        <ErrorMessage
          text="住所を入力してください"
          value={props.addressErrorState}
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="address"
          type="text"
          required
          className="address mr-4 h-10 w-full sm:w-[430px] rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          placeholder="例）東京都中央区"
          defaultValue={address}
          autoComplete="street-address"
        />
      </div>
    </div>
  );
};
