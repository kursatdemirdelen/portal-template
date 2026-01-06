/**
 * User Stats Cards Component
 *
 * Kullanıcı istatistiklerini gösteren kartlar.
 * StatCard (shared/ui) kullanarak standardize edilmiş.
 */

import React from "react";
import { Row, Col } from "antd";
import { StatCard } from "@/shared/ui";
import { Users, CheckCircle2, Shield, XCircle } from "lucide-react";
import type { UserStatsDisplay } from "../model/types";

interface UserStatsCardsProps {
  stats: UserStatsDisplay;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Toplam Kullanıcı"
          value={stats.total}
          icon={<Users size={18} />}
          color="blue"
          description="Tüm kullanıcılar"
          style={{ cursor: "default" }}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Aktif Kullanıcı"
          value={stats.active}
          icon={<CheckCircle2 size={18} />}
          color="green"
          description="Sistem erişimi aktif"
          style={{ cursor: "default" }}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Pasif Kullanıcı"
          value={stats.inactive}
          icon={<XCircle size={18} />}
          color="orange"
          description="Erişimi kısıtlı"
          style={{ cursor: "default" }}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Yönetici Sayısı"
          value={stats.admins}
          icon={<Shield size={18} />}
          color="purple"
          description="Admin ve Manager"
          style={{ cursor: "default" }}
        />
      </Col>
    </Row>
  );
};
