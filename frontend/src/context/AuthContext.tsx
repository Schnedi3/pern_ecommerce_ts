import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

import { useShopContext } from "./useShopContext";
import {
  loginGoogleRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../Routes";
import { AuthContextType, ILogin, IRegister } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getCart, setCart } = useShopContext();
  const [user, setUser] = useState<ILogin | IRegister | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAuthSuccess = (response: any) => {
    setUser(response.data.result);
    setIsAuthenticated(true);
    getCart();
    toast.success(response.data.message);
    localStorage.setItem("user", JSON.stringify(response.data.result));
    navigate("/");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLogin(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const response = await loginGoogleRequest(accessToken);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const login = async (user: ILogin) => {
    try {
      const response = await loginRequest(user);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const signup = async (user: IRegister) => {
    try {
      const response = await registerRequest(user);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    toast.success("User logged out succesfully");
    navigate("/");
  };

  const resetPassword = async (user: ILogin) => {
    try {
      const response = await resetPasswordRequest(user);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const checkAuth = useCallback(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      getCart();
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [getCart]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleLogin,
        login,
        signup,
        logout,
        resetPassword,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
