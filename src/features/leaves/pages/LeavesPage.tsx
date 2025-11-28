import React, { useState } from "react";
import { Button, Tabs } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { LeaveList } from "@/features/leaves/ui/LeaveList";
import { LeaveRequestForm } from "@/features/leaves/ui/LeaveRequestForm";
import { LeaveCalendar } from "@/features/leaves/ui/LeaveCalendar";
import type {
  LeaveBalance,
  Holiday,
  LeaveRequest,
} from "@/features/leaves/model/types";

const balances: LeaveBalance[] = [
  { type: "Yıllık İzin", used: 8, remaining: 12 },
  { type: "Hastalık İzni", used: 2, remaining: 5 },
  { type: "Ücretsiz İzin", used: 0, remaining: 10 },
];

const holidays: Holiday[] = [
  {
    date: "2025-04-23",
    title: "Ulusal Egemenlik ve Çocuk Bayramı",
    type: "official",
  },
  { date: "2025-05-01", title: "Emek ve Dayanışma Günü", type: "official" },
  { date: "2025-06-10", title: "Şirket Tatili - Offsite", type: "company" },
];

const initialLeaves: LeaveRequest[] = [
  {
    id: "1",
    type: "Yıllık İzin",
    startDate: "2025-02-10",
    endDate: "2025-02-14",
    days: 5,
    description: "Kış tatili",
    status: "approved",
  },
];

const LeavesPage: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateLeave = (values: Omit<LeaveRequest, "id" | "status">) => {
    const newLeave: LeaveRequest = {
      ...values,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
    };
    setLeaves([...leaves, newLeave]);
    setIsModalVisible(false);
  };

  const items = [
    {
      key: "list",
      label: (
        <span>
          <UnorderedListOutlined />
          Liste Görünümü
        </span>
      ),
      children: (
        <LeaveList balances={balances} holidays={holidays} leaves={leaves} />
      ),
    },
    {
      key: "calendar",
      label: (
        <span>
          <CalendarOutlined />
          Takvim Görünümü
        </span>
      ),
      children: <LeaveCalendar holidays={holidays} leaves={leaves} />,
    },
  ];

  return (
    <PageContainer
      title="Tatil Bilgileri"
      subtitle="İzin hakları ve tatil takvimi"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          İzin Talebi Oluştur
        </Button>
      }
    >
      <SectionCard>
        <Tabs defaultActiveKey="list" items={items} />
      </SectionCard>

      <LeaveRequestForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleCreateLeave}
      />
    </PageContainer>
  );
};

export default LeavesPage;
