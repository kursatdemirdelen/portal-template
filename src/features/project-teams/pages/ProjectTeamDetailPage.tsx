/**
 * Proje Ekip Detay Sayfası - Minimal Style
 */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Row, Col, Card, Tooltip, Grid } from "antd";
import { Edit, ArrowLeft, Users, Crown, Calendar } from "lucide-react";
import { PageContainer, UserAvatar } from "@/shared/ui";
import {
  colors as colorPalette,
  spacing,
  radius,
  shadows,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import { getProjectTeamById } from "../model";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export const ProjectTeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const team = getProjectTeamById(id || "");

  if (!team) {
    return (
      <PageContainer title="Proje Ekip Detayı">
        <Card
          style={{
            borderRadius: radius.lg,
            border: `1px solid ${borderColors.light}`,
          }}
        >
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <Text type="secondary">Ekip bulunamadı.</Text>
            <div style={{ marginTop: spacing.lg }}>
              <Button type="primary" onClick={() => navigate("/project-teams")}>
                Ekip Listesine Dön
              </Button>
            </div>
          </div>
        </Card>
      </PageContainer>
    );
  }

  const leader = team.members.find((m) => m.id === team.leaderId);

  return (
    <PageContainer
      title={team.name}
      breadcrumbs={[
        { title: "Proje Ekipleri", href: "/project-teams" },
        { title: team.name },
      ]}
      extra={
        <div style={{ display: "flex", gap: spacing.sm }}>
          <Button
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate("/project-teams")}
          >
            Geri
          </Button>
          <Button
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => navigate(`/project-teams/${id}/edit`)}
          >
            Düzenle
          </Button>
        </div>
      }
    >
      {/* Info Header */}
      <Card
        style={{
          borderRadius: radius.lg,
          border: `1px solid ${borderColors.light}`,
          marginBottom: spacing.lg,
        }}
        styles={{ body: { padding: isMobile ? spacing.md : spacing.lg } }}
      >
        <Row gutter={[24, 16]} align="top">
          {/* Left - Team Info */}
          <Col xs={24} md={16}>
            <div style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: colorPalette.textSecondary,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {team.projectName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colorPalette.textPrimary,
                  lineHeight: 1.6,
                }}
              >
                {team.description}
              </Text>
            </div>

            {/* Quick Stats */}
            <div
              style={{
                display: "flex",
                gap: spacing.lg,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colorPalette.primary,
                  }}
                />
                <Text
                  style={{ fontSize: 13, color: colorPalette.textSecondary }}
                >
                  <strong style={{ color: colorPalette.textPrimary }}>
                    {team.members.length}
                  </strong>{" "}
                  üye
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={14} color={colorPalette.textSecondary} />
                <Text
                  style={{ fontSize: 13, color: colorPalette.textSecondary }}
                >
                  {new Date(team.createdAt).toLocaleDateString("tr-TR")}
                </Text>
              </div>
            </div>
          </Col>

          {/* Right - Leader Card */}
          <Col xs={24} md={8}>
            {leader && (
              <div
                style={{
                  background: backgrounds.neutral100,
                  borderRadius: radius.md,
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <UserAvatar
                    size={48}
                    user={{ name: leader.name }}
                    avatarUrl={leader.avatarUrl}
                    backgroundColor={leader.color}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: colorPalette.textPrimary,
                        }}
                      >
                        {leader.name}
                      </Text>
                      <Crown size={14} color={colorPalette.warning} />
                    </div>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colorPalette.textSecondary,
                      }}
                    >
                      Ekip Lideri · {leader.role}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      {/* Team Members */}
      <div style={{ marginBottom: spacing.md }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: spacing.md,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Users size={18} color={colorPalette.textSecondary} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colorPalette.textPrimary,
              }}
            >
              Ekip Üyeleri
            </Text>
          </div>
          <Text style={{ fontSize: 13, color: colorPalette.textSecondary }}>
            {team.members.length} kişi
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {team.members.map((member) => {
            const isLeader = member.id === team.leaderId;
            return (
              <Col xs={12} sm={8} md={6} lg={4} key={member.id}>
                <Card
                  style={{
                    borderRadius: radius.lg,
                    border: `1px solid ${borderColors.light}`,
                    height: "100%",
                    transition: "all 0.2s ease",
                  }}
                  styles={{
                    body: { padding: "16px", textAlign: "center" },
                  }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = shadows.sm;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <UserAvatar
                      size={56}
                      user={{ name: member.name }}
                      avatarUrl={member.avatarUrl}
                      backgroundColor={member.color}
                    />
                    {isLeader && (
                      <Tooltip title="Ekip Lideri">
                        <div
                          style={{
                            position: "absolute",
                            bottom: -2,
                            right: -2,
                            background: colorPalette.warning,
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${backgrounds.card}`,
                          }}
                        >
                          <Crown size={10} color={backgrounds.card} />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <Text
                    style={{
                      fontWeight: 600,
                      display: "block",
                      marginTop: 10,
                      marginBottom: 2,
                      color: colorPalette.textPrimary,
                      fontSize: 13,
                    }}
                  >
                    {member.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: colorPalette.textSecondary,
                    }}
                  >
                    {member.role}
                  </Text>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </PageContainer>
  );
};

export default ProjectTeamDetailPage;
