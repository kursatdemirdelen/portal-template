/**
 * User Stats Cards Component
 *
 * Kullanıcı istatistiklerini gösteren kartlar.
 */

import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { colors } from "@/shared/styles";

interface UserStats {
  total: number;
  active: number;
  admins: number;
}

interface UserStatsCardsProps {
  stats: UserStats;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Toplam Kullanıcı"
            value={stats.total}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Aktif Kullanıcı"
            value={stats.active}
            prefix={<UserOutlined />}
            valueStyle={{ color: colors.success }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Yönetici Sayısı"
            value={stats.admins}
            prefix={<SafetyCertificateOutlined />}
            valueStyle={{ color: colors.info }}
          />
        </Card>
      </Col>
    </Row>
  );
};
