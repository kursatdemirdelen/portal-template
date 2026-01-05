import React from "react";
import { Tag, Typography, Tooltip } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CrownOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { SectionCard, UserAvatar } from "@/shared/ui";
import { profileHeaderStyles as styles } from "@/shared/styles";

const { Text, Title } = Typography;

interface ProfileHeaderProps {
  name: string;
  title: string;
  avatar?: string;
  initials?: string;
  role: "admin" | "worker" | "user";
  department?: string;
  location?: string;
  timezone?: string;
}

const roleConfig = {
  admin: {
    label: "Yönetici",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    icon: <CrownOutlined />,
  },
  worker: {
    label: "Çalışan",
    color: "#5b7aed",
    bgColor: "rgba(91, 122, 237, 0.1)",
    icon: <IdcardOutlined />,
  },
  user: {
    label: "Kullanıcı",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    icon: <UserOutlined />,
  },
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  title,
  avatar,
  initials = "??",
  role,
  department,
  location,
  timezone,
}) => {
  const roleInfo = roleConfig[role];

  return (
    <SectionCard>
      <div style={styles.container}>
        {/* Sol Bölüm - Avatar ve Bilgiler */}
        <div style={styles.leftSection}>
          {/* Avatar */}
          <UserAvatar
            size={100}
            avatarUrl={avatar}
            initials={initials}
            style={{
              ...styles.avatar,
              background: avatar ? "transparent" : styles.avatar.background,
            }}
          />

          {/* Bilgiler */}
          <div style={styles.info}>
            <Title level={3} style={styles.name}>
              {name}
            </Title>
            <Text style={styles.title}>{title}</Text>

            {/* Badge'ler */}
            <div style={styles.badges}>
              {/* Rol Badge */}
              <Tag
                icon={roleInfo.icon}
                style={{
                  ...styles.roleBadge,
                  color: roleInfo.color,
                  background: roleInfo.bgColor,
                  border: `1px solid ${roleInfo.color}`,
                }}
              >
                {roleInfo.label}
              </Tag>

              {/* Departman */}
              {department && (
                <Tooltip title="Departman">
                  <Tag
                    icon={<TeamOutlined />}
                    style={{
                      ...styles.roleBadge,
                      color: "#3b82f6",
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    {department}
                  </Tag>
                </Tooltip>
              )}

              {/* Lokasyon */}
              {location && (
                <Tooltip title="Konum">
                  <Tag
                    icon={<EnvironmentOutlined />}
                    style={{
                      ...styles.roleBadge,
                      color: "#10b981",
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    {location}
                  </Tag>
                </Tooltip>
              )}

              {/* Zaman Dilimi */}
              {timezone && (
                <Tooltip title="Zaman Dilimi">
                  <Tag
                    icon={<ClockCircleOutlined />}
                    style={{
                      ...styles.roleBadge,
                      color: "#f59e0b",
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    {timezone}
                  </Tag>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
