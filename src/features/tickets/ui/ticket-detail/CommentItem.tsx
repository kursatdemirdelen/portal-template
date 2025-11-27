import React, { useState } from "react";
import { Typography, Button } from "antd";
import { MessageSquare } from "lucide-react";
import { UserAvatar } from "@/shared/ui";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import type { TicketComment } from "../../model/types";
import { getAvatarByName } from "@/shared/data/mockData";

const { Text } = Typography;

interface CommentItemProps {
  comment: TicketComment;
  onReply?: (commentId: string) => void;
}

/**
 * Tek bir yorum öğesi
 * Hover state ve reply butonu ile
 */
export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const avatarInfo = getAvatarByName(comment.author);

  return (
    <div
      style={{
        ...ticketDetailStyles.commentItem,
        ...(isHovered && ticketDetailStyles.commentItemHover),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={ticketDetailStyles.commentHeader}>
        <div style={ticketDetailStyles.commentAvatar}>
          <UserAvatar
            size={32}
            user={{ name: comment.author }}
            backgroundColor={avatarInfo.color}
            avatarUrl={avatarInfo.avatarUrl}
          />
        </div>
        <div style={ticketDetailStyles.commentAuthorInfo}>
          <Text style={ticketDetailStyles.commentAuthor}>{comment.author}</Text>
          <Text style={ticketDetailStyles.commentDate}>
            {new Date(comment.createdAt).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>
      </div>

      <Text style={ticketDetailStyles.commentContent}>{comment.content}</Text>

      {onReply && (
        <div style={ticketDetailStyles.commentFooter}>
          <Button
            type="text"
            size="small"
            icon={<MessageSquare size={12} />}
            onClick={() => onReply(comment.id)}
            style={ticketDetailStyles.commentReplyButton}
          >
            Yanıtla
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
