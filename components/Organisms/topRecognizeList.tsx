import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { ItemCardsSide } from "components/Organisms/itemCards-side";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import style from "../../src/styles/itemList.module.css";
import Image from "next/image";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const TopRecognizeList = (props: { title?: string }) => {
  const router = useRouter();
  const { data, error, mutate } = useSWR(
    `/api/itemList`,
    fetcher
  );

  if (error) return <div></div>;

  if (!data)
    return (
      <>
        {/* <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full"></div> */}
        <div></div>
      </>
    );

  const recommendItemList = [];

  let itemList = data.itemList.sort(function (a: any, b: any) {
    if (a.recommend > b.recommend) {
      return 1;
    } else {
      return -1;
    }
  });
  console.log("b", itemList);

  for (let i = 0; i < 10; i++) {
    recommendItemList.push(itemList[i]);
  }

  // console.log("c",recommendItemList)

  // console.log(categoryitemList)

  return (
    <>
      <div className={` my-5`}>
        <h5 className="sm:mb-5">{props.title}</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 gap-y-3">
          {recommendItemList.map(
            (items: ItemCardsWrapRecognizeSqlTypes, index: number) => {
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

export default TopRecognizeList;
