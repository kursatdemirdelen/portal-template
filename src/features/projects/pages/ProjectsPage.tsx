import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui";
import { ProjectList } from "@/features/projects/ui/ProjectList";
import { mockProjects } from "@/shared/data/mocks";

const ProjectsPage: React.FC = () => {
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
      <ProjectList projects={mockProjects} />
    </PageContainer>
  );
};

export default ProjectsPage;
