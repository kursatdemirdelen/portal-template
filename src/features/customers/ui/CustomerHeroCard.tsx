import { Card, Typography, Tag, Space, Row, Col, Avatar } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { gradients } from "@/shared/styles";
import type { Customer } from "../model/types";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  LICENSE_TYPE_LABELS,
  LICENSE_TYPE_COLORS,
} from "./constants";
import { customerDetailStyles as styles } from "./customerDetailStyles";

const { Title, Text } = Typography;

interface CustomerHeroCardProps {
  customer: Customer;
}

export const CustomerHeroCard = ({ customer }: CustomerHeroCardProps) => {
  return (
    <Card
      style={{
        ...styles.card,
        background: gradients.sidebarLogo,
        border: "none",
      }}
      styles={{ body: { padding: "20px 24px" } }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={16}>
          <Row gutter={16} align="middle" wrap={false}>
            <Col flex="none">
              <Avatar
                size={{ xs: 48, sm: 56, md: 64 }}
                style={styles.heroAvatar}
              >
                {customer.shortName.substring(0, 2).toUpperCase()}
              </Avatar>
            </Col>
            <Col flex="auto" style={{ minWidth: 0 }}>
              <Title level={4} style={styles.heroTitle} ellipsis>
                {customer.shortName}
              </Title>
              <Text style={styles.heroSubtitle} ellipsis>
                {customer.name}
              </Text>
              <div style={styles.heroTagContainer}>
                <Space size={6} wrap>
                  <Tag
                    color={STATUS_COLORS[customer.status]}
                    style={styles.heroTag}
                  >
                    {STATUS_LABELS[customer.status]}
                  </Tag>
                  {customer.license && (
                    <Tag
                      color={LICENSE_TYPE_COLORS[customer.license.type]}
                      icon={<CrownOutlined />}
                      style={styles.heroTag}
                    >
                      {LICENSE_TYPE_LABELS[customer.license.type]}
                    </Tag>
                  )}
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <div style={styles.heroIdBox}>
            <Text style={styles.heroIdLabel}>Müşteri ID</Text>
            <Title level={4} style={styles.heroIdValue}>
              #{customer.id.toString().padStart(4, "0")}
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
