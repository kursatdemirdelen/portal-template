/**
 * Work Hours Settings Card (Güncellenmiş - Tatil kısmı kaldırıldı)
 */

import React from "react";
import { Card, Switch, Space, Typography, Row, Col, TimePicker } from "antd";
import { Calendar, Clock, Coffee } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";
import dayjs from "dayjs";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { WorkHoursSettings, DayOfWeek } from "../model/types";
import { WORK_DAY_OPTIONS } from "./constants";

const { Text, Title } = Typography;

interface WorkHoursSettingsCardProps {
  data: WorkHoursSettings;
  onChange: (key: keyof WorkHoursSettings, value: unknown) => void;
  minHeight?: number;
}

export const WorkHoursSettingsCard: React.FC<WorkHoursSettingsCardProps> = ({
  data,
  onChange,
  minHeight,
}) => {
  const handleWorkDayToggle = (day: DayOfWeek, checked: boolean) => {
    if (checked) {
      onChange("workDays", [...data.workDays, day]);
    } else {
      onChange(
        "workDays",
        data.workDays.filter((d) => d !== day)
      );
    }
  };

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
        icon={<Calendar size={20} color={colors.orange} />}
        title="Çalışma Saatleri"
        subtitle="Mesai saatleri ve çalışma günleri"
        color={colors.orange}
      />

      {/* Work Hours */}
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
          <Text strong>Çalışma Saatleri</Text>
        </Space>
        <Row gutter={[24, 16]}>
          <Col xs={12} md={6}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Başlangıç
            </Text>
            <TimePicker
              id="workhours-workStartTime"
              name="workhours-workStartTime"
              value={dayjs(data.workStartTime, "HH:mm")}
              onChange={(time) =>
                onChange("workStartTime", time?.format("HH:mm") || "09:00")
              }
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Bitiş
            </Text>
            <TimePicker
              id="workhours-workEndTime"
              name="workhours-workEndTime"
              value={dayjs(data.workEndTime, "HH:mm")}
              onChange={(time) =>
                onChange("workEndTime", time?.format("HH:mm") || "18:00")
              }
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </div>

      {/* Work Days */}
      <div style={{ marginBottom: spacing.lg }}>
        <Text strong style={{ display: "block", marginBottom: spacing.md }}>
          Çalışma Günleri
        </Text>
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
          {WORK_DAY_OPTIONS.map((day) => (
            <div
              key={day.value}
              onClick={() =>
                handleWorkDayToggle(
                  day.value as DayOfWeek,
                  !data.workDays.includes(day.value as DayOfWeek)
                )
              }
              style={{
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${
                  data.workDays.includes(day.value as DayOfWeek)
                    ? colors.primary
                    : borderColors.light
                }`,
                background: data.workDays.includes(day.value as DayOfWeek)
                  ? `${colors.primary}10`
                  : backgrounds.card,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Text
                style={{
                  color: data.workDays.includes(day.value as DayOfWeek)
                    ? colors.primary
                    : colors.textSecondary,
                  fontWeight: data.workDays.includes(day.value as DayOfWeek)
                    ? 600
                    : 400,
                }}
              >
                {day.short}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Break */}
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
            <Coffee size={16} color={colors.textSecondary} />
            <Text strong>Öğle Arası</Text>
          </Space>
          <Switch
            id="workhours-breakEnabled"
            name="workhours-breakEnabled"
            checked={data.breakEnabled}
            onChange={(v) => onChange("breakEnabled", v)}
          />
        </div>

        {data.breakEnabled && (
          <Row gutter={16}>
            <Col span={12}>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Başlangıç
              </Text>
              <TimePicker
                id="workhours-breakStartTime"
                name="workhours-breakStartTime"
                value={dayjs(data.breakStartTime, "HH:mm")}
                onChange={(time) =>
                  onChange("breakStartTime", time?.format("HH:mm") || "12:00")
                }
                format="HH:mm"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginBottom: 4 }}
              >
                Bitiş
              </Text>
              <TimePicker
                id="workhours-breakEndTime"
                name="workhours-breakEndTime"
                value={dayjs(data.breakEndTime, "HH:mm")}
                onChange={(time) =>
                  onChange("breakEndTime", time?.format("HH:mm") || "13:00")
                }
                format="HH:mm"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        )}
      </div>
    </Card>
  );
};

export default WorkHoursSettingsCard;
