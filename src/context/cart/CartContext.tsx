import { ICartProduct } from "gifts-store/interfaces";
import { createContext } from "react";
import { IAddress } from "./CartProvider";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  subTotal: number;
  total: number;
  tax: number;
  itemsNumber: number;
  address?: IAddress;
  addToCart: (product: ICartProduct) => void;
  updateProductCarQuantity: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
  updateAddress: (address: IAddress) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextProps);
