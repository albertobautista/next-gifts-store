import { IUser } from "gifts-store/interfaces";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
