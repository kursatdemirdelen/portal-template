/**
 * Users Management Page
 *
 * Admin sayfası - kullanıcı yönetimi için CRUD işlemleri.
 *
 * @features
 * - Kullanıcı listeleme, ekleme, düzenleme, silme
 * - Rol ve durum filtreleme
 * - Toplu durum değiştirme
 * - Arama fonksiyonu
 */

import React from "react";
import { PageContainer } from "@/shared/ui";
import { Card } from "antd";
import { TableSkeleton } from "@/shared/ui/Loaders";
import { EmptyState } from "@/shared/ui/EmptyState";
import {
  UserStatsCards,
  UserFiltersBar,
  UserTable,
  UserFormModal,
} from "../ui";
import { useUsers } from "../hooks/useUsers";

/**
 * Kullanıcı yönetimi ana sayfası
 */
const UsersPage: React.FC = () => {
  const {
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
  } = useUsers();

  return (
    <PageContainer
      title="Kullanıcı Yönetimi"
      subtitle="Sistem kullanıcılarını yönetin"
    >
      {/* Statistics Cards */}
      <UserStatsCards stats={stats} />

      {/* Filters & Actions */}
      <UserFiltersBar
        searchText={searchText}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        selectedCount={selectedRowKeys.length}
        onSearchChange={setSearchText}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
        onBulkStatusChange={handleBulkStatusChange}
        onCreateClick={openCreateModal}
      />

      {/* Users Table with standardized loading/empty states */}
      {loading ? (
        <Card>
          <TableSkeleton />
        </Card>
      ) : filteredUsers.length === 0 ? (
        <Card>
          <EmptyState
            title="Kullanıcı bulunamadı"
            description="Filtreleri temizleyin veya yeni bir kullanıcı oluşturun."
            actionText="Yeni Kullanıcı"
            onAction={openCreateModal}
          />
        </Card>
      ) : (
        <UserTable
          users={filteredUsers}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Create/Edit Modal */}
      <UserFormModal
        open={modalVisible}
        editingUser={editingUser}
        form={form}
        onSave={handleSave}
        onCancel={closeModal}
      />
    </PageContainer>
  );
};

export default UsersPage;
