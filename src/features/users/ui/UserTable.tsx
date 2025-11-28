/**
 * User Table Component
 *
 * Kullanıcıları gösteren tablo.
 */

import React from "react";
import { Table, Tag, Button, Space, Avatar, Popconfirm, Card } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { User, UserRole, UserStatus } from "../model/types";
import {
  ROLE_LABELS,
  ROLE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "./constants";
import { colors } from "@/shared/styles";

interface UserTableProps {
  users: User[];
  loading: boolean;
  selectedRowKeys: React.Key[];
  onSelectionChange: (keys: React.Key[]) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  selectedRowKeys,
  onSelectionChange,
  onEdit,
  onDelete,
}) => {
  // Role options for filter
  const roleOptions = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  // Status options for filter
  const statusOptions = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  const columns: ColumnsType<User> = [
    {
      title: "Kullanıcı",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: colors.textSecondary }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => (
        <Tag color={ROLE_COLORS[role]}>{ROLE_LABELS[role]}</Tag>
      ),
      filters: roleOptions.map((r) => ({ text: r.label, value: r.value })),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Departman",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status: UserStatus) => (
        <Tag color={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</Tag>
      ),
      filters: statusOptions.map((s) => ({ text: s.label, value: s.value })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Son Giriş",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("tr-TR") : "-",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Bu kullanıcıyı silmek istediğinizden emin misiniz?"
            onConfirm={() => onDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Row selection config
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => onSelectionChange(keys),
  };

  return (
    <Card>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} kullanıcı`,
        }}
      />
    </Card>
  );
};
