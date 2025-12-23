import React from "react";
import { Typography, Tag } from "antd";
import { UserAvatar, SectionCard } from "@/shared/ui";
import { projectDetailStyles } from "./projectDetailStyles";
import { getAvatarByName } from "@/shared/data/mocks";
import type { Project } from "@/shared/types/project";

const { Text } = Typography;

interface ProjectDescriptionProps {
  project: Project;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  project,
}) => {
  const avatarInfo = getAvatarByName(project.manager);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SectionCard title="Proje Detayı">
      {/* Header */}
      <div style={projectDetailStyles.descriptionHeader}>
        <div style={projectDetailStyles.descriptionAvatar}>
          <UserAvatar
            size={40}
            user={{ name: project.manager }}
            backgroundColor={avatarInfo.color}
            avatarUrl={avatarInfo.avatarUrl}
          />
        </div>
        <div style={projectDetailStyles.descriptionInfo}>
          <Text style={projectDetailStyles.descriptionName}>
            {project.name}
          </Text>
          <Text style={projectDetailStyles.descriptionDate}>
            Oluşturulma: {formatDate(project.createdAt)}
          </Text>
          <Text style={projectDetailStyles.descriptionDate}>
            Son Güncelleme: {formatDate(project.updatedAt)}
          </Text>
        </div>
        <Tag color="blue" style={projectDetailStyles.descriptionTag}>
          {project.category}
        </Tag>
      </div>

      {/* Description */}
      <div style={projectDetailStyles.descriptionContent}>
        {project.description}
      </div>
    </SectionCard>
  );
};
