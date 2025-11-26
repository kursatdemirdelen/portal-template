import React from "react";
import { Row, Col, Card, Typography, Tag, Progress, Divider, Timeline } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles/styleConstants";

const teamMembers = [
  { name: "Ayşe Kaya", role: "Product Owner", load: 70 },
  { name: "Mehmet Koç", role: "Developer", load: 50 },
  { name: "Selin Arda", role: "QA", load: 40 },
];

const ceremonies = [
  { children: "Sprint Planning - 24 Ocak" },
  { children: "Daily Standup - Her gün 09:30" },
  { children: "Sprint Review - 07 Şubat" },
];

const ProjectTeamPage: React.FC = () => (
  <PageContainer title="Proje Ekibi" subtitle="Ekip üyeleri ve roller">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing.lg }}>
      {teamMembers.map((member) => (
        <Col key={member.name} xs={24} sm={12} md={8}>
          <Card title={member.name} extra={<Tag icon={<TeamOutlined />}>{member.role}</Tag>}>
            <Typography.Text type="secondary">Yük</Typography.Text>
            <Progress percent={member.load} size="small" status="active" />
            <Divider />
            <Typography.Text type="secondary">Son görev</Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }}>Sprint 12 - API performansı</Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
    <SectionCard variant="default">
      <Typography.Text strong>Yaklaşan sprint seremonileri</Typography.Text>
      <Timeline style={{ marginTop: spacing.sm }} items={ceremonies} />
    </SectionCard>
  </PageContainer>
);

export default ProjectTeamPage;
