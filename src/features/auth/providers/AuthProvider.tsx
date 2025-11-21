import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthState, AuthUser } from "../model/types";

interface AuthContextValue extends AuthState {
  login: (user: AuthUser) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialState: AuthState = {
  user: {
    id: "1",
    name: "Kürşat (Admin)",
    role: "admin",
    email: "kursat@example.com",
  },
  isAuthenticated: true,
  isLoading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = (user: AuthUser) => {
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const setLoading = (value: boolean) => {
    setState((prev) => ({ ...prev, isLoading: value }));
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      setLoading,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
