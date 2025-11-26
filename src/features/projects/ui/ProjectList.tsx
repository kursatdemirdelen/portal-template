import React from "react";
import { Row, Col, Tag, Progress, Button, Space } from "antd";
import { TeamOutlined, CalendarOutlined } from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";
import { colorPalette } from "@/shared/styles/styleConstants";
import type { Project, ProjectStatus } from "../model/types";

const statusColors: Record<ProjectStatus, string> = {
  Active: "success",
  "On Hold": "warning",
  Completed: "default",
};

export interface ProjectListProps {
  projects: Project[];
  onDetails?: (project: Project) => void;
  onEdit?: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onDetails,
  onEdit,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {projects.map((project) => (
        <Col key={project.id} xs={24} sm={12} lg={8}>
          <SectionCard
            title={project.name}
            subtitle={project.description}
            padding="medium"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Tag color={statusColors[project.status]}>{project.status}</Tag>
                <span
                  style={{ color: colorPalette.textSecondary, fontSize: 12 }}
                >
                  ID: {project.code ?? project.id}
                </span>
              </div>

              <div>
                <div
                  style={{
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: colorPalette.textSecondary }}
                  >
                    İlerleme
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: colorPalette.primary,
                    }}
                  >
                    {project.progress}%
                  </span>
                </div>
                <Progress
                  percent={project.progress}
                  strokeColor={colorPalette.primary}
                  format={() => null}
                />
              </div>

              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <TeamOutlined
                      style={{ color: colorPalette.primary, fontSize: 14 }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: colorPalette.textSecondary,
                      }}
                    >
                      {project.teamSize} kişi
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <CalendarOutlined
                      style={{ color: colorPalette.primary, fontSize: 14 }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: colorPalette.textSecondary,
                      }}
                    >
                      {project.endDate}
                    </span>
                  </div>
                </Col>
              </Row>

              <Space style={{ width: "100%", marginTop: 8 }}>
                <Button
                  type="text"
                  size="small"
                  style={{ flex: 1 }}
                  onClick={() => onDetails?.(project)}
                >
                  Detaylar
                </Button>
                <Button
                  type="text"
                  size="small"
                  style={{ flex: 1 }}
                  onClick={() => onEdit?.(project)}
                >
                  Düzenle
                </Button>
              </Space>
            </div>
          </SectionCard>
        </Col>
      ))}
    </Row>
  );
};
