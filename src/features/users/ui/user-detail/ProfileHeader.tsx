import React from "react";
import { Avatar, Badge, Tag, Space, Typography } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { User } from "../../model";
import { ROLE_LABELS, ROLE_COLORS, STATUS_LABELS } from "../shared/constants";
import { profileHeaderStyles } from "../shared/userDetailStyles";

const { Title } = Typography;

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const roleColor = ROLE_COLORS[user.role];

  return (
    <div style={profileHeaderStyles.gradientBackground(roleColor)}>
      {/* Decorative circles */}
      <div style={profileHeaderStyles.decorativeCircleLarge} />
      <div style={profileHeaderStyles.decorativeCircleSmall} />

      {/* Content */}
      <div style={profileHeaderStyles.content}>
        {/* Avatar with online badge */}
        <Badge
          dot
          status={user.status === "active" ? "success" : "default"}
          offset={[-8, 90]}
          style={profileHeaderStyles.badgeDot}
        >
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={user.avatar}
            style={{
              ...profileHeaderStyles.avatar,
              ...(user.avatar
                ? profileHeaderStyles.avatarWithImage
                : profileHeaderStyles.avatarWithoutImage),
            }}
          />
        </Badge>

        {/* Name & Role */}
        <Title level={4} style={profileHeaderStyles.title}>
          {user.name}
        </Title>

        <Space size="small" wrap style={profileHeaderStyles.tagContainer}>
          <Tag
            style={{
              ...profileHeaderStyles.tag,
              ...profileHeaderStyles.roleTag,
            }}
          >
            <IdcardOutlined /> {ROLE_LABELS[user.role]}
          </Tag>
          <Tag
            style={{
              ...profileHeaderStyles.tag,
              ...(user.status === "active"
                ? profileHeaderStyles.statusTagActive
                : profileHeaderStyles.statusTagInactive),
            }}
          >
            <CheckCircleOutlined /> {STATUS_LABELS[user.status]}
          </Tag>
        </Space>
      </div>
    </div>
  );
};
