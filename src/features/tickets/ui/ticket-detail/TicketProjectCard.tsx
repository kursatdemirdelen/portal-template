import React, { useState } from "react";
import { Typography, Progress, Tag } from "antd";
import { FolderKanban, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionCard } from "@/shared/ui";
import { theme } from "@/shared/styles";
import { ticketCardStyles } from "../shared/ticketCardStyles";

const { Text } = Typography;

interface TicketProjectCardProps {
  projectId: string;
  projectName: string;
  projectStatus: "active" | "completed" | "on-hold";
  progress?: number;
  teamSize?: number;
  endDate?: string;
  loading?: boolean;
}

export const TicketProjectCard: React.FC<TicketProjectCardProps> = ({
  projectId,
  projectName,
  projectStatus,
  progress = 0,
  teamSize = 0,
  endDate,
  loading = false,
}) => {
  const navigate = useNavigate();
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const statusConfig = {
    active: { color: "success", label: "Aktif" },
    completed: { color: "blue", label: "Tamamlandı" },
    "on-hold": { color: "warning", label: "Beklemede" },
  };

  return (
    <SectionCard title="Proje" loading={loading}>
      <div
        style={{
          ...ticketCardStyles.projectHeader,
          ...(isHeaderHovered && ticketCardStyles.projectHeaderHover),
        }}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        onClick={() => navigate(`/projects/${projectId}`)}
      >
        <div style={ticketCardStyles.projectIconBox}>
          <FolderKanban size={17} color={theme.colors.primary} />
        </div>
        <div style={ticketCardStyles.projectInfo}>
          <Text style={ticketCardStyles.projectName}>{projectName}</Text>
          <Tag
            color={statusConfig[projectStatus].color}
            style={{
              ...ticketCardStyles.statusTag,
              fontSize: 9,
              padding: "1px 7px",
            }}
          >
            {statusConfig[projectStatus].label}
          </Tag>
        </div>
      </div>

      {progress > 0 && (
        <div style={ticketCardStyles.progressContainer}>
          <div style={ticketCardStyles.progressHeader}>
            <Text style={ticketCardStyles.progressLabel}>İlerleme</Text>
            <Text style={ticketCardStyles.progressValue}>{progress}%</Text>
          </div>
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor={{
              "0%": theme.colors.primary,
              "100%": theme.colors.status.success,
            }}
            trailColor={theme.colors.surface.soft}
            strokeWidth={5}
          />
        </div>
      )}

      <div style={ticketCardStyles.infoRow}>
        {teamSize > 0 && (
          <div style={ticketCardStyles.infoItem}>
            <Users size={12} color={theme.colors.text.secondary} />
            <Text style={ticketCardStyles.infoText}>{teamSize} kişi</Text>
          </div>
        )}
        {endDate && (
          <div style={ticketCardStyles.infoItem}>
            <Calendar size={12} color={theme.colors.text.secondary} />
            <Text style={ticketCardStyles.infoText}>
              {new Date(endDate).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "short",
              })}
            </Text>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default TicketProjectCard;
