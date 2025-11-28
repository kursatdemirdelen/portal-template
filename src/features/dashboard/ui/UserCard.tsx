/**
 * UserCard - Premium Profil Kartı
 */

import React, { memo, type CSSProperties } from "react";
import { Typography, theme, Tooltip } from "antd";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import {
  backgrounds,
  colors as colorPalette,
  gradients,
  hexToRgba,
  shadows,
} from "@/shared/styles";
import type { DashboardUserInfo } from "@/shared/types";

const { Text } = Typography;

// Re-export type for backward compatibility
export type { DashboardUserInfo as UserInfo } from "@/shared/types";

interface UserCardProps {
  user: DashboardUserInfo;
  className?: string;
  style?: CSSProperties;
}

export const UserCard: React.FC<UserCardProps> = memo(
  ({ user, className, style }) => {
    const { token } = theme.useToken();
    const statusText = user.statusText ?? "Çevrimiçi";
    const statusColor = user.statusColor ?? colorPalette.success;

    return (
      <div
        className={className}
        style={{
          background: token.colorBgContainer,
          borderRadius: 16,
          overflow: "hidden",
          ...style,
        }}
      >
        {/* Gradient Banner */}
        <div
          style={{
            height: 96,
            background: gradients.sidebarLogo,
            position: "relative",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: hexToRgba(backgrounds.card, 0.1),
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: 20,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: hexToRgba(backgrounds.card, 0.08),
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "0 16px 20px", marginTop: -36 }}>
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div style={{ position: "relative" }}>
              <UserAvatar
                size={80}
                user={{ name: user.name, avatar: user.avatar }}
                avatarUrl={user.avatarUrl}
                style={{
                  border: `3px solid ${token.colorBgContainer}`,
                  boxShadow: shadows.hover,
                }}
              />
              <Tooltip title={statusText}>
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: statusColor,
                    border: `3px solid ${token.colorBgContainer}`,
                  }}
                />
              </Tooltip>
            </div>

            {/* Name & Info */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: colorPalette.textPrimary,
                marginTop: 10,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colorPalette.primary,
                fontWeight: 500,
              }}
            >
              {user.role}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colorPalette.textTertiary,
              }}
            >
              {user.department}
            </Text>
          </div>

          {/* Stats */}
          {user.stats && (
            <div
              style={{
                display: "flex",
                background: backgrounds.hover,
                borderRadius: 12,
                padding: "16px 8px",
                marginBottom: 24,
              }}
            >
              <StatItem
                value={user.stats.openTickets}
                label="Açık"
                color={colorPalette.warning}
              />
              <div
                style={{
                  width: 1,
                  background: hexToRgba(colorPalette.primary, 0.12),
                }}
              />
              <StatItem
                value={user.stats.todayClosed}
                label="Bugün"
                color={colorPalette.success}
              />
              <div
                style={{
                  width: 1,
                  background: hexToRgba(colorPalette.primary, 0.12),
                }}
              />
              <StatItem
                value={user.stats.activeProjects}
                label="Proje"
                color={colorPalette.primary}
              />
            </div>
          )}

          {/* Footer - Company & Email stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              paddingTop: 16,
              borderTop: `1px solid ${token.colorSplit}`,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: colorPalette.primary,
                fontWeight: 500,
              }}
            >
              {user.company}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colorPalette.textTertiary,
                fontWeight: 400,
              }}
            >
              {user.email}
            </Text>
          </div>
        </div>
      </div>
    );
  }
);

UserCard.displayName = "UserCard";

// Stat Item
const StatItem: React.FC<{
  value: number;
  label: string;
  color: string;
}> = ({ value, label, color }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: color,
        lineHeight: 1,
      }}
    >
      {value}
    </Text>
    <Text
      style={{
        fontSize: 10,
        color: colorPalette.textTertiary,
      }}
    >
      {label}
    </Text>
  </div>
);
