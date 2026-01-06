/**
 * User Table Component
 *
 * Kullanıcıları gösteren tablo.
 */

import React from "react";
import { Table, Tag, Button, Space, Avatar, Card, Tooltip } from "antd";
import { EditOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
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
  onView?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  selectedRowKeys,
  onSelectionChange,
  onEdit,
  onView,
}) => {
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id: string) => (
        <Tooltip title={id}>
          <span style={{ fontFamily: "monospace", fontSize: 12 }}>
            {id.length > 10 ? `${id.slice(0, 10)}...` : id}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      width: 70,
      render: (_, record) => (
        <Avatar icon={<UserOutlined />} src={record.avatar} />
      ),
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: "Kullanıcı E-Posta",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <span style={{ color: colors.textSecondary }}>{email}</span>
      ),
    },
    {
      title: "Şirket",
      dataIndex: "company",
      key: "company",
      render: (company: string) => company || "-",
    },
    {
      title: "Kullanıcı Rolü",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => (
        <Tag color={ROLE_COLORS[role]}>{ROLE_LABELS[role] || role}</Tag>
      ),
    },
    {
      title: "Düzenle",
      key: "edit",
      width: 80,
      render: (_, record) => (
        <Space>
          {onView && (
            <Tooltip title="Detay">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Düzenle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Hesap Durumu",
      dataIndex: "status",
      key: "status",
      render: (status: UserStatus) => (
        <Tag color={STATUS_COLORS[status]}>
          {STATUS_LABELS[status] || status}
        </Tag>
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
