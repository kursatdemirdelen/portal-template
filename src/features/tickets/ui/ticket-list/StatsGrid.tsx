import React, { useState } from "react";
import { Row, Col } from "antd";
import { StatCard } from "@/shared/ui";
import { User, Ticket, Clock, CheckCircle2 } from "lucide-react";

export interface StatsGridProps {
  myTicketsCount: number;
  openTicketsCount: number;
  pendingTicketsCount: number;
  resolvedThisWeek: number;
  onClickMy?: () => void;
  onClickOpen?: () => void;
  onClickPending?: () => void;
  onClickResolved?: () => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  myTicketsCount,
  openTicketsCount,
  pendingTicketsCount,
  resolvedThisWeek,
  onClickMy,
  onClickOpen,
  onClickPending,
  onClickResolved,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getCardStyle = (index: number): React.CSSProperties => ({
    width: "100%",
    height: "100%",
    transform: hoveredCard === index ? "translateY(-2px)" : "translateY(0)",
    boxShadow:
      hoveredCard === index
        ? "0 4px 12px rgba(0, 0, 0, 0.08)"
        : "0 2px 4px rgba(0, 0, 0, 0.04)",
    transition: "all 0.2s ease",
  });

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickMy}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(0)}
            title="Bana Atanan"
            value={myTicketsCount}
            color="blue"
            icon={<User size={18} />}
            description="Bekleyen görevlerim"
          />
        </div>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickOpen}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(1)}
            title="Açık Biletler"
            value={openTicketsCount}
            color="orange"
            icon={<Ticket size={18} />}
            description="Çözüm bekleyen"
          />
        </div>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickPending}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(2)}
            title="Beklemedeki"
            value={pendingTicketsCount}
            color="purple"
            icon={<Clock size={18} />}
            description="İşlem bekleyen"
          />
        </div>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickResolved}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(3)}
            title="Bu Hafta Çözülen"
            value={resolvedThisWeek}
            color="green"
            icon={<CheckCircle2 size={18} />}
            trend="up"
            trendValue={12}
            description="Son 7 gün"
          />
        </div>
      </Col>
    </Row>
  );
};

export default StatsGrid;
