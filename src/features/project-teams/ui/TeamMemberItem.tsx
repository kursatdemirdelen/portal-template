/**
 * TeamMemberItem - Ekip üyesi satır komponenti
 */

import React from "react";
import { Button, Select, Typography, Grid } from "antd";
import { Trash2 } from "lucide-react";
import { UserAvatar } from "@/shared/ui";
import {
  backgrounds,
  borderColors,
  colors as colorPalette,
  spacing,
  radius,
} from "@/shared/styles";
import { TEAM_ROLES, ROLE_COLORS } from "./constants";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export interface TeamMemberItemData {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  color: string;
  role: string;
}

interface TeamMemberItemProps {
  member: TeamMemberItemData;
  onRoleChange: (memberId: string, role: string) => void;
  onRemove: (memberId: string) => void;
  isLeader?: boolean;
  editable?: boolean;
}

export const TeamMemberItem: React.FC<TeamMemberItemProps> = ({
  member,
  onRoleChange,
  onRemove,
  isLeader = false,
  editable = true,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        gap: spacing.md,
        padding: spacing.md,
        background: hovered ? backgrounds.neutral100 : backgrounds.neutral50,
        borderRadius: radius.md,
        border: `1px solid ${borderColors.light}`,
        borderLeft: isLeader
          ? `3px solid ${colorPalette.primary}`
          : `1px solid ${borderColors.light}`,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Üst satır: Avatar + İsim + Silme butonu (mobilde) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.md,
          flex: isMobile ? undefined : 1,
          minWidth: 0,
        }}
      >
        <UserAvatar
          size={isMobile ? 36 : 40}
          user={{ name: member.name }}
          avatarUrl={member.avatarUrl}
          backgroundColor={member.color}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontWeight: 600,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {member.name}
            {isLeader && (
              <span
                style={{
                  background: colorPalette.primaryLighter,
                  color: colorPalette.primary,
                  padding: `2px ${spacing.sm}px`,
                  borderRadius: radius.sm,
                  fontSize: 10,
                  fontWeight: 600,
                  marginLeft: spacing.sm,
                }}
              >
                Lider
              </span>
            )}
          </Text>
          {member.email && (
            <Text
              style={{
                fontSize: 12,
                color: colorPalette.textSecondary,
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {member.email}
            </Text>
          )}
        </div>

        {/* Mobilde silme butonu üst satırda */}
        {isMobile && editable && (
          <Button
            type="text"
            size="small"
            icon={<Trash2 size={16} color={colorPalette.error} />}
            onClick={() => onRemove(member.id)}
          />
        )}
      </div>

      {/* Alt satır (mobil) veya sağ taraf (desktop): Rol + Silme */}
      {editable ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginLeft: isMobile ? 0 : undefined,
          }}
        >
          <Select
            value={member.role}
            onChange={(value) => onRoleChange(member.id, value)}
            style={{
              width: isMobile ? "100%" : 180,
              flex: isMobile ? 1 : undefined,
            }}
            options={TEAM_ROLES.map((role) => ({
              value: role,
              label: (
                <span
                  style={{
                    color: ROLE_COLORS[role] || colorPalette.textPrimary,
                  }}
                >
                  {role}
                </span>
              ),
            }))}
            placeholder="Rol seçin"
          />

          {/* Desktop'ta silme butonu */}
          {!isMobile && (
            <Button
              type="text"
              size="small"
              icon={<Trash2 size={16} color={colorPalette.error} />}
              onClick={() => onRemove(member.id)}
            />
          )}
        </div>
      ) : (
        <Text
          style={{
            color: ROLE_COLORS[member.role] || colorPalette.textSecondary,
          }}
        >
          {member.role}
        </Text>
      )}
    </div>
  );
};

export default TeamMemberItem;
