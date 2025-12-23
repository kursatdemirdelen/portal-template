import React, { useState } from "react";
import { Typography, Tag, Button } from "antd";
import { Ticket, ExternalLink } from "lucide-react";
import { SectionCard } from "@/shared/ui";
import { projectDetailStyles } from "./projectDetailStyles";
import { colors } from "@/shared/styles";

const { Text } = Typography;

interface ProjectTicket {
  id: string;
  title: string;
  status: "Open" | "In Progress" | "Closed" | "On Hold";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee?: string;
}

interface ProjectTicketsCardProps {
  tickets: ProjectTicket[];
  loading?: boolean;
  onViewAll?: () => void;
}

export const ProjectTicketsCard: React.FC<ProjectTicketsCardProps> = ({
  tickets,
  loading = false,
  onViewAll,
}) => {
  const [hoveredTicket, setHoveredTicket] = useState<string | null>(null);

  if (tickets.length === 0) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "#3b82f6";
      case "In Progress":
        return "#f59e0b";
      case "Closed":
        return "#10b981";
      case "On Hold":
        return "#6b7280";
      default:
        return "#5b7aed";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Open":
        return "Açık";
      case "In Progress":
        return "Devam Ediyor";
      case "Closed":
        return "Kapalı";
      case "On Hold":
        return "Beklemede";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "#ef4444";
      case "High":
        return "#f59e0b";
      case "Medium":
        return "#3b82f6";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <SectionCard
      title="İlişkili Biletler"
      loading={loading}
      extra={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag color="blue" style={{ fontSize: 11, margin: 0 }}>
            {tickets.length} Bilet
          </Tag>
          {tickets.length > 0 && (
            <Button
              type="text"
              size="small"
              icon={<ExternalLink size={12} />}
              onClick={onViewAll}
              style={{ fontSize: 11, padding: "2px 8px", height: "auto" }}
            >
              Tümünü Gör
            </Button>
          )}
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tickets.slice(0, 5).map((ticket) => (
          <div
            key={ticket.id}
            style={{
              ...projectDetailStyles.ticketItem,
              ...(hoveredTicket === ticket.id &&
                projectDetailStyles.ticketItemHover),
            }}
            onMouseEnter={() => setHoveredTicket(ticket.id)}
            onMouseLeave={() => setHoveredTicket(null)}
          >
            <div style={projectDetailStyles.ticketIconBox}>
              <Ticket size={14} color={colors.primary} />
            </div>
            <div style={projectDetailStyles.ticketInfo}>
              <Text style={projectDetailStyles.ticketId}>{ticket.id}</Text>
              <Text style={projectDetailStyles.ticketTitle}>
                {ticket.title}
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: getPriorityColor(ticket.priority),
                }}
              />
              <Tag
                style={{
                  fontSize: 10,
                  margin: 0,
                  padding: "1px 6px",
                  background: `${getStatusColor(ticket.status)}15`,
                  border: `1px solid ${getStatusColor(ticket.status)}30`,
                  color: getStatusColor(ticket.status),
                }}
              >
                {getStatusLabel(ticket.status)}
              </Tag>
            </div>
          </div>
        ))}
        {tickets.length > 5 && (
          <div
            style={{
              textAlign: "center",
              padding: "8px 0",
              fontSize: 11,
              color: colors.primary,
              fontWeight: 500,
            }}
          >
            +{tickets.length - 5} daha fazla bilet
          </div>
        )}
      </div>
    </SectionCard>
  );
};
