import React from "react";
import { Steps, List, Typography, Divider, Space, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles/styleConstants";

const approvalSteps = [{ title: "Talep" }, { title: "Yönetici Onayı" }, { title: "Destek" }, { title: "Kapanış" }];

const ruleSamples = [
  "Belirli kategorilerde otomatik yönetici onayı",
  "SLA ihlallerinde uyarı",
  "Çoklu onay adımı",
];

const ApprovalsPage: React.FC = () => (
  <PageContainer title="Onay Süreçleri" subtitle="Onay akışlarını yönetin">
    <SectionCard variant="default">
      <Steps current={1} items={approvalSteps} style={{ marginBottom: spacing["2xl"] }} />
      <List
        header={<Typography.Text strong>Örnek kurallar</Typography.Text>}
        dataSource={ruleSamples}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Divider />
      <Space>
        <Button type="primary" icon={<CheckCircleOutlined />}>
          Yeni Akış
        </Button>
        <Button>Şablon Seç</Button>
      </Space>
    </SectionCard>
  </PageContainer>
);

export default ApprovalsPage;
