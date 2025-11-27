import React, { useState } from "react";
import { Input, Button, Typography } from "antd";
import { Send } from "lucide-react";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import { VALIDATION_LIMITS } from "../../model/constants";

const { TextArea } = Input;
const { Text } = Typography;

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  replyingTo?: string | null;
  onCancelReply?: () => void;
}

/**
 * Yorum gönderme formu
 * Hem yeni yorum hem de reply için kullanılabilir
 */
export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  placeholder = "Yorum yazın...",
  buttonText = "Gönder",
  replyingTo,
  onCancelReply,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmedContent = content.trim();
    if (
      trimmedContent &&
      trimmedContent.length >= VALIDATION_LIMITS.COMMENT_MIN_LENGTH &&
      trimmedContent.length <= VALIDATION_LIMITS.COMMENT_MAX_LENGTH
    ) {
      onSubmit(trimmedContent);
      setContent("");
    }
  };

  const remainingChars = VALIDATION_LIMITS.COMMENT_MAX_LENGTH - content.length;
  const isValid =
    content.trim().length >= VALIDATION_LIMITS.COMMENT_MIN_LENGTH &&
    content.length <= VALIDATION_LIMITS.COMMENT_MAX_LENGTH;

  return (
    <div style={ticketDetailStyles.commentForm}>
      {replyingTo && (
        <div style={ticketDetailStyles.commentFormReplyBanner}>
          <Text style={ticketDetailStyles.commentFormReplyText}>
            💬 Yanıt veriyorsunuz
          </Text>
          <Button type="text" size="small" onClick={onCancelReply}>
            İptal
          </Button>
        </div>
      )}
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={VALIDATION_LIMITS.COMMENT_MAX_LENGTH}
        style={{ marginBottom: 8 }}
      />
      <div style={ticketDetailStyles.commentFormActions}>
        <Text
          style={
            remainingChars < 50
              ? ticketDetailStyles.commentFormCounterWarning
              : ticketDetailStyles.commentFormCounter
          }
        >
          {remainingChars} karakter kaldı
        </Text>
        <Button
          type="primary"
          size="small"
          disabled={!isValid}
          icon={<Send size={14} />}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
