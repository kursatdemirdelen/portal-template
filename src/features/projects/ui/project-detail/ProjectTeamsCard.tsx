import React, { useState } from "react";
import { Typography, Tag } from "antd";
import { Users } from "lucide-react";
import { SectionCard, AvatarStack } from "@/shared/ui";
import { projectDetailStyles } from "./projectDetailStyles";
import { colors } from "@/shared/styles";
import type { ProjectTeam } from "@/shared/types/project";

const { Text } = Typography;

interface ProjectTeamsCardProps {
  teams: ProjectTeam[];
  loading?: boolean;
}

export const ProjectTeamsCard: React.FC<ProjectTeamsCardProps> = ({
  teams,
  loading = false,
}) => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  if (teams.length === 0) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "#10b981";
      case "Beklemede":
        return "#f59e0b";
      case "Tamamlandı":
        return "#6b7280";
      default:
        return "#5b7aed";
    }
  };

  return (
    <SectionCard
      title="Proje Ekipleri"
      loading={loading}
      extra={
        <Tag color="blue" style={{ fontSize: 11 }}>
          {teams.length} Ekip
        </Tag>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {teams.map((team) => (
          <div
            key={team.id}
            style={{
              ...projectDetailStyles.teamCard,
              ...(hoveredTeam === team.id && projectDetailStyles.teamCardHover),
            }}
            onMouseEnter={() => setHoveredTeam(team.id)}
            onMouseLeave={() => setHoveredTeam(null)}
          >
            <div style={projectDetailStyles.teamIconBox}>
              <Users size={18} color={colors.primary} />
            </div>
            <div style={projectDetailStyles.teamInfo}>
              <Text style={projectDetailStyles.teamName}>{team.name}</Text>
              <Text style={projectDetailStyles.teamRole}>{team.role}</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AvatarStack people={team.people} size={24} maxVisible={3} />
              <Tag
                style={{
                  fontSize: 10,
                  margin: 0,
                  background: `${getStatusColor(team.status)}15`,
                  border: `1px solid ${getStatusColor(team.status)}30`,
                  color: getStatusColor(team.status),
                }}
              >
                {team.status}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
