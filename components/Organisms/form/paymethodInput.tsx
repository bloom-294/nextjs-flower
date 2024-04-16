import React from 'react'
import { PaymethodTypes } from 'types/type'

export const PaymethodInput = (props:PaymethodTypes) => {
  return (
    <div className="my-5 ml-5">
    <div className="mb-2">
      <label htmlFor="address">お支払い方法 </label>
      <span className="bg-red-600 rounded-md p-1 text-sm text-white " style={{ fontSize: "12px" }}>必須</span>
    </div>
    <div>
      
        <label className="radio-inline">
          <input
            className="pay mx-3"
            type="radio"
            name="pay"
            defaultChecked={true}
            value="現金払い"
            onChange={()=>{
              props.SetOrdererPayMethod("現金払い")
              // props.ordererPayMethod.current = "現金払い"
            }}
            />
          現金払い
        </label>
        <label className="radio-inline">
          <input
            className="pay mx-3"
            type="radio"
            name="pay"
            value="クレジット"
            onChange={()=>{
              props.SetOrdererPayMethod("クレジット")
              // props.ordererPayMethod.current = "現金払い"
            }}
          />
          クレジット
          {/* className="address border mr-4 py-1 px-3 rounded-md w-full h-10 focus:outline-none focus:ring-2 z-1" */}
        </label>
      
    </div>
  </div>
  )
}

export default PaymethodInput;
