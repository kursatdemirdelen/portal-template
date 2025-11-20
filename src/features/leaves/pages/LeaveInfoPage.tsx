import React from "react";
import { Table, Tag, Row, Col, Statistic } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";

interface LeaveBalance {
  type: string;
  used: number;
  remaining: number;
}

interface Holiday {
  date: string;
  title: string;
  type: "official" | "company" | "personal";
}

const balances: LeaveBalance[] = [
  { type: "Yıllık İzin", used: 8, remaining: 12 },
  { type: "Hastalık İzni", used: 2, remaining: 5 },
  { type: "Ücretsiz İzin", used: 0, remaining: 10 },
];

const holidays: Holiday[] = [
  { date: "2025-04-23", title: "Ulusal Egemenlik ve Çocuk Bayramı", type: "official" },
  { date: "2025-05-01", title: "Emek ve Dayanışma Günü", type: "official" },
  { date: "2025-06-10", title: "Şirket Tatili - Offsite", type: "company" },
];

const balanceColumns: ColumnsType<LeaveBalance> = [
  { title: "İzin Tipi", dataIndex: "type", key: "type", width: 180 },
  { title: "Kullanılan", dataIndex: "used", key: "used", width: 120 },
  { title: "Kalan", dataIndex: "remaining", key: "remaining", width: 120 },
];

const holidayColumns: ColumnsType<Holiday> = [
  { title: "Tarih", dataIndex: "date", key: "date", width: 140 },
  { title: "Başlık", dataIndex: "title", key: "title", width: 260 },
  {
    title: "Tür",
    dataIndex: "type",
    key: "type",
    width: 140,
    render: (type: Holiday["type"]) => {
      const labelMap: Record<Holiday["type"], string> = {
        official: "Resmi Tatil",
        company: "Şirket Tatili",
        personal: "Kişisel",
      };
      const colorMap: Record<Holiday["type"], string> = {
        official: colorPalette.primary,
        company: "#faad14",
        personal: "#52c41a",
      };
      return <Tag color={colorMap[type]}>{labelMap[type]}</Tag>;
    },
  },
];

const totalRemaining = balances.reduce((sum, item) => sum + item.remaining, 0);
const totalUsed = balances.reduce((sum, item) => sum + item.used, 0);

const LeaveInfoPage: React.FC = () => {
  return (
    <PageContainer title="Tatil Bilgileri" subtitle="İzin hakları ve tatil takvimi">
      <Row gutter={[16, 16]} style={{ marginBottom: spacing["2xl"] }}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <SectionCard variant="default">
            <Statistic title="Toplam Kalan İzin" value={totalRemaining} suffix="gün" />
          </SectionCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <SectionCard variant="default">
            <Statistic title="Kullanılan İzin" value={totalUsed} suffix="gün" />
          </SectionCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <SectionCard variant="default">
            <Statistic title="Planlı Tatiller" value={holidays.length} suffix="gün" />
          </SectionCard>
        </Col>
      </Row>

      <SectionCard variant="default">
        <Table
          columns={balanceColumns}
          dataSource={balances}
          rowKey="type"
          pagination={false}
          bordered
        />
      </SectionCard>

      <SectionCard variant="default">
        <Table
          columns={holidayColumns}
          dataSource={holidays}
          rowKey="date"
          pagination={false}
          scroll={{ x: 640 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default LeaveInfoPage;
