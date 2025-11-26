import { Card, Row, Col, Typography } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { shadows } from "@/shared/styles/styleConstants";

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
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    iconBg: "rgba(255,255,255,0.2)",
    textColor: "#fff",
  },
  active: {
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    iconBg: "rgba(255,255,255,0.2)",
    textColor: "#fff",
  },
  pending: {
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    iconBg: "rgba(255,255,255,0.2)",
    textColor: "#fff",
  },
  inactive: {
    gradient: "linear-gradient(135deg, #8c8c8c 0%, #595959 100%)",
    iconBg: "rgba(255,255,255,0.2)",
    textColor: "#fff",
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
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <Text
          style={{
            color: "rgba(255,255,255,0.85)",
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
          icon={<TeamOutlined style={{ fontSize: 20, color: "#fff" }} />}
          colorKey="total"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Aktif"
          value={stats.active}
          icon={<CheckCircleOutlined style={{ fontSize: 20, color: "#fff" }} />}
          colorKey="active"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Beklemede"
          value={stats.pending}
          icon={<ClockCircleOutlined style={{ fontSize: 20, color: "#fff" }} />}
          colorKey="pending"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Pasif"
          value={stats.inactive}
          icon={<StopOutlined style={{ fontSize: 20, color: "#fff" }} />}
          colorKey="inactive"
        />
      </Col>
    </Row>
  );
};
