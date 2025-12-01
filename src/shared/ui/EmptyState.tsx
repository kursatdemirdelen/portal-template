import React from "react";
import { Empty, Button } from "antd";

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
    <div style={{ padding: 24 }}>
      <Empty
        description={
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div style={{ fontSize: 12, color: "#7f8c8d", marginTop: 6 }}>
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
