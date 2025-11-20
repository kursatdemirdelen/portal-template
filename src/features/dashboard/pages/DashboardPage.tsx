import React from "react";
import { Row, Col } from "antd";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { RecentTickets, type Ticket } from "../components/RecentTickets";
import { ActiveProjects, type Project } from "../components/ActiveProjects";
import { ProjectTeams, type ProjectTeam } from "../components/ProjectTeams";
import { UserCard, type UserInfo } from "../components/UserCard";
import { TicketDistributionCard } from "../components/TicketDistributionCard";

const TICKET_STATUS_META = [
  {
    key: "Yeni Istek",
    label: "Yeni Istek",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.12)",
  },
  {
    key: "Atanan",
    label: "Atanan",
    color: "#8e44ad",
    bg: "rgba(142, 68, 173, 0.12)",
  },
  {
    key: "Çözümlenen",
    label: "Çözümlenen",
    color: "#27ae60",
    bg: "rgba(39, 174, 96, 0.12)",
  },
];

const TicketStatusChips: React.FC<{
  summary: Array<{
    key: string;
    label: string;
    color: string;
    bg: string;
    count: number;
  }>;
}> = ({ summary }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "flex-end",
      minWidth: 260,
    }}
  >
    {summary.map((item) => (
      <div
        key={item.key}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 12px",
          borderRadius: 999,
          background: item.bg,
          color: item.color,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        <span>{item.label}</span>
        <span
          style={{
            background: "rgba(255,255,255,0.6)",
            color: "#1f2933",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 11,
          }}
        >
          {item.count}
        </span>
      </div>
    ))}
  </div>
);

const DashboardPage: React.FC = () => {
  const ticketDistribution = [
    { label: "Yeni Bilet", value: 11, color: "#3b82f6" },
    { label: "Devam Eden", value: 24, color: "#7c3aed" },
    { label: "Çözümlenen", value: 47, color: "#22c55e" },
  ];

  const recentTickets: Ticket[] = [
    {
      id: "TCK-1042",
      title: "Portal ana sayfa filtre hatasi",
      customer: "Client Portal",
      requestType: "Technical Support",
      status: "Atanan",
      assignee: "Ahmet Demir",
      avatar: "A",
      project: "Portal Intellium",
      createdAt: "28 Eki 2025",
    },
    {
      id: "TCK-1038",
      title: "Zimmet raporu export suresi",
      customer: "Portal Intellium",
      requestType: "Suggest Improvement",
      status: "Çözümlenen",
      assignee: "Zeynep Unlu",
      avatar: "Z",
      project: "Turkuvaz Masraf",
      createdAt: "27 Eki 2025",
    },
    {
      id: "TCK-1031",
      title: "Bildirim maili cift gidiyor",
      customer: "Notification Service",
      requestType: "Report a BUG",
      status: "Yeni Istek",
      assignee: "Kursat Demirdelen",
      avatar: "K",
      project: "Portal Support",
      createdAt: "26 Eki 2025",
    },
    {
      id: "TCK-1024",
      title: "Scrumboard surukle birak iyilestirmesi",
      customer: "Portal Intellium",
      requestType: "Suggest a New Feature",
      status: "Çözümlenen",
      assignee: "Mehmet Can",
      avatar: "M",
      project: "Scrumboard Revamp",
      createdAt: "24 Eki 2025",
    },
  ];

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

  const projectTeams: ProjectTeam[] = [
    {
      id: "team-01",
      name: "Portal Support Team",
      projectName: "Portal Musteri Destek",
      role: "Product Owner",
      members: 6,
      status: "Aktif",
      people: [
        {
          name: "Zeynep Unlu",
          initials: "ZU",
          color: "#fde047",
          avatarUrl: "https://i.pravatar.cc/48?img=5",
        },
        {
          name: "Kursat Demirdelen",
          initials: "KD",
          color: "#c084fc",
          avatarUrl: "https://i.pravatar.cc/48?img=12",
        },
        {
          name: "Ahmet Kaya",
          initials: "AK",
          color: "#60a5fa",
          avatarUrl: "https://i.pravatar.cc/48?img=15",
        },
      ],
    },
    {
      id: "team-02",
      name: "Albaraka Team",
      projectName: "Albaraka Butce Planlama",
      role: "Delivery Lead",
      members: 5,
      status: "Aktif",
      people: [
        {
          name: "Mehmet Can",
          initials: "MC",
          color: "#f472b6",
          avatarUrl: "https://i.pravatar.cc/48?img=20",
        },
        {
          name: "Selin Ak",
          initials: "SA",
          color: "#38bdf8",
          avatarUrl: "https://i.pravatar.cc/48?img=32",
        },
      ],
    },
    {
      id: "team-03",
      name: "CoLAB Team",
      projectName: "Portal-CoLAB",
      role: "Danisman",
      members: 7,
      status: "Beklemede",
      people: [
        {
          name: "Onur Aydin",
          initials: "OA",
          color: "#fb7185",
          avatarUrl: "https://i.pravatar.cc/48?img=46",
        },
        {
          name: "Nisa Turan",
          initials: "NT",
          color: "#34d399",
          avatarUrl: "https://i.pravatar.cc/48?img=52",
        },
      ],
    },
  ];

  const currentUser: UserInfo = {
    name: "Kursat Demirdelen",
    role: "Developer",
    department: "Portal Squad",
    email: "kursat.demirdelen@portal.com",
    lastLogin: "20.11.2025 09:24",
    avatar: "KD",
    company: "Intellium Bilisim Teknolojileri A.S.",
  };

  const ticketStatusSummary = TICKET_STATUS_META.map((meta) => ({
    ...meta,
    count: recentTickets.filter((ticket) => ticket.status === meta.key).length,
  }));

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Projeler ve biletler icin hizli ozet"
      padding="small"
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} align="stretch">
        <Col xs={24} lg={4}>
          <SectionCard
            title="Profil"
            variant="subtle"
            padding="small"
            style={{ height: "100%" }}
          >
            <UserCard user={currentUser} />
          </SectionCard>
        </Col>
        <Col xs={24} lg={16}>
          <SectionCard
            title="Son Biletler"
            extra={<TicketStatusChips summary={ticketStatusSummary} />}
            style={{ height: "100%" }}
          >
            <RecentTickets tickets={recentTickets} />
          </SectionCard>
        </Col>
        <Col xs={24} lg={4}>
          <SectionCard
            title="Bilet Dağılımı"
            variant="default"
            padding="small"
            style={{ height: "100%" }}
          >
            <TicketDistributionCard items={ticketDistribution} />
          </SectionCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} align="stretch">
        <Col xs={24} lg={12}>
          <SectionCard title="Proje Ekipleri" style={{ height: "100%" }}>
            <ProjectTeams teams={projectTeams} />
          </SectionCard>
        </Col>
        <Col xs={24} lg={12}>
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
