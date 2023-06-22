import { db } from "gifts-store/database";
import { Product, User } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number;
    }
  | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getDashboardData(req, res);

    default:
      return res.status(404).json({ message: "Bad request" });
  }
}
async function getDashboardData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();
  const numberOfOrders = 14;
  const paidOrders = 10;
  const notPaidOrders = numberOfOrders - paidOrders;
  //   const numberOfClients = await User.find({ role: "client" }).count();
  //   const numberOfProducts = await Product.find({}).count();
  //   const productsWithNoInventory = await Product.find({ inStock: 0 }).count();
  //   const lowInventory = await Product.find({ inStock: { $lte: 10 } }).count();

  const [
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    User.find({ role: "client" }).count(),
    Product.find({}).count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();
  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
