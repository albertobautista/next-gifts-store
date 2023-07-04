import { db, seedDatabase } from "gifts-store/database";
import { Product, User } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
