/**
 * Permission Stats Cards Component
 *
 * İzin istatistiklerini gösteren kartlar.
 */

import React from "react";
import { Row, Col, Statistic } from "antd";
import { colorPalette } from "@/shared/styles/styleConstants";

interface PermissionStatsCardsProps {
  totalRoles: number;
  systemRoles: number;
  totalPermissions: number;
  activePermissions: number;
}

export const PermissionStatsCards: React.FC<PermissionStatsCardsProps> = ({
  totalRoles,
  systemRoles,
  totalPermissions,
  activePermissions,
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col xs={12} sm={6}>
        <Statistic title="Toplam Rol" value={totalRoles} />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic title="Sistem Rolleri" value={systemRoles} />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic title="Toplam İzin" value={totalPermissions} />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic
          title="Etkin"
          value={activePermissions}
          valueStyle={{ color: colorPalette.success }}
        />
      </Col>
    </Row>
  );
};
