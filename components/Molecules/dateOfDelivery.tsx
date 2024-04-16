import React from 'react'

export const DateOfDelivery = (props: {ordererDateState: {current: string[]} }) => {

// 購入日をセット
  const  orderDate = new Date();
   // 年・月・日ごとに取り出す（本日）
   const orderDateFullYear = orderDate.getFullYear()
   const orderDateMonth = orderDate.getMonth() + 1
   const orderDateDate = orderDate.getDate()
  
    // 〇年〇月〇日に変換（本日）
    const orderDateFormat = `${orderDateFullYear}-${orderDateMonth}-${orderDateDate}`

    props.ordererDateState.current[4] = orderDateFormat

  
  if(props.ordererDateState.current[0] === "日時指定なし"){

    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  // 年・月・日ごとに取り出す（３日後）
  const threeDaysLaterFullYear = threeDaysLater.getFullYear()
  const threeDaysLaterMonth = threeDaysLater.getMonth() + 1
  const threeDaysLaterDate = threeDaysLater.getDate()

  // 〇年〇月〇日に変換（３日後）
  const threeDaysLaterFormat = `${threeDaysLaterFullYear}年${threeDaysLaterMonth}月${threeDaysLaterDate}日`


  // 年・月・日ごとに取り出す（５日後）
  const fiveDaysLaterFullYear = fiveDaysLater.getFullYear()
  const fiveDaysLaterMonth = fiveDaysLater.getMonth() + 1
  const fiveDaysLaterDate = fiveDaysLater.getDate()

  // 〇年〇月〇日に変換（５日後）
  const fiveDaysLaterFormat = `${fiveDaysLaterFullYear}年${fiveDaysLaterMonth}月${fiveDaysLaterDate}日`

  props.ordererDateState.current[5] = `${threeDaysLaterFormat}～${fiveDaysLaterFormat}`
  return (
    <>
      <div className="grid grid-cols-7 h-24">
        <p className="items-center flex justify-center col-span-2">配達日時</p>
        <ul className="items-center col-span-4  py-4">
          <li className=" ">
            日時指定なし
          </li>
          <li > {threeDaysLaterFormat}～{fiveDaysLaterFormat} <span className="text-sm">発送予定</span></li>
          <li className="text-sm">※即日配送・日時指定（６日以降）が可能です</li>
        </ul>
      </div>
    </>
  )
}else if(props.ordererDateState.current[0] === "日時指定あり"){

  const Specified = new Date();
  let split =  props.ordererDateState.current[2].split('-');
  
    // 〇年〇月〇日に変換（指定日）
    const SpecifiedFormat = `${split[0]}年${split[1]}月${split[2]}日`

    props.ordererDateState.current[5] = `${SpecifiedFormat}`
    return (
      <>
      <div className="grid grid-cols-7 h-24">
        <p className="items-center flex justify-center col-span-2">配達日時</p>
        <ul className="items-center col-span-4  py-4">
          <li className=" ">
            日時指定あり
          </li>
          <li > {SpecifiedFormat} <span className="text-sm">到着予定</span></li>
          <li className="text-sm">（天候により到着が前後することがあります）</li>
        </ul>
      </div>
    </>
  )
}else{
  // 即日配送
  // console.log(props.ordererDateState.current[0])

  const  OneDaysLater = new Date();
  
  OneDaysLater.setDate(OneDaysLater.getDate() + 1);
  
  // 年・月・日ごとに取り出す（1日後）
  const OneDaysLaterFullYear = OneDaysLater.getFullYear()
  const OneDaysLaterMonth = OneDaysLater.getMonth() + 1
  const OneDaysLaterDate = OneDaysLater.getDate()
  
  // 〇年〇月〇日に変換（指定日）
  const OneDaysLaterFormat = `${OneDaysLaterFullYear}年${OneDaysLaterMonth}月${OneDaysLaterDate}日`
  
  props.ordererDateState.current[5] = `${OneDaysLaterFormat}`
  return (
    <>
      <div className="grid grid-cols-7 h-24">
        <p className="items-center flex justify-center col-span-2">配達日時</p>
        <ul className="items-center col-span-4  py-4">
          <li className=" ">
            即日配送
          </li>
          <li > {OneDaysLaterFormat} <span className="text-sm">到着予定</span></li>
          <li className="text-sm">（天候により到着が前後することがあります）</li>
        </ul>
      </div>
    </>
  )
}
}
