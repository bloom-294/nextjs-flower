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

import { sql } from "@vercel/postgres";

let itemList: any;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
  // res: NextApiResponse<ItemListApiResponse>
) => {
  const id = req.query.id as string;
  const item = fetchItemList(Number(id));
  const itemListSql = await sql`SELECT * FROM items;`;
  itemList = await itemListSql.rows;

  if (item === "ALL") {
    res.status(200).json({ itemList });
  } else if (item) {
    res.status(200).json({ item });
  } else {
    res.status(400).json({ debugMessage: "not found" });
  }
};

const fetchItemList = (id: number) => {
  if (id) {
    return itemList.find((item: any) => item.id === id);
  } else {
    return "ALL";
  }
};

export default handler;
