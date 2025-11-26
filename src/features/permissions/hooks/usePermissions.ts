/**
 * usePermissions Hook
 * 
 * İzinler sayfası için state ve işlemleri yöneten hook.
 */

import { useState, useCallback, useMemo } from "react";
import { Modal } from "antd";
import type { RolePermissionMap, Permission } from "../model";
import { mockRolePermissions, getPermissionStats } from "../mockData";

export const usePermissions = () => {
  // State
  const [rolePermissions, setRolePermissions] =
    useState<RolePermissionMap[]>(mockRolePermissions);
  const [selectedRole, setSelectedRole] = useState<RolePermissionMap>(
    mockRolePermissions[0]
  );
  const [editingPermissions, setEditingPermissions] = useState<Set<string>>(
    new Set()
  );
  const [isDirty, setIsDirty] = useState(false);

  // Stats
  const stats = useMemo(() => getPermissionStats(), []);
  
  // Active permissions count for current role
  const activePermissionsCount = useMemo(
    () => selectedRole.permissions.filter((p: Permission) => p.isEnabled).length,
    [selectedRole]
  );

  // Handle role change
  const handleRoleChange = useCallback((roleId: string) => {
    const role = rolePermissions.find((r) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setEditingPermissions(new Set());
      setIsDirty(false);
    }
  }, [rolePermissions]);

  // Handle permission toggle
  const handlePermissionToggle = useCallback((permId: string) => {
    setEditingPermissions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(permId)) {
        newSet.delete(permId);
      } else {
        newSet.add(permId);
      }
      return newSet;
    });
    setIsDirty(true);
  }, []);

  // Handle save
  const handleSave = useCallback(() => {
    Modal.confirm({
      title: "Yetkileri Kaydet",
      content: `${selectedRole.roleName} rolünün yetkileri güncellenecektir. Devam etmek istiyor musunuz?`,
      okText: "Kaydet",
      cancelText: "İptal",
      onOk() {
        const updatedPermissions = selectedRole.permissions.map(
          (p: Permission) => ({
            ...p,
            isEnabled: editingPermissions.has(p.id),
          })
        );

        const updatedRole: RolePermissionMap = {
          ...selectedRole,
          permissions: updatedPermissions,
        };
        setRolePermissions((prev) =>
          prev.map((r) => (r.id === selectedRole.id ? updatedRole : r))
        );
        setSelectedRole(updatedRole);
        setEditingPermissions(new Set());
        setIsDirty(false);
      },
    });
  }, [selectedRole, editingPermissions]);

  // Handle clone role
  const handleCloneRole = useCallback(() => {
    Modal.confirm({
      title: "Rolü Kopyala",
      content: `${selectedRole.roleName} rolü kopyalanacaktır. Devam etmek istiyor musunuz?`,
      okText: "Kopyala",
      cancelText: "İptal",
      onOk() {
        const newRole: RolePermissionMap = {
          ...selectedRole,
          id: `ROLE_${Date.now()}`,
          roleId: `role_${Date.now()}`,
          roleName: `${selectedRole.roleName} (Kopya)`,
          isSystem: false,
        };
        setRolePermissions((prev) => [...prev, newRole]);
      },
    });
  }, [selectedRole]);

  // Handle delete role
  const handleDeleteRole = useCallback(() => {
    if (selectedRole.isSystem) {
      Modal.error({
        title: "Sistem Rolü Silinemez",
        content: "Sistem rollerini silemezsiniz.",
      });
      return;
    }

    Modal.confirm({
      title: "Rolü Sil",
      content: `${selectedRole.roleName} rolü silinecektir. Devam etmek istiyor musunuz?`,
      okText: "Sil",
      cancelText: "İptal",
      okButtonProps: { danger: true },
      onOk() {
        const remaining = rolePermissions.filter(
          (r) => r.id !== selectedRole.id
        );
        setRolePermissions(remaining);
        if (remaining.length > 0) {
          setSelectedRole(remaining[0]);
        }
      },
    });
  }, [selectedRole, rolePermissions]);

  return {
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
  };
};
