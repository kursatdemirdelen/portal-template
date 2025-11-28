/**
 * Security Settings Card (Basitleştirilmiş)
 */

import React from "react";
import { Card, Switch, InputNumber, Space, Typography, Row, Col } from "antd";
import { Shield, Clock, Key, Lock } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { SecuritySettings } from "../model/types";

const { Text } = Typography;

interface SecuritySettingsCardProps {
  data: SecuritySettings;
  onChange: (key: keyof SecuritySettings, value: unknown) => void;
  minHeight?: number;
}

export const SecuritySettingsCard: React.FC<SecuritySettingsCardProps> = ({
  data,
  onChange,
  minHeight,
}) => {
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
      <SettingsCardHeader
        icon={<Shield size={20} color={colors.error} />}
        title="Güvenlik Ayarları"
        subtitle="Oturum ve şifre politikaları"
        color={colors.error}
      />

      {/* Session Settings */}
      <div
        style={{
          padding: spacing.lg,
          background: backgrounds.neutral50,
          borderRadius: radius.lg,
          marginBottom: spacing.lg,
        }}
      >
        <Space style={{ marginBottom: spacing.md }}>
          <Clock size={16} color={colors.textSecondary} />
          <Text strong>Oturum Ayarları</Text>
        </Space>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Oturum Zaman Aşımı
            </Text>
            <Space>
              <InputNumber
                id="security-sessionTimeoutMinutes"
                name="security-sessionTimeoutMinutes"
                min={5}
                max={480}
                value={data.sessionTimeoutMinutes}
                onChange={(v) => onChange("sessionTimeoutMinutes", v)}
                style={{ width: 80 }}
              />
              <Text type="secondary">dakika</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text>Beni Hatırla</Text>
              <Switch
                id="security-rememberMeEnabled"
                checked={data.rememberMeEnabled}
                onChange={(v) => onChange("rememberMeEnabled", v)}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Two Factor Auth */}
      <div
        style={{
          padding: spacing.lg,
          background: data.twoFactorRequired
            ? `${colors.success}08`
            : backgrounds.neutral50,
          borderRadius: radius.lg,
          border: `1px solid ${
            data.twoFactorRequired ? `${colors.success}30` : borderColors.light
          }`,
          marginBottom: spacing.lg,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <Key size={16} color={colors.success} />
            <div>
              <Text strong>İki Faktörlü Doğrulama (2FA)</Text>
              <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                Tüm kullanıcılar için zorunlu kıl
              </Text>
            </div>
          </Space>
          <Switch
            id="security-twoFactorRequired"
            checked={data.twoFactorRequired}
            onChange={(v) => onChange("twoFactorRequired", v)}
          />
        </div>
      </div>

      {/* Password Policy - Simplified */}
      <div
        style={{
          padding: spacing.lg,
          background: backgrounds.neutral50,
          borderRadius: radius.lg,
        }}
      >
        <Space style={{ marginBottom: spacing.md }}>
          <Lock size={16} color={colors.textSecondary} />
          <Text strong>Şifre Politikası</Text>
        </Space>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Minimum Uzunluk
            </Text>
            <InputNumber
              id="security-passwordMinLength"
              name="security-passwordMinLength"
              min={6}
              max={32}
              value={data.passwordMinLength}
              onChange={(v) => onChange("passwordMinLength", v)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Maksimum Hatalı Giriş
            </Text>
            <Space>
              <InputNumber
                id="security-maxLoginAttempts"
                name="security-maxLoginAttempts"
                min={3}
                max={10}
                value={data.maxLoginAttempts}
                onChange={(v) => onChange("maxLoginAttempts", v)}
                style={{ width: 80 }}
              />
              <Text type="secondary">deneme</Text>
            </Space>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SecuritySettingsCard;
