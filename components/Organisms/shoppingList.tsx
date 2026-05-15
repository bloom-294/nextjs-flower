import useSWR from "swr";
import { ItemCardsSide } from "components/Organisms/itemCards-side";
import style from "../../src/styles/shoppingCart.module.css";
import { useEffect, useState } from "react";
import { Loader } from "components/Atoms/loader";

type CartItem = {
  name: string;
  imagePath: string;
  price: number;
  quantity: number;
  id: number;
  gestId: string;
  orderPrice: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getCookieValue = (key: string) => {
  if (typeof document === "undefined") return "";

  const cookies = document.cookie.split("; ");
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${key}=`));

  return targetCookie ? targetCookie.split("=")[1] : "";
};

export const ShoppingList = ({
  pageName = "Shopping",
}: {
  pageName?: string;
}) => {
  const [gestIdValue, setGestIdValue] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setGestIdValue(getCookieValue("gestId"));
  }, []);

  const endpoint =
    API_BASE_URL && gestIdValue
      ? `${API_BASE_URL}/carts?gestId=${gestIdValue}`
      : null;

  const { data, error, mutate } = useSWR<CartItem[]>(endpoint, fetcher);

  const initTotalPrice =
    data?.reduce((sum, item) => {
      return sum + Number(item.orderPrice);
    }, 0) ?? 0;

  useEffect(() => {
    if (totalPrice !== initTotalPrice) {
      setTotalPrice(initTotalPrice);
    }
  }, [initTotalPrice, totalPrice]);

  if (error) {
    return (
      <div className="container mx-auto flex flex-wrap items-center justify-center px-5 py-48">
        An error has occurred.
      </div>
    );
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-5 py-5">
      {data.map((shoppingItem) => (
        <div
          className="mb-1 flow-root rounded-md sm:grid sm:grid-cols-6 sm:gap-1 md:w-[800px]"
          key={shoppingItem.id}
        >
          <ItemCardsSide
            name={shoppingItem.name}
            imagePath={shoppingItem.imagePath}
            price={shoppingItem.price}
            quantity={shoppingItem.quantity}
            id={shoppingItem.id}
            gestId={shoppingItem.gestId}
            orderPrice={shoppingItem.orderPrice}
            pageName={pageName}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            mutate={mutate}
          />
        </div>
      ))}

      <hr className={style.line} />

      <div className="mb-5 mt-10 px-5">
        <p className="text-sm">
          合計金額&nbsp;&nbsp;&nbsp;
          <span className="text-[35px] text-[#75ad9d]">
            {totalPrice.toLocaleString()}
          </span>
          &nbsp;円(税込)
        </p>
      </div>
    </div>
  );
};

export default ShoppingList;
