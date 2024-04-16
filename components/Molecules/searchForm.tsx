import { useEffect, useState } from "react"

export const SearchForm = (props: {categoryWord:string | string[], setSearchWord: Function, setSearchState: Function, mutate?: Function}) => {

  return (
    <>
      {/* <form > */}
      <input
        type="text"
        id="search"
        placeholder={`${props.categoryWord}から探す`}
        className="relative shadow border rounded-lg w-96  max-w-lg py-2 px-12 text-gray-700 focus:outline-none focus:ring-2 z-1"
        onChange={(ev) => {
          props.setSearchWord(ev.target.value)
        }}
        onKeyDown={(ev) => {
          if (ev.code === "Enter") {
            console.log(ev.code)
            props.setSearchState(true)
          }
          if (ev.code === "Backspace") {
            console.log(ev.code)
            props.setSearchState(false)
          }


          console.log(ev.code)

        }}
      />
      <span className="material-icons absolute   -translate-y-0.5 translate-x-40 text-gray-400 z-10">
        search
      </span>
      {/* </form> */}
    </>
  );
}

// setSearchWord={setSearchWord} setSortState={setSortState}
