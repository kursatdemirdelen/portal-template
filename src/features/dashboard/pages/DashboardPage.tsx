import React from "react";
import { Row, Col } from "antd";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { DashboardStatCards } from "../components/StatCards";
import { RecentTickets, type Ticket } from "../components/RecentTickets";
import { SprintInfo } from "../components/SprintInfo";
import { ActiveProjects, type Project } from "../components/ActiveProjects";

const DashboardPage: React.FC = () => {
  // Stats configuration
  const stats = [
    {
      key: "openTickets",
      title: "Açık Ticket",
      value: 34,
      trend: "up" as const,
      trendValue: 12,
      icon: <FieldTimeOutlined />,
      color: "blue" as const,
    },
    {
      key: "activeProjects",
      title: "Aktif Proje",
      value: 12,
      trend: "neutral" as const,
      trendValue: 0,
      icon: <AppstoreOutlined />,
      color: "purple" as const,
    },
    {
      key: "thisWeekDone",
      title: "Bu Hafta Tamamlanan",
      value: 58,
      trend: "up" as const,
      trendValue: 18,
      icon: <CheckCircleOutlined />,
      color: "green" as const,
    },
    {
      key: "activeUsers",
      title: "Aktif Kullanıcı",
      value: 19,
      trend: "down" as const,
      trendValue: 3,
      icon: <TeamOutlined />,
      color: "cyan" as const,
    },
  ];

  // Recent tickets data
  const recentTickets: Ticket[] = [
    {
      id: "TCK-1042",
      title: "Müşteri panelinde login hatası",
      project: "Client Portal",
      status: "In Progress",
      priority: "High",
      assignee: "Ahmet",
      avatar: "A",
    },
    {
      id: "TCK-1038",
      title: "Zimmet raporu PDF export süresi yüksek",
      project: "Portal Intellium",
      status: "Review",
      priority: "Medium",
      assignee: "Zeynep",
      avatar: "Z",
    },
    {
      id: "TCK-1031",
      title: "Bildirim e-mailleri çift gidiyor",
      project: "Notification Service",
      status: "Todo",
      priority: "High",
      assignee: "Kürşat",
      avatar: "K",
    },
    {
      id: "TCK-1024",
      title: "Scrumboard kart sürükle-bırak iyileştirmesi",
      project: "Portal Intellium",
      status: "Done",
      priority: "Low",
      assignee: "Mehmet",
      avatar: "M",
    },
  ];

  // Active projects data
  const activeProjects: Project[] = [
    {
      name: "Portal Intellium",
      code: "PRJ-001",
      progress: 76,
      status: "On Track",
    },
    {
      name: "Client Ticket Portal",
      code: "PRJ-014",
      progress: 42,
      status: "At Risk",
    },
    {
      name: "Scrumboard Revamp",
      code: "PRJ-021",
      progress: 23,
      status: "Planning",
    },
  ];

  // Sprint info data
  const sprintInfo = {
    name: "Sprint 24 - Q4",
    goal: "Müşteri ticket akışını stabilize etmek",
    startedAt: "01.11.2025",
    endsAt: "14.11.2025",
    completed: 32,
    total: 54,
  };

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Projelerin, ticket'lerin ve sprint durumunun anlık görünümü"
      padding="large"
    >
      {/* Stat Cards */}
      <DashboardStatCards stats={stats} />

      {/* Main Content Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Left: Tickets */}
        <Col xs={24} lg={16}>
          <SectionCard title="Son Ticket Hareketleri">
            <RecentTickets tickets={recentTickets} />
          </SectionCard>
        </Col>

        {/* Right: Sprint Info */}
        <Col xs={24} lg={8}>
          <SectionCard
            title="Aktif Sprint"
            subtitle="Sprint 24 - Q4"
            variant="gradient"
            icon={<CalendarOutlined />}
          >
            <SprintInfo sprintInfo={sprintInfo} />
          </SectionCard>
        </Col>
      </Row>

      {/* Projects Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <SectionCard title="Aktif Projeler" variant="elevated">
            <ActiveProjects projects={activeProjects} />
          </SectionCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DashboardPage;