import { db } from "gifts-store/database";
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
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { query = "" } = req.query;

  if (query.length === 0) {
    return res
      .status(400)
      .json({ message: "Debe de especificar el query de búsqueda" });
  }

  query = query.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: query },
  })
    .select("title images price inStock description type slug -_id")
    .lean();
  await db.disconnect();
  return res.status(200).json(products);
}
