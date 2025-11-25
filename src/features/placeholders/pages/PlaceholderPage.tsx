import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Tag,
  Progress,
  Table,
  Button,
  Space,
  Steps,
  Statistic,
  Divider,
  Descriptions,
  Timeline,
  Avatar,
} from "antd";
import {
  PlusCircleOutlined,
  TeamOutlined,
  SettingOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  FieldTimeOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard, PlaceholderPage } from "@/shared/ui";
import { colorPalette, spacing } from "@/shared/styles/styleConstants";
import { PlaceholderCard } from "@/features/placeholders/ui/PlaceholderCard";

// Bilet Oluştur
const ticketChecklist = ["Özet", "Detaylar", "Öncelik", "Kategori", "İlgili proje", "Dosya ekle", "Atanan kişi"];

export const TicketsCreatePage = () => (
  <PageContainer title="Bilet Oluştur" subtitle="Yeni destek talebi başlatın">
    <SectionCard variant="default">
      <Steps
        current={1}
        items={[
          { title: "Temel Bilgiler" },
          { title: "Detay & Öncelik" },
          { title: "Atama" },
          { title: "Özet" },
        ]}
        style={{ marginBottom: spacing["2xl"] }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <Descriptions
            title="Form Alanları"
            bordered
            size="small"
            column={1}
            items={ticketChecklist.map((label) => ({ key: label, label, children: "—" }))}
          />
        </Col>
        <Col xs={24} md={10}>
          <List
            header={<Typography.Text strong>İpucu</Typography.Text>}
            dataSource={[
              "Öncelik ve kategori seçimi SLA'ya göre tetiklenir.",
              "İlgili proje seçildiğinde otomatik atama yapılabilir.",
              "Ek dosyalar 10MB ile sınırlıdır.",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
          <Space>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Taslak Oluştur
            </Button>
            <Button>Kaydet & Gönder</Button>
          </Space>
        </Col>
      </Row>
    </SectionCard>
  </PageContainer>
);

// Müşteri
const customers = [
  { name: "Acme Corp", contact: "Zeynep Demir", projects: 5, status: "aktif", segment: "Enterprise" },
  { name: "Globex", contact: "Ahmet Yılmaz", projects: 2, status: "beklemede", segment: "SMB" },
  { name: "Initech", contact: "Can Şimşek", projects: 3, status: "aktif", segment: "Mid" },
];

export const CustomersPage = () => (
  <PageContainer title="Müşteri" subtitle="Müşteri kayıtları">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing["2xl"] }}>
      <Col xs={24} sm={12} md={8}>
        <SectionCard variant="default">
          <Statistic title="Toplam Müşteri" value={customers.length} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <SectionCard variant="default">
          <Statistic title="Aktif Proje" value={10} />
        </SectionCard>
      </Col>
    </Row>
    <SectionCard variant="default">
      <List
        itemLayout="horizontal"
        dataSource={customers}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button size="small" key="projects" icon={<ApartmentOutlined />}>
                Projeler
              </Button>,
              <Button size="small" key="details">
                Detay
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.name.slice(0, 2).toUpperCase()}</Avatar>}
              title={item.name}
              description={`${item.contact} • ${item.projects} proje • ${item.segment}`}
            />
            <Tag color={item.status === "aktif" ? colorPalette.success : colorPalette.warning}>
              {item.status === "aktif" ? "Aktif" : "Beklemede"}
            </Tag>
          </List.Item>
        )}
      />
    </SectionCard>
  </PageContainer>
);

// Parametreler
const parameterItems = [
  {
    title: "Roller & ?zinler",
    desc: "Kullan?c? rolleri ve eri?im seviyeleri",
    icon: <SettingOutlined />,
  },
  {
    title: "Bildirimler",
    desc: "E-posta ve sistem bildirim tercihleri",
    icon: <AlertOutlined />,
  },
  {
    title: "SLA",
    desc: "Yan?t ve ??z?m s?releri",
    icon: <FieldTimeOutlined />,
  },
  {
    title: "Kategori & Etiketler",
    desc: "Bilet s?n?fland?rmalar?",
    icon: <FileTextOutlined />,
  },
];

