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
import { colorPalette, spacing } from "@/shared/styles/styleConstants";

const { Text, Title } = Typography;

const profileSummary = {
  name: "Kürşat Demirdelen",
  title: "Dijital Portal Ürün Yöneticisi",
  email: "kursat.demirdelen@portal.dev",
  phone: "+90 555 123 45 67",
  location: "İstanbul, Türkiye",
  timezone: "GMT+3 · TR",
  squad: ["Merkez Portal Takımı", "Deneyim Platformu"],
  languages: ["Türkçe", "İngilizce"],
  manager: "Elif Kaya",
  startDate: "Mayıs 2020",
};

const statHighlights = [
  { label: "Kapatılan talepler", value: "128", helper: "Son 30 günde +12%" },
  { label: "Aktif projeler", value: "6", helper: "Portal, CRM, İK" },
  { label: "Eğitim kredisi", value: "18", helper: "2 modülle kullanılabilir" },
];

const preferenceToggles = [
  {
    key: "productUpdates",
    label: "Ürün güncellemeleri",
    description: "Versiyon notları ve planlı bakım duyuruları",
    channel: "E-posta",
    enabled: true,
  },
  {
    key: "ticketMentions",
    label: "Ticket mention uyarısı",
    description: "Adınız geçen yorumlarda anlık mobil bildirim",
    channel: "Mobil bildirim",
    enabled: true,
  },
  {
    key: "digest",
    label: "Haftalık özet",
    description: "Takım aktivitesi ve sprint raporu",
    channel: "E-posta",
    enabled: false,
  },
];

const securityChecklist = [
  {
    label: "İki adımlı doğrulama",
    status: "Aktif",
    tone: colorPalette.success,
  },
  {
    label: "Kilitli oturumlar",
    status: "Yok",
    tone: colorPalette.success,
  },
  {
    label: "Yedek kodlar",
    status: "30 gün önce yenilendi",
    tone: colorPalette.warning,
  },
  {
    label: "Cihaz güveni",
    status: "3 yetkili cihaz",
    tone: colorPalette.info,
  },
];

const activityTimeline = [
  {
    title: "Bildirim tercihleri güncellendi",
    time: "Bugün, 09:24",
    detail: "Slack mention tetikleyicisi aktifleştirildi",
  },
  {
    title: "Yeni cihaz doğrulandı",
    time: "Dün, 21:12",
    detail: "iOS uygulamasından giriş onaylandı",
  },
  {
    title: "Takım odağı güncellendi",
    time: "22 Şubat",
    detail: "Deneyim Platformu ekibine atandı",
  },
  {
    title: "Güvenlik taraması tamamlandı",
    time: "18 Şubat",
    detail: "Parola ve token setleri yenilendi",
  },
];

const sessions = [
  {
    id: "desktop",
    label: "Chrome - Windows",
    location: "İstanbul - 10 dk önce",
    ip: "10.24.32.11",
    type: "desktop",
    trusted: true,
  },
  {
    id: "mobile",
    label: "Portal Mobile - iOS",
    location: "Kadıköy - 2 saat önce",
    ip: "10.18.10.4",
    type: "mobile",
    trusted: true,
  },
  {
    id: "edge",
    label: "Edge - Windows",
    location: "Ankara - 1 gün önce",
    ip: "10.44.12.98",
    type: "desktop",
    trusted: false,
  },
];

