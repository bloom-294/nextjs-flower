import { useEffect, useState } from "react";

export const SearchForm = (props: {
  categoryWord: string | string[];
  setSearchWord: Function;
  setSearchState: Function;
  mutate?: Function;
}) => {
  return (
    <>
      {/* <form id="search"> */}
      <input
        type="text"
        id="search"
        name=""
        placeholder={`${props.categoryWord}から探す`}
        className="relative shadow border rounded-lg w-[500px] h-14 max-w-lg py-2 px-8 text-gray-700 focus:outline-none focus:ring-2 z-1 text-lg"
        onChange={(ev) => {
          props.setSearchWord(ev.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.code === "Enter") {
            // console.log(ev.code);
            props.setSearchState(true);
          } else {
            props.setSearchState(false);
          }
          if (ev.code === "Backspace") {
            // console.log(ev.code);
            props.setSearchState(false);
          }

          // console.log(ev.code);
        }}
      />
      <span className="material-icons absolute translate-x-52 text-gray-400 z-10">
        search
      </span>
      {/* </form> */}
    </>
  );
};
