import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { SearchForm } from "components/Molecules/searchForm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import style from "../../styles/itemListWrap.module.css";
import RecognizeList from "components/Organisms/recognizeList";
import Swal from "sweetalert2";

// const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const Details = (data: {
  item: {
    name: string;
    price: number;
    info: string;
    imagePath: string;
    id: number;
    quantity: number;
    category: string;
  };
}) => {
  const router = useRouter();
  const [gestIdValue, SetGestIdValue] = useState("");
  const list: Array<string[]> = [];

  console.log(1, data);
  useEffect(() => {
    const splitCookie = document.cookie.split(";");

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }
    console.log(4, typeof list);

    list.map((cookieData: string[], index: number) => {
      // ゲストID取得
      if (cookieData.includes("gestId")) {
        SetGestIdValue(cookieData[1]);
      }
    });
  }, []);

  const addItemsRegister = () => {
    // カートに商品情報・ゲストID追加
    console.log(`POST前 ${gestIdValue}`);
    const addCartItems = {
      name: data.item.name,
      price: data.item.price,
      orderPrice: data.item.price,
      quantity: 1,
      imagePath: data.item.imagePath,
      gestId: gestIdValue,
    };

    fetch(`http://localhost:8000/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCartItems),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          text: "追加しました！",
          confirmButtonText: "&nbsp;&nbsp;OK&nbsp;&nbsp;",
          confirmButtonColor: "#75ad9d",
        });
      })
      .then(() => {
        router.push({
          pathname: "/carts",
        });
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  };

  return (
    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto py-5 px-5 bg-white-100 mb-12">
        <div
          className=" my-12 grid  grid-cols-1
        lg:grid-cols-2
        "
        >
          <div className="items-center  m-auto  ">
            <div className={`  `}>
              <div className={`z-1`}>
                <Image
                  src={data.item?.imagePath}
                  alt=""
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          <div className="m-12 ">
            <p className="mb-4 text-xl text-gray-600">{data.item?.name}</p>
            <h5
              className="mb-8 text-2xl 
            font-bold
            text-[#75ad9d]"
            >
              {Number(data.item?.price).toLocaleString()}
              <span className="text-sm text-gray-500">円（税込）</span>
            </h5>
            <p className="mb-4 text-sm">
              この商品の高さの目安は
              <span className="text-green-900 text-bold text-lg">
                ～５０ｃｍ
              </span>
              になります。
            </p>

            <hr className="mb-6" />
            <p className="mb-6">
              <strong>送料無料</strong>&nbsp; 一部地域を除く
            </p>
            <hr className="mb-6" />
            {/* <div className="bg-gray-100 ">
              <p>お届け先の地域を選択すると、選択した地域への最短お届け日を確認できます。</p>
            </div> */}
            <form
              className="
            flex 
            flex-wrap justify-center
            lg:block
            "
            >
              {/* sm:${style.CartInButton} */}
              <button
                className={`btn bg-[#75ad9d] text-white py-4 my-8 rounded-lg  w-[100%] `}
                onClick={addItemsRegister}
                type="button"
              >
                カートに入れる
              </button>
            </form>

            <div>
              <h5 className="mt-2 text-md text-bold">商品説明</h5>
              <p className="text-sm">{data.item?.info}</p>
            </div>
          </div>
        </div>

        <RecognizeList
          title="おすすめ"
          category={data.item?.category}
          itemId={data.item?.id}
        />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000/api/itemList`);
  const json = await res.json();
  const list: any = [];

  for (let i = 1; i <= json.length; i++) {
    list.push({ params: { id: i } });
  }

  return {
    paths: list,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`http://localhost:3000/api/itemList?id=${params.id}`);
  const json = await res.json();
  const test = params.id;

  return {
    props: { item: json.item, id: params },
    revalidate: 1,
  };
};

export default Details;
