import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../../src/styles/header.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Logo = (props: { path: string }) => {
  return (
    <Link href="/">
      <a>
        <Image src={props.path} width={90} height={70} className="" alt="架空のお花屋さんのECサイトのロゴです。" />
      </a>
    </Link>
  );
};

const HeaderListText = (props: { name: string; path: string }) => {
  return (
    <>
      <li className={`float-left mx-8 py-2.5 text-center  ${style.link}`}>
        <Link href={props.path}>
          <a>{props.name}</a>
        </Link>
      </li>
    </>
  );
};

const headerIconStyles =
  "float-left mx-4 py-2.5 flex flex-col justify-center items-center text-gray-500 text-sm z-100";

const HeaderListGoogleIconList = (props: {
  name: string;
  path: string;
  list?: any;
  title: string;
}) => {
  if (props.title !== "アカウント") {
    return (
      <>
        <Link href={props.path}>
          <li className={`group ${headerIconStyles} w-max cursor-pointer relative pb-3 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#5d3d4a] hover:after:w-full`}>
              <a className={`group-hover:text-[#75ad9d] flex flex-col text-center`}>
                <span className="cursor-pointer text-xl leading-none">{props.title}</span>
                <span className="text-md leading-tight" aria-hidden="true">{props.name}</span>
              </a>
          </li>
        </Link>
      </>
    );
  } else {
    return (
      <>
      <Link href={props.path}>
        <li className={`${headerIconStyles} cursor-pointer relative pb-3 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#5d3d4a] hover:after:w-full`}>
          <span className="cursor-pointer text-xl leading-none"> {props.title}</span>
          <span className="text-md leading-tight" aria-hidden="true">
            {props.name}
          </span>
          {props.list}
        </li>
      </Link>
      </>
    );
  }
};

const UserNavigationGroupUser = (props: any) => {
  return (
    <ul
      className={`bg-white absolute translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100`}
    >
      <HeaderListText name="新規登録" path={`/users/`} />
      <LoginState
        loginState={props.loginState}
        SetLoginState={props.SetLoginState}
      />
    </ul>
  );
};

const UserNavigationGroupCart = () => {
  return (
    <ul
      className={`bg-white absolute translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100`}
    >
      <HeaderListText name="カート" path={`/carts`} />
    </ul>
  );
};

const UserNavigationGroupOther = () => {
  return (
    <ul
      className={`bg-white absolute translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100 `}
    >
      <HeaderListText name="商品一覧" path={`/items`} />
    </ul>
  );
};

export const Header = () => {
  const [hamburgerMenuDisplayState, SetHamburgerMenuDisplayState] =
    useState(false);
  const cookieList: any = [];

  const [loginState, SetLoginState] = useState(false);

  useEffect(() => {
    const splitCookie = document.cookie.split(";");
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split("="));
    }

    // cookieにgestIDがセットされていな場合、付与する
    if (list.length !== 0) {
      list.map((data) => {
        if (data[0].includes("gestId")) {
          cookieList.push(data[0]);
        }
        if (data.length >= 2) {
          if (data[1].includes("login")) {
            SetLoginState(true);
          }
        }
      });
    }

    if (cookieList.length === 0) {
      let randomId = Math.random().toString(32).substring(2);
      document.cookie = `gestId=${randomId}; path=/;`;
    }
  });

  {
    /* <ModalWindow modal={true}/> */
  }
  const HumburgerList = () => {
    // ハンバーガーメニューのロゴを押されたら表示
    if (hamburgerMenuDisplayState === true) {
      return (
        <div
          className="py-5 bg-white shadow-md rounded-md
        absolute z-20 right-0 top-0 md:hidden text-gray-500
        w-[50vw]
        "
        >
          <ul className="flex flex-col">
            <li className="h-11">
              <button
                className={`float-right pr-4 ${style.close} `}
                onClick={() => {
                  SetHamburgerMenuDisplayState(false);
                }}
              >
                <span
                  className={`material-icons text-gray-400 ${style.close} `}
                >
                  close
                </span>
              </button>
            </li>
            <HeaderListText name="トップ" path={`/`} />
            <HeaderListText name="商品一覧" path={`/items`} />
            <HeaderListText name="カート" path={`/carts`} />
            <HeaderListText name="新規登録" path={`/users/`} />

            <LoginState loginState={loginState} SetLoginState={SetLoginState} />
            {/* <HeaderListText name="ログイン" path={`/users/login`} /> */}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <header className="flex flex-wrap justify-between items-center py-2 bg-white border">
        <div className="ml-10 flex justify-center">
          <Logo path="/logo/logo-flower.webp" />
        </div>

        <nav>
          <ul className="float-right hidden md:block mx-5">
            {/* <li className={`${headerIconStyles} w-max cursor-pointer`}>
              <form
              onSubmit={(ev) => {
                ev.preventDefault();
                // setSearchState(true);
                }}
                className="my-auto mx-10"
                >
                <input
                id="search"
                type="text"
                placeholder={`商品を探す`}
                className="
                h-14
                w-[90%]
                max-w-lg
                rounded-lg
                border-2
                border-[#5d3d4a]
                px-4
                py-1
                text-lg
                text-[#5d3d4a]
                focus:outline-none
                focus:ring-2
                sm:w-[500px]
                sm:px-8
                m-auto
                "
                onChange={(ev) => {
                  // setSearchWord(ev.target.value);
                  // setSearchState(false);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.nativeEvent.isComposing || ev.keyCode === 229) return;
                    
                    if (ev.key === "Backspace" && ev.currentTarget.value === "") {
                      // setSearchState(false);
                      }
                      }}
                      />
                      <span 
                      className="
                      material-icons relative right-[10%] z-10  translate-x-0 text-[#5d3d4a]-40
                      sm:-translate-x-0 cursor-pointer text-center align-sub
                      ">
                      search
                      </span>
                      </form>
                      </li> */}
            <HeaderListGoogleIconList
              name="items"
              path={`/items`}
              list={<UserNavigationGroupOther />}
              title="商品一覧"
              />
            <HeaderListGoogleIconList
              name="carts"
              path={`/carts`}
              list={<UserNavigationGroupCart />}
              title="カート"
              />
            <HeaderListGoogleIconList
              name="login"
              path={`/users/login`}
              list={
                <UserNavigationGroupUser
                loginState={loginState}
                SetLoginState={SetLoginState}
                />
              }
              title="ログイン"
              />
          </ul>
        </nav>

        <div className="flex flex-col md:hidden">
          <button
            onClick={() => {
              SetHamburgerMenuDisplayState(true);
            }}
          >
            <span className={`material-icons mx-8 text-gray-400 ${style.menu}`}>
              menu
            </span>
          </button>
        </div>
      </header>
      <div className="container flex flex-wrap justify-end items-center mx-auto py-5">
        <HumburgerList />
      </div>
      {/* </nav> */}
    </>
  );
};

const LoginState = (props: any) => {
  const router = useRouter();
  if (props.loginState === false) {
    return <HeaderListText name="ログイン" path={`/users/login`} />;
  } else {
    return (
      <li className={`float-left mx-8 py-2.5  ${style.link}`}>
        <button
          type="button"
          onClick={() => {
            document.cookie = "status=login; path=/; max-age=0;";
            Swal.fire({
              icon: "success",
              text: "ログアウトしました！",
              confirmButtonText: "OK",
              confirmButtonColor: "#75ad9d",
            });
            props.SetLoginState(false);
            router.push("/items");
          }}
        >
          ログアウト
        </button>
      </li>
    );
  }
};

export default Header;
