import React from "react";
import { Row, Col, Statistic } from "antd";
import { SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles/styleConstants";

export interface TimeSummaryItem {
  title: string;
  value: string;
  suffix?: string;
  color?: string;
}

interface TimeSummaryCardsProps {
  items: TimeSummaryItem[];
}

export const TimeSummaryCards: React.FC<TimeSummaryCardsProps> = ({
  items,
}) => (
  <Row gutter={[16, 16]} style={{ marginBottom: spacing["2xl"] }}>
    {items.map(({ title, value, suffix, color }) => (
      <Col key={title} xs={24} sm={12} md={8}>
        <SectionCard variant="default">
          <Statistic title={title} value={value} suffix={suffix} valueStyle={{ color }} />
        </SectionCard>
      </Col>
    ))}
  </Row>
);
