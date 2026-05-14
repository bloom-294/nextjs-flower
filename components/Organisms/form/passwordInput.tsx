import type { ChangeEvent } from "react";
import { ErrorMessageProps, PasswordTypes } from "types/type";

const Navigation = (props: { value: string; text: string }) => {
  if (!props.value) {
    return null;
  }

  const isValid =
    props.value.length >= 8 && props.value.length <= 16;

  return (
    <div className="py-2 text-sm text-gray-500">
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
        8文字以上16文字以下で入力してください
      </label>
    );
  }

  if (value === "mismatch") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        パスワードが一致しません
      </label>
    );
  }

  return null;
};

export const PasswordInput = (props: PasswordTypes) => {
  const onChangeHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const password = ev.target.value;

    props.SetPasswordValue(password);

    if (!password) {
      props.SetPasswordErrorState("empty");
    } else if (password.length < 8 || password.length > 16) {
      props.SetPasswordErrorState("format-incorrect");
    } else {
      props.SetPasswordErrorState("ok");
    }

    if (!props.displayFlag) {
      return;
    }

    if (password !== props.confirmPasswordValue) {
      props.SetConfirmPasswordErrorState("mismatch");
      return;
    }

    props.SetConfirmPasswordErrorState("ok");
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="password">パスワード </label>
        <span className="rounded-md bg-red-600 p-1 text-xs text-white">
          必須
        </span>
        <ErrorMessage
          text="パスワードを入力してください"
          value={props.passwordErrorState}
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="password"
          type="password"
          required
          className="password mr-4 h-10 w-[430px] rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          onChange={onChangeHandler}
          placeholder="例）Password123"
          autoComplete="new-password"
        />
      </div>

      {props.displayFlag && (
        <Navigation
          text="8文字以上16文字以下"
          value={props.passwordValue}
        />
      )}
    </div>
  );
};
