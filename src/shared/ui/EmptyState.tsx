import React from "react";
import { Empty, Button } from "antd";
import { spacing, colors } from "@/shared/styles";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  image?: React.ReactNode;
  imageHeight?: number;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Kayıt bulunamadı",
  description = "Filtreleri temizleyin veya yeni bir kayıt oluşturun.",
  actionText,
  onAction,
  actionDisabled = false,
  image = Empty.PRESENTED_IMAGE_SIMPLE,
  imageHeight = 60,
  compact = false,
}) => {
  return (
    <div style={{ padding: compact ? spacing.lg : spacing["2xl"] }}>
      <Empty
        image={image}
        styles={{ image: { height: imageHeight } }}
        description={
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: spacing.xs,
              }}
            >
              {description}
            </div>
          </div>
        }
      >
        {actionText && (
          <Button type="primary" onClick={onAction} disabled={actionDisabled}>
            {actionText}
          </Button>
        )}
      </Empty>
    </div>
  );
};
