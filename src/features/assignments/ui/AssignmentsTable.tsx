import React from "react";
import { Table, Tag, Badge, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { Assignment } from "../model/types";
import {
  getAssignmentPriorityMeta,
  getAssignmentStatusMeta,
} from "@/shared/styles";

const columns: ColumnsType<Assignment> = [
  { title: "Zimmet ID", dataIndex: "id", key: "id", width: 100 },
  { title: "Başlık", dataIndex: "title", key: "title", width: 150 },
  {
    title: "Açıklama",
    dataIndex: "description",
    key: "description",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Atanan Kişi",
    dataIndex: "assignedTo",
    key: "assignedTo",
    width: 120,
  },
  { title: "Atayan", dataIndex: "assignedBy", key: "assignedBy", width: 120 },
  { title: "Başlama", dataIndex: "startDate", key: "startDate", width: 110 },
  { title: "Bitiş", dataIndex: "dueDate", key: "dueDate", width: 110 },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: Assignment["status"]) => {
      const meta = getAssignmentStatusMeta(status);
      return <Tag color={meta.color}>{meta.label}</Tag>;
    },
  },
  {
    title: "Öncelik",
    dataIndex: "priority",
    key: "priority",
    width: 100,
    render: (priority: Assignment["priority"]) => {
      const meta = getAssignmentPriorityMeta(priority);
      return <Badge color={meta.color} text={meta.label} />;
    },
  },
  {
    title: "İşlemler",
    key: "actions",
    width: 140,
    render: () => (
      <Space size="small">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          title="Görüntüle"
        />
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          title="Düzenle"
        />
        <Button
          type="text"
          size="small"
          icon={<CheckCircleOutlined />}
          title="Tamamla"
        />
      </Space>
    ),
  },
];

interface AssignmentsTableProps {
  assignments: Assignment[];
}

export const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
}) => (
  <Table
    columns={columns}
    dataSource={assignments}
    rowKey="id"
    pagination={{ pageSize: 10 }}
    scroll={{ x: 1200 }}
  />
);
