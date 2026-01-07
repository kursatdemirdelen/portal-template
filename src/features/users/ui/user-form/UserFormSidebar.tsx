/**
 * User Form Sidebar Component
 *
 * Sağ panel: Önizleme, ipuçları ve rol bilgileri.
 * UserDetailPage tarzında modern tasarım.
 */

import React from "react";
import { Card, Space, Typography, Alert, Badge, Avatar, Tag } from "antd";
import { UserOutlined, IdcardOutlined } from "@ant-design/icons";
import type { UserRole } from "../../model";
import { radius, borderColors, colors } from "@/shared/styles";
import { USER_ROLE_LABELS, USER_ROLE_COLORS } from "@/shared/config/constants";

const { Text, Title } = Typography;

interface UserFormSidebarProps {
  mode: "create" | "edit";
  name?: string;
  email?: string;
  role?: UserRole;
  department?: string;
}

export const UserFormSidebar: React.FC<UserFormSidebarProps> = ({
  mode,
  name,
  email,
  role,
  department,
}) => {
  const roleColor = role ? USER_ROLE_COLORS[role] : colors.primary;

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Preview Card - UserDetailPage tarzı */}
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          border: "none",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Gradient Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
            padding: "24px 20px 50px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {/* Avatar & Info */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Badge
              dot
              status="success"
              offset={[-8, 80]}
              style={{ width: 16, height: 16 }}
            >
              <Avatar
                size={90}
                icon={<UserOutlined />}
                style={{
                  border: "4px solid white",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  background: "rgba(255,255,255,0.3)",
                  fontSize: 40,
                  color: "white",
                }}
              />
            </Badge>

            <Title
              level={5}
              style={{ color: "white", margin: "12px 0 6px", fontSize: 15 }}
            >
              {name || "Kullanıcı Adı"}
            </Title>

            {role && (
              <Tag
                style={{
                  background: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 16,
                  fontWeight: 600,
                  backdropFilter: "blur(10px)",
                  marginTop: 4,
                }}
              >
                <IdcardOutlined /> {USER_ROLE_LABELS[role]}
              </Tag>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div
          style={{
            padding: "20px",
            marginTop: -20,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Email Card */}
          <div
            style={{
              background: "#f8f9fa",
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 12,
            }}
          >
            <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
              E-posta
            </Text>
            <Text strong style={{ fontSize: 13, wordBreak: "break-all" }}>
              {email || "email@example.com"}
            </Text>
          </div>

          {/* Department */}
          {department && (
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
                Departman
              </Text>
              <Text strong style={{ fontSize: 13 }}>
                {department}
              </Text>
            </div>
          )}
        </div>
      </Card>

      {/* Tips Card */}
      <Card
        size="small"
        title="İpuçları"
        style={{
          borderRadius: radius.lg,
          border: `1px solid ${borderColors.light}`,
        }}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {mode === "create" && (
            <>
              <Alert
                message="Güçlü Şifre"
                description="En az 6 karakter, büyük/küçük harf ve rakam içeren bir şifre seçin."
                type="info"
                showIcon
                style={{ fontSize: 11 }}
              />
              <Alert
                message="E-posta Onayı"
                description="Kullanıcıya bir onay e-postası gönderilecektir."
                type="info"
                showIcon
                style={{ fontSize: 11 }}
              />
            </>
          )}
          {mode === "edit" && (
            <>
              <Alert
                message="Değişiklikler"
                description="Yaptığınız değişiklikler hemen etkin olacaktır."
                type="warning"
                showIcon
                style={{ fontSize: 11 }}
              />
              <Alert
                message="Rol Değişikliği"
                description="Kullanıcı rolünü değiştirmek izinlerini de değiştirecektir."
                type="info"
                showIcon
                style={{ fontSize: 11 }}
              />
            </>
          )}
        </Space>
      </Card>
    </Space>
  );
};
