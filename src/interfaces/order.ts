import { IUser, TSize } from "./";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: TSize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}
