import { db } from "gifts-store/database";
import { IProduct } from "gifts-store/interfaces";
import { Product } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsBySlug(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
async function getProductsBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });
  return res.status(200).json(product);
}
