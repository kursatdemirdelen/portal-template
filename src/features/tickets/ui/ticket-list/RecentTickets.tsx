import React, { memo, useState } from "react";
import { Typography } from "antd";
import {
  backgrounds,
  borderColors,
  colors,
  gradients,
  hexToRgba,
  getRequestTypeStyle,
  getStatusStyle,
} from "@/shared/styles";
import { getAvatarByName, getUserByName } from "@/shared/data/mocks";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import type { Ticket } from "../../model/types";
import { formatTicketDate } from "../../model/utils";

const { Text } = Typography;

interface RecentTicketsProps {
  tickets: Ticket[];
}

export const RecentTickets: React.FC<RecentTicketsProps> = memo(
  ({ tickets }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {tickets.map((item, index) => {
          const statusColor = getStatusStyle(item.status);
          const typeBadge = getRequestTypeStyle(item.requestType);
          const isHovered = hoveredId === item.id;
          const avatarInfo = getAvatarByName(item.assignee);
          const userInfo = getUserByName(item.assignee);

          return (
            <div
              key={item.id}
              style={{
                padding: "8px 8px",
                background: isHovered
                  ? gradients.colorBlue
                  : index % 2 === 0
                  ? backgrounds.neutral50
                  : backgrounds.card,
                borderLeft: `3px solid ${
                  isHovered ? colors.primary : "transparent"
                }`,
                borderBottom: `1px solid ${borderColors.light}`,
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Header: ID ve Status */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  strong
                  style={{
                    fontSize: 11,
                    color: colors.primary,
                    fontWeight: 600,
                  }}
                >
                  {item.id}
                </Text>
                <div
                  style={{
                    padding: "2px 8px",
                    borderRadius: "10px",
                    background: statusColor.bg,
                    color: statusColor.text,
                    fontSize: 10,
                    fontWeight: 600,
                    border: `1px solid ${statusColor.border}`,
                    boxShadow: `0 1px 3px ${statusColor.border}40`,
                  }}
                >
                  {item.status}
                </div>
              </div>

              {/* Title */}
              <Text
                strong
                style={{
                  fontSize: 13,
                  display: "block",
                  marginBottom: 6,
                  color: colors.textPrimary,
                  lineHeight: "1.3",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={item.title}
              >
                {item.title}
              </Text>

              {/* Meta Info */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: typeBadge.bg,
                    color: typeBadge.text,
                    fontSize: 10,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    boxShadow: `0 1px 2px ${hexToRgba(typeBadge.text, 0.2)}`,
                  }}
                >
                  {item.requestType}
                </div>
                <Text
                  type="secondary"
                  style={{
                    fontSize: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                  title={item.project}
                >
                  📦 {item.project}
                </Text>
              </div>

              {/* Footer: Assignee */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  paddingTop: 6,
                  borderTop: `1px solid ${borderColors.light}`,
                }}
              >
                <UserAvatar
                  size={20}
                  backgroundColor={avatarInfo.color}
                  avatarUrl={userInfo?.avatarUrl}
                  user={{ name: item.assignee }}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.textSecondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                  title={item.assignee}
                >
                  {item.assignee}
                </Text>
                <Text type="secondary" style={{ fontSize: 9, flexShrink: 0 }}>
                  {formatTicketDate(item.createdAt)}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

RecentTickets.displayName = "RecentTickets";
