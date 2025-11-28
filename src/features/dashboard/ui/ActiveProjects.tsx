/**
 * Active Projects - Refactored sub-component
 */

import React from "react";
import { Row, Col, Typography, Progress } from "antd";
import {
  backgrounds,
  borderColors,
  colors,
  getProjectStatusStyle,
  gradients,
} from "@/shared/styles";
import type { DashboardProject } from "@/shared/types";

const { Text } = Typography;

// Re-export type for backward compatibility
export type { DashboardProject as Project } from "@/shared/types";

interface ActiveProjectsProps {
  projects: DashboardProject[];
}

export const ActiveProjects: React.FC<ActiveProjectsProps> = ({ projects }) => {
  return (
    <Row gutter={[12, 12]}>
      {projects.map((project) => {
        const projectColor = getProjectStatusStyle(project.status);

        return (
          <Col key={project.code} xs={24} sm={12} xxl={8}>
            <div
              style={{
                background: gradients.bgCard,
                border: `1px solid ${borderColors.light}`,
                borderRadius: 10,
                padding: 12,
                height: "100%",
                minHeight: 100,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 600,
                      display: "block",
                      fontSize: 13,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.name}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 11, color: colors.textSecondary }}
                  >
                    {project.code}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "3px 8px",
                    background: projectColor.bg,
                    borderRadius: 4,
                    fontSize: 10,
                    color: projectColor.text,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {project.status}
                </div>
              </div>

              {/* Progress */}
              <div>
                <Progress
                  percent={project.progress}
                  strokeColor={colors.primary}
                  trailColor={backgrounds.neutral100}
                  size="small"
                  format={() => null}
                />
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                  }}
                >
                  <Text
                    type="secondary"
                    style={{ color: colors.textSecondary }}
                  >
                    Tamamlanma
                  </Text>
                  <Text style={{ color: colors.primary, fontWeight: 600 }}>
                    {project.progress}%
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
