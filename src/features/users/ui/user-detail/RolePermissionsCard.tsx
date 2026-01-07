import React from "react";
import { Card, Space, Typography, Row, Col, Statistic, Button } from "antd";
import {
  SafetyOutlined,
  CheckCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { User } from "../../model";
import {
  ROLE_LABELS,
  ROLE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../shared/constants";
import { rolePermissionsStyles } from "../shared/userDetailStyles";
import { colors } from "@/shared/styles";

const { Text, Paragraph, Title } = Typography;

interface RolePermissionsCardProps {
  user: User;
}

export const RolePermissionsCard: React.FC<RolePermissionsCardProps> = ({
  user,
}) => {
  const navigate = useNavigate();
  const roleColor = ROLE_COLORS[user.role];

  const getRoleLevel = () => {
    switch (user.role) {
      case "admin":
        return "Üst";
      case "manager":
        return "Orta";
      default:
        return "Normal";
    }
  };

  return (
    <Card style={rolePermissionsStyles.card} bodyStyle={{ padding: 0 }}>
      {/* Header with gradient */}
      <div style={rolePermissionsStyles.header(roleColor)}>
        <Space size="middle" style={{ width: "100%" }}>
          <div
            style={rolePermissionsStyles.headerIconBox(roleColor, roleColor)}
          >
            <SafetyOutlined style={rolePermissionsStyles.headerIcon} />
          </div>
          <div style={rolePermissionsStyles.headerContent}>
            <Text type="secondary" style={rolePermissionsStyles.headerSubtitle}>
              Kullanıcı Rolü ve Yetkileri
            </Text>
            <Title
              level={5}
              style={rolePermissionsStyles.headerTitle(roleColor)}
            >
              {ROLE_LABELS[user.role]}
            </Title>
          </div>
        </Space>
      </div>

      {/* Content */}
      <div style={rolePermissionsStyles.body}>
        <Paragraph type="secondary" style={rolePermissionsStyles.description}>
          Bu kullanıcının rolüne atanmış tüm yetkileri ve erişim haklarını
          görüntülemek için yetkiler sayfasını ziyaret edebilirsiniz.
        </Paragraph>

        {/* Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={12} sm={8}>
            <Card
              size="small"
              style={rolePermissionsStyles.statsCard(
                colors.primary,
                colors.primary
              )}
            >
              <Statistic
                title={
                  <Text style={rolePermissionsStyles.statsTitle}>
                    Rol Seviyesi
                  </Text>
                }
                value={getRoleLevel()}
                valueStyle={rolePermissionsStyles.statsValue(colors.primary)}
              />
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card
              size="small"
              style={rolePermissionsStyles.statsCard(
                colors.success,
                colors.success
              )}
            >
              <Statistic
                title={
                  <Text style={rolePermissionsStyles.statsTitle}>Durum</Text>
                }
                value={STATUS_LABELS[user.status]}
                valueStyle={rolePermissionsStyles.statsValue(
                  STATUS_COLORS[user.status]
                )}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              size="small"
              style={rolePermissionsStyles.statsCard(
                colors.warning,
                colors.warning
              )}
            >
              <Statistic
                title={
                  <Text style={rolePermissionsStyles.statsTitle}>Erişim</Text>
                }
                value="Tam Yetki"
                valueStyle={rolePermissionsStyles.statsValue(colors.warning)}
              />
            </Card>
          </Col>
        </Row>

        <Button
          type="primary"
          block
          icon={<LinkOutlined />}
          onClick={() => navigate("/permissions")}
          style={rolePermissionsStyles.button(colors.primary)}
        >
          Detaylı Yetki Bilgilerini Görüntüle
        </Button>
      </div>
    </Card>
  );
};
