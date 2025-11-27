import React, { useState } from "react";
import { Row, Col, Select } from "antd";
import { PageContainer, SectionCard } from "@/shared/ui";
import {
  UserCard,
  type UserInfo,
  ActiveProjects,
  type Project,
  ProjectTeams,
  TicketDistributionCard,
  QuickActions,
  type UserRole,
} from "@/features/dashboard";
import {
  TicketStatusChips,
  RecentTickets,
  TICKET_STATUS_META,
} from "@/features/tickets";
import {
  getRecentTicketsForDepartment,
  getTicketsByDepartment,
  mockProjectTeams,
} from "@/shared/data/mockData";

const DashboardPage: React.FC = () => {
  // Test için rol seçimi
  const [testRole, setTestRole] = useState<UserRole>("developer");

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

  const currentUser: UserInfo = {
    name: "Kürşat Demirdelen",
    role: "Senior Developer",
    department: "Portal Squad",
    email: "kursat.demirdelen@portal.com",
    avatar: "KD",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    company: "Intellium",
    weeklyProgress: 72,
    statusText: "Çevrimiçi",
    statusColor: "#10b981",
    stats: {
      openTickets: 8,
      todayClosed: 2,
      activeProjects: 3,
    },
  };

  const accessibleTickets = getTicketsByDepartment(currentUser.department);
  const recentTickets = getRecentTicketsForDepartment(
    currentUser.department,
    5
  );

  const ticketDistribution = [
    {
      label: "Yeni İstek",
      value: accessibleTickets.filter(
        (ticket) => ticket.status === "Yeni İstek"
      ).length,
      color: "#3b82f6",
    },
    {
      label: "Atanan",
      value: accessibleTickets.filter((ticket) => ticket.status === "Atanan")
        .length,
      color: "#f97316",
    },
    {
      label: "Çözümlenen",
      value: accessibleTickets.filter(
        (ticket) => ticket.status === "Çözümlenen"
      ).length,
      color: "#22c55e",
    },
  ];

  const ticketStatusSummary = TICKET_STATUS_META.map((meta) => ({
    ...meta,
    count: accessibleTickets.filter((ticket) => ticket.status === meta.key)
      .length,
  }));

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Projeler ve biletler için hızlı özet"
      padding="small"
    >
      {/* ÜST SATIR */}
      <Row gutter={[8, 8]} style={{ marginBottom: 24 }} align="stretch">
        {/* PROFİL + SEÇ: SECENEK 1 - Profil altı vertical quick actions */}
        <Col
          xs={{ span: 24, order: 2 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 2 }}
          xxl={{ span: 4, order: 1 }}
        >
          <SectionCard
            variant="subtle"
            padding="small"
            style={{ height: "100%", minHeight: 180 }}
          >
            <UserCard user={currentUser} />
            <div style={{ marginTop: 12 }}>
              <QuickActions role={testRole} variant="compact" />
            </div>
            {/* Geçici rol seçici */}
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px dashed #e8eefb",
              }}
            >
              <Select
                value={testRole}
                onChange={setTestRole}
                size="small"
                style={{ width: "100%" }}
                options={[
                  { value: "admin", label: "👑 Admin" },
                  { value: "manager", label: "👔 Manager" },
                  { value: "developer", label: "💻 Developer" },
                  { value: "user", label: "👤 User" },
                ]}
              />
            </div>
          </SectionCard>
        </Col>

        {/* SON BİLETLER   */}
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 24, order: 1 }}
          xl={{ span: 24, order: 1 }}
          xxl={{ span: 16, order: 2 }}
        >
          <SectionCard
            title="Son Biletler"
            extra={<TicketStatusChips summary={ticketStatusSummary} />}
            style={{ height: "100%", minHeight: 180 }}
          >
            <div style={{ maxHeight: 400, overflow: "auto" }}>
              <RecentTickets tickets={recentTickets} />
            </div>
          </SectionCard>
        </Col>

        {/* BİLET DAĞILIMI */}
        <Col
          xs={{ span: 24, order: 3 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 2 }}
          xxl={{ span: 4, order: 3 }}
        >
          <SectionCard
            title="Bilet Dağılımı"
            variant="default"
            padding="small"
            style={{ height: "100%", minHeight: 180 }}
          >
            <TicketDistributionCard items={ticketDistribution} />
          </SectionCard>
        </Col>
      </Row>

      {/* ALT SATIR */}
      <Row gutter={[8, 8]} style={{ marginBottom: 24 }} align="stretch">
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SectionCard
            title="Proje Ekipleri"
            padding="small"
            style={{ height: "100%" }}
          >
            <ProjectTeams teams={mockProjectTeams} maxTeams={4} />
          </SectionCard>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SectionCard
            title="Aktif Projeler"
            variant="elevated"
            style={{ height: "100%" }}
          >
            <ActiveProjects projects={activeProjects} />
          </SectionCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DashboardPage;
