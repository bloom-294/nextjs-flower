import useSWR from "swr";
import { ItemCardsWrapRecognize } from "components/Organisms/itemCards-wrap";
import { ItemCardsWrapRecognizeSqlTypes } from "types/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const normalizedBaseUrl = API_BASE_URL.endsWith("/")
  ? API_BASE_URL
  : `${API_BASE_URL}/`;

const endpoint = new URL("items", normalizedBaseUrl).toString();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const NewItemsList = () => {
  const { data, error } = useSWR<ItemCardsWrapRecognizeSqlTypes[]>(
    endpoint,
    fetcher
  );

  if (error || !data) {
    return null;
  }

  const newItemList = data.slice(0, 10);

  return (
    <div className="my-5">
      <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 md:grid-cols-5">
        {newItemList.map((item) => (
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
