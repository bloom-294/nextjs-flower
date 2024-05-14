import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { NameError, NameTypes } from "types/type";

const Error3 = (props: NameError) => {
  if (props.errorFlag === "true") {
    if (
      props.value1 === "empty" ||
      props.value2 === "empty" ||
      props.value1 === "init" ||
      props.value2 === "init"
    ) {
      return (
        <>
          <label className="Error text-red-500  ml-3 text-sm">
            {props.text}
          </label>
        </>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const NameInput = (props: NameTypes) => {
  // confirmでの初期値設定
  let lastName = "";
  let firstName = "";

  if (props.ordererFirstName) {
    firstName = props.ordererFirstName;
  }

  if (props.ordererLastName) {
    lastName = props.ordererLastName;
  }

  // registerはonChange
  const onChangeHandlerLast = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!props.SetOrdererLastName) {
      props.SetLastNameValue(ev.target.value);

      if (!ev.target.value) {
        props.SetLastNameErrorState("empty");
      } else {
        props.SetLastNameErrorState("ok");
      }
    }
  };

  // confirmはonBlur
  const onBlurHandlerLast = (ev: ChangeEvent<HTMLInputElement>) => {
    if (props.SetOrdererLastName) {
      props.SetLastNameValue(ev.target.value);

      if (props.SetOrdererLastName) {
        props.SetOrdererLastName(ev.target.value);
      }
      if (props.ordererLastName) {
        lastName = props.ordererLastName;
      }

      if (!ev.target.value) {
        props.SetLastNameErrorState("empty");
      } else {
        props.SetLastNameErrorState("ok");
      }
    }
  };

  const onChangeHandlerFirst = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!props.SetOrdererLastName) {
      props.SetFirstNameValue(ev.target.value);

      if (!ev.target.value) {
        props.SetFirstNameErrorState("empty");
      } else {
        props.SetFirstNameErrorState("ok");
      }
    }
  };

  const onBlurHandlerFirst = (ev: ChangeEvent<HTMLInputElement>) => {
    if (props.SetOrdererLastName !== undefined) {
      props.SetFirstNameValue(ev.target.value);

      if (props.SetOrdererFirstName) {
        props.SetOrdererFirstName(ev.target.value);
      }
      if (props.ordererFirstName) {
        firstName = props.ordererFirstName;
      }

      if (!ev.target.value) {
        props.SetFirstNameErrorState("empty");
      } else {
        props.SetFirstNameErrorState("ok");
      }
    }
  };

  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="name">お名前 </label>
          <span
            className="bg-red-600 rounded-md p-1 text-sm text-white "
            style={{ fontSize: "12px" }}
          >
            必須
          </span>
          <Error3
            text="名前を入力してください"
            value1={props.lastNameErrorState}
            value2={props.firstNameErrorState}
            errorFlag={props.errorFlag}
          />
        </div>
        <div>
          <input
            type="text"
            className="name border mr-4 py-1 px-3 rounded-md    focus:border focus:border-gray-100  focus:outline-none focus:ring-2 z-1 h-10
              "
            id="nameForm1"
            placeholder="例）田中"
            onBlur={onBlurHandlerLast}
            onChange={onChangeHandlerLast}
            defaultValue={lastName}
            autoComplete="family-name"
          />
          <input
            type="text"
            className="name border mr-4 py-1 px-3 rounded-md focus:outline-none focus:ring-2 z-1 h-10"
            id="nameForm2"
            placeholder="例）太郎"
            onBlur={onBlurHandlerFirst}
            onChange={onChangeHandlerFirst}
            // defaultValue={firstName}
            defaultValue={firstName}
            autoComplete="given-name"
          />
        </div>
      </div>
    </>
  );
};
