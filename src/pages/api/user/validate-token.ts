import { db } from "gifts-store/database";
import { User } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrytp from "bcryptjs";
import { jwt } from "gifts-store/utils";

type Data =
  | {
      message: string;
    }
  | { token: string; user: { email: string; role: string; name: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return loginUser(req, res);

    default:
      return res.status(404).json({ message: "Bad request" });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({ message: "Token no valido" });
  }
  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "No existe el usuario " });
  }

  const { role, name, _id, email } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: { email, role, name },
  });
}
