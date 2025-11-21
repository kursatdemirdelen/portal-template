import React from "react";
import { Row, Col, Statistic, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";
import type { Holiday, LeaveBalance, HolidayType } from "../model/types";

const holidayTypeLabel: Record<HolidayType, string> = {
  official: "Resmi Tatil",
  company: "Şirket Tatili",
  personal: "Kişisel",
};

const holidayTypeColor: Record<HolidayType, string> = {
  official: colorPalette.primary,
  company: "#faad14",
  personal: "#52c41a",
};

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
    render: (type: HolidayType) => (
      <Tag color={holidayTypeColor[type]}>{holidayTypeLabel[type]}</Tag>
    ),
  },
];

interface LeaveListProps {
  balances: LeaveBalance[];
  holidays: Holiday[];
}

export const LeaveList: React.FC<LeaveListProps> = ({ balances, holidays }) => {
  const totalRemaining = balances.reduce(
    (sum, item) => sum + item.remaining,
    0
  );
  const totalUsed = balances.reduce((sum, item) => sum + item.used, 0);

  return (
    <>
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
            <Statistic
              title="Planlı Tatiller"
              value={holidays.length}
              suffix="adet"
            />
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
    </>
  );
};
