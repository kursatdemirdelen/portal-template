import React from "react";
import { Typography } from "antd";
import { MessageSquare } from "lucide-react";
import { theme } from "@/shared/styles/styleConstants";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import { CommentItem } from "./CommentItem";
import type { TicketComment } from "../../model/types";

const { Text } = Typography;

interface CommentListProps {
  comments: TicketComment[];
  onReply?: (commentId: string) => void;
}

/**
 * Yorum listesi - boş state ile birlikte
 */
export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
}) => {
  if (comments.length === 0) {
    return (
      <div style={ticketDetailStyles.emptyState}>
        <div style={ticketDetailStyles.emptyStateIcon}>
          <MessageSquare size={28} color={theme.colors.text.muted} />
        </div>
        <Text style={ticketDetailStyles.emptyStateText}>
          Henüz yorum yok. İlk yorumu yazın.
        </Text>
      </div>
    );
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
};

export default CommentList;
