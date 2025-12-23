import React, { useState } from "react";
import { Tag, Typography, Progress } from "antd";
import {
  Building2,
  User,
  Calendar,
  Users,
  FolderKanban,
  Clock,
} from "lucide-react";
import { SectionCard } from "@/shared/ui";
import { projectDetailStyles } from "./projectDetailStyles";
import { projectStatusColorMap } from "@/shared/types/project";
import type { Project } from "@/shared/types/project";

const { Text } = Typography;

interface MetaItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const MetaItem: React.FC<MetaItemProps> = ({
  id,
  icon,
  label,
  hoveredItem,
  setHoveredItem,
  children,
  fullWidth,
}) => (
  <div
    style={{
      ...projectDetailStyles.metaItem,
      ...(fullWidth && { gridColumn: "1 / -1" }),
    }}
    onMouseEnter={() => setHoveredItem(id)}
    onMouseLeave={() => setHoveredItem(null)}
  >
    <div
      style={{
        ...projectDetailStyles.metaIconBox,
        ...(hoveredItem === id && {
          background: "rgba(91, 122, 237, 0.15)",
          transform: "scale(1.05)",
        }),
      }}
    >
      {icon}
    </div>
    <div style={projectDetailStyles.metaContent}>
      <Text type="secondary" style={projectDetailStyles.metaLabel}>
        {label}
      </Text>
      <div style={projectDetailStyles.metaValue}>{children}</div>
    </div>
  </div>
);

interface ProjectMetaCardProps {
  project: Project;
  loading?: boolean;
}

export const ProjectMetaCard: React.FC<ProjectMetaCardProps> = ({
  project,
  loading = false,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const statusColor = projectStatusColorMap[project.status];

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      Active: "Devam Ediyor",
      Completed: "Tamamlandı",
      "On Hold": "Beklemede",
      Planning: "Planlama",
    };
    return statusMap[status] || status;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <SectionCard title="Proje Bilgileri" loading={loading}>
      <div style={projectDetailStyles.metaContainer}>
        <MetaItem
          id="status"
          icon={
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusColor,
              }}
            />
          }
          label="Durum"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Tag
            style={{
              background: `${statusColor}15`,
              border: `1px solid ${statusColor}30`,
              color: statusColor,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {getStatusLabel(project.status)}
          </Tag>
        </MetaItem>

        <MetaItem
          id="category"
          icon={<FolderKanban size={13} color="#5b7aed" />}
          label="Kategori"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {project.category}
          </Text>
        </MetaItem>

        <MetaItem
          id="manager"
          icon={<User size={13} color="#5b7aed" />}
          label="Proje Lideri"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {project.manager}
          </Text>
        </MetaItem>

        <MetaItem
          id="teamSize"
          icon={<Users size={13} color="#5b7aed" />}
          label="Ekip Büyüklüğü"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {project.teamSize} kişi
          </Text>
        </MetaItem>

        <div style={projectDetailStyles.metaDivider} />

        <MetaItem
          id="customer"
          icon={<Building2 size={13} color="#5b7aed" />}
          label="Müşteri"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          fullWidth
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {project.customer}
          </Text>
        </MetaItem>

        <div style={projectDetailStyles.metaDivider} />

        <MetaItem
          id="startDate"
          icon={<Calendar size={13} color="#10b981" />}
          label="Başlangıç"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {formatDate(project.startDate)}
          </Text>
        </MetaItem>

        <MetaItem
          id="endDate"
          icon={<Clock size={13} color="#f59e0b" />}
          label="Bitiş"
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            {formatDate(project.endDate)}
          </Text>
        </MetaItem>

        <div style={projectDetailStyles.metaDivider} />

        <div style={{ gridColumn: "1 / -1" }}>
          <div style={projectDetailStyles.progressContainer}>
            <div style={projectDetailStyles.progressHeader}>
              <span style={projectDetailStyles.progressLabel}>İlerleme</span>
              <span style={projectDetailStyles.progressValue}>
                {project.progress}%
              </span>
            </div>
            <Progress
              percent={project.progress}
              showInfo={false}
              strokeColor={statusColor}
              trailColor="rgba(0,0,0,0.06)"
              size="small"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
