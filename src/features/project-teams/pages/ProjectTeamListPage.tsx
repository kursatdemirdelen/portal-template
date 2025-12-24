/**
 * Proje Ekip Listesi Sayfası - Minimal Pinterest Style
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Pagination,
  Grid,
  Input,
  Row,
  Col,
  Card,
  Tooltip,
  Typography,
  Empty,
} from "antd";
import { Plus, Users, Search, Crown, ChevronRight } from "lucide-react";
import { PageContainer, UserAvatar } from "@/shared/ui";
import {
  backgrounds,
  borderColors,
  colors as colorPalette,
  spacing,
  radius,
  shadows,
} from "@/shared/styles";
import { mockProjectTeamList } from "../model";
import type { ProjectTeamListItem } from "../model";

const { useBreakpoint } = Grid;
const { Text } = Typography;

// Team Card Component - Clean & Minimal
const TeamCard: React.FC<{
  team: ProjectTeamListItem;
  onClick: () => void;
}> = ({ team, onClick }) => {
  const leader = team.members.find((m) => m.id === team.leaderId);

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        borderRadius: radius.lg,
        border: `1px solid ${borderColors.light}`,
        background: backgrounds.card,
        height: "100%",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
      styles={{
        body: { padding: 0 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = shadows.md;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Content */}
      <div style={{ padding: spacing.xl }}>
        {/* Team Name & Project */}
        <div style={{ marginBottom: spacing.lg }}>
          <Text
            style={{
              color: colorPalette.textPrimary,
              fontWeight: 600,
              fontSize: 16,
              display: "block",
              marginBottom: spacing.xs,
            }}
          >
            {team.name}
          </Text>
          <Text style={{ fontSize: 13, color: colorPalette.textSecondary }}>
            {team.projectName}
          </Text>
        </div>

        {/* Leader */}
        {leader && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              marginBottom: spacing.lg,
              padding: `${spacing.sm}px ${spacing.md}px`,
              background: backgrounds.neutral50,
              borderRadius: radius.md,
            }}
          >
            <UserAvatar
              size={36}
              user={{ name: leader.name }}
              avatarUrl={leader.avatarUrl}
              backgroundColor={leader.color}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.xs,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: colorPalette.textPrimary,
                  }}
                >
                  {leader.name}
                </Text>
                <Crown size={12} color={colorPalette.warning} />
              </div>
              <Text style={{ fontSize: 11, color: colorPalette.textSecondary }}>
                Ekip Lideri
              </Text>
            </div>
          </div>
        )}

        {/* Members & Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {team.members.slice(0, 4).map((member, index) => (
              <Tooltip key={member.id} title={member.name}>
                <div style={{ marginLeft: index === 0 ? 0 : -8 }}>
                  <UserAvatar
                    size={30}
                    user={{ name: member.name }}
                    avatarUrl={member.avatarUrl}
                    backgroundColor={member.color}
                    style={{ border: `2px solid ${backgrounds.card}` }}
                  />
                </div>
              </Tooltip>
            ))}
            {team.memberCount > 4 && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: backgrounds.neutral100,
                  color: colorPalette.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: -8,
                  border: `2px solid ${backgrounds.card}`,
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                +{team.memberCount - 4}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
              color: colorPalette.textSecondary,
              fontSize: 12,
            }}
          >
            <Users size={14} />
            <span>{team.memberCount}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: `1px solid ${borderColors.light}`,
          padding: `${spacing.sm}px ${spacing.xl}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: backgrounds.cardAlt,
        }}
      >
        <Text style={{ fontSize: 12, color: colorPalette.textSecondary }}>
          Detayları görüntüle
        </Text>
        <ChevronRight size={16} color={colorPalette.textSecondary} />
      </div>
    </Card>
  );
};

export const ProjectTeamListPage: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const pageSize = 6;

  // Filtreleme
  const filteredTeams = mockProjectTeamList.filter(
    (team) =>
      team.name.toLowerCase().includes(searchText.toLowerCase()) ||
      team.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  // İstatistikler
  const stats = {
    total: mockProjectTeamList.length,
    totalMembers: mockProjectTeamList.reduce(
      (sum, t) => sum + t.memberCount,
      0
    ),
  };

  const handleViewDetail = (id: string) => {
    navigate(`/project-teams/${id}`);
  };

  const paginatedData = filteredTeams.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <PageContainer
      title="Proje Ekipleri"
      breadcrumbs={[
        { title: "Proje Ekibi", href: "/project-teams" },
        { title: "Ekip Listesi" },
      ]}
      extra={
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => navigate("/project-teams/create")}
        >
          Yeni Ekip
        </Button>
      }
    >
      {/* Header Stats Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: spacing.lg,
          flexWrap: "wrap",
          gap: spacing.md,
        }}
      >
        {/* Search */}
        <Input
          placeholder="Ekip veya proje ara..."
          prefix={<Search size={16} color={colorPalette.textSecondary} />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          allowClear
          style={{
            width: isMobile ? "100%" : 280,
            borderRadius: radius.md,
          }}
        />

        {/* Quick Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.xs }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: colorPalette.primary,
              }}
            />
            <Text style={{ fontSize: 13, color: colorPalette.textSecondary }}>
              <strong style={{ color: colorPalette.textPrimary }}>
                {stats.total}
              </strong>{" "}
              ekip
            </Text>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.xs }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: colorPalette.success,
              }}
            />
            <Text style={{ fontSize: 13, color: colorPalette.textSecondary }}>
              <strong style={{ color: colorPalette.textPrimary }}>
                {stats.totalMembers}
              </strong>{" "}
              üye
            </Text>
          </div>
        </div>
      </div>

      {/* Team Cards Grid */}
      {paginatedData.length === 0 ? (
        <Card
          style={{
            borderRadius: radius.lg,
            textAlign: "center",
            padding: spacing.xl,
            border: `1px solid ${borderColors.light}`,
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ekip bulunamadı"
          />
        </Card>
      ) : (
        <>
          <Row gutter={[20, 20]}>
            {paginatedData.map((team) => (
              <Col xs={24} sm={12} lg={8} key={team.id}>
                <TeamCard
                  team={team}
                  onClick={() => handleViewDetail(team.id)}
                />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {filteredTeams.length > pageSize && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: spacing.xl,
                gap: spacing.sm,
              }}
            >
              <Text style={{ fontSize: 13, color: colorPalette.textSecondary }}>
                Toplam {filteredTeams.length} ekip
              </Text>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredTeams.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
                size="small"
              />
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default ProjectTeamListPage;
