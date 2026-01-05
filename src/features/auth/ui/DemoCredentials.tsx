import React from "react";
import { Typography, Row, Col, Tooltip, message } from "antd";
import { UserOutlined, ToolOutlined, CrownOutlined } from "@ant-design/icons";
import {
  colors,
  borderColors,
  spacing,
  radius,
  typography,
  gradients,
} from "@/shared/styles";

const { Text } = Typography;

/* ===========================
   DATA
   =========================== */

const accounts = [
  {
    icon: <CrownOutlined style={{ fontSize: typography.fontSize.lg }} />,
    title: "Admin",
    email: "admin@example.com",
    password: "admin123",
    color: colors.primary,
    bgColor: "rgba(91, 122, 237, 0.08)",
  },
  {
    icon: <ToolOutlined style={{ fontSize: typography.fontSize.lg }} />,
    title: "Worker",
    email: "worker@example.com",
    password: "worker123",
    color: colors.success,
    bgColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    icon: <UserOutlined style={{ fontSize: typography.fontSize.lg }} />,
    title: "User",
    email: "user@example.com",
    password: "user123",
    color: colors.warning,
    bgColor: "rgba(245, 158, 11, 0.08)",
  },
];

/* ===========================
   STYLES
   =========================== */

const styles = {
  container: {
    background: gradients.bgElevated,
    border: `1px solid ${borderColors.light}`,
    borderRadius: radius.xl,
    padding: `${spacing.lg + 2}px ${spacing.xl}px`,
  },
  title: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: spacing.md + 2,
  },
  card: {
    padding: `${spacing.md}px ${spacing.md + 2}px`,
    borderRadius: radius.md + 2,
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid transparent",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: typography.fontSize.xxs,
    color: colors.textSecondary,
    display: "block",
    wordBreak: "break-all" as const,
  },
  password: {
    fontSize: typography.fontSize.xxs,
    color: colors.textTertiary,
    fontFamily: typography.fontFamilyMono,
  },
} as const;

/* ===========================
   COMPONENT
   =========================== */

const DemoCredentials: React.FC = () => {
  const copyToClipboard = (email: string, password: string) => {
    navigator.clipboard.writeText(`${email} / ${password}`);
    message.success("Kopyalandı!");
  };

  return (
    <div style={styles.container}>
      <Text style={styles.title}>Demo Hesapları</Text>

      <Row gutter={[spacing.md, spacing.md]}>
        {accounts.map((account) => (
          <Col xs={24} sm={8} key={account.title}>
            <Tooltip title="Tıklayarak kopyala" placement="top">
              <div
                onClick={() => copyToClipboard(account.email, account.password)}
                style={{ ...styles.card, background: account.bgColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = account.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div style={styles.cardHeader}>
                  <span style={{ color: account.color }}>{account.icon}</span>
                  <Text
                    strong
                    style={{
                      color: account.color,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    {account.title}
                  </Text>
                </div>
                <Text style={styles.email}>{account.email}</Text>
                <Text style={styles.password}>{account.password}</Text>
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DemoCredentials;
