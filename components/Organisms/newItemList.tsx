import useSWR from "swr";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import React from "react";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const NewItemsList = (props: { title?: string }) => {
  const { data, error } = useSWR(`/api/itemList`, fetcher);

  if (error) return <div></div>;

  if (!data)
    return (
      <>
        {/* <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full"></div> */}
        <div></div>
      </>
    );

  const newItemList = [];

  for (let i = 0; i < 10; i++) {
    newItemList.push(data.itemList[i]);
  }

  return (
    <>
      <div className={` my-5`}>
        <h5 className="sm:mb-5">{props.title}</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 gap-y-3">
          {newItemList.map(
            (items: ItemCardsWrapRecognizeSqlTypes) => {
              return (
                <ItemCardsWrapRecognize
                  name={items.name}
                  price={items.price}
                  imagePath={items.imagepath}
                  id={items.id}
                  key={items.id}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default NewItemsList;
