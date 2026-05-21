import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // importa como type-only
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api"; // ajuste o caminho

interface AuthContextType {
  isAuthenticated: boolean;
  loadingAuth: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
    setLoadingAuth(false);
  }, []);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      if (!decoded.exp) return true;
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch {
      return true;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/Auth/login", { username, password });

      if (response.data?.token && !isTokenExpired(response.data.token)) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setIsAuthenticated(true);
        return true;
      }
      setIsAuthenticated(false);
      return false;
    } catch {
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
