/**
 * Parameter Table Component
 *
 * Parametreleri gösteren tablo.
 */

import React from "react";
import { Table, Button, Space, Tag, Tabs } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colors as colorPalette, backgrounds } from "@/shared/styles";
import type {
  Parameter,
  ParameterCategory,
  ParameterStatus,
  ParameterStats,
} from "../model/types";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_DESCRIPTIONS,
  TYPE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "./constants";

interface ParameterTableProps {
  parameters: Parameter[];
  loading: boolean;
  activeTab: ParameterCategory;
  stats: ParameterStats | null;
  selectedRowKeys: React.Key[];
  onTabChange: (tab: ParameterCategory) => void;
  onSelectionChange: (keys: React.Key[]) => void;
  onEdit: (record: Parameter) => void;
  onDelete: (id: string) => void;
}

export const ParameterTable: React.FC<ParameterTableProps> = ({
  parameters,
  loading,
  activeTab,
  stats,
  selectedRowKeys,
  onTabChange,
  onSelectionChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Anahtar",
      dataIndex: "key",
      key: "key",
      width: 160,
      render: (key: string) => (
        <code
          style={{
            backgroundColor: backgrounds.neutral100,
            padding: "2px 6px",
            borderRadius: 3,
          }}
        >
          {key}
        </code>
      ),
    },
    {
      title: "Değer",
      dataIndex: "value",
      key: "value",
      width: 140,
      render: (value: string) => (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: colorPalette.textMuted,
          }}
        >
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
        </span>
      ),
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (category: ParameterCategory) => (
        <Tag color={CATEGORY_COLORS[category]}>{CATEGORY_LABELS[category]}</Tag>
      ),
    },
    {
      title: "Tip",
      dataIndex: "type",
      key: "type",
      width: 90,
      render: (type: string) => <Tag>{TYPE_LABELS[type] || type}</Tag>,
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (status: ParameterStatus) => (
        <Tag color={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</Tag>
      ),
    },
    {
      title: "Son Güncelleme",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
    },
    {
      title: "İşlemler",
      key: "actions",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: Parameter) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            title="Düzenle"
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
            title="Sil"
            danger
          />
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      label: (
        <span>
          Sistem{" "}
          <Tag color={CATEGORY_COLORS.system}>
            {stats?.byCategory.system || 0}
          </Tag>
        </span>
      ),
      key: "system",
    },
    {
      label: (
        <span>
          Bildirim{" "}
          <Tag color={CATEGORY_COLORS.notification}>
            {stats?.byCategory.notification || 0}
          </Tag>
        </span>
      ),
      key: "notification",
    },
    {
      label: (
        <span>
          SLA{" "}
          <Tag color={CATEGORY_COLORS.sla}>{stats?.byCategory.sla || 0}</Tag>
        </span>
      ),
      key: "sla",
    },
    {
      label: (
        <span>
          Bilet{" "}
          <Tag color={CATEGORY_COLORS.ticket}>
            {stats?.byCategory.ticket || 0}
          </Tag>
        </span>
      ),
      key: "ticket",
    },
  ];

  return (
    <SectionCard variant="default">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onTabChange(key as ParameterCategory)}
        items={tabItems}
      />

      <div style={{ marginTop: 16, marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: colorPalette.textMuted, margin: 0 }}>
          {CATEGORY_DESCRIPTIONS[activeTab]}
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={parameters}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1400 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectionChange,
        }}
        loading={loading}
      />
    </SectionCard>
  );
};
