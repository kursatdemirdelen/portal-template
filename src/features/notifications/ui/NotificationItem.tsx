import React from "react";
import { Tag } from "antd";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Clock,
} from "lucide-react";
import { Notification } from "../model/types";
import { notificationStyles, getNotificationColor } from "./notificationStyles";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  const getIcon = (type: Notification["type"]) => {
    const iconProps = { size: 18, color: getNotificationColor(type) };
    switch (type) {
      case "success":
        return <CheckCircle2 {...iconProps} />;
      case "warning":
        return <AlertTriangle {...iconProps} />;
      case "error":
        return <XCircle {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Şu anda";
    if (diffMins < 60) return `${diffMins}d önce`;
    if (diffHours < 24) return `${diffHours}s önce`;
    if (diffDays < 7) return `${diffDays}g önce`;

    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      style={{
        ...notificationStyles.container,
        ...(notification.read ? {} : notificationStyles.containerUnread),
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, notificationStyles.containerHover);
      }}
      onMouseLeave={(e) => {
        if (!notification.read) {
          Object.assign(
            e.currentTarget.style,
            notificationStyles.containerUnread
          );
        } else {
          e.currentTarget.style.background = "transparent";
        }
      }}
      onClick={onClick}
    >
      {/* Icon */}
      <div style={notificationStyles.iconWrapper}>
        {getIcon(notification.type)}
      </div>

      {/* Content */}
      <div style={notificationStyles.content}>
        {/* Header: Title + Badge */}
        <div style={notificationStyles.header}>
          <h4
            style={{
              ...notificationStyles.title,
              ...(notification.read ? {} : notificationStyles.titleUnread),
            }}
          >
            {notification.title}
          </h4>
          {!notification.read && <Tag color="blue">Yeni</Tag>}
        </div>

        {/* Message */}
        <p style={notificationStyles.message}>{notification.message}</p>

        {/* Footer: Date */}
        <div style={notificationStyles.footer}>
          <Clock size={12} />
          <span>{formatDate(notification.date)}</span>
        </div>
      </div>
    </div>
  );
};
