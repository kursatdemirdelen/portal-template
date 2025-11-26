import React from "react";
import { Row, Col, Statistic, Table, Tag } from "antd";
import { PageContainer, SectionCard } from "@/shared/ui";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";

const userColumns = [
  { title: "Ad Soyad", dataIndex: "name", key: "name" },
  {
    title: "Rol",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "aktif" ? colorPalette.success : colorPalette.warning}>
        {status === "aktif" ? "Aktif" : "Pasif"}
      </Tag>
    ),
  },
];

const userData = [
  { key: "1", name: "Elif T", role: "Admin", status: "aktif" },
  { key: "2", name: "Can Ç", role: "Worker", status: "aktif" },
  { key: "3", name: "Mert K", role: "User", status: "pasif" },
  { key: "4", name: "Deniz P", role: "User", status: "aktif" },
];

const UsersPage: React.FC = () => (
  <PageContainer title="Kullanıcı Listesi" subtitle="Kullanıcı yönetimi">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing.lg }}>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Aktif" value={3} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Pasif" value={1} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Son 7 gün giriş" value={12} />
        </SectionCard>
      </Col>
    </Row>
    <SectionCard variant="default">
      <Table columns={userColumns} dataSource={userData} pagination={{ pageSize: 5 }} />
    </SectionCard>
  </PageContainer>
);

export default UsersPage;
