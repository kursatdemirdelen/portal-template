import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { mockNotifications } from "../model/mockData";
import { Notification } from "../model/types";
import { NotificationList, NotificationFilters } from "../ui";

type NotificationFilter = "all" | "unread" | "success" | "warning" | "error";

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<NotificationFilter>("all");

  // Filter notifications based on selected filter
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (filter === "all") return true;
      if (filter === "unread") return !n.read;
      return n.type === filter;
    });
  }, [notifications, filter]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleItemClick = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    // Navigate if link exists
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <PageContainer title="Bildirimler">
      <SectionCard title="Tüm Bildirimler" variant="default">
        <NotificationFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          onClearAll={handleClearAll}
        />

        <NotificationList
          notifications={filteredNotifications}
          onItemClick={handleItemClick}
          onMarkAllRead={handleMarkAllRead}
        />
      </SectionCard>
    </PageContainer>
  );
};
