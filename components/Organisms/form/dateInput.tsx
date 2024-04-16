import { useEffect } from '@storybook/addons'
import React, { FC } from 'react'
import { useState, useRef } from 'react'
import { DateTypes } from "types/type";


const Error = (props: { state: string | undefined; text: string; ordererDateState: any }) => {

  console.log(2, typeof (props.ordererDateState))
  if (props.state === "日時指定あり") {

    if (props.ordererDateState[2] === undefined) {
      return (
        <>
          <label className="Error text-red-500  ml-3 text-sm">{props.text}</label>
        </>
      )
    } else if (props.ordererDateState[1] === "impossible") {
      return (
        <>
          <label className="Error text-red-500  ml-3 text-sm">６日後以降を選択してください。</label>
        </>
      );
    } else {
      return (
        <></>
      )
    }
  } else {
    return <></>
  }
}



export const DateInput = (props: {
  // ordererDateState: { current: string[] } ,
  ordererDateState: any ,
  SetDateErrorState: Function | FC<{}> | undefined,
  SetOrdererDate: Function | FC<{}> | undefined,
  ordererDate: string | undefined,
  errorFlag: string
}) => {

  const [state, SetState] = useState(props?.ordererDateState?.current[1])

  const Input = () => {
    console.log(1, typeof (props.SetDateErrorState))

    // 2073617790
    if (state === "日時指定あり") {
      return (
        <>
          <div className="my-5 ml-5">
            <input
              type="date"
              name="name"
              id="date"
              className={`form-control px-3 py-1 rounded-md border`}
              pattern="\d{4},\d{1},\d{1}"
              onChange={(e) => {
                props.ordererDateState.current[2] = String(e.target.value)
                // props.SetOrdererDate(e.target.value)
                if (e.target.value === undefined) {
                  // props.SetDateErrorState("empty")
                  props.ordererDateState.current[1] = "empty"
                } else {
                  const currentDate = new Date();
                  const Specified = new Date();

                  // 現時点での日付を指定
                  currentDate.setFullYear(currentDate.getFullYear());
                  currentDate.setMonth(Number(currentDate.getMonth()) + 1);
                  currentDate.setDate(currentDate.getDate());
                  currentDate.setHours(0, 0, 0);

                  // 選択された日付を指定
                  let split = props.ordererDateState.current[2].split('-');
                  Specified.setFullYear(Number(split[0]));
                  Specified.setMonth(Number(split[1]));
                  Specified.setDate(Number(split[2]));
                  Specified.setHours(0, 0, 0);
                  console.log("c", Number(Specified), Number(currentDate), (Number(Specified) - Number(currentDate)))
                  // ６日後以降を選択しているか
                  if (
                    Number(Specified) - Number(currentDate) <=
                    518400017
                  ) {
                    props.ordererDateState.current[1] = "impossible"
                    console.log("no")
                  } else {
                    props.ordererDateState.current[1] = "ok"
                    // props.SetDateErrorState("ok")
                  }
                }
              }}

            />
          </div>
        </>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className="my-5 ml-5">
        <div className="mb-2">
          <label htmlFor="address">配達日 </label>
          <span className="bg-red-600 rounded-md p-1 text-sm text-white " style={{ fontSize: "12px" }}>必須</span>
          <Error
            text="配達日（６日後以降）を選択してください"
            // SetDateErrorState={props.SetDateErrorState}
            ordererDateState={props.ordererDateState}
            state={state}
          // errorFlag={props.errorFlag}
          />
        </div>
        <div>

          <label className="radio-inline">
            <input
              className="pay mx-3"
              type="radio"
              name="date"
              defaultChecked={true}
              value="日時指定なし"
              onClick={() => {
                // props.SetOrdererDateState("日時指定なし")
                SetState("日時指定なし")
                props.ordererDateState.current[0] = "日時指定なし"
                // console.log(props.ordererDateState.current)
              }}
            />
            日時指定なし
          </label>
          <label htmlFor="fixedDate">
            <input
              className="pay mx-3"
              type="radio"
              name="date"
              id="fixedDate"
              value="日時指定あり"
              onClick={() => {
                // props.SetOrdererDateState("日時指定あり")
                SetState("日時指定あり")
                props.ordererDateState.current[0] = "日時指定あり"
                // console.log(props.ordererDateState.current)
              }}
            />
            日時指定あり
            {/* className="address border mr-4 py-1 px-3 rounded-md w-full h-10 focus:outline-none focus:ring-2 z-1" */}
          </label>
          <label htmlFor="sameDayDelivery">
            <input
              className="pay mx-3"
              type="radio"
              name="date"
              id="sameDayDelivery"
              value="即日配送"
              onClick={() => {
                // props.SetOrdererDateState("即日配送")
                SetState("即日配送")
                props.ordererDateState.current[0] = "即日配送"
                // console.log(props.ordererDateState.current)
              }}
            />
            即日配送
            {/* className="address border mr-4 py-1 px-3 rounded-md w-full h-10 focus:outline-none focus:ring-2 z-1" */}
          </label>

          {/* 指定ありが選択されたら表示 */}
          <Input
            // SetDateErrorState={props.SetDateErrorState} 
            // SetOrdererDate={props.SetOrdererDate}
            //  ordererDateState={props.ordererDateState} 
             />

        </div>
      </div>
    </>
  )
}
