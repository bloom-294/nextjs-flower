import useSWR from "swr";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ShoppingList } from "components/Organisms/shoppingList";
import { Loader } from "components/Atoms/loader";
import styles from "../../styles/itemCards.module.css";
import { UserInfomation } from "components/Organisms/userInfomation";
import { PayMethod } from "components/Molecules/payMethod";
import { DateOfDelivery } from "components/Molecules/dateOfDelivery";
import { ConfirmFrom } from "components/Organisms/confirmFrom";
import { createContext } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const UserName = createContext("");

export const Home = () => {
  // ゲストID
  const [gestIdValue, SetGestIdValue] = useState("");

  // お届け情報変更status
  const [ordererStateChange, SetordererStateChange] = useState(false);

  // 注文者情報
  const [ordererName, SetOrdererName] = useState("");
  const [ordererFirstName, SetOrdererFirstName] = useState("");
  const [ordererLastName, SetOrdererLastName] = useState("");
  const [ordererMail, SetOrdererMail] = useState("");
  const [ordererAddress, SetOrdererAddress] = useState("");
  const [ordererTel, SetOrdererTel] = useState("");
  const [ordererZip, SetOrdererZip] = useState("");
  const [ordererPayMethod, SetOrdererPayMethod] = useState("現金払い");
  // const ordererPayMethod= useRef("現金払い")

  // 時間指定なし、時間指定あり、即日配送
  // const [ordererDateState, SetOrdererDateState] = useState("時間指定なし")
  const ordererDateState = useRef(["日時指定なし", "init", ""]);

  // Form用
  const [lastNameValue, SetLastNameValue] = useState("");
  const [lastNameErrorState, SetLastNameErrorState] = useState("init");

  const [firstNameValue, SetFirstNameValue] = useState("");
  const [firstNameErrorState, SetFirstNameErrorState] = useState("init");

  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [telValue, SetTelValue] = useState("");
  const [telErrorState, SetTelErrorState] = useState("init");

  const [zipValue, SetZipValue] = useState("");
  const [zipErrorState, SetZipErrorState] = useState("init");

  const [addressValue, SetAddressValue] = useState("");
  const [addressErrorState, SetAddressErrorState] = useState("init");

  const [errorFlag, SetErrorFlag] = useState(false);

  const [orderUserInfoChange, SetOrderUserInfoChange] = useState(false);

  const [dateErrorState, SetDateErrorState] = useState("init");

  useEffect(() => {
    const splitCookie = document.cookie.split(";");
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    list.map((cookieData) => {
      // ゲストID取得
      if (cookieData.includes(" gestId") || cookieData.includes("gestId")) {
        SetGestIdValue(cookieData[1]);
      }
    });
  }, []);

  // sessionStorage 復元
  useEffect(() => {
    const saved = sessionStorage.getItem("ordererInfo");

    if (saved) {
      const ordererInfo = JSON.parse(saved);

      SetOrdererLastName(ordererInfo.lastName ?? "");
      SetOrdererFirstName(ordererInfo.firstName ?? "");
      SetOrdererMail(ordererInfo.mail ?? "");
      SetOrdererAddress(ordererInfo.address ?? "");
      SetOrdererTel(ordererInfo.tel ?? "");
      SetOrdererZip(ordererInfo.zip ?? "");
    }
  }, []);

  // sessionStorage 保存
  useEffect(() => {
    // 全部空なら保存しない
    if (
      !ordererLastName &&
      !ordererFirstName &&
      !ordererMail &&
      !ordererAddress &&
      !ordererTel &&
      !ordererZip
    ) {
      return;
    }

    sessionStorage.setItem(
      "ordererInfo",
      JSON.stringify({
        lastName: ordererLastName,
        firstName: ordererFirstName,
        mail: ordererMail,
        address: ordererAddress,
        tel: ordererTel,
        zip: ordererZip,
      })
    );
  }, [
    ordererLastName,
    ordererFirstName,
    ordererMail,
    ordererAddress,
    ordererTel,
    ordererZip,
  ]);

  const router = useRouter();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?gestId=${gestIdValue}`,
    fetcher
  );

  if (error)
    return (
      <div className="container flex flex-wrap justify-center items-center mx-auto py-48 px-5 ">
        An error has occurred.
      </div>
    );

  if (!data)
    return (
      <>
        <Loader />
      </>
    );

  const OrdererInformation = () => {
    if (ordererStateChange === false) {
      if (data.length !== 0) {
        return (
          <div className="rounded-md w-auto bg-gray-100 sm:py-5 py-3 px-3 md:grid md:grid-cols-7">
            <div className="col-span-6">
              <UserInfomation
                name={`${ordererLastName || data[0].lastName} ${ordererFirstName || data[0].firstName}`}
                address={ordererAddress || data[0].address}
                tel={ordererTel || data[0].tel}
                zip={ordererZip || data[0].zip}
                ordererName={`${ordererLastName} ${ordererFirstName}`}
                ordererAddress={ordererAddress}
                ordererTel={ordererTel}
                ordererZip={ordererZip}
                orderUserInfoChange={orderUserInfoChange}
              />
              <PayMethod ordererPayMethod={ordererPayMethod} />
              <DateOfDelivery ordererDateState={ordererDateState} />
            </div>

          <div className="mt-4 flex justify-center md:mt-0 md:items-center">
              <button
                className={`mx-1 rounded-lg py-1 px-2 min-h-[40px] w-auto min-w-[64px] ${styles.changeButtonItemCards}`}
                onClick={() => {
                  SetordererStateChange(true);

                  SetOrdererLastName(ordererLastName || data[0].lastName);
                  SetOrdererFirstName(ordererFirstName || data[0].firstName);
                  SetOrdererMail(ordererMail || data[0].mail);
                  SetOrdererAddress(ordererAddress || data[0].address);
                  SetOrdererTel(ordererTel || data[0].tel);
                  SetOrdererZip(ordererZip || data[0].zip);

                  SetLastNameValue(ordererLastName || data[0].lastName);
                  SetFirstNameValue(ordererFirstName || data[0].firstName);
                  SetMailValue(ordererMail || data[0].mail);
                  SetAddressValue(ordererAddress || data[0].address);
                  SetTelValue(ordererTel || data[0].tel);
                  SetZipValue(ordererZip || data[0].zip);

                  SetLastNameErrorState("ok");
                  SetFirstNameErrorState("ok");
                  SetMailErrorState("ok");
                  SetZipErrorState("ok");
                  SetTelErrorState("ok");
                  SetAddressErrorState("ok");

                  ordererDateState.current[0] = "日時指定なし";
                }}
              >
                {" "}
                変更
              </button>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    } else {
      return (
        <ConfirmFrom
          lastNameValue={lastNameValue}
          SetLastNameValue={SetLastNameValue}
          firstNameValue={firstNameValue}
          SetFirstNameValue={SetFirstNameValue}
          firstNameErrorState={firstNameErrorState}
          SetFirstNameErrorState={SetFirstNameErrorState}
          lastNameErrorState={lastNameErrorState}
          SetLastNameErrorState={SetLastNameErrorState}
          mailValue={mailValue}
          SetMailValue={SetMailValue}
          mailErrorState={mailErrorState}
          SetMailErrorState={SetMailErrorState}
          displayFlag={true}
          telValue={telValue}
          SetTelValue={SetTelValue}
          telErrorState={telErrorState}
          SetTelErrorState={SetTelErrorState}
          zipValue={zipValue}
          SetZipValue={SetZipValue}
          zipErrorState={zipErrorState}
          SetZipErrorState={SetZipErrorState}
          addressValue={addressValue}
          SetAddressValue={SetAddressValue}
          addressErrorState={addressErrorState}
          SetAddressErrorState={SetAddressErrorState}
          SetErrorFlag={SetErrorFlag}
          errorFlag={errorFlag}
          SetOrdererName={SetOrdererName}
          SetOrdererFirstName={SetOrdererFirstName}
          SetOrdererLastName={SetOrdererLastName}
          SetOrdererMail={SetOrdererMail}
          SetOrdererAddress={SetOrdererAddress}
          SetOrdererTel={SetOrdererTel}
          SetOrdererZip={SetOrdererZip}
          SetOrdererPayMethod={SetOrdererPayMethod}
          // SetOrdererDateState={SetOrdererDateState}
          ordererName={ordererName}
          ordererLastName={ordererLastName}
          ordererFirstName={ordererFirstName}
          ordererMail={ordererMail}
          ordererAddress={ordererAddress}
          ordererTel={ordererTel}
          ordererZip={ordererZip}
          ordererPayMethod={ordererPayMethod}
          ordererDateState={ordererDateState}
          SetDateErrorState={SetDateErrorState}
          dateErrorState={dateErrorState}
          SetordererStateChange={SetordererStateChange}
          SetOrderUserInfoChange={SetOrderUserInfoChange}
        />
      );
    }
  };

  return (
    <div>
      <div className=" flex flex-wrap justify-center items-center sm:mt-7">
        <h1 className="text-[#75ad9d] text-[30px]">注文内容の確認</h1>
      </div>

      <div className="container flex flex-col justify-center items-center mx-auto sm:py-5 px-5 mb-12 ">
        <ShoppingList pageName="confirm" />

        <div className="md:w-[800px] h-auto">
          <h2 className="sm:mb-3 md:mb-5 my-5 text-2xl text-center">お届け先情報</h2>

          <OrdererInformation />
        </div>

        <button
          className="bg-[#75ad9d] text-white rounded-lg py-4  xl:mt-16 mt-12 w-[70%] sm:w-[450px] md:w-[500px] xl:w-[600px] 2xl:w-[600px] shadow-md focus:shadow-none focus:opacity-70"
          onClick={async () => {
            const orderData = data;
            const gestID = gestIdValue;
            const orderItemsList: any = [];

            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts?gestId=${gestIdValue}`)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                orderItemsList.push(data);
              })
              .catch((error) => {
                console.error("通信に失敗しました", error);
              });

            console.log("q", orderItemsList);
            let totalPrice = 0;
            orderItemsList.map((data: any) => {
              data.map((items: any) => {
                totalPrice = totalPrice + Number(items.orderPrice);
              });
              // totalPrice = Number(totalPrice) + Number(data.orderPrice)
            });

            const ordererInformation = {
              name: ordererName,
              mail: ordererMail,
              address: ordererAddress,
              zip: ordererZip,
              tel: ordererTel,
              orderDate: ordererDateState.current[4],
              payMethod: ordererPayMethod,
              totalPrice: totalPrice,
              DeliverySelect: ordererDateState.current[0],
              DeliveryDate: ordererDateState.current[5],
              orderItems: orderItemsList,
            };

            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderData, gestID, ordererInformation }),
            })
              .then((response) => {
                return response.json();
              })
              .then(() => {
                sessionStorage.removeItem("ordererInfo");
                router.replace("/carts/finish");
              })
              .catch((error) => {
                console.error("通信に失敗しました", error);
              });

            // カートのデータを削除
            // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/?gestId=${gestIdValue}`, {
            //   method: "DELETE",
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // }).then((response) => {
            //   return response.json();
            // }).then((data) => {
            //   // router.replace("/carts/finish");
            //   console.log("b", gestIdValue)
            //   console.log("b", data)
            // })
          }}
        >
          {" "}
          注文を確定する
        </button>
      </div>
    </div>
  );
};

export default Home;
