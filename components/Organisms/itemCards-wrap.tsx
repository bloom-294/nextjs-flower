import Image from "next/image";
import Link from "next/link";
import { Favorite } from "../Molecules/favorite";
import style from "../../src/styles/itemListWrap.module.css";
import { ItemCardsWrapTypes, ItemCardsWrapRecognizeTypes } from "types/type";

// const ItemCardsWrapName = (props: any) => {
//   if (props.name.length <= 5 || props.name.includes(" ")) {
//     return (
//       <>
//       <p className="mb-2  text-sm font-nomal tracking-tight
//       w-32 h-4
//       text-gray-800  overflow-hidden">
//         {props.name}

//       </p>

//         </>
//     );
//   } else {
//     return (
//       <>
//         <div className="w-32">
//           <p className="mb-2  text-sm font-nomal tracking-tight
//           w-20 h-12 text-gray-800  overflow-hidden flex float-left">
//             {props.name}
//           </p>
//           <span className="w-8 -translate-y-1.5 -translate-x-2 absolute">...</span>
//         </div>
//       </>
//     );
//   }
// }

export const ItemCardsWrap = (props: ItemCardsWrapTypes) => {
  return (
    <div className="w-48 h-80  rounded-lg   shadow-lg  cursor-pointer">
      <Link href={`/items/${props.id}`}>
        <a>
          <Image
            className="
            rounded-t-lg object-cover
            "
            src={props.imagePath}
            alt=""
            width={200}
            height={200}
          />
        </a>
      </Link>
      <div className="px-4 mt-3  flex">
        <Link href={`/items/${props.id}`}>
          <a>
            <p
              className="mb-2  text-sm font-nomal tracking-tight 
            w-32 h-10
            text-gray-800 dark:text-white overflow-hidden"
            >
              {props.name}
            </p>
            {/* < ItemCardsWrapName name={props.name} /> */}
          </a>
        </Link>
        <div className=" text-right  ml-auto">
          <Favorite data={props.data} favorite={props.favorite} />
        </div>
      </div>
      {/* <div className="absolute -translate-y-4 mx-8" >
        <span className="material-symbols-rounded text-gray-400 " style={{"fontSize": "22px" }}>
          star
        </span>
        <span className="material-symbols-rounded text-gray-400 " style={{"fontSize": "22px"}}>
          star_half
        </span>
        <span className="material-symbols-rounded text-white " style={{"fontSize": "22px"}}>
          star
        </span>
        <span className="material-symbols-rounded text-white " style={{"fontSize": "22px"}}>
          star
        </span>
        <span className="material-symbols-rounded text-white " style={{"fontSize": "22px"}}>
          star
        </span>
      </div> */}
      <h5 className="my-3 text-lg font-bold text-gray-500 dark:text-gray-400 text-center">
        {Number(props.price).toLocaleString()}円
        <span className="text-sm font-light">（税込）</span>
      </h5>
    </div>
  );
};

export const ItemCardsWrapRecognize = (props: ItemCardsWrapRecognizeTypes) => {
  let id = props.id;
  return (
    <div className=" w-[150px]   h-[250px] sm:h-[250px] cursor-pointer mx-1 shadow-md rounded-md">
      <Link href={`/items/${id}`}>
        <a>
          <Image
            src={props.imagePath}
            alt=""
            width={150}
            height={150}
            className="rounded-t-md object-cover"
          />
        </a>
      </Link>
      <div className="flex">
        <div className="px-6  sm:px-4 ">
          <Link href={`/items/${props.id}`}>
            <a>
              <p
                className={`mb-2 text-sm pt-0.5 text-gray-500 ${style.recognizeItemName}  sm:h-10 h-10 overflow-hidden`}
              >
                {props.name}
              </p>
            </a>
          </Link>
        </div>

        <div className="px-0 text-right sm:px-2 ">
          <Favorite />
        </div>
      </div>

      <h5 className="mb-1 text-sm text-gray-500 text-center">
        {Number(props.price).toLocaleString()}円
        <span className="block sm:inline-block text-[10px] hidden">
          （税込）
        </span>
      </h5>

      {/* <button className={`text-center text-white rounded-lg ml-2 ${style.recognizeButton}`}>カートに入れる</button> */}
    </div>
  );
};
