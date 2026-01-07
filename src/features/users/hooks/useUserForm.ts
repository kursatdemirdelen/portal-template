/**
 * useUserForm Hook
 * 
 * Kullanıcı formu işlemleri için hook.
 * Enhanced with isDirty tracking and unsaved changes warning.
 */

import { useState, useCallback, useEffect } from "react";
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
  isDirty: boolean;
  handleSave: (values: UserFormData) => Promise<void>;
  handleReset: () => void;
  handleCancel: () => void;
}

export const useUserForm = (options: UseUserFormOptions = {}): UseUserFormReturn => {
  const { user, onSuccess } = options;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Track form changes
  const handleFormChange = useCallback(() => {
    setIsDirty(true);
  }, []);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !saving) {
        e.preventDefault();
        e.returnValue = "Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?";
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, saving]);

  // Initialize form with user data if editing
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

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
          status: values.status || (values.isActive ? "active" : "inactive"),
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
        setIsDirty(false);
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

        // Also save as current created user for profile
        localStorage.setItem("createdUserData", JSON.stringify(userData));

        message.success("Kullanıcı başarıyla oluşturuldu!");
        setIsDirty(false);
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
    setIsDirty(false);
  }, [form]);

  const handleCancel = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm(
        "Kaydedilmemiş değişiklikler var. İptal etmek istediğinizden emin misiniz?"
      );
      if (!confirmed) return;
    }
    navigate(user ? `/users/${user.id}` : "/users");
  }, [navigate, user, isDirty]);

  return {
    form,
    saving,
    isDirty,
    handleSave,
    handleReset,
    handleCancel,
  };
};
