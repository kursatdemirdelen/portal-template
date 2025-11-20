import React from "react";
import { Avatar, Space, Typography } from "antd";
import { getStatusStyle } from "@/shared/styles/styleHelpers";

const { Text } = Typography;

export interface Ticket {
  id: string;
  title: string;
  customer: string;
  requestType: string;
  status: string;
  assignee: string;
  avatar: string;
  project: string;
  createdAt: string;
}

interface RecentTicketsProps {
  tickets: Ticket[];
}

const requestTypeStyles: Record<string, { bg: string; text: string }> = {
  "Technical Support": { bg: "rgba(52, 152, 219, 0.12)", text: "#2c82c9" },
  "Suggest Improvement": { bg: "rgba(155, 89, 182, 0.12)", text: "#8e44ad" },
  "Report a BUG": { bg: "rgba(231, 76, 60, 0.12)", text: "#c0392b" },
  "Suggest a New Feature": { bg: "rgba(46, 204, 113, 0.12)", text: "#27ae60" },
};

export const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets }) => {
  const gridTemplate = "80px 1.5fr 1.1fr 1fr 1fr 1fr";

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplate,
          padding: "8px 16px",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.3,
          color: "#6b7280",
          borderBottom: "1px solid #eef2ff",
          background: "#f8fafc",
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <span>ID</span>
        <span>Bilet Adi</span>
        <span>Istek Tipi</span>
        <span>Proje</span>
        <span>Durum</span>
        <span>Atanan</span>
      </div>

      {tickets.map((item, index) => {
        const statusColor = getStatusStyle(item.status);
        const typeBadge = requestTypeStyles[item.requestType] ?? {
          bg: "rgba(127, 140, 141, 0.15)",
          text: "#7f8c8d",
        };

        return (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
              padding: "14px 16px",
              alignItems: "center",
              borderRadius: 8,
              background: index % 2 === 0 ? "#ffffff" : "#fdfdff",
              border: "1px solid #f0f2f8",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontWeight: 600, color: "#1f2937" }}>{item.id}</Text>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text style={{ color: "#1f2937", fontWeight: 600 }}>{item.title}</Text>
              <Text type="secondary" style={{ fontSize: 12, color: "#64748b" }}>
                Musteri: {item.customer} | Tarih: {item.createdAt}
              </Text>
            </div>

            <div
              style={{
                padding: "4px 10px",
                background: typeBadge.bg,
                color: typeBadge.text,
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 6,
                width: "fit-content",
              }}
            >
              {item.requestType}
            </div>

            <Text style={{ color: "#475569", fontWeight: 500 }}>{item.project}</Text>

            <div
              style={{
                padding: "4px 10px",
                background: statusColor.bg,
                border: `1px solid ${statusColor.border}`,
                borderRadius: 6,
                fontSize: 11,
                color: statusColor.text,
                fontWeight: 600,
                width: "fit-content",
              }}
            >
              {item.status}
            </div>

            <Space size={10} align="center">
              <Avatar
                size={32}
                style={{
                  background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {item.avatar}
              </Avatar>
              <Text style={{ color: "#1f2937", fontWeight: 500 }}>{item.assignee}</Text>
            </Space>
          </div>
        );
      })}
    </div>
  );
};
