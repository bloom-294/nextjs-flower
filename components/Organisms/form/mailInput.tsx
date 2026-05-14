import type { ChangeEvent } from "react";
import { ErrorMessageProps, MailTypes } from "types/type";

const Navigation = (props: { value: string; text: string }) => {
  if (!props.value) {
    return null;
  }

  const isValid = props.value.includes("@");

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

const ErrorMessage = ({
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
        xxx@xxxxの形式で入力してください
      </label>
    );
  }

  if (value === "registered") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        このメールアドレスは使用されています
      </label>
    );
  }

  return null;
};

export const MailInput = (props: MailTypes) => {
  const mail = props.ordererMail
    ? props.ordererMail
    : props.mailValue;

  const onChangeHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = ev.target.value;

    props.SetMailValue(inputValue);
    props.SetOrdererMail?.(inputValue);

    if (!inputValue) {
      props.SetMailErrorState("empty");
      return;
    }

    if (!inputValue.includes("@")) {
      props.SetMailErrorState("format-incorrect");
      return;
    }

    props.SetMailErrorState("ok");
  };

  const onBlurHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    if (
      props.mailErrorState !== "ok" ||
      props.register !== "register"
    ) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?mail=${ev.target.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          props.SetMailErrorState("registered");
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="mail">メールアドレス </label>
        <span className="rounded-md bg-red-600 p-1 text-xs text-white">
          必須
        </span>
        <ErrorMessage
          value={props.mailErrorState}
          text="メールアドレスを入力してください"
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="mail"
          type="text"
          required
          className="mail mr-4 h-10 w-[430px] rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          placeholder="例）mail@example.com"
          defaultValue={mail}
          autoComplete="email"
        />
      </div>

      {props.displayFlag && (
        <Navigation
          value={props.mailValue}
          text="@を含む形式"
        />
      )}
    </div>
  );
};
