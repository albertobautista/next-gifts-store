import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "gifts-store/interfaces";
import Cookies from "js-cookie";
export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  subTotal: number;
  total: number;
  tax: number;
  itemsNumber: number;
  address?: IAddress;
}
export interface IAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  subTotal: 0,
  total: 0,
  tax: 0,
  itemsNumber: 0,
  address: {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  },
};

interface ContextProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addToCart = (product: ICartProduct) => {
    console.log("PRODUCTS", product);
    const isProductInCart = state.cart.some((item) => item._id === product._id);
    console.log("PRODUCTS isProductInCart", isProductInCart);

    if (!isProductInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const isProductInCartButDifferentSize = state.cart.some(
      (item) => item._id === product._id && item.size === product.size
    );
    console.log(
      "PRODUCTS isProductInCartButDifferentSize",
      isProductInCartButDifferentSize
    );

    if (!isProductInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((item) => {
      if (item._id !== product._id) return item;
      if (item.size !== product.size) return item;

      item.quantity += product.quantity;
      return item;
    });
    console.log("PRODUCTS updatedProducts", updatedProducts);

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };
  const updateProductCarQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Change product cart quantity",
      payload: product,
    });
  };

  const removeProductCart = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove product in cart",
      payload: product,
    });
  };
  const updateAddress = (address: IAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zip", address.zip);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);

    dispatch({ type: "[Cart] - Update Address", payload: address });
  };

  useEffect(() => {
    try {
      const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [];
      console.log("PRODUCTS cart", cart);
      dispatch({
        type: "[Cart] - Load cart from cookies | storage",
        payload: cart,
      });
    } catch (err) {
      dispatch({
        type: "[Cart] - Load cart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const itemsNumber = state.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const subTotal = state.cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const taxRate = 0.15;
    const orderSummary = {
      itemsNumber,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };
    dispatch({ type: "[Cart] - Update Order Summary", payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    if (Cookies.get("firstName")) {
      const address = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zip: Cookies.get("zip") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };
      dispatch({
        type: "[Cart] - Load address from cookies",
        payload: address,
      });
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateProductCarQuantity,
        removeProductCart,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
