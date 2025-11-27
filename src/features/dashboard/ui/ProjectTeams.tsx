import React from "react";
import { Typography, Tag } from "antd";
import { RoleBadge, UserAvatar } from "@/shared/ui";
import { colorPalette } from "@/shared/styles/styleConstants";
import { listStyles } from "@/shared/styles/componentStyles";
import { getTeamStatusStyle } from "@/shared/styles/styleHelpers";
import { getUserByName, type ProjectTeam } from "@/shared/data/mockData";

const { Text } = Typography;

interface ProjectTeamsProps {
  teams: ProjectTeam[];
}

export const ProjectTeams: React.FC<ProjectTeamsProps> = ({ teams }) => {
  const renderPeople = (team: ProjectTeam) => {
    const visible = team.people.slice(0, 3);
    const remaining = Math.max(team.members - visible.length, 0);

    return (
      <div style={listStyles.teamList.avatarRow}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {visible.map((person) => {
            const userInfo = getUserByName(person.name);
            return (
              <UserAvatar
                key={person.name}
                size={40}
                backgroundColor={person.color}
                avatarUrl={userInfo?.avatarUrl}
                user={{ name: person.name }}
                style={{
                  marginLeft: -8,
                  border: "2px solid white",
                }}
              />
            );
          })}
        </div>

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
                    border: statusStyle.border
                      ? `1px solid ${statusStyle.border}`
                      : "none",
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
