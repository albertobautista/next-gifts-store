import { User } from "gifts-store/models";
import bcrypt from "bcryptjs";
import { db } from ".";

export const checkUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  console.log("checkUserByEmailAndPassword", { email, password });
  console.log("checkUserByEmailAndPassword db", { db });
  await db.connect();
  const user = await User.findOne({ email });
  console.log("checkUserByEmailAndPassword user 1", { user });

  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { role, name, _id, picture } = user;
  console.log("checkUserByEmailAndPassword user 2", { user });

  return {
    id: _id,
    email: email.toLowerCase(),
    role,
    name,
    picture,
  };
};

// Esta función crea o verifica el usuario de OAuth
export const oAuthToDbUser = async (
  oAuthEmail: string,
  oAuthName: string,
  oAuthPicture: string
) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role, picture } = user;
    return { _id, name, email, role, picture };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
    picture: oAuthPicture,
  });
  console.log("oAuthToDbUser newUser", { newUser });

  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role, picture } = newUser;
  return { _id, name, email, role, picture };
};
