import { RequiredBadge } from "components/Atoms/requiredBadge";
import type { ChangeEvent } from "react";
import { NameError, NameTypes } from "types/type";

const Error3 = ({
  errorFlag,
  value1,
  value2,
  text,
}: NameError) => {
  if (!errorFlag) {
    return null;
  }

  if (
    value1 === "empty" ||
    value2 === "empty" ||
    value1 === "init" ||
    value2 === "init"
  ) {
    return (
      <label className="Error ml-3 sm:text-sm text-xs text-red-500 sm:inline-block block sm:mt-0 mt-2 ">
        {text}
      </label>
    );
  }

  return null;
};

export const NameInput = (props: NameTypes) => {
  const isConfirm = !!props.SetOrdererLastName;

  const lastName = props.ordererLastName || "";
  const firstName = props.ordererFirstName || "";

  const onChangeHandlerLast = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (isConfirm) {
      return;
    }

    props.SetLastNameValue(ev.target.value);
    props.SetLastNameErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  const onBlurHandlerLast = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (!isConfirm) {
      return;
    }

    props.SetLastNameValue(ev.target.value);
    props.SetOrdererLastName?.(ev.target.value);
    props.SetLastNameErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  const onChangeHandlerFirst = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (isConfirm) {
      return;
    }

    props.SetFirstNameValue(ev.target.value);
    props.SetFirstNameErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  const onBlurHandlerFirst = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (!isConfirm) {
      return;
    }

    props.SetFirstNameValue(ev.target.value);
    props.SetOrdererFirstName?.(ev.target.value);
    props.SetFirstNameErrorState(
      ev.target.value ? "ok" : "empty"
    );
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="nameForm1">お名前</label>
        <RequiredBadge />
        <Error3
          text="名前を入力してください"
          value1={props.lastNameErrorState}
          value2={props.firstNameErrorState}
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="nameForm1"
          type="text"
          className="name mr-4 h-10 rounded-md border px-3 py-1 focus:border focus:border-gray-100 focus:outline-none focus:ring-2 mb-2 sm:mb-0"
          placeholder="例）田中"
          onBlur={onBlurHandlerLast}
          onChange={onChangeHandlerLast}
          defaultValue={lastName}
          autoComplete="family-name"
        />

        <input
          id="nameForm2"
          type="text"
          className="name mr-4 h-10 rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          placeholder="例）太郎"
          onBlur={onBlurHandlerFirst}
          onChange={onChangeHandlerFirst}
          defaultValue={firstName}
          autoComplete="given-name"
        />
      </div>
    </div>
  );
};
