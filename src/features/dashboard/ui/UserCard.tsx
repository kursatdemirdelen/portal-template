import React, { memo, type CSSProperties } from "react";
import { Typography, Tag, theme, Tooltip, Button } from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserAvatar } from "@/shared/ui/UserAvatar";

const { Text } = Typography;

export interface UserInfo {
  name: string;
  role: string;
  department: string;
  email: string;
  lastLogin: string;
  avatar: string;
  company: string;
  stats?: {
    openTickets: number;
    todayClosed: number;
    activeProjects: number;
  };
  statusText?: string; // örn: "Aktif", "Ofiste", "Uzaktan"
  statusColor?: string; // örn: "#22c55e"
}

interface UserCardProps {
  user: UserInfo;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

/* --- base styles --- */

const containerBaseStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

const headerStyle: CSSProperties = {
  height: 96,
  borderRadius: 14,
  position: "relative",
  overflow: "hidden",
};

const headerOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at top, rgba(255,255,255,0.35), transparent 55%)",
};

const avatarWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: -56,
};

const nameTextStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
};

const roleDeptTextStyle: CSSProperties = {
  fontSize: 13,
};

const companyTagStyle: CSSProperties = {
  marginTop: 16,
  borderRadius: 999,
  padding: "2px 14px",
};

const infoBoxStyle: CSSProperties = {
  borderRadius: 10,
  padding: 12,
  marginTop: 14,
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const infoRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
};

const statsChipBaseStyle: CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  cursor: "default",
  transition: "background 0.2s ease, transform 0.15s ease",
};

const actionsRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 8,
  marginTop: 10,
};

/* --- component --- */

export const UserCard: React.FC<UserCardProps> = memo(
  ({
    user,
    compact = false,
    className,
    style,
    onProfileClick,
    onLogoutClick,
  }) => {
    const { token } = theme.useToken();

    const gap = compact ? 16 : 22;
    const avatarSize = compact ? 72 : 86;

    const containerStyle: CSSProperties = {
      ...containerBaseStyle,
      gap,
      ...style,
    };

    const avatarStyle: CSSProperties = {
      border: `3px solid ${token.colorBgContainer}`,
      boxShadow: token.boxShadowSecondary,
      fontWeight: 600,
      fontSize: compact ? 18 : 22,
      background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)`,
    };

    const headerGradient =
      "linear-gradient(135deg, #f472b6 0%, #5b7aed 55%, #38bdf8 100%)";

    const statusPill =
      user.statusText || (user.stats?.openTickets ?? 0) > 0
        ? user.statusText ?? "Aktif"
        : undefined;

    const statusColor = user.statusColor ?? "#22c55e";

    return (
      <div style={containerStyle} className={className}>
        {/* Üst renkli header + durum pill'i */}
        <div style={{ ...headerStyle, background: headerGradient }}>
          <div style={headerOverlayStyle} />
          {statusPill && (
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(15,23,42,0.45)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: statusColor,
                  boxShadow: `0 0 0 4px ${statusColor}20`,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#e5e7eb",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {statusPill}
              </span>
            </div>
          )}
        </div>

        {/* Avatar + isim + şirket + mini istatistikler */}
        <div style={avatarWrapperStyle}>
          <UserAvatar
            size={avatarSize}
            user={{
              name: user.name,
              avatar: user.avatar,
            }}
            style={avatarStyle}
          />

          <div style={{ marginTop: compact ? 12 : 16 }}>
            <Text
              style={{
                ...nameTextStyle,
                color: token.colorTextHeading,
              }}
            >
              {user.name}
            </Text>
            <div
              style={{
                ...roleDeptTextStyle,
                color: token.colorTextSecondary,
              }}
            >
              {user.role} · {user.department}
            </div>
          </div>

          <Tag
            color="#eef2ff"
            style={{
              ...companyTagStyle,
              color: "#4338ca",
              border: "none",
              boxShadow: "0 1px 3px rgba(15,23,42,0.12)",
            }}
          >
            {user.company}
          </Tag>

          {user.stats && (
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                width: "100%",
              }}
            >
              {[
                { label: "Açık", value: user.stats.openTickets },
                { label: "Bugün", value: user.stats.todayClosed },
                { label: "Projeler", value: user.stats.activeProjects },
              ].map((stat) => (
                <Tooltip key={stat.label} title={`${stat.label} bilet / proje`}>
                  <div
                    style={{
                      ...statsChipBaseStyle,
                      background: token.colorFillQuaternary,
                      boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: token.colorTextHeading,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: token.colorTextSecondary,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </Tooltip>
              ))}
            </div>
          )}
        </div>

        {/* Alt bilgi kutusu */}
        <div
          style={{
            ...infoBoxStyle,
            border: `1px dashed ${token.colorSplit}`,
            background: token.colorFillQuaternary,
          }}
        >
          {/* mailto link */}
          <a href={`mailto:${user.email}`} style={{ textDecoration: "none" }}>
            <Text
              style={{
                ...infoRowStyle,
                color: token.colorTextSecondary,
                wordBreak: "break-all",
              }}
            >
              <MailOutlined /> {user.email}
            </Text>
          </a>

          {/* last login */}
          <Text
            style={{
              ...infoRowStyle,
              color: token.colorTextSecondary,
            }}
          >
            <EnvironmentOutlined /> Son Giriş:{" "}
            <time dateTime={user.lastLogin}>{user.lastLogin}</time>
          </Text>
        </div>

        {/* Opsiyonel aksiyonlar */}
        {(onProfileClick || onLogoutClick) && (
          <div style={actionsRowStyle}>
            {onProfileClick && (
              <Button
                size="small"
                icon={<UserOutlined />}
                onClick={onProfileClick}
              >
                Profil
              </Button>
            )}
            {onLogoutClick && (
              <Button
                size="small"
                icon={<LogoutOutlined />}
                type="text"
                danger
                onClick={onLogoutClick}
              >
                Çıkış
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

UserCard.displayName = "UserCard";
