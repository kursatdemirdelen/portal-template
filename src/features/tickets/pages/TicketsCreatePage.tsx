import React from "react";
import { Row, Col, Descriptions, List, Typography, Divider, Space, Button, Steps } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles/styleConstants";

const ticketChecklist = ["Özet", "Detaylar", "Öncelik", "Kategori", "İlgili proje", "Dosya ekle", "Atanan kişi"];

const helperTips = [
  "Öncelik ve kategori seçimi SLA'ya göre tetiklenir.",
  "İlgili proje seçildiğinde otomatik atama yapılabilir.",
  "Ek dosyalar 10MB ile sınırlıdır.",
];

const TicketsCreatePage: React.FC = () => (
  <PageContainer title="Bilet Oluştur" subtitle="Yeni destek talebi başlatın">
    <SectionCard variant="default">
      <Steps
        current={1}
        items={[
          { title: "Temel Bilgiler" },
          { title: "Detay & Öncelik" },
          { title: "Atama" },
          { title: "Özet" },
        ]}
        style={{ marginBottom: spacing["2xl"] }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <Descriptions
            title="Form Alanları"
            bordered
            size="small"
            column={1}
            items={ticketChecklist.map((label) => ({ key: label, label, children: "…" }))}
          />
        </Col>
        <Col xs={24} md={10}>
          <List
            header={<Typography.Text strong>İpucu</Typography.Text>}
            dataSource={helperTips}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
          <Space>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Taslak Oluştur
            </Button>
            <Button>Kaydet & Gönder</Button>
          </Space>
        </Col>
      </Row>
    </SectionCard>
  </PageContainer>
);

export default TicketsCreatePage;