export const ParametersPage = () => (
  <PageContainer title="Parametreler Y?netimi" subtitle="Sistem genel ayarlar?">
    <Row gutter={[16, 16]}>
      {parameterItems.map((item) => (
        <Col key={item.title} xs={24} sm={12} md={8}>
          <PlaceholderCard
            title={item.title}
            description={item.desc}
            icon={item.icon}
          >
            <Typography.Text type="secondary">
              Bu alan i?in yap?land?rma formu burada yer alacak.
            </Typography.Text>
          </PlaceholderCard>
        </Col>
      ))}
    </Row>
  </PageContainer>
);

// Proje Ekibi
const teamMembers = [
  { name: "Ayşe Kaya", role: "Product Owner", load: 70 },
  { name: "Mehmet Koç", role: "Developer", load: 50 },
  { name: "Selin Arda", role: "QA", load: 40 },
];

export const ProjectTeamPage = () => (
  <PageContainer title="Proje Ekibi" subtitle="Ekip üyeleri ve roller">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing["lg"] }}>
      {teamMembers.map((member) => (
        <Col key={member.name} xs={24} sm={12} md={8}>
          <Card title={member.name} extra={<Tag icon={<TeamOutlined />}>{member.role}</Tag>}>
            <Typography.Text type="secondary">Yük</Typography.Text>
            <Progress percent={member.load} size="small" status="active" />
            <Divider />
            <Typography.Text type="secondary">Son görev</Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }}>Sprint 12 - API performansı</Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
    <SectionCard variant="default">
      <Typography.Text strong>Yaklaşan sprint seremonileri</Typography.Text>
      <Timeline
        style={{ marginTop: spacing.sm }}
        items={[
          { children: "Sprint Planning - 24 Ocak" },
          { children: "Daily Standup - Her gün 09:30" },
          { children: "Sprint Review - 07 Şubat" },
        ]}
      />
    </SectionCard>
  </PageContainer>
);

// Scrum Board
const scrumColumns = [
  { title: "Backlog", items: ["Kullanıcı yetkilendirme", "Bildirim ayarları"] },
  { title: "In Progress", items: ["Dashboard UI revizyonu"] },
  { title: "Review", items: ["API hata logları"] },
  { title: "Done", items: ["Login form Validasyonu"] },
];

export const ScrumBoardPage = () => (
  <PageContainer title="Scrum Board" subtitle="Görev akışı">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing["lg"] }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Toplam Görev" value={12} />
          <Divider />
          <Statistic title="Bloklu" value={1} precision={0} valueStyle={{ color: colorPalette.warning }} />
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      {scrumColumns.map((col) => (
        <Col key={col.title} xs={24} sm={12} md={6}>
          <Card title={col.title} size="small" bordered>
            <List
              size="small"
              dataSource={col.items}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      ))}
    </Row>
  </PageContainer>
);

// Kullanıcı Listesi
const userColumns = [
  { title: "Ad Soyad", dataIndex: "name", key: "name" },
  { title: "Rol", dataIndex: "role", key: "role" },
  { title: "Durum", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "aktif" ? colorPalette.success : colorPalette.warning}>{s === "aktif" ? "Aktif" : "Pasif"}</Tag> },
];

const userData = [
  { key: "1", name: "Elif T", role: "Admin", status: "aktif" },
  { key: "2", name: "Can Ş", role: "Worker", status: "aktif" },
  { key: "3", name: "Mert K", role: "User", status: "pasif" },
  { key: "4", name: "Deniz P", role: "User", status: "aktif" },
];

