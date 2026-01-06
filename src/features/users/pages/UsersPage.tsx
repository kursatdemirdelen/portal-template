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
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/shared/ui";
import { Card } from "antd";
import { TableSkeleton } from "@/shared/ui/Loaders";
import { EmptyState } from "@/shared/ui/EmptyState";
import { UserStatsCards, UserFiltersBar, UserTable } from "../ui";
import { useUsers } from "../hooks";
import type { User } from "../model";

/**
 * Kullanıcı yönetimi ana sayfası
 */
const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredUsers,
    loading,
    stats,
    selectedRowKeys,
    searchText,
    roleFilter,
    statusFilter,
    setSearchText,
    setRoleFilter,
    setStatusFilter,
    setSelectedRowKeys,
    handleBulkStatusChange,
  } = useUsers();

  const handleCreateClick = () => {
    navigate("/users/create");
  };

  const handleViewUser = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handleEditUser = (user: User) => {
    navigate(`/users/${user.id}/edit`);
  };

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
        onCreateClick={handleCreateClick}
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
            onAction={handleCreateClick}
          />
        </Card>
      ) : (
        <UserTable
          users={filteredUsers}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          onView={handleViewUser}
          onEdit={handleEditUser}
        />
      )}
    </PageContainer>
  );
};

export default UsersPage;
