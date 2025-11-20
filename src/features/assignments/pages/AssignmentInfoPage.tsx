import React from "react";
import { Table, Tag, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";

interface AssignmentDetail {
  id: string;
  asset: string;
  owner: string;
  location: string;
  status: "active" | "maintenance" | "returned";
  checkoutDate: string;
  dueDate: string;
}

const mockAssignmentDetails: AssignmentDetail[] = [
  {
    id: "ZB-001",
    asset: "MacBook Pro 14”",
    owner: "Ahmet Yılmaz",
    location: "İstanbul",
    status: "active",
    checkoutDate: "2025-01-05",
    dueDate: "2025-12-31",
  },
  {
    id: "ZB-002",
    asset: "Dell Monitor 27”",
    owner: "Zeynep Demir",
    location: "Remote",
    status: "maintenance",
    checkoutDate: "2024-11-12",
    dueDate: "2025-02-10",
  },
  {
    id: "ZB-003",
    asset: "Logitech MX Keys",
    owner: "Can Şimşek",
    location: "Ankara",
    status: "returned",
    checkoutDate: "2024-05-10",
    dueDate: "2024-12-01",
  },
];

const statusLabels: Record<AssignmentDetail["status"], string> = {
  active: "Aktif",
  maintenance: "Bakımda",
  returned: "İade",
};

const statusColor: Record<AssignmentDetail["status"], string> = {
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
      <Tag color={statusColor[status]}>{statusLabels[status]}</Tag>
    ),
  },
  { title: "Teslim", dataIndex: "checkoutDate", key: "checkoutDate", width: 120 },
  { title: "Bitiş", dataIndex: "dueDate", key: "dueDate", width: 120 },
];

const AssignmentInfoPage: React.FC = () => {
  return (
    <PageContainer title="Zimmet Bilgileri" subtitle="Ekipman zimmetlerini detaylı görüntüleyin">
      <SectionCard variant="default">
        <div style={{ marginBottom: 12 }}>
          <Space size="large">
            <Typography.Text strong>Toplam Zimmet: {mockAssignmentDetails.length}</Typography.Text>
            <Typography.Text type="secondary">Durumlara göre filtreler yakında</Typography.Text>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={mockAssignmentDetails}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default AssignmentInfoPage;
