import React from "react";

type SearchFormProps = {
  categoryWord: string | string[];
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setSearchState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchForm = ({
  categoryWord,
  setSearchWord,
  setSearchState,
}: SearchFormProps) => {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setSearchState(true);
      }}
    >
      <input
        id="search"
        type="text"
        placeholder={`${categoryWord}から探す`}
        className="
          h-14
          w-[90vw]
          max-w-lg
          rounded-lg
          border
          px-4
          py-2
          text-lg
          text-gray-700
          shadow
          focus:outline-none
          focus:ring-2
          sm:w-[500px]
          sm:px-8
        "
        onChange={(ev) => {
          setSearchWord(ev.target.value);
          setSearchState(false);
        }}
        onKeyDown={(ev) => {
          if (ev.nativeEvent.isComposing || ev.keyCode === 229) return;

          if (ev.key === "Backspace" && ev.currentTarget.value === "") {
            setSearchState(false);
          }
        }}
      />
      <span 
        className="
          material-icons
          absolute
          right-[10%]
          z-10
          translate-x-0
          text-gray-400
          sm:right-auto
          sm:translate-x-52
      ">
        search
      </span>
    </form>
  );
};
