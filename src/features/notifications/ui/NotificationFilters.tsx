import React from "react";
import { Button, Segmented } from "antd";
import { notificationStyles } from "./notificationStyles";

type NotificationFilter = "all" | "unread" | "success" | "warning" | "error";

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  onClearAll?: () => void;
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onClearAll,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        marginBottom: 16,
        borderBottom: "1px solid #e2e8f0",
        gap: 12,
      }}
    >
      <Segmented
        value={activeFilter}
        onChange={(value) => onFilterChange(value as NotificationFilter)}
        options={[
          { label: "Tümü", value: "all" },
          { label: "Okunmamış", value: "unread" },
          { label: "Başarı", value: "success" },
          { label: "Uyarı", value: "warning" },
          { label: "Hata", value: "error" },
        ]}
        size="small"
      />
      {onClearAll && (
        <Button type="text" danger size="small" onClick={onClearAll}>
          Tümünü Sil
        </Button>
      )}
    </div>
  );
};
