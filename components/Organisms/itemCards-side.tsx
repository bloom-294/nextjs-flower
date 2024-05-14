import Image from "next/image";
import style from "../../src/styles/itemCards.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { ChangeHistory } from "@material-ui/icons";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { ItemCardsSideTypes, ItemCardsSideCount } from "types/type";

const ItemCardsSideImage = (props: { imagePath: string }) => {
  return (
    <>
      <div className="flex flex-wrap  mb-2">
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

const ItemCardsSideCount = (props: ItemCardsSideCount) => {
  // const router = useRouter();
  const change = () => {
    const addCartItems = {
      name: props.name,
      price: props.price,
      orderPrice: props.itemsPriceChange,
      quantity: props.quantityAdd,
      imagePath: props.imagePath,
      gestId: props.gestId,
      id: props.id,
    };

    fetch(`http://localhost:8000/carts/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCartItems),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  };

  change();

  return (
    <>
      <button
        className={`float-right text-[#75ad9d] border border-gray-200 rounded-l-sm bg-gray-100 text-center  w-6`}
        onClick={() => {
          if (props.quantityAdd > 1) {
            props.setItemsPriceChange(
              Number(props.itemsPriceChange) - Number(props.price)
            );
            props.setQuantityAdd(Number(props.quantityAdd) - 1);
            props.setTotalPrice(Number(props.totalPrice) - Number(props.price));
          }

          // change()
          // router.push("/carts")
        }}
      >
        －
      </button>
      <div className={`float-right border-y border-gray-200  w-7 text-center `}>
        {props.quantityAdd}
      </div>
      <button
        className={`float-right  text-[#75ad9d] border border-gray-200 rounded-r-sm bg-gray-100 text-center  w-6`}
        onClick={() => {
          props.setItemsPriceChange(
            Number(props.itemsPriceChange) + Number(props.price)
          );
          props.setQuantityAdd(Number(props.quantityAdd) + 1);
          props.setTotalPrice(Number(props.totalPrice) + Number(props.price));
          // props.setItemsPriceChange(props.itemsPriceChange * props.quantityAdd)
          // router.push("/carts")
          // change()
        }}
      >
        ＋
      </button>
    </>
  );
};

export const ItemCardsSide = (props: ItemCardsSideTypes) => {
  const router = useRouter();

  const [quantityAdd, setQuantityAdd] = useState(1);
  const [itemsPriceChange, setItemsPriceChange] = useState(props.price);

  const deleteItems = () => {
    fetch(`http://localhost:8000/carts/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(props.id);
        props.mutate();
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  };

  props.mutate();
  if (props.pageName === "confirm") {
    return (
      <>
        <ItemCardsSideImage imagePath={props.imagePath} />
        <div className=" container m-auto justify-center items-center col-span-2 ">
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
        <ItemCardsSideName name={props.name} />
        <ItemCardsSidePrice price={props.orderPrice} />

        <div className=" container flex flex-wrap justify-center items-center ">
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
