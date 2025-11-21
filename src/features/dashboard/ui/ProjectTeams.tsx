import React from "react";
import { Typography, Tag, Avatar } from "antd";
import { RoleBadge } from "@/shared/ui";
import { colorPalette } from "@/shared/styles/styleConstants";
import { listStyles } from "@/shared/styles/componentStyles";
import { getTeamStatusStyle } from "@/shared/styles/styleHelpers";

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
  const renderPeople = (team: ProjectTeam) => {
    const visible = team.people.slice(0, 3);
    const remaining = Math.max(team.members - visible.length, 0);

    return (
      <div style={listStyles.teamList.avatarRow}>
        <Avatar.Group
          max={{
            count: 3,
            style: {
              background: colorPalette.primaryLighter,
              color: colorPalette.primary,
            },
          }}
          size={44}
        >
          {visible.map((person) => (
            <Avatar
              key={person.name}
              size={40}
              src={person.avatarUrl}
              style={{
                ...listStyles.teamList.avatar,
                background: person.color,
              }}
            >
              {person.initials}
            </Avatar>
          ))}
        </Avatar.Group>

        {remaining > 0 && (
          <Tag
            style={{
              ...listStyles.teamList.remainingTag,
              border: "none",
              color: colorPalette.primary,
              background: colorPalette.primaryLighter,
            }}
          >
            +{remaining}
          </Tag>
        )}
      </div>
    );
  };

  return (
    <div style={listStyles.teamList.container}>
      <div style={listStyles.teamList.headerRow}>
        <span>Proje Ekip Adi</span>
        <span>Proje</span>
        <span>Kisiler</span>
      </div>

      {teams.map((team, index) => {
        const statusStyle = getTeamStatusStyle(team.status);
        return (
          <div
            key={team.id}
            style={{
              ...listStyles.teamList.row,
              background:
                index % 2 === 0
                  ? listStyles.teamList.rowBackgrounds.even
                  : listStyles.teamList.rowBackgrounds.odd,
            }}
          >
            <div style={listStyles.teamList.infoColumn}>
              <Text style={listStyles.teamList.name}>{team.name}</Text>
              <div style={listStyles.teamList.metaRow}>
                <Tag
                  style={{
                    ...listStyles.teamList.statusTag,
                    background: statusStyle.bg,
                    color: statusStyle.text,
                    border: statusStyle.border ? `1px solid ${statusStyle.border}` : "none",
                  }}
                >
                  {team.status}
                </Tag>
                <RoleBadge role={team.role} />
              </div>
            </div>

            <Text style={listStyles.teamList.project}>{team.projectName}</Text>

            {renderPeople(team)}
          </div>
        );
      })}
    </div>
  );
};
