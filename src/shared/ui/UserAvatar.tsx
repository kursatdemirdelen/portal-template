import React from "react";
import { Avatar as AntAvatar, AvatarProps } from "antd";
import { avatarColors, backgrounds } from "@/shared/styles";

interface UserAvatarProps extends AvatarProps {
  initials?: string;
  backgroundColor?: string;
  avatarUrl?: string;
  user?: {
    name?: string;
    avatar?: string;
    avatarUrl?: string;
  };
}

/**
 * Generate random avatar URL from DiceBear API
 * Uses consistent seed based on name for stable avatars
 * TODO: Gerçek avatar URL'leri eklendiğinde aktif edilecek
 */
const getRandomAvatar = (): string => {
  // Şimdilik devre dışı - gerçek datalarla doldurulacak
  return "";
};

/**
 * Centralized User Avatar Component
 * Consistent avatar styling across the application
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  initials,
  backgroundColor = avatarColors.indigo,
  avatarUrl,
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

  const avatarSrc =
    avatarUrl || user?.avatarUrl || user?.avatar || getRandomAvatar();

  return (
    <AntAvatar
      size={size}
      src={avatarSrc || undefined}
      style={{
        background: avatarSrc ? "transparent" : backgroundColor,
        color: backgrounds.card,
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
