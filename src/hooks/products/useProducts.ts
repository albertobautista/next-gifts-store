import { IProduct } from "gifts-store/interfaces";
import useSWR, { SWRConfiguration } from "swr";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api/${url}`, fetcher, config);
  const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config);
  console.log("useProducts", url, data, error);
  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
