/**
 * Permissions Management Page
 *
 * Rol bazlı izin yönetimi sayfası.
 *
 * @features
 * - Rol seçimi ve izin matrisi görüntüleme
 * - İzin toggle ve kaydetme
 * - Rol kopyalama ve silme
 * - İstatistikler
 */

import React from "react";
import { Button, Space } from "antd";
import { SaveOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import {
  PermissionStatsCards,
  RoleSelector,
  PermissionMatrixTable,
  RolesSummaryTable,
} from "../ui";
import { usePermissions } from "../hooks/usePermissions";

const PermissionsPage: React.FC = () => {
  const {
    rolePermissions,
    selectedRole,
    editingPermissions,
    isDirty,
    stats,
    activePermissionsCount,
    handleRoleChange,
    handlePermissionToggle,
    handleSave,
    handleCloneRole,
    handleDeleteRole,
  } = usePermissions();

  return (
    <PageContainer
      title="Yetkilendirme"
      subtitle="Roller ve izinleri yönetin"
      extra={
        <Space>
          {isDirty && (
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Kaydet
            </Button>
          )}
          <Button icon={<CopyOutlined />} onClick={handleCloneRole}>
            Rolü Kopyala
          </Button>
          {!selectedRole.isSystem && (
            <Button danger icon={<DeleteOutlined />} onClick={handleDeleteRole}>
              Sil
            </Button>
          )}
        </Space>
      }
    >
      {/* Stats Cards */}
      <PermissionStatsCards
        totalRoles={stats.totalRoles}
        systemRoles={stats.systemRoles}
        totalPermissions={stats.totalPermissions}
        activePermissions={activePermissionsCount}
      />

      {/* Role Selector */}
      <RoleSelector
        roles={rolePermissions}
        selectedRole={selectedRole}
        onRoleChange={handleRoleChange}
      />

      {/* Permission Matrix */}
      <PermissionMatrixTable
        selectedRole={selectedRole}
        editingPermissions={editingPermissions}
        onPermissionToggle={handlePermissionToggle}
      />

      {/* Roles Summary */}
      <RolesSummaryTable roles={rolePermissions} />
    </PageContainer>
  );
};

export default PermissionsPage;
