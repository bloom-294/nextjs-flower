import { Category } from "@material-ui/icons";
import React from "react";
import { useRouter } from "next/router";

export const SearchCategoryList = () => {
  const router = useRouter();

  // 最初のカテゴリ以外のリスト（スタイルが違うため）
  const categoryList = [
    "観葉植物",
    "生花",
    "多肉植物",
    "アレンジメント",
    "花束・ブーケ",
    "スワッグ",
    "フラワーリース",
    "スタンド花",
  ];

  return (
    <>
      <div>
        <h2 className="text-xl flex flex-nowrap items-center justify-center mb-5">
          カテゴリ
        </h2>
        <ul className="">
          <label htmlFor="firstCategory">
            <li className="border-2 border-gray-100 py-2 pl-2 rounded-t-md">
              <button
                type="button"
                id="firstCategory"
                className="border-none hover:text-[#75ad9d]"
                onClick={() => {
                  router.push({
                    pathname: "/items",
                    query: { category: "全ての商品" },
                  });
                }}
              >
                全て
              </button>
            </li>
          </label>

          {categoryList.map((CategoryData: string, index: number) => {
            return (
              <label htmlFor={CategoryData} key={index}>
                <li className="border-l-2 border-r-2 border-b-2 border-gray-100 py-2 pl-2 ">
                  <button
                    type="button"
                    className="border-none hover:text-[#75ad9d]"
                    id={CategoryData}
                    onClick={() => {
                      router.push({
                        pathname: "/items",
                        query: { category: `${CategoryData}` },
                      });
                    }}
                  >
                    {CategoryData}
                  </button>
                </li>
              </label>
            );
          })}
          <label htmlFor="花瓶・フラワーベース">
            <li className="border-l-2 border-r-2 border-b-2 border-gray-100 py-2 pl-2 rounded-b-md">
              <button
                type="button"
                id="花瓶・フラワーベース"
                className="border-none hover:text-[#75ad9d]"
                onClick={() => {
                  router.push({
                    pathname: "/items",
                    query: { category: "花瓶・フラワーベース" },
                  });
                }}
              >
                花瓶・フラワーベース
              </button>
            </li>
          </label>
        </ul>
      </div>
    </>
  );
};
