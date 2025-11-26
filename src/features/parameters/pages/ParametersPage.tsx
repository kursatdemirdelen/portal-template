import React from "react";
import { Row, Col, Typography } from "antd";
import { SettingOutlined, AlertOutlined, FieldTimeOutlined, FileTextOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui";
import { PlaceholderCard } from "@/features/placeholders/ui/PlaceholderCard";

const parameterItems = [
  {
    title: "Roller & İzinler",
    desc: "Kullanıcı rolleri ve erişim seviyeleri",
    icon: <SettingOutlined />,
  },
  {
    title: "Bildirimler",
    desc: "E-posta ve sistem bildirim tercihleri",
    icon: <AlertOutlined />,
  },
  {
    title: "SLA",
    desc: "Yanıt ve çözüm süreleri",
    icon: <FieldTimeOutlined />,
  },
  {
    title: "Kategori & Etiketler",
    desc: "Bilet sınıflandırmaları",
    icon: <FileTextOutlined />,
  },
];

const ParametersPage: React.FC = () => (
  <PageContainer title="Parametreler Yönetimi" subtitle="Sistem genel ayarları">
    <Row gutter={[16, 16]}>
      {parameterItems.map((item) => (
        <Col key={item.title} xs={24} sm={12} md={8}>
          <PlaceholderCard title={item.title} description={item.desc} icon={item.icon}>
            <Typography.Text type="secondary">
              Bu alan için yapılandırma formu burada yer alacak.
            </Typography.Text>
          </PlaceholderCard>
        </Col>
      ))}
    </Row>
  </PageContainer>
);

export default ParametersPage;
