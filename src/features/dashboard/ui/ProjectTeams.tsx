import React, { useState } from "react";
import { Row, Col, Typography, theme } from "antd";
import { UserAvatar } from "@/shared/ui";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";
import { getTeamStatusStyle } from "@/shared/styles/styleHelpers";
import { getUserByName, type ProjectTeam } from "@/shared/data/mockData";

const { Text } = Typography;

interface ProjectTeamsProps {
  teams: ProjectTeam[];
  maxTeams?: number;
}

export const ProjectTeams: React.FC<ProjectTeamsProps> = ({
  teams,
  maxTeams = 4,
}) => {
  const { token } = theme.useToken();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const displayTeams = teams.slice(0, maxTeams);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "onhold":
        return "Beklemede";
      case "completed":
        return "Tamamlandı";
      default:
        return status;
    }
  };

  const renderPeople = (team: ProjectTeam) => {
    const visible = team.people.slice(0, 5);
    const remaining = Math.max(team.members - visible.length, 0);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {visible.map((person, index) => {
          const userInfo = getUserByName(person.name);
          return (
            <UserAvatar
              key={person.name}
              size={28}
              backgroundColor={person.color}
              avatarUrl={userInfo?.avatarUrl}
              user={{ name: person.name }}
              style={{
                marginLeft: index === 0 ? 0 : -8,
                border: "2px solid white",
              }}
            />
          );
        })}
        {remaining > 0 && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: colorPalette.primaryLighter,
              color: colorPalette.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: -8,
              border: "2px solid white",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  };

  return (
    <Row gutter={[12, 12]}>
      {displayTeams.map((team) => {
        const statusStyle = getTeamStatusStyle(team.status);
        const isHovered = hoveredId === team.id;

        return (
          <Col key={team.id} xs={24} sm={12}>
            <div
              onMouseEnter={() => setHoveredId(team.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: isHovered
                  ? "#f8fafc"
                  : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: `1px solid ${
                  isHovered ? colorPalette.primaryLight : "#e8eefb"
                }`,
                borderRadius: 10,
                padding: 12,
                height: "100%",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {/* Header: Team Name + Status */}
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
                      color: colorPalette.textPrimary,
                      fontWeight: 600,
                      display: "block",
                      fontSize: 13,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={team.name}
                  >
                    {team.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: colorPalette.textSecondary,
                    }}
                    title={team.projectName}
                  >
                    {team.projectName}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "3px 8px",
                    background: statusStyle.bg,
                    borderRadius: 4,
                    fontSize: 10,
                    color: statusStyle.text,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {getStatusLabel(team.status)}
                </div>
              </div>

              {/* Footer: Members */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                {renderPeople(team)}
                <Text
                  style={{
                    fontSize: 10,
                    color: colorPalette.textMuted,
                  }}
                >
                  {team.members} üye
                </Text>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
