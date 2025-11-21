import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import { ProjectList } from "@/features/projects/ui/ProjectList";
import type { Project } from "@/features/projects/model";

const ProjectsPage: React.FC = () => {
  const projects: Project[] = [
    {
      id: "1",
      code: "PRJ-001",
      name: "Portal Intellium",
      status: "Active",
      progress: 76,
      teamSize: 5,
      startDate: "2025-09-01",
      endDate: "2025-12-15",
      description: "Kurumsal portal uygulaması",
    },
    {
      id: "2",
      code: "PRJ-002",
      name: "Mobile Uygulama",
      status: "Active",
      progress: 42,
      teamSize: 3,
      startDate: "2025-10-01",
      endDate: "2026-01-30",
      description: "iOS ve Android uygulaması",
    },
    {
      id: "3",
      code: "PRJ-003",
      name: "Scrumboard",
      status: "Active",
      progress: 23,
      teamSize: 2,
      startDate: "2025-11-01",
      endDate: "2026-03-31",
      description: "Proje yönetim aracı",
    },
  ];

  return (
    <PageContainer
      title="Projeler"
      subtitle="Aktif ve geçmiş projeleri yönet"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Yeni Proje
        </Button>
      }
    >
      <ProjectList projects={projects} />
    </PageContainer>
  );
};

export default ProjectsPage;
