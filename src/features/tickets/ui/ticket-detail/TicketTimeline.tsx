import React, { useState } from "react";
import { Typography } from "antd";
import { UserAvatar, SectionCard } from "@/shared/ui";
import { theme } from "@/shared/styles";
import { ticketCardStyles } from "../shared/ticketCardStyles";
import type { TicketHistoryItem } from "../../model/types";
import { getAvatarByName } from "@/shared/data/mocks";

const { Text } = Typography;

interface TicketTimelineProps {
  history: TicketHistoryItem[];
}

export const TicketTimeline: React.FC<TicketTimelineProps> = ({ history }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <SectionCard title="Geçmiş">
      <div style={ticketCardStyles.timelineContainer}>
        <div style={ticketCardStyles.timelineLine} />

        {history.map((item, index) => (
          <div
            key={item.id}
            style={{
              ...ticketCardStyles.timelineItem,
              paddingBottom: index === history.length - 1 ? 0 : 0,
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={ticketCardStyles.timelineAvatar}>
              {(() => {
                const avatarInfo = getAvatarByName(item.user);
                return (
                  <UserAvatar
                    size={28}
                    user={{ name: item.user }}
                    backgroundColor={avatarInfo.color}
                    avatarUrl={avatarInfo.avatarUrl}
                  />
                );
              })()}
            </div>

            <div
              style={{
                ...ticketCardStyles.timelineContent,
                ...(hoveredId === item.id &&
                  ticketCardStyles.timelineContentHover),
              }}
            >
              <div style={ticketCardStyles.timelineHeader}>
                <Text style={ticketCardStyles.timelineUser}>{item.user}</Text>
                <Text style={ticketCardStyles.timelineAction}>
                  {item.action}
                </Text>
              </div>

              {item.field && (
                <div style={ticketCardStyles.timelineChangeBadge}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: theme.colors.text.muted,
                      textDecoration: "line-through",
                    }}
                  >
                    {item.oldValue}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    →
                  </Text>
                  <Text
                    strong
                    style={{
                      fontSize: 11,
                      color: theme.colors.primary,
                    }}
                  >
                    {item.newValue}
                  </Text>
                </div>
              )}

              <Text type="secondary" style={ticketCardStyles.timelineDate}>
                {new Date(item.timestamp).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default TicketTimeline;
