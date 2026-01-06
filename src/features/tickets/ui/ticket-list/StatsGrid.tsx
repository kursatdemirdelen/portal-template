import React, { useState } from "react";
import { Row, Col } from "antd";
import { StatCard } from "@/shared/ui";
import { User, Ticket, Clock, CheckCircle2 } from "lucide-react";

export interface StatsGridProps {
  myTicketsCount: number;
  openTicketsCount: number;
  inProgressCount: number;
  closedCount: number;
  onClickMy?: () => void;
  onClickOpen?: () => void;
  onClickInProgress?: () => void;
  onClickClosed?: () => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  myTicketsCount,
  openTicketsCount,
  inProgressCount,
  closedCount,
  onClickMy,
  onClickOpen,
  onClickInProgress,
  onClickClosed,
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
            title="Yeni Biletler"
            value={openTicketsCount}
            color="orange"
            icon={<Ticket size={18} />}
            description="Bekleyen istekler"
          />
        </div>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickInProgress}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(2)}
            title="Atanan"
            value={inProgressCount}
            color="purple"
            icon={<Clock size={18} />}
            description="Üzerinde çalışılan"
          />
        </div>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <div
          onClick={onClickClosed}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ height: "100%" }}
        >
          <StatCard
            style={getCardStyle(3)}
            title="Çözümlenen"
            value={closedCount}
            color="green"
            icon={<CheckCircle2 size={18} />}
            description="Tamamlanan biletler"
          />
        </div>
      </Col>
    </Row>
  );
};

export default StatsGrid;
