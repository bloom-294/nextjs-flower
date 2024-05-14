import NewItemsList from "components/Organisms/newItemList";
import TopRecognizeList from "components/Organisms/topRecognizeList";
import React from "react";
import RecognizeList from "../Organisms/recognizeList";

export const RecognizeItesSection = () => {
  return (
    <>
      <section>
        <h2 className="flex flex-wrap items-center  justify-center  mt-24  sm:text-2xl">
          おすすめ
        </h2>
        <div className="items-center justify-center flex flex-wrap items-center justify-center ">
          <TopRecognizeList />
        </div>
      </section>
    </>
  );
};
export const NewItemsSection = () => {
  return (
    <>
      <section>
        <h2 className="flex flex-wrap items-center  justify-center  sm:mt-12  sm:text-2xl">
          新入荷
        </h2>
        <div className="items-center justify-center flex flex-wrap items-center justify-center ">
          <NewItemsList />
        </div>
      </section>
    </>
  );
};

export const ItemsSection = () => {
  return (
    <>
      <section>
        <div className="items-center justify-center flex flex-wrap items-center justify-center ">
          <TopRecognizeList />
        </div>
      </section>
    </>
  );
};
