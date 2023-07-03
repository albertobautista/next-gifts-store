import { db } from "gifts-store/database";
import { User } from "gifts-store/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrytp from "bcryptjs";
import { isValidEmail, jwt } from "gifts-store/utils";
import { IUser } from "gifts-store/interfaces";

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
    case "POST":
      return registerUser(req, res);

    default:
      return res.status(404).json({ message: "Bad request" });
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = "", password = "", name = "" } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "El nombre debe ser mayor a 2 caracteres" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "El correo no es valido" });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: "Ese correo ya esta registrado" });
  }

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrytp.hashSync(password),
    role: "client",
    picture:
      "https://res.cloudinary.com/deykexyle/image/upload/v1688346692/emptyProfilePicture_rsj2gy.png",
  });

  try {
    await newUser.save({
      validateBeforeSave: true,
    });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en servidor" });
  }
  const { _id, role } = newUser;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: { email, role, name },
  });
}
