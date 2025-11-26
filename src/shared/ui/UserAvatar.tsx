import React from "react";
import { Avatar as AntAvatar, AvatarProps } from "antd";

interface UserAvatarProps extends AvatarProps {
  initials?: string;
  backgroundColor?: string;
  user?: {
    name?: string;
    avatar?: string;
  };
}

/**
 * Centralized User Avatar Component
 * Consistent avatar styling across the application
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  initials,
  backgroundColor = "#334155",
  user,
  size = 32,
  ...props
}) => {
  const getInitials = () => {
    if (initials) return initials;
    if (user?.name) {
      const parts = user.name.trim().split(" ");
      if (parts.length >= 2) {
        // First letter of first name + first letter of last name
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <AntAvatar
      size={size}
      src={user?.avatar}
      style={{
        background: user?.avatar ? "transparent" : backgroundColor,
        color: "#fff",
        flexShrink: 0,
        fontSize: typeof size === "number" ? size / 2 : 14,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {getInitials()}
    </AntAvatar>
  );
};

export default UserAvatar;
