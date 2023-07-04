import { ICartProduct } from "gifts-store/interfaces";
import { CartState, IAddress } from "./";

type CartActionType =
  | {
      type: "[Cart] - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Load address from cookies";
      payload: IAddress;
    }
  | { type: "[Cart] - Update Address"; payload: IAddress }
  | { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Change product cart quantity"; payload: ICartProduct }
  | { type: "[Cart] - Order created" }
  | { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
  | {
      type: "[Cart] - Update Order Summary";
      payload: {
        subTotal: number;
        total: number;
        tax: number;
        itemsNumber: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - Update products in cart":
      return { ...state, cart: [...action.payload] };
    case "[Cart] - Load cart from cookies | storage":
      return { ...state, isLoaded: true, cart: [...action.payload] };
    case "[Cart] - Change product cart quantity":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id !== action.payload._id) return item;
          if (item._id !== action.payload.size) return item;
          return action.payload;
        }),
      };
    case "[Cart] - Remove product in cart":
      return {
        ...state,

        cart: state.cart.filter((item) => {
          if (
            item._id === action.payload._id &&
            item.size === action.payload.size
          ) {
            return false;
          } else {
            return true;
          }
        }),
      };
    case "[Cart] - Update Order Summary":
      return {
        ...state,
        ...action.payload,
      };
    case "[Cart] - Update Address":
    case "[Cart] - Load address from cookies":
      return {
        ...state,
        address: action.payload,
      };
    case "[Cart] - Order created":
      return {
        ...state,
        cart: [],
        itemsNumber: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
