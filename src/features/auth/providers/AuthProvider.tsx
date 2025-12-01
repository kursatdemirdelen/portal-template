import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthState, AuthUser } from "../model/types";

interface AuthContextValue extends AuthState {
  login: (user: AuthUser) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "auth_state";

const getInitialState = (): AuthState => {
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

  // persist to localStorage
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

  const login = (user: AuthUser) => {
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
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
