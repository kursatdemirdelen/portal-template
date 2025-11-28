import React from "react";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  List,
  Progress,
  Row,
  Space,
  Switch,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  ApiOutlined,
  BellOutlined,
  CloudOutlined,
  EditOutlined,
  GithubOutlined,
  LaptopOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  QrcodeOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SlackOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { colors as colorPalette, spacing } from "@/shared/styles";
import {
  mockProfileSummary,
  mockProfileStats,
  mockNotificationPreferences,
  mockSecurityChecklist,
  mockActivityTimeline,
  mockSessions,
  mockConnectedApps,
} from "@/shared/data/mocks";

const { Text, Title } = Typography;

// Icon mapper for connected apps
const getAppIcon = (iconType: string) => {
  switch (iconType) {
    case "slack":
      return <SlackOutlined />;
    case "api":
      return <ApiOutlined />;
    case "github":
      return <GithubOutlined />;
    default:
      return <CloudOutlined />;
  }
};

// Tone mapper for security checklist
const getToneColor = (tone: string) => {
  switch (tone) {
    case "success":
      return colorPalette.success;
    case "warning":
      return colorPalette.warning;
    case "info":
      return colorPalette.info;
    default:
      return colorPalette.textSecondary;
  }
};

const ProfilePage: React.FC = () => (
  <PageContainer
    title="Profil"
    subtitle="Hesap bilgilerinizi, iletişim ve güvenlik tercihlerinizi yönetin"
    extra={
      <Space>
        <Button icon={<ShareAltOutlined />}>Dışa paylaş</Button>
        <Button type="primary" icon={<EditOutlined />}>
          Bilgileri güncelle
        </Button>
      </Space>
    }
  >
    <Row gutter={[24, 24]}>
      <Col xs={24} xl={16}>
        <SectionCard>
          <Row gutter={[24, 24]} align="middle">
            <Col>
              <Avatar
                size={84}
                style={{
                  background: colorPalette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                KD
              </Avatar>
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size={spacing.sm}>
                <div>
                  <Title level={3} style={{ marginBottom: 4 }}>
                    {mockProfileSummary.name}
                  </Title>
                  <Text type="secondary">{mockProfileSummary.title}</Text>
                </div>
                <Space wrap>
                  <Tag color={colorPalette.primary}>Admin</Tag>
                  <Tag icon={<TeamOutlined />} color={colorPalette.info}>
                    {mockProfileSummary.squad[0]}
                  </Tag>
                  <Tag color={colorPalette.success}>
                    {mockProfileSummary.location}
                  </Tag>
                  <Tag icon={<SettingOutlined />} color={colorPalette.warning}>
                    {mockProfileSummary.timezone}
                  </Tag>
                </Space>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            {mockProfileStats.map((stat) => (
              <Col xs={24} sm={8} key={stat.label}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {stat.label}
                  </Text>
                  <Title level={4} style={{ margin: 4 }}>
                    {stat.value}
                  </Title>
                  <Text
                    style={{ fontSize: 12, color: colorPalette.textSecondary }}
                  >
                    {stat.helper}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </SectionCard>

        <Row gutter={[24, 24]} style={{ marginTop: spacing["2xl"] }}>
          <Col xs={24} md={12}>
            <SectionCard title="İletişim ve Takım">
              <Descriptions
                column={1}
                colon={false}
                styles={{ label: { width: 140 } }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <MailOutlined />
                      E-posta
                    </Space>
                  }
                >
                  {mockProfileSummary.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <QrcodeOutlined />
                      Telefon
                    </Space>
                  }
                >
                  {mockProfileSummary.phone}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <TeamOutlined />
                      Takımlar
                    </Space>
                  }
                >
                  <Space wrap>
                    {mockProfileSummary.squad.map((team) => (
                      <Tag key={team}>{team}</Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <SettingOutlined />
                      Yönetici
                    </Space>
                  }
                >
                  {mockProfileSummary.manager}
                </Descriptions.Item>
                <Descriptions.Item label="Dil">
                  {mockProfileSummary.languages.join(", ")}
                </Descriptions.Item>
                <Descriptions.Item label="Başlangıç">
                  {mockProfileSummary.startDate}
                </Descriptions.Item>
              </Descriptions>
            </SectionCard>
          </Col>
          <Col xs={24} md={12}>
            <SectionCard title="Bildirim Tercihleri">
              <List
                dataSource={mockNotificationPreferences}
                split={false}
                renderItem={(pref) => (
                  <List.Item
                    key={pref.key}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    extra={<Switch defaultChecked={pref.enabled} />}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <BellOutlined />
                          {pref.label}
                        </Space>
                      }
                      description={
                        <div>
                          <Text>{pref.description}</Text>
                          <div
                            style={{
                              fontSize: 12,
                              color: colorPalette.textSecondary,
                            }}
                          >
                            Kanal: {pref.channel}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </SectionCard>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: spacing["2xl"] }}>
          <Col xs={24} lg={12}>
            <SectionCard title="Son Aktivite">
              <Timeline
                items={mockActivityTimeline.map((item) => ({
                  dot: <LockOutlined style={{ color: colorPalette.primary }} />,
                  children: (
                    <div>
                      <Text strong>{item.title}</Text>
                      <div
                        style={{
                          fontSize: 12,
                          color: colorPalette.textSecondary,
                        }}
                      >
                        {item.detail}
                      </div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        {item.time}
                      </div>
                    </div>
                  ),
                }))}
              />
            </SectionCard>
          </Col>
          <Col xs={24} lg={12}>
            <SectionCard title="Proaktif görevler">
              <List
                dataSource={[
                  "Yeni ekip üyelerini onboarding listesine aktar",
                  "Sprint bitişi için rapor şablonunu güncelle",
                  "Mentorluk oturumu planla",
                ]}
                renderItem={(task) => (
                  <List.Item>
                    <Space>
                      <Tag color={colorPalette.primary}>Sıra</Tag>
                      <Text>{task}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </SectionCard>
          </Col>
        </Row>
      </Col>

      <Col xs={24} xl={8}>
        <SectionCard title="Güvenlik durumu" extra={<Text strong>%86</Text>}>
          <Space
            direction="vertical"
            size={spacing.lg}
            style={{ width: "100%" }}
          >
            <div style={{ textAlign: "center" }}>
              <Progress
                type="dashboard"
                percent={86}
                strokeColor={colorPalette.success}
              />
              <Text type="secondary">Güvenlik kontrol listesi</Text>
            </div>
            <List
              dataSource={mockSecurityChecklist}
              split={false}
              renderItem={(item) => (
                <List.Item
                  key={item.label}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <List.Item.Meta
                    avatar={
                      <LockOutlined
                        style={{ color: getToneColor(item.tone), fontSize: 16 }}
                      />
                    }
                    title={item.label}
                    description={
                      <Text style={{ color: colorPalette.textSecondary }}>
                        {item.status}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Space>
        </SectionCard>

        <SectionCard
          title="Aktif oturumlar"
          style={{ marginTop: spacing["2xl"] }}
        >
          <List
            dataSource={mockSessions}
            renderItem={(session) => (
              <List.Item
                key={session.id}
                actions={[
                  <Button type="link" size="small" key="terminate">
                    Sonlandır
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    session.type === "desktop" ? (
                      <LaptopOutlined
                        style={{ fontSize: 18, color: colorPalette.primary }}
                      />
                    ) : (
                      <MobileOutlined
                        style={{ fontSize: 18, color: colorPalette.primary }}
                      />
                    )
                  }
                  title={
                    <Space>
                      <Text strong>{session.label}</Text>
                      {session.trusted ? (
                        <Tag color={colorPalette.success}>Güvenli</Tag>
                      ) : (
                        <Tag color={colorPalette.warning}>İncele</Tag>
                      )}
                    </Space>
                  }
                  description={
                    <div style={{ fontSize: 12 }}>
                      <div>{session.location}</div>
                      <div>IP: {session.ip}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </SectionCard>

        <SectionCard
          title="Bağlı servisler"
          style={{ marginTop: spacing["2xl"] }}
        >
          <List
            dataSource={mockConnectedApps}
            renderItem={(app) => (
              <List.Item
                key={app.id}
                actions={[
                  <Button
                    type="link"
                    size="small"
                    icon={<CloudOutlined />}
                    key="manage"
                  >
                    Ayarları yönet
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ fontSize: 18, color: colorPalette.primary }}>
                      {getAppIcon(app.iconType)}
                    </div>
                  }
                  title={app.name}
                  description={
                    <div style={{ fontSize: 12 }}>
                      <div>{app.description}</div>
                      <Text type="secondary">Durum: {app.status}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </SectionCard>
      </Col>
    </Row>
  </PageContainer>
);

export default ProfilePage;
