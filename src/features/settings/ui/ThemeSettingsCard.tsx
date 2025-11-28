/**
 * Theme Settings Card
 */

import React from "react";
import {
  Card,
  Switch,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  ColorPicker,
} from "antd";
import { Palette, Sun, Moon, Monitor, Type, Sparkles } from "lucide-react";
import type { Color } from "antd/es/color-picker";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { ThemeSettings } from "../model/types";
import { FONT_SIZE_OPTIONS } from "./constants";

const { Text, Title } = Typography;

interface ThemeSettingsCardProps {
  data: ThemeSettings;
  onChange: (key: keyof ThemeSettings, value: unknown) => void;
  minHeight?: number;
}

const ThemeModeCard: React.FC<{
  mode: "light" | "dark" | "system";
  selected: boolean;
  onClick: () => void;
}> = ({ mode, selected, onClick }) => {
  const icons = {
    light: (
      <Sun size={24} color={selected ? colors.warning : colors.textMuted} />
    ),
    dark: (
      <Moon size={24} color={selected ? colors.primary : colors.textMuted} />
    ),
    system: (
      <Monitor size={24} color={selected ? colors.info : colors.textMuted} />
    ),
  };

  const labels = {
    light: "Açık Tema",
    dark: "Koyu Tema",
    system: "Sistem",
  };

  return (
    <div
      onClick={onClick}
      style={{
        padding: spacing.lg,
        borderRadius: radius.lg,
        border: `2px solid ${selected ? colors.primary : borderColors.light}`,
        background: selected ? `${colors.primary}08` : backgrounds.card,
        cursor: "pointer",
        transition: "all 0.2s ease",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: spacing.sm }}>{icons[mode]}</div>
      <Text
        style={{
          fontWeight: selected ? 600 : 400,
          color: selected ? colors.primary : colors.textSecondary,
        }}
      >
        {labels[mode]}
      </Text>
    </div>
  );
};

export const ThemeSettingsCard: React.FC<ThemeSettingsCardProps> = ({
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: `${colors.accent}05`,
          borderRadius: radius.lg,
          padding: `${spacing.md}px ${spacing.lg}px`,
          marginBottom: spacing.lg,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.lg,
            background: `${colors.accent}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 8px 0 ${colors.accent}10`,
          }}
        >
          <Palette size={22} color={colors.accent} />
        </div>
        <div>
          <Title
            level={5}
            style={{ margin: 0, fontWeight: 700, letterSpacing: 0.2 }}
          >
            Görünüm Ayarları
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Tema ve renk tercihleri
          </Text>
        </div>
      </div>

      {/* Theme Mode */}
      <Text strong style={{ display: "block", marginBottom: spacing.md }}>
        Tema Modu
      </Text>
      <Row gutter={16} style={{ marginBottom: spacing.xl }}>
        <Col span={8}>
          <ThemeModeCard
            mode="light"
            selected={data.mode === "light"}
            onClick={() => onChange("mode", "light")}
          />
        </Col>
        <Col span={8}>
          <ThemeModeCard
            mode="dark"
            selected={data.mode === "dark"}
            onClick={() => onChange("mode", "dark")}
          />
        </Col>
        <Col span={8}>
          <ThemeModeCard
            mode="system"
            selected={data.mode === "system"}
            onClick={() => onChange("mode", "system")}
          />
        </Col>
      </Row>

      {/* Colors */}
      <div
        style={{
          padding: spacing.lg,
          background: backgrounds.neutral50,
          borderRadius: radius.lg,
          marginBottom: spacing.lg,
        }}
      >
        <Text strong style={{ display: "block", marginBottom: spacing.md }}>
          Renkler
        </Text>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Text>Ana Renk</Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Marka ve vurgu rengi
                </Text>
              </div>
              <ColorPicker
                value={data.primaryColor}
                onChange={(color: Color) =>
                  onChange("primaryColor", color.toHexString())
                }
                showText
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Text>Vurgu Rengi</Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  İkincil vurgu rengi
                </Text>
              </div>
              <ColorPicker
                value={data.accentColor}
                onChange={(color: Color) =>
                  onChange("accentColor", color.toHexString())
                }
                showText
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: spacing.lg }}>
        <Space style={{ marginBottom: spacing.md }}>
          <Type size={16} color={colors.textSecondary} />
          <Text strong>Tipografi</Text>
        </Space>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Yazı Boyutu
            </Text>
            <Select
              value={data.fontSize}
              onChange={(v) => onChange("fontSize", v)}
              options={FONT_SIZE_OPTIONS}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Yazı Tipi
            </Text>
            <Select
              value={data.fontFamily}
              onChange={(v) => onChange("fontFamily", v)}
              options={[
                { label: "Inter", value: "Inter, system-ui, sans-serif" },
                { label: "Roboto", value: "Roboto, sans-serif" },
                { label: "Open Sans", value: "Open Sans, sans-serif" },
                { label: "Sistem Varsayılanı", value: "system-ui, sans-serif" },
              ]}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Animations Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: spacing.sm,
          background: backgrounds.neutral50,
          borderRadius: radius.md,
        }}
      >
        <Space>
          <Sparkles size={14} color={colors.warning} />
          <Text>Animasyonlar</Text>
        </Space>
        <Switch
          size="small"
          checked={data.animationsEnabled}
          onChange={(v) => onChange("animationsEnabled", v)}
        />
      </div>
    </Card>
  );
};

export default ThemeSettingsCard;
