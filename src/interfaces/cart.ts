import { TGender, TSize } from "./";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: TSize;
  slug: string;
  title: string;
  gender: TGender;
  quantity: number;
}
