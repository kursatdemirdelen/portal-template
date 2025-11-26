/**
 * Permission Matrix Table Component
 *
 * İzin matrisi tablosu.
 */

import React from "react";
import { Table } from "antd";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";
import type { PermissionModule, Permission, RolePermissionMap } from "../model";
import { MODULE_LABELS, ALL_MODULES } from "./constants";

interface PermissionMatrixTableProps {
  selectedRole: RolePermissionMap;
  editingPermissions: Set<string>;
  onPermissionToggle: (permId: string) => void;
}

interface MatrixRow {
  module: PermissionModule;
  view: string;
  create: string;
  edit: string;
  delete: string;
  export: string;
}

export const PermissionMatrixTable: React.FC<PermissionMatrixTableProps> = ({
  selectedRole,
  editingPermissions,
  onPermissionToggle,
}) => {
  // Build matrix data
  const matrixData: MatrixRow[] = ALL_MODULES.map((module) => {
    const modulePerms = selectedRole.permissions.filter(
      (p: Permission) => p.module === module
    );
    return {
      module,
      view: modulePerms.find((p: Permission) => p.action === "view")?.id || "",
      create:
        modulePerms.find((p: Permission) => p.action === "create")?.id || "",
      edit: modulePerms.find((p: Permission) => p.action === "edit")?.id || "",
      delete:
        modulePerms.find((p: Permission) => p.action === "delete")?.id || "",
      export:
        modulePerms.find((p: Permission) => p.action === "export")?.id || "",
    };
  });

  // Render checkbox for permission
  const renderCheckbox = (permId: string) => {
    if (!permId) return null;

    const isChecked =
      editingPermissions.has(permId) ||
      (selectedRole.permissions.find((p) => p.id === permId)?.isEnabled ??
        false);

    return (
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onPermissionToggle(permId)}
        style={{ cursor: "pointer", width: 18, height: 18 }}
      />
    );
  };

  const columns = [
    {
      title: "Modül",
      dataIndex: "module",
      key: "module",
      width: 130,
      render: (module: PermissionModule) => (
        <strong>{MODULE_LABELS[module]}</strong>
      ),
    },
    {
      title: "Görüntüle",
      dataIndex: "view",
      key: "view",
      width: 80,
      align: "center" as const,
      render: renderCheckbox,
    },
    {
      title: "Oluştur",
      dataIndex: "create",
      key: "create",
      width: 80,
      align: "center" as const,
      render: renderCheckbox,
    },
    {
      title: "Düzenle",
      dataIndex: "edit",
      key: "edit",
      width: 80,
      align: "center" as const,
      render: renderCheckbox,
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      width: 80,
      align: "center" as const,
      render: renderCheckbox,
    },
    {
      title: "Dışa Aktar",
      dataIndex: "export",
      key: "export",
      width: 80,
      align: "center" as const,
      render: renderCheckbox,
    },
  ];

  return (
    <SectionCard variant="default">
      <h3 style={{ marginBottom: 16 }}>
        {selectedRole.roleName} - İzin Matrisi
      </h3>

      <Table
        columns={columns}
        dataSource={matrixData}
        rowKey="module"
        pagination={false}
        scroll={{ x: 800 }}
        bordered
      />

      {selectedRole.isSystem && (
        <div
          style={{
            marginTop: 16,
            padding: "8px 12px",
            backgroundColor: "#f5f5f5",
            borderRadius: 4,
          }}
        >
          <strong style={{ color: colorPalette.textMuted }}>
            ℹ Sistem Rolü:
          </strong>
          <span style={{ color: colorPalette.textMuted, marginLeft: 8 }}>
            Bu rol sistem tarafından koruma altındadır ve silinemez.
          </span>
        </div>
      )}
    </SectionCard>
  );
};
