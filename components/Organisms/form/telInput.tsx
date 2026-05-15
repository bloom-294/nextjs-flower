import { RequiredBadge } from "components/Atoms/requiredBadge";
import React, { ChangeEvent } from "react";
import { ErrorMessageProps , TelTypes } from "types/type";

const Navigation = (props: { value: string; text: string }) => {
  if (props.value.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (props.value.includes("-")) {
                return (
                  <>
                    <span
                      className="material-symbols-outlined 
                  rounded-full mr-3 text-white translate-y-1.5
                  "
                      style={{ backgroundColor: "#75ad9d" }}
                    >
                      check_circle
                    </span>
                  </>
                );
              } else {
                return (
                  <>
                    <span
                      className="material-symbols-outlined 
                  rounded-full mr-3 text-white translate-y-1.5 bg-gray-300
                  "
                    >
                      check_circle
                    </span>
                  </>
                );
              }
            })()}
            {props.text}
          </p>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

const Error4 = (props: ErrorMessageProps) => {
  if (props.errorFlag === true) {
    if (props.value === "empty" || props.value === "init") {
      return (
        <>
          <label className="Error text-red-500 ml-3 sm:text-sm text-xs sm:inline-block block sm:mt-0 mt-2">
            {props.text}
          </label>
        </>
      );
    } else if (props.value === "format-incorrect") {
      return (
        <label className="Error text-red-500 ml-3 sm:text-sm text-xs sm:inline-block block sm:mt-0 mt-2">
          xxx-xxxx-xxxxの形式で入力してください
        </label>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const TelInput = (props: TelTypes) => {
  let tel = "";

  if (props.ordererTel) {
    tel = props.ordererTel;
  } else {
    tel = props.telValue;
  }

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!props.ordererTel) {
      props.SetTelValue(ev.target.value);

      if (!ev.target.value) {
        props.SetTelErrorState("empty");
      } else if (!ev.target.value.includes("-")) {
        props.SetTelErrorState("format-incorrect");
      } else {
        props.SetTelErrorState("ok");
      }
    }
  };
const onBlurHandler = (ev: ChangeEvent<HTMLInputElement>) => {
  const value = ev.target.value;

  props.SetTelValue(value);
  props.SetOrdererTel?.(value);

  if (!value) {
    props.SetTelErrorState("empty");
  } else if (!value.includes("-")) {
    props.SetTelErrorState("format-incorrect");
  } else {
    props.SetTelErrorState("ok");
  }
};

  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="tel">電話番号</label>
          <RequiredBadge />
          <Error4
            value={props.telErrorState}
            text="電話番号を入力してください"
            // SetTelErrorState={props.SetTelErrorState}
            errorFlag={props.errorFlag}
          />
        </div>
        <div>
          <input
            type="text"
            className="tel border mr-4 py-1 px-3 rounded-md focus:outline-none focus:ring-2 z-1 h-10 w-full sm:w-[430px]"
            id="tel"
            required
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            placeholder="例）123-1234-1234"
            defaultValue={tel}
            autoComplete="tel"
          />
        </div>
        <Navigation text="-（ハイフン）を含む形式" value={props.telValue} />
      </div>
    </>
  );
};
