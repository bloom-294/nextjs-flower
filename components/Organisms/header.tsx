import Image from "next/image";
import Head from "next/head";
// import Link from "next/link";
// import style from "../src/styles/humburger.module.css";
// import React from "react";
import { SearchForm } from "../Molecules/searchForm"
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../../src/styles/header.module.css"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'



const Logo = (props: { path: string }) => {
  return (
    <Link href="/" >
      <a >
        <Image
          src={props.path}
          width={100}
          height={70}
          className=""
        />
      </a>
    </Link>
  );
}

const HeaderListGoogleIcon = (props: { name: string, path: string }) => {
  return (
    <>
      <li className="float-left mx-8 py-2.5">
        <Link href={props.path}>
          <a>
            <span className="material-symbols-outlined">
              {props.name}
            </span>
          </a>
        </Link>
      </li>
    </>
  );
}

const HeaderListText = (props: { name: string, path: string }) => {
  return (
    <>
      <li className={`float-left mx-8 py-2.5  ${style.link}`}>
        <Link href={props.path}>
          <a>
            {props.name}
          </a>
        </Link>
      </li>
    </>
  );
}

const HeaderListGoogleIconList = (props: { name: string, path: string, list: any, title: string }) => {
  return (
    <>
      <li className={`float-left mx-8 py-2.5  flex flex-col justify-center items-center mx-auto text-gray-500 text-sm z-100`}>
        <span className={`material-icons text-gray-400 ${style.icon} `}>
          {props.name}
        </span>
        {props.list}
        <label htmlFor="material-icons">
          <p className="cursor-pointer"> {props.title}</p>
        </label>
      </li>
    </>
  );
}

const UserNavigationGroupUser = (props: any) => {

  return (

    <ul className={`bg-white absolute   translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100`}>
      <HeaderListText name="新規登録" path={`/users/`} />
      <LoginState loginState={props.loginState} SetLoginState={props.SetLoginState} />

    </ul>

  )
}

const UserNavigationGroupCart = () => {
  return (

    <ul className={`bg-white absolute translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100`}>
      <HeaderListText name="カート" path={`/carts`} />
      <HeaderListText name="お気に入り" path={`/items/favorite`} />
    </ul>

  )
}

const UserNavigationGroupOther = () => {
  return (

    <ul className={`bg-white absolute translate-y-4 flex flex-col rounded-xl  shadow-md  ${style.list} z-100 `}>
      <HeaderListText name="トップ" path={`/`} />
      <HeaderListText name="商品一覧" path={`/items`} />
    </ul>

  )
}

// opacity-0.3 absolute z-20  -translate-x-12

export const Header = () => {
  const [hamburgerMenuDisplayState, SetHamburgerMenuDisplayState] = useState(false)
  const [gestIdState, SetgestIdState] = useState(false)
  const cookieList: any = [];

  const [loginState, SetLoginState] = useState(false)


  useEffect(() => {
    const splitCookie = document.cookie.split(';');
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    // cookieにgestIDがセットされていな場合、付与する
    if (list.length !== 0) {
      list.map((data, index) => {
        if (data[0].includes("gestId")) {
          cookieList.push(data[0])
        }
        if(data.length >= 2){
          if (data[1].includes("login")) {
            SetLoginState(true)
          }
        }
      })
    }

    if (cookieList.length === 0) {
      let randomId = Math.random().toString(32).substring(2);
      document.cookie = `gestId=${randomId}; path=/;`;
    }

  })



  {/* <ModalWindow modal={true}/> */ }
  const HumburgerList = () => {
    // ハンバーガーメニューのロゴを押されたら表示
    if (hamburgerMenuDisplayState === true) {

      return (
        <div className=" pb-5  bg-white shadow-2xl rounded-md
        absolute  z-20 translate-y-16 -translate-x-4  md:hidden text-gray-500
        ">
          <ul className="flex flex-col">
            <li>
              <button className={`float-right ${style.close} `} onClick={() => {
                SetHamburgerMenuDisplayState(false)
              }}>
                <span className={`material-icons text-gray-400 ${style.close} `}>
                  close
                </span>
              </button>
            </li>
            <HeaderListText name="トップ" path={`/`} />
            <HeaderListText name="商品一覧" path={`/items`} />
            <HeaderListText name="カート" path={`/carts`} />
            <HeaderListText name="お気に入り" path={`/items/favorite`} />
            <HeaderListText name="新規登録" path={`/users/`} />

            <LoginState loginState={loginState} SetLoginState={SetLoginState} />
            {/* <HeaderListText name="ログイン" path={`/users/login`} /> */}
          </ul>
        </div>

      )
    } else {
      return <></>;
    }
  }

  return (
    <>
      <div className=" flex flex-wrap justify-between items-center  py-5  bg-gray-50 opacity-0.1 ">
        <div className="ml-10">
          <Logo path="/logoFlower.png" />
        </div>
        <ul className="float-right hidden md:block mx-5">
          <HeaderListGoogleIconList name="person" path={`/users/login`} list={<UserNavigationGroupUser loginState={loginState} SetLoginState={SetLoginState} />}
            title="アカウント"

          />
          <HeaderListGoogleIconList name="shopping_cart" path={`/users/login`} list={<UserNavigationGroupCart />}
            title="カート"

          />
          <HeaderListGoogleIconList name="favorite" path={`/users/login`} list={<UserNavigationGroupOther />}
            title="商品"

          />

        </ul>

        <div className="flex flex-col md:hidden ">
          <button onClick={() => {
            SetHamburgerMenuDisplayState(true)
          }}>
            <span className={`material-icons mx-8 text-gray-400 ${style.menu}`}>
              menu
            </span>
          </button>

        </div>
      </div>
      <div className="container flex flex-wrap justify-end items-center mx-auto  py-5  ">
        <HumburgerList />
      </div>
      {/* </nav> */}
    </>
  );
}


const LoginState = (props: any) => {
  const router = useRouter()
  if (props.loginState === false) {
    return (
      <HeaderListText name="ログイン" path={`/users/login`} />
    )
  } else {
    return (
      <li className={`float-left mx-8 py-2.5  ${style.link}`}>
        <button type="button"
          onClick={() => {
            document.cookie = "status=login; path=/; max-age=0;";
            Swal.fire(
              {
                icon: 'success',
                text: 'ログアウトしました！',
                confirmButtonText: '　　OK　　',
                confirmButtonColor: "#75ad9d"
              }
            )
            props.SetLoginState(false)
            router.push("/items")
          }}
        >ログアウト</button>
      </li>
    )
  }
}


export default Header;
