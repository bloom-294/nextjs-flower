import React from "react";
import { Loader } from "components/Atoms/loader";
import { Information } from "components/Molecules/Information";
import { Map } from "components/Molecules/map";
import {
  NewItemsSection,
  RecognizeItesSection,
} from "../../components/Molecules/topItemListSection";
import { SearchNavigationbar } from "components/Organisms/searchNavigationbar";
import { Slide } from "components/Molecules/swiper";
import { SlideCursor } from "components/Molecules/swiperCursor";

export const Home = ({ data }: any) => {

  if (!data)
    return (
      <>
        <Loader />
      </>
    );

  // console.log(data.itemList[1])

  return (
    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto">
        <div className="mb-10 -translate-y-10 abusolute">
          <Slide />
          <h3 className="sm:text-2xl mx-8 mt-10">特集</h3>
          <div className="bg-gray-5 sm:mt-4 mt-2">
            <SlideCursor />
          </div>
        </div>

        <main className="mb-5 container flex flex-wrap justify-center items-center mx-auto ">
          <div className=" flex " style={{ height: "100%" }}>
            <div className="hidden xl:flex xl:felx-nowrap xl:justify-start mx-auto">
              <SearchNavigationbar />
            </div>

            <div className="float-right " style={{ height: "100%" }}>
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
};

export const getStaticProps = async () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL
    : `${API_BASE_URL}/`;
  const res = await fetch(new URL("items", normalizedBaseUrl).toString());
  const json = await res.json();

  return {
    props: { data: json },
    revalidate: 1,
  };
};

export default Home;
