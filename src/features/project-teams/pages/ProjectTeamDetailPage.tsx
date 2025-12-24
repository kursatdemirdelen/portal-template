/**
 * Proje Ekip Detay Sayfası - Merkezi Stil Sistemi
 */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Row, Col, Card, Tooltip, Grid } from "antd";
import { Edit, ArrowLeft, Users, Crown, Calendar } from "lucide-react";
import { PageContainer, UserAvatar } from "@/shared/ui";
import { colors as colorPalette, spacing, radius } from "@/shared/styles";
import { teamDetailStyles as styles } from "../ui/teamDetailStyles";
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
        <Card style={styles.card}>
          <div style={styles.emptyState}>
            <Text type="secondary">Ekip bulunamadı.</Text>
            <div style={styles.emptyStateButton}>
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
        <div style={styles.actionsContainer}>
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
        style={styles.cardWithMargin}
        styles={{ body: { padding: isMobile ? spacing.md : spacing.lg } }}
      >
        <Row gutter={[24, 16]} align="top">
          {/* Left - Team Info */}
          <Col xs={24} md={16}>
            <div style={styles.infoBlock}>
              <Text style={styles.projectName}>{team.projectName}</Text>
              <Text style={styles.description}>{team.description}</Text>
            </div>

            {/* Quick Stats */}
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <div style={styles.statDot} />
                <Text style={styles.statText}>
                  <strong style={styles.statValue}>
                    {team.members.length}
                  </strong>{" "}
                  üye
                </Text>
              </div>
              <div style={styles.statItem}>
                <Calendar size={14} color={colorPalette.textSecondary} />
                <Text style={styles.statText}>
                  {new Date(team.createdAt).toLocaleDateString("tr-TR")}
                </Text>
              </div>
            </div>
          </Col>

          {/* Right - Leader Card */}
          <Col xs={24} md={8}>
            {leader && (
              <div style={styles.leaderCard}>
                <div style={styles.leaderContent}>
                  <UserAvatar
                    size={48}
                    user={{ name: leader.name }}
                    avatarUrl={leader.avatarUrl}
                    backgroundColor={leader.color}
                  />
                  <div style={styles.leaderInfo}>
                    <div style={styles.leaderNameRow}>
                      <Text style={styles.leaderName}>{leader.name}</Text>
                      <Crown size={14} color={colorPalette.warning} />
                    </div>
                    <Text style={styles.leaderRole}>
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
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleGroup}>
            <Users size={18} color={colorPalette.textSecondary} />
            <Text style={styles.sectionTitle}>Ekip Üyeleri</Text>
          </div>
          <Text style={styles.sectionCount}>{team.members.length} kişi</Text>
        </div>

        <Row gutter={[16, 16]}>
          {team.members.map((member) => {
            const isLeader = member.id === team.leaderId;
            return (
              <Col xs={12} sm={8} md={6} lg={4} key={member.id}>
                <Card
                  style={styles.memberCard}
                  styles={{
                    body: { padding: spacing.lg, textAlign: "center" },
                  }}
                  hoverable
                  onMouseEnter={(e) => {
                    Object.assign(
                      e.currentTarget.style,
                      styles.memberCardHover
                    );
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(
                      e.currentTarget.style,
                      styles.memberCardDefault
                    );
                  }}
                >
                  <div style={styles.memberAvatarWrapper}>
                    <UserAvatar
                      size={56}
                      user={{ name: member.name }}
                      avatarUrl={member.avatarUrl}
                      backgroundColor={member.color}
                    />
                    {isLeader && (
                      <Tooltip title="Ekip Lideri">
                        <div style={styles.leaderBadge}>
                          <Crown size={10} color="#fff" />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
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
