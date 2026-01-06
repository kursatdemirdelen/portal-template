/**
 * User Detail Page
 *
 * Kullanıcı detay görüntüleme sayfası - Premium Modern Tasarım
 */

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Tag,
  Button,
  Space,
  Spin,
  message,
  Typography,
  Timeline,
  Badge,
  Divider,
  Statistic,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  IdcardOutlined,
  BankOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  SafetyOutlined,
  FireOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@/shared/ui";
import { userService } from "@/shared/api/userService";
import type { User } from "../model";
import {
  ROLE_LABELS,
  ROLE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../ui/constants";
import { colors } from "@/shared/styles";

const { Title, Text, Paragraph } = Typography;

const UserDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Önce API'den dene
        const response = await userService.getUsers();
        let foundUser = response.data.find((u) => u.id === id);

        // Bulamazsa localStorage'dan bak
        if (!foundUser) {
          const storedUsers = localStorage.getItem("users");
          if (storedUsers) {
            const localUsers = JSON.parse(storedUsers);
            foundUser = localUsers.find((u: User) => u.id === id);
          }
        }

        if (foundUser) {
          setUser(foundUser);
        } else {
          message.error("Kullanıcı bulunamadı");
          navigate("/users");
        }
      } catch {
        message.error("Kullanıcı yüklenirken hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageContainer title="Kullanıcı Detayı">
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer
      title="Kullanıcı Profili"
      subtitle={user.name}
      extra={
        <Space size="middle">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/users")}
            size="large"
          >
            Geri
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/users/${id}/edit`)}
            size="large"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
              border: "none",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            }}
          >
            Profili Düzenle
          </Button>
        </Space>
      }
    >
      <Row gutter={[24, 24]}>
        {/* Sol Kolon - Birleşik Profil Kartı */}
        <Col xs={24} lg={10}>
          <Card
            style={{
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "none",
              overflow: "hidden",
              background: "white",
            }}
            bodyStyle={{ padding: 0 }}
          >
            {/* Header Section - Gradient Background */}
            <div
              style={{
                background: `linear-gradient(135deg, ${
                  ROLE_COLORS[user.role]
                } 0%, ${ROLE_COLORS[user.role]}cc 100%)`,
                padding: "40px 32px 80px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                }}
              />

              {/* Content */}
              <div
                style={{ position: "relative", zIndex: 1, textAlign: "center" }}
              >
                {/* Avatar with online badge */}
                <Badge
                  dot
                  status={user.status === "active" ? "success" : "default"}
                  offset={[-15, 140]}
                  style={{ width: 24, height: 24 }}
                >
                  <Avatar
                    size={160}
                    icon={<UserOutlined />}
                    src={user.avatar}
                    style={{
                      border: "6px solid white",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      background: user.avatar
                        ? "transparent"
                        : "rgba(255,255,255,0.3)",
                      fontSize: 70,
                      color: user.avatar ? undefined : "white",
                    }}
                  />
                </Badge>

                {/* Name & Role */}
                <Title
                  level={2}
                  style={{ color: "white", margin: "20px 0 8px" }}
                >
                  {user.name}
                </Title>

                <Space size="small" wrap style={{ justifyContent: "center" }}>
                  <Tag
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      color: "white",
                      fontSize: 14,
                      padding: "6px 16px",
                      borderRadius: 20,
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <IdcardOutlined /> {ROLE_LABELS[user.role]}
                  </Tag>
                  <Tag
                    style={{
                      background:
                        user.status === "active"
                          ? "rgba(82, 196, 26, 0.3)"
                          : "rgba(0,0,0,0.2)",
                      border: `1px solid ${
                        user.status === "active"
                          ? "rgba(82, 196, 26, 0.5)"
                          : "rgba(255,255,255,0.3)"
                      }`,
                      color: "white",
                      fontSize: 14,
                      padding: "6px 16px",
                      borderRadius: 20,
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CheckCircleOutlined /> {STATUS_LABELS[user.status]}
                  </Tag>
                </Space>
              </div>
            </div>

            {/* Info Section */}
            <div
              style={{
                padding: "32px",
                marginTop: -40,
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Contact Info Cards */}
              <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col span={24}>
                  <div
                    style={{
                      background: "#f8f9fa",
                      borderRadius: 12,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MailOutlined style={{ fontSize: 22, color: "white" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text
                        type="secondary"
                        style={{ fontSize: 12, display: "block" }}
                      >
                        E-posta Adresi
                      </Text>
                      <Text
                        strong
                        copyable
                        style={{
                          fontSize: 15,
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {user.email}
                      </Text>
                    </div>
                  </div>
                </Col>

                {user.phone && (
                  <Col span={24}>
                    <div
                      style={{
                        background: "#f8f9fa",
                        borderRadius: 12,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `linear-gradient(135deg, ${colors.success} 0%, #56ab2f 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <PhoneOutlined
                          style={{ fontSize: 22, color: "white" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, display: "block" }}
                        >
                          Telefon Numarası
                        </Text>
                        <Text
                          strong
                          copyable
                          style={{ fontSize: 15, display: "block" }}
                        >
                          {user.phone}
                        </Text>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>

              <Divider style={{ margin: "24px 0" }} />

              {/* Organization & Settings */}
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <div>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, display: "block", marginBottom: 8 }}
                  >
                    <BankOutlined /> ORGANİZASYON
                  </Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div>
                        <Text
                          type="secondary"
                          style={{ fontSize: 11, display: "block" }}
                        >
                          Şirket
                        </Text>
                        <Text strong style={{ fontSize: 14 }}>
                          {user.company || "—"}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Text
                          type="secondary"
                          style={{ fontSize: 11, display: "block" }}
                        >
                          Departman
                        </Text>
                        <Text strong style={{ fontSize: 14 }}>
                          {user.department || "—"}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, display: "block", marginBottom: 8 }}
                  >
                    <GlobalOutlined /> BÖLGESEL AYARLAR
                  </Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div>
                        <Text
                          type="secondary"
                          style={{ fontSize: 11, display: "block" }}
                        >
                          Dil
                        </Text>
                        <Text strong style={{ fontSize: 14 }}>
                          {user.language === "tr"
                            ? "🇹🇷 Türkçe"
                            : user.language === "en"
                            ? "🇬🇧 English"
                            : user.language || "—"}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Text
                          type="secondary"
                          style={{ fontSize: 11, display: "block" }}
                        >
                          Zaman Dilimi
                        </Text>
                        <Text strong style={{ fontSize: 14 }}>
                          {user.timezone || "UTC+3"}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, display: "block", marginBottom: 8 }}
                  >
                    <SafetyOutlined /> SİSTEM BİLGİLERİ
                  </Text>
                  <div
                    style={{
                      background: "#f5f5f5",
                      padding: "12px 16px",
                      borderRadius: 8,
                      fontFamily: "monospace",
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      Kullanıcı ID
                    </Text>
                    <br />
                    <Text code copyable style={{ fontSize: 13 }}>
                      {user.id}
                    </Text>
                  </div>
                </div>
              </Space>
            </div>
          </Card>
        </Col>

        {/* Sağ Kolon - Aktivite & Yetkiler */}
        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Aktivite Zaman Çizelgesi */}
            <Card
              title={
                <Space size="middle">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${colors.warning} 0%, #f093fb 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px ${colors.warning}30`,
                    }}
                  >
                    <ClockCircleOutlined
                      style={{ fontSize: 22, color: "white" }}
                    />
                  </div>
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      Aktivite Geçmişi
                    </Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      Kullanıcı etkileşim zaman çizelgesi
                    </Text>
                  </div>
                </Space>
              }
              style={{
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
              }}
              headStyle={{
                borderBottom: "2px solid #f0f0f0",
                padding: "24px",
              }}
              bodyStyle={{ padding: "32px" }}
            >
              <Timeline
                mode="left"
                items={[
                  {
                    dot: (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${colors.success} 0%, #56ab2f 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${colors.success}40`,
                        }}
                      >
                        <FireOutlined
                          style={{ fontSize: 18, color: "white" }}
                        />
                      </div>
                    ),
                    children: (
                      <div style={{ marginTop: 4 }}>
                        <Text strong style={{ fontSize: 16, display: "block" }}>
                          Son Giriş
                        </Text>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "Henüz giriş yapılmadı"}
                        </Text>
                      </div>
                    ),
                  },
                  {
                    dot: (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${colors.primary}40`,
                        }}
                      >
                        <EditOutlined
                          style={{ fontSize: 18, color: "white" }}
                        />
                      </div>
                    ),
                    children: (
                      <div style={{ marginTop: 4 }}>
                        <Text strong style={{ fontSize: 16, display: "block" }}>
                          Son Güncelleme
                        </Text>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {user.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Bilgi yok"}
                        </Text>
                      </div>
                    ),
                  },
                  {
                    dot: (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${colors.info} 0%, #4facfe 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${colors.info}40`,
                        }}
                      >
                        <CalendarOutlined
                          style={{ fontSize: 18, color: "white" }}
                        />
                      </div>
                    ),
                    children: (
                      <div style={{ marginTop: 4 }}>
                        <Text strong style={{ fontSize: 16, display: "block" }}>
                          Kayıt Tarihi
                        </Text>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Bilgi yok"}
                        </Text>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>

            {/* Rol & Yetkiler */}
            <Card
              style={{
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
              }}
              bodyStyle={{ padding: 0 }}
            >
              {/* Header with gradient */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${
                    ROLE_COLORS[user.role]
                  }15 0%, ${ROLE_COLORS[user.role]}05 100%)`,
                  padding: "24px",
                  borderBottom: `3px solid ${ROLE_COLORS[user.role]}`,
                }}
              >
                <Space size="middle" style={{ width: "100%" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${
                        ROLE_COLORS[user.role]
                      } 0%, ${ROLE_COLORS[user.role]}cc 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 6px 16px ${ROLE_COLORS[user.role]}40`,
                    }}
                  >
                    <SafetyOutlined style={{ fontSize: 32, color: "white" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text
                      type="secondary"
                      style={{ display: "block", fontSize: 13 }}
                    >
                      Kullanıcı Rolü ve Yetkileri
                    </Text>
                    <Title
                      level={3}
                      style={{
                        margin: 0,
                        color: ROLE_COLORS[user.role],
                      }}
                    >
                      {ROLE_LABELS[user.role]}
                    </Title>
                  </div>
                </Space>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <Paragraph
                  type="secondary"
                  style={{ marginBottom: 20, fontSize: 14 }}
                >
                  Bu kullanıcının rolüne atanmış tüm yetkileri ve erişim
                  haklarını görüntülemek için yetkiler sayfasını ziyaret
                  edebilirsiniz.
                </Paragraph>

                {/* Stats */}
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                  <Col xs={12} sm={8}>
                    <Card
                      size="small"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.primary}05 100%)`,
                        border: `1px solid ${colors.primary}30`,
                        borderRadius: 12,
                      }}
                    >
                      <Statistic
                        title={
                          <Text style={{ fontSize: 12 }}>Rol Seviyesi</Text>
                        }
                        value={
                          user.role === "admin"
                            ? "Üst"
                            : user.role === "manager"
                            ? "Orta"
                            : "Normal"
                        }
                        valueStyle={{
                          fontSize: 16,
                          color: colors.primary,
                          fontWeight: 600,
                        }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8}>
                    <Card
                      size="small"
                      style={{
                        background: `linear-gradient(135deg, ${colors.success}10 0%, ${colors.success}05 100%)`,
                        border: `1px solid ${colors.success}30`,
                        borderRadius: 12,
                      }}
                    >
                      <Statistic
                        title={<Text style={{ fontSize: 12 }}>Durum</Text>}
                        value={STATUS_LABELS[user.status]}
                        valueStyle={{
                          fontSize: 16,
                          color: STATUS_COLORS[user.status],
                          fontWeight: 600,
                        }}
                        prefix={<CheckCircleOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card
                      size="small"
                      style={{
                        background: `linear-gradient(135deg, ${colors.warning}10 0%, ${colors.warning}05 100%)`,
                        border: `1px solid ${colors.warning}30`,
                        borderRadius: 12,
                      }}
                    >
                      <Statistic
                        title={<Text style={{ fontSize: 12 }}>Erişim</Text>}
                        value="Tam Yetki"
                        valueStyle={{
                          fontSize: 16,
                          color: colors.warning,
                          fontWeight: 600,
                        }}
                      />
                    </Card>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<LinkOutlined />}
                  onClick={() => navigate("/permissions")}
                  style={{
                    height: 52,
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 500,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
                    border: "none",
                    boxShadow: `0 4px 16px ${colors.primary}40`,
                  }}
                >
                  Detaylı Yetki Bilgilerini Görüntüle
                </Button>
              </div>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserDetailPage;
