import React from "react";
import { theme } from "antd";
import { UserAvatar } from "./UserAvatar";
import { backgrounds, colors as colorPalette, spacing } from "@/shared/styles";
import { getUserByName } from "@/shared/data/mocks";

export interface AvatarStackPerson {
  name: string;
  color: string;
}

interface AvatarStackProps {
  people: AvatarStackPerson[];
  size?: number;
  maxVisible?: number;
  showLabel?: boolean;
}

/**
 * Overlapping Avatar Stack
 * Ekip üyelerinin avatarlarını negatif margin ile üst üste gösterir
 * Kullanıldığı yerler:
 * - Dashboard ProjectTeams kartı
 * - Proje detay ekipleri bölümü
 */
export const AvatarStack: React.FC<AvatarStackProps> = ({
  people,
  size = 28,
  maxVisible = 5,
  showLabel = false,
}) => {
  const { token } = theme.useToken();

  if (!people || people.length === 0) {
    return null;
  }

  const visible = people.slice(0, maxVisible);
  const remaining = Math.max(people.length - visible.length, 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: showLabel ? spacing.sm : 0,
      }}
    >
      {visible.map((person, index) => {
        const userInfo = getUserByName(person.name);
        return (
          <UserAvatar
            key={person.name}
            size={size}
            backgroundColor={person.color}
            avatarUrl={userInfo?.avatarUrl}
            user={{ name: person.name }}
            style={{
              marginLeft: index === 0 ? 0 : -Math.floor(size / 3.5),
              border: `2px solid ${token.colorBgContainer}`,
            }}
          />
        );
      })}
      {remaining > 0 && (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: backgrounds.hover,
            color: colorPalette.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -Math.floor(size / 3.5),
            border: `2px solid ${token.colorBgContainer}`,
            fontSize: size / 3,
            fontWeight: 600,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
