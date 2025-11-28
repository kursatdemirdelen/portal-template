import React from "react";
import { Button, Empty } from "antd";
import { CheckCheck } from "lucide-react";
import { colors as colorPalette, borderColors } from "@/shared/styles";
import { Notification } from "../model/types";
import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onItemClick: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onItemClick,
  onMarkAllRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (notifications.length === 0) {
    return (
      <Empty description="Bildirim bulunmuyor" style={{ marginTop: 48 }} />
    );
  }

  return (
    <div>
      {/* Header with action button */}
      {unreadCount > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 12,
            marginBottom: 16,
            borderBottom: `1px solid ${borderColors.neutral}`,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colorPalette.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {unreadCount} Okunmamış
          </span>
          <Button
            type="text"
            size="small"
            icon={<CheckCheck size={14} />}
            onClick={onMarkAllRead}
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            Tümünü Okundu İşaretle
          </Button>
        </div>
      )}

      {/* Notification items */}
      <div>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => onItemClick(notification)}
          />
        ))}
      </div>
    </div>
  );
};
