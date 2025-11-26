/**
 * Role Selector Component
 *
 * Rol seçimi bölümü.
 */

import React from "react";
import { Select, Tag } from "antd";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";
import type { RolePermissionMap } from "../model";

interface RoleSelectorProps {
  roles: RolePermissionMap[];
  selectedRole: RolePermissionMap;
  onRoleChange: (roleId: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  selectedRole,
  onRoleChange,
}) => {
  return (
    <SectionCard variant="default" style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <strong style={{ marginRight: 12 }}>Rol Seçin:</strong>
        <Select
          value={selectedRole.id}
          onChange={onRoleChange}
          style={{ width: 250 }}
        >
          {roles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.roleName}
              {role.isSystem && <Tag style={{ marginLeft: 8 }}>Sistem</Tag>}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div style={{ fontSize: 12, color: colorPalette.textMuted }}>
        <p>{selectedRole.description}</p>
      </div>
    </SectionCard>
  );
};
