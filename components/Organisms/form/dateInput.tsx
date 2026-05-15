import { RequiredBadge } from "components/Atoms/requiredBadge";
import React from "react";
import { useState } from "react";

const Error = (props: {
  state: string | undefined;
  text: string;
  dateErrorState: string | undefined;
}) => {
  if (props.state !== "日時指定あり") {
    return null;
  }

  if (props.dateErrorState === "empty") {
    return (
      <span className="Error ml-3 sm:text-sm text-xs text-red-500 sm:inline-block block sm:mt-0 mt-2">
        {props.text}
      </span>
    );
  }

  if (props.dateErrorState === "impossible") {
    return (
      <span className="Error sm:ml-3 sm:text-sm text-xs text-red-500 sm:inline-block block sm:mt-0 mt-2">
        ６日後以降を選択してください。
      </span>
    );
  }

  return null;
};

export const DateInput = (props: {
  ordererDateState: {
    current: string[];
  } ;
  SetDateErrorState: React.Dispatch<React.SetStateAction<string>> | undefined;
  SetOrdererDate: React.Dispatch<React.SetStateAction<string>> | undefined;
  ordererDate: string | undefined;
  errorFlag: boolean;
}) => {
  const [deliveryType, setDeliveryType] = useState(props?.ordererDateState?.current[0]);
  const [dateErrorState, setDateErrorState] = useState(
  props.ordererDateState.current[1]);
  const SIX_DAYS_MS = 1000 * 60 * 60 * 24 * 6;

  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label htmlFor="address">配達日</label>
        <RequiredBadge />
        <Error
          text="配達日（６日後以降）を選択してください"
          state={deliveryType}
          dateErrorState={dateErrorState}
        />
      </div>
      <div className="">
        <label className="radio-inline sm:inline-block block">
          <input
            className="pay mx-3"
            type="radio"
            name="date"
            defaultChecked={true}
            value="日時指定なし"
            onClick={() => {
              setDeliveryType("日時指定なし");
              props.ordererDateState.current[0] = "日時指定なし";
              props.ordererDateState.current[1] = "ok";
              setDateErrorState("ok");
            }}
          />
          日時指定なし
        </label>
        <label htmlFor="fixedDate" className="sm:inline-block block">
          <input
            className="pay mx-3"
            type="radio"
            name="date"
            id="fixedDate"
            value="日時指定あり"
            onClick={() => {
              setDeliveryType("日時指定あり");
              setDateErrorState("empty");
              props.ordererDateState.current[0] = "日時指定あり";
              props.ordererDateState.current[1] = "empty";
            }}
          />
          日時指定あり
        </label>
        <label htmlFor="sameDayDelivery" className="sm:inline-block block">
          <input
            className="pay mx-3"
            type="radio"
            name="date"
            id="sameDayDelivery"
            value="即日配送"
            onClick={() => {
              setDeliveryType("即日配送");
              props.ordererDateState.current[0] = "即日配送";
              props.ordererDateState.current[1] = "ok";
              setDateErrorState("ok");
            }}
          />
          即日配送
        </label>

        {/* 指定ありが選択されたら表示 */}
        {deliveryType === "日時指定あり" && (
          <div className="my-5 ml-5">
            <input
              type="date"
              name="name"
              id="date"
              className="form-control rounded-md border px-3 py-1"
              pattern="\d{4},\d{1},\d{1}"
              onChange={(e) => {
                props.ordererDateState.current[2] = String(e.target.value);

                if (!e.target.value) {
                  props.ordererDateState.current[1] = "empty";
                  setDateErrorState("empty");
                  return;
                }

                const currentDate = new Date();
                const specifiedDate = new Date();

                currentDate.setHours(0, 0, 0, 0);

                const split = props.ordererDateState.current[2].split("-");

                specifiedDate.setFullYear(Number(split[0]));
                specifiedDate.setMonth(Number(split[1]) - 1);
                specifiedDate.setDate(Number(split[2]));
                specifiedDate.setHours(0, 0, 0, 0);

                console.log({
                  currentDate,
                  specifiedDate,
                  diff: Number(specifiedDate) - Number(currentDate),
                  SIX_DAYS_MS,
                });

                if (Number(specifiedDate) - Number(currentDate) <= SIX_DAYS_MS) {
                  props.ordererDateState.current[1] = "impossible";
                  setDateErrorState("impossible");
                  return;
                } else {
                  props.ordererDateState.current[1] = "ok";
                  setDateErrorState("ok");
                }

                console.log(222222,props.ordererDateState.current[1]);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
