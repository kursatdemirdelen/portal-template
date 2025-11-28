/**
 * Proje Ekibi Düzenleme Sayfası - Kompakt Layout
 */

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  message,
  Empty,
  Spin,
  Card,
  Grid,
} from "antd";
import { Save, ArrowLeft, Users, Crown, X, UserPlus } from "lucide-react";
import { PageContainer, UserAvatar } from "@/shared/ui";
import {
  backgrounds,
  borderColors,
  colors as colorPalette,
  hexToRgba,
  spacing,
  radius,
} from "@/shared/styles";
import { PROJECTS, AVAILABLE_USERS, TEAM_ROLES } from "../ui/constants";
import type { TeamMemberItemData } from "../ui/TeamMemberItem";
import { getProjectTeamById } from "../model";

const { TextArea } = Input;
const { Text } = Typography;
const { useBreakpoint } = Grid;

// Rol seçenekleri - merkezi TEAM_ROLES'dan oluşturulur
const ROLE_OPTIONS = TEAM_ROLES.map((role) => ({ value: role, label: role }));

interface FormValues {
  name: string;
  projectId: string;
  description: string;
  leaderId: string;
}

// Kompakt üye kartı
const CompactMemberCard: React.FC<{
  member: TeamMemberItemData;
  isLeader: boolean;
  onRoleChange: (role: string) => void;
  onRemove: () => void;
}> = ({ member, isLeader, onRoleChange, onRemove }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 12px",
      background: isLeader ? backgrounds.warningBg : backgrounds.neutral100,
      borderRadius: radius.md,
      border: `1px solid ${
        isLeader ? hexToRgba(colorPalette.warning, 0.45) : borderColors.light
      }`,
    }}
  >
    <UserAvatar
      user={{ name: member.name, avatarUrl: member.avatarUrl }}
      backgroundColor={member.color}
      size={32}
    />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Text strong style={{ fontSize: 13 }} ellipsis>
          {member.name}
        </Text>
        {isLeader && <Crown size={12} color={colorPalette.warning} />}
      </div>
    </div>
    <Select
      size="small"
      value={member.role}
      onChange={onRoleChange}
      options={ROLE_OPTIONS}
      style={{ width: 110 }}
      variant="borderless"
    />
    <Button
      type="text"
      size="small"
      icon={<X size={14} />}
      onClick={onRemove}
      style={{ color: colorPalette.textTertiary }}
    />
  </div>
);

