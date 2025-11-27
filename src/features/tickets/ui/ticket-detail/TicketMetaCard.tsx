import React, { useState } from "react";
import { Tag, Typography } from "antd";
import { CheckCircle, Clock, Calendar, User } from "lucide-react";
import { UserAvatar, SectionCard } from "@/shared/ui";
import { getStatusStyle } from "@/shared/styles/styleHelpers";
import { theme } from "@/shared/styles/styleConstants";
import { ticketCardStyles } from "../shared/ticketCardStyles";
import { getAvatarByName } from "@/shared/data/mockData";

const { Text } = Typography;

interface TicketMetaCardProps {
  status: string;
  resolved: boolean;
  assignee: string;
  project: string;
  assignedDate: string;
  resolvedAt?: string;
  loading?: boolean;
}

export const TicketMetaCard: React.FC<TicketMetaCardProps> = ({
  status,
  resolved,
  assignee,
  project,
  assignedDate,
  resolvedAt,
  loading = false,
}) => {
  const statusStyle = getStatusStyle(status);
  const avatarInfo = getAvatarByName(assignee);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const MetaItem = ({
    id,
    icon,
    label,
    children,
  }: {
    id: string;
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
  }) => (
    <div
      style={ticketCardStyles.metaItem}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div
        style={{
          ...ticketCardStyles.metaIconBox,
          ...(hoveredItem === id && {
            background: "rgba(91, 122, 237, 0.15)",
            transform: "scale(1.05)",
          }),
        }}
      >
        {icon}
      </div>
      <div style={ticketCardStyles.metaContent}>
        <Text type="secondary" style={ticketCardStyles.metaLabel}>
          {label}
        </Text>
        <div style={ticketCardStyles.metaValue}>{children}</div>
      </div>
    </div>
  );

  return (
    <SectionCard title="Bilgiler" loading={loading}>
      <div style={ticketCardStyles.metaContainer}>
        <MetaItem
          id="status"
          icon={
            <div
              style={{
                ...ticketCardStyles.statusDot,
                background: statusStyle.text,
              }}
            />
          }
          label="Durum"
        >
          <Tag
            style={{
              ...ticketCardStyles.statusTag,
              background: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              color: statusStyle.text,
            }}
          >
            {status}
          </Tag>
        </MetaItem>

        <MetaItem
          id="resolution"
          icon={
            resolved ? (
              <CheckCircle size={13} color={theme.colors.status.success} />
            ) : (
              <Clock size={13} color={theme.colors.status.warning} />
            )
          }
          label="Çözüm"
        >
          <Text
            style={{
              ...ticketCardStyles.metaValue,
              color: resolved
                ? theme.colors.status.success
                : theme.colors.status.warning,
            }}
          >
            {resolved ? "Çözüldü" : "Bekliyor"}
          </Text>
          {resolvedAt && (
            <Text type="secondary" style={{ fontSize: 10, display: "block" }}>
              {new Date(resolvedAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "short",
              })}
            </Text>
          )}
        </MetaItem>

        <MetaItem
          id="assignee"
          icon={<User size={13} color={theme.colors.primary} />}
          label="Atanan"
        >
          <div style={ticketCardStyles.avatarGroup}>
            <UserAvatar
              size={20}
              user={{ name: assignee }}
              backgroundColor={avatarInfo.color}
              avatarUrl={avatarInfo.avatarUrl}
            />
            <Text style={ticketCardStyles.avatarName}>{assignee}</Text>
          </div>
        </MetaItem>

        <MetaItem
          id="date"
          icon={<Calendar size={13} color={theme.colors.text.secondary} />}
          label="Atanma"
        >
          <Text style={ticketCardStyles.metaValue}>
            {new Date(assignedDate).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "short",
            })}
          </Text>
        </MetaItem>
      </div>
    </SectionCard>
  );
};
