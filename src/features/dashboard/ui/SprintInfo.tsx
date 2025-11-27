/**
 * Active Sprint Info - Refactored sub-component
 */

import React from "react";
import { Typography, Progress } from "antd";
import { colorPalette, borderColors } from "@/shared/styles/styleConstants";

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
        <Text type="secondary" style={{ fontSize: 12, color: "#7f8c8d" }}>
          Hedef
        </Text>
        <div style={{ marginTop: 6 }}>
          <Text
            style={{
              fontSize: 13,
              color: "#2c3e50",
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
          background: colorPalette.primaryLighter,
          borderRadius: 8,
          border: `1px solid ${borderColors.light}`,
        }}
      >
        <div style={{ flex: 1 }}>
          <Text
            type="secondary"
            style={{ fontSize: 11, color: colorPalette.textSecondary }}
          >
            Başlangıç
          </Text>
          <div style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 12, color: colorPalette.textPrimary }}>
              {sprintInfo.startedAt}
            </Text>
          </div>
        </div>
        <div style={{ width: "1px", background: borderColors.medium }} />
        <div style={{ flex: 1, textAlign: "right" }}>
          <Text
            type="secondary"
            style={{ fontSize: 11, color: colorPalette.textSecondary }}
          >
            Bitiş
          </Text>
          <div style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 12, color: colorPalette.textPrimary }}>
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
            style={{ fontSize: 12, color: colorPalette.textSecondary }}
          >
            İlerleme
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colorPalette.success,
            }}
          >
            {completionRate}%
          </Text>
        </div>
        <Progress
          percent={completionRate}
          strokeColor={{
            "0%": colorPalette.success,
            "50%": "#2edc82",
            "100%": colorPalette.success,
          }}
          format={() => null}
          trailColor={colorPalette.primaryLighter}
        />
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: colorPalette.textSecondary,
          }}
        >
          {sprintInfo.completed} / {sprintInfo.total} iş tamamlandı
        </div>
      </div>
    </div>
  );
};
