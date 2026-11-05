import useSWR from "swr";
import { ItemCardsWrapRecognize } from "../Organisms/itemCards-wrap";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

type TopRecognizeListProps = {
  title?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getItemsUrl = (base: string) => {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return new URL("items", normalizedBase).toString();
};

const endpoint = API_BASE_URL ? getItemsUrl(API_BASE_URL) : null;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const TopRecognizeList = ({ title }: TopRecognizeListProps) => {
  const { data, error } = useSWR<ItemCardsWrapRecognizeSqlTypes[]>(
    endpoint,
    fetcher
  );

  if (error) return <div></div>;

  if (!data) return <div></div>;

  const recommendItemList = [...data]
    .sort((a, b) => (a.recommend ?? 0) - (b.recommend ?? 0))
    .slice(0, 10);

  return (
    <div className="my-5">
      <h5 className="sm:mb-5">{title}</h5>

      <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 md:grid-cols-5">
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

export default TopRecognizeList;