export const ProjectTeamEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [form] = Form.useForm<FormValues>();
  const [members, setMembers] = useState<TeamMemberItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const isMobile = !screens.md;
  const team = getProjectTeamById(id || "");

  // Mevcut ekip verilerini yükle
  useEffect(() => {
    if (team) {
      form.setFieldsValue({
        name: team.name,
        projectId: team.projectId,
        description: team.description,
        leaderId: team.leaderId,
      });

      const memberData: TeamMemberItemData[] = team.members.map((m) => ({
        id: m.id,
        name: m.name,
        email: `${m.name.toLowerCase().replace(/\s/g, ".")}@example.com`,
        avatarUrl: m.avatarUrl,
        color: m.color,
        role: m.role,
      }));
      // Defer state updates to avoid synchronous setState within effect
      setTimeout(() => {
        setMembers(memberData);
        setInitialLoading(false);
      }, 0);
    } else {
      setTimeout(() => setInitialLoading(false), 0);
    }
  }, [id, form, team]);

  // Üye ekleme
  const handleAddMember = (userId: string) => {
    const user = AVAILABLE_USERS.find((u) => u.id === userId);
    if (!user) return;

    const newMember: TeamMemberItemData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      color: user.color,
      role: "Developer",
    };
    setMembers((prev) => [...prev, newMember]);
    message.success(`${user.name} eklendi`);
  };

  // Üye rolü değiştirme
  const handleRoleChange = (memberId: string, role: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m))
    );
  };

  // Üye kaldırma
  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    const currentLeaderId = form.getFieldValue("leaderId");
    if (currentLeaderId === memberId) {
      form.setFieldValue("leaderId", undefined);
    }
  };

  // Lider seçenekleri
  const leaderOptions = useMemo(() => {
    return members.map((m) => ({
      value: m.id,
      label: m.name,
    }));
  }, [members]);

  // Kullanılabilir üyeler (henüz eklenmemiş)
  const availableMembers = useMemo(() => {
    const selectedIds = members.map((m) => m.id);
    return AVAILABLE_USERS.filter((u) => !selectedIds.includes(u.id));
  }, [members]);

  // Form gönderimi
  const handleSubmit = async (values: FormValues) => {
    if (members.length === 0) {
      message.error("En az bir ekip üyesi eklemelisiniz");
      return;
    }

    if (!values.leaderId) {
      message.error("Ekip lideri seçmelisiniz");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    message.success("Proje ekibi başarıyla güncellendi!");
    setLoading(false);
    navigate(`/project-teams/${id}`);
  };

  if (initialLoading) {
    return (
      <PageContainer title="Ekip Düzenle">
        <div style={{ textAlign: "center", padding: spacing.xl }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!team) {
    return (
      <PageContainer title="Ekip Düzenle">
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

  return (
    <PageContainer
      title={`${team.name} - Düzenle`}
      breadcrumbs={[
        { title: "Proje Ekipleri", href: "/project-teams" },
        { title: team.name, href: `/project-teams/${id}` },
        { title: "Düzenle" },
      ]}
      extra={
        <Button
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(`/project-teams/${id}`)}
        >
          Geri
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          {/* Sol Panel - Form */}
          <Col xs={24} lg={10}>
            <Card
              size="small"
              title="Ekip Bilgileri"
              style={{
                borderRadius: radius.lg,
                border: `1px solid ${borderColors.light}`,
              }}
              styles={{
                header: { borderBottom: `1px solid ${borderColors.light}` },
              }}
            >
              <Form.Item
                name="name"
                label="Ekip Adı"
                rules={[
                  { required: true, message: "Ekip adı zorunludur" },
                  { min: 3, message: "En az 3 karakter" },
                ]}
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Örn: Portal Support Team" />
              </Form.Item>

              <Form.Item
                name="projectId"
                label="Proje"
                rules={[{ required: true, message: "Proje seçin" }]}
                style={{ marginBottom: 12 }}
              >
                <Select
                  placeholder="Proje seçin"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={PROJECTS.map((p) => ({
                    value: p.id,
                    label: p.name,
                  }))}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Açıklama"
                style={{ marginBottom: 12 }}
              >
                <TextArea
                  placeholder="Ekip hakkında kısa açıklama..."
                  rows={2}
                  showCount
                  maxLength={150}
                />
              </Form.Item>

              <Form.Item
                name="leaderId"
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Crown size={14} color={colorPalette.warning} />
                    Ekip Lideri
                  </span>
                }
                rules={[{ required: true, message: "Lider seçin" }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  placeholder={
                    members.length === 0 ? "Önce üye ekleyin" : "Lider seçin"
                  }
                  disabled={members.length === 0}
                  options={leaderOptions}
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Sağ Panel - Üyeler */}
          <Col xs={24} lg={14}>
            <Card
              size="small"
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Users size={16} color={colorPalette.primary} />
                  <span>Ekip Üyeleri</span>
                  {members.length > 0 && (
                    <span
                      style={{
                        background: colorPalette.primaryLighter,
                        color: colorPalette.primary,
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {members.length}
                    </span>
                  )}
                </div>
              }
              style={{
                borderRadius: radius.lg,
                border: `1px solid ${borderColors.light}`,
              }}
              styles={{
                header: { borderBottom: `1px solid ${borderColors.light}` },
              }}
            >
              {/* Üye Ekleme */}
              <div style={{ marginBottom: 12 }}>
                <Select
                  placeholder="Üye ara ve ekle..."
                  showSearch
                  value={undefined}
                  onChange={handleAddMember}
                  filterOption={(input, option) =>
                    (option?.label as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={availableMembers.map((u) => ({
                    value: u.id,
                    label: u.name,
                  }))}
                  style={{ width: "100%" }}
                  suffixIcon={<UserPlus size={16} />}
                  notFoundContent="Tüm kullanıcılar eklendi"
                />
              </div>

              {/* Üye Listesi */}
              {members.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Henüz üye eklenmedi"
                  style={{ padding: "20px 0" }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    maxHeight: isMobile ? "auto" : 280,
                    overflowY: "auto",
                  }}
                >
                  {members.map((member) => (
                    <CompactMemberCard
                      key={member.id}
                      member={member}
                      isLeader={form.getFieldValue("leaderId") === member.id}
                      onRoleChange={(role) => handleRoleChange(member.id, role)}
                      onRemove={() => handleRemoveMember(member.id)}
                    />
                  ))}
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Actions - Sticky Footer */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            marginTop: 16,
            paddingTop: 16,
            borderTop: `1px solid ${borderColors.light}`,
          }}
        >
          <Button onClick={() => navigate(`/project-teams/${id}`)}>
            İptal
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<Save size={16} />}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default ProjectTeamEditPage;
