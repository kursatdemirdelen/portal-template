import React from "react";
import { Table, Tag, Button, Space, Badge } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";

interface Assignment {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  startDate: string;
  dueDate: string;
  status: "active" | "completed" | "overdue" | "pending";
  priority: "high" | "medium" | "low";
}

const mockAssignments: Assignment[] = [
  {
    id: "ASG001",
    title: "API Entegrasyonu",
    description: "Portal API ile backend entegrasyonu",
    assignedTo: "Ahmet Yılmaz",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-15",
    dueDate: "2025-01-25",
    status: "active",
    priority: "high",
  },
  {
    id: "ASG002",
    title: "Dashboard Tasarımı",
    description: "Yeni dashboard taslakları",
    assignedTo: "Zeynep Demir",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-10",
    dueDate: "2025-01-20",
    status: "completed",
    priority: "medium",
  },
  {
    id: "ASG003",
    title: "Veritabanı optimizasyonu",
    description: "Sorgu performans iyileştirmesi",
    assignedTo: "Can Şimşek",
    assignedBy: "Fatih Aksu",
    startDate: "2025-01-08",
    dueDate: "2025-01-18",
    status: "overdue",
    priority: "high",
  },
  {
    id: "ASG004",
    title: "Dokümantasyon",
    description: "Proje dokümanlarının yazılması",
    assignedTo: "Melis Kara",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-16",
    dueDate: "2025-01-28",
    status: "pending",
    priority: "low",
  },
];

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
    pending: "Bekleme",
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
  {
    title: "Zimmet ID",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Başlık",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
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
  {
    title: "Atayan",
    dataIndex: "assignedBy",
    key: "assignedBy",
    width: 120,
  },
  {
    title: "Başlama",
    dataIndex: "startDate",
    key: "startDate",
    width: 100,
  },
  {
    title: "Bitiş",
    dataIndex: "dueDate",
    key: "dueDate",
    width: 100,
  },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    width: 110,
    render: (status: Assignment["status"]) => (
      <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
    ),
  },
  {
    title: "Öncelik",
    dataIndex: "priority",
    key: "priority",
    width: 90,
    render: (priority: Assignment["priority"]) => (
      <Badge
        color={getPriorityColor(priority)}
        text={getPriorityLabel(priority)}
      />
    ),
  },
  {
    title: "İşlemler",
    key: "actions",
    width: 120,
    render: () => (
      <Space size="small">
        <Button type="text" size="small" icon={<EyeOutlined />} title="Görüntüle" />
        <Button type="text" size="small" icon={<EditOutlined />} title="Düzenle" />
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

const AssignmentsPage: React.FC = () => {
  return (
    <PageContainer title="Zimmetler" subtitle="Atanan görevleri ve zimmetleri yönetin">
      <SectionCard variant="default">
        <Table
          columns={columns}
          dataSource={mockAssignments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default AssignmentsPage;
