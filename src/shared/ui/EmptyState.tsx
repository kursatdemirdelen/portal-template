import React from "react";
import { Empty, Button } from "antd";
import { spacing, colors } from "@/shared/styles";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Kayıt bulunamadı",
  description = "Filtreleri temizleyin veya yeni bir kayıt oluşturun.",
  actionText,
  onAction,
}) => {
  return (
    <div style={{ padding: spacing["2xl"] }}>
      <Empty
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
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </Empty>
    </div>
  );
};
