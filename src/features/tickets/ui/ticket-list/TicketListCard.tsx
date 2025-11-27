import React from "react";
import { Card, Tag, Tooltip } from "antd";
import { theme } from "@/shared/styles/styleConstants";
import {
  getStatusStyle,
  getRequestTypeStyle,
} from "@/shared/styles/styleHelpers";
import { UserAvatar } from "@/shared/ui";
import { formatTicketDate } from "@/features/tickets/model";
import { getAvatarByName } from "@/shared/data/mockData";

export interface TicketListCardProps {
  id: string;
  title: string;
  project: string;
  requestType: string;
  status: string;
  assignee: string;
  createdAt: string;
  onClick?: () => void;
}

// Modern compact card for mobile list view
export const TicketListCard: React.FC<TicketListCardProps> = ({
  id,
  title,
  project,
  requestType,
  status,
  assignee,
  createdAt,
  onClick,
}) => {
  const statusStyle = getStatusStyle(status);
  const requestTypeStyle = getRequestTypeStyle(requestType);
  const avatarInfo = getAvatarByName(assignee);
  return (
    <Card
      size="small"
      hoverable
      onClick={onClick}
      style={{
        borderRadius: 10,
        minHeight: 160,
        border: `1px solid ${theme.colors.border.subtle}`,
        transition: "all 0.2s ease",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 16,
          height: "100%",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontWeight: 600,
            color: theme.colors.primary,
            fontSize: 12,
          }}
        >
          {id}
        </span>
        <Tag
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            background: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            color: statusStyle.text,
            fontWeight: 600,
            fontSize: 10,
            margin: 0,
          }}
        >
          {status}
        </Tag>
      </div>
      {/* Title */}
      <Tooltip title={title} placement="topLeft">
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: theme.colors.text.primary,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: 42,
          }}
        >
          {title}
        </div>
      </Tooltip>

      {/* Project & Request Type */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: theme.colors.text.secondary,
            maxWidth: 120,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {project}
        </span>
        <Tag
          style={{
            padding: "1px 8px",
            borderRadius: 4,
            background: requestTypeStyle.bg,
            border: `1px solid ${requestTypeStyle.border}`,
            color: requestTypeStyle.text,
            fontWeight: 500,
            fontSize: 10,
            margin: 0,
          }}
        >
          {requestType}
        </Tag>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: 8,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
        }}
      >
        <Tooltip title={assignee}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <UserAvatar
              size={22}
              user={{ name: assignee }}
              backgroundColor={avatarInfo.color}
              avatarUrl={avatarInfo.avatarUrl}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {assignee}
            </span>
          </div>
        </Tooltip>
        <span
          style={{
            fontSize: 10,
            color: theme.colors.text.muted,
            fontWeight: 500,
          }}
        >
          {formatTicketDate(createdAt)}
        </span>
      </div>
    </Card>
  );
};

export default TicketListCard;
