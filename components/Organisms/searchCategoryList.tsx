import React from "react";
import { useRouter } from "next/router";

const categoryList = [
  "全ての商品",
  "観葉植物",
  "生花",
  "多肉植物",
  "アレンジメント",
  "花束・ブーケ",
  "スワッグ",
  "フラワーリース",
  "スタンド花",
  "花瓶・フラワーベース",
];

export const SearchCategoryList = () => {
  const router = useRouter();

  const handleMoveCategory = (category: string) => {
    router.push({
      pathname: "/items",
      query: { category },
    });
  };

  return (
    <div>
      <h2 className="mb-5 flex flex-nowrap items-center justify-center text-xl">
        カテゴリ
      </h2>

      <ul>
        {categoryList.map((category, index) => {
          const isFirst = index === 0;
          const isLast = index === categoryList.length - 1;

          return (
            <li
              key={category}
              className={`
                border-gray-100 py-2 pl-2
                border-l-2 border-r-2 border-b-2
                ${isFirst ? "rounded-t-md border-t-2" : ""}
                ${isLast ? "rounded-b-md" : ""}
              `}
            >
              <button
                type="button"
                className="border-none hover:text-[#75ad9d]"
                onClick={() => handleMoveCategory(category)}
              >
                {category === "全ての商品" ? "全て" : category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
