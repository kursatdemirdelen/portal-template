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
import {
  backgrounds,
  borderColors,
  colors,
  hexToRgba,
  shadows,
} from "@/shared/styles";
import type { DashboardUserRole } from "@/shared/types";

// Re-export type for backward compatibility
export type { DashboardUserRole as UserRole } from "@/shared/types";

interface QuickAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface QuickActionsProps {
  role?: DashboardUserRole;
  variant?: "horizontal" | "vertical" | "compact";
}

// Role bazlı aksiyonlar - Sidebar'da olmayan veya hızlı erişimi önemli özellikler
const ROLE_ACTIONS: Record<DashboardUserRole, QuickAction[]> = {
  admin: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colors.primary,
    },
    {
      key: "permissions",
      label: "Yetkilendirme",
      icon: <SafetyCertificateOutlined />,
      path: "/permissions",
      color: colors.accent,
    },
    {
      key: "scrum",
      label: "Scrum Board",
      icon: <ProjectOutlined />,
      path: "/scrum-board",
      color: colors.info,
    },
    {
      key: "settings",
      label: "Ayarlar",
      icon: <SettingOutlined />,
      path: "/parameters",
      color: colors.warning,
    },
  ],
  manager: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colors.primary,
    },
    {
      key: "approvals",
      label: "Bekleyen Onaylar",
      icon: <CheckCircleOutlined />,
      path: "/approvals",
      color: colors.success,
    },
    {
      key: "assignments",
      label: "Zimmet",
      icon: <InboxOutlined />,
      path: "/assignments",
      color: colors.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colors.accent,
    },
  ],
  developer: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colors.primary,
    },
    {
      key: "time-entry",
      label: "Puantaj",
      icon: <ClockCircleOutlined />,
      path: "/time-tracking",
      color: colors.warning,
    },
    {
      key: "assignments",
      label: "Zimmet",
      icon: <InboxOutlined />,
      path: "/assignments",
      color: colors.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colors.accent,
    },
  ],
  user: [
    {
      key: "new-ticket",
      label: "Yeni Bilet",
      icon: <PlusCircleOutlined />,
      path: "/tickets/create",
      color: colors.primary,
    },
    {
      key: "scrum",
      label: "Scrum Board",
      icon: <ProjectOutlined />,
      path: "/scrum-board",
      color: colors.info,
    },
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
      path: "/profile",
      color: colors.accent,
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
                    ? `linear-gradient(135deg, ${hexToRgba(
                        action.color,
                        0.18
                      )} 0%, ${hexToRgba(action.color, 0.08)} 100%)`
                    : backgrounds.hover,
                  border: `1px solid ${
                    isHovered
                      ? hexToRgba(action.color, 0.35)
                      : borderColors.light
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
                ? `linear-gradient(135deg, ${hexToRgba(
                    action.color,
                    0.15
                  )} 0%, ${hexToRgba(action.color, 0.06)} 100%)`
                : backgrounds.hover,
              border: `1px solid ${
                isHovered ? hexToRgba(action.color, 0.3) : borderColors.light
              }`,
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 200ms ease",
              flex: isVertical ? undefined : 1,
              minWidth: isVertical ? undefined : 80,
              transform: isHovered ? "translateY(-2px)" : "none",
              boxShadow: isHovered ? shadows.cardHover(action.color) : "none",
            }}
          >
            <div
              style={{
                width: isVertical ? 32 : 36,
                height: isVertical ? 32 : 36,
                borderRadius: 10,
                background: isHovered
                  ? `linear-gradient(135deg, ${action.color} 0%, ${hexToRgba(
                      action.color,
                      0.8
                    )} 100%)`
                  : hexToRgba(action.color, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 200ms ease",
              }}
            >
              <span
                style={{
                  fontSize: isVertical ? 16 : 18,
                  color: isHovered ? backgrounds.card : action.color,
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
                color: isHovered ? action.color : colors.textSecondary,
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
