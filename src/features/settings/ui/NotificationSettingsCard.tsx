/**
 * Notification Settings Card (Basitleştirilmiş)
 */

import React from "react";
import { Card, Switch, Select, Space, Typography, Row, Col } from "antd";
import { Bell, Mail, Clock } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { NotificationSettings } from "../model/types";
import { DIGEST_OPTIONS } from "./constants";

const { Text } = Typography;

interface NotificationSettingsCardProps {
  data: NotificationSettings;
  onChange: (key: keyof NotificationSettings, value: unknown) => void;
  minHeight?: number;
}
export const NotificationSettingsCard: React.FC<
  NotificationSettingsCardProps
> = ({ data, onChange, minHeight }) => {
  return (
    <Card
      style={{
        borderRadius: radius.lg,
        border: `1px solid ${borderColors.light}`,
        minHeight,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <SettingsCardHeader
          icon={<Bell size={20} color={colors.warning} />}
          title="Bildirim Ayarları"
          subtitle="E-posta bildirim tercihleri"
          color={colors.warning}
        />

        {/* Email Toggle */}
        {/* E-posta Bildirimleri */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.lg,
            background: data.emailEnabled
              ? `${colors.info}08`
              : backgrounds.neutral50,
            borderRadius: radius.lg,
            border: `1px solid ${
              data.emailEnabled ? `${colors.info}30` : borderColors.light
            }`,
            marginBottom: spacing.lg,
            minHeight: 72,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.md }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: radius.md,
                background: data.emailEnabled
                  ? `${colors.info}20`
                  : backgrounds.neutral100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Mail
                size={18}
                color={data.emailEnabled ? colors.info : colors.textMuted}
              />
            </div>
            <div>
              <Text strong style={{ fontSize: 15 }}>
                E-posta Bildirimleri
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                Önemli güncellemeler için e-posta al
              </Text>
            </div>
          </div>
          <Switch
            checked={data.emailEnabled}
            onChange={(checked) => onChange("emailEnabled", checked)}
          />
        </div>
        {/* Spacer to push digest to bottom if enabled */}
        <div style={{ flex: 1 }} />
        {/* Bildirim Sıklığı */}
        {data.emailEnabled && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: spacing.lg,
              background: backgrounds.neutral50,
              borderRadius: radius.lg,
              border: `1px solid ${borderColors.light}`,
              minHeight: 72,
              marginTop: spacing.lg,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: spacing.md }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: radius.md,
                  background: backgrounds.neutral100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={18} color={colors.primary} />
              </div>
              <div>
                <Text strong style={{ fontSize: 15 }}>
                  Bildirim Sıklığı
                </Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Ne sıklıkla bildirim almak istersiniz?
                </Text>
              </div>
            </div>
            <Select
              value={data.emailDigestFrequency}
              onChange={(value) => onChange("emailDigestFrequency", value)}
              options={DIGEST_OPTIONS}
              style={{ width: 140 }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotificationSettingsCard;
