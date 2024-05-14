import { ChangeEvent } from "react";
import { Error } from "types/type";
import { ConfirmPasswordTypes } from "types/type";

const ConfirmPasswordError = (props: Error) => {
  if (props.errorFlag === "true") {
    if (props.value === "empty" || props.value === "init") {
      return (
        <>
          <label className="Error text-red-500  ml-3 text-sm">
            {props.text}
          </label>
        </>
      );
    } else if (props.value === "mismatch") {
      return (
        <label className="Error text-red-500  ml-3 text-sm">
          パスワードが一致しません
        </label>
      );
    } else if (props.value === "match") {
      return <></>;
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const ConfirmPasswordInput = (props: ConfirmPasswordTypes) => {
  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetConfirmPasswordValue(ev.target.value);

    if (!ev.target.value) {
      props.SetConfirmPasswordErrorState("empty");
    } else if (ev.target.value !== props.passwordValue) {
      props.SetConfirmPasswordErrorState("mismatch");
    } else if (ev.target.value === props.passwordValue) {
      props.SetConfirmPasswordErrorState("ok");
    } else {
      props.SetConfirmPasswordErrorState("ok");
    }
  };
  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="confirm">確認用パスワード </label>
          <span
            className="bg-red-600 rounded-md p-1 text-sm text-white "
            style={{ fontSize: "12px" }}
          >
            必須
          </span>

          <ConfirmPasswordError
            text="確認用パスワードを入力してください"
            value={props.confirmPasswordErrorState}
            // passwordValue={props.passwordValue}
            // SetConfirmPasswordErrorState
            // ={props.SetConfirmPasswordErrorState}
            errorFlag={props.errorFlag}
          />
        </div>
        <div>
          <input
            type="password"
            className="confirm border mr-4 py-1 px-3 rounded-md w-full focus:outline-none focus:ring-2 z-1 h-10"
            id="confirm"
            required
            style={{ width: "430px" }}
            // onChange={onChangeHandler}
            onChange={onChangeHandler}
            placeholder="例）Password123"
            autoComplete="new-password"
          />
        </div>
      </div>
    </>
  );
};
