import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { tokenService } from "@/shared/api/tokenService";
import type { AuthState, AuthUser } from "../model/types";

interface AuthContextValue extends AuthState {
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "auth_state";

const getInitialState = (): AuthState => {
  // Önce token storage'dan kontrol et
  const userFromToken = tokenService.getUserFromToken();
  if (userFromToken) {
    return { user: userFromToken, isAuthenticated: true, isLoading: false };
  }

  // Token yoksa eski localStorage'dan try et
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthState;
      return { ...parsed, isLoading: false };
    }
  } catch {
    // ignore
  }
  return { user: null, isAuthenticated: false, isLoading: false };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(getInitialState);

  // persist to localStorage (legacy)
  useEffect(() => {
    try {
      const toSave = JSON.stringify({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      });
      localStorage.setItem(STORAGE_KEY, toSave);
    } catch {
      // ignore
    }
  }, [state.user, state.isAuthenticated]);

  const logout = React.useCallback(() => {
    // Token'ı sil
    tokenService.removeToken();
    // localStorage cleanup
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  // 401 event listener - API interceptor'dan gelen logout signal
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [logout]);

  const login = (user: AuthUser, token: string) => {
    // Token'ı secure storage'a kaydet
    tokenService.setToken(token);
    setState({ user, isAuthenticated: true, isLoading: false });
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
    [state, logout]
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
