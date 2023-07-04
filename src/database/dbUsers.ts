import { User } from "gifts-store/models";
import bcrypt from "bcryptjs";
import { db } from ".";

export const checkUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { role, name, _id, picture } = user;

  return {
    id: _id,
    email: email.toLowerCase(),
    role,
    name,
    picture,
  };
};

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

  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role, picture } = newUser;
  return { _id, name, email, role, picture };
};
