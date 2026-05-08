import useSWR from "swr";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import React from "react";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const TopRecognizeList = (props: { title?: string }) => {


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? null;
  const { data, error } = useSWR(API_BASE_URL ? `${API_BASE_URL}/items` 
    : null, fetcher);

  if (error) return <div></div>;

  if (!data)
    return (
      <>
        {/* <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full"></div> */}
        <div></div>
      </>
    );

  const itemList = [...data].sort((a: any, b: any) => {
    if (a.recommend > b.recommend) return 1;
    if (a.recommend < b.recommend) return -1;
    return 0;
  });
  console.log("b", itemList);

  const recommendItemList: ItemCardsWrapRecognizeSqlTypes[] = itemList.slice(0, 10);

  // console.log("c",recommendItemList)

  // console.log(categoryitemList)

  return (
    <>
      <div className={` my-5`}>
        <h5 className="sm:mb-5">{props.title}</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 gap-y-3">
          {recommendItemList.map(
            (items: ItemCardsWrapRecognizeSqlTypes) => {
              return (
                <ItemCardsWrapRecognize
                  name={items.name}
                  price={items.price}
                  imagePath={items.imagePath}
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

export default TopRecognizeList;
