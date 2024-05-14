import React from "react";
import style from "../src/styles/itemListWrap.module.css";

export const GreenButton = (props: { name: string }) => {
  return (
    <button
      className={`text-center text-white rounded-lg ml-2 ${style.recognizeButton}`}
    >
      {props.name}
    </button>
  );
};
