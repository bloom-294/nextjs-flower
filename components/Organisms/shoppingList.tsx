import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { ItemCardsSide } from "components/Organisms/itemCards-side";
import { RecognizeList } from "../Organisms/recognizeList";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import style from "../../src/styles/shoppingCart.module.css";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Loader } from "components/Atoms/loader";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const ShoppingList = (props: { pageName: string }) => {
  const [gestIdValue, SetGestIdValue] = useState("");
  const [loginStatus, SetLoginStatus] = useState("");

  const [initFlag, SetInitFlag] = useState(false);

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
  });

  const { data, error, mutate } = useSWR(
    `http://localhost:8000/carts?gestId=${gestIdValue}`,
    fetcher
  );

  // カートの商品の金額を配列に入れる
  const priceList: any = [];
  if (data) {
    data.map((itemData: any, index: number) => {
      priceList.push(itemData.orderPrice);
    });
  }

  //合計金額算出
  let initTotalPrice = priceList.reduce(function (
    sum: number,
    element: number
  ) {
    return Number(sum) + Number(element);
  },
  0);

  const [totalPrice, setTotalPrice] = useState(Number(initTotalPrice));

  // データベースの値から算出した合計金額（initTotalPrice）と新たに定義した合計金額（totalPrice）が一致していない場合
  useEffect(() => {
    if (initTotalPrice !== 0) {
      if (totalPrice == 0 || totalPrice !== initTotalPrice) {
        setTotalPrice(Number(initTotalPrice));
        mutate();
      }
    }
  }, [initTotalPrice]);

  if (!data)
    return (
      <>
        <Loader />
      </>
    );

  if (error)
    return (
      <div className="container flex flex-wrap justify-center items-center mx-auto py-48 px-5 ">
        An error has occurred.
      </div>
    );

  return (
    <>
      <div className="container flex flex-col justify-center items-center mx-auto py-5 px-5 ">
        {data &&
          data.map(
            (
              shoppingItems: {
                name: string;
                imagePath: string;
                price: number;
                quantity: number;
                id: number;
                gestId: string;
                orderPrice: number;
              },
              index: number
            ) => {
              return (
                <div
                  className={` mb-1 grid sm:gap-1 grid-cols-5 rounded-md md:w-[800px] 
                        `}
                  key={index}
                >
                  <ItemCardsSide
                    name={shoppingItems.name}
                    imagePath={shoppingItems.imagePath}
                    price={shoppingItems.price}
                    quantity={shoppingItems.quantity}
                    id={shoppingItems.id}
                    gestId={shoppingItems.gestId}
                    orderPrice={shoppingItems.orderPrice}
                    pageName={props.pageName}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    mutate={() => {
                      mutate();
                    }}
                  />
                </div>
              );
            }
          )}

        <hr className={`${style.line}`} />
        <div className=" mt-10 mb-5 px-5 ">
          <p className="text-sm">
            合計金額&nbsp;&nbsp;&nbsp;
            <span className="text-[35px]  text-[#75ad9d]  ">
              {totalPrice.toLocaleString()}
            </span>{" "}
            &nbsp;円(税込)
          </p>
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
