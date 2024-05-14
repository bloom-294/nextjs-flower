import React from "react";

export const PayMethod = (props: { ordererPayMethod: string }) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-7 gap-2 h-24">
          <p className="items-center flex justify-center col-span-2">
            お支払い方法
          </p>
          <p className="items-center flex  col-span-5 ">
            {props.ordererPayMethod}
          </p>
        </div>
      </div>
    </>
  );
};
