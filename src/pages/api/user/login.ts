import { db } from "gifts-store/database";
import { User } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrytp from "bcryptjs";
import { jwt } from "gifts-store/utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: { email: string; role: string; name: string; picture: string };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      return res.status(404).json({ message: "Bad request" });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "Correo o contraseña no validos" });
  }

  if (!bcrytp.compareSync(password, user.password!)) {
    return res.status(400).json({ message: "Correo o contraseña no validos" });
  }
  const { role, name, _id, picture } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: { email, role, name, picture },
  });
}
