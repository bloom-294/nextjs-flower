import type { ChangeEvent } from "react";
import { ErrorMessageProps, ZipTypes } from "types/type";

const Navigation = (props: { value: string; text: string }) => {
  if (!props.value) {
    return null;
  }

  const isValid = props.value.includes("-");

  return (
    <div className="mb-8 py-2 text-sm text-gray-500">
      <p>
        <span
          className={`material-symbols-outlined mr-3 translate-y-1.5 rounded-full text-white ${
            isValid ? "bg-[#75ad9d]" : "bg-gray-300"
          }`}
        >
          check_circle
        </span>
        {props.text}
      </p>
    </div>
  );
};

const Error5 = ({
  errorFlag,
  value,
  text,
}: ErrorMessageProps) => {
  if (!errorFlag) {
    return null;
  }

  if (value === "empty" || value === "init") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        {text}
      </label>
    );
  }

  if (value === "format-incorrect") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        xxx-xxxxの形式で入力してください
      </label>
    );
  }

  if (value === "unexist") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        存在する郵便番号を入力してください
      </label>
    );
  }

  return null;
};

export const ZipInput = (props: ZipTypes) => {
  const zip = props.ordererZip
    ? props.ordererZip
    : props.zipValue;

  const validateZip = (value: string) => {
    if (!value) {
      props.SetZipErrorState("empty");
      return false;
    }

    if (!value.match(/^\d{3}-\d{4}$/)) {
      props.SetZipErrorState("format-incorrect");
      return false;
    }

    props.SetZipErrorState("ok");
    return true;
  };

  const onChangeHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (!props.ordererZip) {
      props.SetZipValue(ev.target.value);
      validateZip(ev.target.value);
    }
  };

  const onBlurHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const value = ev.target.value;

    props.SetZipValue(value);
    props.SetOrdererZip?.(value);

    const isValidZip = validateZip(value);

    if (
      props.register !== "register" ||
      !isValidZip
    ) {
      return;
    }

    fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.results === null) {
          props.SetZipErrorState("unexist");
          return;
        }

        props.SetZipErrorState("ok");
      })
      .catch((error) => {
        props.SetZipErrorState("unexist");
        console.log(error);
      });
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="zip">郵便番号 </label>
        <span className="rounded-md bg-red-600 p-1 text-xs text-white">
          必須
        </span>

        <Error5
          text="郵便番号を入力してください"
          value={props.zipErrorState}
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="zip"
          type="text"
          required
          className="zip mr-4 h-10 w-[230px] rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          placeholder="例）123-1234"
          defaultValue={zip}
          autoComplete="postal-code"
        />
      </div>

      <Navigation
        text="-（ハイフン）を含む形式"
        value={props.zipValue}
      />
    </div>
  );
};
