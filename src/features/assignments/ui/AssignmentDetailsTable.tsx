import React from "react";
import { Table, Tag, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AssignmentDetail } from "../model/types";
import { colorPalette } from "@/shared/styles/styleConstants";

const statusLabels: Record<AssignmentDetail["status"], string> = {
  active: "Aktif",
  maintenance: "Bakımda",
  returned: "İade",
};

const statusColors: Record<AssignmentDetail["status"], string> = {
  active: colorPalette.primary,
  maintenance: "#faad14",
  returned: "#52c41a",
};

const columns: ColumnsType<AssignmentDetail> = [
  { title: "Zimmet ID", dataIndex: "id", key: "id", width: 110 },
  { title: "Varlık", dataIndex: "asset", key: "asset", width: 160 },
  { title: "Sahip", dataIndex: "owner", key: "owner", width: 140 },
  { title: "Konum", dataIndex: "location", key: "location", width: 120 },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: AssignmentDetail["status"]) => (
      <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
    ),
  },
  { title: "Teslim", dataIndex: "checkoutDate", key: "checkoutDate", width: 120 },
  { title: "Bitiş", dataIndex: "dueDate", key: "dueDate", width: 120 },
];

interface AssignmentDetailsTableProps {
  assignments: AssignmentDetail[];
}

export const AssignmentDetailsTable: React.FC<AssignmentDetailsTableProps> = ({
  assignments,
}) => (
  <>
    <div style={{ marginBottom: 12 }}>
      <Space size="large">
        <Typography.Text strong>
          Toplam Zimmet: {assignments.length}
        </Typography.Text>
        <Typography.Text type="secondary">
          Durum bazlı filtreler yakında
        </Typography.Text>
      </Space>
    </div>
    <Table
      columns={columns}
      dataSource={assignments}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 900 }}
    />
  </>
);
