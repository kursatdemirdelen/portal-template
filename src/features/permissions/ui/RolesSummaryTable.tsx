/**
 * Roles Summary Table Component
 *
 * Tüm rolleri ve izin sayılarını gösteren özet tablosu.
 */

import React from "react";
import { Table, Tag } from "antd";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colors as colorPalette } from "@/shared/styles";
import type { RolePermissionMap, Permission } from "../model";

interface RolesSummaryTableProps {
  roles: RolePermissionMap[];
}

export const RolesSummaryTable: React.FC<RolesSummaryTableProps> = ({
  roles,
}) => {
  const columns = [
    {
      title: "Rol Adı",
      dataIndex: "roleName",
      key: "roleName",
      width: 180,
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
      width: 250,
    },
    {
      title: "İzin Sayısı",
      key: "permCount",
      width: 100,
      render: (_: unknown, record: RolePermissionMap) => (
        <Tag color={colorPalette.primary}>
          {record.permissions.filter((p: Permission) => p.isEnabled).length}/
          {record.permissions.length}
        </Tag>
      ),
    },
    {
      title: "Tip",
      key: "type",
      width: 100,
      render: (_: unknown, record: RolePermissionMap) =>
        record.isSystem ? <Tag color="cyan">Sistem</Tag> : <Tag>Özel</Tag>,
    },
  ];

  return (
    <SectionCard variant="default" style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 16 }}>Tüm Roller ve İzin Sayıları</h3>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </SectionCard>
  );
};
