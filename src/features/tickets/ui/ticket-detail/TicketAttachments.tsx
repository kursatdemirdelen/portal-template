import React, { useState } from "react";
import { Typography, Button, Tooltip } from "antd";
import {
  Download,
  Eye,
  FileText,
  FileImage,
  File,
  FolderX,
} from "lucide-react";
import type { TicketAttachment } from "../../model/types";
import { SectionCard } from "@/shared/ui";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import { theme } from "@/shared/styles/styleConstants";

const { Text } = Typography;

interface TicketAttachmentsProps {
  attachments: TicketAttachment[];
}

export const TicketAttachments: React.FC<TicketAttachmentsProps> = ({
  attachments,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isImage = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext || "");
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext || "")) {
      return <FileImage size={20} color={theme.colors.status.success} />;
    }
    if (["txt", "doc", "docx", "pdf"].includes(ext || "")) {
      return <FileText size={20} color={theme.colors.status.info} />;
    }
    return <File size={20} color={theme.colors.text.muted} />;
  };

  if (attachments.length === 0) {
    return (
      <SectionCard title="Ekler">
        <div style={ticketDetailStyles.emptyState}>
          <div style={ticketDetailStyles.emptyStateIcon}>
            <FolderX size={28} color={theme.colors.text.muted} />
          </div>
          <Text style={ticketDetailStyles.emptyStateText}>
            Henüz ek dosya yok
          </Text>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Ekler">
      <div>
        {attachments.map((item) => (
          <div
            key={item.id}
            style={{
              ...ticketDetailStyles.attachmentItem,
              ...(hoveredId === item.id &&
                ticketDetailStyles.attachmentItemHover),
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={ticketDetailStyles.attachmentIconBox}>
              {getFileIcon(item.name)}
            </div>
            <div style={ticketDetailStyles.attachmentInfo}>
              <Text style={ticketDetailStyles.attachmentName}>{item.name}</Text>
              <Text style={ticketDetailStyles.attachmentSize}>{item.size}</Text>
            </div>
            <div style={ticketDetailStyles.attachmentActions}>
              {isImage(item.name) && (
                <Tooltip title="Görüntüle">
                  <Button
                    type="text"
                    size="small"
                    icon={<Eye size={14} />}
                    onClick={() => window.open(item.url, "_blank")}
                  />
                </Tooltip>
              )}
              <Tooltip title="İndir">
                <Button
                  type="text"
                  size="small"
                  icon={<Download size={14} />}
                  onClick={() => window.open(item.url, "_blank")}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
