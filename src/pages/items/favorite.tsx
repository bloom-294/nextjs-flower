import { ItemCardsWrap } from "components/Organisms/itemCards-wrap";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "components/Atoms/loader";

export const Favorite = () => {
  const gestIdValue = useRef("");
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    // ゲストID取得
    const splitCookie = document.cookie.split(";");
    const list: string[][] = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    list.forEach((cookieData) => {
      if (cookieData.includes(" gestId") || cookieData.includes("gestId")) {
        gestIdValue.current = cookieData[1];
      }
    });

    // API取得
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/favorite`); 
        const json = await res.json();
        setData(json);
      } catch {
        setData([]);
      }
    };

    fetchFavorites();
  }, []);

  if (data === null) return <Loader />;

  const ErrorMessage = () =>
    data.length === 0 ? (
      <p className=" translate-y-8 translate-x-24 ">該当する商品がありません。</p>
    ) : null;

  return (
    <div className="container flex flex-wrap justify-center items-center mx-auto py-5 px-5">
      <div className="flex flex-nowrap" style={{ height: "100%" }}>
        <div className="float-right" style={{ height: "100%" }}>
          <div className="flex flex-wrap justify-center items-center">
            <h1 className="text-[#75ad9d] text-[30px]">お気に入り</h1>
            <ErrorMessage />
          </div>

          <div className="my-12 grid gap-10 grid-cols-1 mx-32 sm:grid-cols-2 sm:mx-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data.map((itemData: any, index: number) => (
              <ItemCardsWrap
                name={itemData.favoriteItem?.name}
                price={itemData.favoriteItem?.price}
                imagePath={itemData.favoriteItem?.imagePath}
                key={index}
                id={itemData.favoriteItem?.id}
                favorite="favorite"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
