import useSWR from "swr";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

type RecognizeListProps = {
  category: string;
  itemId: number;
  title: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getItemsUrl = (base: string) => {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return new URL("items", normalizedBase).toString();
};

const endpoint = API_BASE_URL ? getItemsUrl(API_BASE_URL) : null;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getCategoryText = (category: string | string[] | undefined) => {
  if (Array.isArray(category)) {
    return category.join(",");
  }

  return category ?? "";
};

export const RecognizeList = ({
  category,
  itemId,
  title,
}: RecognizeListProps) => {
  const { data, error } = useSWR<ItemCardsWrapRecognizeSqlTypes[]>(
    endpoint,
    fetcher
  );

  if (error) return <div></div>;

  if (!data) return <div></div>;

  const sortedItems = [...data].sort(
    (a, b) => (a.recommend ?? 0) - (b.recommend ?? 0)
  );

  const categoryItems = category
    ? sortedItems.filter((item) => {
        const itemCategory = getCategoryText(item.category);

        return (
          item.id !== itemId &&
          (category.includes(itemCategory) || itemCategory.includes(category))
        );
      })
    : [];

  const fallbackItems = sortedItems.filter(
    (item) =>
      item.id !== itemId &&
      !categoryItems.some((categoryItem) => categoryItem.id === item.id)
  );

  const recommendItemList = [...categoryItems, ...fallbackItems].slice(0, 5);

  return (
    <div className="my-5 w-full overflow-scroll">
      <h5 className="mb-2 sm:mb-5">{title}</h5>

      <div className="flex">
        {recommendItemList.map((item) => (
          <ItemCardsWrapRecognize
            key={item.id}
            name={item.name}
            price={item.price}
            imagePath={item.imagePath}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default RecognizeList;
