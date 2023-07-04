import { db } from "gifts-store/database";
import { IOrder } from "gifts-store/interfaces";
import { Product } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "gifts-store/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import Order from "gifts-store/models/Order";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createRouteLoader(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
async function createRouteLoader(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { orderItems, total } = req.body as IOrder;
  const session = (await getServerSession(req, res, authOptions)) as any;

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const productsIds = orderItems.map((item) => item._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });
  try {
    const subTotal = orderItems.reduce((acc, item) => {
      const currentPrice = dbProducts.find(
        (p) => new mongoose.Types.ObjectId(p._id).toString() === item._id
      )?.price;
      if (!currentPrice) throw new Error("Product not found");

      return acc + item.quantity * currentPrice;
    }, 0);
    const taxRate = 0.15;
    const backendTotal = subTotal * (1 + taxRate);
    if (total !== backendTotal) {
      throw new Error("Total is not correct");
    }

    const userId = session.user?.id;
    console.log("userId", session);
    const newOrder = new Order({ ...req.body, user: userId, isPaid: false });
    console.log("newOrder", { userId, newOrder });
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.message || "SERVER LOGS" });
  }
}
