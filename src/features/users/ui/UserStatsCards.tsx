/**
 * User Stats Cards Component
 *
 * Kullanıcı istatistiklerini gösteren kartlar.
 * StatCard (shared/ui) kullanarak standardize edilmiş.
 */

import React from "react";
import { Row, Col } from "antd";
import { StatCard } from "@/shared/ui";
import { Users, CheckCircle2, Shield } from "lucide-react";

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
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Toplam Kullanıcı"
          value={stats.total}
          icon={<Users size={18} />}
          color="blue"
          description="Tüm kullanıcılar"
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Aktif Kullanıcı"
          value={stats.active}
          icon={<CheckCircle2 size={18} />}
          color="green"
          description="Sistem erişimi aktif"
        />
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <StatCard
          title="Yönetici Sayısı"
          value={stats.admins}
          icon={<Shield size={18} />}
          color="purple"
          description="Sistem yöneticileri"
        />
      </Col>
    </Row>
  );
};
