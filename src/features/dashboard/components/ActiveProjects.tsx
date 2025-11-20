/**
 * Active Projects - Refactored sub-component
 */

import React from "react";
import { Row, Col, Typography, Progress } from "antd";
import { getProjectStatusStyle } from "@/shared/styles/styleHelpers";

const { Text } = Typography;

export interface Project {
  name: string;
  code: string;
  progress: number;
  status: string;
}

interface ActiveProjectsProps {
  projects: Project[];
}

export const ActiveProjects: React.FC<ActiveProjectsProps> = ({ projects }) => {
  return (
    <Row gutter={[16, 16]}>
      {projects.map((project) => {
        const projectColor = getProjectStatusStyle(project.status);

        return (
          <Col key={project.code} xs={24} sm={12} lg={8}>
            <div
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "1px solid #e8eefb",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div>
                  <Text
                    style={{
                      color: "#2c3e50",
                      fontWeight: 600,
                      display: "block",
                      fontSize: 14,
                    }}
                  >
                    {project.name}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginTop: 2, display: "block", color: "#7f8c8d" }}
                  >
                    {project.code}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "4px 10px",
                    background: projectColor.bg,
                    borderRadius: 4,
                    fontSize: 11,
                    color: projectColor.text,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.status}
                </div>
              </div>

              {/* Progress */}
              <div>
                <Progress
                  percent={project.progress}
                  strokeColor="#5b7aed"
                  trailColor="#e8eefb"
                  format={() => null}
                />
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <Text type="secondary" style={{ color: "#7f8c8d" }}>Tamamlanma</Text>
                  <Text style={{ color: "#5b7aed", fontWeight: 600 }}>
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
