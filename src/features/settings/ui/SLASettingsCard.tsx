/**
 * SLA Settings Card
 */

import React from "react";
import {
  Card,
  Switch,
  InputNumber,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
} from "antd";
import { Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { SLASettings } from "../model/types";
import { SLA_OPTIONS } from "./constants";

const { Text, Title } = Typography;

interface SLASettingsCardProps {
  data: SLASettings;
  onChange: (key: keyof SLASettings, value: unknown) => void;
  minHeight?: number;
}

const SLARow: React.FC<{
  label: string;
  responseValue: number;
  resolutionValue: number;
  onResponseChange: (value: number | null) => void;
  onResolutionChange: (value: number | null) => void;
  color: string;
}> = ({
  label,
  responseValue,
  resolutionValue,
  onResponseChange,
  onResolutionChange,
  color,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${spacing.sm}px 0`,
      borderBottom: `1px solid ${borderColors.light}`,
    }}
  >
    <Tag color={color} style={{ minWidth: 80, textAlign: "center" }}>
      {label}
    </Tag>
    <Space size="large">
      <Space size="small">
        <Text type="secondary" style={{ fontSize: 12, width: 50 }}>
          Yanıt:
        </Text>
        <Select
          size="small"
          value={responseValue}
          onChange={onResponseChange}
          options={SLA_OPTIONS}
          style={{ width: 100 }}
        />
      </Space>
      <Space size="small">
        <Text type="secondary" style={{ fontSize: 12, width: 50 }}>
          Çözüm:
        </Text>
        <Select
          size="small"
          value={resolutionValue}
          onChange={onResolutionChange}
          options={SLA_OPTIONS}
          style={{ width: 100 }}
        />
      </Space>
    </Space>
  </div>
);

export const SLASettingsCard: React.FC<SLASettingsCardProps> = ({
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
        icon={<Clock size={20} color={colors.info} />}
        title="SLA Ayarları"
        subtitle="Yanıt ve çözüm süreleri"
        color={colors.info}
      />

      {/* Default SLA */}
      <div
        style={{
          padding: spacing.lg,
          background: backgrounds.neutral50,
          borderRadius: radius.lg,
          marginBottom: spacing.lg,
        }}
      >
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
                <Text strong>Varsayılan Yanıt Süresi</Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  İlk yanıt için maksimum süre
                </Text>
              </div>
              <Space>
                <InputNumber
                  min={1}
                  max={168}
                  value={data.responseTimeHours}
                  onChange={(v) => onChange("responseTimeHours", v)}
                  style={{ width: 80 }}
                />
                <Text type="secondary">saat</Text>
                <Switch
                  size="small"
                  checked={data.responseTimeEnabled}
                  onChange={(v) => onChange("responseTimeEnabled", v)}
                />
              </Space>
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
                <Text strong>Varsayılan Çözüm Süresi</Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block" }}
                >
                  Bilet çözümü için maksimum süre
                </Text>
              </div>
              <Space>
                <InputNumber
                  min={1}
                  max={720}
                  value={data.resolutionTimeHours}
                  onChange={(v) => onChange("resolutionTimeHours", v)}
                  style={{ width: 80 }}
                />
                <Text type="secondary">saat</Text>
                <Switch
                  size="small"
                  checked={data.resolutionTimeEnabled}
                  onChange={(v) => onChange("resolutionTimeEnabled", v)}
                />
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {/* Priority-based SLA */}
      <div style={{ marginBottom: spacing.lg }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.md,
          }}
        >
          <Space>
            <TrendingUp size={16} color={colors.textSecondary} />
            <Text strong>Öncelik Bazlı SLA</Text>
          </Space>
          <Switch
            checked={data.prioritySLAEnabled}
            onChange={(v) => onChange("prioritySLAEnabled", v)}
          />
        </div>

        {data.prioritySLAEnabled && (
          <div
            style={{
              padding: spacing.md,
              background: backgrounds.neutral50,
              borderRadius: radius.md,
            }}
          >
            <SLARow
              label="Critical"
              color="red"
              responseValue={data.criticalResponseHours}
              resolutionValue={data.criticalResolutionHours}
              onResponseChange={(v) =>
                onChange("criticalResponseHours", v || 1)
              }
              onResolutionChange={(v) =>
                onChange("criticalResolutionHours", v || 4)
              }
            />
            <SLARow
              label="High"
              color="orange"
              responseValue={data.highResponseHours}
              resolutionValue={data.highResolutionHours}
              onResponseChange={(v) => onChange("highResponseHours", v || 4)}
              onResolutionChange={(v) =>
                onChange("highResolutionHours", v || 24)
              }
            />
            <SLARow
              label="Medium"
              color="blue"
              responseValue={data.mediumResponseHours}
              resolutionValue={data.mediumResolutionHours}
              onResponseChange={(v) => onChange("mediumResponseHours", v || 24)}
              onResolutionChange={(v) =>
                onChange("mediumResolutionHours", v || 72)
              }
            />
            <SLARow
              label="Low"
              color="green"
              responseValue={data.lowResponseHours}
              resolutionValue={data.lowResolutionHours}
              onResponseChange={(v) => onChange("lowResponseHours", v || 48)}
              onResolutionChange={(v) =>
                onChange("lowResolutionHours", v || 168)
              }
            />
          </div>
        )}
      </div>

      <Divider />

      {/* Escalation */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.md,
          }}
        >
          <Space>
            <AlertTriangle size={16} color={colors.warning} />
            <div>
              <Text strong>Eskalasyon</Text>
              <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                SLA aşımında yöneticilere bildirim
              </Text>
            </div>
          </Space>
          <Switch
            checked={data.escalationEnabled}
            onChange={(v) => onChange("escalationEnabled", v)}
          />
        </div>

        {data.escalationEnabled && (
          <div
            style={{
              padding: spacing.md,
              background: `${colors.warning}08`,
              borderRadius: radius.md,
              border: `1px solid ${colors.warning}30`,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Eskalasyon Eşiği
                </Text>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                    marginTop: 4,
                  }}
                >
                  <Text>SLA süresinin</Text>
                  <InputNumber
                    min={50}
                    max={100}
                    value={data.escalationThresholdPercent}
                    onChange={(v) => onChange("escalationThresholdPercent", v)}
                    style={{ width: 70 }}
                    formatter={(value) => `${value}%`}
                    parser={(value) => Number(value?.replace("%", ""))}
                  />
                  <Text>geçtiğinde bildirim gönder</Text>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SLASettingsCard;
