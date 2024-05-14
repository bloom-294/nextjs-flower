import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { Error, MailTypes } from "types/type";

const Navigation = (props: { value: string; text: string }) => {
  if (props.value.length > 0) {
    return (
      <>
        <div className="py-2 text-gray-500 text-sm mb-8">
          <p>
            {(() => {
              if (props.value.includes("@")) {
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

const Error = (props: Error) => {
  if (props.errorFlag === "true") {
    if (props.value === "empty" || props.value === "init") {
      return (
        <>
          <label className="Error text-red-500  ml-3 text-sm">
            {props.text}
          </label>
        </>
      );
    } else if (props.value === "format-inccorect") {
      return (
        <label className="Error text-red-500  ml-3 text-sm">
          xxx@xxxxの形式で入力してください
        </label>
      );
    } else if (props.value === "registered") {
      return (
        <label className="Error text-red-500  ml-3 text-sm">
          このメールアドレスは使用されています
        </label>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const MailInput = (props: MailTypes) => {
  let mail = "";

  if (props.ordererMail) {
    mail = props.ordererMail;
  } else {
    mail = props.mailValue;
  }

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    props.SetMailValue(ev.target.value);

    if (props.SetOrdererMail) {
      props.SetOrdererMail(ev.target.value);
    }

    if (!ev.target.value) {
      props.SetMailErrorState("empty");
    } else if (!ev.target.value.includes("@")) {
      props.SetMailErrorState("format-inccorect");
    } else {
      props.SetMailErrorState("ok");
    }
  };

  const NavigationDisplay = () => {
    if (props.displayFlag === true) {
      return (
        <>
          <Navigation value={props.mailValue} text="@を含む形式" />
        </>
      );
    } else {
      return <></>;
    }
  };

  const onBlurHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (props.mailErrorState === "ok" && props.register === "register") {
      fetch(`http://localhost:8000/users?mail=${ev.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            props.SetMailErrorState("registered");
          }
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="mail">メールアドレス </label>
          <span
            className="bg-red-600 rounded-md p-1 text-sm text-white "
            style={{ fontSize: "12px" }}
          >
            必須
          </span>
          <Error
            value={props.mailErrorState}
            text="メールアドレスを入力してください"
            // SetMailErrorState={props.SetMailErrorState}
            errorFlag={props.errorFlag}
          />
        </div>
        <div>
          <input
            type="text"
            className="mail border mr-4 py-1 px-3 rounded-md w-full focus:outline-none focus:ring-2 z-1 h-10"
            id="mail"
            required
            style={{ width: "430px" }}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            placeholder="例）mail@example.com"
            defaultValue={mail}
            autoComplete="email"
          />
        </div>

        <NavigationDisplay />
      </div>
    </>
  );
};
