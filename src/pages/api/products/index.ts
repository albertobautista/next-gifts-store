import { db, STORE_CONSTANTS } from "gifts-store/database";
import { IProduct } from "gifts-store/interfaces";
import { Product } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { type = "all" } = req.query;

  let condition = {};
  if (type !== "all" && STORE_CONSTANTS.validTypes.includes(type.toString())) {
    condition = { type };
  }
  await db.connect();
  const products = await Product.find(condition)
    .select("title slug description type sizes price inStock images -_id")
    .lean();
  await db.disconnect();
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  return res.status(200).json(updatedProducts);
}
