import style from "../../src/styles/favorite.module.css"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Swal from 'sweetalert2'

import { FavoriteItem } from "types/type"

export const Favorite = (props: { favorite ?: string, data?: {favoriteItem?: FavoriteItem, gestId?: string, id?: number} }) => {
  const [favorite, SetFavorite] = useState(false)
  const [gestIdValue, SetGestIdValue] = useState("")
  const router = useRouter()
  const ref = useRef(false)

  useEffect(() => {

    const splitCookie = document.cookie.split(';');
    const list = [];

    for (let i = 0; i < splitCookie.length; i++) {
      list.push(splitCookie[i].split('='));
    }

    list.map((cookieData, index) => {
      // ゲストID取得
      if (cookieData.includes(" gestId") || cookieData.includes("gestId")) {
        SetGestIdValue(cookieData[1]);
      }

    })

  })


  console.log(favorite)
  if (props.favorite === "favorite") {
    return (
      <label className={`${style.like} text-[17px] text-gray-500 `}>
        ×
      </label>
    )
  } else {

    return (
      <label className={`${style.like} `}>
        <input type="checkbox" onChange={(e) => {
          if (ref.current === false) {
            ref.current = true
          } else {
            ref.current = false
          }

          if (ref.current === true) {
            const favoriteData = {
              favoriteItem: props.data,
              gestId: gestIdValue
            };

            fetch(`http://localhost:8000/favorite`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(favoriteData)
            }).then((response) => {
              return response.json();
            }).then((data) => {
              // Swal.fire(
              //   {
              //     icon: 'success',
              //     text: 'お気に入りに追加しました',
              //     confirmButtonText: '　　OK　　',
              //     confirmButtonColor : "#75ad9d"
              //   }
              // )
            }).catch(error => {
              console.error('通信に失敗しました', error);
            });
          }

          console.log(props.data)
        }} />
        <span className={` material-icons ${style.glitter} `}>
          flare
        </span>
        <span className={` material-icons ${style.favorite} `}>
          favorite
        </span>

      </label>

    )
  }

}
