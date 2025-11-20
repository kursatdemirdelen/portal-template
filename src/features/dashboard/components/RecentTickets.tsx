/**
 * Recent Tickets List - Refactored sub-component
 */

import React from "react";
import { List, Avatar, Space, Typography } from "antd";
import { getStatusStyle, getPriorityColor } from "@/shared/styles/styleHelpers";

const { Text } = Typography;

export interface Ticket {
  id: string;
  title: string;
  project: string;
  status: string;
  priority: string;
  assignee: string;
  avatar: string;
}

interface RecentTicketsProps {
  tickets: Ticket[];
}

export const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets }) => {
  return (
    <List
      dataSource={tickets}
      renderItem={(item) => {
        const statusColor = getStatusStyle(item.status);
        const priorityColor = getPriorityColor(item.priority);

        return (
          <div
            style={{
              padding: "12px",
              borderBottom: "1px solid #e8eefb",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            {/* Avatar */}
            <Avatar
              size={36}
              style={{
                background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {item.avatar}
            </Avatar>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 4 }}>
                <Text
                  style={{
                    color: "#2c3e50",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  {item.title}
                </Text>
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
                <Text type="secondary" style={{ color: "#7f8c8d" }}>{item.id}</Text>
                <Text type="secondary" style={{ color: "#7f8c8d" }}>·</Text>
                <Text type="secondary" style={{ color: "#7f8c8d" }}>{item.project}</Text>
              </div>
            </div>

            {/* Status & Priority */}
            <Space size={6}>
              <div
                style={{
                  padding: "4px 10px",
                  background: statusColor.bg,
                  border: `1px solid ${statusColor.border}`,
                  borderRadius: 4,
                  fontSize: 11,
                  color: statusColor.text,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {item.status}
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  background: `${priorityColor}20`,
                  border: `1px solid ${priorityColor}40`,
                  borderRadius: 4,
                  fontSize: 11,
                  color: priorityColor,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {item.priority}
              </div>
            </Space>
          </div>
        );
      }}
    />
  );
};
