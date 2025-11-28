import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Progress,
  Divider,
  Timeline,
} from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles";
import { mockTeamMembers, mockCeremonies } from "@/shared/data/mocks";

const ProjectTeamPage: React.FC = () => (
  <PageContainer title="Proje Ekibi" subtitle="Ekip üyeleri ve roller">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing.lg }}>
      {mockTeamMembers.map((member) => (
        <Col key={member.name} xs={24} sm={12} md={8}>
          <Card
            title={member.name}
            extra={<Tag icon={<TeamOutlined />}>{member.role}</Tag>}
          >
            <Typography.Text type="secondary">Yük</Typography.Text>
            <Progress percent={member.load} size="small" status="active" />
            <Divider />
            <Typography.Text type="secondary">Son görev</Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }}>
              Sprint 12 - API performansı
            </Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
    <SectionCard variant="default">
      <Typography.Text strong>Yaklaşan sprint seremonileri</Typography.Text>
      <Timeline style={{ marginTop: spacing.sm }} items={mockCeremonies} />
    </SectionCard>
  </PageContainer>
);

export default ProjectTeamPage;