const connectedApps = [
  {
    id: "slack",
    name: "Slack",
    description: "Mention ve ticket bildirimleri",
    status: "Gerçek zamanlı",
    icon: <SlackOutlined />,
  },
  {
    id: "jira",
    name: "Jira Cloud",
    description: "Sprint planlama ve issue senkronu",
    status: "Günde 3 kez",
    icon: <ApiOutlined />,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Pull request ve deploy bağlantıları",
    status: "Aktif",
    icon: <GithubOutlined />,
  },
];

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
                    {profileSummary.name}
                  </Title>
                  <Text type="secondary">{profileSummary.title}</Text>
                </div>
                <Space wrap>
                  <Tag color={colorPalette.primary}>Admin</Tag>
                  <Tag icon={<TeamOutlined />} color={colorPalette.info}>
                    {profileSummary.squad[0]}
                  </Tag>
                  <Tag color={colorPalette.success}>{profileSummary.location}</Tag>
                  <Tag icon={<SettingOutlined />} color={colorPalette.warning}>
                    {profileSummary.timezone}
                  </Tag>
                </Space>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            {statHighlights.map((stat) => (
              <Col xs={24} sm={8} key={stat.label}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {stat.label}
                  </Text>
                  <Title level={4} style={{ margin: 4 }}>
                    {stat.value}
                  </Title>
                  <Text style={{ fontSize: 12, color: colorPalette.textSecondary }}>
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
              <Descriptions column={1} colon={false} styles={{ label: { width: 140 } }}>
                <Descriptions.Item label={<Space><MailOutlined />E-posta</Space>}>
                  {profileSummary.email}
                </Descriptions.Item>
                <Descriptions.Item label={<Space><QrcodeOutlined />Telefon</Space>}>
                  {profileSummary.phone}
                </Descriptions.Item>
                <Descriptions.Item label={<Space><TeamOutlined />Takımlar</Space>}>
                  <Space wrap>
                    {profileSummary.squad.map((team) => (
                      <Tag key={team}>{team}</Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label={<Space><SettingOutlined />Yönetici</Space>}>
                  {profileSummary.manager}
                </Descriptions.Item>
                <Descriptions.Item label="Dil">
                  {profileSummary.languages.join(", ")}
                </Descriptions.Item>
                <Descriptions.Item label="Başlangıç">
                  {profileSummary.startDate}
                </Descriptions.Item>
              </Descriptions>
            </SectionCard>
          </Col>
          <Col xs={24} md={12}>
            <SectionCard title="Bildirim Tercihleri">
              <List
                dataSource={preferenceToggles}
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
                          <div style={{ fontSize: 12, color: colorPalette.textSecondary }}>
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
                items={activityTimeline.map((item) => ({
                  dot: <LockOutlined style={{ color: colorPalette.primary }} />,
                  children: (
                    <div>
                      <Text strong>{item.title}</Text>
                      <div style={{ fontSize: 12, color: colorPalette.textSecondary }}>{item.detail}</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>{item.time}</div>
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
          <Space direction="vertical" size={spacing.lg} style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Progress type="dashboard" percent={86} strokeColor={colorPalette.success} />
              <Text type="secondary">Güvenlik kontrol listesi</Text>
            </div>
            <List
              dataSource={securityChecklist}
              split={false}
              renderItem={(item) => (
                <List.Item key={item.label} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <List.Item.Meta
                    avatar={<LockOutlined style={{ color: item.tone, fontSize: 16 }} />}
                    title={item.label}
                    description={<Text style={{ color: colorPalette.textSecondary }}>{item.status}</Text>}
                  />
                </List.Item>
              )}
            />
          </Space>
        </SectionCard>

        <SectionCard title="Aktif oturumlar" style={{ marginTop: spacing["2xl"] }}>
          <List
            dataSource={sessions}
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
                      <LaptopOutlined style={{ fontSize: 18, color: colorPalette.primary }} />
                    ) : (
                      <MobileOutlined style={{ fontSize: 18, color: colorPalette.primary }} />
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

        <SectionCard title="Bağlı servisler" style={{ marginTop: spacing["2xl"] }}>
          <List
            dataSource={connectedApps}
            renderItem={(app) => (
              <List.Item
                key={app.id}
                actions={[
                  <Button type="link" size="small" icon={<CloudOutlined />} key="manage">
                    Ayarları yönet
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<div style={{ fontSize: 18, color: colorPalette.primary }}>{app.icon}</div>}
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
