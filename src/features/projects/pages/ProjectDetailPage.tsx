import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Empty, Button } from "antd";
import {
  getProjectById,
  getTeamsByProjectId,
} from "@/shared/data/mocks/projects.mock";
import { PageContainer } from "@/shared/ui";
import type { BreadcrumbItem } from "@/shared/hooks/useBreadcrumbs";
import { useNotification } from "@/shared/hooks";
import {
  ProjectMetaCard,
  ProjectDescription,
  ProjectTeamsCard,
  ProjectTimeline,
  ProjectTicketsCard,
  ProjectHeader,
} from "../ui/project-detail";

// Mock ticket data - in real app, fetch from API
const mockProjectTickets = [
  {
    id: "TCK-1243",
    title: "Dashboard yükleme sorunu",
    status: "In Progress" as const,
    priority: "High" as const,
    assignee: "Ahmet Yılmaz",
  },
  {
    id: "TCK-1242",
    title: "Sidebar responsive tasarımı",
    status: "Open" as const,
    priority: "Medium" as const,
    assignee: "Can Şimşek",
  },
  {
    id: "TCK-1241",
    title: "Kullanıcı profil sayfası",
    status: "In Progress" as const,
    priority: "High" as const,
    assignee: "Kürşat Demirdelen",
  },
  {
    id: "TCK-1239",
    title: "API entegrasyonu",
    status: "Open" as const,
    priority: "Critical" as const,
    assignee: "Zeynep Ünal",
  },
  {
    id: "TCK-1235",
    title: "Hata ayıklama ve optimizasyon",
    status: "Closed" as const,
    priority: "Medium" as const,
  },
  {
    id: "TCK-1234",
    title: "Güvenlik güncellemeleri",
    status: "On Hold" as const,
    priority: "High" as const,
  },
  {
    id: "TCK-1233",
    title: "Veritabanı şeması tasarımı",
    status: "Closed" as const,
    priority: "Critical" as const,
  },
];

const getProjectTickets = (projectId: string) => {
  // In a real app, filter tickets by projectId from API
  // For now, return sample tickets for PRJ-001
  if (projectId === "PRJ-001") {
    return mockProjectTickets;
  }
  if (projectId === "PRJ-002") {
    return mockProjectTickets.slice(0, 2);
  }
  return [];
};

const ProjectDetailPageComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { success } = useNotification();

  if (!id) {
    return (
      <PageContainer title="Proje Detayı">
        <Empty description="Proje ID bulunamadı" />
      </PageContainer>
    );
  }

  const project = getProjectById(id);

  if (!project) {
    return (
      <PageContainer title="Proje Detayı">
        <Empty description="Proje bulunamadı" style={{ marginTop: "50px" }}>
          <Button type="primary" onClick={() => navigate("/projects")}>
            Projelere Dön
          </Button>
        </Empty>
      </PageContainer>
    );
  }

  const relatedTeams = getTeamsByProjectId(id);
  const relatedTickets = getProjectTickets(id);

  const handleStatusChange = (status: string) => {
    console.log("Status changed to:", status);
    success("Başarılı", `Proje durumu '${status}' olarak güncellendi`);
    // Entegrasyon noktası: Proje güncelleme API çağrısı
    // await projectService.updateProject(id, { status });
  };

  const handleEdit = () => {
    navigate(`/projects/${id}/edit`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Projeler", href: "/projects" },
    { title: project.name },
  ];

  return (
    <PageContainer
      title={project.name}
      breadcrumbs={breadcrumbs}
      showBackButton
      extra={
        <ProjectHeader
          status={project.status}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
        />
      }
    >
      <Row gutter={[24, 24]}>
        {/* Sağ Kolon - Meta Bilgiler (Mobilde Üstte) */}
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
          <ProjectMetaCard project={project} />

          {relatedTeams.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <ProjectTeamsCard teams={relatedTeams} />
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <ProjectTimeline project={project} />
          </div>
        </Col>

        {/* Sol Kolon - Ana İçerik (Mobilde Altta) */}
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
          <ProjectDescription project={project} />

          {relatedTickets.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <ProjectTicketsCard
                tickets={relatedTickets}
                onViewAll={() =>
                  navigate("/tickets", { state: { projectId: id } })
                }
              />
            </div>
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ProjectDetailPageComponent;
