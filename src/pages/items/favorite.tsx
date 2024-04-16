import { ItemCardsWrap } from 'components/Organisms/itemCards-wrap'
import React from 'react'
import { useRef, useEffect } from 'react'





export const Favorite = ({ data } : any) => {
  const gestIdValue = useRef("")

  useEffect(() => {

    const splitCookie = document.cookie.split(';');
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    list.map((cookieData, index) => {
      // ゲストID取得
      if (cookieData.includes(" gestId") || cookieData.includes("gestId")) {
        gestIdValue.current = cookieData[1];
      }

    })

  }, [])


  // エラー表示
  const ErrorMessage = () => {
    if (data.length === 0) {

      return (
        <>
          <p className=" translate-y-8 translate-x-24 ">該当する商品がありません。</p>
        </>
      )
    } else {
      return <></>
    }
  }

  console.log(data)
  return (

    <>
      <div className="container flex flex-wrap justify-center items-center mx-auto py-5 px-5   ">


        <div className=" flex flex-nowrap " style={{ height: "100%" }} >



          <div className="float-right " style={{ height: "100%" }}>
            <div className=" flex flex-wrap justify-center items-center">
              <h1 className="text-[#75ad9d] text-[30px] ">お気に入り</h1>
              <ErrorMessage />
            </div>



            <div className=" my-12 grid gap-10 grid-cols-1 mx-32
  sm:grid-cols-2  sm:mx-1
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  2xl:grid-cols-5
  
">
              {
                data.map((itemData: {favoriteItem: {name:string,price:number, imagePath: string, id: number }}, index: number) => {
                  return (
                    <ItemCardsWrap name={itemData.favoriteItem.name} price={itemData.favoriteItem.price} imagePath={itemData.favoriteItem.imagePath} key={index} id={itemData.favoriteItem.id} favorite="favorite"/>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>

  )

}




export const getStaticProps = async () => {

  const res = await fetch(`http://localhost:8000/favorite`);
  const json = await res.json();

  return {
    props: { data: json },
    revalidate: 1
  }
}

export default Favorite;
