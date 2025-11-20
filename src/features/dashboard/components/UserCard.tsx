import React from "react";
import { Avatar, Typography, Tag } from "antd";
import { MailOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface UserInfo {
  name: string;
  role: string;
  department: string;
  email: string;
  lastLogin: string;
  avatar: string;
  company: string;
}

interface UserCardProps {
  user: UserInfo;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: 100,
          borderRadius: 14,
          background:
            "linear-gradient(135deg, #f472b6 0%, #5b7aed 60%, #38bdf8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top, rgba(255,255,255,0.3), transparent 60%)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -58,
        }}
      >
        <Avatar
          size={80}
          style={{
            border: "4px solid #fff",
            boxShadow: "0 7px 16px rgba(15, 23, 42, 0.14)",
            fontWeight: 600,
            fontSize: 24,
            background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)",
          }}
        >
          {user.avatar}
        </Avatar>
        <div style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
            {user.name}
          </Text>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            {user.role} | {user.department}
          </div>
        </div>
        <Tag
          color="#eef2ff"
          style={{
            marginTop: 24,
            borderRadius: 999,
            color: "#4338ca",
            padding: "2px 16px",
          }}
        >
          {user.company}
        </Tag>
      </div>

      <div
        style={{
          border: "1px dashed #e2e8f0",
          borderRadius: 8,
          padding: 12,
          marginTop: 8,
          background: "#f8fafc",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#475569",
            fontSize: 12,
          }}
        >
          <MailOutlined /> {user.email}
        </Text>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#475569",
            fontSize: 12,
          }}
        >
          <EnvironmentOutlined /> Son Giris: {user.lastLogin}
        </Text>
      </div>
    </div>
  );
};
