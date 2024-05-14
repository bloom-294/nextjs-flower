import React, { ChangeEvent } from "react";
import { useEffect } from "react";

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

const Error5 = (props: any) => {
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
          xxx-xxxxの形式で入力してください
        </label>
      );
    } else if (props.value === "unexist") {
      return (
        <label className="Error text-red-500  ml-3 text-sm">
          存在する郵便番号を入力してください
        </label>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const ZipInput = (props: any) => {
  let zip = "";

  if (props.ordererZip) {
    zip = props.ordererZip;
  } else {
    zip = props.zipValue;
  }

  const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!props.ordererZip) {
      props.SetZipValue(ev.target.value);

      if (!ev.target.value) {
        props.SetZipErrorState("empty");
      } else if (!ev.target.value.includes("-")) {
        props.SetZipErrorState("format-inccorect");
      } else {
        props.SetZipErrorState("ok");
      }
    }
  };

  const onBlurHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (props.ordererZip) {
      props.SetZipValue(ev.target.value);

      if (props.SetOrdererZip) {
        props.SetOrdererZip(ev.target.value);
      }

      if (!ev.target.value) {
        props.SetZipErrorState("empty");
      } else if (
        !(
          ev.target.value.includes("-") ||
          !ev.target.value.match(/^\d{3}-\d{4}$/)
        )
      ) {
        props.SetZipErrorState("format-inccorect");
      } else {
        props.SetZipErrorState("ok");
      }
    }

    if (props.register === "register" && props.zipErrorState === "ok") {
      fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${ev.target.value}`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results === null) {
            props.SetZipErrorState("unexist");
          } else {
            props.SetZipErrorState("ok");
          }
        })
        .catch((error) => {
          props.SetZipErrorState("unexist");
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="zip">郵便番号 </label>
          <span
            className="bg-red-600 rounded-md p-1 text-sm text-white "
            style={{ fontSize: "12px" }}
          >
            必須
          </span>

          <Error5
            text="郵便番号を入力してください"
            value={props.zipErrorState}
            SetZipErrorState={props.SetZipErrorState}
            errorFlag={props.errorFlag}
          />
        </div>
        <div>
          <input
            type="text"
            className="zip border mr-4 py-1 px-3 rounded-md w-full focus:outline-none focus:ring-2 z-1 h-10"
            id="zip"
            required
            style={{ width: "230px" }}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            placeholder="例）123-1234"
            defaultValue={zip}
            autoComplete="postal-code"
          />
        </div>

        <Navigation text="-（ハイフン）を含む形式" value={props.zipValue} />
      </div>
    </>
  );
};
