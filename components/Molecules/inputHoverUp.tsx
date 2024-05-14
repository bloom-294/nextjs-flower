import React from "react";

export const inputHoverUp = () => {
  return (
    <>
      <div>
        <label htmlFor="nameForm">
          <div
            className=" 
              translate-y-2
              translate-x-6
              absolute
              z-10
              text-black-500
              bg-white
              hover:text-black
              rounded-full
               "
          >
            姓
          </div>
        </label>
        <input
          type="text"
          className="name
              z-1
              border mr-4 py-1 px-3 rounded-md
              absolute
              focus:translate-y-5 translate-y-1
              translate-x-3   text-gray-400   focus:ease-in-out focus:duration-300 
              focus:z-1
              "
          id="nameForm"
          required
        />
      </div>
    </>
  );
};
