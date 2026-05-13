import type { ChangeEvent } from "react";
import {
  ConfirmPasswordTypes,
  ErrorMessageProps,
} from "types/type";

const ConfirmPasswordError = ({
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

  if (value === "mismatch") {
    return (
      <label className="Error ml-3 text-sm text-red-500">
        パスワードが一致しません
      </label>
    );
  }

  return null;
};

export const ConfirmPasswordInput = (
  props: ConfirmPasswordTypes
) => {
  const onChangeHandler = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = ev.target.value;

    props.SetConfirmPasswordValue(confirmPassword);

    if (!confirmPassword) {
      props.SetConfirmPasswordErrorState("empty");
      return;
    }

    if (confirmPassword !== props.passwordValue) {
      props.SetConfirmPasswordErrorState("mismatch");
      return;
    }

    props.SetConfirmPasswordErrorState("ok");
  };

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="confirm">確認用パスワード </label>
        <span className="rounded-md bg-red-600 p-1 text-xs text-white">
          必須
        </span>

        <ConfirmPasswordError
          text="確認用パスワードを入力してください"
          value={props.confirmPasswordErrorState}
          errorFlag={props.errorFlag}
        />
      </div>

      <div>
        <input
          id="confirm"
          type="password"
          required
          className="confirm mr-4 h-10 w-[430px] rounded-md border px-3 py-1 focus:outline-none focus:ring-2"
          onChange={onChangeHandler}
          placeholder="例）Password123"
          autoComplete="new-password"
        />
      </div>
    </div>
  );
};
