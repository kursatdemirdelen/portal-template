/**
 * Parameter Stats Cards Component
 *
 * Parametre istatistiklerini gösteren kartlar.
 */

import React from "react";
import { Row, Col, Statistic } from "antd";
import { colorPalette } from "@/shared/styles/styleConstants";
import type { ParameterStats } from "../model/types";

interface ParameterStatsCardsProps {
  stats: ParameterStats | null;
  selectedCount: number;
}

export const ParameterStatsCards: React.FC<ParameterStatsCardsProps> = ({
  stats,
  selectedCount,
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col xs={12} sm={6}>
        <Statistic title="Toplam" value={stats?.total || 0} />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic
          title="Aktif"
          value={stats?.active || 0}
          valueStyle={{ color: colorPalette.success }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic
          title="İnaktif"
          value={stats?.inactive || 0}
          valueStyle={{ color: colorPalette.secondary }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic
          title="Seçili"
          value={selectedCount}
          valueStyle={{ color: colorPalette.primary }}
        />
      </Col>
    </Row>
  );
};
