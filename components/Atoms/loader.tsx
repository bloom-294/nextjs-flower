import React from 'react'
import style from "../../src/styles/loader.module.css";

export const Loader = () => {
  return (
    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto py-48 px-5   ">

        <div className={`${style.threeDotSpinner}`}>
          <div className={`${style.bounce1}`}></div>
          <div className={`${style.bounce2}`}></div>
          <div className={`${style.bounce3}`}></div>
        </div>
      </div>
    </>
  );

}
