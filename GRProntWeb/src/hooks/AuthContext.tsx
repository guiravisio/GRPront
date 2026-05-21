import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // importa como type-only
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api"; // ajuste o caminho

interface AuthContextType {
  isAuthenticated: boolean;
  loadingAuth: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}


interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export type LoginResult = {
  success: boolean;
  mustChangePassword?: boolean;
  userId?: number;
};

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

  type LoginResult = {
    success: boolean;
    mustChangePassword?: boolean;
    userId?: number;
  };
  
  const login = async (username: string, password: string): Promise<LoginResult> => {
    try {
      const response = await api.post("/Auth/login", { username, password });
  
      if (response.data?.token && !isTokenExpired(response.data.token)) {
        localStorage.setItem("token", response.data.token);
  
        const decoded: DecodedToken = jwtDecode(response.data.token);
        const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const userClaim = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/user"]; 
        const nameClaim = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]; 
        if (roleClaim) {
          localStorage.setItem("role", roleClaim);
        }
        if (userClaim) {
          localStorage.setItem("user", userClaim);
        }
        if (nameClaim) {
          localStorage.setItem("userName", nameClaim);
        }
  
        setIsAuthenticated(true);
        return { success: true };
      }
  
      setIsAuthenticated(false);
      return { success: false };
    } catch (error: any) {
      setIsAuthenticated(false);
  
      // Detecta mensagem do backend
      if (error.response?.data?.message === "Senha precisa ser redefinida.") {
        return { success: false, mustChangePassword: true, userId: error.response.data.userId };
      }
  
      return { success: false };
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
