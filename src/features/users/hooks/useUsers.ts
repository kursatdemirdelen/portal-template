/**
 * useUsers Hook
 * 
 * Kullanıcı listesi yönetimi için ana hook.
 * Filtreleme, sıralama, seçim ve CRUD işlemlerini yönetir.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { Form, message } from "antd";
import { userService } from "@/shared/api/userService";
import type { User, UserRole, UserStatus, UserFilters, UserStatsDisplay, CreateUserRequest } from "../model/types";

// Default filter değerleri
const DEFAULT_FILTERS: UserFilters = {
  search: "",
  role: "all",
  status: "all",
};

export const useUsers = () => {
  // Core State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // ==========================================================================
  // DATA LOADING
  // ==========================================================================

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      let allUsers = response.data;
      
      // localStorage'dan oluşturulan kullanıcıları ekle
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const localUsers = JSON.parse(storedUsers);
        allUsers = [...allUsers, ...localUsers];
      }
      
      setUsers(allUsers);
    } catch {
      // localStorage'dan veri oku (API başarısız olsa bile)
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        message.error("Kullanıcılar yüklenirken hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk yüklemede kullanıcıları getir
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  // Filtrelenmiş kullanıcılar
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        filters.search === "" ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRole = filters.role === "all" || user.role === filters.role;
      const matchesStatus = filters.status === "all" || user.status === filters.status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, filters]);

  // İstatistikler - tüm kullanıcılar üzerinden
  const stats: UserStatsDisplay = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive" || u.status === "suspended").length,
    admins: users.filter((u) => u.role === "admin" || u.role === "manager").length,
  }), [users]);

  // ==========================================================================
  // FILTER HANDLERS
  // ==========================================================================

  const setSearchText = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const setRoleFilter = useCallback((value: UserRole | "all") => {
    setFilters((prev) => ({ ...prev, role: value }));
  }, []);

  const setStatusFilter = useCallback((value: UserStatus | "all") => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // ==========================================================================
  // MODAL HANDLERS
  // ==========================================================================

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

  // ==========================================================================
  // CRUD OPERATIONS
  // ==========================================================================

  const handleDelete = useCallback(async (id: string) => {
    try {
      await userService.deleteUser({ id });
      message.success("Kullanıcı silindi");
      loadUsers();
    } catch {
      message.error("Silme işlemi başarısız");
    }
  }, [loadUsers]);

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
  }, [selectedRowKeys, loadUsers]);

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
  }, [form, editingUser, closeModal, loadUsers]);

  // ==========================================================================
  // RETURN
  // ==========================================================================

  return {
    // Data
    users,
    filteredUsers,
    loading,
    stats,
    
    // Selection
    selectedRowKeys,
    setSelectedRowKeys,
    
    // Filters
    searchText: filters.search,
    roleFilter: filters.role,
    statusFilter: filters.status,
    setSearchText,
    setRoleFilter,
    setStatusFilter,
    resetFilters,
    
    // Modal
    modalVisible,
    editingUser,
    form,
    openCreateModal,
    openEditModal,
    closeModal,
    
    // Actions
    handleDelete,
    handleBulkStatusChange,
    handleSave,
    loadUsers,
  };
};

