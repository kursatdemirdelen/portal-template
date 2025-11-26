import React from "react";
import { Row, Col, Card, Statistic, Divider, List } from "antd";
import { PageContainer } from "@/shared/ui";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";

const scrumColumns = [
  { title: "Backlog", items: ["Kullanıcı yetkilendirme", "Bildirim ayarları"] },
  { title: "In Progress", items: ["Dashboard UI revizyonu"] },
  { title: "Review", items: ["API hata logları"] },
  { title: "Done", items: ["Login form validasyonu"] },
];

const ScrumBoardPage: React.FC = () => (
  <PageContainer title="Scrum Board" subtitle="Görev akışı">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing.lg }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Toplam Görev" value={12} />
          <Divider />
          <Statistic title="Bloklu" value={1} precision={0} valueStyle={{ color: colorPalette.warning }} />
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      {scrumColumns.map((col) => (
        <Col key={col.title} xs={24} sm={12} md={6}>
          <Card title={col.title} size="small" variant="outlined">
            <List size="small" dataSource={col.items} renderItem={(item) => <List.Item>{item}</List.Item>} />
          </Card>
        </Col>
      ))}
    </Row>
  </PageContainer>
);

export default ScrumBoardPage;
