// 商品のオプション
export type Option = {
  // 識別子
  id: number;
  // オプションの名前
  name: string;
  // オプションの説明
  description: string;
  // オプションの価格
  price: number;
};

// 商品
export type Item = {
  // 識別子
  id: number;
  // 商品名
  name: string;
  // 商品の説明
  description: string;
  // 商品の価格
  price: number;
  // 商品画像のURL
  imageUrl: string;
  // 削除フラグ
  deleted: boolean;
  // 商品に付随するオプション
  options: Option[];
};
