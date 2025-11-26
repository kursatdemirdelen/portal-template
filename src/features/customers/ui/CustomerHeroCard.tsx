import { Card, Typography, Tag, Space, Row, Col, Avatar } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { shadows } from "@/shared/styles/styleConstants";
import type { Customer } from "../model/types";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  LICENSE_TYPE_LABELS,
  LICENSE_TYPE_COLORS,
} from "./constants";

const { Title, Text } = Typography;

interface CustomerHeroCardProps {
  customer: Customer;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: shadows.sm,
};

export const CustomerHeroCard = ({ customer }: CustomerHeroCardProps) => {
  return (
    <Card
      style={{
        ...cardStyle,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontSize: 22,
                  fontWeight: 600,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                {customer.shortName.substring(0, 2).toUpperCase()}
              </Avatar>
            </Col>
            <Col flex="auto" style={{ minWidth: 0 }}>
              <Title
                level={4}
                style={{ color: "#fff", margin: 0, fontSize: 18 }}
                ellipsis
              >
                {customer.shortName}
              </Title>
              <Text
                style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}
                ellipsis
              >
                {customer.name}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Space size={6} wrap>
                  <Tag
                    color={STATUS_COLORS[customer.status]}
                    style={{
                      borderRadius: 10,
                      padding: "1px 10px",
                      fontSize: 12,
                      margin: 0,
                    }}
                  >
                    {STATUS_LABELS[customer.status]}
                  </Tag>
                  {customer.license && (
                    <Tag
                      color={LICENSE_TYPE_COLORS[customer.license.type]}
                      icon={<CrownOutlined />}
                      style={{
                        borderRadius: 10,
                        padding: "1px 10px",
                        fontSize: 12,
                        margin: 0,
                      }}
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
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "12px 16px",
              backdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
              Müşteri ID
            </Text>
            <Title
              level={4}
              style={{ color: "#fff", margin: "2px 0 0 0", fontSize: 20 }}
            >
              #{customer.id.toString().padStart(4, "0")}
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