export const UsersPage = () => (
  <PageContainer title="Kullanıcı Listesi" subtitle="Kullanıcı yönetimi">
    <Row gutter={[16, 16]} style={{ marginBottom: spacing["lg"] }}>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Aktif" value={3} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Pasif" value={1} />
        </SectionCard>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <SectionCard variant="default">
          <Statistic title="Son 7 gün giriş" value={12} />
        </SectionCard>
      </Col>
    </Row>
    <SectionCard variant="default">
      <Table columns={userColumns} dataSource={userData} pagination={{ pageSize: 5 }} />
    </SectionCard>
  </PageContainer>
);

// Kullanıcı Oluştur
export const UserCreatePage = () => (
  <PageContainer title="Kullanıcı Oluştur" subtitle="Yeni kullanıcı ekleyin">
    <SectionCard variant="default">
      <Steps
        direction="horizontal"
        current={0}
        items={[
          { title: "Bilgiler" },
          { title: "Rol & İzin" },
          { title: "Özet" },
        ]}
        style={{ marginBottom: spacing["2xl"] }}
      />
      <Typography.Paragraph type="secondary">
        Form alanları için taslak: Ad, Soyad, E-posta, Rol, Geçici şifre, Bildirim tercihleri.
      </Typography.Paragraph>
      <List
        header="Şablon roller"
        dataSource={["Admin (tam yetki)", "Worker (operasyonel)", "User (sadece görüntüleme)"]}
        renderItem={(i) => <List.Item>{i}</List.Item>}
      />
      <Space>
        <Button type="primary" icon={<UserAddOutlined />}>Taslak Oluştur</Button>
        <Button>Kaydet</Button>
      </Space>
    </SectionCard>
  </PageContainer>
);

// Onay Süreçleri
const approvalSteps = [
  { title: "Talep" },
  { title: "Yönetici Onayı" },
  { title: "Destek" },
  { title: "Kapanış" },
];

export const ApprovalsPage = () => (
  <PageContainer title="Onay Süreçleri" subtitle="Onay akışlarını yönetin">
    <SectionCard variant="default">
      <Steps current={1} items={approvalSteps} style={{ marginBottom: spacing["2xl"] }} />
      <List
        header={<Typography.Text strong>Örnek kurallar</Typography.Text>}
        dataSource={["Belirli kategorilerde otomatik yönetici onayı", "SLA ihlallerinde uyarı", "Çoklu onay adımı"]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Divider />
      <Space>
        <Button type="primary" icon={<CheckCircleOutlined />}>Yeni Akış</Button>
        <Button>Şablon Seç</Button>
      </Space>
    </SectionCard>
  </PageContainer>
);

// Logs
const logColumns = [
  { title: "Tarih", dataIndex: "date", key: "date" },
  { title: "Olay", dataIndex: "event", key: "event" },
  { title: "Seviye", dataIndex: "level", key: "level", render: (level: string) => <Tag color={level === "error" ? colorPalette.error : level === "warn" ? colorPalette.warning : colorPalette.info}>{level.toUpperCase()}</Tag> },
];

const logData = [
  { key: "1", date: "2025-01-22", event: "Login successful", level: "info" },
  { key: "2", date: "2025-01-22", event: "Config updated", level: "warn" },
  { key: "3", date: "2025-01-22", event: "API timeout", level: "error" },
  { key: "4", date: "2025-01-23", event: "User invite sent", level: "info" },
];

export const LogsPage = () => (
  <PageContainer title="Logs" subtitle="Sistem ve işlem kayıtları">
    <SectionCard variant="default">
      <Space style={{ marginBottom: spacing["md"] }}>
        <Button size="small">Bugün</Button>
        <Button size="small">Bu Hafta</Button>
        <Button size="small">Tümü</Button>
      </Space>
      <Table columns={logColumns} dataSource={logData} pagination={false} />
    </SectionCard>
  </PageContainer>
);

// Çıkış
export const LogoutPage = () => (
  <PlaceholderPage
    title="Çıkış"
    subtitle="Oturum sonlandırma"
    description="Çıkış işlemi için auth logout aksiyonunu bağlayın."
    checklist={["Auth logout çağrısı", "Token temizleme", "Login sayfasına yönlendirme"]}
  />
);
