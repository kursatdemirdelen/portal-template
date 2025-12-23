import React from "react";
import { Typography } from "antd";
import { SectionCard } from "@/shared/ui";
import { projectDetailStyles } from "./projectDetailStyles";
import { colors } from "@/shared/styles";
import type { Project } from "@/shared/types/project";

const { Text } = Typography;

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  color: string;
}

interface ProjectTimelineProps {
  project: Project;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  project,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const events: TimelineEvent[] = [
    {
      id: "created",
      title: "Proje Oluşturuldu",
      date: project.createdAt,
      description: "Proje sisteme eklendi",
      color: colors.primary,
    },
    {
      id: "started",
      title: "Proje Başladı",
      date: project.startDate,
      description: "Geliştirme süreci başlatıldı",
      color: "#10b981",
    },
    {
      id: "updated",
      title: "Son Güncelleme",
      date: project.updatedAt,
      description: "Proje bilgileri güncellendi",
      color: "#f59e0b",
    },
    {
      id: "planned",
      title: "Planlanan Bitiş",
      date: project.endDate,
      description: "Hedeflenen tamamlanma tarihi",
      color: "#ef4444",
    },
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <SectionCard title="Zaman Çizelgesi">
      <div style={{ paddingLeft: 4 }}>
        {events.map((event, index) => (
          <div
            key={event.id}
            style={{
              ...projectDetailStyles.timelineItem,
              ...(index === events.length - 1 && { paddingBottom: 0 }),
            }}
          >
            {index < events.length - 1 && (
              <div style={projectDetailStyles.timelineLine} />
            )}
            <div
              style={{
                ...projectDetailStyles.timelineDot,
                background: event.color,
              }}
            />
            <div style={projectDetailStyles.timelineContent}>
              <Text style={projectDetailStyles.timelineTitle}>
                {event.title}
              </Text>
              <Text style={projectDetailStyles.timelineDate}>
                {formatDate(event.date)} • {event.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
