/**
 * Active Sprint Info - Refactored sub-component
 */

import React from "react";
import { Typography, Progress } from "antd";
import { backgrounds, borderColors, colors } from "@/shared/styles";

const { Text } = Typography;

interface SprintInfoData {
  name: string;
  goal: string;
  startedAt: string;
  endsAt: string;
  completed: number;
  total: number;
}

interface SprintInfoProps {
  sprintInfo: SprintInfoData;
}

export const SprintInfo: React.FC<SprintInfoProps> = ({ sprintInfo }) => {
  const completionRate = Math.round(
    (sprintInfo.completed / sprintInfo.total) * 100
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Sprint Goal */}
      <div>
        <Text
          type="secondary"
          style={{ fontSize: 12, color: colors.textSecondary }}
        >
          Hedef
        </Text>
        <div style={{ marginTop: 6 }}>
          <Text
            style={{
              fontSize: 13,
              color: colors.textPrimary,
              lineHeight: 1.5,
            }}
          >
            {sprintInfo.goal}
          </Text>
        </div>
      </div>

      {/* Dates */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "10px 12px",
          background: backgrounds.hover,
          borderRadius: 8,
          border: `1px solid ${borderColors.light}`,
        }}
      >
        <div style={{ flex: 1 }}>
          <Text
            type="secondary"
            style={{ fontSize: 11, color: colors.textSecondary }}
          >
            Başlangıç
          </Text>
          <div style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 12, color: colors.textPrimary }}>
              {sprintInfo.startedAt}
            </Text>
          </div>
        </div>
        <div style={{ width: "1px", background: borderColors.medium }} />
        <div style={{ flex: 1, textAlign: "right" }}>
          <Text
            type="secondary"
            style={{ fontSize: 11, color: colors.textSecondary }}
          >
            Bitiş
          </Text>
          <div style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 12, color: colors.textPrimary }}>
              {sprintInfo.endsAt}
            </Text>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text
            type="secondary"
            style={{ fontSize: 12, color: colors.textSecondary }}
          >
            İlerleme
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.success,
            }}
          >
            {completionRate}%
          </Text>
        </div>
        <Progress
          percent={completionRate}
          strokeColor={{
            "0%": colors.success,
            "50%": colors.green,
            "100%": colors.success,
          }}
          format={() => null}
          trailColor={backgrounds.neutral100}
        />
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: colors.textSecondary,
          }}
        >
          {sprintInfo.completed} / {sprintInfo.total} iş tamamlandı
        </div>
      </div>
    </div>
  );
};
