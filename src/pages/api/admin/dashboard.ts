import { db } from "gifts-store/database";
import { Product, User } from "gifts-store/models";
import Order from "gifts-store/models/Order";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfAdmins: number;
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
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfAdmins,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: "client" }).count(),
    User.find({ role: "admin" }).count(),
    Product.find({}).count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();
  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfAdmins,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders: numberOfOrders - paidOrders,
  });
}
