import useSWR, { useSWRConfig } from "swr";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ItemCardsSide } from "components/Organisms/itemCards-side";
import { RecognizeList } from "components/Organisms/recognizeList";
import { ShoppingList } from "components/Organisms/shoppingList";
import style from "../../styles/shoppingCart.module.css";
import Image from "next/image";
import Head from "next/head";
import { Loader } from "components/Atoms/loader";

export const Home = () => {
  const [gestIdValue, SetGestIdValue] = useState("");
  const [loginStatus, SetLoginStatus] = useState("");

  useEffect(() => {
    const splitCookie = document.cookie.split(";");
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    list.map((cookieData, index) => {
      // ゲストID取得
      if (cookieData.includes("gestId")) {
        SetGestIdValue(cookieData[1]);
      }
      if (cookieData.includes("login")) {
        SetLoginStatus(cookieData[1]);
      }
    });
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="mb-7">
        <div className=" flex flex-wrap justify-center items-center mt-7">
          <h1 className="text-bold text-[#75ad9d] text-[30px]">
            ショッピングカート
          </h1>
        </div>
        <div className="container flex flex-col justify-center items-center mx-auto py-5 px-5 ">
          <ShoppingList pageName="ショッピングカート" />

          <button
            className="bg-[#75ad9d] text-white rounded-lg py-4  m-4  w-[70%] sm:w-[450px] md:w-[500px] xl:w-[600px] 2xl:w-[600px] shadow-lg"
            type="button"
            onClick={() => {
              if (!loginStatus) {
                console.log(loginStatus);
                router.push("/users/login");
                document.cookie = "carts=confirm; path=/;";
              } else {
                console.log(loginStatus);
                router.push("/carts/confirm");
              }
            }}
          >
            {" "}
            レジへ進む
          </button>

          <RecognizeList title="おすすめ" category="" itemId={0} />
        </div>
      </div>
    </>
  );
};

export default Home;
