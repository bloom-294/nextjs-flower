import React, { useEffect } from "react";
import style from "../../styles/input.module.css";
import { GreenButton } from "components/Atoms/greenButton";
import { MailInput } from "components/Organisms/form/mailInput";
import { PasswordInput } from "components/Organisms/form/passwordInput";
import { useState } from "react";
import { useRouter } from "next/router";
import ModalWindow from "components/Organisms/modal";
import Swal from "sweetalert2";
import { FiberNew } from "@material-ui/icons";

export const Home = () => {
  const [mailValue, SetMailValue] = useState("");
  const [mailErrorState, SetMailErrorState] = useState("init");

  const [passwordValue, SetPasswordValue] = useState("");
  const [passwordErrorState, SetPasswordErrorState] = useState("init");

  const [errorFlag, SetErrorFlag] = useState("false");
  // ログイン状態
  const [loginStatus, SetLoginStatus] = useState(false);

  const [gestIdValue, SetGestIdValue] = useState("");
  const [cartStatus, SetCartStatus] = useState("");

  const router = useRouter();

  useEffect(() => {
    const splitCookie = document.cookie.split(";");
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    list.map((data, index) => {
      if (data.includes("login")) {
        SetLoginStatus(true);
      }
      // ゲストID付与
      if (data.includes(" gestId") || data.includes("gestId")) {
        SetGestIdValue(data[1]);
      }

      if (data.includes(" carts") || data.includes("carts")) {
        SetCartStatus(data[1]);
      }
    });
  }, []);

  const loginStatusRegister = async (props: any) => {
    // ログインしているか判定
    if (loginStatus === false) {
      console.log(`put前 ${gestIdValue}`);

      const data = {
        name: props[0].name,
        lastName: props[0].lastName,
        firstName: props[0].firstName,
        mail: props[0].mail,
        zip: props[0].zip,
        address: props[0].address,
        tel: props[0].tel,
        password: props[0].password,
        status: "login",
        gestId: gestIdValue,
      };

      // ログインstatus追加
      fetch(`http://localhost:8000/users/${props[0].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .then((cookie) => {
          document.cookie = "status=login; path=/;";
        })
        .then((alerts) => {
          // alert("ログインしました。");
          Swal.fire({
            icon: "success",
            text: "ログインしました！",
            confirmButtonText: "　　OK　　",
            confirmButtonColor: "#75ad9d",
          });
        })
        .then((route) => {
          if (cartStatus === "confirm") {
            router.push("/carts/confirm");
            document.cookie = "carts=shopping; path=/; max-age=0;";
          } else {
            router.push("/items");
          }
        })
        .catch((error) => {
          console.error("通信に失敗しました", error);
        });
    } else {
      // alert("既にログインしています")
      Swal.fire({
        icon: "error",
        text: "既にログインしています",
        confirmButtonText: "　　OK　　",
        confirmButtonColor: "#75ad9d",
      });
    }
  };

  {
    /* <ModalWindow modal={true}/> */
  }
  return (
    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto pt-10 px-5 bg-white-100 my-12 mb-64 ">
        <div className="bg-gray-50 p-4 rounded-xl ">
          <form action="" className="">
            <MailInput
              mailErrorState={mailErrorState}
              mailValue={mailValue}
              errorFlag={errorFlag}
              SetMailErrorState={SetMailErrorState}
              SetMailValue={SetMailValue}
              displayFlag={false}
            />

            <PasswordInput
              SetPasswordValue={SetPasswordValue}
              SetPasswordErrorState={SetPasswordErrorState}
              confirmPasswordValue={passwordValue}
              SetConfirmPasswordErrorState={console.log}
              passwordErrorState={passwordErrorState}
              passwordValue={passwordValue}
              errorFlag={errorFlag}
              displayFlag={false}
            />

            <div className="icontainer flex flex-wrap justify-center items-center ">
              <button
                type="button"
                className="text-white px-12 py-2 rounded-md text-sm mr-3"
                style={{ backgroundColor: "#75ad9d" }}
                onClick={async () => {
                  SetErrorFlag("true");

                  let password = `${passwordValue}flower`;
                  const sha256 = async (text: string) => {
                    const msgUint8 = new TextEncoder().encode(text); // (utf-8 の) Uint8Array にエンコードする
                    const hashBuffer = await crypto.subtle.digest(
                      "SHA-256",
                      msgUint8
                    ); // メッセージをハッシュする
                    const hashArray = Array.from(new Uint8Array(hashBuffer)); // バッファーをバイト列に変換する
                    const hashHex = hashArray
                      .map((b) => b.toString(16).padStart(2, "0"))
                      .join(""); // バイト列を16進文字列に変換する
                    return hashHex;
                  };

                  const hash = async () => {
                    const digestHex = await sha256(password);
                    console.log(digestHex);
                    password = digestHex;
                  };

                  await hash();

                  if (mailErrorState === "ok" && passwordErrorState === "ok") {
                    console.log(password);
                    await fetch(
                      `http://localhost:8000/users?mail=${mailValue}&&password=${password}`
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.length === 0) {
                          // alert("メールアドレスかパスワードが違います。");
                          Swal.fire({
                            icon: "error",
                            text: "メールアドレスかパスワードが違います。",
                            confirmButtonText: "　　OK　　",
                            confirmButtonColor: "#75ad9d",
                          });
                        } else {
                          if (
                            data[0].mail === mailValue &&
                            data[0].password === password
                          ) {
                            // alert("ログインしました。");
                            loginStatusRegister(data);
                            // console.log(data)
                          } else {
                            // alert("メールアドレスかパスワードが違います。");
                            Swal.fire({
                              icon: "error",
                              text: "メールアドレスかパスワードが違います。",
                              confirmButtonText: "　　OK　　",
                              confirmButtonColor: "#75ad9d",
                            });
                          }
                        }
                      })
                      .catch((error) => {
                        console.error("通信に失敗しました", error);
                      });
                    // .catch(error => {
                    //   alert("メールアドレスかパスワードが違います。c");
                    // });
                  }
                }}
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
