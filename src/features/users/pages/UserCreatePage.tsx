import React from "react";
import { Steps, Typography, List, Space, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles/styleConstants";

const roleTemplates = ["Admin (tam yetki)", "Worker (operasyonel)", "User (sadece görüntüleme)"];

const UserCreatePage: React.FC = () => (
  <PageContainer title="Kullanıcı Oluştur" subtitle="Yeni kullanıcı ekleyin">
    <SectionCard variant="default">
      <Steps
        direction="horizontal"
        current={0}
        items={[{ title: "Bilgiler" }, { title: "Rol & İzin" }, { title: "Özet" }]}
        style={{ marginBottom: spacing["2xl"] }}
      />
      <Typography.Paragraph type="secondary">
        Form alanları için taslak: Ad, Soyad, E-posta, Rol, Geçici şifre, Bildirim tercihleri.
      </Typography.Paragraph>
      <List header="Şablon roller" dataSource={roleTemplates} renderItem={(item) => <List.Item>{item}</List.Item>} />
      <Space>
        <Button type="primary" icon={<UserAddOutlined />}>
          Taslak Oluştur
        </Button>
        <Button>Kaydet</Button>
      </Space>
    </SectionCard>
  </PageContainer>
);

export default UserCreatePage;
