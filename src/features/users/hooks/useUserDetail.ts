/**
 * useUserDetail Hook
 * 
 * Tek kullanıcı detayı yükleme ve yönetimi için hook.
 */

import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { userService } from "@/shared/api/userService";
import type { User } from "../model/types";

interface UseUserDetailOptions {
  userId?: string;
  redirectOnNotFound?: boolean;
}

interface UseUserDetailReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useUserDetail = (options: UseUserDetailOptions): UseUserDetailReturn => {
  const { userId, redirectOnNotFound = true } = options;
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // API'den kullanıcıyı getir
      const response = await userService.getUsers();
      let foundUser = response.data.find((u) => u.id === userId);

      // Bulamazsa localStorage'dan bak
      if (!foundUser) {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const localUsers = JSON.parse(storedUsers);
          foundUser = localUsers.find((u: User) => u.id === userId);
        }
      }

      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("Kullanıcı bulunamadı");
        if (redirectOnNotFound) {
          message.error("Kullanıcı bulunamadı");
          navigate("/users");
        }
      }
    } catch {
      setError("Kullanıcı yüklenirken hata oluştu");
      message.error("Kullanıcı yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [userId, navigate, redirectOnNotFound]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    reload: loadUser,
  };
};
