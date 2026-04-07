import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { ItemCardsWrap } from "../../../components/Organisms/itemCards-wrap";
import { SearchForm } from "components/Molecules/searchForm";
import { Loader } from "components/Atoms/loader";
import { SearchNavigationbar } from "components/Organisms/searchNavigationbar";
import Countup from "react-countup";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";
import Swal from "sweetalert2";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
});

export const Home = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [sort, setSort] = useState("");
  
  
  const router = useRouter();
  let categoryWord: string | string[] = "";
  
  if (router.query.category) {
    categoryWord = router.query.category;
  } else {
    categoryWord = "全ての商品";
  }
  
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
  fetcher);
  const sourceItemList = data ?? [];

  const safeCategoryWord =
  typeof categoryWord === "string"
    ? categoryWord
    : categoryWord?.[0] ?? "全ての商品";

  const toKatakana = (str: string) => {
    return str.replace(/[\u3041-\u3096]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    );
  };

  const normalizeSearchText = (str: string) => {
    return toKatakana(str)
      .normalize("NFKC")
      .replace(/\s+/g, "")
      .toLowerCase();
  };

  // 1. カテゴリで絞り込む
  const categoryFilteredList =
    safeCategoryWord !== "全ての商品"
      ? sourceItemList.filter((item: ItemCardsWrapRecognizeSqlTypes) =>
          (item.category ?? []).includes(safeCategoryWord)
        )
      : sourceItemList;
      
  // 2. 検索ワードで絞り込む
  const searchedList = searchState
    ? categoryFilteredList.filter((item: ItemCardsWrapRecognizeSqlTypes) =>
        normalizeSearchText(item.name ?? "").includes(
        normalizeSearchText(searchWord)
      ))
    : categoryFilteredList;

  // 3. 並び替え
  const itemList = [...searchedList];
  

  if (sort === "安い") {
    itemList.sort((a: ItemCardsWrapRecognizeSqlTypes, b: ItemCardsWrapRecognizeSqlTypes) => {
      return (a.price ?? 0) - (b.price ?? 0);
    });
  }

  if (sort === "高い") {
    itemList.sort((a: ItemCardsWrapRecognizeSqlTypes, b: ItemCardsWrapRecognizeSqlTypes) => {
      return (b.price ?? 0) - (a.price ?? 0);
    });
  }

  if (sort === "おすすめ") {
    itemList.sort((a: ItemCardsWrapRecognizeSqlTypes, b: ItemCardsWrapRecognizeSqlTypes) => {
      return (b.recommend ?? 0) - (a.recommend ?? 0);
    });
  }

  if (sort === "人気") {
    itemList.sort((a: ItemCardsWrapRecognizeSqlTypes, b: ItemCardsWrapRecognizeSqlTypes) => {
      return (b.popular ?? 0) - (a.popular ?? 0);
    });
  }

  const shouldRedirectToAllItems =
  !!data &&
  itemList.length === 0 &&
  (
    searchState || safeCategoryWord !== "全ての商品"
  );

  // 4. 検索結果が0件ならポップを出して商品一覧へ遷移
  useEffect(() => {
    if (!shouldRedirectToAllItems) return;

    const showToast = async () => {
      Toast.fire({
        icon: "error",
        title: "該当する商品がありません",
      });

      setSearchState(false);
      setSearchWord("");
      router.replace("/items");
    };
    showToast();
  }, [shouldRedirectToAllItems, router]);

  const itemListLength: boolean = itemList.length === 0;


  useEffect(() => {
    if (!searchState) return;
    if (!data) return;
    if (itemList.length === 0) return;

    Toast.fire({
      icon: "success",
      title: `${itemList.length}件見つかりました`,
    });
  }, [searchState, itemList.length, data]);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <div className="container sm:flex flex-wrap justify-center items-center mx-auto sm:py-5 px-5">
        <div className="flex flex-nowrap justify-center" style={{ height: "100%" }}>
          <div className="hidden md:flex flex-col">
            <p className="text-md mb-4">
              <span>Home</span> &gt; {categoryWord}
            </p>

            <div className="bg-gray-100 rounded-md w-48 py-1">
              <h3
                className="bg-gray-100 flex rounded-md justify-center items-end mx-auto h-12 pb-1"
              >
                該当商品
                <span className="mx-4 translate-y-2">
                  <Countup
                    end={itemList.length}
                    duration={0.3}
                    className="text-[#75ad9d] text-[30px]"
                  />
                </span>
                件
              </h3>
            </div>

            <SearchNavigationbar />
          </div>

          <div className="float-right" style={{ height: "100%" }}>
            <div className="container flex flex-wrap justify-center items-center mx-auto pt-5 px-5 a">
              <SearchForm
                setSearchWord={setSearchWord}
                setSearchState={setSearchState}
                categoryWord={categoryWord}
                itemListLength={itemListLength}
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-wrap justify-center items-center mt-8 my-auto">
              <ul className="flex float-right">
                <li className="sm:mr-4 mr-2">
                  <button
                    type="button"
                    className="border-b whitespace-nowrap text-gray-400 focus:text-[#75ad9d] focus:border-[#75ad9d] text-md"
                    onClick={() => {
                      setSort("おすすめ");
                    }}
                  >
                    おすすめ順
                  </button>
                </li>

                <li className="sm:mr-4 mr-2">
                  <button
                    type="button"
                    className="border-b whitespace-nowrap text-gray-400 focus:text-[#75ad9d] focus:border-[#75ad9d] text-md"
                    onClick={() => {
                      setSort("人気");
                    }}
                  >
                    人気順
                  </button>
                </li>

                <li className="sm:mr-4 mr-2">
                  <button
                    type="button"
                    className="border-b whitespace-nowrap text-gray-400 focus:text-[#75ad9d] focus:border-[#75ad9d] text-md"
                    onClick={() => {
                      setSort("安い");
                    }}
                  >
                    価格が安い順
                  </button>
                </li>

                <li className="sm:mr-4 mr-0">
                  <button
                    type="button"
                    className="border-b whitespace-nowrap text-gray-400 focus:text-[#75ad9d] focus:border-[#75ad9d] text-md"
                    onClick={() => {
                      setSort("高い");
                    }}
                  >
                    価格が高い順
                  </button>
                </li>
              </ul>
            </div>

            <div
              className="my-12 grid grid-cols-2 w-[100%] sm:grid-cols-2 sm:gap-10 sm:mx-0 sm:w-auto lg:grid-cols-3 2xl:grid-cols-5"
            >
              {itemList.map(
                (itemData: ItemCardsWrapRecognizeSqlTypes, index: number) => {
                  return (
                    <ItemCardsWrap
                      name={itemData.name}
                      price={itemData.price}
                      imagePath={itemData.imagePath}
                      key={index}
                      id={itemData.id}
                      data={itemData}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
