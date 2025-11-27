import React from "react";
import { Typography, Tag } from "antd";
import { UserAvatar, SectionCard } from "@/shared/ui";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import { getAvatarByName } from "@/shared/data/mockData";

const { Text } = Typography;

interface TicketDescriptionProps {
  description: string;
  createdBy: string;
  createdAt: string;
  requestType: string;
  closedDate?: string;
}

export const TicketDescription: React.FC<TicketDescriptionProps> = ({
  description,
  createdBy,
  createdAt,
  requestType,
  closedDate,
}) => {
  const avatarInfo = getAvatarByName(createdBy);
  return (
    <SectionCard title="Bilet">
      {/* Header */}
      <div style={ticketDetailStyles.descriptionHeader}>
        <div style={ticketDetailStyles.descriptionAvatar}>
          <UserAvatar
            size={40}
            user={{ name: createdBy }}
            backgroundColor={avatarInfo.color}
            avatarUrl={avatarInfo.avatarUrl}
          />
        </div>
        <div style={ticketDetailStyles.descriptionInfo}>
          <Text style={ticketDetailStyles.descriptionName}>{createdBy}</Text>
          <Text style={ticketDetailStyles.descriptionDate}>
            Oluşturulma: {new Date(createdAt).toLocaleDateString("tr-TR")}
          </Text>
          {closedDate && (
            <Text style={ticketDetailStyles.descriptionDate}>
              Kapanma: {new Date(closedDate).toLocaleDateString("tr-TR")}
            </Text>
          )}
        </div>
        <Tag color="red" style={ticketDetailStyles.descriptionTag}>
          {requestType}
        </Tag>
      </div>

      {/* Description */}
      <div style={ticketDetailStyles.descriptionContent}>{description}</div>
    </SectionCard>
  );
};

export default TicketDescription;
