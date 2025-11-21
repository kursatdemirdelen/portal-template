import React from "react";
import { Table, Tag, Badge, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { Assignment } from "../model/types";
import { colorPalette } from "@/shared/styles/styleConstants";

const getStatusColor = (status: Assignment["status"]) => {
  const statusColorMap: Record<Assignment["status"], string> = {
    active: colorPalette.primary,
    completed: "#52c41a",
    overdue: "#ff4d4f",
    pending: "#faad14",
  };
  return statusColorMap[status] || colorPalette.textSecondary;
};

const getStatusLabel = (status: Assignment["status"]) => {
  const statusLabelMap: Record<Assignment["status"], string> = {
    active: "Devam Ediyor",
    completed: "Tamamlandı",
    overdue: "Gecikmiş",
    pending: "Beklemede",
  };
  return statusLabelMap[status] || status;
};

const getPriorityColor = (priority: Assignment["priority"]) => {
  const priorityColorMap: Record<Assignment["priority"], string> = {
    high: "#ff4d4f",
    medium: "#faad14",
    low: "#1890ff",
  };
  return priorityColorMap[priority] || "#666666";
};

const getPriorityLabel = (priority: Assignment["priority"]) => {
  const priorityLabelMap: Record<Assignment["priority"], string> = {
    high: "Yüksek",
    medium: "Orta",
    low: "Düşük",
  };
  return priorityLabelMap[priority] || priority;
};

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
  { title: "Atanan Kişi", dataIndex: "assignedTo", key: "assignedTo", width: 120 },
  { title: "Atayan", dataIndex: "assignedBy", key: "assignedBy", width: 120 },
  { title: "Başlama", dataIndex: "startDate", key: "startDate", width: 110 },
  { title: "Bitiş", dataIndex: "dueDate", key: "dueDate", width: 110 },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: Assignment["status"]) => (
      <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
    ),
  },
  {
    title: "Öncelik",
    dataIndex: "priority",
    key: "priority",
    width: 100,
    render: (priority: Assignment["priority"]) => (
      <Badge color={getPriorityColor(priority)} text={getPriorityLabel(priority)} />
    ),
  },
  {
    title: "İşlemler",
    key: "actions",
    width: 140,
    render: () => (
      <Space size="small">
        <Button type="text" size="small" icon={<EyeOutlined />} title="Görüntüle" />
        <Button type="text" size="small" icon={<EditOutlined />} title="Düzenle" />
        <Button type="text" size="small" icon={<CheckCircleOutlined />} title="Tamamla" />
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
