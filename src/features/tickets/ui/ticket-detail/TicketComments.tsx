import React, { useState } from "react";
import { Typography } from "antd";
import { SectionCard } from "@/shared/ui";
import { theme } from "@/shared/styles/styleConstants";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import type { TicketComment } from "../../model/types";

const { Text } = Typography;

interface TicketCommentsProps {
  comments: TicketComment[];
  onAddComment?: (content: string) => void;
  onAddReply?: (parentId: string, content: string) => void;
}

/**
 * Ticket yorumları bölümü
 * Yorum listesi ve form komponentlerini bir araya getirir
 */
export const TicketComments: React.FC<TicketCommentsProps> = ({
  comments,
  onAddComment,
  onAddReply,
}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
  };

  const handleSubmitReply = (content: string) => {
    if (replyingTo && onAddReply) {
      onAddReply(replyingTo, content);
      setReplyingTo(null);
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <SectionCard
      title="Yorumlar"
      extra={
        <Text
          type="secondary"
          style={{ fontSize: theme.typography.fontSize.xs }}
        >
          Toplam {comments.length}
        </Text>
      }
    >
      <CommentList comments={comments} onReply={handleReply} />

      {replyingTo ? (
        <CommentForm
          onSubmit={handleSubmitReply}
          placeholder="Yanıtınızı yazın..."
          buttonText="Yanıtla"
          replyingTo={replyingTo}
          onCancelReply={handleCancelReply}
        />
      ) : (
        <CommentForm
          onSubmit={(content) => onAddComment?.(content)}
          placeholder="Yorum yazın..."
          buttonText="Yorum Ekle"
        />
      )}
    </SectionCard>
  );
};

export default TicketComments;
