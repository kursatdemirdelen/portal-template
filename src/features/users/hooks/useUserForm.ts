/**
 * useUserForm Hook
 * 
 * Kullanıcı formu işlemleri için hook.
 */

import { useState, useCallback } from "react";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { User, UserFormData } from "../model/types";

interface UseUserFormOptions {
  user?: User | null;
  onSuccess?: () => void;
}

interface UseUserFormReturn {
  form: ReturnType<typeof Form.useForm>[0];
  saving: boolean;
  handleSave: (values: UserFormData) => Promise<void>;
  handleReset: () => void;
  handleCancel: () => void;
}

export const useUserForm = (options: UseUserFormOptions = {}): UseUserFormReturn => {
  const { user, onSuccess } = options;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async (values: UserFormData) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        // Update existing user
        const updatedUser = {
          ...user,
          ...values,
          status: values.isActive ? "active" : "inactive",
          updatedAt: new Date().toISOString(),
        };

        // localStorage'daki kullanıcıyı güncelle
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const localUsers = JSON.parse(storedUsers);
          const index = localUsers.findIndex((u: User) => u.id === user.id);
          if (index !== -1) {
            localUsers[index] = updatedUser;
            localStorage.setItem("users", JSON.stringify(localUsers));
          }
        }

        message.success("Kullanıcı başarıyla güncellendi!");
        navigate(`/users/${user.id}`);
      } else {
        // Create new user
        const userData = {
          id: `user-${Date.now()}`,
          name: values.name,
          email: values.email,
          phone: values.phone || "",
          role: values.role,
          department: values.department,
          status: values.isActive ? "active" : "inactive",
          language: values.language || "tr",
          company: values.company || "",
          timezone: values.timezone || "Europe/Istanbul",
          avatar: "",
          lastLogin: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Add to users list
        const existingUsers = localStorage.getItem("users");
        const usersList = existingUsers ? JSON.parse(existingUsers) : [];
        usersList.push(userData);
        localStorage.setItem("users", JSON.stringify(usersList));

        message.success("Kullanıcı başarıyla oluşturuldu!");
        navigate("/users");
      }

      onSuccess?.();
    } catch {
      message.error(user ? "Güncelleme başarısız oldu!" : "Kullanıcı oluşturma başarısız oldu!");
    } finally {
      setSaving(false);
    }
  }, [user, navigate, onSuccess]);

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleCancel = useCallback(() => {
    navigate(user ? `/users/${user.id}` : "/users");
  }, [navigate, user]);

  return {
    form,
    saving,
    handleSave,
    handleReset,
    handleCancel,
  };
};
