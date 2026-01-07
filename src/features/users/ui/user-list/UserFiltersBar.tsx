/**
 * User Filters Bar Component
 *
 * Kullanıcı filtreleme araç çubuğu.
 */

import React from "react";
import { Card, Row, Col, Input, Select, Button, Space } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { UserRole, UserStatus } from "../../model/types";
import { ROLE_LABELS, STATUS_LABELS } from "../shared/constants";

interface UserFiltersBarProps {
  searchText: string;
  roleFilter: UserRole | "all";
  statusFilter: UserStatus | "all";
  selectedCount: number;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "all") => void;
  onStatusChange: (value: UserStatus | "all") => void;
  onBulkStatusChange: (status: UserStatus) => void;
  onCreateClick: () => void;
}

export const UserFiltersBar: React.FC<UserFiltersBarProps> = ({
  searchText,
  roleFilter,
  statusFilter,
  selectedCount,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onBulkStatusChange,
  onCreateClick,
}) => {
  // Role options for Select
  const roleOptions = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  // Status options for Select
  const statusOptions = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={6}>
          <Input
            placeholder="Ara..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={12} sm={4}>
          <Select
            value={roleFilter}
            onChange={onRoleChange}
            style={{ width: "100%" }}
            options={[{ value: "all", label: "Tüm Roller" }, ...roleOptions]}
          />
        </Col>
        <Col xs={12} sm={4}>
          <Select
            value={statusFilter}
            onChange={onStatusChange}
            style={{ width: "100%" }}
            options={[
              { value: "all", label: "Tüm Durumlar" },
              ...statusOptions,
            ]}
          />
        </Col>
        <Col xs={24} sm={10} style={{ textAlign: "right" }}>
          <Space>
            {selectedCount > 0 && (
              <>
                <Button onClick={() => onBulkStatusChange("active")}>
                  Aktif Yap
                </Button>
                <Button onClick={() => onBulkStatusChange("inactive")}>
                  Pasif Yap
                </Button>
              </>
            )}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onCreateClick}
            >
              Yeni Kullanıcı
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
