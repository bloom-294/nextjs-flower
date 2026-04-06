export const SearchForm = (props: {
  categoryWord: string | string[];
  setSearchWord: Function;
  setSearchState: Function;
  mutate?: Function;
  itemListLength: boolean;
  onChange: () => void;
}) => {
  return (
    <>
      {/* <form id="search"> */}
      <input
        type="text"
        id="search"
        name=""
        placeholder={`${props.categoryWord}から探す`}
        className="relative shadow border rounded-lg sm:w-[500px] w-[90vw] h-14 max-w-lg py-2 sm:px-8 px-4 text-gray-700 focus:outline-none focus:ring-2 z-1 text-lg"
        onChange={(ev) => {
          props.setSearchWord(ev.target.value);
          props.setSearchState(false);
        }}
        onKeyDown={(ev) => {
          if (ev.nativeEvent.isComposing || ev.keyCode === 229) return;

          if (ev.key === "Enter") {
            ev.preventDefault();
            props.setSearchState(true);
          }

          if (ev.key === "Backspace" && ev.currentTarget.value === "") {
            props.setSearchState(false);
          }

        }}
      />
      <span className="material-icons absolute sm:translate-x-52 translate-x-0 sm:right-auto right-[10%] text-gray-400 z-10">
        search
      </span>
      {/* </form> */}
    </>
  );
};
