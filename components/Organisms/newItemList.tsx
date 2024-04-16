import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from "next/router";
import { ItemCardsSide } from "components/Organisms/itemCards-side";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import style from "../../src/styles/itemList.module.css"
import Image from 'next/image';
import Head from 'next/head';
import React, { useRef, useState } from "react";
import { ItemCardsWrapRecognizeTypes } from 'types/type';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const NewItemsList = (props : {title?:string }) => {

  const router = useRouter();
  const { data, error, mutate } = useSWR(
    `http://localhost:3000/api/itemList`,
    fetcher
  );
  
  if (error) return (
    <div></div>
  );

  if (!data) return (
    <>
      {/* <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full"></div> */}
      <div></div>
    </>
  );
  
  const newItemList = [];  
    
  for ( let i = 0; i < 10 ; i++){
      newItemList.push(data.itemList[i])
  }
    

  return (
    <>

      <div className={` my-5`}>
        <h5 className='sm:mb-5'>{props.title}</h5>
        <div className='grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 gap-y-3'>
          {
            newItemList.map((items: ItemCardsWrapRecognizeTypes, index: number) => {
              return (
                < ItemCardsWrapRecognize name={items.name} price={items.price} imagePath={items.imagePath} id={items.id} key={items.id} />
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default NewItemsList;
