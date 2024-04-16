import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from "next/router";
import { ItemCardsWrap } from "../../components/Organisms/itemCards-wrap";
import { SearchForm } from "components/Molecules/searchForm"
import { Loader } from "components/Atoms/loader";
import RecognizeList from "../../components/Organisms/recognizeList";
import { Calendar } from "components/Molecules/calendar";
import { Information } from "components/Molecules/Information";
import { Map } from "components/Molecules/map";
import { NewItemsSection, RecognizeItesSection, ItemsSection } from "../../components/Molecules/topItemListSection";
import { SearchNavigationbar } from "components/Organisms/searchNavigationbar";
import { Slide } from "components/Molecules/swiper";
import { SlideCursor } from "components/Molecules/swiperCursor";

export const Home = ({data}: any) => {

  const router = useRouter();

  if (!data) return (
    <>
      <Loader />
    </>
  );

  return (
    <>

      <div className="container flex flex-wrap justify-center items-center mx-auto   ">
        <div className="mb-10 -translate-y-10 abusolute">
          <Slide />
          <h3 className="sm:text-2xl mx-8 mt-10">特集</h3>
          <div className="bg-gray-5  sm:mt-4 mt-2">
          <SlideCursor />
          </div>
        </div>



        <main className="mb-5 container flex flex-wrap justify-center items-center mx-auto ">
          <div className=" flex " style={{ height: "100%" }} >
            <div className="hidden xl:flex xl:felx-nowrap xl:justify-start mx-auto">
              <SearchNavigationbar  />
            </div>

            <div className="float-right " style={{ height: "100%" }} >

              <NewItemsSection />
              <RecognizeItesSection />
              <Information />
              <Map />

            </div>

          </div>

        </main>



      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/itemList`);
  const json = await res.json();


  return {
    props: { data: json },
    revalidate: 1
  }
}


export default Home;
