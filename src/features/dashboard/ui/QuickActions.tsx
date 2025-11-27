/**
 * Quick Actions - Role-based hızlı erişim butonları
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import {
  PlusCircleOutlined,
  UserOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  InboxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { colorPalette } from "@/shared/styles/styleConstants";

export type UserRole = "admin" | "manager" | "developer" | "user";

interface QuickAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface QuickActionsProps {
  role?: UserRole;
  variant?: "horizontal" | "vertical" | "compact";
}

// Role bazlı aksiyonlar - Sidebar'da olmayan veya hızlı erişimi önemli özellikler
const ROLE_ACTIONS: Record<UserRole, QuickAction[]> = {
  admin: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colorPalette.primary,
    },
    {
      key: "permissions",
      label: "Yetkilendirme",
      icon: <SafetyCertificateOutlined />,
      path: "/permissions",
      color: colorPalette.accent,
    },
    {
      key: "scrum",
      label: "Scrum Board",
      icon: <ProjectOutlined />,
      path: "/scrum-board",
      color: colorPalette.info,
    },
    {
      key: "settings",
      label: "Ayarlar",
      icon: <SettingOutlined />,
      path: "/parameters",
      color: colorPalette.warning,
    },
  ],
  manager: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colorPalette.primary,
    },
    {
      key: "approvals",
      label: "Bekleyen Onaylar",
      icon: <CheckCircleOutlined />,
      path: "/approvals",
      color: colorPalette.success,
    },
    {
      key: "assignments",
      label: "Zimmet",
      icon: <InboxOutlined />,
      path: "/assignments",
      color: colorPalette.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colorPalette.accent,
    },
  ],
  developer: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colorPalette.primary,
    },
    {
      key: "time-entry",
      label: "Puantaj",
      icon: <ClockCircleOutlined />,
      path: "/time-tracking",
      color: colorPalette.warning,
    },
    {
      key: "assignments",
      label: "Zimmet",
      icon: <InboxOutlined />,
      path: "/assignments",
      color: colorPalette.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colorPalette.accent,
    },
  ],
  user: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colorPalette.primary,
    },
    {
      key: "scrum",
      label: "Scrum Board",
      icon: <ProjectOutlined />,
      path: "/scrum-board",
      color: colorPalette.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colorPalette.accent,
    },
  ],
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  role = "developer",
  variant = "horizontal",
}) => {
  const navigate = useNavigate();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const actions = ROLE_ACTIONS[role] || ROLE_ACTIONS.user;
  const isVertical = variant === "vertical";
  const isCompact = variant === "compact";

  // Compact variant - sadece ikonlar, grid layout
  if (isCompact) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${actions.length}, 1fr)`,
          gap: 8,
        }}
      >
        {actions.map((action) => {
          const isHovered = hoveredKey === action.key;

          return (
            <Tooltip key={action.key} title={action.label} placement="top">
              <div
                onClick={() => navigate(action.path)}
                onMouseEnter={() => setHoveredKey(action.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  background: isHovered
                    ? `linear-gradient(135deg, ${action.color}20 0%, ${action.color}10 100%)`
                    : colorPalette.primaryLighter,
                  border: `1px solid ${
                    isHovered ? action.color + "40" : "transparent"
                  }`,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: action.color,
                    display: "flex",
                  }}
                >
                  {action.icon}
                </span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        gap: 8,
        flexWrap: isVertical ? undefined : "wrap",
      }}
    >
      {actions.map((action) => {
        const isHovered = hoveredKey === action.key;

        return (
          <div
            key={action.key}
            onClick={() => navigate(action.path)}
            onMouseEnter={() => setHoveredKey(action.key)}
            onMouseLeave={() => setHoveredKey(null)}
            style={{
              display: "flex",
              flexDirection: isVertical ? "row" : "column",
              alignItems: "center",
              justifyContent: "center",
              gap: isVertical ? 10 : 6,
              padding: isVertical ? "10px 16px" : "12px 8px",
              background: isHovered
                ? `linear-gradient(135deg, ${action.color}15 0%, ${action.color}08 100%)`
                : colorPalette.primaryLighter,
              border: `1px solid ${
                isHovered ? action.color + "30" : "transparent"
              }`,
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 200ms ease",
              flex: isVertical ? undefined : 1,
              minWidth: isVertical ? undefined : 80,
              transform: isHovered ? "translateY(-2px)" : "none",
              boxShadow: isHovered ? `0 4px 12px ${action.color}20` : "none",
            }}
          >
            <div
              style={{
                width: isVertical ? 32 : 36,
                height: isVertical ? 32 : 36,
                borderRadius: 10,
                background: isHovered
                  ? `linear-gradient(135deg, ${action.color} 0%, ${action.color}cc 100%)`
                  : `${action.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 200ms ease",
              }}
            >
              <span
                style={{
                  fontSize: isVertical ? 16 : 18,
                  color: isHovered ? "#fff" : action.color,
                  display: "flex",
                  transition: "all 200ms ease",
                }}
              >
                {action.icon}
              </span>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: isHovered ? action.color : colorPalette.textSecondary,
                whiteSpace: "nowrap",
                transition: "all 200ms ease",
              }}
            >
              {action.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
