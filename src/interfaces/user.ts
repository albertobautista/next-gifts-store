export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  picture: string;
  createdAt?: string;
  updatedAt?: string;
}
