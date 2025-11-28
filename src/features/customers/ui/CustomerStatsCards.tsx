import { Card, Row, Col, Typography } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  backgrounds,
  colors,
  gradients,
  hexToRgba,
  shadows,
} from "@/shared/styles";

const { Text } = Typography;

interface CustomerStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
}

interface CustomerStatsCardsProps {
  stats: CustomerStats;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: shadows.sm,
  border: "none",
};

const statCardColors = {
  total: {
    gradient: gradients.sidebarLogo,
    iconBg: hexToRgba(backgrounds.card, 0.2),
    textColor: backgrounds.card,
  },
  active: {
    gradient: gradients.colorGreen,
    iconBg: hexToRgba(backgrounds.card, 0.2),
    textColor: backgrounds.card,
  },
  pending: {
    gradient: gradients.colorOrange,
    iconBg: hexToRgba(backgrounds.card, 0.2),
    textColor: backgrounds.card,
  },
  inactive: {
    gradient: `linear-gradient(135deg, ${hexToRgba(
      colors.textSecondary,
      0.25
    )} 0%, ${hexToRgba(colors.textPrimary, 0.2)} 100%)`,
    iconBg: hexToRgba(backgrounds.card, 0.2),
    textColor: backgrounds.card,
  },
};

const StatCard = ({
  title,
  value,
  icon,
  colorKey,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorKey: keyof typeof statCardColors;
}) => (
  <Card
    style={{
      ...cardStyle,
      background: statCardColors[colorKey].gradient,
      height: 90,
    }}
    styles={{
      body: {
        padding: "12px 16px",
        height: "100%",
        display: "flex",
        alignItems: "center",
      },
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          minWidth: 40,
          borderRadius: 10,
          background: statCardColors[colorKey].iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: backgrounds.card,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <Text
          style={{
            color: hexToRgba(backgrounds.card, 0.85),
            fontSize: 12,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Text>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: statCardColors[colorKey].textColor,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  </Card>
);

export const CustomerStatsCards = ({ stats }: CustomerStatsCardsProps) => {
  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Toplam Müşteri"
          value={stats.total}
          icon={
            <TeamOutlined style={{ fontSize: 20, color: backgrounds.card }} />
          }
          colorKey="total"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Aktif"
          value={stats.active}
          icon={
            <CheckCircleOutlined
              style={{ fontSize: 20, color: backgrounds.card }}
            />
          }
          colorKey="active"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Beklemede"
          value={stats.pending}
          icon={
            <ClockCircleOutlined
              style={{ fontSize: 20, color: backgrounds.card }}
            />
          }
          colorKey="pending"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Pasif"
          value={stats.inactive}
          icon={
            <StopOutlined style={{ fontSize: 20, color: backgrounds.card }} />
          }
          colorKey="inactive"
        />
      </Col>
    </Row>
  );
};
