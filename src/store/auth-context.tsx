"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface AuthContextType {
  isAuthenticated: boolean;
  initialized: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const auth = getCookie("isAuthenticated");
    setIsAuthenticated(auth === "true");
    setInitialized(true);
  }, []);

  const login = () => {
    setCookie("isAuthenticated", "true", { path: "/", maxAge: 60 * 60 * 24 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie("isAuthenticated", { path: "/" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, initialized, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
