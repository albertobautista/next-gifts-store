import { FC, useEffect, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "gifts-store/interfaces";
import { api } from "gifts-store/api";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("Session", session, status);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.post("/user/login", { email, password });

      const { user, token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    // Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");
    signOut();
    // router.reload();
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await api.post("/user/register", {
        email,
        password,
        name,
      });
      const { user, token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario",
      };
    }
  };

  const checkToken = async () => {
    if (!Cookies.get("token")) return;
    try {
      const { data } = await api.get("/user/validate-token");
      const { user, token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session", session?.user);
      dispatch({ type: "[Auth] - Login", payload: session?.user as IUser });
    }
  }, [status, session]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
