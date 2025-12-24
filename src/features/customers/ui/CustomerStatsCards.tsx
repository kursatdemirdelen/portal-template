/**
 * Customer Stats Cards Component
 *
 * Müşteri istatistiklerini gösteren kartlar.
 * StatCard (shared/ui) kullanarak modern tasarım
 */

import { Row, Col } from "antd";
import { StatCard } from "@/shared/ui";
import { Building2, CheckCircle2, Clock, XCircle } from "lucide-react";

interface CustomerStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
}

interface CustomerStatsCardsProps {
  stats: CustomerStats;
}

export const CustomerStatsCards = ({ stats }: CustomerStatsCardsProps) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Toplam Müşteri"
          value={stats.total}
          icon={<Building2 size={18} />}
          color="blue"
          description="Tüm müşteriler"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Aktif"
          value={stats.active}
          icon={<CheckCircle2 size={18} />}
          color="green"
          description="Lisans geçerli"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Beklemede"
          value={stats.pending}
          icon={<Clock size={18} />}
          color="orange"
          description="Onay bekleniyor"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatCard
          title="Pasif"
          value={stats.inactive}
          icon={<XCircle size={18} />}
          color="red"
          description="Hizmet durdurulmuş"
        />
      </Col>
    </Row>
  );
};
