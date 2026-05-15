import Image from "next/image";
import style from "../../src/styles/itemCards.module.css";
import { useEffect, useState } from "react";
import { ItemCardsSideTypes, ItemCardsSideCountTypes } from "types/type";

const ItemCardsSideImage = (props: { imagePath: string }) => {
  return (
    <>
      <div className="flex flex-wrap mb-2 m-auto col-span-2">
        <Image src={props.imagePath} alt="" width={200} height={200} />
      </div>
    </>
  );
};

const ItemCardsSideName = (props: { name: string }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <p className="text-sm m-1">{props.name}</p>
      </div>
    </>
  );
};

const ItemCardsSidePrice = (props: { price: number }) => {
  return (
    <>
      <div className=" text-center justify-center flex flex-wrap  items-center">
        <p className="text-md">
          {Number(props.price).toLocaleString()}{" "}
          <span className="text-sm">円（税込）</span>
        </p>
      </div>
    </>
  );
};

const ItemCardsSideQuentity = (props: { quentity: number | string }) => {
  return (
    <>
      <div className="grid justify-items-end flex flex-wrap  pr-9">
        <p>
          {props.quentity} <span className="text-sm">点</span>
        </p>
      </div>
    </>
  );
};

const ItemCardsSideCount = (props: ItemCardsSideCountTypes) => {
  const updateCartItem = async (quantity: number, orderPrice: number) => {
    const addCartItems = {
      name: props.name,
      price: props.price,
      orderPrice,
      quantity,
      imagePath: props.imagePath,
      gestId: props.gestId,
      id: props.id,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCartItems),
    });

    props.mutate();
  };

  const handlePlus = async () => {
    const nextQuantity = Number(props.quantityAdd) + 1;
    const nextOrderPrice = Number(props.itemsPriceChange) + Number(props.price);

    props.setQuantityAdd(nextQuantity);
    props.setItemsPriceChange(nextOrderPrice);

    await updateCartItem(nextQuantity, nextOrderPrice);
  };

  const handleMinus = async () => {
    if (props.quantityAdd <= 1) return;

    const nextQuantity = Number(props.quantityAdd) - 1;
    const nextOrderPrice = Number(props.itemsPriceChange) - Number(props.price);

    props.setQuantityAdd(nextQuantity);
    props.setItemsPriceChange(nextOrderPrice);

    await updateCartItem(nextQuantity, nextOrderPrice);
  };

  return (
    <>
      <button
        className="float-right w-6 rounded-l-sm border border-gray-200 bg-gray-100 text-center text-[#75ad9d]"
        onClick={handleMinus}
      >
        －
      </button>

      <div className="float-right w-7 border-y border-gray-200 text-center">
        {props.quantityAdd}
      </div>

      <button
        className="float-right w-6 rounded-r-sm border border-gray-200 bg-gray-100 text-center text-[#75ad9d]"
        onClick={handlePlus}
      >
        ＋
      </button>
    </>
  );
};

export const ItemCardsSide = (props: ItemCardsSideTypes) => {
  const [quantityAdd, setQuantityAdd] = useState(props.quantity);
  const [itemsPriceChange, setItemsPriceChange] = useState(props.orderPrice);

  useEffect(() => {
    setQuantityAdd(props.quantity);
    setItemsPriceChange(props.orderPrice);
  }, [props.quantity, props.orderPrice]);

  const deleteItems = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${props.id}`, {
      method: "DELETE",
    })
      .then(() => {
        props.mutate();
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  };

  if (props.pageName === "confirm") {
    return (
      <>
        <ItemCardsSideImage imagePath={props.imagePath} />
        <div className="container m-auto justify-center items-center col-span-2 sm">
          <ItemCardsSideName name={props.name} />
          <ItemCardsSideQuentity quentity={props.quantity} />
        </div>

        <ItemCardsSidePrice price={props.orderPrice} />
        <div className=" container flex flex-wrap justify-center items-center  ">
          {/* <Link href="/carts" >
          <a className={`mx-1  rounded-lg py-1 px-2 ${style.changeButtonItemCards}`}>
            変更
          </a>
          </Link> */}
          {/* <button className={`mx-1  rounded-lg py-1 px-2 ${style.changeButtonItemCards}`} onClick={
            ()=>{
              router.replace("/carts")
            }
          }> 変更</button> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <ItemCardsSideImage imagePath={props.imagePath} />
        <div className="m-auto col-span-2">
          <ItemCardsSideName name={props.name} />
          <ItemCardsSidePrice price={props.orderPrice} />
        </div>
        <div className="m-auto">
            <ItemCardsSideCount
              quantityAdd={quantityAdd}
              setQuantityAdd={setQuantityAdd}
              itemsPriceChange={itemsPriceChange}
              setItemsPriceChange={setItemsPriceChange}
              totalPrice={props.totalPrice}
              setTotalPrice={props.setTotalPrice}
              name={props.name}
              imagePath={props.imagePath}
              price={props.price}
              quantity={props.quantity}
              id={props.id}
              gestId={props.gestId}
              mutate={props.mutate}
            />
        </div>
        <button
          className={`mx-6 text-gray-500 ${style.deleteButtonItemCards}`}
          onClick={deleteItems}
        >
          {" "}
          削除
        </button>
      </>
    );
  }
};
