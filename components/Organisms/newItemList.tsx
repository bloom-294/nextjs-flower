import useSWR from "swr";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import React from "react";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const NewItemsList = (props: { title?: string }) => {

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const normalizedBaseUrl = API_BASE_URL.endsWith("/")
  ? API_BASE_URL
  : `${API_BASE_URL}/`;

const { data, error } = useSWR(new URL("items", normalizedBaseUrl).toString(),
  fetcher);

  if (error) return <div></div>;

  if (!data) {
    return <div></div>;
  }

  const newItemList = data.slice(0, 10);

  return (
    <div className="my-5">
      <h5 className="sm:mb-5">{props.title}</h5>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-3">
        {newItemList.map((item: ItemCardsWrapRecognizeSqlTypes) => {
          return (
            <ItemCardsWrapRecognize
              name={item.name}
              price={item.price}
              imagePath={item.imagePath}
              id={item.id}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewItemsList;
