import React from "react";
import { Typography, Tag, Avatar } from "antd";

const { Text } = Typography;

interface TeamMember {
  name: string;
  initials: string;
  color: string;
  avatarUrl?: string;
}

export interface ProjectTeam {
  id: string;
  name: string;
  projectName: string;
  role: string;
  members: number;
  status: "Aktif" | "Beklemede";
  people: TeamMember[];
}

interface ProjectTeamsProps {
  teams: ProjectTeam[];
}

export const ProjectTeams: React.FC<ProjectTeamsProps> = ({ teams }) => {
  const headerStyle = {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr",
    padding: "10px 16px",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontWeight: 600,
    color: "#6b7280",
  } as const;

  const renderPeople = (team: ProjectTeam) => {
    const visible = team.people.slice(0, 3);
    const remaining = Math.max(team.members - visible.length, 0);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar.Group
          max={{
            count: 3,
            style: { background: "#eef2ff", color: "#4338ca" },
          }}
          size={44}
        >
          {visible.map((person) => (
            <Avatar
              key={person.name}
              size={40}
              src={person.avatarUrl}
              style={{
                background: person.color,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {person.initials}
            </Avatar>
          ))}
        </Avatar.Group>

        {remaining > 0 && (
          <Tag
            color="#e0e7ff"
            style={{ borderRadius: 999, color: "#4338ca", padding: "4px 8px" }}
          >
            +{remaining}
          </Tag>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        border: "1px solid #e8eefb",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ ...headerStyle, background: "#f8fafc" }}>
        <span>Proje Ekip Adi</span>
        <span>Proje</span>
        <span>Kisiler</span>
      </div>

      {teams.map((team, index) => (
        <div
          key={team.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            padding: "14px 16px",
            alignItems: "center",
            borderTop: "1px solid #eef2ff",
            background: index % 2 === 0 ? "#ffffff" : "#fbfcff",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Text style={{ fontWeight: 600, color: "#1f2937" }}>
              {team.name}
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Tag
                color={team.status === "Aktif" ? "#d1fae5" : "#f3f4f6"}
                style={{
                  borderRadius: 999,
                  color: team.status === "Aktif" ? "#059669" : "#6b7280",
                }}
              >
                {team.status}
              </Tag>
              <Text type="secondary" style={{ color: "#64748b", fontSize: 12 }}>
                {team.role}
              </Text>
            </div>
          </div>

          <Text style={{ color: "#475569", fontWeight: 500 }}>
            {team.projectName}
          </Text>

          {renderPeople(team)}
        </div>
      ))}
    </div>
  );
};
