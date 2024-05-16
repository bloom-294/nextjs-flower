// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  name: string;
  price: string;
  info: string;
  imagePath: string;
  category: string;
  recommend: number;
  popular: number;
  id: number;
};

export type ItemListApiResponse = {
  item?: Response;
  itemList?: Response[];
  debugMessage?: string;
};

// const itemList = [
//   {
//     name: "ザミオクルカス・ザミフォーリア",
//     price: "3850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-up-3.jpg",
//     category: "観葉植物",
//     recommend: 2,
//     popular: 20,
//     id: 1,
//   },
//   {
//     name: "アレンジメント　オレンジ系",
//     price: "4850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-1.jpg",
//     category: "花束・ブーケ",
//     recommend: 1,
//     popular: 19,
//     id: 2,
//   },
//   {
//     name: "アレンジメント　ローズ　赤系",
//     price: "4050",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-red-bin.jpg",
//     category: "花束・ブーケ　アレンジメント",
//     recommend: 4,
//     popular: 18,
//     id: 3,
//   },
//   {
//     name: "ザミオクルカス・ザミフォーリア",
//     price: "3850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-2.jpg",
//     category: "観葉植物",
//     recommend: 3,
//     popular: 17,
//     id: 4,
//   },
//   {
//     name: "アレンジメント　ローズ　ホワイト系",
//     price: "4850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/rose-white-gerbera-orange-top.jpg",
//     category: "花束・ブーケ　ドライフラワー　アレンジメント",
//     recommend: 6,
//     popular: 16,
//     id: 5,
//   },
//   {
//     name: "冬のアレンジメント　ドライフラワー",
//     price: "6850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-winter.jpg",
//     category: "花束・ブーケ　ドライフラワー　アレンジメント",
//     recommend: 5,
//     popular: 15,
//     id: 6,
//   },
//   {
//     name: "白い花",
//     price: "2850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/flower-1.jpg",
//     category: "生花",
//     recommend: 8,
//     popular: 14,
//     id: 7,
//   },
//   {
//     name: "観葉植物",
//     price: "3550",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-1.jpg",
//     category: "観葉植物",
//     recommend: 7,
//     popular: 13,
//     id: 8,
//   },
//   {
//     name: "ザミオクルカス・ザミフォーリア",
//     price: "2450",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-4.jpg",
//     category: "観葉植物",
//     recommend: 10,
//     popular: 12,
//     id: 9,
//   },
//   {
//     name: "ザミオクルカス・ザミフォーリア",
//     price: "5450",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-up-1.jpg",
//     category: "観葉植物",
//     recommend: 9,
//     popular: 11,
//     id: 10,
//   },
//   {
//     name: "ザミオクルカス・ザミフォーリア",
//     price: "1250",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/plant-up-2.jpg",
//     category: "観葉植物",
//     recommend: 12,
//     popular: 10,
//     id: 11,
//   },
//   {
//     name: "チューリップ　レッド系",
//     price: "5550",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-red-bin.jpg",
//     category: "生花　アレンジメント",
//     recommend: 11,
//     popular: 9,
//     id: 12,
//   },
//   {
//     name: "サボテン　多肉植物",
//     price: "4550",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/cactus-bg-pink.jpg",
//     category: "観葉植物　多肉植物",
//     recommend: 14,
//     popular: 8,
//     id: 13,
//   },
//   {
//     name: "チューリップ　ピンク系",
//     price: "6050",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/tulip-pink-1.jpg",
//     category: "生花　アレンジメント",
//     recommend: 13,
//     popular: 7,
//     id: 14,
//   },
//   {
//     name: "冬のアレンジメント　ドライフラワー　ピンク系",
//     price: "6850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/dryflower-red.jpg",
//     category: "花束・ブーケ　ドライフラワー　アレンジメント",
//     recommend: 16,
//     popular: 6,
//     id: 15,
//   },
//   {
//     name: "チューリップ　レッド系",
//     price: "4830",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-red-bin.jpg",
//     category: "生花　アレンジメント",
//     recommend: 15,
//     popular: 5,
//     id: 16,
//   },
//   {
//     name: "チューリップ　ホワイト系",
//     price: "3200",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/tulip-white.jpg",
//     category: "生花　アレンジメント",
//     recommend: 18,
//     popular: 4,
//     id: 17,
//   },
//   {
//     name: "チューリップ　オレンジ系",
//     price: "3930",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/tulip-pink-bg-blue.jpg",
//     category: "生花　アレンジメント",
//     recommend: 17,
//     popular: 3,
//     id: 18,
//   },
//   {
//     name: "サボテン　多肉植物",
//     price: "3450",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/cactus-bg-pink.jpg",
//     category: "観葉植物　多肉植物",
//     recommend: 20,
//     popular: 2,
//     id: 19,
//   },
//   {
//     name: "ローズ　ピンク・ホワイト系",
//     price: "1850",
//     info: "乾燥に強く、耐陰性のある室内で育てやすい観葉植物です。",
//     imagePath: "/bouquet-tulip-rose.jpg",
//     category: "生花　アレンジメント",
//     recommend: 19,
//     popular: 1,
//     id: 20,
//   },
// ];

import { sql } from "@vercel/postgres";


let itemList:any;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
  // res: NextApiResponse<ItemListApiResponse>
) => {
  const id = req.query.id as string;
  const item = fetchItemList(Number(id));
  const itemListSql = await sql`SELECT * FROM items;`;
  itemList = await itemListSql.rows

  if (item === "ALL") {
    res.status(200).json( { itemList } );
  } else if (item) {
    res.status(200).json({ item });
  } else {
    res.status(400).json({ debugMessage: "not found" });
  }
};

const fetchItemList = (id: number) => {
  if (id) {
    return itemList.find((item:any) => item.id === id);
  } else {
    return "ALL";
  }
};
