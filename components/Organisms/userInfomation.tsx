import useSWR, { useSWRConfig } from "swr";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserInfo } from "types/type";

export const UserInfomation = (props: UserInfo) => {
  if (!props.name) return <></>;

  if (props.orderUserInfoChange === false) {
    return (
      <div className="mb-1 rounded-md">
        <div className="grid gap-1 grid-cols-7  h-24 ">
          <p className=" items-center flex justify-center col-span-2">
            お届け先
          </p>
          <div className="col-span-4 items-center flex ">
            <ul>
              <li>{props.name}　様</li>
              <li>〒{props.zip}</li>
              <li>{props.address}</li>
              <li>{props.tel}</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-1 rounded-md">
        <div className="grid gap-1 grid-cols-7  h-24 ">
          <p className=" items-center flex justify-center col-span-2">
            お届け先
          </p>
          <div className="col-span-4 items-center flex ">
            <ul>
              <li>{props.ordererName}　様</li>
              <li>〒{props.ordererZip}</li>
              <li>{props.ordererAddress}</li>
              <li>{props.ordererTel}</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
