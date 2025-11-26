import React from "react";
import { Row, Col, Statistic, List, Button, Avatar, Tag, Typography } from "antd";
import { ApartmentOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";

const customers = [
  { name: "Acme Corp", contact: "Zeynep Demir", projects: 5, status: "aktif", segment: "Enterprise" },
  { name: "Globex", contact: "Ahmet Yılmaz", projects: 2, status: "beklemede", segment: "SMB" },
  { name: "Initech", contact: "Can Şimşek", projects: 3, status: "aktif", segment: "Mid" },
];

const CustomersPage: React.FC = () => (
  <PageContainer title="Müşteri" subtitle="Müşteri kayıtları">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing["2xl"] }}>
      <Col xs={24} sm={12} md={8}>
        <SectionCard variant="default">
          <Statistic title="Toplam Müşteri" value={customers.length} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <SectionCard variant="default">
          <Statistic title="Aktif Proje" value={10} />
        </SectionCard>
      </Col>
    </Row>
    <SectionCard variant="default">
      <List
        itemLayout="horizontal"
        dataSource={customers}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button size="small" key="projects" icon={<ApartmentOutlined />}>
                Projeler
              </Button>,
              <Button size="small" key="details">
                Detay
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.name.slice(0, 2).toUpperCase()}</Avatar>}
              title={item.name}
              description={`${item.contact} · ${item.projects} proje · ${item.segment}`}
            />
            <Tag color={item.status === "aktif" ? colorPalette.success : colorPalette.warning}>
              {item.status === "aktif" ? "Aktif" : "Beklemede"}
            </Tag>
          </List.Item>
        )}
      />
    </SectionCard>
  </PageContainer>
);

export default CustomersPage;
