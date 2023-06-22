import { IMenuOption, IOption } from "gifts-store/interfaces";

export const PRODUCT_TYPE_OPTIONS: IOption[] = [
  { keyword: "shirts", value: "Camisas" },
  { keyword: "pants", value: "Pantalones" },
  { keyword: "hats", value: "Gorras" },
  { keyword: "hoodies", value: "Sudaderas" },
  { keyword: "jerseys", value: "Jerseys" },
  { keyword: "shorts", value: "Shorts" },
  { keyword: "accessories", value: "Accesorios" },
];
export const PRODUCT_GENDER_OPTIONS: IOption[] = [
  { keyword: "men", value: "Caballeros" },
  { keyword: "women", value: "Damas" },
  { keyword: "kids", value: "Niños" },
  { keyword: "unisex", value: "Unisexo" },
];

export const MENU_OPTIONS: IMenuOption[] = [
  { text: "Accesorios", value: "accessories" },
  { text: "Gorras", value: "hats" },
  { text: "Sudaderas", value: "hoodies" },
  { text: "Camisas", value: "shirts" },
  { text: "Jerseys", value: "jerseys" },
];
