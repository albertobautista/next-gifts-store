export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: TSize[];
  slug: string;
  tags: string[];
  title: string;
  type: TTypes;
  gender: TGender;
  createdAt: string;
  updatedAt: string;
}

export type TSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type TTypes =
  | "shirts"
  | "pants"
  | "hoodies"
  | "hats"
  | "jerseys"
  | "shorts"
  | "socks"
  | "shoes"
  | "accessories"
  | "caps"
  | "other";
export type TGender = "men" | "women" | "kids" | "unisex";

export interface IOption {
  keyword: TTypes | TGender;
  value: string;
}
export interface IMenuOption {
  value: TTypes | TGender;
  text: string;
}
