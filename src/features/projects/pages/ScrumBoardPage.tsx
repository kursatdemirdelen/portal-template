import React from "react";
import { Row, Col, Card, Statistic, Divider, List } from "antd";
import { PageContainer } from "@/shared/ui";
import { colors as colorPalette, spacing } from "@/shared/styles";
import { mockScrumColumns, mockScrumStats } from "@/shared/data/mocks";

const ScrumBoardPage: React.FC = () => (
  <PageContainer title="Scrum Board" subtitle="Görev akışı">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing.lg }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Toplam Görev" value={mockScrumStats.totalTasks} />
          <Divider />
          <Statistic
            title="Bloklu"
            value={mockScrumStats.blockedTasks}
            precision={0}
            valueStyle={{ color: colorPalette.warning }}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      {mockScrumColumns.map((col) => (
        <Col key={col.title} xs={24} sm={12} md={6}>
          <Card title={col.title} size="small" variant="outlined">
            <List
              size="small"
              dataSource={col.items}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      ))}
    </Row>
  </PageContainer>
);

export default ScrumBoardPage;
