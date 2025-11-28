/**
 * TeamMemberSelect - Üye arama ve ekleme komponenti
 */

import React, { useState, useRef } from "react";
import { Select, Typography, Empty } from "antd";
import type { BaseSelectRef } from "rc-select";
import { UserPlus } from "lucide-react";
import { UserAvatar } from "@/shared/ui";
import { colors as colorPalette, spacing } from "@/shared/styles";
import { AVAILABLE_USERS, type AvailableUser } from "./constants";

const { Text } = Typography;

interface TeamMemberSelectProps {
  selectedMemberIds: string[];
  onSelect: (user: AvailableUser) => void;
  placeholder?: string;
}

export const TeamMemberSelect: React.FC<TeamMemberSelectProps> = ({
  selectedMemberIds,
  onSelect,
  placeholder = "Üye ara ve ekle...",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef<BaseSelectRef>(null);

  // Henüz eklenmemiş kullanıcıları filtrele
  const availableUsers = AVAILABLE_USERS.filter(
    (user) => !selectedMemberIds.includes(user.id)
  );

  const handleSelect = (userId: string) => {
    const user = AVAILABLE_USERS.find((u) => u.id === userId);
    if (user) {
      onSelect(user);
      // Seçim sonrası temizle
      setSearchValue("");
      selectRef.current?.blur();
    }
  };

  return (
    <Select<string>
      ref={selectRef}
      showSearch
      value={undefined}
      searchValue={searchValue}
      onSearch={setSearchValue}
      placeholder={
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <UserPlus size={16} />
          {placeholder}
        </span>
      }
      onSelect={handleSelect}
      style={{ width: "100%" }}
      dropdownStyle={{
        maxHeight: 300,
        borderRadius: 8,
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
      }}
      filterOption={(input, option) => {
        const user = AVAILABLE_USERS.find((u) => u.id === option?.value);
        if (!user) return false;
        return (
          user.name.toLowerCase().includes(input.toLowerCase()) ||
          (user.email?.toLowerCase().includes(input.toLowerCase()) ?? false)
        );
      }}
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Kullanıcı bulunamadı"
        />
      }
      options={availableUsers.map((user) => ({
        value: user.id,
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              padding: `${spacing.xs}px 0`,
            }}
          >
            <UserAvatar
              size={28}
              user={{ name: user.name }}
              avatarUrl={user.avatarUrl}
              backgroundColor={user.color}
            />
            <div style={{ flex: 1 }}>
              <Text style={{ fontWeight: 500, display: "block" }}>
                {user.name}
              </Text>
              <Text style={{ fontSize: 11, color: colorPalette.textSecondary }}>
                {user.email}
              </Text>
            </div>
          </div>
        ),
      }))}
    />
  );
};

export default TeamMemberSelect;
