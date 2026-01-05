import React from "react";
import { Typography, Space } from "antd";
import {
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { spacing, radius, typography, gradients } from "@/shared/styles";

const { Title, Text, Paragraph } = Typography;

/* ===========================
   DATA
   =========================== */

const features = [
  {
    icon: <SafetyOutlined style={{ fontSize: typography.fontSize.xl }} />,
    title: "Güvenli Erişim",
    desc: "End-to-end şifreleme ile verileriniz güvende",
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: typography.fontSize.xl }} />,
    title: "Hızlı Performans",
    desc: "Optimize edilmiş altyapı ile anında yanıt",
  },
  {
    icon: <TeamOutlined style={{ fontSize: typography.fontSize.xl }} />,
    title: "Ekip Yönetimi",
    desc: "Projelerinizi ve ekibinizi tek yerden yönetin",
  },
  {
    icon: <CloudOutlined style={{ fontSize: typography.fontSize.xl }} />,
    title: "Cloud Entegrasyon",
    desc: "Her yerden erişim, kesintisiz çalışma",
  },
];

/* ===========================
   STYLES
   =========================== */

const styles = {
  container: {
    flex: "0 0 440px",
    background: gradients.sidebarLogo,
    padding: `${spacing["4xl"] + spacing.sm}px ${spacing["4xl"]}px`,
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  decorativeCircle: (
    top: number | string,
    right: number | string,
    bottom: number | string,
    left: number | string,
    size: number,
    opacity: number
  ) => ({
    position: "absolute" as const,
    top,
    right,
    bottom,
    left,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `rgba(255,255,255,${opacity})`,
  }),
  logoBox: {
    width: 56,
    height: 56,
    background: "rgba(255,255,255,0.2)",
    borderRadius: radius.xl,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: spacing["2xl"],
    backdropFilter: "blur(10px)",
  },
  logoText: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: "#fff",
  },
  title: {
    color: "#ffffff",
    margin: `0 0 ${spacing.md}px 0`,
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: "-0.5px",
  },
  description: {
    color: "rgba(255,255,255,0.85)",
    fontSize: typography.fontSize.md,
    margin: 0,
    lineHeight: typography.lineHeight.relaxed,
  },
  featureCard: {
    display: "flex" as const,
    alignItems: "flex-start" as const,
    gap: spacing.md + 2,
    padding: `${spacing.md + 2}px ${spacing.lg}px`,
    background: "rgba(255,255,255,0.1)",
    borderRadius: radius.lg,
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
  },
  featureIcon: {
    width: 40,
    height: 40,
    background: "rgba(255,255,255,0.15)",
    borderRadius: radius.md + 2,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    color: "#ffffff",
    flexShrink: 0,
  },
  featureTitle: {
    color: "#ffffff",
    fontSize: typography.fontSize.base,
    display: "block",
    marginBottom: 2,
  },
  featureDesc: {
    color: "rgba(255,255,255,0.7)",
    fontSize: typography.fontSize.xs,
  },
  footer: {
    color: "rgba(255,255,255,0.5)",
    fontSize: typography.fontSize.xs,
    position: "relative" as const,
    zIndex: 1,
  },
} as const;

/* ===========================
   COMPONENT
   =========================== */

const LoginBranding: React.FC = () => {
  return (
    <div style={styles.container} data-login-branding>
      {/* Decorative Circles */}
      <div
        style={styles.decorativeCircle(-80, -80, "auto", "auto", 200, 0.08)}
      />
      <div
        style={styles.decorativeCircle("auto", "auto", -60, -60, 180, 0.06)}
      />
      <div
        style={styles.decorativeCircle("50%", -30, "auto", "auto", 100, 0.05)}
      />

      {/* Logo & Title */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={styles.logoBox}>
          <span style={styles.logoText}>P</span>
        </div>
        <Title level={2} style={styles.title}>
          Portal Intellium
        </Title>
        <Paragraph style={styles.description}>
          Projelerinizi, ekiplerinizi ve iş süreçlerinizi tek platformdan
          yönetin.
        </Paragraph>
      </div>

      {/* Features List */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Space direction="vertical" size={spacing.lg} style={{ width: "100%" }}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <div>
                <Text strong style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </div>
            </div>
          ))}
        </Space>
      </div>

      {/* Footer */}
      <Text style={styles.footer}>© 2026 Portal Intellium</Text>
    </div>
  );
};

export default LoginBranding;
