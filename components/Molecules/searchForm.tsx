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
      <span className="material-icons absolute sm:translate-x-52 translate-x-0 sm:right-auto right-[10%] text-gray-400 z-10">
        search
      </span>
      {/* </form> */}
    </>
  );
};
