/**
 * useUsers Hook
 * 
 * Kullanıcı sayfası için state ve işlemleri yöneten hook.
 */

import { useState, useEffect, useCallback } from "react";
import { Form, message } from "antd";
import { userService } from "@/shared/api/userService";
import type { User, UserRole, UserStatus, CreateUserRequest } from "../model/types";

interface UserStats {
  total: number;
  active: number;
  admins: number;
}

export const useUsers = () => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [form] = Form.useForm();

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch {
      message.error("Kullanıcılar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statistics
  const stats: UserStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  }, [form]);

  const openEditModal = useCallback((user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  }, [form]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  }, [form]);

  // CRUD operations
  const handleDelete = useCallback(async (id: string) => {
    try {
      await userService.deleteUser({ id });
      message.success("Kullanıcı silindi");
      loadUsers();
    } catch {
      message.error("Silme işlemi başarısız");
    }
  }, []);

  const handleBulkStatusChange = useCallback(async (status: UserStatus) => {
    try {
      await Promise.all(
        selectedRowKeys.map((id) =>
          userService.updateUser({ id: id as string, status })
        )
      );
      message.success(`${selectedRowKeys.length} kullanıcı güncellendi`);
      setSelectedRowKeys([]);
      loadUsers();
    } catch {
      message.error("Toplu güncelleme başarısız");
    }
  }, [selectedRowKeys]);

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await userService.updateUser({ id: editingUser.id, ...values });
        message.success("Kullanıcı güncellendi");
      } else {
        await userService.createUser(values as CreateUserRequest);
        message.success("Kullanıcı oluşturuldu");
      }
      closeModal();
      loadUsers();
    } catch {
      message.error("İşlem başarısız");
    }
  }, [form, editingUser, closeModal]);

  return {
    users,
    filteredUsers,
    loading,
    stats,
    modalVisible,
    editingUser,
    form,
    selectedRowKeys,
    searchText,
    roleFilter,
    statusFilter,
    setSearchText,
    setRoleFilter,
    setStatusFilter,
    setSelectedRowKeys,
    openCreateModal,
    openEditModal,
    closeModal,
    handleDelete,
    handleBulkStatusChange,
    handleSave,
  };
};
